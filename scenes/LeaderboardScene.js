import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LeaderboardScene' });
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

        this.add.text(centerX, 40, '🏆 LEADERBOARD', {
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

        // Get leaderboard
        const leaderboard = SaveManager.getLeaderboard();

        // Column headers
        const headerY = 130;
        this.add.text(100, headerY, 'RANK', {
            fontSize: '18px',
            fill: '#16c784',
            fontStyle: 'bold'
        });
        this.add.text(250, headerY, 'PLAYER', {
            fontSize: '18px',
            fill: '#16c784',
            fontStyle: 'bold'
        });
        this.add.text(700, headerY, 'SCORE', {
            fontSize: '18px',
            fill: '#16c784',
            fontStyle: 'bold'
        });
        this.add.text(900, headerY, 'STARS', {
            fontSize: '18px',
            fill: '#16c784',
            fontStyle: 'bold'
        });

        // List entries
        const startY = 170;
        const spacing = 50;
        const maxEntries = Math.min(leaderboard.length, 12);

        for (let i = 0; i < maxEntries; i++) {
            const entry = leaderboard[i];
            const y = startY + i * spacing;

            // Rank
            this.add.text(100, y, `#${i + 1}`, {
                fontSize: '20px',
                fill: '#FFD700',
                fontStyle: 'bold'
            });

            // Player name
            this.add.text(250, y, entry.name, {
                fontSize: '18px',
                fill: '#FFFFFF',
                wordWrap: { width: 200 }
            });

            // Score
            this.add.text(700, y, entry.score.toString(), {
                fontSize: '18px',
                fill: '#FFD700',
                fontStyle: 'bold'
            });

            // Stars
            let starText = '';
            for (let j = 0; j < 3; j++) {
                starText += j < entry.stars ? '⭐' : '☆';
            }
            this.add.text(900, y, starText, {
                fontSize: '16px'
            });
        }

        if (maxEntries === 0) {
            this.add.text(centerX, 400, 'No scores yet. Play to compete!', {
                fontSize: '24px',
                fill: '#999999',
                align: 'center'
            }).setOrigin(0.5);
        }
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
