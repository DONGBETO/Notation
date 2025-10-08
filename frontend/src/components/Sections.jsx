import React from "react";
import { FaComments, FaSignInAlt, FaUserPlus, FaStar } from "react-icons/fa";

export default function Sections() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Accueil */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4 text-indigo-700 text-2xl">
            <FaStar />
            <h3 className="font-semibold">Accueil</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Explorez les services les mieux notés, les derniers avis publiés, et des recommandations personnalisées.
          </p>
        </div>

        {/* Donner mon avis */}
        <div className="bg-purple-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4 text-purple-700 text-2xl">
            <FaComments />
            <h3 className="font-semibold">Donner mon avis</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Partagez votre expérience avec des services ou produits. Notez, commentez, ajoutez des photos, et aidez les autres.
          </p>
        </div>

        {/* Se connecter */}
        <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4 text-pink-700 text-2xl">
            <FaSignInAlt />
            <h3 className="font-semibold">Se connecter</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Connectez-vous pour accéder à votre tableau de bord, suivre vos avis, et recevoir des notifications personnalisées.
          </p>
        </div>

        {/* Devenir service */}
        <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4 text-yellow-700 text-2xl">
            <FaUserPlus />
            <h3 className="font-semibold">Devenir service</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Inscrivez votre activité pour apparaître sur la plateforme, recevoir des avis, et améliorer votre réputation en ligne.
          </p>
        </div>
        
      </div>
    </section>
  );
}
