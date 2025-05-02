import type { ResourcesStore } from "$lib/types/ResourcesStore.interface";
import { writable, type Writable } from "svelte/store";

const initialResource: ResourcesStore = {
  money: 0,
  wood: 0,
  stone: 0,
  wheat: 0,
  meat: 0,
  brick: 0,
  iron: 0,
  technology: 0,
};

export const resourcesStore: Writable<ResourcesStore> = writable(initialResource);