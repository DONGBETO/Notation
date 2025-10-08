import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Vérification en cours...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setMessage("Token manquant.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/auth/verify-email/${token}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        setMessage(data.message);

        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setMessage(err.message || "Erreur de vérification");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center max-w-md">
        <h1 className="text-xl font-semibold mb-4">{message}</h1>
        <p>Vous allez être redirigé...</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
