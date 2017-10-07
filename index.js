const fs = require('fs');
const command = require('./command');
const Player = require('./model/player');

class Main {
  constructor() {
    fs.readFile('./data/data.json', (err, data) => {
      if (err) { return this.onErr(err); }

      this.world_data = JSON.parse(data);

      this.player = new Player();
      this.player.initMap(this.world_data);

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