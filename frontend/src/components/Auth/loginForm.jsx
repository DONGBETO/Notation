import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Illustration = () => (
  <svg
    width="320"
    height="320"
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="max-w-full h-auto"
  >
    <circle cx="160" cy="160" r="150" fill="#BEE3F8" />
    <path
      d="M160 90 L170 120 L200 120 L175 140 L185 170 L160 150 L135 170 L145 140 L120 120 L150 120 Z"
      fill="#2563EB"
    />
    <circle cx="230" cy="210" r="15" fill="#3B82F6" />
    <path
      d="M215 215 Q220 230 235 225"
      stroke="#1E40AF"
      strokeWidth="3"
      fill="none"
    />
    <rect
      x="70"
      y="200"
      width="120"
      height="90"
      rx="15"
      ry="15"
      fill="#60A5FA"
      opacity="0.8"
    />
    <polygon points="120,290 130,310 140,290" fill="#60A5FA" opacity="0.8" />
    <text
      x="130"
      y="245"
      fontSize="22"
      fill="white"
      fontWeight="600"
      fontFamily="sans-serif"
      textAnchor="middle"
    >
      NoteAvis
    </text>
    <text
      x="130"
      y="280"
      fontSize="14"
      fill="white"
      fontFamily="sans-serif"
      textAnchor="middle"
    >
      Évaluez vos services
    </text>
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!password) {
      newErrors.password = "Le mot de passe est obligatoire.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Erreur lors de la connexion.");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // <-- Sauvegarde de l'utilisateur
        alert("Connexion réussie !");
        navigate("/");
      }
    } catch (error) {
      setServerError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-sky-50 px-6 py-12">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl max-w-5xl w-full overflow-hidden">
        {/* Illustration à gauche, cachée sur mobile */}
        <div className="hidden md:flex w-1/2 bg-sky-100 items-center justify-center p-10">
          <Illustration />
        </div>

        {/* Formulaire */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-6 text-sky-900 text-center">
            Connexion
          </h2>
          <p className="mb-10 text-center text-sky-700 text-lg">
            Connectez-vous pour accéder à votre compte NoteAvis
          </p>

          {serverError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded border border-red-400 text-center font-medium">
              {serverError}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sky-800 font-semibold"
              >
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="exemple@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-sky-400 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-sky-400"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sky-800 font-semibold"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-sky-400 transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-sky-400"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-full text-white text-lg font-bold transition-colors ${
                loading
                  ? "bg-sky-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700"
              }`}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-8 text-center text-sky-700 text-base">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="font-semibold hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
