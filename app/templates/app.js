'use strict';

const Protocol = require('azure-iot-device-mqtt').Mqtt;
const {
  Client: DeviceClient,
  Message
} = require('azure-iot-device');
var TemperatureThreshold = 25;

const config = {
  connectionString: process.env.EdgeHubConnectionString,
  messageInterval: process.env.MessageInterval || 2000,
  maxTemp: process.env.MaxTemp || 40
};

function main() {
  const client = DeviceClient.fromConnectionString(config.connectionString, Protocol);
  client.open(err => {
    if (err) {
      console.error(`Connection error: ${err}`);
    } else {
      console.log('running...');
      client.on('message', (msg, context) => {
        try {
          var message = JSON.parse(msg.data.toString());
          if (parseInt(message.Temperature) > TemperatureThreshold) {
            console.log('sending');
            const data = {
              temperature: message.Temperature,
              properties: {
                MessageType: "Alert"
              },
              systemProperties: {
                outputName: "nodeAlertOutput"
              }
            };

            client.sendEvent(new Message(JSON.stringify(data)),
              err => {
                if (err) {
                  console.error(`Message send error: ${err}`);
                }
              });
          }
        } catch (e) {
          console.log("Invalid message: " + e);
          return;
        }
      });

      client.getTwin(function (err, twin) {
        if (err) {
          console.error('could not get twin');
        } else {
          twin.on('properties.desired', function (delta) {
            if (delta.TemperatureThreshold !== undefined) {
              TemperatureThreshold = delta.TemperatureThreshold;
            }
          });
        }
      });
    }
  });
}
main();