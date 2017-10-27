const fs = require('fs');
const command = require('./command');
const output = require('./output');
const Player = require('./model/player');
const ActionHistory = require('./actionHistory');

class Main {
  constructor(opts) {
    output.fn = this.sendOutput;
    fs.readFile(__dirname+'/data/data.json', (err, data) => {
      if (err) { return this.onErr(err); }

      this.world_data = JSON.parse(data);

      this.player = new Player();
      this.player.initMap(this.world_data);

      command.addSubscriber(['end', 'quit', 'q'], () => { output.msg('game over'); return false; });
      this.output_fn = opts.output;
      output.fn = this.output_fn;
      if (opts.ready && typeof opts.ready === "function") opts.ready(this);
    })
  }
  setOutput(fn) {
    this.output_fn = fn;
  }
  onErr(err) {
    console.error(err);
    return 1;
  }
  sendCommand(str) {
    const stateFrame = {
      action:'command',
      value:str
    };
    ActionHistory.push(stateFrame);
    return command.do(str);
  }
  sendOutput(m, opts) {
    const stateFrame = {
      action:'output',
      value:m,
      outputOpts:opts
    }
    ActionHistory.push(stateFrame);
    if (this.output_fn) this.output_fn(m, opts);
    else console.log('idk');
  }
  history() {
    return ActionHistory;
  }
  addSubscriber(cmds, fn) {
    command.addSubscriber(cmds, fn);
  }
}

module.exports = Main;