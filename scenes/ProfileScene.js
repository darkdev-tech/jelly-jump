import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class ProfileScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ProfileScene' });
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

        this.add.text(centerX, 40, '👤 PROFILE', {
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

        // Get player and level data
        const playerData = SaveManager.getPlayerData();
        const levelData = SaveManager.getLevelData();
        const leaderboard = SaveManager.getLeaderboard();

        let completedLevels = 0;
        let totalStars = 0;
        for (let i = 1; i <= 20; i++) {
            if (levelData[i].completed) completedLevels++;
            totalStars += levelData[i].stars;
        }

        // Player profile card
        const profileBg = this.add.rectangle(centerX, 200, 600, 200, 0x16c784, 0.3);
        profileBg.setStrokeStyle(2, 0x16c784);

        let profileY = 140;
        this.add.text(centerX, profileY, playerData.name, {
            fontSize: '40px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        profileY += 50;
        this.add.text(centerX, profileY, `Level Completed: ${completedLevels}/20`, {
            fontSize: '20px',
            fill: '#FFD700',
            align: 'center'
        }).setOrigin(0.5);

        profileY += 40;
        this.add.text(centerX, profileY, `Total Stars: ⭐ ${totalStars}`, {
            fontSize: '20px',
            fill: '#FFD700',
            align: 'center'
        }).setOrigin(0.5);

        // Stats section
        const statStartY = 360;
        const stats = [
            { label: 'Total Score', value: playerData.totalScore, icon: '🎯' },
            { label: 'Coins', value: playerData.coins, icon: '🪙' },
            { label: 'Games Played', value: playerData.gamesPlayed, icon: '🎮' },
            { label: 'Best Combo', value: playerData.bestCombo, icon: '🔥' }
        ];

        stats.forEach((stat, index) => {
            const y = statStartY + index * 100;
            const statBg = this.add.rectangle(centerX, y, 500, 80, 0x16c784, 0.3);
            statBg.setStrokeStyle(1, 0x16c784);

            this.add.text(centerX - 200, y - 15, stat.icon, {
                fontSize: '32px'
            }).setOrigin(0.5);

            this.add.text(centerX - 100, y - 15, stat.label, {
                fontSize: '18px',
                fill: '#16c784',
                fontStyle: 'bold'
            }).setOrigin(0, 0.5);

            this.add.text(centerX + 150, y, stat.value.toString(), {
                fontSize: '24px',
                fill: '#FFD700',
                fontStyle: 'bold',
                align: 'right'
            }).setOrigin(1, 0.5);
        });
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
