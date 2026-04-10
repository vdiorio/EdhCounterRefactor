# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start          # Start with Expo tunnel
npm run android    # Start Android emulator
npm run ios        # Start iOS simulator
npm run web        # Start web version

# Testing
npm test                                                        # Jest watch mode
npm test -- components/PlayerBox/__tests__/PlayerBox.test.tsx  # Single test file
npm test -- --testNamePattern="pattern"                        # Single test by name
npm run coverage                                               # Coverage report

# Code quality
npm run lint       # Expo ESLint
```

## Architecture

This is an EDH (Magic: The Gathering Commander) life tracking app built with **React Native + Expo + Expo Router**.

### State Management: Zustand stores in `/store/`

- **`GameStore.ts`** — Core game state: player life totals, commander damage, poison/energy/experience counters, dead players, monarch/initiative effects. All mutation happens here.
- **`ScreenStore.ts`** — Navigation/UI state: which screen is shown (`main` | `game` | `cdmg`), current `playerId`, and display direction.
- **`StyleStore.ts`** — Theme colors per player (shuffled on game reset).
- **`selectors.ts`** — Memoized selectors to avoid unnecessary re-renders.

Key `GameStore` shape:
```typescript
players: Record<number, {
  lTotal: number           // Current life total
  delta: number            // Recent delta (auto-resets after 2s)
  Cdmg: Record<number, [number, number]>  // [main, partner] damage per attacker
  chain: boolean           // Link commander damage to life total
  poison: number; energy: number; experience: number
}>
numPlayers: number
gameLayout: [number, number, number, number]  // [top, right, bottom, left] slot counts
monarchPlayerId: number | null
initiativePlayerId: number | null
```

### Routing: Expo Router in `/app/`

- `index.tsx` → redirects to `Pages/LayoutSelectorScreen`
- `Pages/LayoutSelectorScreen.tsx` → player count selector
- `Pages/GameScreen.tsx` → main game orchestrator; receives player count via query params, computes layout, renders the grid

### Component Tree

```
GameScreen
└─ LayoutGenerator        # Computes grid geometry (useLayoutGenerator hook)
   └─ PlayerPiece          # One per grid position, handles rotation
      └─ PlayerBox         # Per-player UI (life total, buttons, sidebar)
         ├─ Lifetotal      # Displays lTotal + delta animation
         ├─ IncrementerButtons  # +/- buttons with hold-to-repeat
         ├─ UtilsSideBar   # Sliding panel: commander damage, poison, etc.
         └─ CountersTopBar # Shows poison/energy/experience counters
```

Commander damage view (`CdmgBox`) is shown when `ScreenStore` switches to `cdmg` screen.

### Custom Hooks in `/hooks/`

| Hook | Purpose |
|------|---------|
| `useLayoutGenerator` | Compute pixel dimensions for the player grid |
| `useIncrementAction` | Hold-to-repeat logic for +/- buttons |
| `useDeltaAnimation` | Fade-out animation for life delta display |
| `usePlayerIcon` | Icon selection per player |
| `useSidebarState` | Sidebar open/close state with sequential animation |
| `useAppColors` | Per-player color theming |

### Layouts

Player layouts are defined in `constants/playerLayouts.ts` as `[top, right, bottom, left]` slot arrays. 2–6 players are supported with alternate layout options (alt flag). The `Rotator` component rotates players on the sides 90°.

### Animations

All animations use `react-native-reanimated` shared values. Key patterns:
- Life delta fades out after 2000ms
- Sidebar uses sequential exit-enter animation when switching content
- Press feedback uses scale animation on `IncrementerButtons`

### Testing

Tests use `@testing-library/react-native` with Jest fake timers. The store must be reset between tests via `GameStore.getState().resetGame()`. Currently only `PlayerBox` and `usePlayerIcon` have test coverage.

### Import alias

`@/*` maps to the project root (configured in `tsconfig.json`).
