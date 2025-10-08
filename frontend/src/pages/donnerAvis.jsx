import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Composant affichant les étoiles en fonction de la note
const StarRating = ({ rating = 0, maxStars = 10 }) => {
  const stars = [];
  const roundedRating = Math.round(rating); // arrondi la note

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span key={i} className={i <= roundedRating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

const DonnerAvis = () => {
  const [avisCards, setAvisCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAvisCards(data.services);
        } else {
          setError("Erreur lors du chargement des services.");
        }
      })
      .catch((err) => {
        console.error("Erreur réseau :", err);
        setError("Impossible de contacter le serveur.");
      });
  }, []);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-sky-700">Donner votre avis</h1>
          <p className="text-lg text-sky-600 max-w-2xl mx-auto">
            Partagez votre expérience et aidez les autres à choisir les meilleurs services.
          </p>
        </div>

        {error && <div className="text-red-500 text-center mb-6">{error}</div>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {avisCards.map(
            ({ _id, nom_entreprise, photo, dernier_commentaire, createdBy, averageRating }) => {
              // Nom de l'auteur : on regarde dans createdBy (objet utilisateur) sinon vide
            const auteurNom = createdBy
             ? `${createdBy.firstName || ""} ${createdBy.lastName || ""}`.trim()
              : "Anonyme";
              return (
                <div
                  key={_id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300 flex flex-col text-xs"
                >
                  {photo ? (
                    <img
                      src={`http://localhost:8080/uploads/${photo}`}
                      alt={nom_entreprise}
                      className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-500 italic">
                      Pas de photo
                    </div>
                  )}

                  <div className="p-2 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold mb-1 text-gray-900 truncate">
                      {nom_entreprise}
                    </h3>

                    {/* Affichage de la note moyenne sous forme d'étoiles */}
                    <div className="mb-1">
                      <StarRating rating={averageRating || 0} maxStars={10} />
                    </div>

                    <p className="text-gray-600 mb-1 italic line-clamp-2 text-xs">
                      {dernier_commentaire ? `"${dernier_commentaire}"` : "Pas encore de commentaire"}
                    </p>

                    <p className="text-[11px] text-gray-500 mb-1"> {auteurNom}</p>

                    <Link
                      to={`/service/${_id}`}
                      className="mt-auto inline-flex items-center text-sky-600 font-semibold text-xs hover:text-sky-800"
                    >
                      Voir plus
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* Section "Pourquoi choisir ?" */}
      <section className="bg-sky-50 mt-20 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-sky-700">Pourquoi choisir notre plateforme ?</h2>
          <p className="text-lg text-sky-600 mb-8">
            Notre plateforme vous offre une expérience simple et fiable pour donner votre avis et aider la communauté à faire les meilleurs choix.
          </p>
          <button
            type="button"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
          >
            En savoir plus
          </button>
        </div>
      </section>
    </>
  );
};

export default DonnerAvis;
