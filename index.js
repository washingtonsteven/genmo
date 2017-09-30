const fs = require('fs');
const Command = require('./command');

const Map = require('./model/map');
const Player = require('./model/player');

class Main {
  constructor() {
    fs.readFile('./data/data.json', (err, data) => {
      if (err) { return this.onErr(err); }

      this.world_data = JSON.parse(data);

      this.map = new Map(this.world_data);

      this.player = new Player(this.map.spawn);

      this.command = new Command();
      this.command.addSubscriber(['end', 'quit', 'q'], () => {
        return false;
      });
      this.command.addSubscriber('start', () => {
        console.log('start');
      });
      this.command.addSubscriber('start', () => {
        console.log('start2');
      });
      this.command.start();
    })
  }
  onErr(err) {
    console.error(err);
    return 1;
  }
}

new Main();