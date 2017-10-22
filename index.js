const fs = require('fs');
const command = require('./command');
const output = require('./output');
const Player = require('./model/player');

class Main {
  constructor(opts) {
    fs.readFile('./data/data.json', (err, data) => {
      if (err) { return this.onErr(err); }

      this.world_data = JSON.parse(data);

      this.player = new Player();
      this.player.initMap(this.world_data);

      command.addSubscriber(['end', 'quit', 'q'], () => { output.msg('game over'); return false; });
      output.fn = opts.output;
      if (opts.ready && typeof opts.ready === "function") opts.ready(this);
    })
  }
  setOutput(fn) {
    output.fn = fn;
  }
  onErr(err) {
    console.error(err);
    return 1;
  }
  sendCommand(str) {
    return command.do(str);
  }
}

module.exports = Main;