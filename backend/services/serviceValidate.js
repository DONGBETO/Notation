const Joi = require('joi');

// Schéma Joi
const serviceSchema = Joi.object({
   nom_entreprise: Joi.string().min(2).required(),
   desc_service: Joi.string().min(10).required(),
   numero: Joi.string().pattern(/^\d+$/).required().messages({
      "string.pattern.base": "Le numéro doit contenir uniquement des chiffres."
   }),
});

// Middleware de validation
const validateService = (req, res, next) => {
   const { error } = serviceSchema.validate(req.body, { abortEarly: false });
   if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({ message: "Validation échouée", errors });
   }
   next();
};

module.exports = { validateService };
