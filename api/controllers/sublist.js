const mongoose = require('mongoose');

const Subscriptions = require('../models/subscriptions');


exports.sublist_document = (req,res,next) =>{

    console.log(Subscriptions);
    Subscriptions
    .find()
    .then(docs=>{
        res.status(200).json({
                        totalSubscribers: docs.length,
                        subscribers: docs.map(doci =>{
                            var doc = JSON.parse(JSON.stringify(doci))
                            return {
                                subscribedID: doc.client,
                                subscribedTopic:doc.topic,
                                subscribedDate:doc.added,
                                subscribedQOS:doc.qos
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