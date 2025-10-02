"""
Gates of Olympus - Simulation Entry Point
Runs simulations and generates output files for Stake Engine
"""

import json
import random
from pathlib import Path
from typing import Dict, List
import sys

# Add game directory to path
sys.path.insert(0, str(Path(__file__).parent / 'game'))

from game.game_config import GameConfig
from game.gamestate import GameState

# Simulation parameters
NUM_THREADS = 1
RUST_THREADS = 4
BATCHING_SIZE = 1000
COMPRESSION = False
PROFILING = False

# Number of simulations per bet mode
NUM_SIM_ARGS = {
    'base': 100,  # Start small for testing
}


class SimulationRunner:
    """Handles running simulations and generating output files"""

    def __init__(self, config: GameConfig):
        self.config = config
        self.library_path = Path(__file__).parent / 'library'

    def create_books(self, num_simulations: int, mode: str, bet: float = 1.0):
        """
        Create simulation books for specified mode
        Generates books in Stake Engine format
        """
        print(f"\n{'='*60}")
        print(f"Running {num_simulations:,} simulations for {mode}")
        print(f"{'='*60}")

        books = []
        lookup_table = []
        total_bet = 0.0
        total_won = 0.0

        gamestate = GameState(self.config)

        for sim_num in range(num_simulations):
            # Run simulation
            result = gamestate.run_spin(sim_num, bet)

            # Track statistics
            total_bet += bet
            total_won += result['payoutMultiplier'] * bet

            # Create book entry (Stake Engine format)
            book = {
                'id': sim_num + 1,
                'payoutMultiplier': result['payoutMultiplier'],
                'events': result['events'],
                'criteria': mode,
                'baseGameWins': result['payoutMultiplier'] * bet,
                'freeGameWins': 0.0,
            }

            books.append(book)

            # Create lookup table entry
            lookup_table.append({
                'simulation_number': sim_num + 1,
                'weight': 1,
                'payout': result['payoutMultiplier'],
            })

            # Progress report
            if (sim_num + 1) % 10 == 0:
                current_rtp = (total_won / total_bet) * 100 if total_bet > 0 else 0
                print(f"Progress: {sim_num + 1:,}/{num_simulations:,} | Current RTP: {current_rtp:.2f}%")

        # Calculate final RTP
        rtp = (total_won / total_bet) * 100 if total_bet > 0 else 0
        print(f"\n{mode} RTP: {rtp:.2f}%")
        print(f"Target RTP: {self.config.target_rtp}%")
        print(f"Difference: {(rtp - self.config.target_rtp):.2f}%")

        # Save files
        self.save_books(books, mode)
        self.save_lookup_table(lookup_table, mode)

        return {
            'rtp': rtp,
            'total_bet': total_bet,
            'total_won': total_won,
            'num_simulations': num_simulations,
        }

    def save_books(self, books: List[Dict], mode: str):
        """Save simulation books to JSONL format"""
        self.library_path.mkdir(parents=True, exist_ok=True)

        filename = f"books_{mode}.jsonl"
        filepath = self.library_path / filename

        with open(filepath, 'w') as f:
            for book in books:
                json.dump(book, f)
                f.write('\n')

        print(f"✓ Saved {len(books):,} books to {filepath}")

    def save_lookup_table(self, lookup_table: List[Dict], mode: str):
        """Generate CSV lookup table for RGS (Stake Engine format)"""
        self.library_path.mkdir(parents=True, exist_ok=True)

        filename = f"lookUpTable_{mode}.csv"
        filepath = self.library_path / filename

        with open(filepath, 'w') as f:
            for entry in lookup_table:
                f.write(f"{entry['simulation_number']},{entry['weight']},{entry['payout']}\n")

        print(f"✓ Generated lookup table: {filepath}")

    def generate_index_file(self, modes: List[str]):
        """Generate index.json file (Stake Engine requirement)"""
        self.library_path.mkdir(parents=True, exist_ok=True)

        index = {
            "modes": []
        }

        for mode in modes:
            index["modes"].append({
                "name": mode,
                "cost": 1.0,
                "events": f"books_{mode}.jsonl.zst",
                "weights": f"lookUpTable_{mode}.csv",
            })

        filepath = self.library_path / 'index.json'
        with open(filepath, 'w') as f:
            json.dump(index, f, indent=2)

        print(f"✓ Generated index.json: {filepath}")

    def generate_configs(self):
        """Generate config files for frontend and backend"""
        self.library_path.mkdir(parents=True, exist_ok=True)

        # Frontend config
        config_fe = {
            'game_id': self.config.game_id,
            'game_name': self.config.game_name,
            'rows': self.config.rows,
            'cols': self.config.cols,
            'symbols': [s.value for s in self.config.paytable.keys()],
            'paytable': {k.value: v for k, v in self.config.paytable.items()},
            'bet_modes': self.config.bet_modes,
        }

        with open(self.library_path / 'config_fe.json', 'w') as f:
            json.dump(config_fe, f, indent=2)

        # Backend config
        config_be = {
            'game_id': self.config.game_id,
            'target_rtp': self.config.target_rtp,
            'bet_modes': self.config.bet_modes,
        }

        with open(self.library_path / 'config.json', 'w') as f:
            json.dump(config_be, f, indent=2)

        print(f"\n✓ Generated config files in {self.library_path}")


def main():
    """Main entry point"""
    print("=" * 60)
    print("Gates of Olympus - Math SDK Simulation")
    print("=" * 60)

    # Initialize configuration
    config = GameConfig()

    # Create simulation runner
    runner = SimulationRunner(config)

    # Run simulations for each bet mode
    results = {}
    for mode, num_sims in NUM_SIM_ARGS.items():
        result = runner.create_books(num_sims, mode)
        results[mode] = result

    # Generate index file
    print(f"\n{'='*60}")
    print("Generating Stake Engine files...")
    print(f"{'='*60}")
    runner.generate_index_file(list(NUM_SIM_ARGS.keys()))

    # Generate config files
    runner.generate_configs()

    # Summary
    print(f"\n{'='*60}")
    print("SIMULATION COMPLETE")
    print(f"{'='*60}")
    for mode, result in results.items():
        print(f"\n{mode}:")
        print(f"  Simulations: {result['num_simulations']:,}")
        print(f"  RTP: {result['rtp']:.2f}%")
        print(f"  Total Bet: {result['total_bet']:,.2f}")
        print(f"  Total Won: {result['total_won']:,.2f}")

    avg_rtp = sum(r['rtp'] for r in results.values()) / len(results)
    print(f"\nAverage RTP: {avg_rtp:.2f}%")
    print(f"Target RTP: {config.target_rtp}%")
    print(f"Difference: {(avg_rtp - config.target_rtp):.2f}%")
    print(f"\n{'='*60}")
    print("✓ All files generated successfully!")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    main()
