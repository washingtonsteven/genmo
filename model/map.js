const MapTile = require('./maptile');

class Map {
  constructor(world_data) {
    if (!world_data || !world_data.map) {
      console.error('No map data found in JSON');
      return;
    }
    this.map = this.createMap(world_data);
  }
  createMap(world_data) {
    let newMap = [];
    for (let i = 0; i < world_data.map.length; i++) {
      newMap[i] = []
      for(let j = 0; j < world_data.map[i].length; j++) {
        newMap[i][j] = this.createTile(world_data.map[i][j], world_data);
        newMap[i][j].coords = { x:j, y:i };
      }
    }
    return newMap;
  }
  createTile(id, world_data) {
    if (world_data.map_tiles && world_data.map_tiles[id]) {
      const tile_data = world_data.map_tiles[id];
      return new MapTile(tile_data);
    }
    return null;
  }
  getTile(x, y) {
    if (x < this.map.length && x >= 0) {
      if (y < this.map[x].length && y >= 0) {
        return map[x][y];
      }
    }

    return null;
  }
  get spawn() {
    return this.map[0][0]; //TODO: logic to determine spawn via data.json.
  }
  toString() {
    let str = "[\n";
    for (let i = 0; i < this.map.length; i++) {
      str += "\t[\n";
      for (let j = 0; j < this.map[i].length; j++) {
        str += `\t\t${this.map[i][j].toString()}`;
        if (j < this.map[i].length - 1) str += ",";
        str += "\n";
      }
      str += "\t]\n"
    }
    str += "]";
    return str;
  }
}
module.exports = Map;