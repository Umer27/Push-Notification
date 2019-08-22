const express = require('express');
const router = express.Router();


const uuidController = require('../controllers/uuid');

router.post('/', uuidController.uuid);




module.exports = router;