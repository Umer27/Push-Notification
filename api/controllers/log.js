const mongoose = require('mongoose');

const Log = require('../models/log');


exports.log_document = (req,res,next) =>{
	Log
	.find()
	.then(docs=>{
		res.status(200).json({
						totaldoc: docs.length,
						Log: docs.map(doc =>{
							return doc
						})
  
					});
		
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})
  
}
	
	
