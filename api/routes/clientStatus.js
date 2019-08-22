const express = require('express');
const router = express.Router();


const ClientStatusController = require('../controllers/clientStatus');

router.get('/', ClientStatusController.clientStatus_document);




module.exports = router;