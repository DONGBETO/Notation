const mongoose = require("mongoose");

const userSchema = new mongoose.Schema (
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required:true, unique:true },  
        // phone: { type: String, required: true },     
        password: { type: String, required:true },
        roleName: { type: String, enum: ["admin", "user"], default: "user", required: true }, // Référence au modèle Role
        avatar: { type: String, default: null }, // URL de l’image de profil
        isVerified: {type: Boolean, default: false }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User", userSchema);