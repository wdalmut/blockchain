const add = (hash, tree, data) => {
  let block = {data, hash: hash(JSON.stringify(data))};

  let nodes = leafs(tree).filter((item) => (item) ? true : false).concat([block]);

  if (nodes.length === 1) {
    return nodes;
  }

  let baseNodes = Math.pow(2, Math.ceil(Math.log(nodes.length) / Math.log(2)));

  nodes = nodes.concat(Array.apply(null, new Array(baseNodes)).map(() => '')).slice(0, baseNodes);

  for (let j=0; nodes.slice(j).length > 1; j+=2) {
    let blocks = nodes.slice(j, j+2).map((block) => (block instanceof Object) ? block.hash : block);
    nodes = nodes.concat(hash(blocks.join('')));
  }

  return nodes;
};

const validate = (hash, tree) => {
  let topHash = top(tree);

  let values = clean(tree); // without empty hashes
  let nodeHashes = hashes(tree);

  for (let i=0; i<values.length; i++) {
    if (hash(JSON.stringify(values[i])) != nodeHashes[i]) {
      return false;
    }
  }

  let all = nodeHashes.concat(tree.slice(nodeHashes.length));

  for (let i=0, j=Math.pow(2, height(tree)-1); j<all.length; i+=2, j++) {
    if (hash(all[i]+all[i+1]) != all[j]) {
      return false;
    }
  };

  return true;
};

const hashes = (tree) => {
  return leafs(tree).map((leaf) => (leaf instanceof Object) ? leaf.hash : leaf);
};

const clean = (tree, notEmpty = false) => {
  return leafs(tree).filter((item) => (item || notEmpty) ? true : false).map((leaf) => (leaf instanceof Object) ? leaf.data : '');
};

const top = (tree) => {
  return tree.slice(-1).map((leaf) => (leaf instanceof Object) ? leaf.hash : leaf)[0];
};

const leafs = (tree) => {
  return tree.slice(0, Math.pow(2, height(tree)-1));
};

const height = (tree) => {
  let rem = tree.length, height = 0;

  while (rem >= 1) {
    ++height;
    rem /= 2;
  }

  return height;
};

const remove = (hash, tree, compare) => {

  let hashAdd = ((hash) => (tree, data) => add(hash, tree, data))(hash);

  return clean(tree)
    .filter(compare)
    .reduce((memo, transaction) => hashAdd(memo, transaction), [])
  ;
};

module.exports = {
  height,
  leafs,
  clean,
  add,
  top,
  validate,
  remove,
};
