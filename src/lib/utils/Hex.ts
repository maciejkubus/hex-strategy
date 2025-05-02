import { BIOME } from "$lib/enums/biome.enum";
import type HexData from "$lib/types/HexData.interface";

export default class Hex {

  public id: number;
  data: HexData;
  x: number;
  y: number;
  neighbours: Hex[];
  biome: BIOME;

  constructor(id: number, data: HexData, x: number, y: number, biome = BIOME.NONE) {
    this.id = id;
    this.data = data;
    this.x = x;
    this.y = y;
    this.neighbours = [];
    this.biome = biome;
  }
}