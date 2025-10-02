import { Simulator } from './src/engine/simulator.ts';

const simulator = new Simulator();

console.log('Running 10 simulations of 100k spins each...\n');

const result = simulator.runMultipleSimulations(10, 100_000, 1);

console.log(`\nFinal RTP range: ${result.minRtp.toFixed(2)}% - ${result.maxRtp.toFixed(2)}%`);
console.log(`Average: ${result.avgRtp.toFixed(2)}%`);
console.log(`Target: 96.00%`);
console.log(`Difference from target: ${(result.avgRtp - 96).toFixed(2)}%`);
