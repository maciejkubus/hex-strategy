import hexes from '$lib/data/hexes.json';
import type HexData from '$lib/types/HexData.interface';

class HexGetter {
  static find(biome?: string, type?: string, variant?: string): HexData[] | HexData {
    const found: HexData[] = [];
    for(const hex of hexes) {
      if(biome && hex.biome != biome)
        continue;
      if(type && hex.type != type)
        continue
      if(variant && hex.variant != variant)
        continue;
      
      found.push(hex)
    }
    return found.length == 1 ? found[0] : found; 
  }

  static findOne(biome?: string, type?: string, variant?: string): HexData {
    const found = HexGetter.find(biome, type, variant);
    if(Array.isArray(found)) 
      return found[0];
    else 
      return found;
  }

  static findById(id: number): HexData {
    if(id == hexes.length)
        throw new Error('Hex with id #' + id + ' doesn\'nt exist');
    return hexes[id];
  }
}

export default HexGetter;