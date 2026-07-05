# 🟡 Pac-Man HD — Run, Chase, Eat It All

> A polished, animated remake of the 1980 arcade classic — a glowing neon maze, four ghosts with real personalities, and a chase that never lets up.

**🎮 [Live Demo](https://vidipt89.github.io/pacmanHD/)**

"Pac-Man" is a browser-based maze-chase built with vanilla HTML, CSS and JavaScript — no frameworks, no build step, no game engine. Guide Pac-Man through a 28×28 neon-glowing maze, gobble every dot and power pellet, and outrun four ghosts before they corner you. Each ghost hunts differently — Blinky chases directly, Pinky ambushes ahead of you, Inky flanks unpredictably, and Clyde loses interest up close — and a power pellet flips the hunt for a few precious seconds, turning every ghost into prey.

## 📦 What's Inside

- 🧩 A full 28×28 classic-style maze rendered on canvas with glowing walls, pulsing pac-dots and animated power pellets
- 🟡 Smooth, continuously-animated Pac-Man movement (not grid-snapped) with a rotating, chomping mouth that follows the travel direction
- 👻 Four ghosts — Blinky, Pinky, Inky, Clyde — each with authentic chase logic (direct pursuit, ambush, flank, and distance-based shyness) plus scatter/chase phases that alternate over time
- 😱 Power pellets trigger a frightened state — ghosts turn blue and flee, with an escalating 200 → 400 → 800 → 1600 combo for eating them in a row
- 👀 Eaten ghosts race home as a pair of eyes and re-emerge from the ghost house after a short respawn
- 🌀 Classic tunnel wraparound on the side corridor, exactly like the arcade original
- ♾️ Endless level progression — clear the maze and the next one begins with faster ghosts, same lives and score
- 🎯 Three difficulty levels — Easy (4 lives), Normal (3 lives), Hard (2 lives) — each tuning ghost speed, frightened duration and release timing
- 🏆 Best score tracked per difficulty, saved locally, with a "new record" callout and confetti burst on game over
- 🔊 Fully synthesized retro sound effects via the Web Audio API — chomping, power-up siren, ghost-eaten blips, death sequence, level fanfare — no audio files
- 🇵🇹 🇬🇧 One-click language toggle between European Portuguese and English, remembered between visits
- ⌨️ 📱 Full keyboard support (arrows/WASD) plus a touch-friendly on-screen D-pad with a dedicated pause button
- ⏸️ Pause/resume at any time, with a dimmed overlay and its own translated hint text
- 🎬 An animated intro splash on load that auto-dismisses into the game, crediting the developer
- 🌌 Animated ambient background rendered on a dedicated canvas, independent of the game screen
- 🖥️ CRT-style scanline overlay and neon glow styling for an authentic arcade-cabinet feel

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🏗️ Project Structure

```
pacmanHD/
├── index.html      # Page structure, difficulty picker, game card, canvas, HUD, modal
├── style.css       # Theme, layout, CRT/scanline effects, responsive rules
├── script.js       # Maze, movement engine, ghost AI, i18n, sound and rendering
├── LICENSE         # MIT License
└── README.md
```

## ⚙️ Game Mechanics

```
New Game (per difficulty):
  lives, ghost speed multiplier, frightened duration = difficulty preset
  maze dots and pellets fully restocked, score = 0, level = 1

Each Frame:
  1. Move Pac-Man along the grid, turning at tile centers when a direction is queued
  2. Move each ghost according to its current state:
       house      → bobs in the ghost house until its release timer fires
       leaving    → paths to the door and out into the maze
       scatter    → retreats toward its own maze corner
       chase      → hunts Pac-Man using its own personality logic
       frightened → flees on random turns while power pellet is active
       eaten      → races home as eyes, then re-enters the house
  3. Eating a dot scores 10pts; a power pellet scores 50pts and frightens every active ghost
  4. Colliding with a frightened ghost eats it (200/400/800/1600 combo); colliding with
     a normal ghost costs a life, unless Pac-Man just respawned (brief invulnerability)
  5. Maze fully cleared → next level, faster ghosts, dots and pellets reset
  6. Lives exhausted → game over, compare score to the saved per-difficulty best
```

## 👻 Ghost Personalities

```
Blinky (red)   — always targets Pac-Man's current tile: a direct, relentless chase
Pinky  (pink)  — targets four tiles ahead of Pac-Man's facing direction: an ambusher
Inky   (cyan)  — targets a point mirrored through Blinky's position: an unpredictable flanker
Clyde  (orange)— chases directly when far away, but retreats to his corner up close
```

## 🚀 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/VidiPT89/pacmanHD.git

# 2. Open index.html in your browser
cd pacmanHD
open index.html    # macOS
# or: start index.html (Windows) / xdg-open index.html (Linux)

# 3. Pick a difficulty, press Space (or tap the maze) and start chomping
```

No build step, no dependencies — it's static HTML/CSS/JS and can also be served with any static file server (e.g. `python3 -m http.server`).

## 📝 Notes

- This is the "HD" remake of [pacman](https://github.com/VidiPT89/pacman), the original minimal DOM-based version of the game — same core idea (eat dots, dodge ghosts, chase power pellets), rebuilt from scratch on canvas with smooth movement, real ghost AI and extra mechanics
- The original's grid-snapped DOM elements and single random-walk ghost behavior were replaced with a canvas renderer, continuous movement, and four ghosts with distinct chase personalities
- Language, sound and best-score preferences are stored in `localStorage`, so they persist between visits
- `prefers-reduced-motion` is respected across the interface's decorative animations

---

Developed by **David Arsénio Martins** — *"Vidi"*
