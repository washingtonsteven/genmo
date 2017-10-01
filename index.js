const fs = require('fs');
const command = require('./command');

const Map = require('./model/map');
const Player = require('./model/player');

class Main {
  constructor() {
    fs.readFile('./data/data.json', (err, data) => {
      if (err) { return this.onErr(err); }

      this.world_data = JSON.parse(data);

      this.map = new Map(this.world_data);

      this.player = new Player(this.map.spawn);

      command.addSubscriber(['end', 'quit', 'q'], () => { return false; });
      command.start();
    })
  }
  onErr(err) {
    console.error(err);
    return 1;
  }
}

new Main();