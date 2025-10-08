import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DevenirService = () => {
  const [formData, setFormData] = useState({
    nom_entreprise: "",
    desc_service: "",
    numero: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom_entreprise.trim()) newErrors.nom_entreprise = "Nom requis";
    if (!formData.desc_service.trim()) newErrors.desc_service = "Description requise";
    if (!formData.numero.trim()) newErrors.numero = "Numéro requis";
    else if (!/^\d{8,15}$/.test(formData.numero)) newErrors.numero = "Numéro invalide";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("nom_entreprise", formData.nom_entreprise);
    data.append("desc_service", formData.desc_service);
    data.append("numero", formData.numero);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const res = await fetch("http://localhost:8080/api/services/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Service enregistré avec succès !");
        setFormData({ nom_entreprise: "", desc_service: "", numero: "", photo: null });
        setPreview(null);
        setErrors({});
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(result.message || "Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Une erreur s'est produite.");
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-800 mb-2">
            Devenez un Service de Confiance
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Rejoignez notre plateforme pour profiter des retours d’expérience des utilisateurs et valoriser vos prestations.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Formulaire d'inscription d'un service</h2>

        {message && (
          <div className="text-center mb-4 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'entreprise */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nom de l'entreprise</label>
            <input
              type="text"
              name="nom_entreprise"
              value={formData.nom_entreprise}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Ex : Sylvan'os Création"
            />
            {errors.nom_entreprise && <p className="text-red-500 text-sm mt-1">{errors.nom_entreprise}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              name="desc_service"
              value={formData.desc_service}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Décrivez brièvement votre service"
            />
            {errors.desc_service && <p className="text-red-500 text-sm mt-1">{errors.desc_service}</p>}
          </div>

          {/* Numéro */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Numéro de contact</label>
            <input
              type="tel"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Ex : 97000000"
            />
            {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Photo de couverture</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
            />

            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Aperçu" className="h-40 object-cover rounded shadow-md" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-600 to-blue-800 text-white font-semibold py-2 rounded-md shadow hover:from-sky-700 hover:to-blue-900 transition duration-300"
          >
            Enregistrer le service
          </button>
        </form>
      </div>
    </>
  );
};

export default DevenirService;
     