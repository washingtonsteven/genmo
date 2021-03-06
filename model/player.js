const command = require('../command');
const Map = require('./map');
const output = require('../output');

class Player {
  constructor(name) {
    this.name = name || "Player";

    command.addSubscriber('look', () => { this.doLook(); });
    command.addSubscriber('name', (cmd, args) => { this.namePlayer(args) });
    command.addSubscriber('talk', (cmd, args) => { this.doTalk(args); });
    command.addSubscriber('move', (cmd, args) => { this.doMove(args); });
  }
  initMap(world_data) {
    this.map = new Map(world_data);
    this.currentTile = this.map.spawn;
  }
  doLook(opts) {
    if (this.currentTile) {
      output.msg(this.currentTile.description, opts);
    } else {
      output.msg("You are apparently floating in a void!");
    }
  }
  namePlayer(args) {
    if (args && args.length > 0) {
      this.name = args[0];
      output.msg(`Your name is now ${this.name}`);
    } else {
      output.msg(`Your name is ${this.name}`);
    }
  }
  doTalk(args) {
    if (!this.currentTile.npcs || this.currentTile.npcs.length === 0) {
      output.msg("There is no one here for you to talk to");
      return;
    }

    if (!args || args.length === 0) {
      // output.msg('The following people are in the area: ');
      // for (let i = 0; i < this.currentTile.npcs.length; i++) {
      //   const npc = this.currentTile.npcs[i];
      //   output.msg(`\t[${i+1}] ${npc.name}`);
      // }
      const npcMessage = {
        msg:'The following people are in the area:\n',
        data:[],
        command:'talk'
      }

      for(let i = 0; i < this.currentTile.npcs.length; i++) {
        npcMessage.msg += `\t[${i+1}] ${this.currentTile.npcs[i].name}\n`
        npcMessage.data.push({ index:(i+1), val:this.currentTile.npcs[i].name });
      }

      output.msg(npcMessage);
    } else {
      let npcIndex = +args[0];
      //re: these checks - remember that npcIndex given via prompt is 1-based
      if (isNaN(npcIndex) || npcIndex < 1 || npcIndex > this.currentTile.npcs.length) {
        output.msg('Invalid NPC id');
      } else {
        npcIndex -= 1;
        const npc = this.currentTile.npcs[npcIndex];
        output.msg(`${npc.name} says "${npc.responses.default}"`);
      }
    }
  }
  doMove(args) {
    const neighbors = this.map.getNeighbors(this.currentTile);
    if (!args || args.length === 0) {
      let msg = `You can travel: ${Object.keys(neighbors).join(", ")}`;
      const dirData = {
        msg,
        data:[],
        command:'move'
      }
      for(let i = 0; i < Object.keys(neighbors).length; i++) {
        dirData.data.push({ index:i, val:Object.keys(neighbors)[i] });
      }
      output.msg(dirData);
      return;
    }
    const direction = args[0];
    if (neighbors[direction]) {
      this.currentTile = neighbors[direction];
      this.doLook({justMoved:true});
    } else {
      output.msg(`You can't move in that direction! (${direction})`);
    }
  }
}

module.exports = Player;