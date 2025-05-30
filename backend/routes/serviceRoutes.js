const express = require("express");
const router = express.Router();

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { tokenCheck } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { validateService } = require("../services/serviceValidate");
// const { isAdmin } = require("../middlewares/roleMiddleware"); // <-- ici

// Création d’un service (authentifié, image en upload)
router.post("/add", tokenCheck, upload.single("photo"), validateService, // middleware Joi
createService
);

// Récupérer tous les services
router.get("/", getAllServices);

// Récupérer un service par ID
router.get("/:id", getServiceById);

// Modifier un service
router.put(
  "/:id",
  tokenCheck,
  upload.single("photo"),
  validateService,
  updateService
);

// Supprimer un service
router.delete("/:id", tokenCheck, deleteService);

module.exports = router;
