const express = require("express");
const router = express.Router();
const authentificate = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../services/authValideService");
const { tokenCheck } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");


//inscription
router.post("/register", registerSchema, authentificate.register);
//verify link register
// router.get("/verify-email", registerSchema, authentificate.verifyEmail);
router.get("/verify-email", registerSchema, authentificate.verifyEmail);

//connexion
router.post("/login", loginSchema, authentificate.login);
//gestion du profile 
router.get("/profile", tokenCheck, authentificate.getUserProfile); //Get User Profil

router.put("/profile/:id", tokenCheck, authentificate.updateUserProfile); //Update User Profile

router.post("/upload-image", upload.single('image'), authentificate.imageUpload);

module.exports = router;