import { GAME_CONFIG, COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);

        // Animated background elements
        this.createAnimatedBackground();

        // Title
        this.add.text(centerX, 150, '🍬 JELLY JUMP 🍬', {
            fontSize: '72px',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(centerX, 220, 'SMILEY STUDIO GAMES', {
            fontSize: '24px',
            fill: '#16c784',
            align: 'center'
        }).setOrigin(0.5);

        // Get player data
        const playerData = SaveManager.getPlayerData();

        // Score display
        this.add.text(centerX, 280, `Coins: ${playerData.coins} 💰`, {
            fontSize: '20px',
            fill: '#FFD700',
            align: 'center'
        }).setOrigin(0.5);

        // Menu buttons
        const buttonWidth = 300;
        const buttonHeight = 70;
        const startY = 400;
        const spacing = 90;

        const buttons = [
            { text: '▶ PLAY', scene: 'LevelSelectScene' },
            { text: '🗺 LEVELS', scene: 'LevelSelectScene' },
            { text: '🏆 LEADERBOARD', scene: 'LeaderboardScene' },
            { text: '🎁 DAILY REWARD', scene: 'DailyRewardScene' },
            { text: '🛒 SHOP', scene: 'ShopScene' },
            { text: '👤 PROFILE', scene: 'ProfileScene' },
            { text: '⚙ SETTINGS', scene: 'SettingsScene' },
            { text: '❓ ABOUT', scene: 'AboutScene' }
        ];

        buttons.forEach((btn, index) => {
            this.createMenuButton(
                centerX,
                startY + index * spacing,
                buttonWidth,
                buttonHeight,
                btn.text,
                btn.scene
            );
        });
    }

    createAnimatedBackground() {
        // Animated clouds
        for (let i = 0; i < 5; i++) {
            const cloud = this.add.ellipse(
                Phaser.Math.Between(100, 980),
                Phaser.Math.Between(50, 300),
                80,
                40,
                0xFFFFFF,
                0.1
            );

            this.tweens.add({
                targets: cloud,
                x: cloud.x > 500 ? -50 : 1130,
                duration: Phaser.Math.Between(20000, 40000),
                repeat: -1,
                ease: 'Linear'
            });
        }

        // Floating particles
        for (let i = 0; i < 30; i++) {
            const particle = this.add.circle(
                Phaser.Math.Between(0, 1080),
                Phaser.Math.Between(0, 1920),
                Phaser.Math.Between(2, 5),
                0x16c784,
                0.3
            );

            this.tweens.add({
                targets: particle,
                y: particle.y - 200,
                alpha: 0,
                duration: Phaser.Math.Between(3000, 8000),
                repeat: -1,
                delay: Phaser.Math.Between(0, 5000),
                ease: 'Linear'
            });
        }
    }

    createMenuButton(x, y, width, height, text, scene) {
        const button = this.add.rectangle(x, y, width, height, 0x16c784, 0.8);
        button.setStrokeStyle(3, 0xFFFFFF);
        button.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                button.setFillStyle(0x20d997, 0.9);
                this.tweens.add({
                    targets: button,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 200
                });
            })
            .on('pointerout', () => {
                button.setFillStyle(0x16c784, 0.8);
                this.tweens.add({
                    targets: button,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(400, 0, 0, 0);
                this.time.delayedCall(400, () => {
                    this.scene.start(scene);
                });
            });

        this.add.text(x, y, text, {
            fontSize: '28px',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1);
    }
}
