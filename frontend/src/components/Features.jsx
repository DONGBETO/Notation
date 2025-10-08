import React from "react";
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Notation simple",
    description:
      "Donnez une note rapide sur 10 en quelques clics, sans prise de tête.",
    icon: StarIcon,
  },
  {
    name: "Commentaires détaillés",
    description:
      "Exprimez votre avis avec des commentaires pour aider les autres utilisateurs.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: "Sécurité & confiance",
    description:
      "Vos avis sont modérés pour garantir une communauté saine et fiable.",
    icon: ShieldCheckIcon,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Fonctionnalités clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ name, description, icon: Icon }, index) => (
            <div
              key={name}
              className="p-6 border border-gray-200 rounded-xl shadow-sm 
                hover:shadow-lg hover:scale-[1.03] transition-transform duration-200 ease-in-out
                flex flex-col items-center bg-white"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className="mb-6 p-4 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-400
                  flex items-center justify-center shadow-md"
              >
                <Icon className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{name}</h3>
              <p className="text-gray-700 max-w-xs">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
