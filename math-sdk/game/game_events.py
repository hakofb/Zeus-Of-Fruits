"""
Gates of Olympus - Game Events
Event emission following Stake Engine format
"""

from typing import Dict, List, Any


def reveal_event(gamestate) -> None:
    """Emit board reveal event"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'reveal',
        'board': gamestate.grid,
        'gameType': gamestate.current_mode,
    })


def multiplier_drop_event(gamestate) -> None:
    """Emit multiplier drop event"""
    if gamestate.multipliers:
        gamestate.book_events.append({
            'index': len(gamestate.book_events),
            'type': 'multiplierDrop',
            'multipliers': gamestate.multipliers,
        })


def win_info_event(gamestate) -> None:
    """Emit win information event"""
    if gamestate.wins:
        total_win = sum(w['payout'] for w in gamestate.wins)
        gamestate.book_events.append({
            'index': len(gamestate.book_events),
            'type': 'winInfo',
            'totalWin': total_win,
            'wins': gamestate.wins,
        })


def scatter_win_event(gamestate, scatter_count: int, payout: float) -> None:
    """Emit scatter win event"""
    if scatter_count >= 4 and payout > 0:
        gamestate.book_events.append({
            'index': len(gamestate.book_events),
            'type': 'scatterWin',
            'count': scatter_count,
            'payout': payout,
        })


def freespin_trigger_event(gamestate, spins_awarded: int) -> None:
    """Emit free spin trigger event"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'freespinTrigger',
        'totalFs': spins_awarded,
    })


def freespin_update_event(gamestate, current: int, total: int) -> None:
    """Emit free spin counter update"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'updateFreeSpin',
        'amount': current,
        'total': total,
    })


def freespin_end_event(gamestate, total_win: float) -> None:
    """Emit free spin end event"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'endFreeSpin',
        'amount': total_win,
    })


def set_win_event(gamestate, amount: float) -> None:
    """Emit set win event"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'setWin',
        'amount': amount,
    })


def set_total_win_event(gamestate, amount: float) -> None:
    """Emit set total win event"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'setTotalWin',
        'amount': amount,
    })


def final_win_event(gamestate, amount: float) -> None:
    """Emit final win event"""
    gamestate.book_events.append({
        'index': len(gamestate.book_events),
        'type': 'finalWin',
        'amount': amount,
    })
