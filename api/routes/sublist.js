const express = require('express');
const router = express.Router();


const subListController = require('../controllers/sublist');

router.get('/', subListController.sublist_document);




module.exports = router;