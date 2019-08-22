const mongoose = require('mongoose');

const floorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: String,
	coordinates: [Number]

});

module.exports = mongoose.model('floor', floorSchema);