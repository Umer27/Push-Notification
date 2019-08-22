const mongoose = require('mongoose');

const Uuid = require('../models/uuid');

exports.getuuid = (req,res,next) =>{
    Uuid
    .find()
	.exec()
	.then(docs => {
		
		res.status(200).json({
			count: docs.length,
			uuid: docs.map(doc =>{
				return {
					UUID: doc.UUID
				}
			})
		});
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({
			error: err,
			Umer: "database Error"
		})
	});
}
