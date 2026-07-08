import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class DailyRewardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DailyRewardScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);

        // Header
        const headerBg = this.add.rectangle(centerX, 80, width, 120, COLORS.UI_DARK, 0.9);
        headerBg.setStrokeStyle(2, COLORS.UI_LIGHT);

        this.add.text(centerX, 40, '🎁 DAILY REWARD', {
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

        // Check if player can claim reward
        const canClaim = SaveManager.canClaimDailyReward();
        const rewardData = SaveManager.getDailyRewardData();

        if (canClaim) {
            // Show reward options
            this.showRewardScreen();
        } else {
            // Show countdown timer
            const lastClaimed = rewardData?.lastClaimed || 0;
            const nextRewardTime = lastClaimed + 24 * 60 * 60 * 1000;
            const timeRemaining = nextRewardTime - Date.now();

            this.add.text(centerX, centerY, '⏳ Come back later!', {
                fontSize: '48px',
                fill: '#FFD700',
                fontStyle: 'bold',
                align: 'center'
            }).setOrigin(0.5);

            // Timer
            const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
            const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));

            this.add.text(centerX, centerY + 100, `Next reward in: ${hours}h ${minutes}m`, {
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5);

            // Streak
            this.add.text(centerX, centerY + 200, `Current Streak: ${rewardData?.streak || 0} 🔥`, {
                fontSize: '28px',
                fill: '#FF8800',
                align: 'center'
            }).setOrigin(0.5);
        }
    }

    showRewardScreen() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.text(centerX, centerY - 200, '✨ CHOOSE YOUR REWARD ✨', {
            fontSize: '32px',
            fill: '#16c784',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        const rewards = [
            { text: '500 Coins', icon: '🪙', coins: 500 },
            { text: '3 Boosters', icon: '⭐', boosters: 3 },
            { text: '50 Gems', icon: '💎', gems: 50 },
            { text: '5 Lives', icon: '❤️', lives: 5 }
        ];

        const spacing = 150;
        const cols = 2;

        rewards.forEach((reward, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const x = 340 + col * 400;
            const y = centerY + row * 200;

            this.createRewardCard(x, y, reward);
        });
    }

    createRewardCard(x, y, reward) {
        const cardBg = this.add.rectangle(x, y, 350, 150, 0x16c784, 0.7);
        cardBg.setStrokeStyle(3, 0xFFFFFF);

        cardBg.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                cardBg.setFillStyle(0x20d997, 0.9);
                this.tweens.add({
                    targets: cardBg,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 200
                });
            })
            .on('pointerout', () => {
                cardBg.setFillStyle(0x16c784, 0.7);
                this.tweens.add({
                    targets: cardBg,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200
                });
            })
            .on('pointerdown', () => this.claimReward(reward));

        // Icon
        this.add.text(x - 120, y, reward.icon, {
            fontSize: '48px'
        }).setOrigin(0.5);

        // Text
        this.add.text(x + 50, y, reward.text, {
            fontSize: '22px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1);
    }

    claimReward(reward) {
        const playerData = SaveManager.getPlayerData();

        if (reward.coins) playerData.coins += reward.coins;
        if (reward.gems) playerData.gems += reward.gems;
        if (reward.lives) playerData.lives += reward.lives;
        if (reward.boosters) {
            playerData.boosters.hammer = (playerData.boosters.hammer || 0) + reward.boosters;
        }

        SaveManager.updatePlayerData(playerData);
        SaveManager.setDailyRewardClaimed();

        this.add.text(540, 900, 'Reward Claimed! 🎉', {
            fontSize: '36px',
            fill: '#16c784',
            fontStyle: 'bold',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => this.scene.start('MainMenuScene'));
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
