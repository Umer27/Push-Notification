const express = require('express');
const router = express.Router();


const UndeliveredController = require('../controllers/undelivered');

router.get('/', UndeliveredController.undelivered_document);




module.exports = router;