import { COLORS } from '../config.js';

export class AboutScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AboutScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        // Background
        this.add.rectangle(centerX, height / 2, width, height, COLORS.BACKGROUND);

        // Header
        const headerBg = this.add.rectangle(centerX, 80, width, 120, COLORS.UI_DARK, 0.9);
        headerBg.setStrokeStyle(2, COLORS.UI_LIGHT);

        this.add.text(centerX, 40, '❓ ABOUT', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Back button
        this.createBackButton(50, 40, () => {
            this.cameras.main.fade(400);
            this.time.delayedCall(400, () => this.scene.start('MainMenuScene'));
        });

        // Content
        const startY = 160;
        const spacing = 80;
        let currentY = startY;

        // Title
        this.add.text(centerX, currentY, '🍬 JELLY JUMP 🍬', {
            fontSize: '40px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        currentY += spacing;

        // Version
        this.add.text(centerX, currentY, 'Version: 1.0.0', {
            fontSize: '20px',
            fill: '#16c784',
            align: 'center'
        }).setOrigin(0.5);

        currentY += spacing;

        // Developer
        this.add.text(centerX, currentY, 'Developed by', {
            fontSize: '18px',
            fill: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        currentY += 40;
        this.add.text(centerX, currentY, 'SMILEY STUDIO GAMES', {
            fontSize: '24px',
            fill: '#FFD700',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        currentY += spacing + 20;

        // Description
        const descText = 'A fun and addictive Match-3 puzzle game!\nSwap jellies, make matches, and conquer\n20 challenging levels!';
        this.add.text(centerX, currentY, descText, {
            fontSize: '18px',
            fill: '#FFFFFF',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        currentY += 150;

        // Copyright
        this.add.text(centerX, currentY, '© 2024 SMILEY STUDIO GAMES', {
            fontSize: '16px',
            fill: '#999999',
            align: 'center'
        }).setOrigin(0.5);

        currentY += 60;

        // Credits
        this.add.text(centerX, currentY, 'Made with Phaser 3', {
            fontSize: '16px',
            fill: '#999999',
            align: 'center'
        }).setOrigin(0.5);

        currentY += 60;

        // Thanks
        this.add.text(centerX, currentY, 'Thanks for playing! 🎮', {
            fontSize: '20px',
            fill: '#16c784',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
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
