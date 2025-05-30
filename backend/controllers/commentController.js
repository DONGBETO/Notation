const Comment = require("../models/Comment");
const Service = require("../models/serviceModel");

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
