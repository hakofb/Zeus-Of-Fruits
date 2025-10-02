import { Simulator, printSimulationReport } from './src/engine/simulator.ts';

const simulator = new Simulator();

console.log('Starting 1 million spin simulation...\n');

const result = simulator.simulate(1_000_000, 1);

printSimulationReport(result);

console.log('\n=== WIN DISTRIBUTION (Top 20) ===');
const sortedDistribution = Array.from(result.winDistribution.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

sortedDistribution.forEach(([multiplier, count]) => {
  const percentage = ((count / result.totalSpins) * 100).toFixed(2);
  console.log(`${multiplier}: ${count.toLocaleString()} times (${percentage}%)`);
});
