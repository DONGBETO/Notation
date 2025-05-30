const express = require ("express");
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

//middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware pour envoyer des requettes depuis un domaine différent
app.use(
    cors( {
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHearders: ["Content-Type", "Authorization"],
    })
);


// Pour rendre accessible le dossier uploads/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use('uploads', express.static('uploads')); // Rendre les fichiers accessibles

connectDB();

// Routes conexion et inscription
app.use('/api/auth', authRoutes);
//Routes pour l'admin et gestions des users
app.use('/api/users', userRoutes);

//Routes services
app.use("/api/services", serviceRoutes);

//Route des commentaires
app.use("/api/services/:serviceId/comments", commentRoutes);

// Routes des avis
app.use('/api/services/:serviceId/avis', avisRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> console.log(`Serveur démarré sur http://localhost:${PORT}`));