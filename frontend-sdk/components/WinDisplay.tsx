import React from 'react';

interface WinDisplayProps {
  wins: WinData[];
  totalWin: number;
}

interface WinData {
  symbol: string;
  count: number;
  payout: number;
  positions: { row: number; col: number }[];
}

export const WinDisplay: React.FC<WinDisplayProps> = ({
  wins,
  totalWin,
}) => {
  return (
    <div className="win-display">
      <div className="win-animation">
        <div className="win-amount-container">
          <span className="win-label">WIN</span>
          <span className="win-amount">{totalWin.toFixed(2)}</span>
        </div>

        <div className="win-details">
          {wins.map((win, index) => (
            <div key={index} className="win-line">
              <img
                src={`/assets/symbols/${win.symbol}.png`}
                alt={win.symbol}
                className="win-symbol-icon"
              />
              <span className="win-count">x{win.count}</span>
              <span className="win-payout">{win.payout.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="win-celebration">
        {totalWin > 50 && <div className="fireworks" />}
        {totalWin > 100 && <div className="mega-win-banner">MEGA WIN!</div>}
      </div>
    </div>
  );
};
