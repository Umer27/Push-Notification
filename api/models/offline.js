const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offlineSchema = new Schema({}, { strict: false });
module.exports = mongoose.model('ascoltatori', offlineSchema,'ascoltatori');