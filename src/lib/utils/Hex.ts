import type HexData from "$lib/types/HexData.interface";

export default class Hex {

  public id: number;
  data: HexData;
  x: number;
  y: number;
  neighbours: Hex[];

  constructor(id: number, data: HexData, x: number, y: number) {
    this.id = id;
    this.data = data;
    this.x = x;
    this.y = y;
    this.neighbours = [];
  }
}