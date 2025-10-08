const { required } = require('joi');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
   nom_entreprise: { type: String, required: true },
   desc_service: { type: String, required: true },
   numero: { type: String, required: true },
   photo: { type: String, required: true },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
