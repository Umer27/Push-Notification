const express = require('express');
const router = express.Router();


const PublishController = require('../controllers/publisher');

router.post('/', PublishController.publisher);




module.exports = router;