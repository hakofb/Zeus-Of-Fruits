import { Symbol, type SymbolWeight, type GameConfig } from './types';

export const SYMBOL_WEIGHTS: SymbolWeight[] = [
  { symbol: Symbol.BLUE_GEM, weight: 150, baseGame: 150, freeSpins: 140 },
  { symbol: Symbol.GREEN_GEM, weight: 120, baseGame: 120, freeSpins: 115 },
  { symbol: Symbol.RED_GEM, weight: 100, baseGame: 100, freeSpins: 95 },
  { symbol: Symbol.PURPLE_GEM, weight: 80, baseGame: 80, freeSpins: 80 },
  { symbol: Symbol.YELLOW_GEM, weight: 80, baseGame: 80, freeSpins: 80 },
  { symbol: Symbol.HOURGLASS, weight: 70, baseGame: 70, freeSpins: 65 },
  { symbol: Symbol.RING, weight: 40, baseGame: 40, freeSpins: 45 },
  { symbol: Symbol.SWORD, weight: 35, baseGame: 35, freeSpins: 40 },
  { symbol: Symbol.CUP, weight: 30, baseGame: 30, freeSpins: 35 },
  { symbol: Symbol.CROWN, weight: 20, baseGame: 20, freeSpins: 25 },
  { symbol: Symbol.SCATTER, weight: 15, baseGame: 15, freeSpins: 25 },
];

export const PAYTABLE = new Map<Symbol, number[]>([
  [Symbol.CROWN, [0, 0, 0, 0, 0, 0, 0, 0, 2.8, 4.5, 9, 22, 45]],
  [Symbol.CUP, [0, 0, 0, 0, 0, 0, 0, 0, 1.4, 2.8, 5.5, 11, 23]],
  [Symbol.SWORD, [0, 0, 0, 0, 0, 0, 0, 0, 1.1, 2.3, 4.5, 9, 14]],
  [Symbol.RING, [0, 0, 0, 0, 0, 0, 0, 0, 0.9, 1.8, 3.6, 7, 11]],
  [Symbol.HOURGLASS, [0, 0, 0, 0, 0, 0, 0, 0, 0.55, 1.1, 2.3, 4.5, 7.5]],
  [Symbol.YELLOW_GEM, [0, 0, 0, 0, 0, 0, 0, 0, 0.28, 0.55, 1.4, 2.3, 4.5]],
  [Symbol.PURPLE_GEM, [0, 0, 0, 0, 0, 0, 0, 0, 0.28, 0.55, 1.4, 2.3, 4.5]],
  [Symbol.RED_GEM, [0, 0, 0, 0, 0, 0, 0, 0, 0.23, 0.45, 1.1, 1.8, 3.6]],
  [Symbol.GREEN_GEM, [0, 0, 0, 0, 0, 0, 0, 0, 0.18, 0.36, 0.9, 1.6, 2.8]],
  [Symbol.BLUE_GEM, [0, 0, 0, 0, 0, 0, 0, 0, 0.14, 0.28, 0.7, 1.4, 2.3]],
  [Symbol.SCATTER, [0, 0, 0, 0, 2, 3, 10, 20, 50, 100, 250, 500, 1000]],
]);

export const MULTIPLIER_WEIGHTS = new Map<number, number>([
  [2, 700],
  [3, 150],
  [4, 80],
  [5, 50],
  [10, 15],
  [15, 6],
  [20, 4],
  [25, 3],
  [50, 1.5],
  [100, 0.4],
  [500, 0.1],
]);

export const MULTIPLIER_DROP_CHANCE = {
  baseGame: 0.015,
  freeSpins: 0.08,
};

export const FREE_SPINS_CONFIG = {
  scattersNeeded: 4,
  spinsAwarded: 15,
  retriggerSpins: 5,
  multipliersPersist: true,
};

export const GAME_CONFIG: GameConfig = {
  rows: 6,
  cols: 5,
  symbolWeights: SYMBOL_WEIGHTS,
  paytable: PAYTABLE,
  multiplierWeights: MULTIPLIER_WEIGHTS,
  scatterWeights: {
    baseGame: 15,
    freeSpins: 25,
  },
  targetRTP: 96.0,
};
