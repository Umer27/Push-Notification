const express = require('express');
const router = express.Router();


const LogController = require('../controllers/log');

router.get('/', LogController.log_document);




module.exports = router;