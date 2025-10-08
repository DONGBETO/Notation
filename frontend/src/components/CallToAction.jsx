import React from "react";

export default function CallToAction() {
  return (
    <section className="bg-indigo-600 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à rejoindre la communauté ?
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Inscrivez-vous dès maintenant pour commencer à donner vos avis et découvrir ceux des autres.
        </p>
        <a
          href="/register"
          className="inline-block bg-white text-indigo-600 font-semibold px-10 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          S’inscrire
        </a>
      </div>
    </section>
  );
}
