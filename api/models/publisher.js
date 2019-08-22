const mongoose = require('mongoose');

const publishSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	Topic: String,
	Message: String

});

module.exports = mongoose.model('publish', publishSchema);