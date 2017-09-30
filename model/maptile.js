class MapTile {
  constructor(tile_data) {
    for (const prop in tile_data) {
      this[prop] = tile_data[prop];
    }
  }
  toString() {
    const tile_str_data = {
      "type":this.type,
      "coords":this.coords,
      "description":this.description,
      "numNPCs":this.npcs ? this.npcs.length : 0
    }
    return JSON.stringify(tile_str_data);
  }
}

module.exports = MapTile;