const express = require("express");
const router = express.Router({ mergeParams: true });
const { tokenCheck } = require("../middlewares/authMiddleware");
const commentController = require("../controllers/commentController");

// Créer un commentaire lié à un service spécifique
router.post("/", tokenCheck, commentController.createComment);

// Récupérer tous les commentaires liés à un service spécifique
router.get("/", commentController.getCommentsByService);

// Mettre à jour un commentaire (auteur ou admin)
router.put("/:commentId", tokenCheck, commentController.updateComment);

// Supprimer un commentaire (auteur ou admin)
router.delete("/:commentId", tokenCheck, commentController.deleteComment);

module.exports = router;
