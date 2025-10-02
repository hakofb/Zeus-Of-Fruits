import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Symbol } from './Symbol';
import { Multiplier } from './Multiplier';
import { WinDisplay } from './WinDisplay';

interface GameBoardProps {
  rows: number;
  cols: number;
  onSpin: () => void;
  gameState: GameState;
}

interface GameState {
  grid: string[][];
  multipliers: MultiplierData[];
  wins: WinData[];
  totalWin: number;
  isSpinning: boolean;
}

interface MultiplierData {
  position: { row: number; col: number };
  value: number;
}

interface WinData {
  symbol: string;
  count: number;
  payout: number;
  positions: { row: number; col: number }[];
}

export const GameBoard: React.FC<GameBoardProps> = ({
  rows,
  cols,
  onSpin,
  gameState,
}) => {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'spinning' | 'landing' | 'winning'>('idle');

  useEffect(() => {
    if (gameState.isSpinning) {
      setAnimationPhase('spinning');

      setTimeout(() => {
        setAnimationPhase('landing');
      }, 1000);

      setTimeout(() => {
        if (gameState.wins.length > 0) {
          setAnimationPhase('winning');
        } else {
          setAnimationPhase('idle');
        }
      }, 2000);
    }
  }, [gameState.isSpinning, gameState.wins]);

  const winningPositions = useMemo(() => {
    const positions = new Set<string>();
    gameState.wins.forEach(win => {
      win.positions.forEach(pos => {
        positions.add(`${pos.row}-${pos.col}`);
      });
    });
    return positions;
  }, [gameState.wins]);

  const multiplierMap = useMemo(() => {
    const map = new Map<string, number>();
    gameState.multipliers.forEach(m => {
      map.set(`${m.position.row}-${m.position.col}`, m.value);
    });
    return map;
  }, [gameState.multipliers]);

  const isWinningPosition = useCallback((row: number, col: number): boolean => {
    return winningPositions.has(`${row}-${col}`);
  }, [winningPositions]);

  const getMultiplierAtPosition = useCallback((row: number, col: number): number | undefined => {
    return multiplierMap.get(`${row}-${col}`);
  }, [multiplierMap]);

  return (
    <div className="game-board">
      <div className="grid-container">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: cols }).map((_, colIndex) => {
              const symbol = gameState.grid[colIndex]?.[rowIndex];
              const multiplier = getMultiplierAtPosition(rowIndex, colIndex);
              const isWinning = isWinningPosition(rowIndex, colIndex);

              return (
                <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
                  <Symbol
                    symbol={symbol}
                    isWinning={isWinning}
                    animationPhase={animationPhase}
                  />
                  {multiplier && (
                    <Multiplier
                      value={multiplier}
                      animationPhase={animationPhase}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {gameState.wins.length > 0 && (
        <WinDisplay
          wins={gameState.wins}
          totalWin={gameState.totalWin}
        />
      )}

      <button
        className="spin-button"
        onClick={onSpin}
        disabled={gameState.isSpinning}
      >
        {gameState.isSpinning ? 'SPINNING...' : 'SPIN'}
      </button>
    </div>
  );
};
