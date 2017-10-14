# Network module

```js
const MessageStream = require('network/stream/message'),
    {connectPeer} = require('network/peer'),
    network = require('network');

const messageBox = new MessageStream();

messageBox.on('raw.data', console.log);
messageBox.on('block.mined', console.log);
messageBox.on('transaction.append', console.log);
messageBox.on('chain.from', console.log);

const addPeer = R.curry(connectPeer)(messageBox);

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

