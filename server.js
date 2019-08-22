var mosca = require('mosca');
var mqtt = require('mqtt')
const mongoose = require('mongoose');
const apiServ = require('./apiServ')

mongoose.connect('mongodb://localhost:27017/mqtt');
mongoose.set('useCreateIndex', true);
// Define connection to MongoDB
var mongo_con = 'mongodb://localhost:27017/mqtt';
const statusClient = require('./api/models/statusClient');
// This settings is required to enable persistent session feature.
// All messages will be stored in MongoDB
var ascoltatore = {
type: 'mongo',
url: mongo_con,
size: 10 * 1024 * 1024 * 1024, // 10 GB
max: 50000 * 10000,
pubsubCollection: 'ascoltatori',
mongo: {}
};
// Final settings for Mosca MQTT broker
var settings = {
port: 1883,
backend: ascoltatore,
persistence: {
factory: mosca.persistence.Mongo,
stats: true,
url: mongo_con
}
};

// Define HTTP and MQTT servers
var http     = require('http'),
httpServ = http.createServer(),
mqttServ = new mosca.Server(settings);
// Attach HTTP to MQTT server
mqttServ.attachHttpServer(httpServ);



httpServ.listen(3000);
// Triggers when mqtt server is ready to accept requests
mqttServ.on('ready', ready);

// Triggers when new message is published
mqttServ.on('published', function(packet, client) {
console.log(packet.topic + ': ' + packet.payload);
});

function ready() {
        console.log('Mosca server is up and running');

        const client  = mqtt.connect('ws://127.0.0.1:3000/mqtt');

        client.on('connect', function () {
            client.subscribe('$SYS/+/disconnect/clients')
            client.subscribe('$SYS/+/new/clients')
        })

        client.on('message', function (topic, message) {
           //* message is basically id of client using this client
                                // id we will search database client status and update 
                                  // connected and disconnected status
                    statusClient
                    .find({clientId:message.toString()})
                    .then(docs => {
                        if(docs.length < 1){
                            const statusclient = new statusClient({
                                                    _id: new mongoose.Types.ObjectId(),
                                                    clientId:message.toString(),
                                                    Status: true
                                                });
                                                statusclient
                                                .save()
                                                .then(()=>{})
                                                .catch(err => {
                                                    console.log(err)
                                                    
                                                         });
                        }
                        else {
                            if(topic.includes("new/clients"))
                            {
                                statusClient
                                .updateOne({clientId:message.toString()},{$set: {Status:true}})
                                .exec()
                                .then()
                                .catch()
                                //update status to 1
                            }
                            else if(topic.includes("disconnect/clients")){
                                statusClient
                                .updateOne({clientId:message.toString()},{$set: {Status:false}})
                                .exec()
                                .then()
                                .catch()
                                // update status to 0
                            }
                        }
                    })
                    .catch()
        })

        client.on('error',(err)=>{
            console.log(err)
        })
}


