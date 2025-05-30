const Comment = require("../models/Comment"); // adapter le chemin selon ta structure

const canModifyComment = async (req, res, next) => {
  const { id } = req.params; // id du commentaire à modifier/supprimer
  const user = req.user; // utilisateur connecté (après tokenCheck)

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    if (comment.createdBy.toString() !== user.id && user.role !== "admin") {
      return res.status(403).json({ message: "Accès interdit." });
    }

    req.comment = comment;
    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { canModifyComment };
