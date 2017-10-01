const command = require('../command');
class Player {
  constructor(name, currentTile) {
    if (typeof name !== "string") {
      currentTile = name;
      name = "Player";
    }
    this.name = name;
    this.currentTile = currentTile;

    command.addSubscriber('look', () => { this.doLook() });
    command.addSubscriber('name', (cmd, args) => { this.namePlayer(args) });
  }
  doLook() {
    if (this.currentTile) {
      console.log(this.currentTile.description);
    } else {
      console.log("You are apparently floating in a void!");
    }
  }
  namePlayer(args) {
    if (args && args.length > 0) {
      this.name = args[0];
      console.log(`Your name is now ${this.name}`);
    } else {
      console.log(`Your name is ${this.name}`);
    }
  }
}

module.exports = Player;