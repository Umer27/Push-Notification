const express = require('express');
const router = express.Router();


const Getuuid = require('../controllers/getuuid');

router.get('/', Getuuid.getuuid);




module.exports = router;