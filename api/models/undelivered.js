const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const undeliveredSchema = new Schema({}, { strict: false });
module.exports = mongoose.model('packets', undeliveredSchema);