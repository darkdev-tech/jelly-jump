# 🍬 JELLY JUMP - Production-Ready HTML5 Match-3 Game

**Developed by SMILEY STUDIO GAMES**

Jelly Jump is a fully functional, production-ready HTML5 Match-3 puzzle game built with Phaser 3, featuring 20 challenging levels, a complete UI system, leaderboard, shop, daily rewards, achievements, and more.

## Features

### ✨ Core Gameplay
- **Match-3 Mechanics**: Swap adjacent jellies to make matches
- **Match Types**: Support for 3, 4, 5, L-shape, T-shape, and cross-shaped matches
- **Cascading Matches**: Automatic cascades when pieces fall into place
- **20 Fully Playable Levels**: Progressive difficulty with unique objectives
- **Smooth Animations**: 60 FPS gameplay with polished animations

### 🎮 Game Systems
- **Level Select**: Browse all 20 levels with star ratings and best scores
- **Star Rating System**: 1-3 stars based on performance
- **Save System**: Auto-save progress using Local Storage
- **Leaderboard**: Compete locally with top scores
- **Daily Rewards**: Claim rewards every 24 hours with streak tracking
- **Shop**: Purchase boosters, lives, coins, and cosmetics
- **Achievements**: 15+ achievements to unlock

### 🧩 Jelly Types
- Red Jelly 🔴
- Blue Jelly 🔵
- Green Jelly 💚
- Yellow Jelly 💛
- Purple Jelly 💜
- Orange Jelly 🧡

### 🎯 Level Objectives
- Score targets
- Collect specific jellies
- Break ice blocks
- Destroy crates
- Defuse bombs
- Break chains
- And more!

### 📱 Responsive Design
- Optimized for mobile (iOS/Android)
- Tablet and desktop support
- Portrait and landscape modes
- Touch-optimized controls

### ⚙️ Settings
- Music volume control
- Sound effects toggle
- Graphics quality settings
- Language selection
- Dark mode toggle
- Notification settings
- Reset progress option

## Project Structure

```
jelly-jump/
├── index.html              # Main HTML file
├── style.css              # Global styles
├── main.js                # Entry point & Phaser config
├── config.js              # Game configuration
├── save/
│   └── SaveManager.js     # Local storage management
├── scenes/
│   ├── LoadingScene.js    # Splash/loading screen
│   ├── MainMenuScene.js   # Main menu
│   ├── GameplayScene.js   # Gameplay logic
│   ├── LevelSelectScene.js # Level selection
│   ├── LeaderboardScene.js # Leaderboard display
│   ├── ShopScene.js       # Shop interface
│   ├── ProfileScene.js    # Player profile
│   ├── SettingsScene.js   # Settings menu
│   ├── PauseScene.js      # Pause menu
│   ├── GameOverScene.js   # Game over screen
│   ├── WinScene.js        # Victory screen
│   ├── DailyRewardScene.js # Daily rewards
│   └── AboutScene.js      # About screen
├── gameplay/
│   ├── Board.js           # Game board logic
│   └── ScoreManager.js    # Score calculation
└── levels/
    └── Levels.js          # Level definitions
```

## Installation

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build process required!

### Setup

1. Clone the repository:
```bash
git clone https://github.com/darkdev-tech/jelly-jump.git
cd jelly-jump
```

2. Serve the files with a local web server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## How to Play

### Basic Controls
- **Click/Tap** on a jelly to select it
- **Click/Tap** on an adjacent jelly to swap
- Make matches of 3 or more jellies
- Complete level objectives within the move limit

### Objective Types
1. **Score Target**: Reach the required points
2. **Collect Jellies**: Gather a specific number of colored jellies
3. **Break Obstacles**: Destroy ice, crates, chains, or crystals
4. **Boss Battles**: Defeat special challenge levels

### Star Ratings
- ⭐ Bronze (1 Star): Complete the level
- ⭐⭐ Silver (2 Stars): Reach target score
- ⭐⭐⭐ Gold (3 Stars): Exceed target score by 50%

## Game Data Structure

### Player Data (Saved)
```javascript
{
  name: "Player",
  coins: 5000,
  gems: 100,
  totalScore: 0,
  gamesPlayed: 0,
  bestCombo: 0,
  lives: 5,
  boosters: {
    hammer: 0,
    shuffle: 0,
    extraMoves: 0,
    rainbowBomb: 0,
    colorBlast: 0,
    freezeTime: 0
  }
}
```

### Level Data (Saved)
```javascript
{
  completed: true,
  unlocked: true,
  bestScore: 1500,
  stars: 3,
  attempts: 2
}
```

### Settings (Saved)
```javascript
{
  musicVolume: 0.7,
  soundVolume: 0.8,
  language: "en",
  graphicsQuality: "high",
  fullscreen: false,
  darkMode: true,
  notifications: true
}
```

## API Reference

### SaveManager

```javascript
// Get player data
const playerData = SaveManager.getPlayerData();

// Update player data
SaveManager.updatePlayerData({ coins: 5000, lives: 10 });

// Get level data
const levelData = SaveManager.getLevelData();

// Update specific level
SaveManager.updateLevelData(1, { stars: 3, completed: true });

// Get settings
const settings = SaveManager.getSettings();

// Update settings
SaveManager.updateSettings({ musicVolume: 0.8, darkMode: false });

// Leaderboard operations
const leaderboard = SaveManager.getLeaderboard();
SaveManager.addToLeaderboard({
  name: "Player",
  score: 5000,
  stars: 3,
  level: 1
});

// Daily rewards
const canClaim = SaveManager.canClaimDailyReward();
SaveManager.setDailyRewardClaimed();

// Reset all progress
SaveManager.resetProgress();
```

## Configuration

### Game Settings (config.js)

```javascript
GAME_CONFIG = {
  WIDTH: 1080,              // Game width
  HEIGHT: 1920,             // Game height
  BOARD_SIZE: 8,            // 8x8 grid
  TILE_SIZE: 100,           // Tile size in pixels
  MIN_MATCH: 3,             // Minimum match
  FPS: 60,                  // Target FPS
  ANIMATION_DURATION: 300,  // Animation speed (ms)
  BASE_SCORE: 100           // Base points per match
}
```

## Performance

- **Target**: 60 FPS consistent gameplay
- **Optimization**: Optimized rendering and object pooling
- **Mobile**: Smooth performance on mid-range devices
- **Load Time**: < 3 seconds on 4G

## Browser Support

- ✅ Chrome/Chromium (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Customization

### Adding New Levels

```javascript
// In levels/Levels.js
export const LEVELS = {
  21: {
    id: 21,
    name: 'New Level',
    targetScore: 10000,
    moves: 20,
    objective: 'Reach 10000 points',
    difficulty: 'Hard',
    boardLayout: 'standard',
    description: 'Your custom level!'
  }
};
```

### Modifying Colors

```javascript
// In config.js
export const JELLY_COLORS = [
  { color: 0xFF6B6B, name: 'Red', emoji: '🔴' },
  // ... customize as needed
];
```

### Adjusting Difficulty

```javascript
// Modify in Levels.js
const level = {
  moves: 15,        // Reduce for harder
  targetScore: 5000 // Increase for harder
};
```

## Future Enhancements

- 🎵 Sound effects and music
- 🎨 Special jelly animations
- 👥 Multiplayer/social features
- 🌐 Online leaderboards
- 🎁 Special events and seasons
- 🎨 Theme customization
- 🎯 More power-ups and boosters
- 📊 Advanced analytics

## Troubleshooting

### Game not loading?
- Check browser console for errors
- Ensure Phaser 3 CDN is accessible
- Try a different browser
- Clear cache and reload

### Save data lost?
- Check if localStorage is enabled
- Verify not in private/incognito mode
- Check browser storage quota

### Performance issues?
- Reduce graphics quality in settings
- Close other browser tabs
- Update to latest browser version
- Try a desktop browser for better performance

## Credits

**Developed by**: Dark Developer 🧑‍💻
**Engine**: Phaser 3
**Studio**: SMILEY STUDIO GAMES
**Year**: 2024

## License

This project is proprietary and developed for SMILEY STUDIO GAMES.

## Contact & Support

For issues, suggestions, or collaboration inquiries, please contact the development team.

---

**Thanks for playing JELLY JUMP! Enjoy the game! 🍬🎮**
