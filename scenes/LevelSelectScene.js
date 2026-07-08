import { GAME_CONFIG, COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        // Background
        this.add.rectangle(centerX, height / 2, width, height, COLORS.BACKGROUND);

        // Header
        const headerBg = this.add.rectangle(centerX, 60, width, 100, COLORS.UI_DARK, 0.9);
        headerBg.setStrokeStyle(2, COLORS.UI_LIGHT);

        this.add.text(centerX, 30, '🗺 LEVEL SELECT', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Back button
        this.createBackButton(50, 30, () => {
            this.cameras.main.fade(400);
            this.time.delayedCall(400, () => this.scene.start('MainMenuScene'));
        });

        // Get level data
        const levelData = SaveManager.getLevelData();

        // Create level buttons
        const startY = 150;
        const spacing = 110;
        const buttonsPerRow = 4;
        const cols = 4;

        for (let i = 1; i <= 20; i++) {
            const level = levelData[i];
            const row = Math.floor((i - 1) / cols);
            const col = (i - 1) % cols;
            const x = 120 + col * 230;
            const y = startY + row * spacing;

            this.createLevelButton(x, y, i, level);
        }
    }

    createLevelButton(x, y, levelId, levelData) {
        const width = 200;
        const height = 100;

        const button = this.add.rectangle(x, y, width, height, 0x16c784, 0.7);
        button.setStrokeStyle(2, 0xFFFFFF);

        if (!levelData.unlocked) {
            button.setFillStyle(0x555555, 0.5);
            button.setStrokeStyle(2, 0x999999);

            this.add.text(x, y, '🔒\nLOCKED', {
                fontSize: '24px',
                fill: '#999999',
                align: 'center',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            return;
        }

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
                button.setFillStyle(0x16c784, 0.7);
                this.tweens.add({
                    targets: button,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200
                });
            })
            .on('pointerdown', () => {
                this.cameras.main.fade(400);
                this.time.delayedCall(400, () => {
                    this.scene.start('GameplayScene', { levelId, levelData });
                });
            });

        // Level number
        this.add.text(x, y - 25, `LEVEL ${levelId}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Stars
        const stars = levelData.stars || 0;
        let starText = '';
        for (let i = 0; i < 3; i++) {
            starText += i < stars ? '⭐' : '☆';
        }
        this.add.text(x, y + 5, starText, {
            fontSize: '18px',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Best score
        this.add.text(x, y + 30, `Best: ${levelData.bestScore}`, {
            fontSize: '14px',
            fill: '#FFD700',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }

    createBackButton(x, y, callback) {
        const btn = this.add.rectangle(x, y, 80, 50, 0x16c784, 0.8);
        btn.setStrokeStyle(2, 0xFFFFFF);
        btn.setInteractive({ useHandCursor: true })
            .on('pointerover', () => btn.setFillStyle(0x20d997))
            .on('pointerout', () => btn.setFillStyle(0x16c784))
            .on('pointerdown', callback);

        this.add.text(x, y, '← BACK', {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }
}
