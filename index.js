const command = require('./command');
const output = require('./output');
const Player = require('./model/player');
const State = require('./state');

class Main {
  constructor(opts) {
    output.fn = this.sendOutput.bind(this);
    this.world_data = opts.world_data;

    this.player = new Player();
    this.player.initMap(this.world_data);

    command.addSubscriber(['end', 'quit', 'q'], () => { output.msg('game over'); return false; });
    this.output_fn = opts.output;
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
    State.push(stateFrame);
    return command.do(str);
  }
  sendOutput(m, opts) {
    const stateFrame = {
      action:'output',
      value:m,
      outputOpts:opts
    }
    State.push(stateFrame);
    if (this.output_fn) this.output_fn(m, opts);
  }
  currentState() {
    return State;
  }
  addSubscriber(cmds, fn) {
    command.addSubscriber(cmds, fn);
  }
}

module.exports = Main;