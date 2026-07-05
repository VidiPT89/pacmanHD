/* ==================== i18n ==================== */
const TRANSLATIONS = {
  pt: {
    introTitle: "Pac-Man HD",
    introText: "Um remake moderno do clássico arcade de 1980. Engole o labirinto, foge dos fantasmas e persegue o recorde.",
    introSkipBtn: "Saltar",
    eyebrow: "LABIRINTO CLÁSSICO",
    title1: "Foge. Persegue.",
    title2: "Come tudo.",
    tagline: "Guia o Pac-Man pelo labirinto, engole todos os pontos e as pastilhas de poder, e foge dos quatro fantasmas — cada um com a sua própria personalidade — antes que te apanhem.",
    diffEasy: "Fácil",
    diffEasyMeta: "4 vidas",
    diffNormal: "Normal",
    diffNormalMeta: "3 vidas",
    diffHard: "Difícil",
    diffHardMeta: "2 vidas",
    scoreLabel: "Pontos",
    levelLabel: "Nível",
    livesLabel: "Vidas",
    bestLabel: "Melhor",
    pressStartKicker: "TOCA OU PRIME",
    pressStart: "ESPAÇO PARA COMEÇAR",
    pausedTitle: "PAUSA",
    pausedSub: "Prime P ou toca para retomar",
    controlsHint: "⌨️ Setas ou WASD para mover · P para pausar",
    consoleHint: "💡 Dica: abre a consola do navegador para veres pistas de desenvolvimento.",
    footerBy: "Desenvolvido por",
    playAgainBtn: "Jogar Novamente",
    closeBtn: "Fechar",
    levelClear: (n) => `NÍVEL ${n} CONCLUÍDO`,
    levelIncoming: (n) => `NÍVEL ${n}`,
    lifeLostToast: "PAC-MAN APANHADO",
    extraLifeToast: "🎉 VIDA EXTRA!",
    loseTitle: "Fim de Jogo",
    textCaught: (lvl) => `Foste apanhado pelos fantasmas no nível ${lvl}.`,
    statScore: "Pontos",
    statLevel: "Nível",
    statBest: "Recorde",
    newBest: "🏆 Novo recorde!",
    ghostEatToast: (n) => `+${n}`,
  },
  en: {
    introTitle: "Pac-Man HD",
    introText: "A modern remake of the 1980 arcade classic. Gobble the maze, dodge the ghosts and chase the high score.",
    introSkipBtn: "Skip",
    eyebrow: "CLASSIC MAZE",
    title1: "Run. Chase.",
    title2: "Eat it all.",
    tagline: "Guide Pac-Man through the maze, gobble every dot and power pellet, and outrun four ghosts — each with its own personality — before they catch you.",
    diffEasy: "Easy",
    diffEasyMeta: "4 lives",
    diffNormal: "Normal",
    diffNormalMeta: "3 lives",
    diffHard: "Hard",
    diffHardMeta: "2 lives",
    scoreLabel: "Score",
    levelLabel: "Level",
    livesLabel: "Lives",
    bestLabel: "Best",
    pressStartKicker: "TAP OR PRESS",
    pressStart: "SPACE TO START",
    pausedTitle: "PAUSED",
    pausedSub: "Press P or tap to resume",
    controlsHint: "⌨️ Arrows or WASD to move · P to pause",
    consoleHint: "💡 Tip: open the browser console for developer hints.",
    footerBy: "Developed by",
    playAgainBtn: "Play Again",
    closeBtn: "Close",
    levelClear: (n) => `LEVEL ${n} CLEARED`,
    levelIncoming: (n) => `LEVEL ${n}`,
    lifeLostToast: "PAC-MAN CAUGHT",
    extraLifeToast: "🎉 EXTRA LIFE!",
    loseTitle: "Game Over",
    textCaught: (lvl) => `You were caught by the ghosts on level ${lvl}.`,
    statScore: "Score",
    statLevel: "Level",
    statBest: "Best",
    newBest: "🏆 New record!",
    ghostEatToast: (n) => `+${n}`,
  },
};

const DIFFICULTIES = {
  easy: { lives: 4, ghostSpeedMul: 0.82, frightenedMs: 9000, releaseDelays: [150, 2200, 6000, 10000], extraLifeScore: 8000 },
  normal: { lives: 3, ghostSpeedMul: 0.94, frightenedMs: 7000, releaseDelays: [150, 2000, 5500, 9000], extraLifeScore: 10000 },
  hard: { lives: 2, ghostSpeedMul: 1.08, frightenedMs: 5000, releaseDelays: [150, 1200, 3800, 6500], extraLifeScore: 12000 },
};

const STORAGE_LANG = "pacmanhd:lang";
const STORAGE_SOUND = "pacmanhd:sound";
const bestKey = (diff) => `pacmanhd:best:${diff}`;

/* ==================== Maze ====================
   0 = dot, 1 = wall, 2 = ghost house, 3 = power pellet, 4 = empty path */
const COLS = 28;
const ROWS = 28;
const CELL = 20;

const MAZE = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const PAC_HOME = { col: 14, row: 17 };
const DOOR_EXIT = { col: 13, row: 10 };
const HOUSE_ENTRY = { col: 13, row: 12 };

const GHOST_DEFS = [
  { name: "blinky", color: "#ff2e6c", home: { col: 12, row: 12 }, scatter: { col: 26, row: 0 } },
  { name: "pinky", color: "#ff8fd0", home: { col: 12, row: 13 }, scatter: { col: 1, row: 0 } },
  { name: "inky", color: "#33e0ff", home: { col: 15, row: 12 }, scatter: { col: 26, row: 27 } },
  { name: "clyde", color: "#ffb347", home: { col: 15, row: 13 }, scatter: { col: 1, row: 27 } },
];

const PHASES = [
  { mode: "scatter", dur: 7000 },
  { mode: "chase", dur: 20000 },
  { mode: "scatter", dur: 7000 },
  { mode: "chase", dur: 20000 },
  { mode: "scatter", dur: 5000 },
  { mode: "chase", dur: 999999 },
];

const BASE_PAC_SPEED = 0.155; // px/ms
const BASE_GHOST_SPEED = 0.135; // px/ms
const DEATH_ANIM_MS = 900;
const READY_PAUSE_MS = 650;

function idx(col, row) { return row * COLS + col; }

function rawTile(col, row) {
  if (row < 0 || row >= ROWS) return 1;
  let c = col;
  if (c < 0) c += COLS;
  if (c >= COLS) c -= COLS;
  return MAZE[idx(c, row)];
}

let collect = [];
let remaining = 0;

function resetCollectibles() {
  collect = MAZE.map((v) => (v === 0 ? 1 : v === 3 ? 2 : 0));
  remaining = collect.filter((v) => v > 0).length;
}

/* ==================== DOM refs ==================== */
const el = (id) => document.getElementById(id);
const canvas = el("game-canvas");
const ctx = canvas.getContext("2d");
const CW = canvas.width;
const CH = canvas.height;

const scoreValueEl = el("score-value");
const levelValueEl = el("level-value");
const bestValueEl = el("best-value");
const livesTrack = el("lives-track");
const startOverlay = el("start-overlay");
const pauseOverlay = el("pause-overlay");
const waveToast = el("wave-toast");
const gameCard = el("game-card");
const modalOverlay = el("modal-overlay");
const modalIcon = el("modal-icon");
const modalTitle = el("modal-title");
const modalText = el("modal-text");
const modalStats = el("modal-stats");

/* ==================== State ==================== */
const state = {
  lang: localStorage.getItem(STORAGE_LANG) || (navigator.language?.startsWith("pt") ? "pt" : "en"),
  soundOn: localStorage.getItem(STORAGE_SOUND) !== "off",
  difficulty: "normal",
  score: 0,
  level: 1,
  lives: 3,
  running: false,
  paused: false,
  over: false,
  transitioning: false,
  dying: false,
  dyingTimer: 0,
  invulnerableTimer: 0,
  frightenedTimer: 0,
  ghostEatStreak: 0,
  extraLifeAwarded: false,
  phaseIndex: 0,
  phaseTimer: 0,
  chompToggle: false,
};

function t(key, ...args) {
  const value = TRANSLATIONS[state.lang][key];
  return typeof value === "function" ? value(...args) : value;
}

function applyTranslations() {
  document.documentElement.lang = state.lang === "pt" ? "pt-PT" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = TRANSLATIONS[state.lang][key];
    if (typeof value === "string") node.textContent = value;
  });
  el("lang-label").textContent = state.lang.toUpperCase();
  el("lang-flag").textContent = state.lang === "pt" ? "🇵🇹" : "🇬🇧";
  updateBestDisplay();
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE_LANG, lang);
  applyTranslations();
}

el("lang-toggle").addEventListener("click", () => {
  setLang(state.lang === "pt" ? "en" : "pt");
  playTone(520, 0.05);
});

/* ==================== Sound ==================== */
let audioCtx = null;
function ensureAudio() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq, duration, type = "square", gainValue = 0.05, delay = 0) {
  if (!state.soundOn) return;
  try {
    const ac = ensureAudio();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = gainValue;
    osc.connect(gain).connect(ac.destination);
    const startAt = ac.currentTime + delay;
    osc.start(startAt);
    gain.gain.setValueAtTime(gainValue, startAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    osc.stop(startAt + duration + 0.02);
  } catch (e) {
    /* audio unsupported */
  }
}

function playSequence(notes) {
  notes.forEach(([freq, delay, duration, type, gain]) => {
    playTone(freq, duration || 0.15, type || "square", gain || 0.05, delay / 1000);
  });
}

el("sound-toggle").addEventListener("click", () => {
  state.soundOn = !state.soundOn;
  localStorage.setItem(STORAGE_SOUND, state.soundOn ? "on" : "off");
  el("sound-icon").textContent = state.soundOn ? "🔊" : "🔇";
  if (state.soundOn) playTone(440, 0.08);
});

function playChomp() {
  state.chompToggle = !state.chompToggle;
  playTone(state.chompToggle ? 240 : 200, 0.045, "square", 0.045);
}
function playPowerTone() {
  playSequence([[330, 0, 0.09], [415, 60, 0.09], [523, 120, 0.14]]);
}
function playEatGhostTone() {
  playSequence([[600, 0, 0.06], [900, 50, 0.06], [1300, 100, 0.1]]);
}
function playDeathSequence() {
  playSequence([[300, 0, 0.14, "sawtooth"], [230, 140, 0.16, "sawtooth"], [170, 300, 0.2, "sawtooth"], [110, 480, 0.4, "sawtooth"]]);
}
function playLevelClearFanfare() {
  playSequence([[523, 0], [659, 110], [784, 220], [1047, 360, 0.3]]);
}
function playExtraLifeChime() {
  playSequence([[660, 0, 0.1], [880, 90, 0.1], [1100, 180, 0.18]]);
}

/* ==================== Difficulty picker ==================== */
document.querySelectorAll(".diff-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diff-btn").forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-checked", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-checked", "true");
    newGame(btn.dataset.diff);
    playTone(360, 0.08);
  });
});

/* ==================== Entities ==================== */
let cfg = DIFFICULTIES.normal;
let pacman;
let ghosts = [];
let particles = [];

function makePacman() {
  return {
    col: PAC_HOME.col, row: PAC_HOME.row,
    x: PAC_HOME.col * CELL, y: PAC_HOME.row * CELL,
    dir: { x: 0, y: 0 }, queuedDir: { x: 0, y: 0 }, lastDir: { x: -1, y: 0 },
    mouthPhase: 0,
  };
}

function buildGhosts() {
  return GHOST_DEFS.map((def, i) => ({
    name: def.name,
    color: def.color,
    home: def.home,
    scatter: def.scatter,
    col: def.home.col, row: def.home.row,
    x: def.home.col * CELL, y: def.home.row * CELL,
    dir: { x: 0, y: 0 },
    state: "house",
    houseTimer: 0,
    releaseDelay: cfg.releaseDelays[i],
    bouncePhase: Math.random() * Math.PI * 2,
  }));
}

function normalizePos(e) {
  const W = COLS * CELL;
  if (e.x < -0.01) e.x += W;
  if (e.x >= W - 0.01) e.x -= W;
}

/* ==================== Movement core ==================== */
function stepEntity(e, speed, dt, pickDirFn, onEnter) {
  let remainingDist = speed * dt;
  let guard = 0;
  while (remainingDist > 0.001 && guard < 6) {
    guard++;
    const modX = ((e.x % CELL) + CELL) % CELL;
    const modY = ((e.y % CELL) + CELL) % CELL;
    if (modX < 0.05 && modY < 0.05) {
      let c = Math.round(e.x / CELL);
      if (c < 0) c += COLS;
      if (c >= COLS) c -= COLS;
      const r = Math.round(e.y / CELL);
      e.col = c; e.row = r;
      e.x = c * CELL; e.y = r * CELL;
      if (onEnter) onEnter(c, r);
      e.dir = pickDirFn(e, c, r);
    }
    if (e.dir.x === 0 && e.dir.y === 0) { remainingDist = 0; break; }
    const axisDir = e.dir.x !== 0 ? e.dir.x : e.dir.y;
    const axisPos = e.dir.x !== 0 ? e.x : e.y;
    const modPos = ((axisPos % CELL) + CELL) % CELL;
    let distToBoundary;
    if (modPos < 0.05) distToBoundary = CELL;
    else distToBoundary = axisDir > 0 ? CELL - modPos : modPos;
    const move = Math.min(remainingDist, distToBoundary);
    e.x += e.dir.x * move;
    e.y += e.dir.y * move;
    remainingDist -= move;
    normalizePos(e);
  }
}

/* ---- Pac-Man direction ---- */
function pacBlocked(col, row) {
  const v = rawTile(col, row);
  return v === 1 || v === 2;
}
function pickPacDir(e, col, row) {
  const q = pacman.queuedDir;
  if ((q.x || q.y) && !pacBlocked(col + q.x, row + q.y)) {
    pacman.lastDir = q;
    return q;
  }
  if ((e.dir.x || e.dir.y) && !pacBlocked(col + e.dir.x, row + e.dir.y)) return e.dir;
  return { x: 0, y: 0 };
}

/* ---- Ghost direction / AI ---- */
const ALL_DIRS = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];

function ghostBlocked(ghost, col, row) {
  const v = rawTile(col, row);
  if (v === 1) return true;
  if (v === 2) return !(ghost.state === "leaving" || ghost.state === "eaten" || ghost.state === "house");
  return false;
}

function currentPhaseMode() { return PHASES[state.phaseIndex].mode; }

function getGhostTarget(ghost) {
  if (ghost.state === "leaving") return DOOR_EXIT;
  if (ghost.state === "eaten") return HOUSE_ENTRY;
  if (ghost.state === "scatter") return ghost.scatter;
  // chase
  const p = { col: pacman.col, row: pacman.row };
  const pdir = (pacman.dir.x || pacman.dir.y) ? pacman.dir : pacman.lastDir;
  switch (ghost.name) {
    case "blinky":
      return p;
    case "pinky":
      return { col: p.col + pdir.x * 4, row: p.row + pdir.y * 4 };
    case "inky": {
      const pivot = { col: p.col + pdir.x * 2, row: p.row + pdir.y * 2 };
      const blinky = ghosts.find((g) => g.name === "blinky");
      const bc = blinky ? blinky.col : p.col;
      const br = blinky ? blinky.row : p.row;
      return { col: pivot.col + (pivot.col - bc), row: pivot.row + (pivot.row - br) };
    }
    case "clyde": {
      const dist = Math.hypot(ghost.col - p.col, ghost.row - p.row);
      return dist > 8 ? p : ghost.scatter;
    }
    default:
      return p;
  }
}

function pickGhostDir(ghost, col, row) {
  const reverse = { x: -ghost.dir.x, y: -ghost.dir.y };
  let options = ALL_DIRS.filter((d) => !ghostBlocked(ghost, col + d.x, row + d.y));
  if (options.length > 1) {
    options = options.filter((d) => !(d.x === reverse.x && d.y === reverse.y));
  }
  if (options.length === 0) return { x: 0, y: 0 };
  if (ghost.state === "frightened") {
    return options[Math.floor(Math.random() * options.length)];
  }
  const target = getGhostTarget(ghost);
  let best = options[0];
  let bestDist = Infinity;
  for (const d of options) {
    const nc = col + d.x, nr = row + d.y;
    const dist = (nc - target.col) ** 2 + (nr - target.row) ** 2;
    if (dist < bestDist - 1e-6) { bestDist = dist; best = d; }
  }
  return best;
}

function ghostSpeedFor(ghost) {
  const levelBonus = Math.min(0.3, (state.level - 1) * 0.03);
  let mul = cfg.ghostSpeedMul * (1 + levelBonus);
  if (ghost.state === "frightened") mul *= 0.55;
  else if (ghost.state === "eaten") mul *= 1.9;
  return BASE_GHOST_SPEED * mul;
}

function updateGhost(ghost, dt) {
  if (ghost.state === "house") {
    ghost.houseTimer += dt;
    ghost.bouncePhase += dt * 0.006;
    ghost.y = ghost.home.row * CELL + Math.sin(ghost.bouncePhase) * 8;
    ghost.x = ghost.home.col * CELL;
    if (ghost.houseTimer >= ghost.releaseDelay) {
      ghost.state = "leaving";
      ghost.col = ghost.home.col; ghost.row = ghost.home.row;
      ghost.x = ghost.col * CELL; ghost.y = ghost.row * CELL;
      ghost.dir = { x: 0, y: -1 };
    }
    return;
  }
  stepEntity(ghost, ghostSpeedFor(ghost), dt, (e, c, r) => pickGhostDir(ghost, c, r), (c, r) => {
    if (ghost.state === "leaving" && r <= 10) {
      ghost.state = currentPhaseMode();
    }
    if (ghost.state === "eaten" && r >= 12 && r <= 13 && c >= 11 && c <= 16) {
      ghost.state = "house";
      ghost.houseTimer = 0;
      ghost.releaseDelay = 1200;
    }
  });
}

/* ==================== Gameplay events ==================== */
function updateScoreUI() { scoreValueEl.textContent = String(state.score); }
function updateLevelUI() { levelValueEl.textContent = String(state.level); }

function renderLives() {
  livesTrack.innerHTML = "";
  for (let i = 0; i < state.lives; i++) {
    const span = document.createElement("span");
    span.className = "life-icon";
    span.textContent = "🟡";
    livesTrack.appendChild(span);
  }
}

function updateBestDisplay() {
  const best = localStorage.getItem(bestKey(state.difficulty));
  bestValueEl.textContent = best ? best : "—";
}

function flashToast(text) {
  waveToast.textContent = text;
  waveToast.classList.add("is-visible");
  clearTimeout(flashToast._t);
  flashToast._t = setTimeout(() => waveToast.classList.remove("is-visible"), 1300);
}

function handleDotConsumption(col, row) {
  const i = idx(col, row);
  const v = collect[i];
  if (v === 1) {
    collect[i] = 0; remaining--;
    state.score += 10;
    updateScoreUI();
    playChomp();
    checkExtraLife();
  } else if (v === 2) {
    collect[i] = 0; remaining--;
    state.score += 50;
    updateScoreUI();
    triggerFrightened();
    playPowerTone();
    checkExtraLife();
  }
  if (remaining <= 0 && !state.transitioning) levelComplete();
}

function checkExtraLife() {
  if (!state.extraLifeAwarded && state.score >= cfg.extraLifeScore) {
    state.extraLifeAwarded = true;
    state.lives++;
    renderLives();
    flashToast(t("extraLifeToast"));
    playExtraLifeChime();
  }
}

function triggerFrightened() {
  state.ghostEatStreak = 0;
  state.frightenedTimer = cfg.frightenedMs;
  ghosts.forEach((g) => {
    if (g.state === "scatter" || g.state === "chase" || g.state === "frightened") {
      if (g.state !== "frightened") g.dir = { x: -g.dir.x, y: -g.dir.y };
      g.state = "frightened";
    }
  });
}

function eatGhost(g) {
  state.ghostEatStreak++;
  const value = [200, 400, 800, 1600][Math.min(state.ghostEatStreak - 1, 3)];
  state.score += value;
  updateScoreUI();
  flashToast(t("ghostEatToast", value));
  g.state = "eaten";
  playEatGhostTone();
  checkExtraLife();
}

function startDeathSequence() {
  state.dying = true;
  state.dyingTimer = 0;
  state.transitioning = true;
  pacman.dir = { x: 0, y: 0 };
  pacman.queuedDir = { x: 0, y: 0 };
  playDeathSequence();
  spawnExplosion(pacman.x + CELL / 2, pacman.y + CELL / 2, "#ffd400", 22);
  gameCard.classList.add("shake");
  setTimeout(() => gameCard.classList.remove("shake"), 400);
}

function finishDeathSequence() {
  state.dying = false;
  state.lives--;
  renderLives();
  if (state.lives <= 0) {
    state.transitioning = false;
    endGame();
    return;
  }
  respawnPositions();
  flashToast(t("lifeLostToast"));
  setTimeout(() => {
    state.transitioning = false;
    state.invulnerableTimer = 1600;
  }, READY_PAUSE_MS);
}

function respawnPositions() {
  pacman.col = PAC_HOME.col; pacman.row = PAC_HOME.row;
  pacman.x = PAC_HOME.col * CELL; pacman.y = PAC_HOME.row * CELL;
  pacman.dir = { x: 0, y: 0 }; pacman.queuedDir = { x: 0, y: 0 };
  heldDirs.length = 0;
  ghosts.forEach((g, i) => {
    g.col = g.home.col; g.row = g.home.row;
    g.x = g.home.col * CELL; g.y = g.home.row * CELL;
    g.dir = { x: 0, y: 0 };
    g.state = "house";
    g.houseTimer = 0;
    g.releaseDelay = cfg.releaseDelays[i];
  });
  state.frightenedTimer = 0;
}

function levelComplete() {
  state.transitioning = true;
  flashToast(t("levelClear", state.level));
  playLevelClearFanfare();
  setTimeout(() => {
    state.level++;
    updateLevelUI();
    resetCollectibles();
    respawnPositions();
    state.transitioning = false;
    flashToast(t("levelIncoming", state.level));
  }, 1600);
}

function endGame() {
  state.over = true;
  state.running = false;
  const best = parseInt(localStorage.getItem(bestKey(state.difficulty)) || "0", 10);
  let isNewBest = false;
  if (state.score > best) {
    localStorage.setItem(bestKey(state.difficulty), String(state.score));
    isNewBest = true;
  }
  modalIcon.textContent = "👻";
  modalTitle.textContent = t("loseTitle");
  modalText.textContent = t("textCaught", state.level);
  if (isNewBest) spawnConfetti();
  modalStats.innerHTML = `
    <div class="m-stat">
      <span class="m-stat-value">${state.score}</span>
      <span class="m-stat-label">${t("statScore")}</span>
    </div>
    <div class="m-stat">
      <span class="m-stat-value">${state.level}</span>
      <span class="m-stat-label">${t("statLevel")}</span>
    </div>
    <div class="m-stat">
      <span class="m-stat-value">${isNewBest ? t("newBest") : best}</span>
      <span class="m-stat-label">${t("statBest")}</span>
    </div>
  `;
  updateBestDisplay();
  openModal();
}

/* ==================== Particles ==================== */
function spawnExplosion(x, y, color, count = 14) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 160;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 350 + Math.random() * 250,
      color,
      size: 2 + Math.random() * 2.5,
    });
  }
}
function updateParticles(dt) {
  particles = particles.filter((p) => {
    p.life += dt;
    p.x += p.vx * (dt / 1000);
    p.y += p.vy * (dt / 1000);
    p.vy += 60 * (dt / 1000);
    return p.life < p.maxLife;
  });
}

/* ==================== Phase / frightened timers ==================== */
function updatePhase(dt) {
  state.phaseTimer += dt;
  const phase = PHASES[state.phaseIndex];
  if (state.phaseTimer >= phase.dur && state.phaseIndex < PHASES.length - 1) {
    state.phaseIndex++;
    state.phaseTimer = 0;
    ghosts.forEach((g) => {
      if (g.state === "scatter" || g.state === "chase") {
        g.dir = { x: -g.dir.x, y: -g.dir.y };
        g.state = currentPhaseMode();
      }
    });
  }
}

function updateFrightened(dt) {
  if (state.frightenedTimer > 0) {
    state.frightenedTimer -= dt;
    if (state.frightenedTimer <= 0) {
      state.frightenedTimer = 0;
      ghosts.forEach((g) => { if (g.state === "frightened") g.state = currentPhaseMode(); });
    }
  }
}

/* ==================== Collisions ==================== */
function checkGhostCollisions() {
  for (const g of ghosts) {
    if (g.state === "house") continue;
    const dist = Math.hypot(g.x - pacman.x, g.y - pacman.y);
    if (dist < CELL * 0.55) {
      if (g.state === "frightened") { eatGhost(g); }
      else if (g.state !== "eaten") {
        if (state.invulnerableTimer > 0) continue;
        startDeathSequence();
        break;
      }
    }
  }
}

/* ==================== Game setup ==================== */
function newGame(difficulty = state.difficulty) {
  cfg = DIFFICULTIES[difficulty];
  state.difficulty = difficulty;
  state.score = 0;
  state.level = 1;
  state.lives = cfg.lives;
  state.running = false;
  state.paused = false;
  state.over = false;
  state.transitioning = false;
  state.invulnerableTimer = 0;
  state.frightenedTimer = 0;
  state.ghostEatStreak = 0;
  state.extraLifeAwarded = false;
  state.phaseIndex = 0;
  state.phaseTimer = 0;
  particles = [];

  resetCollectibles();
  pacman = makePacman();
  ghosts = buildGhosts();

  updateScoreUI();
  updateLevelUI();
  renderLives();
  updateBestDisplay();
  closeModal();
  showStartOverlay();
  console.log(`%c🟡 [dev] novo jogo — dificuldade: ${difficulty}`, "color:#ffd400;font-weight:bold");
}

/* ==================== Intro splash ==================== */
const INTRO_DURATION = 3200;
let introOpen = true;
let introTimer = null;
const introOverlay = el("intro-overlay");
const introProgressFill = el("intro-progress-fill");

function startIntroTimer() {
  introProgressFill.classList.add("is-running");
  introTimer = setTimeout(closeIntro, INTRO_DURATION);
}
function closeIntro() {
  if (!introOpen) return;
  introOpen = false;
  clearTimeout(introTimer);
  introOverlay.classList.remove("is-open");
  ensureAudio();
  playTone(440, 0.07);
}
el("intro-play").addEventListener("click", closeIntro);
introOverlay.addEventListener("click", (e) => { if (e.target === introOverlay) closeIntro(); });
startIntroTimer();

/* ==================== Input ==================== */
function showStartOverlay() {
  startOverlay.classList.remove("is-hidden");
  pauseOverlay.classList.add("is-hidden");
}
function hideStartOverlay() { startOverlay.classList.add("is-hidden"); }

function tryStart() {
  if (state.over) return;
  if (!state.running) {
    state.running = true;
    hideStartOverlay();
    ensureAudio();
  } else if (state.paused) {
    resumeGame();
  }
}
function pauseGame() {
  if (!state.running || state.over) return;
  state.paused = true;
  pauseOverlay.classList.remove("is-hidden");
}
function resumeGame() {
  state.paused = false;
  pauseOverlay.classList.add("is-hidden");
}
function togglePause() {
  if (!state.running || state.over) return;
  if (state.paused) resumeGame(); else pauseGame();
}

// Tracks which direction keys/buttons are currently held, in press order,
// so releasing the most recent one correctly falls back to whichever
// direction is still held — and so the OS's key-repeat on a held key can
// never clobber a turn that was just queued for a different direction.
const heldDirs = [];

function pressDir(id, x, y) {
  if (!heldDirs.some((h) => h.id === id)) heldDirs.push({ id, x, y });
  pacman.queuedDir = { x, y };
  tryStart();
}

function releaseDir(id) {
  const idx = heldDirs.findIndex((h) => h.id === id);
  if (idx !== -1) heldDirs.splice(idx, 1);
  if (heldDirs.length > 0) {
    const last = heldDirs[heldDirs.length - 1];
    pacman.queuedDir = { x: last.x, y: last.y };
  }
}

const DIR_KEYS = {
  ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
};

document.addEventListener("keydown", (e) => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "a", "d", "A", "D", "w", "W", "s", "S", "p", "P"].includes(e.key)) {
    e.preventDefault();
  }
  if (introOpen) {
    if (e.key === " " || e.key === "Enter") closeIntro();
    return;
  }
  const dir = DIR_KEYS[e.key];
  // ignore the browser's auto-repeat keydowns for a key that's already held,
  // so holding one direction can't keep re-asserting itself over a new turn
  if (dir && !e.repeat) pressDir(e.key, dir.x, dir.y);
  else if (e.key === " ") tryStart();
  if (e.key === "p" || e.key === "P" || e.key === "Escape") togglePause();
});

document.addEventListener("keyup", (e) => {
  if (DIR_KEYS[e.key]) releaseDir(e.key);
});

startOverlay.addEventListener("click", tryStart);
pauseOverlay.addEventListener("click", resumeGame);

function bindDpad(button, dx, dy, id) {
  const down = (e) => { e.preventDefault(); button.classList.add("is-pressed"); pressDir(id, dx, dy); };
  const up = (e) => { if (e) e.preventDefault(); button.classList.remove("is-pressed"); releaseDir(id); };
  button.addEventListener("pointerdown", down);
  button.addEventListener("pointerup", up);
  button.addEventListener("pointerleave", up);
  button.addEventListener("pointercancel", up);
}
bindDpad(el("btn-up"), 0, -1, "touch-up");
bindDpad(el("btn-down"), 0, 1, "touch-down");
bindDpad(el("btn-left"), -1, 0, "touch-left");
bindDpad(el("btn-right"), 1, 0, "touch-right");
el("btn-pause").addEventListener("click", (e) => { e.preventDefault(); togglePause(); });

/* ==================== Update loop ==================== */
function update(dt) {
  if (state.paused || state.over) return;

  if (state.dying) {
    state.dyingTimer += dt;
    updateParticles(dt);
    if (state.dyingTimer >= DEATH_ANIM_MS) finishDeathSequence();
    return;
  }

  if (!state.running || state.transitioning) {
    updateParticles(dt);
    return;
  }

  stepEntity(pacman, BASE_PAC_SPEED, dt, pickPacDir, handleDotConsumption);
  pacman.mouthPhase += (pacman.dir.x || pacman.dir.y) ? dt * 0.012 : 0;

  ghosts.forEach((g) => updateGhost(g, dt));

  updatePhase(dt);
  updateFrightened(dt);
  updateParticles(dt);
  if (state.invulnerableTimer > 0) state.invulnerableTimer -= dt;

  checkGhostCollisions();
}

/* ==================== Draw ==================== */
function drawMaze() {
  ctx.fillStyle = "#010102";
  ctx.fillRect(0, 0, CW, CH);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = MAZE[idx(c, r)];
      if (v === 1) {
        const x = c * CELL, y = r * CELL;
        ctx.save();
        ctx.shadowColor = "rgba(60, 110, 255, 0.55)";
        ctx.shadowBlur = 5;
        ctx.fillStyle = "#152048";
        roundRect(ctx, x + 1.2, y + 1.2, CELL - 2.4, CELL - 2.4, 4);
        ctx.fill();
        ctx.strokeStyle = "#4d78ff";
        ctx.lineWidth = 1.3;
        roundRect(ctx, x + 1.2, y + 1.2, CELL - 2.4, CELL - 2.4, 4);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  const pulse = 0.75 + Math.sin(performance.now() / 220) * 0.25;
  for (let i = 0; i < collect.length; i++) {
    const v = collect[i];
    if (!v) continue;
    const c = i % COLS, r = Math.floor(i / COLS);
    const cx = c * CELL + CELL / 2, cy = r * CELL + CELL / 2;
    ctx.save();
    if (v === 1) {
      ctx.fillStyle = "#ffe28a";
      ctx.shadowColor = "rgba(255, 212, 0, 0.6)";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.1, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#ffe28a";
      ctx.shadowColor = "rgba(255, 212, 0, 0.85)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5 * pulse + 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function drawPacman() {
  const blinking = state.invulnerableTimer > 0 && Math.floor(performance.now() / 100) % 2 === 0;
  if (blinking) return;
  const cx = pacman.x + CELL / 2, cy = pacman.y + CELL / 2;
  const r = CELL * 0.46;
  const dir = (pacman.dir.x || pacman.dir.y) ? pacman.dir : pacman.lastDir;
  const angle = Math.atan2(dir.y, dir.x);
  const mouth = Math.abs(Math.sin(pacman.mouthPhase)) * 0.26 * Math.PI + 0.02;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r, mouth, Math.PI * 2 - mouth);
  ctx.closePath();
  ctx.fillStyle = "#ffd400";
  ctx.shadowColor = "rgba(255, 212, 0, 0.75)";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();
}

function drawPacmanDying() {
  const cx = pacman.x + CELL / 2, cy = pacman.y + CELL / 2;
  const progress = Math.min(1, state.dyingTimer / DEATH_ANIM_MS);
  const r = CELL * 0.46 * (1 - Math.max(0, progress - 0.75) / 0.25);
  const mouth = progress * Math.PI * 0.97;
  const spin = progress * Math.PI * 1.4;
  ctx.save();
  ctx.globalAlpha = 1 - Math.max(0, progress - 0.8) / 0.2;
  ctx.translate(cx, cy);
  ctx.rotate(spin);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, Math.max(0, r), mouth, Math.PI * 2 - mouth);
  ctx.closePath();
  ctx.fillStyle = "#ffd400";
  ctx.shadowColor = "rgba(255, 212, 0, 0.75)";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();
}

function drawGhostShape(x, y, size, color) {
  const r = size / 2;
  ctx.beginPath();
  ctx.moveTo(x - r, y + r * 0.9);
  ctx.arc(x, y, r, Math.PI, 0, false);
  const waves = 4;
  const waveW = (2 * r) / waves;
  ctx.lineTo(x + r, y + r * 0.9);
  for (let i = 0; i < waves; i++) {
    const sx = x + r - waveW * i;
    const mx = sx - waveW / 2;
    const ex = sx - waveW;
    const dip = i % 2 === 0 ? r * 0.55 : r * 0.9;
    ctx.quadraticCurveTo(mx, y + dip, ex, y + r * 0.9);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawEyes(x, y, size, dir) {
  const r = size * 0.15;
  const offsetX = size * 0.19, offsetY = -size * 0.08;
  [-1, 1].forEach((s) => {
    const ex = x + s * offsetX, ey = y + offsetY;
    ctx.beginPath();
    ctx.fillStyle = "#f4f8ff";
    ctx.arc(ex, ey, r, 0, Math.PI * 2);
    ctx.fill();
    const px = ex + dir.x * r * 0.55, py = ey + dir.y * r * 0.55;
    ctx.beginPath();
    ctx.fillStyle = "#141428";
    ctx.arc(px, py, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawGhost(g) {
  const cx = g.x + CELL / 2, cy = g.y + CELL / 2;
  const size = CELL * 1.05;
  const dir = (g.dir.x || g.dir.y) ? g.dir : { x: 0, y: 1 };
  if (g.state === "eaten") {
    drawEyes(cx, cy, size, dir);
    return;
  }
  let color = g.color;
  if (g.state === "frightened") {
    const flashing = state.frightenedTimer < 2000 && Math.floor(performance.now() / 150) % 2 === 0;
    color = flashing ? "#eef2ff" : "#2b3fe0";
  }
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  drawGhostShape(cx, cy, size, color);
  ctx.restore();
  if (g.state === "frightened") {
    ctx.save();
    ctx.strokeStyle = "#eef2ff";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx - size * 0.16, cy + size * 0.05, size * 0.07, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.16, cy + size * 0.05, size * 0.07, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else {
    drawEyes(cx, cy, size, dir);
  }
}

function draw() {
  drawMaze();
  if (state.dying) {
    drawPacmanDying();
  } else {
    ghosts.forEach(drawGhost);
    drawPacman();
  }
  particles.forEach((p) => {
    const alpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  });
  ctx.globalAlpha = 1;
}

/* ==================== Main loop ==================== */
let lastTime = 0;
function loop(ts) {
  const dt = Math.min(40, ts - lastTime || 16);
  lastTime = ts;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

/* ==================== Modal ==================== */
el("modal-replay").addEventListener("click", () => newGame());
el("modal-close").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
function openModal() { modalOverlay.classList.add("is-open"); }
function closeModal() { modalOverlay.classList.remove("is-open"); }

gameCard.addEventListener("pointermove", (e) => {
  const rect = gameCard.getBoundingClientRect();
  gameCard.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
  gameCard.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
});

/* ==================== Confetti ==================== */
const confettiCanvas = el("confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiParticles = [];
let confettiRAF = null;

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

function spawnConfetti() {
  const colors = ["#ffd400", "#ffe873", "#33e0ff", "#ff8fd0", "#ff2e6c", "#ffb347"];
  confettiParticles = Array.from({ length: 130 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height * 0.5,
    size: 5 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    life: 0,
  }));
  if (!confettiRAF) confettiTick();
}

function confettiTick() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  let alive = false;
  confettiParticles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;
    p.life++;
    if (p.y < confettiCanvas.height + 20 && p.life < 420) alive = true;
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    confettiCtx.restore();
  });
  if (alive) {
    confettiRAF = requestAnimationFrame(confettiTick);
  } else {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiRAF = null;
  }
}

/* ==================== Ambient background ==================== */
const bgCanvas = el("bg-canvas");
const bgCtx = bgCanvas.getContext("2d");
let motes = [];

function resizeBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeBgCanvas);
resizeBgCanvas();

function initMotes() {
  const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 15000));
  motes = Array.from({ length: count }, () => ({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    r: 0.6 + Math.random() * 1.8,
    speed: 0.05 + Math.random() * 0.18,
    twinkle: Math.random() * Math.PI * 2,
  }));
}
initMotes();
window.addEventListener("resize", initMotes);

function bgTick() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  const g1 = bgCtx.createRadialGradient(
    bgCanvas.width * 0.15, bgCanvas.height * 0.1, 0,
    bgCanvas.width * 0.15, bgCanvas.height * 0.1, bgCanvas.width * 0.5
  );
  g1.addColorStop(0, "rgba(255,212,0,0.07)");
  g1.addColorStop(1, "rgba(255,212,0,0)");
  bgCtx.fillStyle = g1;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  const g2 = bgCtx.createRadialGradient(
    bgCanvas.width * 0.85, bgCanvas.height * 0.85, 0,
    bgCanvas.width * 0.85, bgCanvas.height * 0.85, bgCanvas.width * 0.5
  );
  g2.addColorStop(0, "rgba(51,224,255,0.06)");
  g2.addColorStop(1, "rgba(51,224,255,0)");
  bgCtx.fillStyle = g2;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  motes.forEach((s) => {
    s.y += s.speed;
    s.twinkle += 0.02;
    if (s.y > bgCanvas.height + 5) { s.y = -5; s.x = Math.random() * bgCanvas.width; }
    const alpha = 0.22 + Math.sin(s.twinkle) * 0.18;
    bgCtx.beginPath();
    bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(245,242,234,${Math.max(0.06, alpha)})`;
    bgCtx.fill();
  });

  requestAnimationFrame(bgTick);
}
bgTick();

/* ==================== Init ==================== */
el("sound-icon").textContent = state.soundOn ? "🔊" : "🔇";
applyTranslations();
newGame(state.difficulty);
requestAnimationFrame(loop);
