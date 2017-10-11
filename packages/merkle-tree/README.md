# Merkle Tree

A simple merkle tree implementation using arrays

Methods:

 * `add`
 * `height`
 * `leafs`
 * `clean`
 * `top`
 * `validate`
 * `remove`

```js
const {
    add,
    height,
    leafs,
    clean,
    top,
    validate,
    remove,
} = require('merkle-tree');
```


## Create a new tree

```js
let tree = [];
```

## Append a new node

```js
tree = add(hashFn, tree, 'any data');
```

You can use any custom hashing function:

```js
const crypto = require('crypto');

const hash = (data) => {
  let hash = crypto.createHash('ripemd160');
  hash.update(data);
  return hash.digest('hex');
};

tree = add(hash, [], 'any data');

console.log(tree); // [{"data":"any data","hash":"dbe8265146f2539c6182bd9a203351d3b2377a3f"}]
```

## Validate a Merkle tree

```js
const status = validate(hashFn, tree); // true or false
```

## Get only leafs

```js
const l = leafs(tree); // [{"data":"any data","hash":"dbe8265146f2539c6182bd9a203351d3b2377a3f"}]
```

## Get only your data

```js
const l = clean(tree); // ['any data']
```

### No empty values

When your tree is padded to be a complete tree

```js
const l = clean(tree); // ['any data', 'any data', '']
const e = clean(tree, true); // ['any data', 'any data']
```

## Get tree height

```js
const h = height(tree); // 1 [one level]
```

## Get the root hash

```js
const rootHash = top(tree); // 'dbe8265146f2539c6182bd9a203351d3b2377a3f'
```

## Remove elements

```js
const newTree = remove(() => 'hash', tree, (item) => (item != 'any data custom') ? true : false);
```

