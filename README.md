# Push Notification

**Configuration**

```npm install'```

Replace the provided /lib folder to node_modules/mosca/lib 


**Push Notification**


mqtt is a lightweight protocol over tcp/ip, mainly used for iot devices,
but we can use mqtt for push notifications on pub/sub pattern.
In mqtt, there are three main components
1. publisher
2. subscriber
3. broker


**mosca**

It is  implementation of mqtt broker in node style, it does not support qos2.
it uses ascoltatori on its backend which gives different options for persistence.
mosca gives you hooks to get information about the packets, like 'published', 'deliverd', etc ...
at  different stages.it also support offline packet delivery (if the subscriber is offline and publisher sends it a notification).


**Persistence:**


store information of subscriber even if its offline so that it can deliver the packets as soon as subscriber connects to it.
To create a persistent client you have to set these options:
var options: {clean: false, clientId: ID}
by default clean flag is true
for message to be delivered if the client is offline you have to publish the message with qos:1
client.publish(topic, message, {qos:1})
we have changed the files in the lib folder to get some extra insights, like when message is delivered, or updated.
its worth noting that when there are two may clients connected to one broker, maxInflightMessages option can be configured, the broker disconnects the client, after that when client reconnects, it will get its undelivered messages.
If using mongo as persistence, offline packets have expiry associated with them, we created an extra packetstore collection to timestamp the packet when it was published and delivered or if its still undelivered.


**Priorty:**


priority can be added when publishing messages, broker will deliver the highest priority messages first;


` var message = {messageID:msgID,
                    message: "lastone",
                    retain: true,
                    priority:5};`
                    
                    
client.publish(topic, message, {qos:1})
There only qos 0,1,2 priority in mqtt, we have implemented our own way of prioritizing the packets.
lib/persistence/mosca.js at line 356  stream is sorted according to priority


`  var stream = this._packets.find({ client: client.id }).sort({'priority': -1}).stream();
`


**Mqtt over websockets:**

```
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

// MQTT server over webs socket
mqttServ.attachHttpServer(httpServ);


httpServ.listen(3000);
```

**changings made in mosca/lib :**

server.js

`line 647`

```
Server.prototype.storeDileveredPacket = function(client, messageId, callback) {
  if (callback) {
    callback();
  }
};

```


persistence/abstract.js

`line 86`

```
  server.storeDileveredPacket = function(client, messageId, packet, cb) {
    that.storeDileveredPacket(client, messageId, packet, cb);
  };
```


persistence/mongo.js

`line 400`


```
 this._packetstore.update({
    client: client.id,
    'packet.messageId': messageId
  }, {
    $set: { 'packet.messageId': packet.messageId }
  }, {w:1}, function(err) {
    cb(err, packet);
  });
};
```

**NOTE** : message id is per client per flow basis in Mqtt, so we have to update the messageid

`line 420`

```
MongoPersistence.prototype.storeDileveredPacket = function(client, messageId, cb) {
  var toSearch = {
    client: client.id,
    'packet.messageId': messageId
  };
  this._packetstore.findOneAndUpdate(toSearch, {$set: {delivered: new Date()}}, {sort : {'added': -1}});
};
```

