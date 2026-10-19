// Hand-drawn 48x48 icons. Outlines use currentColor; fills use theme variables
// (--icon-a / --icon-b, defined in globals.css) so every theme recolors them.
const A = 'fill="var(--icon-a)"';
const B = 'fill="var(--icon-b)"';
const C = 'fill="var(--card)"';
const INK = 'fill="currentColor" stroke="none"';

export const ICONS = {
  // ───────── the 17 categories ─────────
  ghost: `<path ${A} d="M11 40V23a13 13 0 0 1 26 0v17l-4.3-3.3L28.4 40l-4.4-3.3L19.6 40l-4.3-3.3L11 40Z"/><circle ${INK} cx="19.5" cy="23" r="2"/><circle ${INK} cx="28.5" cy="23" r="2"/><path d="M21.5 28.5q2.5 2.5 5 0"/><circle ${B} stroke="none" cx="15.5" cy="28" r="2" opacity=".7"/><circle ${B} stroke="none" cx="32.5" cy="28" r="2" opacity=".7"/>`,
  bulb: `<path ${B} d="M24 6a12 12 0 0 0-6.5 22c1.2.9 1.5 2 1.5 3.5V34h10v-2.5c0-1.5.3-2.6 1.5-3.5A12 12 0 0 0 24 6Z"/><path d="M19 38.5h10M21 43h6"/><path d="M20.5 20.5 24 17l3.5 3.5M24 17v10"/>`,
  braces: `<path d="M17 7c-4 0-5 2-5 5v5c0 3-1.5 5-4 7 2.5 2 4 4 4 7v5c0 3 1 5 5 5M31 7c4 0 5 2 5 5v5c0 3 1.5 5 4 7-2.5 2-4 4-4 7v5c0 3-1 5-5 5"/><rect ${A} x="19" y="19" width="10" height="10" rx="3.5"/>`,
  stairs: `<path ${A} d="M6 42v-8h10v-8h10v-8h10v-8h6v32Z"/><path ${B} stroke="none" transform="translate(-1 -2)" d="M39 2l1.6 3.4L44 7l-3.4 1.6L39 12l-1.6-3.4L34 7l3.4-1.6Z"/>`,
  globe: `<circle ${A} cx="24" cy="24" r="17"/><ellipse cx="24" cy="24" rx="7.5" ry="17"/><path d="M7 24h34M9.5 15.5c9 4 20 4 29 0M9.5 32.5c9-4 20-4 29 0"/>`,
  puzzle: `<path ${B} d="M10 16h8a4 4 0 1 1 8 0h8v8a4 4 0 1 1 0 8v8H26a4 4 0 1 0-8 0h-8v-8a4 4 0 1 0 0-8Z"/>`,
  scales: `<path d="M24 9v31M15 40h18M10 14h28M10 14 5 26M10 14l5 12M38 14l-5 12M38 14l5 12"/><path ${A} d="M5 26a5 5 0 0 0 10 0ZM33 26a5 5 0 0 0 10 0Z"/><circle ${B} cx="24" cy="8" r="3"/>`,
  atom: `<ellipse ${A} cx="24" cy="24" rx="18" ry="7" opacity=".55"/><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)"/><circle ${B} cx="24" cy="24" r="4.5"/>`,
  umbrella: `<path ${A} d="M6 26C6 15.5 14 8 24 8s18 7.5 18 18c-3-3-6-3-9 0-3-3-6-3-9 0-3-3-6-3-9 0-3-3-6-3-9 0Z"/><path d="M24 26v12a4 4 0 0 1-8 0M24 8V5"/><circle ${B} stroke="none" cx="24" cy="16" r="2.5"/>`,
  camera: `<rect ${A} x="6" y="14" width="36" height="25" rx="7"/><path d="M16 14l2.5-5h11l2.5 5"/><circle ${C} cx="24" cy="26.5" r="8"/><circle ${B} cx="24" cy="26.5" r="3.8"/><circle ${INK} cx="36" cy="20" r="1.6"/>`,
  shell: `<path ${A} d="M24 40 7.5 23a16.5 16 0 0 1 33 0Z"/><path d="M24 40 13 17M24 40l5-27M24 40V11M24 40 35 17"/><path ${B} d="M18 40h12v3.5a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2Z"/>`,
  dance: `<path d="M18 36V13l20-4v23"/><path ${B} d="M18 13l20-4v7l-20 4Z"/><ellipse ${A} cx="13.5" cy="36" rx="5.5" ry="4.2"/><ellipse ${A} cx="33.5" cy="32" rx="5.5" ry="4.2"/>`,
  flower: `<path d="M24 31v13"/><path ${A} d="M24 40c-6 0-9.5-3-9.5-7 6 0 9.5 3 9.5 7Z"/><circle ${A} cx="24" cy="10.5" r="6"/><circle ${A} cx="33.5" cy="17.5" r="6"/><circle ${A} cx="30" cy="28" r="6"/><circle ${A} cx="18" cy="28" r="6"/><circle ${A} cx="14.5" cy="17.5" r="6"/><circle ${B} cx="24" cy="21" r="5.5"/><circle ${INK} cx="22" cy="20.5" r="1.1"/><circle ${INK} cx="26" cy="20.5" r="1.1"/>`,
  volcano: `<path ${A} d="M5 42 17.5 21h13L43 42Z"/><path ${B} d="M17.5 21h13l-2.5 7-3.5-3-3.5 3Z"/><circle ${B} cx="19" cy="12" r="2.5"/><circle ${B} cx="28" cy="8.5" r="3"/><circle ${B} cx="24.5" cy="14.5" r="1.8"/>`,
  seismo: `<rect ${A} x="5" y="8" width="38" height="32" rx="9"/><path d="M9 25h7l3.5-11 5 20 4.5-15 3 6h11"/>`,
  cave: `<path ${A} d="M5 42V27C5 15 13 8 24 8s19 7 19 19v15Z"/><path ${C} d="M15 42V33a9 9 0 0 1 18 0v9Z"/><path ${B} d="M13 15l2.5 7 2.5-7M21 12l2 5 2-5M29 15l2 6 2-6"/><circle ${B} cx="24" cy="29" r="2.2" stroke="none"/>`,
  germ: `<circle ${A} cx="24" cy="24" r="11"/><path d="M35 24h5M31.8 31.8l3.5 3.5M24 35v5M16.2 31.8l-3.5 3.5M13 24H8M16.2 16.2l-3.5-3.5M24 13V8M31.8 16.2l3.5-3.5"/><circle ${B} cx="41.5" cy="24" r="2.3"/><circle ${B} cx="36.6" cy="36.6" r="2.3"/><circle ${B} cx="24" cy="41.5" r="2.3"/><circle ${B} cx="11.4" cy="36.6" r="2.3"/><circle ${B} cx="6.5" cy="24" r="2.3"/><circle ${B} cx="11.4" cy="11.4" r="2.3"/><circle ${B} cx="24" cy="6.5" r="2.3"/><circle ${B} cx="36.6" cy="11.4" r="2.3"/><circle ${INK} cx="20" cy="22" r="1.7"/><circle ${INK} cx="28" cy="22" r="1.7"/><path d="M21 27q3 3 6 0"/>`,

  // ───────── steps ─────────
  book: `<path ${A} d="M24 12c-4-3-10-4-16-3v27c6-1 12 0 16 3 4-3 10-4 16-3V9c-6-1-12 0-16 3Z"/><path d="M24 12v27"/><path ${B} stroke="none" d="M34 15l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1Z"/>`,
  target: `<circle ${A} cx="22" cy="26" r="16"/><circle ${C} cx="22" cy="26" r="9.5"/><circle ${B} cx="22" cy="26" r="3.8"/><path d="M22 26 40 8M35 7l6-1-1 6"/>`,
  heartstep: `<path ${A} d="M24 40S6 29.5 6 17.5a9.5 9.5 0 0 1 18-4 9.5 9.5 0 0 1 18 4C42 29.5 24 40 24 40Z"/><path ${B} d="M33 5l1.8 4.2L39 11l-4.2 1.8L33 17l-1.8-4.2L27 11l4.2-1.8Z"/>`,

  // ───────── decoration ─────────
  star: `<path ${B} d="M24 6l5.2 11 12 1.6-8.8 8.4 2.2 12L24 33l-10.6 6 2.2-12-8.8-8.4 12-1.6Z"/>`,
  sparkle: `<path ${A} d="M24 4c1 9 4 12 14 14-10 2-13 5-14 14-1-9-4-12-14-14 10-2 13-5 14-14Z"/>`,
  heart: `<path ${A} d="M24 40S6 29.5 6 17.5a9.5 9.5 0 0 1 18-4 9.5 9.5 0 0 1 18 4C42 29.5 24 40 24 40Z"/>`,
  moon: `<path ${B} d="M31 6a18 18 0 1 0 11 28A15 15 0 0 1 31 6Z"/>`,
  cloud: `<path ${C} d="M13 37a8 8 0 0 1-1-16 11 11 0 0 1 21-2 9 9 0 0 1 1 18Z"/>`,
} as const;

export type IconName = keyof typeof ICONS;

// Category number (1..17 in the Word bank) → icon
export const CATEGORY_ICONS: IconName[] = [
  "ghost", // 1 Hallucination Detection
  "bulb", // 2 Logic & Reasoning
  "braces", // 3 Structured Output
  "stairs", // 4 Multi-step Reasoning
  "globe", // 5 Geography
  "puzzle", // 6 Puzzles & Deduction
  "scales", // 7 General Legal Literacy
  "atom", // 8 Basic Physics
  "umbrella", // 9 Insurance Literacy
  "camera", // 10 Photography
  "shell", // 11 Oceanography
  "dance", // 12 Dance
  "flower", // 13 Botany
  "volcano", // 14 Volcanology
  "seismo", // 15 Seismology
  "cave", // 16 Speleology
  "germ", // 17 Basic Virology
];

export function categoryIconName(number: number): IconName {
  return CATEGORY_ICONS[(number - 1) % CATEGORY_ICONS.length] ?? "star";
}
