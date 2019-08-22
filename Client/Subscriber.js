var mqtt = require('mqtt')
var clients=[]
var topic_prefix = "test_topic ";
var no_of_subscribers = 2;
var topic_per_subscriber = 1;
var totalMesages = 0;
var recievedMessages = [];
var subID_prefix = "sub_mxm ";
var fs = require('fs');
for(let j = 0; j < no_of_subscribers; j++){
  //'ws://ec2-3-95-242-235.compute-1.amazonaws.com:3000/mqtt/'
 // 'mqtt://ec2-3-95-242-235.compute-1.amazonaws.com:1886/'
let client  = mqtt.connect('ws://localhost:3000/mqtt/', {
  rejectUnauthorized: false,
  clientId: subID_prefix + j,
  clean: false
});
clients.push(client);
recievedMessages[j] = [];
clients[j].on('connect', function () {
  //no of topics each client subscribes 'topic_prefix 0', 'topic_prefix 1', ...
for(let i = 0; i < topic_per_subscriber; i++){
     var options = {}
     options[topic_prefix + i] = {qos:1};
     clients[j].subscribe(options)
     //clients[j].subscribe({"kkkkk":{qos:1}})
}
})
clients[j].on('message', function (topic, msg) {
  totalMesages++;
  var message = JSON.parse(msg)
  recievedMessages[j].push(message.messageID);
  // // console.log(recievedMessages[0])
  // //printing...
  // recievedMessages.forEach((key, value) => {console.log(key, value)})
})
}
setInterval(() => {
  for(let i =0; i < no_of_subscribers; i++) {
     if (recievedMessages[i].length !== 5){
        // console.log(recievedMessages[i]);
           }
        }
  console.log("TotalMessages: ", totalMesages);
}, 5000);