const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({}, { strict: false });
module.exports = mongoose.model('packetstore', logSchema,'packetstore');