# ioChat-server
Server for a realtime chat using Socket.io. You can send text messages and location coordinates.

# Description

This is a node.js server to use with Socket.io. Use it to send and receive text messages.

This project was made to be used with an iOS and watchOS app. If you are interested in getting all three platforms working together you can download the app [here](https://github.com/cmaciasjimenez/ioChat-app). The app adds the location functionality allowing the user to send his position from an iPhone or an Apple Watch. The Position will be displayed on the map in the browser using the Google Maps API.

## Message types:

- Text: ["type": "messages", "value": "message-string"]

- Position (only if using the iOS app): ["type": "position", "latitude": latitude, "longitude": longitude]

### Dependencies

- node.js
- npm

### How to install

<pre>
git clone https://github.com/cmaciasjimenez/ioChat-server
cd ioChat-server
npm install
</pre>

### How to configure

+ The server is configured to listen in port 3000. You can modify that folder using the env variable 'PORT'.
+ If you'd like to use the map, you need to set your Google Maps API Key in the index.html file.

### How to run

<pre>
npm start
</pre>
