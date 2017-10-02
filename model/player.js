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
    command.addSubscriber('talk', (cmd, args) => { this.doTalk(args) });
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
  doTalk(args) {
    if (!this.currentTile.npcs || this.currentTile.npcs.length == 0) {
      console.log("There is no one here for you to talk to");
      return;
    }

    if (!args || args.length == 0) {
      console.log('The following people are in the area: ');
      for (let i = 0; i < this.currentTile.npcs.length; i++) {
        const npc = this.currentTile.npcs[i];
        console.log(`\t[${i+1}] ${npc.name}`);
      }
    } else {
      let npcIndex = +args[0];
      //re: these checks - remember that npcIndex given via prompt is 1-based
      if (isNaN(npcIndex) || npcIndex < 1 || npcIndex > this.currentTile.npcs.length) {
        console.log('Invalid NPC id');
      } else {
        npcIndex -= 1;
        const npc = this.currentTile.npcs[npcIndex];
        console.log(`${npc.name} says "${npc.responses.default}"`);
      }
    }
  }
}

module.exports = Player;