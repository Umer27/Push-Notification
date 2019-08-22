const mongoose = require('mongoose');
const {test} = require('./test.js')




exports.publisher = (req,res,next) =>{
    
    var topic = req.body.topic;
    var message = req.body.message;
    var pubID = req.body.pubID;
    var qos = req.body.qos;
    var retain = req.body.retain;
    var messaageID = req.body.messaageID;

    new test(topic,message,pubID,qos,retain,messaageID)

    res.status(200).json({
        pub: "Published"
    })
   
}

	
	
