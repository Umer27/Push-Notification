var mqtt = require('mqtt')


exports.test = class{

constructor(
    topic,
    message,
    pubID,
    qos,
    retain,
    messageID
){
    this.topic = topic;
    this.message = message;
    this.pubID = pubID;
    this.qos = qos;
    this.retain = retain;
    this.messageID = messageID;

    var messagePub = {
        messageID:this.messageID,
        message: this.message
    };

    var options = {
        qos:this.qos,
        retain:this.retain
    }

    var topic = this.topic;

    let client  = mqtt.connect('ws://localhost:3000/mqtt/', {
                    rejectUnauthorized: false,
                    clientId: this.pubID
                    });


    client.on('connect', function () {
       
        //console.log("_____",this.topic, JSON.stringify(messagePub),options)
        client.publish(topic, JSON.stringify(messagePub),options);
        client.end();
    });

    client.on('message', function () {

    });


}

}
