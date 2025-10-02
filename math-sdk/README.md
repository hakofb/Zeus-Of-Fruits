# Gates of Olympus - Math SDK

This package contains the mathematical simulation engine for Gates of Olympus, compatible with Stake Engine.

## Structure

```
math-sdk/
├── run.py                 # Main entry point for simulations
├── game/
│   ├── game_config.py    # Game configuration and paytables
│   └── gamestate.py      # Core simulation logic
└── library/              # Generated output files
    ├── books/            # Uncompressed simulation books
    ├── books_compressed/ # Compressed .jsonl books
    ├── lookup_tables/    # CSV lookup tables for RGS
    ├── config_fe.json    # Frontend configuration
    ├── config.json       # Backend configuration
    └── config_math.json  # Math optimization config
```

## Running Simulations

```bash
python run.py
```

This will:
1. Run 100,000 base game simulations
2. Run 50,000 free spin simulations
3. Generate lookup tables
4. Create configuration files
5. Output RTP statistics

## Configuration

Edit `game/game_config.py` to modify:
- Symbol weights
- Paytables
- Multiplier distributions
- Free spin triggers
- Target RTP

## Output Files

### Books (library/books_compressed/)
- `MODE_BASE.json` - Base game simulations
- `MODE_FREESPIN.json` - Free spin simulations

Each line contains:
- simulation_number
- probability
- payout_multiplier
- events (for frontend)
- grid

### Lookup Tables (library/lookup_tables/)
- CSV files mapping simulation numbers to payouts
- Used by RGS to select outcomes

### Config Files (library/)
- `config_fe.json` - Frontend rendering config
- `config.json` - Backend RGS config
- `config_math.json` - Math optimization parameters

## Game Mechanics

### Base Game
- 6x5 grid
- Cluster pays (8+ symbols)
- Random multiplier drops (1.5% chance)
- Scatter symbols trigger free spins

### Free Spins
- Triggered by 4+ scatters
- 15 free spins awarded
- Multiplier drops increased to 8%
- Multipliers persist and accumulate
- Retrigger awards +5 spins

### Multipliers
Available multipliers: 2x, 3x, 4x, 5x, 10x, 15x, 20x, 25x, 50x, 100x, 500x

### RTP Target
96.0%

## Stake Engine Compatibility

This Math SDK follows Stake Engine requirements:
- Stateless game design
- Event-based architecture
- Lookup table generation
- Multiple bet modes
- Compressed book format
