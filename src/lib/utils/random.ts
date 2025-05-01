export function getRandomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}