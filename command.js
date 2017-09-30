const prompt = require('prompt');

class Command {
  constructor() {
    this.subscriptions = {};
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
  start() {
    prompt.start();
    this.waitForCommand();
  }
  waitForCommand() {
    prompt.get(["command"], (err, res) => {
      if (err) { console.error(err); return; }
      const parts = res.command.split(":");
      const cmd = parts[0];
      const args = [...parts].slice(1);
      let doContinue = true;

      if (this.subscriptions[cmd]) {
        for (let i = 0; i < this.subscriptions[cmd].length; i++) {
          const fn = this.subscriptions[cmd][i];
          const result = fn(args);
          if (doContinue !== false)
            doContinue = result;
        }
      }

      if (doContinue !== false) {
        this.waitForCommand();
      }
    });
  }
}

module.exports = Command;