import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

// const avisCards = [
//   {
//     id: 1,
//     title: "Évaluez facilement",
//     description:
//       "Donnez rapidement une note claire sur la qualité des services que vous avez utilisés.",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     title: "Exprimez-vous librement",
//     description:
//       "Rédigez des commentaires détaillés pour partager votre expérience avec précision.",
//     image:
//       "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     title: "Contribuez à la communauté",
//     description:
//       "Aidez d’autres utilisateurs à faire les meilleurs choix grâce à vos avis honnêtes.",
//     image:
//       "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// // Nouveau tableau de cartes pour la deuxième section
// const featureCards = [
//   {
//     id: 1,
//     title: "Interface intuitive",
//     description:
//       "Une interface simple et claire qui facilite la navigation et la publication d’avis.",
//     image:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     title: "Sécurité renforcée",
//     description:
//       "Vos données et avis sont protégés grâce à des mesures de sécurité avancées.",
//     image:
//       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     title: "Support réactif",
//     description:
//       "Une équipe disponible pour répondre rapidement à vos questions et problèmes.",
//     image:
//       "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=600&q=80",
//   },
// ];

const DonnerAvis = () => {
  const [avisCards, setAvisCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => setAvisCards(data))
      .catch((err) =>
        console.error("Erreur lors de la récupération des services :", err)
      );
  }, []);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-sky-700">
            Donner votre avis
          </h1>
          <p className="text-lg text-sky-600 max-w-2xl mx-auto">
            Partagez votre expérience et aidez les autres à choisir les meilleurs
            services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {Array.isArray(avisCards) && avisCards.map((card) => (<AvisCard key={card._id} {...card} /> ))}

          {avisCards.map(({ _id, nom_entreprise, description, photo }) => (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={photo}
                alt={nom_entreprise}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {nom_entreprise}
                </h3>
                <p className="text-gray-700 flex-grow">{description}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center text-sky-600 font-semibold hover:text-sky-800"
                >
                  Voir plus
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section "Pourquoi choisir ?" */}
      <section className="bg-sky-50 mt-20 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-sky-700">
            Pourquoi choisir notre plateforme ?
          </h2>
          <p className="text-lg text-sky-600 mb-8">
            Notre plateforme vous offre une expérience simple et fiable pour
            donner votre avis et aider la communauté à faire les meilleurs
            choix.
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
