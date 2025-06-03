const ServiceRepository = require("../repositories/serviceRepository");
const UserRepository = require("../repositories/userRepository");
const Service = require('../models/serviceModel');
const Commentaire = require('../models/Comment');

//  Créer un service
const createService = async (req, res) => {
   try {
      const { nom_entreprise, desc_service, numero } = req.body;
      const userId = req.user.id;

      // Vérifier si l'utilisateur existe
      const user = await UserRepository.findById(userId);
      if (!user) {
         return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
      }

      // Vérifie si un fichier a été envoyé
      const photo = req.file ? req.file.filename : null;

      // Créer un nouveau service
      const newService = await ServiceRepository.createService({
         nom_entreprise,
         desc_service,
         numero,
         photo,
         createdBy: userId,
      });

      res.status(201).json({
         success: true,
         message: "Service créé avec succès.",
         service: {
            ...newService._doc,
            photoUrl: photo ? `${req.protocol}://${req.get("host")}/uploads/${photo}` : null,
         },
      });
   } catch (error) {
      console.error("Erreur lors de la création du service :", error);
      res.status(500).json({
         success: false,
         message: "Erreur lors de la création du service.",
         error: error.message || "Erreur inconnue",
      });
   }
};


const getAllServices = async (req, res) => {
  try {
    const services = await Service.find(); // ou ServiceRepository.findAllServices() si tu utilises un repo

    // Récupérer pour chaque service son dernier commentaire
    const servicesWithLastComment = await Promise.all(
      services.map(async (service) => {
        const lastComment = await Commentaire.findOne({ service: service._id })
          .populate("user", "firstName") // adapte le nom du champ s'il est différent
          .sort({ createdAt: -1 });

        return {
          _id: service._id,
          nom_entreprise: service.nom_entreprise,
          photo: service.photo,
          description: lastComment ? lastComment.commentaire : "Pas encore de commentaire",
          author: lastComment?.user?.firstName || "Anonyme",
        };
      })
    );

    res.status(200).json({
      success: true,
      services: servicesWithLastComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des services.",
      error: error.message,
    });
  }
};



// Obtenir un service par ID
const getServiceById = async (req, res) => {
   try {
      const id = req.params.id;
      const service = await ServiceRepository.findServiceById(id);

      if (!service) {
         return res.status(404).json({ message: "Service non trouvé." });
      }

      res.status(200).json({ success: true, service });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Erreur lors de la récupération du service.",
         error: error.message,
      });
   }
};

//  Mettre à jour un service
const updateService = async (req, res) => {
   try {
      const id = req.params.id;
      const userId = req.user.id;

      const existingService = await ServiceRepository.findByIdAndUpdate(id);
      if (!existingService) {
         return res.status(404).json({ message: "Service non trouvé." });
      }

      // Vérifie si le créateur est bien celui qui veut modifier
      if (existingService.createdBy.toString() !== userId) {
         return res.status(403).json({ message: "Non autorisé à modifier ce service." });
      }

      const updatedFields = {
         nom_entreprise: req.body.nom_entreprise || existingService.nom_entreprise,
         desc_service: req.body.desc_service || existingService.desc_service,
         numero: req.body.numero || existingService.numero,
      };

      if (req.file) {
         updatedFields.photo = req.file.filename;
      }

      const updatedService = await ServiceRepository.update(id, updatedFields);

      res.status(200).json({
         success: true,
         message: "Service mis à jour avec succès.",
         service: updatedService,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Erreur lors de la mise à jour du service.",
         error: error.message,
      });
   }
};

//  Supprimer un service
const deleteService = async (req, res) => {
   try {
      const id = req.params.id;
      const userId = req.user.id;

      const existingService = await ServiceRepository.deleteService(id);
      if (!existingService) {
         return res.status(404).json({ message: "Service non trouvé." });
      }

      if (existingService.createdBy.toString() !== userId) {
         return res.status(403).json({ message: "Non autorisé à supprimer ce service." });
      }

      await ServiceRepository.delete(id);

      res.status(200).json({
         success: true,
         message: "Service supprimé avec succès.",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Erreur lors de la suppression du service.",
         error: error.message,
      });
   }
};

module.exports = {
   createService,
   getAllServices,
   getServiceById,
   updateService,
   deleteService
};
