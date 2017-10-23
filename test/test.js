const Genmo = require('../index');
const prompt = require('prompt');
const assert = require('chai').assert;
let g;

beforeEach((done) => {
  g = new Genmo({
    ready:() => { done(); }
  })
});

describe('Immutable History', () => {
  it('should have immutable history', (done) => {
    g.sendCommand('ls');
    const h = g.history().peek();
    h.action += "_modified";
    assert.notEqual(h.action, g.history().peek().action);
    done();
  });
});

describe('ls/list', () => {
  it('should have 2 items in state', (done) => {
    g.sendCommand('ls');
    const expectedOutput = "Available commands: ls,list,look,name,talk,move,end,quit,q";
    assert.equal(g.history().peek().value, expectedOutput);
    done();
  });
});