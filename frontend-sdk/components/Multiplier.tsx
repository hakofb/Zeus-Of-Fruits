import React, { useMemo } from 'react';

interface MultiplierProps {
  value: number;
  animationPhase: 'idle' | 'spinning' | 'landing' | 'winning';
}

export const Multiplier: React.FC<MultiplierProps> = React.memo(({
  value,
  animationPhase,
}) => {
  const multiplierClass = useMemo(() => {
    const classes = ['multiplier'];

    if (animationPhase === 'landing') {
      classes.push('multiplier-drop');
    }

    if (value >= 100) {
      classes.push('multiplier-mega');
    } else if (value >= 10) {
      classes.push('multiplier-big');
    }

    return classes.join(' ');
  }, [value, animationPhase]);

  return (
    <div className={multiplierClass}>
      <div className="multiplier-glow" />
      <div className="multiplier-frame">
        <span className="multiplier-value">{value}x</span>
      </div>
    </div>
  );
});
