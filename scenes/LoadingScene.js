import { GAME_CONFIG, COLORS } from '../config.js';

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Create animated background
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(COLORS.BACKGROUND, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture('loadingBg', width, height);
        graphics.destroy();

        this.add.image(centerX, centerY, 'loadingBg').setDepth(0);

        // Animated stars
        for (let i = 0; i < 50; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height * 0.5),
                Phaser.Math.Between(1, 3),
                0xFFFFFF,
                0.6
            );
            this.tweens.add({
                targets: star,
                alpha: { from: 0.3, to: 0.9 },
                duration: Phaser.Math.Between(1000, 3000),
                repeat: -1,
                yoyo: true
            });
        }

        // Logo
        const logoText = this.add.text(centerX, centerY - 300, 'SMILEY STUDIO GAMES', {
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#16c784',
            align: 'center'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: logoText,
            scaleX: { from: 0.8, to: 1.2 },
            scaleY: { from: 0.8, to: 1.2 },
            alpha: { from: 0.5, to: 1 },
            duration: 1000,
            repeat: -1,
            yoyo: true
        });

        // Title
        const title = this.add.text(centerX, centerY - 150, '🍬 JELLY JUMP 🍬', {
            fontSize: '80px',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            y: centerY - 140,
            duration: 800,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inout'
        });

        // Loading progress text
        const statusText = this.add.text(centerX, centerY + 100, 'Loading Assets...', {
            fontSize: '24px',
            fill: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Loading bar background
        const barBg = this.add.rectangle(centerX, centerY + 200, 400, 40, 0x333333);
        barBg.setStrokeStyle(3, 0x16c784);

        // Loading bar fill
        const barFill = this.add.rectangle(centerX - 197, centerY + 200, 0, 34, 0x16c784);
        barFill.setOrigin(0, 0.5);

        // Percentage text
        const percentText = this.add.text(centerX, centerY + 200, '0%', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Loading messages
        const messages = [
            'Loading Assets...',
            'Loading Audio...',
            'Loading Levels...',
            'Preparing Game...',
            'Almost Ready...'
        ];
        let messageIndex = 0;

        this.load.on('progress', (value) => {
            barFill.width = value * 394;
            percentText.setText(Math.floor(value * 100) + '%');

            const msgIndex = Math.floor(value * (messages.length - 1));
            if (msgIndex !== messageIndex) {
                messageIndex = msgIndex;
                statusText.setText(messages[messageIndex]);
            }
        });

        this.load.on('complete', () => {
            statusText.setText('Ready!');
            this.time.delayedCall(500, () => {
                this.cameras.main.fade(800, 0, 0, 0);
                this.time.delayedCall(800, () => {
                    this.scene.start('MainMenuScene');
                });
            });
        });

        // Preload assets
        this.preloadAssets();
    }

    preloadAssets() {
        // Placeholder: In a real game, you'd load images, audio, etc.
        // this.load.image('key', 'path/to/image.png');
        // this.load.audio('music', 'path/to/audio.mp3');
    }
}
