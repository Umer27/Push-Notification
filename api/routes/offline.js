const express = require('express');
const router = express.Router();


const OfflineController = require('../controllers/offline');

router.get('/', OfflineController.offline_document);




module.exports = router;