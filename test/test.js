const fs = require('fs');
const path = require('path');
const Genmo = require('../index');
const assert = require('chai').assert;
let g;

beforeEach((done) => {
  fs.readFile(path.resolve(__dirname, '../data/data.json'), (err, data) => {
    if (err) { assert.fail('Setup incorrect: '+err); done(); return; }
    g = new Genmo({ world_data:JSON.parse(data) }); done();
  })
});

describe('ls/list', () => {
  it('should have 2 items in state', (done) => {
    g.sendCommand('ls');
    assert.equal(g.currentState().length(), 2);
    done();
  });
});

describe('state', () => {
  it('should be immutable', (done) => {
    g.sendCommand('ls');
    const localState = g.currentState().peek();
    localState.newProp = 'newValue';
    assert.notProperty(g.currentState().peek(), 'newProp', 'newProps exists! Oh no.');
    done();
  });
})