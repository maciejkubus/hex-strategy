import Hex from "./Hex";
import HexGetter from "./HexGetter";

export default class MapGenerator {
  static generate(size = 32) {
    const tiles: Array<Array<Hex>> = [];
    let id = 0;
    for (let x = 0; x < size; x++) {
      tiles[x] = [];
      for (let y = 0; y < size; y++) {
        const hexData = HexGetter.findById(0);
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