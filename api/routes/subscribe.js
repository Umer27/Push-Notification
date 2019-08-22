const express = require('express');
const router = express.Router();


const Subscriber = require('../controllers/subscriber');

router.get('/', Subscriber.subscriber);




module.exports = router;