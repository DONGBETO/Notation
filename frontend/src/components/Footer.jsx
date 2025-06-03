import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">NoteAvis</h3>
          <p>
            La meilleure plateforme pour noter et commenter vos services et produits préférés.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Liens rapides</h4>
          <ul>
            <li><a href="#" className="hover:text-white transition">Accueil</a></li>
            <li><a href="#" className="hover:text-white transition">Donner avis</a></li>
            <li><a href="#" className="hover:text-white transition">Devenir service</a></li>
            <li><a href="#" className="hover:text-white transition">Se connecter</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p>Email: contact@noteavis.com</p>
          <p>Téléphone: +229 01 52 13 01 73</p>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        © 2025 NoteAvis. Tous droits réservés.
      </div>
    </footer>
  );
}
