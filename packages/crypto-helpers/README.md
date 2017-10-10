# Crypto helpers

Methods:

 * `hash` - Create a SHA256 hash
 * `sign` - Sign using private key
 * `verify` - Verifiy a signature with public key

```js
const {hash, sign, verify} = require('crypto-helpers');
```

## Hash

```js
const somethingHash = hash('something'); // hex value
```

## Signature

```
const keys = {
    priv: `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIMFXriqA9nZG1rw5oRNW5Phu8csodj9p8vaAJdy7u+VsoAcGBSuBBAAK
oUQDQgAESmMJ3U7H/G8nRVn6MoNy/xxYU4DHJd6KsfqpuIoSPk4CIBbI4zyClzzO
MlyfhZQ32LD4Wi4yyrvAJkdo09Ba8Q==
-----END EC PRIVATE KEY-----`,
    pub: `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAESmMJ3U7H/G8nRVn6MoNy/xxYU4DHJd6K
sfqpuIoSPk4CIBbI4zyClzzOMlyfhZQ32LD4Wi4yyrvAJkdo09Ba8Q==
-----END PUBLIC KEY-----`,
}

const signature = crypto.sign(keys.priv, 'something'); // signature string
```

## Verify a signature

```js
crypto.verify(keys.pub, signature, 'something'); // true or false
```

