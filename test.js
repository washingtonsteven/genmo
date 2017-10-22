const Genmo = require('./index');
const prompt = require('prompt');

const g = new Genmo({
  ready:() => {
    start();
  },
  output:(m, opts) => {
    console.log(`\tbuffered output: ${m} (${opts})`);
  }
});

function start() {
  prompt.start();
  getPrompt();
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