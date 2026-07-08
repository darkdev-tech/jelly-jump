import { GAME_CONFIG, COLORS } from './config.js';
import { SaveManager } from './save/SaveManager.js';
import { LoadingScene } from './scenes/LoadingScene.js';
import { MainMenuScene } from './scenes/MainMenuScene.js';
import { GameplayScene } from './scenes/GameplayScene.js';
import { LevelSelectScene } from './scenes/LevelSelectScene.js';
import { LeaderboardScene } from './scenes/LeaderboardScene.js';
import { ShopScene } from './scenes/ShopScene.js';
import { ProfileScene } from './scenes/ProfileScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { WinScene } from './scenes/WinScene.js';
import { DailyRewardScene } from './scenes/DailyRewardScene.js';
import { AboutScene } from './scenes/AboutScene.js';

// Initialize Save Manager
SaveManager.init();

// Phaser Configuration
const phaser_config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: GAME_CONFIG.DEBUG
        }
    },
    render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true,
        fps: {
            target: GAME_CONFIG.FPS,
            forceSetTimeScale: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        orientation: Phaser.Scale.Orientation.PORTRAIT,
        fullscreenTarget: 'game-container',
        expandParent: true
    },
    scene: [
        LoadingScene,
        MainMenuScene,
        GameplayScene,
        LevelSelectScene,
        LeaderboardScene,
        ShopScene,
        ProfileScene,
        SettingsScene,
        PauseScene,
        GameOverScene,
        WinScene,
        DailyRewardScene,
        AboutScene
    ]
};

// Create Phaser Game Instance
const game = new Phaser.Game(phaser_config);

// Global reference
window.jellyJump = {
    game,
    config: GAME_CONFIG,
    colors: COLORS,
    saveManager: SaveManager
};