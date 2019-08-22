const mongoose = require('mongoose');

// const Subscriber = require('../models/subscriber');
// var mqtt = require('mqtt') 
// var client  = mqtt.connect('wss://ec2-3-95-242-235.compute-1.amazonaws.com:3000', {
//     rejectUnauthorized: false
//     });


exports.subscriber = (req,res,next) =>{
    
    // Subscriber
    // .find({UUID: req.body.uuid})
    // .exec()
    // .then(doc =>{
    //     if(doc.length < 1)                   //No Topic Exsists
    //     {                                
    //                 const subscriber = new Subscriber({
    //                     _id: new mongoose.Types.ObjectId(),
    //                     Topic: req.body.topic,
    //                     UUID: req.body.uuid
    //                 });
    //                 subscriber
    //                 .save()
    //                 .then(()=>{
    //                     client.on('connect', function () {
    //                         client.subscribe(req.body.topic)
    //                     })
                        

    //             res.status(200).json({
    //                 message: 'Topic has been Subscribed'
    //             });

    //         })
    //         .catch(err => {
    //             console.log(err)
    //             res.status(500).json({
    //                 error: err
    //             })
    //         });
    //     } 
    //      else
    //     {
            
    //         client.on('connect', function () {
    //             client.subscribe(req.body.topic)
    //         })
    //     }

    // })
    // .catch(()=>{

    //     console.log(err)
	// 	res.status(500).json({
	// 		error: err
    //     })
        
    // })
}
	
	
