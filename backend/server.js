const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require("./routes/serviceRoutes");
const commentRoutes = require("./routes/commentRoutes");
const avisRoutes = require('./routes/avisRoutes');

const app = express();
dotenv.config();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // <-- correction ici
}));

// Rendre accessible le dossier uploads (pour les fichiers uploadés)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/services", serviceRoutes);

// Routes imbriquées pour les commentaires et avis liés à un service spécifique
app.use("/api/services/:serviceId/comments", commentRoutes);
app.use("/api/services/:serviceId/avis", avisRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
