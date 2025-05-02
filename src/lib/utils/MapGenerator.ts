import { BIOME } from "$lib/enums/biome.enum";
import type HexData from "$lib/types/HexData.interface";
import type { Position } from "$lib/types/Position.interface";
import Hex from "./Hex";
import HexGetter from "./HexGetter";
import { getRandomIntBetween } from "./random";

type Tiles = Array<Array<Hex>>;
export default class MapGenerator {

  private size: number;
  private tiles: Tiles;
  private generated: boolean;
  private chances = {
    startingPoints: 8,
    landGrowChance: 5,
    landGrowIterations: 7,
    mountainGrowChange: 4,
    mountainStartingPoints: 12,
    farmGrowChange: 3,
    farmGrowIterations: 1,
    farmStartingPoints: 4,
  }

  constructor(size = 64) {
    this.size = size;
    this.tiles = [];
    this.generated = false;
  }

  private fill() {
    let id = 0;
    for (let x = 0; x <= this.size/2; x++) {
      this.tiles[x] = [];
      for (let y = 0; y <= this.size; y++) {
        const hexData = HexGetter.findOne('Base', undefined, 'ocean');
        this.tiles[x][y] = new Hex(id, hexData, x, y);
        id++;
      }
    }

    for(const row of this.tiles) {
      for(const tile of row) {
        tile.neighbours = this.getNeighbours(tile.x, tile.y);
      }
    }
  }

  private tileExists(x: number, y: number) {
    const tileX = this.tiles[x];
    if(!tileX)
      return false;
    const tileY = this.tiles[x][y];
    
    if(!tileY)
      return false;

    return true;
  }

  private changeTile(x: number, y: number, hexData: HexData) {
    if(this.tileExists(x, y))
      this.tiles[x][y].data = hexData;
  }

  private getNeighbours(startX: number, startY: number) {
    const potentials = [
      {x: 1, y: -1, type: 1},
      {x: 1, y: 1, type: 1},
      {x: 0, y: -1, type: 1},
      {x: 0, y: 1, type: 1},
      {x: 0, y: -2, type: 1},
      {x: 0, y: 2, type: 1},
      {x: -1, y: -1, type: 0},
      {x: -1, y: 1, type: 0},
      {x: 0, y: -1, type: 0},
      {x: 0, y: 1, type: 0},
      {x: 0, y: -2, type: 0},
      {x: 0, y: 2, type: 0},
    ]
    const neighbours: Array<Hex> = [];
    for(const potential of potentials.filter(item => startY % 2 == item.type)) {
      const x = startX + potential.x;
      const y = startY + potential.y;
      if(this.tileExists(x, y))
        neighbours.push(this.tiles[x][y]);
    }
    return neighbours;
  }


  private createBiome(name: string, tiles: HexData[], startingPoints: number, growChange: number, growIterations: number, fillGrass: boolean = false) {
    const lands: Array<Position> = [];
    for(let i = 0; i < startingPoints; i++){
      const x = getRandomIntBetween(0, this.size/2);
      const y = getRandomIntBetween(0, this.size);
      lands.push({x, y});
      this.changeTile(x, y, tiles[getRandomIntBetween(0, tiles.length-1)])
    }

    for(let i = 0; i <= growIterations; i++) {
      const currentLands = [...lands];
      for(const land of currentLands) {
        const neighbours = this.getNeighbours(land.x, land.y);
          for(const neighbour of neighbours) {
            const grow = getRandomIntBetween(0, 10) < growChange;
            if(grow){
              lands.push({x: neighbour.x, y: neighbour.y});
              this.changeTile(neighbour.x, neighbour.y, tiles[getRandomIntBetween(0, tiles.length-1)])
            }
          }
      }
    }

    if(fillGrass) {
      for(const land of lands) {
        const neighbours = this.getNeighbours(land.x, land.y);
          for(const neighbour of neighbours) {
            if(this.tiles[neighbour.x][neighbour.y].data.variant == 'ocean')
              this.changeTile(neighbour.x, neighbour.y, HexGetter.findById(0))
          }
      }
    }
  }

  private assignBiomes() {
    for(const row of this.tiles) {
      for(const tile of row) {
        switch(tile.data.name) {
          case "Base (ocean)":
            tile.biome = BIOME.WATER;
            break;
          case "Base (lush)":
            tile.biome = BIOME.GRASSLANDS;
            break;
          case "Plains (farmland) 2":
            tile.biome = BIOME.FARM;
            break;
          case "Plains (farmland) 1":
            tile.biome = BIOME.FARM;
          break;
          case "Plains (farmland) 3":
            tile.biome = BIOME.FARM;
          break;
          case "Hills (lush) 3":
            tile.biome = BIOME.HILL;
          break;
          case "Forest, conifer (lush) 2":
            tile.biome = BIOME.FOREST;
          break;
          case "Hills (lush) 1":
            tile.biome = BIOME.HILL;
          break;
          case "Mountains, medium (rocky)":
            tile.biome = BIOME.MOUNTAIN;
          break;
          case "Mountains, foothills (rocky)":
            tile.biome = BIOME.MOUNTAIN;
          break;
          case "Forest, conifer (lush)":
            tile.biome = BIOME.FOREST;
          break;
          default:
            tile.biome = BIOME.NONE;
          break;
        }
      }
    }
  }

  generate() {
    if(this.generated)
      throw new Error('Map already generated');

    this.fill();
    this.createBiome(
      'forest',
      [
        HexGetter.findById(0),
        HexGetter.findById(15),
        HexGetter.findById(16),
        HexGetter.findById(30),
        HexGetter.findById(31),
      ],
      this.chances.startingPoints,
      this.chances.landGrowChance,
      this.chances.landGrowIterations
    );
    this.createBiome(
      'farm',
      [
        HexGetter.findById(65),
        HexGetter.findById(66),
        HexGetter.findById(67),
      ],
      this.chances.farmStartingPoints,
      this.chances.farmGrowChange,
      this.chances.farmGrowIterations,
      true
    );
    
    this.createBiome(
      'mountain',
      [
        HexGetter.findById(53),
        HexGetter.findById(46),
      ],
      this.chances.mountainGrowChange,
      this.chances.mountainGrowChange,
      1,
    );

    this.assignBiomes();

    this.generated = true;
  }

  getMap() {
    if(!this.generated)
      throw new Error('Map not generated');

    return {
      size: this.size,
      tiles: this.tiles,
    }
  }
}