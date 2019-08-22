
const mongoose = require('mongoose');

const uuidSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	UUID: String

});

module.exports = mongoose.model('uuid', uuidSchema);