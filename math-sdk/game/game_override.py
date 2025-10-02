"""
Gates of Olympus - Game Override
Modifications to state machine behavior
Following Stake Engine architecture
"""


class GameStateOverride:
    """Override core GameState functionality"""

    def reset_book(self) -> None:
        """Reset book for new simulation"""
        # Call parent reset if exists
        if hasattr(super(), 'reset_book'):
            super().reset_book()

        # Gates of Olympus specific resets
        self.grid = []
        self.multipliers = []
        self.active_multipliers = []
        self.wins = []
        self.total_win = 0.0
        self.scatter_count = 0
        self.freespins_triggered = False
        self.freespins_awarded = 0
        self.freespins_remaining = 0
        self.book_events = []

    def reset_fs_spin(self) -> None:
        """Reset free spin variables"""
        # Update game type
        self.current_mode = 'MODE_FREESPIN'

        # Reset per-spin variables (but keep accumulated multipliers)
        self.grid = []
        self.multipliers = []
        self.wins = []
        self.total_win = 0.0
        self.scatter_count = 0

    def assign_special_sym_function(self) -> None:
        """
        Define special symbol functions
        For Gates of Olympus, scatters trigger free spins
        """
        self.special_symbol_functions = {
            # Scatter symbol handling is done in main game logic
            # No special symbol initialization needed
        }
