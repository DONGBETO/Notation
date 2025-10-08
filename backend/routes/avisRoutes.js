const express = require('express');
const router = express.Router({ mergeParams: true });

const { createOrUpdateAvis, getAverageNote, getAvisByService} = require('../controllers/avisController');
const { tokenCheck } = require('../middlewares/authMiddleware');

router.post('/', tokenCheck, createOrUpdateAvis);
router.get('/moyenne', getAverageNote);
router.get('/', getAvisByService);

module.exports = router;
