# Gates of Olympus - Frontend SDK

React-based frontend implementation compatible with Stake Engine format.

## Structure

```
frontend-sdk/
├── components/          # React game components
│   ├── GameBoard.tsx   # Main game grid
│   ├── Symbol.tsx      # Symbol renderer
│   ├── Multiplier.tsx  # Multiplier display
│   └── WinDisplay.tsx  # Win animations
├── assets/             # Game assets (symbols, backgrounds, etc.)
├── config/             # Frontend configuration
│   └── game-config.json
└── stories/            # Storybook event data
    └── event-handlers.ts
```

## Integration with Math SDK

The frontend reads configuration from Math SDK's `library/config_fe.json`:

```json
{
  "game_id": "gates_of_olympus",
  "rows": 6,
  "cols": 5,
  "symbols": [...],
  "paytable": {...}
}
```

## Event Handling

The frontend listens to book events from the RGS:

### Event Types

1. **drawBoard**
   - Renders initial grid
   - Animates symbol placement

2. **multiplierDrop**
   - Displays multipliers on grid
   - Animates multiplier effects

3. **symbolWin**
   - Highlights winning symbols
   - Plays win animations

4. **scatterWin**
   - Special scatter animations
   - Displays scatter count

5. **freespinTrigger**
   - Transition to free spins mode
   - Shows spins awarded

6. **payout**
   - Displays total win
   - Updates balance

## Component Architecture

### GameBoard Component
Main container managing game state and rendering

### Symbol Component
Renders individual symbols with animations:
- Entry animation
- Win highlight
- Exit animation

### Multiplier Component
Displays multiplier values on grid positions:
- Drop animation
- Accumulation effect
- Glow effects

### WinDisplay Component
Shows win information:
- Win amount
- Multiplier total
- Win line animations

## Stake Engine Compatibility

This Frontend SDK follows Stake requirements:
- Event-driven architecture
- Stateless rendering
- PixieJS/Canvas rendering (can be ported from React)
- Responsive design
- Animation timeline management

## Converting to PixieJS

To convert React components to PixieJS for Stake:

1. Replace React components with PixieJS containers
2. Use PixieJS sprites for symbols
3. Implement GSAP for animations
4. Use Svelte for UI overlays
5. Maintain event-driven architecture

## Assets Required

For Stake submission, provide:
- Symbol images (high resolution)
- Background images
- UI elements
- Sound effects
- Animation sprites

All assets must be original and not infringe on copyrights.

## Testing with Storybook

Use Storybook to test individual book events:

```typescript
// stories/event-handlers.ts
export const testEvents = {
  drawBoard: {...},
  multiplierDrop: {...},
  symbolWin: {...}
}
```

## Performance

- 60 FPS animations
- Smooth transitions
- Efficient rendering
- Mobile optimized
