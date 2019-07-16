/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors");

var uuid = require("uuid");
var Protocol = require("azure-iot-device-mqtt").Mqtt;
var Client = require("azure-iot-device").Client;
var Message = require("azure-iot-device").Message;

var connectionString =
  "HostName=QRSCAN.azure-devices.net;DeviceId=QR_scan;SharedAccessKey=ctMFOExCLgRxAjPldFhFD+He6Ya/0apovJMFakKWxnI=";
if (!connectionString) {
  //console.log('Please set the DEVICE_CONNECTION_STRING environment variable.');
  process.exit(-1);
}
var client = Client.fromConnectionString(connectionString, Protocol);
const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:
app.post("/", (req, res) => {
  //var newCustomer = req.body;
  console.log(req.body);

  client.open(function(err) {
    if (err) {
      console.error("Could not connect: " + err.message);
    } else {
      console.log("Client connected");

      client.on("error", function(err) {
        console.error(err.message);
        process.exit(-1);
      });

      // any type of data can be sent into a message: bytes, JSON...but the SDK will not take care of the serialization of objects.
      var message = new Message(JSON.stringify(req.body));
      // A message can have custom properties that are also encoded and can be used for routing
      message.properties.add("propertyName", "propertyValue");

      // A unique identifier can be set to easily track the message in your application
      message.messageId = uuid.v4();

      console.log("Sending message: " + message.getData());
      client.sendEvent(message, function(err) {
        if (err) {
          console.error("Could not send: " + err.toString());
          process.exit(-1);
        } else {
          console.log("Message sent: " + message.messageId);
          //process.exit(0);
        }
      });
    }
  });
  res.json({ message: "You are sending post request." });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node JS application." });
});

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
