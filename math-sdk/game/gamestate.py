"""
Gates of Olympus - Game State
Core simulation logic following Stake Engine architecture
"""

import random
from typing import Dict, List, Any

from game_config import GameConfig, Symbol
from game_executables import GameExecutables
from game_calculations import GameCalculations
from game_override import GameStateOverride
import game_events


class GameState(GameStateOverride, GameExecutables, GameCalculations):
    """
    Main game state handler for Gates of Olympus simulation
    Inherits from GameStateOverride -> GameExecutables -> GameCalculations
    Following Stake Engine Method Resolution Order (MRO)
    """

    def __init__(self, config: GameConfig):
        self.config = config
        self.current_mode = 'MODE_BASE'
        self.sim = 0
        self.reset_book()
        self.assign_special_sym_function()

    def reset_seed(self, sim: int) -> None:
        """Reset random seed for reproducibility"""
        self.sim = sim
        random.seed(sim)

    def run_spin(self, sim: int = 0, bet: float = 1.0) -> Dict[str, Any]:
        """
        Main entry point for single spin simulation
        Called by create_books() from run.py

        This is the required entry point for Stake Engine
        """
        # Reset seed for reproducibility
        self.reset_seed(sim)

        # Reset book
        self.reset_book()

        # Step 1: Draw board
        self.draw_board(self.current_mode)
        game_events.reveal_event(self)

        # Step 2: Generate multipliers
        self.generate_multipliers(self.current_mode)
        game_events.multiplier_drop_event(self)

        # Step 3: Calculate wins
        self.wins = self.calculate_scatter_pays()

        # Step 4: Count scatters
        self.scatter_count = self.count_scatters()

        # Step 5: Emit win events
        if self.wins:
            game_events.win_info_event(self)

        # Step 6: Check scatter payout
        scatter_payout = self.calculate_scatter_payout(self.scatter_count)
        if scatter_payout > 0:
            game_events.scatter_win_event(self, self.scatter_count, scatter_payout)

        # Step 7: Calculate total payout
        self.total_win = self.calculate_total_payout(bet)
        game_events.set_win_event(self, self.total_win)

        # Step 8: Check for free spins trigger
        if self.check_freespin_trigger(self.scatter_count):
            self.freespins_triggered = True
            self.freespins_awarded = self.update_freespin_amount(self.scatter_count)
            self.freespins_remaining = self.freespins_awarded
            game_events.freespin_trigger_event(self, self.freespins_awarded)

            # Run free spins
            freespin_total = self.run_freespin(bet)
            self.total_win += freespin_total

        # Step 9: Emit final win
        game_events.set_total_win_event(self, self.total_win)
        game_events.final_win_event(self, self.total_win)

        # Return book data
        return {
            'payoutMultiplier': self.total_win / bet if bet > 0 else 0,
            'events': self.book_events,
            'grid': self.grid,
            'multipliers': self.multipliers,
            'wins': self.wins,
            'scatter_count': self.scatter_count,
            'freespins_triggered': self.freespins_triggered,
        }

    def run_freespin(self, bet: float = 1.0) -> float:
        """
        Execute free spin sequence
        Returns total win from all free spins
        """
        # Reset free spin state
        self.reset_fs_spin()

        total_freespin_win = 0.0
        spin_count = 0

        while self.freespins_remaining > 0:
            spin_count += 1

            # Update counter
            game_events.freespin_update_event(
                self,
                self.freespins_remaining,
                self.freespins_awarded
            )

            # Reset per-spin state (keep accumulated multipliers)
            self.grid = []
            self.multipliers = []
            self.wins = []

            # Step 1: Draw board
            self.draw_board('MODE_FREESPIN')
            game_events.reveal_event(self)

            # Step 2: Generate new multipliers
            self.generate_multipliers('MODE_FREESPIN')

            # Add new multipliers to accumulated pool
            for mult in self.multipliers:
                self.active_multipliers.append(mult['value'])

            game_events.multiplier_drop_event(self)

            # Step 3: Calculate wins
            self.wins = self.calculate_scatter_pays()

            # Step 4: Count scatters
            self.scatter_count = self.count_scatters()

            # Step 5: Emit win events
            if self.wins:
                game_events.win_info_event(self)

            # Step 6: Check scatter payout
            scatter_payout = self.calculate_scatter_payout(self.scatter_count)
            if scatter_payout > 0:
                game_events.scatter_win_event(self, self.scatter_count, scatter_payout)

            # Step 7: Calculate spin payout
            spin_win = self.calculate_total_payout(bet)
            total_freespin_win += spin_win
            game_events.set_win_event(self, spin_win)

            # Step 8: Check for retrigger
            if self.check_freespin_trigger(self.scatter_count):
                self.freespins_remaining += self.config.freespin_retrigger_amount
                self.freespins_awarded += self.config.freespin_retrigger_amount
                game_events.freespin_trigger_event(self, self.config.freespin_retrigger_amount)

            # Decrement counter
            self.freespins_remaining -= 1

        # Emit end free spin
        game_events.freespin_end_event(self, total_freespin_win)

        return total_freespin_win
