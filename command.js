const prompt = require('prompt');

class Command {
  constructor(p = "command") {
    this.currentPrompt = p;
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
  start() {
    prompt.start();
    this.waitForCommand();
  }
  waitForCommand() {
    prompt.get(this.promptProperties, (err, res) => {
      if (err) { console.error(err); return; }
      const parts = res.command.split(" ");
      const cmd = parts[0];
      const args = [...parts].slice(1);
      let doContinue = true;

      if (this.subscriptions[cmd]) {
        for (let i = 0; i < this.subscriptions[cmd].length; i++) {
          const fn = this.subscriptions[cmd][i];
          const result = fn(cmd, args);
          if (doContinue !== false)
            doContinue = result;
        }
      } else {
        console.log(`I don't understand '${cmd}'`);
      }

      if (doContinue !== false) {
        this.waitForCommand();
      } else {
        console.log('Goodbye.');
        process.exit(0);
      }
    });
  }
  listCommands() {
    console.log(`Available commands: ${Object.keys(this.subscriptions)}`);
  }
  get promptProperties() {
    return {
      properties:{
        command:{
          description:this.currentPrompt
        }
      }
    }
  }
}

module.exports = new Command();