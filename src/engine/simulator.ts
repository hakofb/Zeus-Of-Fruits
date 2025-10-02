import { GameEngine } from './gameEngine';
import { RNG } from './rng';
import { GAME_CONFIG } from './config';

export interface SimulationResult {
  totalSpins: number;
  totalBet: number;
  totalWon: number;
  rtp: number;
  biggestWin: number;
  freeSpinsTriggered: number;
  averageWin: number;
  volatilityMetrics: {
    wins: number;
    losses: number;
    winRate: number;
    avgWinSize: number;
    avgLossSize: number;
  };
  winDistribution: Map<string, number>;
}

export class Simulator {
  constructor() {
  }

  simulate(spins: number, bet: number = 1): SimulationResult {
    const rng = new RNG();
    const engine = new GameEngine(GAME_CONFIG, rng);

    let totalBet = 0;
    let totalWon = 0;
    let biggestWin = 0;
    let freeSpinsTriggered = 0;
    let wins = 0;
    let losses = 0;
    let totalWinAmount = 0;
    let totalLossAmount = 0;

    const winDistribution = new Map<string, number>();

    for (let i = 0; i < spins; i++) {
      totalBet += bet;

      const result = engine.spin(bet, false);
      totalWon += result.totalWin;

      if (result.totalWin > biggestWin) {
        biggestWin = result.totalWin;
      }

      if (result.triggeredFreeSpins) {
        freeSpinsTriggered++;

        const freeSpinsResult = this.simulateFreeSpins(
          engine,
          bet,
          result.freeSpinsAwarded || 15
        );
        totalWon += freeSpinsResult.totalWin;

        if (freeSpinsResult.biggestWin > biggestWin) {
          biggestWin = freeSpinsResult.biggestWin;
        }
      }

      if (result.totalWin > bet) {
        wins++;
        totalWinAmount += result.totalWin - bet;
      } else if (result.totalWin < bet) {
        losses++;
        totalLossAmount += bet - result.totalWin;
      }

      const winMultiple = Math.floor((result.totalWin / bet) * 10) / 10;
      const key = `${winMultiple}x`;
      winDistribution.set(key, (winDistribution.get(key) || 0) + 1);
    }

    const rtp = (totalWon / totalBet) * 100;
    const averageWin = totalWon / spins;

    return {
      totalSpins: spins,
      totalBet,
      totalWon,
      rtp,
      biggestWin,
      freeSpinsTriggered,
      averageWin,
      volatilityMetrics: {
        wins,
        losses,
        winRate: (wins / spins) * 100,
        avgWinSize: wins > 0 ? totalWinAmount / wins : 0,
        avgLossSize: losses > 0 ? totalLossAmount / losses : 0,
      },
      winDistribution,
    };
  }

  simulateFreeSpins(
    engine: GameEngine,
    bet: number,
    spinsRemaining: number
  ): { totalWin: number; biggestWin: number } {
    let totalWin = 0;
    let biggestWin = 0;
    const activeMultipliers: number[] = [];

    while (spinsRemaining > 0) {
      const result = engine.spin(bet, true, activeMultipliers);

      result.multipliers.forEach((m) => {
        activeMultipliers.push(m.value);
      });

      totalWin += result.totalWin;

      if (result.totalWin > biggestWin) {
        biggestWin = result.totalWin;
      }

      if (result.triggeredFreeSpins) {
        spinsRemaining += 5;
      }

      spinsRemaining--;
    }

    return { totalWin, biggestWin };
  }

  runMultipleSimulations(iterations: number, spinsPerIteration: number, bet: number = 1) {
    const results: SimulationResult[] = [];

    console.log(`Running ${iterations} simulations with ${spinsPerIteration} spins each...`);

    for (let i = 0; i < iterations; i++) {
      const result = this.simulate(spinsPerIteration, bet);
      results.push(result);

      if ((i + 1) % 10 === 0) {
        const avgRtp =
          results.reduce((sum, r) => sum + r.rtp, 0) / results.length;
        console.log(
          `Completed ${i + 1}/${iterations} simulations. Current avg RTP: ${avgRtp.toFixed(2)}%`
        );
      }
    }

    const avgRtp = results.reduce((sum, r) => sum + r.rtp, 0) / results.length;
    const minRtp = Math.min(...results.map((r) => r.rtp));
    const maxRtp = Math.max(...results.map((r) => r.rtp));

    console.log('\n=== SIMULATION COMPLETE ===');
    console.log(`Average RTP: ${avgRtp.toFixed(2)}%`);
    console.log(`Min RTP: ${minRtp.toFixed(2)}%`);
    console.log(`Max RTP: ${maxRtp.toFixed(2)}%`);
    console.log(`Target RTP: ${GAME_CONFIG.targetRTP}%`);

    return {
      results,
      avgRtp,
      minRtp,
      maxRtp,
    };
  }
}

export function printSimulationReport(result: SimulationResult): void {
  console.log('\n=== SIMULATION REPORT ===');
  console.log(`Total Spins: ${result.totalSpins.toLocaleString()}`);
  console.log(`Total Bet: ${result.totalBet.toLocaleString()}`);
  console.log(`Total Won: ${result.totalWon.toLocaleString()}`);
  console.log(`RTP: ${result.rtp.toFixed(2)}%`);
  console.log(`Target RTP: ${GAME_CONFIG.targetRTP}%`);
  console.log(`Difference: ${(result.rtp - GAME_CONFIG.targetRTP).toFixed(2)}%`);
  console.log(`\nBiggest Win: ${result.biggestWin.toLocaleString()}`);
  console.log(`Average Win: ${result.averageWin.toFixed(2)}`);
  console.log(`Free Spins Triggered: ${result.freeSpinsTriggered} (${((result.freeSpinsTriggered / result.totalSpins) * 100).toFixed(2)}%)`);
  console.log(`\nVolatility Metrics:`);
  console.log(`  Wins: ${result.volatilityMetrics.wins}`);
  console.log(`  Losses: ${result.volatilityMetrics.losses}`);
  console.log(`  Win Rate: ${result.volatilityMetrics.winRate.toFixed(2)}%`);
  console.log(`  Avg Win Size: ${result.volatilityMetrics.avgWinSize.toFixed(2)}`);
  console.log(`  Avg Loss Size: ${result.volatilityMetrics.avgLossSize.toFixed(2)}`);
}
