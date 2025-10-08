import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const AvisCard = ({ service }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <img
        src={service.photo}
        alt={service.nom_entreprise}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-1 text-gray-900">{service.nom_entreprise}</h3>
        <p className="text-gray-700 mb-2 flex-grow">{service.dernierCommentaire || "Aucun commentaire"}</p>
        <p className="text-sm text-gray-500 italic mb-4">
          Posté par : {service.auteur || "Anonyme"}
        </p>
        <button
          type="button"
          className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-800"
          aria-label={`Voir plus sur ${service.nom_entreprise}`}
        >
          Voir plus
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AvisCard;
