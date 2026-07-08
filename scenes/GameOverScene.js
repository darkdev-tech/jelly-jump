import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.levelId = data.levelId || 1;
        this.score = data.score || 0;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);

        // Game Over title
        this.add.text(centerX, centerY - 400, '💀 GAME OVER', {
            fontSize: '72px',
            fill: '#FF4444',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Score display
        this.add.text(centerX, centerY - 250, `Score: ${this.score}`, {
            fontSize: '48px',
            fill: '#FFD700',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        const playerData = SaveManager.getPlayerData();
        SaveManager.addToLeaderboard({
            name: playerData.name,
            score: this.score,
            stars: 0,
            level: this.levelId
        });

        // Buttons
        const buttonWidth = 300;
        const buttonHeight = 70;
        const startY = centerY + 100;
        const spacing = 100;

        const buttons = [
            { text: '🔄 RETRY', action: () => this.scene.start('GameplayScene', { levelId: this.levelId }) },
            { text: '🏠 MAIN MENU', action: () => this.scene.start('MainMenuScene') }
        ];

        buttons.forEach((btn, index) => {
            this.createButton(
                centerX,
                startY + index * spacing,
                buttonWidth,
                buttonHeight,
                btn.text,
                btn.action
            );
        });
    }

    createButton(x, y, width, height, text, callback) {
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
            .on('pointerdown', callback);

        this.add.text(x, y, text, {
            fontSize: '28px',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1);
    }
}
