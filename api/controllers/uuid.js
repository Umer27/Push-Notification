const mongoose = require('mongoose');

const Uuid = require('../models/uuid');
var mqtt = require('mqtt')
var client  = mqtt.connect('wss://ec2-3-95-242-235.compute-1.amazonaws.com:3000', {
    rejectUnauthorized: false
});



exports.uuid = (req,res,next) =>{
    Uuid
    .find({UUID: req.body.uuid})
    .exec()
    .then(doc =>{
        if(doc.length < 1)                   //No UUID Exsists
        {                                
                    const uuid = new Uuid({
                        _id: new mongoose.Types.ObjectId(),
                        UUID: req.body.uuid
                    });
                    uuid
                    .save()
                    .then(()=>{
                            client.subscribe(req.body.uuid)
                          
                    res.status(200).json({
                    message: 'UUID has been suscribed & stored'
                });

            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            });
        } 
         else
        {
                client.subscribe(req.body.uuid)
              
            res.status(200).json({
                message: 'UUID Already Exsist'
            })
        }

    })
    .catch(()=>{

        console.log(err)
		res.status(500).json({
			error: err
        })
        
    })
}
	
	
