import type HexData from "$lib/types/HexData.interface";

export default class Hex {

  id: number;
  data: HexData;
  x: number;
  y: number;

  constructor(id: number, data: HexData, x: number, y: number) {
    this.id = id;
    this.data = data;
    this.x = x;
    this.y = y;
  }
}