import React, { useMemo } from 'react';

interface SymbolProps {
  symbol: string;
  isWinning: boolean;
  animationPhase: 'idle' | 'spinning' | 'landing' | 'winning';
}

export const Symbol: React.FC<SymbolProps> = React.memo(({
  symbol,
  isWinning,
  animationPhase,
}) => {
  const symbolClass = useMemo(() => {
    const classes = ['symbol', `symbol-${symbol}`];

    if (animationPhase === 'spinning') {
      classes.push('symbol-spinning');
    }

    if (animationPhase === 'landing') {
      classes.push('symbol-landing');
    }

    if (isWinning && animationPhase === 'winning') {
      classes.push('symbol-winning');
    }

    return classes.join(' ');
  }, [symbol, animationPhase, isWinning]);

  const fallbackSrc = useMemo(
    () => `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='40'>${symbol}</text></svg>`,
    [symbol]
  );

  return (
    <div className={symbolClass}>
      <div className="symbol-image">
        <img
          src={`/assets/symbols/${symbol}.png`}
          alt={symbol}
          draggable={false}
          onError={(e) => {
            e.currentTarget.src = fallbackSrc;
          }}
        />
      </div>
      {isWinning && (
        <div className="win-glow" />
      )}
    </div>
  );
});
