const from = (chain, index) => {
  return chain.slice(index-1);
};

module.exports = {
  from,
};
