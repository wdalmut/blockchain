# Network module

```js
const EventManager = require('events'),
    MessageStream = require('network/stream/message'),
    {connectPeer} = require('network/peer'),
    network = require('network');

const events = new EventManager();
const messageBox = new MessageStream();

events.on('raw.data', console.log);
events.on('block.mined', console.log);
events.on('transaction.append', console.log);
events.on('chain.from', console.log);

const addPeer = R.curry(connectPeer)(events, messageBox);

p2p = network(addPeer);

p2p.server.on('error', (err) => {
  throw err;
});

p2p.server.listen(8124, () => {
    console.log('server bound');
});

// test sending message...
setTimeout(() => {
  messageBox.add({test: true});
}, 10000);
```

