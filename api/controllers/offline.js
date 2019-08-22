const mongoose = require('mongoose');

const Offline = require('../models/offline');


exports.offline_document = (req,res,next) =>{

    console.log(Offline)
    Offline
    .find({})
    .exec()
    .then(docs=>{
        console.log(docs)
        res.status(200).json({
                        totalSubscribers: docs.length,
                        subscribers: docs.map(doc =>{
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