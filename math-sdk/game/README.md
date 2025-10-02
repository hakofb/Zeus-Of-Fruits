# Gates of Olympus - Math SDK

## Overview

Gates of Olympus slot game math implementation following Stake Engine architecture.

## Game Features

- **6x5 Grid** - Scatter/cluster pays mechanic
- **Multipliers** - Zeus multiplier symbols that boost wins
- **Free Spins** - Triggered by 4+ scatter symbols
- **Cascading Multipliers** - Multipliers accumulate during free spins
- **Minimum 8 symbols** - Required for winning combinations

## File Structure

```
game/
├── game_config.py      # Game configuration (paytable, symbols, RTP)
├── gamestate.py        # Main game state machine
├── game_executables.py # Reusable game actions
├── game_calculations.py # Win calculation logic
├── game_events.py      # Event emission functions
├── game_override.py    # State machine overrides
└── README.md          # This file
```

## Running Simulations

```bash
# From math-sdk directory
python3 run.py
```

## Configuration

Edit `run.py` to adjust simulation parameters:

```python
NUM_SIM_ARGS = {
    'base': 100000,  # Number of simulations
}
```

## Output Files

Generated in `library/` directory:

- `books/books_base.jsonl` - Simulation results with events
- `lookup_tables/lookUpTable_base.csv` - CSV summary (ID, Weight, Payout)
- `publish_files/index.json` - Stake Engine index file
- `configs/` - Configuration files for frontend/backend

## Game Mechanics

### Base Game
- 6 rows x 5 columns grid
- Scatter pays (8+ matching symbols)
- Random multiplier drops (1.5% chance)
- 4+ scatters trigger free spins

### Free Spins
- 15 spins awarded for 4+ scatters
- Multipliers accumulate (don't reset)
- Higher multiplier drop rate (8%)
- 4+ scatters add 5 more spins

## Paytable

### Premium Symbols (8-12 matches required)
- Crown: 2.8x - 45x
- Cup: 1.4x - 23x
- Sword: 1.1x - 14x
- Ring: 0.9x - 11x

### Low Symbols (8-12 matches required)
- Hourglass: 0.55x - 7.5x
- Yellow/Purple Gem: 0.28x - 4.5x
- Red Gem: 0.23x - 3.6x
- Green Gem: 0.18x - 2.8x
- Blue Gem: 0.14x - 2.3x

### Scatter Symbol
- Pays on 4+ symbols anywhere
- 4 scatters: 2x + 15 free spins
- 12 scatters: 1000x

## RTP

Target RTP: 96%

Note: Small simulation samples (100-1000) will show variance. Run 100,000+ simulations for accurate RTP.

## Stake Engine Format

Outputs follow Stake Engine requirements:
- Books in JSONL format
- Lookup tables in CSV format
- Index.json with mode definitions
- Events with proper structure and indexing

## Next Steps

1. Run larger simulations (100k+)
2. Optimize paytable for target RTP
3. Add bonus buy mode (optional)
4. Compress books to `.jsonl.zst` format
5. Upload to Stake Engine platform
