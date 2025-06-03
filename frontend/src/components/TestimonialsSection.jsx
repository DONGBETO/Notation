import React from "react";

const testimonials = [
  {
    name: "Alice Dupont",
    role: "Utilisateur satisfait",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "NoteAvis m’a vraiment aidé à choisir le bon service, je recommande vivement !",
  },
  {
    name: "Jean Martin",
    role: "Prestataire",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    quote:
      "Grâce aux avis, j’ai pu améliorer mes prestations et gagner la confiance de mes clients.",
  },
  {
    name: "Sophie Bernard",
    role: "Membre actif",
    image:
      "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "Une plateforme claire, intuitive et fiable pour partager mes expériences.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Ce qu'ils disent de nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, image, quote }) => (
            <div
              key={name}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <img
                src={image}
                alt={name}
                className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
              />
              <p className="text-gray-700 italic mb-4">"{quote}"</p>
              <p className="font-semibold text-indigo-600">{name}</p>
              <p className="text-gray-500 text-sm">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
