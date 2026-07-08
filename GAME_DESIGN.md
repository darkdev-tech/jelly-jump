# Jelly Jump - Game Design Document

## Overview
Jelly Jump is a production-ready HTML5 Match-3 puzzle game featuring 20 challenging levels, comprehensive UI systems, save functionality, and social features like leaderboards and daily rewards.

## Level Descriptions

### Tutorial Levels (1-2)
- **Level 1**: First Steps - Learn basic matching
- **Level 2**: Getting Started - Practice swaps

### Beginner Levels (3-6)
- **Level 3**: Blue Collector - Collect specific colors
- **Level 4**: Green Harvest - More collection challenges
- **Level 5**: Ice Breaker - Introduce obstacles (ice)
- **Level 6**: Crate Crusher - New obstacle type (crates)

### Intermediate Levels (7-10)
- **Level 7**: High Score Challenge - Score focus
- **Level 8**: Rainbow Hunter - Rare jellies
- **Level 9**: Chain Breaker - Chain obstacles
- **Level 10**: Mini Boss - First boss challenge

### Advanced Levels (11-15)
- **Level 11**: Purple Master - Color mastery
- **Level 12**: Limited Moves - Tight move limit (10 moves)
- **Level 13**: Bomb Countdown - Time-based obstacles
- **Level 14**: Moving Blocks - Dynamic obstacles
- **Level 15**: Treasure Hunt - Hidden objectives

### Expert Levels (16-20)
- **Level 16**: Crystal Crusher - Tough obstacles
- **Level 17**: Double Objective - Two simultaneous goals
- **Level 18**: Time Challenge - Extreme time pressure
- **Level 19**: Master Puzzle - Complex board layout
- **Level 20**: Final Temple - Ultimate boss battle

## Game Mechanics

### Core Systems
1. **Board System**: 8x8 grid of jellies
2. **Match Detection**: Horizontal and vertical 3+ matches
3. **Cascade System**: Automatic falling and refilling
4. **Combo System**: Chain matches for multiplier bonus
5. **Scoring**: Base 100 points, multiplied by match type and combo

### Save System
- LocalStorage-based persistent save
- Auto-save after each level
- Player stats tracking
- Leaderboard data
- Settings preservation

### UI Flow
```
Loading Screen
    ↓
Main Menu
    ├→ Play → Level Select → Gameplay
    ├→ Levels → Level Select
    ├→ Leaderboard
    ├→ Daily Reward
    ├→ Shop
    ├→ Profile
    ├→ Settings
    └→ About

During Gameplay:
    Pause Menu (Resume/Restart/Settings/Quit)
    Game Over Screen (Retry/Menu)
    Win Screen (Next/Menu)
```

## Scoring System

- **Match 3**: 300 points (1x multiplier)
- **Match 4**: 450 points (1.5x multiplier)
- **Match 5+**: 600+ points (2x multiplier)
- **Combos**: Each cascade adds 10% bonus
- **Star Thresholds**: Based on target score (1-3 stars)

## Achievements (15 Total)

1. First Match - Make first match
2. Match Master - 100 matches
3. Combo Master - 10+ combo
4. Score 1000 - Reach 1000 points
5. Score 5000 - Reach 5000 points
6. Score 10000 - Reach 10000 points
7. Perfect Level - 3 stars
8. All Stars - 3 stars on all levels
9. Treasure Hunter - Find treasures
10. Jelly King - Complete level 20
11. Daily Player - 7-day streak
12. Shop Lover - Buy 10 items
13. Collector - Collect 500 jellies
14. Millionaire - Earn 1M coins
15. Speed Master - Complete level < 30s

## Expansion Roadmap

### Phase 1: Polish (Current)
- ✅ 20 levels
- ✅ Core mechanics
- ✅ Save system
- ✅ UI/UX

### Phase 2: Audio
- Background music
- SFX for matches
- Victory/defeat sounds
- UI click sounds

### Phase 3: Polish
- Particle effects
- Screen shake
- Combo animations
- Jelly animations

### Phase 4: Social
- Cloud saves
- Online leaderboard
- Friend challenges
- Social sharing

### Phase 5: Content
- More levels (40-100)
- Seasonal events
- Special power-ups
- Daily challenges

## Technical Stack

- **Framework**: Phaser 3.55+
- **Language**: JavaScript (ES6 modules)
- **Storage**: LocalStorage API
- **Rendering**: WebGL/Canvas
- **Target FPS**: 60 FPS
- **Resolution**: 1080x1920 (mobile-first)

## Performance Targets

- Load time: < 3 seconds
- Frame rate: Consistent 60 FPS
- Memory: < 100MB
- Mobile support: Mid-range devices (2GB RAM+)
- Browser support: All modern browsers

---

**Status**: Production Ready ✅
