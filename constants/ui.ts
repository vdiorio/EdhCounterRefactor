// shared UI constants for sizing, animation timings, and colors

export const SIZES = {
  LIFE_FONT_SIZE: 48,
  DELTA_FONT_FACTOR: 0.3333333, // delta text is roughly a third of life
  VISUAL_HELPER_ICON_FACTOR: 0.25, // quarter of life size for plus/minus icons
  SMALL_SCREEN_THRESHOLD: 200,
};

export const ANIMATIONS = {
  STANDARD_DURATION: 300,
  INITIAL_DELAY: 700,
  ENTRY_FADE_DURATION: 1000,
  DELTA_ANIMATION: 100,
  OPACITY_TRANSITION: 200,
  HOLD_INTERVAL: 100, // used for long‑press increment behavior
  AUTO_ADJUST_DURATION: 600,
  SLIDER_TOGGLE_DURATION: 300,
};

export const COLORS = {
  BORDER: "#555555",
  DEFAULT_PLAYER: "#00c1f1",
  CHAIN_ACTIVE: "#70e700ff",
  CHAIN_INACTIVE: "#888888",
};
