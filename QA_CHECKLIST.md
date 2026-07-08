# Jelly Jump - Quality Assurance Checklist

## Pre-Release QA Checklist

### 1. Functionality Testing

#### Loading Screen
- [ ] Splash screen displays
- [ ] Logo animates
- [ ] Loading bar progresses
- [ ] Status messages update
- [ ] Fade transition to menu works

#### Main Menu
- [ ] All 8 buttons present
- [ ] Buttons have hover effects
- [ ] Navigation works correctly
- [ ] Back buttons return to menu
- [ ] Animations are smooth
- [ ] Coin display shows correct value

#### Level Select
- [ ] All 20 levels display
- [ ] Locked levels show lock icon
- [ ] Star ratings display
- [ ] Best scores show
- [ ] Levels unlock progressively
- [ ] Clicking level starts game

#### Gameplay
- [ ] Board displays 8x8 grid
- [ ] Jellies spawn randomly
- [ ] No initial matches on board
- [ ] Selection highlights tile
- [ ] Swap works with adjacent tiles
- [ ] Match detection works (3+)
- [ ] Matched jellies disappear
- [ ] Score updates correctly
- [ ] Moves decrease on swap
- [ ] Jellies fall and cascade
- [ ] New jellies spawn
- [ ] Pause button works
- [ ] HUD shows level, score, moves
- [ ] Objectives track correctly

#### Pause Menu
- [ ] Overlay appears
- [ ] Resume returns to game
- [ ] Restart resets level
- [ ] Settings accessible
- [ ] Quit returns to menu

#### Game Over
- [ ] Appears when moves = 0
- [ ] Score displays
- [ ] Retry button works
- [ ] Menu button works
- [ ] Added to leaderboard

#### Win Screen
- [ ] Appears on level complete
- [ ] Stars display
- [ ] Score shows
- [ ] Coins earned calculated
- [ ] Next level unlocked
- [ ] Next button works
- [ ] Menu button works
- [ ] Coins added to account

#### Leaderboard
- [ ] Displays entries
- [ ] Sorted by score
- [ ] Shows rank, player, score, stars
- [ ] New entries appear
- [ ] Top 100 maintained

#### Shop
- [ ] All items display
- [ ] Prices show correctly
- [ ] Buy buttons work
- [ ] Currency deducted
- [ ] Items received
- [ ] Notification shows
- [ ] Insufficient funds handled
- [ ] Coin display updates

#### Daily Reward
- [ ] Can claim once per 24h
- [ ] Reward options show when available
- [ ] Timer shows when claimed
- [ ] Streak updates
- [ ] Reward added to inventory

#### Profile
- [ ] Player name displays
- [ ] Coins show
- [ ] Stars total shows
- [ ] Levels completed shows
- [ ] Stats display correctly
- [ ] Best score shows
- [ ] Games played shows
- [ ] Best combo shows

#### Settings
- [ ] Volume sliders work
- [ ] Toggles work (dark mode, notifications)
- [ ] Dropdowns functional
- [ ] Settings persist
- [ ] Reset progress confirms
- [ ] Reset actually clears data

#### About
- [ ] Game name shows
- [ ] Version shows
- [ ] Developer name shows
- [ ] Copyright shows
- [ ] Description shows
- [ ] Credits visible

### 2. Gameplay Mechanics

#### Matching System
- [ ] 3-match detected and removed
- [ ] 4-match detected and scored higher
- [ ] 5-match detected and scored highest
- [ ] L-shape matches work
- [ ] T-shape matches work
- [ ] Cross-shape matches work
- [ ] Cascades trigger automatically
- [ ] Combo multiplier applies
- [ ] No impossible boards generated
- [ ] Board reshuffles when no moves

#### Scoring
- [ ] Base score correct (100 per jelly)
- [ ] 4-match multiplier works (1.5x)
- [ ] 5-match multiplier works (2x)
- [ ] Combo bonus applies
- [ ] Score displays correctly
- [ ] Star thresholds accurate

#### Level Progression
- [ ] Level 1 unlocked at start
- [ ] Levels unlock sequentially
- [ ] All 20 levels accessible after completion
- [ ] Level data saves
- [ ] Best scores persist
- [ ] Stars persist

### 3. Save System

#### Data Persistence
- [ ] Player data saves
- [ ] Level progress saves
- [ ] Settings save
- [ ] Leaderboard entries save
- [ ] Achievement progress saves
- [ ] Daily reward timer saves

#### Data Integrity
- [ ] No data corruption
- [ ] Reload maintains all data
- [ ] Multiple saves don't conflict
- [ ] Old data loads correctly
- [ ] Reset clears all data

### 4. User Interface

#### Responsiveness
- [ ] Desktop (1080x1920) - looks good
- [ ] Tablet (1024x768) - looks good
- [ ] Mobile (375x667) - looks good
- [ ] Wide screens - scaling correct
- [ ] Touch targets appropriately sized
- [ ] Text readable on all sizes

#### Visual Quality
- [ ] No graphical glitches
- [ ] Animations smooth
- [ ] Colors vibrant
- [ ] Text clear and legible
- [ ] Button states clear
- [ ] Hover effects visible

#### Accessibility
- [ ] Text contrast sufficient
- [ ] Buttons labeled clearly
- [ ] Font size readable
- [ ] No reliance on color alone
- [ ] Instructions clear

### 5. Performance

#### Frame Rate
- [ ] Consistent 60 FPS on desktop
- [ ] 50+ FPS on mobile
- [ ] No stuttering during gameplay
- [ ] Smooth menu transitions
- [ ] Smooth scene changes

#### Load Time
- [ ] Under 3 seconds on 4G
- [ ] Under 5 seconds on 3G
- [ ] Assets load in correct order
- [ ] No freezing during load

#### Memory
- [ ] Base memory < 100MB
- [ ] No memory leaks
- [ ] Stable after extended play
- [ ] Scene cleanup works

### 6. Browser Compatibility

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Opera (latest)

#### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile
- [ ] Samsung Browser

#### Devices
- [ ] iPhone 12/13 (iOS)
- [ ] Pixel 6 (Android)
- [ ] iPad (iOS tablet)
- [ ] Samsung Tab (Android tablet)
- [ ] Desktop (Windows/Mac/Linux)

### 7. Controls

#### Mouse/Touch
- [ ] Click/tap selects tile
- [ ] Adjacent swap works
- [ ] Non-adjacent click deselects and selects new
- [ ] No accidental clicks
- [ ] Drag working correctly

#### Keyboard (if applicable)
- [ ] Arrow keys navigate (future)
- [ ] Enter confirms (future)
- [ ] ESC pauses (future)

### 8. Audio (when implemented)
- [ ] Menu music plays
- [ ] Gameplay music plays
- [ ] Match sound effects play
- [ ] Victory sound plays
- [ ] Game Over sound plays
- [ ] Volume settings work
- [ ] Muting works

### 9. Edge Cases

#### Error Handling
- [ ] No JSON parse errors
- [ ] Invalid data handled
- [ ] Missing assets handled
- [ ] Network errors handled (if applicable)
- [ ] Storage quota exceeded handled

#### Boundary Conditions
- [ ] First level playable
- [ ] Last level playable
- [ ] Zero moves handled
- [ ] Max coins handled
- [ ] Max leaderboard entries handled

### 10. Security

#### Data Protection
- [ ] No sensitive data exposed
- [ ] LocalStorage used safely
- [ ] No injection vulnerabilities
- [ ] Input validation present
- [ ] XSS protection in place

#### Privacy
- [ ] No data sent to server (local only)
- [ ] No tracking
- [ ] No ads
- [ ] No third-party scripts (except Phaser)

## Test Results Template

```
Test Date: __________
Tester: __________
Browser: __________
Device: __________
OS Version: __________

Results:
✅ All tests passed / ❌ Issues found

Issues Found:
1. [Issue description]
2. [Issue description]

Notes:
[Additional comments]
```

## Known Issues

(None at v1.0.0 launch)

## Sign-Off

- [ ] Lead Developer Approval
- [ ] QA Lead Approval
- [ ] Game Designer Approval
- [ ] Ready for Production

**Date**: __________
**Signed**: __________

---

**Version**: 1.0.0  
**Last Updated**: 2024-07-08
