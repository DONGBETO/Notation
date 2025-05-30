const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  }
}, { timestamps: true });

avisSchema.index({ createdBy: 1, serviceId: 1 }, { unique: true }); // un seul avis par utilisateur et service

module.exports = mongoose.model('Avis', avisSchema);
