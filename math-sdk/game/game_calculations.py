"""
Gates of Olympus - Game Calculations
Win evaluation logic (scatter/cluster pays)
Following Stake Engine architecture
"""

from typing import Dict, List, Any


class GameCalculations:
    """Handles game-specific win calculations"""

    def calculate_scatter_pays(self) -> List[Dict]:
        """
        Calculate wins based on scatter/pay-anywhere logic
        Minimum 8 symbols needed for a win
        """
        from game.game_config import Symbol

        symbol_counts = {}

        # Count each symbol type
        for col in range(len(self.grid)):
            for row in range(len(self.grid[col])):
                symbol = self.grid[col][row]

                # Skip scatter symbol (pays separately)
                if symbol == Symbol.SCATTER.value:
                    continue

                if symbol not in symbol_counts:
                    symbol_counts[symbol] = {
                        'count': 0,
                        'positions': []
                    }

                symbol_counts[symbol]['count'] += 1
                symbol_counts[symbol]['positions'].append({
                    'row': row,
                    'col': col
                })

        # Calculate payouts
        wins = []
        for symbol_str, data in symbol_counts.items():
            # Find matching Symbol enum
            symbol_enum = None
            for s in Symbol:
                if s.value == symbol_str:
                    symbol_enum = s
                    break

            # Check if we have enough symbols (min 8 for Gates of Olympus)
            if symbol_enum and data['count'] >= 8:
                paytable = self.config.paytable.get(symbol_enum, [])
                if data['count'] < len(paytable):
                    payout = paytable[data['count']]
                    if payout > 0:
                        wins.append({
                            'symbol': symbol_str,
                            'count': data['count'],
                            'payout': payout,
                            'positions': data['positions'],
                        })

        return wins

    def calculate_scatter_payout(self, scatter_count: int) -> float:
        """Calculate scatter symbol payout"""
        from game.game_config import Symbol

        if scatter_count >= 4:
            scatter_paytable = self.config.paytable[Symbol.SCATTER]
            if scatter_count < len(scatter_paytable):
                return scatter_paytable[scatter_count]

        return 0.0

    def calculate_total_multiplier(self, has_win: bool = False) -> float:
        """
        Calculate total multiplier ONLY if there's a win this spin.
        Gates of Olympus logic: multipliers only count when symbols explode.

        In free spins:
        - Accumulated multipliers from previous WINNING spins
        - New multipliers from THIS spin (only added if win)
        """
        total_multiplier = 0.0

        # Only apply multipliers if there's a win
        if has_win:
            # Add accumulated multipliers from previous winning spins (free spins only)
            if self.current_mode == 'MODE_FREESPIN' and hasattr(self, 'active_multipliers'):
                total_multiplier += sum(self.active_multipliers)

            # Add new multipliers dropped this spin
            for mult in self.multipliers:
                total_multiplier += mult['value']

        return total_multiplier

    def calculate_total_payout(self, bet: float) -> float:
        """
        Calculate total payout with multipliers
        Formula: (base_win + scatter_win) * bet * total_multiplier
        """
        # Calculate base win from symbol matches
        base_win = sum(win['payout'] for win in self.wins)

        # Add scatter payout
        scatter_count = self.count_scatters()
        scatter_payout = self.calculate_scatter_payout(scatter_count)
        base_win += scatter_payout

        # Check if there's any win
        has_win = base_win > 0

        # Calculate multiplier (only if there's a win)
        total_multiplier = self.calculate_total_multiplier(has_win=has_win)

        # Apply multiplier
        if has_win and total_multiplier > 0:
            total_payout = base_win * bet * total_multiplier
        else:
            total_payout = base_win * bet

        return total_payout
