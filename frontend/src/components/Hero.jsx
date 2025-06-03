import React from "react";

export default function Hero() {
  return (
    <section className="bg-sky-50 py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Texte à gauche */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Notez, commentez, recommandez
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            NoteAvis vous aide à partager votre expérience sur les produits et services que vous utilisez. Aidez la communauté à faire les bons choix grâce à vos retours.
          </p>
          {/* <a
            href="/register"
            className="inline-block bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
          >
            Commencer maintenant
          </a> */}
        </div>

        {/* Illustration SVG à droite */}
        <div className="md:w-1/2 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 240"
            className="w-full max-w-md h-auto"
            role="img"
            aria-label="Illustration NoteAvis"
          >
            {/* Bulles de commentaires stylisées */}
            <rect x="30" y="40" width="220" height="140" rx="20" ry="20" fill="#7dd3fc" />
            <rect x="40" y="60" width="200" height="40" rx="10" ry="10" fill="#38bdf8" />
            <rect x="40" y="110" width="150" height="30" rx="8" ry="8" fill="#0ea5e9" />
            <rect x="40" y="150" width="180" height="20" rx="6" ry="6" fill="#38bdf8" />

            {/* Étoiles de notation */}
            <g fill="#fbbf24" stroke="#b45309" strokeWidth="1" transform="translate(60, 120)">
              {[0, 1, 2, 3, 4].map((i) => (
                <polygon
                  key={i}
                  points="10,1 13,7 20,7 14,11 16,18 10,14 4,18 6,11 0,7 7,7"
                  transform={`translate(${i * 30}, 0) scale(1.5)`}
                />
              ))}
            </g>

            {/* Petit logo NoteAvis textuel */}
            <text
              x="50%"
              y="220"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="24"
              fill="#0284c7"
              fontFamily="Arial, sans-serif"
            >
              NoteAvis
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
