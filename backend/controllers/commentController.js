const Comment = require("../models/Comment");
const Service = require("../models/serviceModel");
const fs = require("fs");
const path = require("path");

exports.createComment = async (req, res) => {
   try {
      const { serviceId } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      const service = await Service.findById(serviceId);
      if (!service) {
         return res.status(404).json({ success: false, message: "Service non trouvé." });
      }

      const comment = await Comment.create({
         content,
         serviceId,
         createdBy: userId,
      });

      res.status(201).json({ success: true, comment });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

exports.getCommentsByService = async (req, res) => {
   try {
      const { serviceId } = req.params;
      const comments = await Comment.find({ serviceId }).populate("createdBy", "nom email");

      res.status(200).json({ success: true, count: comments.length, comments });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

exports.updateComment = async (req, res) => {
   try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.user.id;
      const userRole = req.user.roleName;

      const comment = await Comment.findById(commentId);
      if (!comment) {
         return res.status(404).json({ success: false, message: "Commentaire non trouvé." });
      }

      if (comment.createdBy.toString() !== userId && userRole !== "admin") {
         return res.status(403).json({ success: false, message: "Accès refusé." });
      }

      comment.content = content;
      await comment.save();

      res.status(200).json({ success: true, comment });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

exports.deleteComment = async (req, res) => {
   try {
      const { commentId } = req.params;
      const userId = req.user.id;
      const userRole = req.user.roleName;

      const comment = await Comment.findById(commentId);
      if (!comment) {
         return res.status(404).json({ success: false, message: "Commentaire non trouvé." });
      }

      if (comment.createdBy.toString() !== userId && userRole !== "admin") {
         return res.status(403).json({ success: false, message: "Accès refusé." });
      }

      await comment.deleteOne();

      res.status(200).json({ success: true, message: "Commentaire supprimé." });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

exports.getLastCommentByService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Trouver le commentaire le plus récent pour le service donné
    const lastComment = await Comment.findOne({ service: serviceId })
      .populate("user", "firstName lastName") // Adapté selon ton modèle
      .sort({ createdAt: -1 });

    if (!lastComment) {
      return res.status(404).json({ success: false, message: "Aucun commentaire trouvé." });
    }

    return res.status(200).json({ success: true, comment: lastComment });
  } catch (error) {
    console.error("Erreur dans getLastCommentByService:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};


// exports.generateJsonData = async (req, res) => {
//   try {
//     const services = await Service.find();

//     const servicesAvecCommentaire = await Promise.all(
//       services.map(async (service) => {
//         const dernierCommentaire = await Comment.findOne({ serviceId: service._id })
//           .populate('createdBy', 'firstName')
//           .sort({ createdAt: -1 });

//         return {
//           _id: service._id,
//           nom_entreprise: service.nom_entreprise,
//           photo: service.photo,
//           dernierCommentaire: dernierCommentaire?.content || null,
//           auteur: dernierCommentaire?.createdBy?.firstName || null,
//           date: dernierCommentaire?.createdAt || null
//         };
//       })
//     );

//     const filePath = path.join(__dirname, "../data/data_comment.json");
//     fs.writeFileSync(filePath, JSON.stringify(servicesAvecCommentaire, null, 2));

//     res.status(200).json({ success: true, message: "Fichier JSON généré." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

