// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/loginForm";
import Register from "./components/Auth/registerForm";
import Home from "./pages/Home"; // page d’accueil ou tableau de bord
import Navbar from "./components/Navbar";
import DonnerAvis from "./pages/donnerAvis";
import DevenirService from "./pages/devenirService";
import ErrorBoundary from "./components/error";
import VerifyEmail from "./components/verifyEmail";
import ServiceDetail from "./pages/ServiceDetail"; 

// import ServiceDetails from './pages/serviceDetail';



function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donner-avis" element={<DonnerAvis />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
        { <Route path="/devenir-service" element={<DevenirService />} /> }
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
