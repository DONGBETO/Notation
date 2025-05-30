const mongoose = require('mongoose');
const Avis = require('../models/Avis');

// Créer ou mettre à jour un avis
const createOrUpdateAvis = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const userId = req.user.id;
    const { note, commentaire } = req.body;

    if (note < 0 || note > 10) {
      return res.status(400).json({ success: false, message: "La note doit être entre 0 et 10." });
    }

    // Chercher si un avis existe déjà pour ce service et utilisateur
    let avis = await Avis.findOne({ serviceId, createdBy: userId });

    if (avis) {
      // Mise à jour
      avis.note = note;
      avis.commentaire = commentaire || avis.commentaire;
      await avis.save();
      return res.json({ success: true, message: "Avis mis à jour.", avis });
    } 

    // Création d’un nouvel avis
    avis = new Avis({
      serviceId,
      createdBy: userId,
      note,
      commentaire,
    });

    await avis.save();
    res.status(201).json({ success: true, message: "Avis créé.", avis });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
  }
};

// Calculer et retourner la note moyenne d’un service
const getAverageNote = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const result = await Avis.aggregate([
      { $match: { serviceId: new mongoose.Types.ObjectId(serviceId) } },
      {
        $group: {
          _id: "$serviceId",
          averageNote: { $avg: "$note" },
          totalAvis: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return res.json({ success: true, averageNote: 0, totalAvis: 0 });
    }

    res.json({ success: true, averageNote: result[0].averageNote, totalAvis: result[0].totalAvis });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
  }
};

//Avoir les avis sur un service 
const getAvisByService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const avis = await Avis.find({ serviceId }).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: avis.length,
      avis,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des avis :', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: error.message,
    });
  }
};


module.exports = {
  createOrUpdateAvis,
  getAverageNote,
  getAvisByService,
};
