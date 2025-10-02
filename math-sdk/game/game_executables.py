"""
Gates of Olympus - Game Executables
Commonly used game actions and logic
Following Stake Engine architecture
"""

from typing import Dict, List, Any
import random


class GameExecutables:
    """Groups commonly used game actions"""

    def draw_board(self, mode: str) -> None:
        """Generate random grid based on symbol weights"""
        weights = self.config.get_symbol_weights(mode)
        symbols = list(weights.keys())
        weight_values = list(weights.values())

        self.grid = []
        for col in range(self.config.cols):
            column = []
            for row in range(self.config.rows):
                symbol = random.choices(symbols, weights=weight_values, k=1)[0]
                column.append(symbol.value)
            self.grid.append(column)

    def generate_multipliers(self, mode: str) -> None:
        """Generate random multipliers based on drop chance"""
        drop_chance = self.config.get_multiplier_drop_chance(mode)
        mult_values = list(self.config.multiplier_weights.keys())
        mult_weights = list(self.config.multiplier_weights.values())

        self.multipliers = []
        for col in range(self.config.cols):
            for row in range(self.config.rows):
                if random.random() < drop_chance:
                    value = random.choices(mult_values, weights=mult_weights, k=1)[0]
                    self.multipliers.append({
                        'position': {'row': row, 'col': col},
                        'value': value,
                    })

    def count_scatters(self) -> int:
        """Count scatter symbols on grid"""
        count = 0
        from game.game_config import Symbol

        for col in self.grid:
            for symbol in col:
                if symbol == Symbol.SCATTER.value:
                    count += 1

        return count

    def check_freespin_trigger(self, scatter_count: int) -> bool:
        """Check if free spins should be triggered"""
        return scatter_count >= self.config.scatters_needed_for_trigger

    def update_freespin_amount(self, scatter_count: int) -> int:
        """Calculate free spins awarded based on scatter count"""
        return self.config.freespin_triggers.get(scatter_count, 15)

    def emit_reveal_event(self) -> None:
        """Emit board reveal event"""
        self.book_events.append({
            'type': 'reveal',
            'grid': self.grid,
            'gameType': self.current_mode,
        })

    def emit_multiplier_event(self) -> None:
        """Emit multiplier drop event"""
        if self.multipliers:
            self.book_events.append({
                'type': 'multiplierDrop',
                'multipliers': self.multipliers,
            })

    def emit_win_event(self) -> None:
        """Emit win information event"""
        if self.wins:
            self.book_events.append({
                'type': 'winInfo',
                'totalWin': sum(w['payout'] for w in self.wins),
                'wins': self.wins,
            })

    def emit_scatter_event(self, scatter_count: int, payout: float) -> None:
        """Emit scatter win event"""
        self.book_events.append({
            'type': 'scatterWin',
            'count': scatter_count,
            'payout': payout,
        })

    def emit_freespin_trigger_event(self, spins_awarded: int) -> None:
        """Emit free spin trigger event"""
        self.book_events.append({
            'type': 'freespinTrigger',
            'spins': spins_awarded,
        })

    def emit_freespin_update_event(self, current: int, total: int) -> None:
        """Emit free spin counter update"""
        self.book_events.append({
            'type': 'updateFreeSpin',
            'amount': current,
            'total': total,
        })

    def emit_final_win_event(self, amount: float) -> None:
        """Emit final win event"""
        self.book_events.append({
            'type': 'finalWin',
            'amount': amount,
        })
