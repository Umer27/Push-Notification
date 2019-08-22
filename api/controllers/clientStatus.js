const mongoose = require('mongoose');

const ClientStatus = require('../models/statusClient');


exports.clientStatus_document = (req,res,next) =>{
	ClientStatus
	.find()
	.then(docs=>{
		res.status(200).json({
						totalClients: docs.length,
						Docs: docs.map(doci =>{
							var doc = JSON.parse(JSON.stringify(doci))
                            return {
                                clientId: doc.clientId,
                                Status:doc.Status
                            }
						})
  
					});
		
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})
  
}
	
	
