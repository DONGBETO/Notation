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
    {/* Cercle fond bleu clair */}
    <circle cx="160" cy="160" r="150" fill="#BEE3F8" />
    {/* Etoiles stylisées */}
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
    {/* Bulle de dialogue */}
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

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);


  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Le prénom est obligatoire.";
    if (!lastName.trim()) newErrors.lastName = "Le nom est obligatoire.";
    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
if (!password) {
  newErrors.password = "Le mot de passe est obligatoire.";
} else if (password.length < 6) {
  newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
}
return newErrors;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError(null);
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);
  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription.");
    }

    setSuccessMessage(data.message);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    // Tu peux rediriger après 3 secondes
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  } catch (error) {
    setServerError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-sky-50 px-6 py-12">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl max-w-5xl w-full overflow-hidden">
        {/* Illustration à gauche, cachée sur petit écran */}
        <div className="hidden md:flex w-1/2 bg-sky-100 items-center justify-center p-10">
          <Illustration />
        </div>

        {/* Formulaire à droite */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4 text-sky-900 text-center">
            Créez votre compte
          </h2>
          <p className="mb-10 text-center text-sky-700 text-lg">
            Rejoignez NoteAvis pour noter et évaluer vos services favoris !
          </p>

          {serverError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded border border-red-400 text-center font-medium">
              {serverError}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded border border-green-400 text-center font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sky-800 font-semibold"
              >
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-sky-400 transition ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-sky-400"
                }`}
                placeholder="Votre prénom"
              />
              {errors.firstName && (
                <p className="mt-1 text-red-600 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sky-800 font-semibold"
              >
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-sky-400 transition ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-sky-400"
                }`}
                placeholder="Votre nom"
              />
              {errors.lastName && (
                <p className="mt-1 text-red-600 text-sm">{errors.lastName}</p>
              )}
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-sky-400 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-sky-400"
                }`}
                placeholder="exemple@mail.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-sky-400 transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-sky-400"
                }`}
                placeholder="••••••••"
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
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>

          <p className="mt-8 text-center text-sky-700 text-base">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
