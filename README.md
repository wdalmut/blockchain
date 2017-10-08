# Blockchain example

Just a simple example of a blockchain without external dependencies

## Generate your key pairs

```
$ openssl ecparam -genkey -name secp256k1 -noout -out private.key
$ openssl ec -in private.key -pubout -out public.key
```

## Run it

```
$ node main.js
```

