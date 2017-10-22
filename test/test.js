const Genmo = require('../index');
const prompt = require('prompt');
const assert = require('chai').assert;
let g;

beforeEach((done) => {
  g = new Genmo({
    ready:() => { done(); }
  })
});

describe('ls/list', () => {
  it('should have 2 items in state', (done) => {
    g.sendCommand('ls');
    assert.equal(g.currentState().length(), 2);
    done();
  });
});