const output = require('./output');

class Command {
  constructor() {
    this.subscriptions = {};
    this.addSubscriber(['ls', 'list'], () => { this.listCommands(); });
  }
  addSubscriber(command, fn) {
    if (typeof command === "string") {
      if (!this.subscriptions[command]) {
        this.subscriptions[command] = [];
      }
      this.subscriptions[command].push(fn);
    } else if (Array.isArray(command)) {
      command.forEach((v) => {
        this.addSubscriber(v, fn);
      });
    }
  }
  do(command) {
    const parts = command.split(" ");
    const cmd = parts[0];
    const args = [...parts].slice(1);

    if (this.subscriptions[cmd]) {
      for (let i = 0; i < this.subscriptions[cmd].length; i++) {
        const fn = this.subscriptions[cmd][i];
        const result = fn(cmd, args);
        return result;
      }
    } else {
      output.msg(`I don't understand ${cmd}`);
    }
  }
  listCommands() {
    output.msg(`Available commands: ${Object.keys(this.subscriptions)}`);
  }
}

module.exports = new Command();