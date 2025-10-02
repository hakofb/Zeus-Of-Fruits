import { RNG } from './rng';
import { Symbol, type SpinResult, type PaylineWin, type MultiplierDrop, type GameConfig } from './types';
import { GAME_CONFIG, MULTIPLIER_DROP_CHANCE } from './config';

export class GameEngine {
  private config: GameConfig;
  private rng: RNG;

  constructor(config: GameConfig = GAME_CONFIG, rng?: RNG) {
    this.config = config;
    this.rng = rng ?? new RNG();
  }

  generateGrid(isFreeSpins: boolean = false): Symbol[][] {
    const grid: Symbol[][] = [];
    const weights = isFreeSpins
      ? this.config.symbolWeights.map((sw) => sw.freeSpins)
      : this.config.symbolWeights.map((sw) => sw.baseGame);

    const symbols = this.config.symbolWeights.map((sw) => sw.symbol);

    for (let col = 0; col < this.config.cols; col++) {
      const column: Symbol[] = [];
      for (let row = 0; row < this.config.rows; row++) {
        const symbol = this.rng.choice(symbols, weights);
        column.push(symbol);
      }
      grid.push(column);
    }

    return grid;
  }

  generateMultipliers(isFreeSpins: boolean = false): MultiplierDrop[] {
    const multipliers: MultiplierDrop[] = [];
    const dropChance = isFreeSpins
      ? MULTIPLIER_DROP_CHANCE.freeSpins
      : MULTIPLIER_DROP_CHANCE.baseGame;

    for (let col = 0; col < this.config.cols; col++) {
      for (let row = 0; row < this.config.rows; row++) {
        if (this.rng.next() < dropChance) {
          const multiplierValues = Array.from(this.config.multiplierWeights.keys());
          const multiplierWeights = Array.from(this.config.multiplierWeights.values());
          const value = this.rng.choice(multiplierValues, multiplierWeights);

          multipliers.push({
            position: { row, col },
            value,
          });
        }
      }
    }

    return multipliers;
  }

  calculateWins(grid: Symbol[][]): PaylineWin[] {
    const wins: PaylineWin[] = [];
    const symbolCounts = new Map<Symbol, { count: number; positions: number[] }>();

    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const symbol = grid[col][row];
        if (symbol === Symbol.SCATTER) continue;

        if (!symbolCounts.has(symbol)) {
          symbolCounts.set(symbol, { count: 0, positions: [] });
        }

        const data = symbolCounts.get(symbol)!;
        data.count++;
        data.positions.push(col * this.config.rows + row);
      }
    }

    symbolCounts.forEach((data, symbol) => {
      const payouts = this.config.paytable.get(symbol);
      if (payouts && data.count >= 8) {
        const payout = payouts[data.count] || 0;
        if (payout > 0) {
          wins.push({
            symbol,
            count: data.count,
            payout,
            positions: data.positions,
          });
        }
      }
    });

    return wins;
  }

  countScatters(grid: Symbol[][]): number {
    let count = 0;
    for (const column of grid) {
      for (const symbol of column) {
        if (symbol === Symbol.SCATTER) {
          count++;
        }
      }
    }
    return count;
  }

  calculateScatterPayout(scatterCount: number): number {
    const payouts = this.config.paytable.get(Symbol.SCATTER);
    if (!payouts || scatterCount < 4) return 0;
    return payouts[scatterCount] || 0;
  }

  spin(bet: number, isFreeSpins: boolean = false, activeMultipliers: number[] = []): SpinResult {
    const grid = this.generateGrid(isFreeSpins);
    const wins = this.calculateWins(grid);
    const multipliers = this.generateMultipliers(isFreeSpins);
    const scatterCount = this.countScatters(grid);

    let totalMultiplier = 1;
    if (isFreeSpins && activeMultipliers.length > 0) {
      totalMultiplier = activeMultipliers.reduce((sum, m) => sum + m, 0);
    }

    multipliers.forEach((m) => {
      totalMultiplier += m.value;
    });

    let baseWin = wins.reduce((sum, win) => sum + win.payout, 0);

    const scatterPayout = this.calculateScatterPayout(scatterCount);
    baseWin += scatterPayout;

    const totalWin = baseWin * bet * totalMultiplier;

    const triggeredFreeSpins = scatterCount >= 4;
    const freeSpinsAwarded = triggeredFreeSpins ? 15 : undefined;

    return {
      grid,
      wins,
      multipliers,
      totalMultiplier,
      totalWin,
      scatterCount,
      triggeredFreeSpins,
      freeSpinsAwarded,
    };
  }
}
