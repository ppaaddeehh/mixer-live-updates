# mixer-live-updates
 
 A JavaScript based mixer client used to interface with Mixers live updates

## Installation

> npm install --save mixer-live-updates

## Usage

```javascript
const MixerClient = require("./mixerClient");

const mixerClient = new MixerClient(
  StreamerID, //id of the streamer you watch for updates
  "Client-ID"
);

```

## Listen for Updates

Listening for live viewer count

#### code
```javascript

mixerClient.on("viewerCount", data => {
  console.log(data);
});

```

#### response

```json
{ viewerCount: 1234 }
```

Listen for stream state updates

#### code

```javascript
mixerClient.on("onlineNotification", () => {
    //the channel has just gone line
});

```

## live events

### onlineNotification
### offlineNotification
### viewerCount
