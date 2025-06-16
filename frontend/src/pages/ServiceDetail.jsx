import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const renderStars = (rating, onClick) => {
  const totalStars = 10;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
        aria-hidden="true"
        onClick={() => onClick && onClick(i)}
      >
        ⭐
      </span>
    );
  }
  return stars;
};

const CommentIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  </svg>
);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/services/${id}`);
        const data = await res.json();
        if (data.success) setService(data.service);
        else setError("Service non trouvé.");
      } catch {
        setError("Erreur lors du chargement du service.");
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/services/${id}/comments`);
        const data = await res.json();
        if (data.success) setCommentaires(data.comments);
      } catch {
        console.error("Erreur lors du chargement des commentaires.");
      }
    };

    fetchService();
    fetchComments();
  }, [id]);

  const refreshData = () => {
    fetch(`http://localhost:8080/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setService(data.service);
      });
    fetch(`http://localhost:8080/api/services/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCommentaires(data.comments);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!user) {
      setSubmitError("Vous devez être connecté pour poster un avis.");
      return;
    }
    if (newComment.trim().length === 0 && newRating === 0) {
      setSubmitError("Veuillez écrire un commentaire ou donner une note.");
      return;
    }

    setLoadingSubmit(true);

    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(`http://localhost:8080/api/services/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          content: newComment.trim(),
          rating: newRating,
          userId: user.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setNewComment("");
        setNewRating(0);
        refreshData();
        setShowForm(false);
      } else {
        setSubmitError(data.message || "Erreur lors de l'envoi.");
      }
    } catch (err) {
      setSubmitError("Erreur réseau.");
    }

    setLoadingSubmit(false);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!service) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={`http://localhost:8080/uploads/${service.photo}`}
          alt={service.nom_entreprise}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-sky-700">{service.nom_entreprise}</h1>
            <div className="flex items-center space-x-2">
              <div className="text-xl font-semibold text-yellow-500" aria-label={`Note moyenne ${service.averageRating?.toFixed(1) ?? "0"}`}>
                {service.averageRating ? service.averageRating.toFixed(1) : null}
              </div>
              <div>{renderStars(service.averageRating || 0)}</div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">{service.desc_service}</p>

          <hr className="my-6" />

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-sky-600">Commentaires</h2>
            <button
              aria-label="Ajouter un commentaire"
              onClick={() => setShowForm((prev) => !prev)}
              className={`text-sky-600 hover:text-sky-800 focus:outline-none ${!user ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={!user}
              title={!user ? "Connectez-vous pour ajouter un commentaire" : undefined}
            >
              <CommentIcon className="w-7 h-7" />
            </button>
          </div>

          {showForm && (
            <div className="mb-8">
              {!user ? (
                <p className="text-red-500 mb-4">Vous devez vous connecter pour commenter.</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* <label className="block">
                    <span className="text-gray-700 font-semibold">Votre note :</span>
                    <div>{renderStars(newRating, setNewRating)}</div>
                  </label> */}

                  <label className="block mt-4">
                    <span className="text-gray-700 font-semibold">Votre commentaire :</span>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 resize-none"
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Écrivez votre commentaire ici..."
                    />
                  </label>
                  {submitError && <p className="text-red-500">{submitError}</p>}
                  <button
                    type="submit"
                    disabled={loadingSubmit}
                    className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:opacity-50"
                  >
                    {loadingSubmit ? "Envoi..." : "Envoyer"}
                  </button>
                </form>
              )}
            </div>
          )}

          {commentaires.length === 0 ? (
            <p className="text-gray-500 italic">Aucun commentaire pour le moment.</p>
          ) : (
            <ul className="space-y-8">
              {commentaires.map((c) => (
                <li key={c._id} className="bg-white p-5 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    {/* <div className="text-yellow-400 mr-3" aria-label={`Note ${c.rating || 0}`}>
                      {/* {renderStars(c.rating || 0)}
                    </div> */}
                    <p className="text-gray-900 italic text-lg">{c.content}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {c.createdBy ? `${c.createdBy.firstName} ${c.createdBy.lastName}` : "Utilisateur"}
                  </p>
                  <p className="text-xs text-gray-400 italic">{formatDate(c.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
