const Genmo = require('../index');
const prompt = require('prompt');
const assert = require('chai').assert;
const sinon = require('sinon');
const spy = sinon.spy();
let g;

before(() => {
  g = new Genmo({
    ready:() => {
      beginTests();
    },
    output:(m, opts) => {
      console.log(`\tbuffered output: ${m} (${opts})`);
    }
  });
});

function start() {
  // prompt.start();
  // getPrompt();
  beginTests();
}

function beginTests() {
  // Command Tests
  describe("Baseline", () => {
    it('should be true', () => {
      assert.isTrue(true);
    })
  });
  describe('Command', () => {
    testList();
  })
}

function testList() {
  describe('#list', () => {
    it('should list all available commands', () => {
      //var s = sinon.spy();
      g.addSubscriber('ls', spy);
      g.sendCommand('ls');
      assert.isTrue(spy.called);
    })
  });
}

function getPrompt() {
  prompt.get("command", (err, result) => {
    if (err) { output.error('Error parsing prompt'); return; }
    const cmdResult = g.sendCommand(result.command);
    if (cmdResult === false) {
      process.exit();
    } else {
      getPrompt();
    }
  });
}