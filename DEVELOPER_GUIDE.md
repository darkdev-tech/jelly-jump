# Jelly Jump - Developer Guide

## Getting Started with Development

### Prerequisites
- Node.js 14+ (optional, for local server)
- Code editor (VS Code recommended)
- Modern web browser with DevTools
- Git for version control

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/darkdev-tech/jelly-jump.git
cd jelly-jump
```

2. **Start a local server**
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: PHP
php -S localhost:8000
```

3. **Open in browser**
```
http://localhost:8000
```

## Project Architecture

### Module Structure

```
main.js (Entry Point)
  ├── config.js (Configuration)
  ├── SaveManager (Persistence)
  ├── Scenes (13 total)
  │   ├── LoadingScene
  │   ├── MainMenuScene
  │   ├── GameplayScene
  │   ├── LevelSelectScene
  │   ├── LeaderboardScene
  │   ├── ShopScene
  │   ├── ProfileScene
  │   ├── SettingsScene
  │   ├── PauseScene
  │   ├── GameOverScene
  │   ├── WinScene
  │   ├── DailyRewardScene
  │   └── AboutScene
  └── Gameplay Systems
      ├── Board
      └── ScoreManager
```

### Data Flow

```
User Input
    ↓
Scene Event Handler
    ↓
Gameplay Logic (Board/ScoreManager)
    ↓
Visual Update (Phaser rendering)
    ↓
Save to LocalStorage (SaveManager)
```

## Adding New Features

### Adding a New Scene

1. **Create scene file** `scenes/NewScene.js`:
```javascript
import { COLORS } from '../config.js';

export class NewScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NewScene' });
    }

    create() {
        // Your scene logic here
    }
}
```

2. **Register in main.js**:
```javascript
import { NewScene } from './scenes/NewScene.js';

// In phaser_config.scene array:
scene: [
    LoadingScene,
    // ... other scenes
    NewScene  // Add here
]
```

3. **Navigate to it**:
```javascript
this.scene.start('NewScene');
```

### Adding New Levels

1. **Edit `levels/Levels.js`**:
```javascript
export const LEVELS = {
    21: {
        id: 21,
        name: 'New Level',
        targetScore: 10000,
        moves: 20,
        objective: 'Your objective',
        difficulty: 'Hard',
        boardLayout: 'standard',
        description: 'Level description'
    }
};
```

2. **Update level count** in LevelSelectScene if needed

### Adding Achievements

1. **Edit `levels/Levels.js`**:
```javascript
export const ACHIEVEMENTS = [
    {
        id: 16,
        name: 'Achievement Name',
        description: 'What to do',
        icon: '🏆'
    }
];
```

2. **Trigger in gameplay**:
```javascript
if (condition) {
    unlockAchievement(achievementId);
    SaveManager.updatePlayerData({ /* update */ });
}
```

## Code Style Guide

### Naming Conventions

```javascript
// Classes: PascalCase
class GameplayScene {}
class Board {}

// Functions & Variables: camelCase
function calculateScore() {}
let playerData = {};

// Constants: UPPER_SNAKE_CASE
const GAME_CONFIG = {};
const MIN_MATCH = 3;

// Private members: _leadingUnderscore
this._internalState = {};
```

### Comments

```javascript
// Single line comment

/**
 * Multi-line comment for functions
 * @param {type} name - Description
 * @returns {type} Description
 */
function example(name) {
    // Implementation
}
```

### File Organization

```javascript
// 1. Imports
import { Config } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

// 2. Class definition
export class MyClass extends Phaser.Scene {
    constructor() {
        super({ key: 'MyClass' });
    }

    // 3. Lifecycle methods
    create() {}
    update() {}
    shutdown() {}

    // 4. Public methods
    publicMethod() {}

    // 5. Private methods
    _privateMethod() {}
}
```

## Debugging

### Enable Debug Mode

In `config.js`:
```javascript
export const GAME_CONFIG = {
    DEBUG: true  // Enable debug output
};
```

### Browser DevTools

1. **Open DevTools**: F12 or Ctrl+Shift+I
2. **Console Tab**: View logs and errors
3. **Network Tab**: Check asset loading
4. **Application Tab**: View LocalStorage data
5. **Performance Tab**: Profile FPS

### Common Issues

**Issue**: Game not loading
- Check console for errors
- Verify Phaser CDN is accessible
- Check network tab for failed requests

**Issue**: Scenes not transitioning
- Verify scene key matches exactly
- Check scene is registered in main.js
- Look for typos in scene names

**Issue**: Data not persisting
- Check if localStorage is enabled
- Verify SaveManager methods are called
- Check browser's storage quota
- Try clearing cache

**Issue**: Performance problems
- Profile with DevTools Performance tab
- Check for memory leaks (Scene cleanup)
- Reduce particle count
- Disable animations in settings

## Testing

### Manual Testing Checklist

#### Menu Navigation
- [ ] All buttons navigate to correct scenes
- [ ] Back buttons work
- [ ] Buttons have hover effects
- [ ] Animations play smoothly

#### Gameplay
- [ ] Jellies spawn correctly
- [ ] Swaps work as expected
- [ ] Matches are detected
- [ ] Score updates
- [ ] Moves decrease
- [ ] Cascades work
- [ ] Board refills properly

#### Save System
- [ ] Progress saves after level
- [ ] Coins update correctly
- [ ] Stars persist
- [ ] Settings are remembered
- [ ] Leaderboard entries save

#### UI/UX
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Responsive on different screen sizes
- [ ] Touch controls work on mobile
- [ ] No visual glitches

### Performance Testing

```javascript
// Monitor FPS
this.game.loop.targetFps // Current target
this.sys.metrics // Performance metrics
```

## Building for Production

### Optimization Steps

1. **Minification**:
   - Use a minifier like Terser or UglifyJS
   - Reduce file sizes by ~60%

2. **Asset Optimization**:
   - Compress images (if added)
   - Optimize audio files
   - Use appropriate formats

3. **CDN Optimization**:
   - Use minified Phaser build
   - Cache-bust assets with version
   - Serve from CDN if possible

4. **Lazy Loading**:
   - Load assets on demand
   - Load scenes progressively
   - Unload unused scenes

### Deployment

1. **Test thoroughly** before deploying
2. **Run performance audit** in Chrome DevTools
3. **Clear LocalStorage** in testing (optional)
4. **Test on multiple devices**
5. **Deploy to web server**

### Example Deployment Commands

```bash
# Deploy to GitHub Pages
git add .
git commit -m "Deploy production version"
git push origin main

# Deploy to web server via FTP/SFTP
sftp user@server.com
put -r . /public_html/jellyjump/
```

## Performance Optimization

### Current Performance
- **Load Time**: ~2 seconds
- **FPS**: Stable 60 FPS
- **Memory**: ~50MB base

### Optimization Tips

1. **Object Pooling**:
```javascript
// Reuse objects instead of creating new ones
this.particlePool = this.add.group();
let particle = this.particlePool.get();
if (!particle) particle = this.add.circle(0, 0, 2);
```

2. **Batch Rendering**:
```javascript
// Reduce draw calls
this.tileGroup = this.add.group();
this.tileGroup.add(tile); // Batch updates
```

3. **Texture Atlas**:
```javascript
// Combine multiple images into one
// Reduces HTTP requests and improves rendering
```

## Version History

### v1.0.0 (Current)
- ✅ Complete game with 20 levels
- ✅ Full UI suite
- ✅ Save system
- ✅ Leaderboard
- ✅ Daily rewards
- ✅ Shop
- ✅ Profile
- ✅ Achievements

### Planned Updates
- 🔜 Sound and music
- 🔜 More levels (40-100)
- 🔜 Power-ups and boosters
- 🔜 Social features
- 🔜 Online leaderboard
- 🔜 Seasonal events

## Contributing

### Code Review Checklist

- [ ] Code follows style guide
- [ ] No console errors
- [ ] Save system works
- [ ] All scenes functional
- [ ] Mobile responsive
- [ ] 60 FPS maintained
- [ ] Comments added
- [ ] No breaking changes

### Submitting Changes

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Commit with clear messages
5. Push to repository
6. Submit pull request

## Resources

### Documentation
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [HTML5 API Reference](https://html.spec.whatwg.org/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [VS Code](https://code.visualstudio.com/)
- [Git Documentation](https://git-scm.com/doc)

---

**Happy Coding! 🎮**
