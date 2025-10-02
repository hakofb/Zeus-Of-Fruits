"""
Gates of Olympus - Game Configuration
Converts TypeScript config to Stake Engine Math SDK format
"""

from enum import Enum
from typing import Dict, List, Tuple

class Symbol(Enum):
    BLUE_GEM = 'blue_gem'
    GREEN_GEM = 'green_gem'
    YELLOW_GEM = 'yellow_gem'
    PURPLE_GEM = 'purple_gem'
    RED_GEM = 'red_gem'
    CUP = 'cup'
    RING = 'ring'
    HOURGLASS = 'hourglass'
    CROWN = 'crown'
    SCATTER = 'scatter'
    MULTIPLIER = 'multiplier'

class GameConfig:
    """Game configuration matching Stake Engine requirements"""

    def __init__(self):
        self.game_id = "gates_of_olympus"
        self.game_name = "Gates of Olympus"

        # Grid configuration
        self.rows = 6
        self.cols = 5

        # RTP Configuration
        self.target_rtp = 96.0

        # Symbol weights for base game
        self.symbol_weights_base = {
            Symbol.BLUE_GEM: 150,
            Symbol.GREEN_GEM: 120,
            Symbol.YELLOW_GEM: 80,
            Symbol.PURPLE_GEM: 80,
            Symbol.RED_GEM: 100,
            Symbol.CUP: 30,
            Symbol.RING: 40,
            Symbol.HOURGLASS: 70,
            Symbol.CROWN: 20,
            Symbol.SCATTER: 15,
        }

        # Symbol weights for free spins
        self.symbol_weights_freespins = {
            Symbol.BLUE_GEM: 140,
            Symbol.GREEN_GEM: 115,
            Symbol.YELLOW_GEM: 80,
            Symbol.PURPLE_GEM: 80,
            Symbol.RED_GEM: 95,
            Symbol.CUP: 35,
            Symbol.RING: 45,
            Symbol.HOURGLASS: 65,
            Symbol.CROWN: 25,
            Symbol.SCATTER: 25,
        }

        # Paytable - index represents count, value is payout multiplier
        self.paytable = {
            Symbol.CROWN: [0, 0, 0, 0, 0, 0, 0, 0, 2.8, 4.5, 9, 22, 45],
            Symbol.HOURGLASS: [0, 0, 0, 0, 0, 0, 0, 0, 0.55, 1.1, 2.3, 4.5, 7.5],
            Symbol.RING: [0, 0, 0, 0, 0, 0, 0, 0, 0.9, 1.8, 3.6, 7, 11],
            Symbol.CUP: [0, 0, 0, 0, 0, 0, 0, 0, 1.4, 2.8, 5.5, 11, 23],
            Symbol.RED_GEM: [0, 0, 0, 0, 0, 0, 0, 0, 0.23, 0.45, 1.1, 1.8, 3.6],
            Symbol.PURPLE_GEM: [0, 0, 0, 0, 0, 0, 0, 0, 0.28, 0.55, 1.4, 2.3, 4.5],
            Symbol.YELLOW_GEM: [0, 0, 0, 0, 0, 0, 0, 0, 0.28, 0.55, 1.4, 2.3, 4.5],
            Symbol.GREEN_GEM: [0, 0, 0, 0, 0, 0, 0, 0, 0.18, 0.36, 0.9, 1.6, 2.8],
            Symbol.BLUE_GEM: [0, 0, 0, 0, 0, 0, 0, 0, 0.14, 0.28, 0.7, 1.4, 2.3],
            Symbol.SCATTER: [0, 0, 0, 0, 2, 3, 10, 20, 50, 100, 250, 500, 1000],
        }

        # Multiplier configuration
        self.multiplier_weights = {
            2: 700,
            3: 150,
            4: 80,
            5: 50,
            10: 15,
            15: 6,
            20: 4,
            25: 3,
            50: 1.5,
            100: 0.4,
            500: 0.1,
        }

        self.multiplier_drop_chance = {
            'base_game': 0.015,
            'free_spins': 0.08,
        }

        # Free spins configuration
        self.freespin_triggers = {
            4: 15,
            5: 15,
            6: 15,
            7: 15,
            8: 15,
            9: 15,
            10: 15,
            11: 15,
            12: 15,
        }

        self.freespin_retrigger_amount = 5
        self.scatters_needed_for_trigger = 4

        # Special symbols
        self.special_symbols = {
            'scatter': [Symbol.SCATTER.value],
        }

        # Bet modes
        self.bet_modes = {
            'MODE_BASE': {
                'name': 'Base Game',
                'cost': 1.0,
            },
            'MODE_FREESPIN': {
                'name': 'Free Spins',
                'cost': 0.0,
            }
        }

    def get_symbol_weights(self, mode: str) -> Dict:
        """Get symbol weights for specified mode"""
        if mode == 'MODE_FREESPIN':
            return self.symbol_weights_freespins
        return self.symbol_weights_base

    def get_multiplier_drop_chance(self, mode: str) -> float:
        """Get multiplier drop chance for specified mode"""
        if mode == 'MODE_FREESPIN':
            return self.multiplier_drop_chance['free_spins']
        return self.multiplier_drop_chance['base_game']
