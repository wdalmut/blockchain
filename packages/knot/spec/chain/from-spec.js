const message = require('network/stream/message'),
  chainFrom = require('../../chain/from');

describe("Chain From", () => {
  let m = null

  beforeEach(() =>{
    m = {stream: message(), chain: []};
  });

  it("should reply with the whole chain", (done) => {

    m.stream.on('data', (data) => {
      expect(JSON.parse(data)).toEqual({type:"partial",data:[{index:1},{index:2},{index:3}]});
      done();
    });

    m.chain = [{index: 1}, {index: 2}, {index: 3}];
    chainFrom(m)([]);
  });

  it("should reply with a partial chain", (done) => {

    m.stream.on('data', (data) => {
      expect(JSON.parse(data)).toEqual({type:"partial",data:[{index:1},{index:2},{index:3}]});
      done();
    });

    m.chain = [{index: 1}, {index: 2}, {index: 3}];
    chainFrom(m)([{index: 1}]);
  });

  it("should reply with a partial chain in a middle point", (done) => {

    m.stream.on('data', (data) => {
      expect(JSON.parse(data)).toEqual({type:"partial",data:[{index:3},{index:4},{index:5}]});
      done();
    });

    m.chain = [{index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}];
    chainFrom(m)([{index: 3}]);
  });

  it("should reply with a partial chain in a middle point with invalid head", (done) => {

    m.stream.on('data', (data) => {
      expect(JSON.parse(data)).toEqual({type:"partial",data:[{index:3},{index:4},{index:5}]});
      done();
    });

    m.chain = [{index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}];
    chainFrom(m)([{index: 8}, {index: 3}]);
  });

  it("should reply with the whole chain on wrong chain", (done) => {

    m.stream.on('data', (data) => {
      expect(JSON.parse(data)).toEqual({type:"partial",data:[{index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}]});
      done();
    });

    m.chain = [{index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}];
    chainFrom(m)([{index: -1}]);
  });
});
