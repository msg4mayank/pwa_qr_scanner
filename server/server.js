const bodyParser = require('body-parser');
var cors = require('cors');

var uuid = require('uuid');
var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('cert/privateKey.key', 'utf8');
var certificate = fs.readFileSync('cert/certificate.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
const express = require('express');
var connectionString = 'HostName=QRSCAN.azure-devices.net;DeviceId=QR_scan;SharedAccessKey=ctMFOExCLgRxAjPldFhFD+He6Ya/0apovJMFakKWxnI=';
if (!connectionString) {
  console.log('Please set the DEVICE_CONNECTION_STRING environment variable.');
  process.exit(-1);
}

// fromConnectionString must specify a transport constructor, coming from any transport package.
var client = Client.fromConnectionString(connectionString, Protocol);

// create express app
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//
app.use(cors());
// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Welcome to Node JS application." });
});

app.post('/', (req, res) => {
  //var newCustomer = req.body;
  console.log(req.body);

  client.open(function (err) {
    if (err) {
      console.error('Could not connect: ' + err.message);
    } else {
      console.log('Client connected');

      client.on('error', function (err) {
        console.error(err.message);
        process.exit(-1);
      });

      // any type of data can be sent into a message: bytes, JSON...but the SDK will not take care of the serialization of objects.
      var message = new Message(JSON.stringify(req.body));
      // A message can have custom properties that are also encoded and can be used for routing
      message.properties.add('propertyName', 'propertyValue');

      // A unique identifier can be set to easily track the message in your application
      message.messageId = uuid.v4();

      console.log('Sending message: ' + message.getData());
      client.sendEvent(message, function (err) {
        if (err) {
          console.error('Could not send: ' + err.toString());
          process.exit(-1);
        } else {
          console.log('Message sent: ' + message.messageId);
          //process.exit(0);
        }
      });
    }
  });
  res.json({ "message": "You are sending post request." });
  //res.end("Post Successfully: \n" + JSON.stringify(newCustomer, null, 4));
});

// listen for 
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(9090, () => {
  console.log("HTTP Server is listening on port 9090");
});
httpsServer.listen(9443, () => {
  console.log("HTTPS Server is listening on port 9443");
});


/*app.listen(9090, () => {
  console.log("Server is listening on port 9090");
});*/

