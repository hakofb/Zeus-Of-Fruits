export const Symbol = {
  BLUE_GEM: 'blue_gem',
  GREEN_GEM: 'green_gem',
  RED_GEM: 'red_gem',
  PURPLE_GEM: 'purple_gem',
  YELLOW_GEM: 'yellow_gem',
  HOURGLASS: 'hourglass',
  RING: 'ring',
  SWORD: 'sword',
  CUP: 'cup',
  CROWN: 'crown',
  SCATTER: 'scatter',
} as const;

export type Symbol = typeof Symbol[keyof typeof Symbol];

export interface SymbolWeight {
  symbol: Symbol;
  weight: number;
  baseGame: number;
  freeSpins: number;
}

export interface PaylineWin {
  symbol: Symbol;
  count: number;
  payout: number;
  positions: number[];
}

export interface MultiplierDrop {
  position: { row: number; col: number };
  value: number;
}

export interface SpinResult {
  grid: Symbol[][];
  wins: PaylineWin[];
  multipliers: MultiplierDrop[];
  totalMultiplier: number;
  totalWin: number;
  scatterCount: number;
  triggeredFreeSpins: boolean;
  freeSpinsAwarded?: number;
}

export interface GameConfig {
  rows: number;
  cols: number;
  symbolWeights: SymbolWeight[];
  paytable: Map<Symbol, number[]>;
  multiplierWeights: Map<number, number>;
  scatterWeights: {
    baseGame: number;
    freeSpins: number;
  };
  targetRTP: number;
}
