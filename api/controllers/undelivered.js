const mongoose = require('mongoose');

const Undelivered = require('../models/undelivered');

exports.undelivered_document = (req,res,next) =>{
  Undelivered
  .find()
  .then(docs=>{
      res.status(200).json({
                      totalUndelivered: docs.length,
                      undelivered: docs.map(doc =>{
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

