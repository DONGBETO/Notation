const multer = require('multer');
const path = require('path');

// Config stockage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/'); // créer ce dossier si inexistant
   },
   filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueName + path.extname(file.originalname));
   }
});

// Filtrage type fichier
const fileFilter = (req, file, cb) => {
   const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
   if (allowed.includes(file.mimetype)) {
      cb(null, true);
   } else {
      cb(new Error('Type de fichier non autorisé. Seules les images sont acceptées.'), false);
   }
};

const upload = multer({
   storage,
   fileFilter,
   limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

module.exports = upload;
