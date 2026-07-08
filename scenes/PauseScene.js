import { COLORS } from '../config.js';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Semi-transparent overlay
        this.add.rectangle(centerX, centerY, width, height, 0x000000, 0.7);

        // Pause title
        this.add.text(centerX, centerY - 300, '⏸ PAUSED', {
            fontSize: '60px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Buttons
        const buttonWidth = 300;
        const buttonHeight = 70;
        const startY = centerY - 150;
        const spacing = 90;

        const buttons = [
            { text: '▶ RESUME', action: () => this.scene.stop('PauseScene').resume('GameplayScene') },
            { text: '🔄 RESTART', action: () => { this.scene.stop('PauseScene'); this.scene.restart('GameplayScene'); } },
            { text: '⚙ SETTINGS', action: () => { this.scene.stop('PauseScene'); this.scene.launch('SettingsScene'); } },
            { text: '🏠 QUIT', action: () => { this.scene.stop('PauseScene'); this.scene.stop('GameplayScene'); this.scene.start('MainMenuScene'); } }
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
