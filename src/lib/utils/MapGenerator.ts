import Hex from "./Hex";
import HexGetter from "./HexGetter";

export default class MapGenerator {
  static generate(size = 16) {
    const tiles: Array<Array<Hex>> = [];
    let id = 0;
    for (let x = 0; x < size/2; x++) {
      tiles[x] = [];
      for (let y = 0; y < size; y++) {
        const hexData = HexGetter.findOne('Base', undefined, 'ocean');
        tiles[x][y] = new Hex(id, hexData, x, y);
        id++;
      }
    }
    const map = {
      size: size,
      tiles: tiles,
    }
    return map;
  }
}