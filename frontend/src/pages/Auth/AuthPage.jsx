// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg grid md:grid-cols-2 gap-4">
        <div className="hidden md:block">
          <img
            src="/auth-illustration.png"
            alt="auth"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <p>
                Pas encore de compte ?{' '}
                <button className="text-indigo-600 underline" onClick={() => setIsLogin(false)}>
                  S'inscrire
                </button>
              </p>
            ) : (
              <p>
                Déjà un compte ?{' '}
                <button className="text-indigo-600 underline" onClick={() => setIsLogin(true)}>
                  Se connecter
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
