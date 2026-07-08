import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    init(data) {
        this.levelId = data.levelId || 1;
        this.score = data.score || 0;
        this.stars = data.stars || 1;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);

        // Celebration particles
        for (let i = 0; i < 50; i++) {
            const particle = this.add.circle(
                Phaser.Math.Between(100, 980),
                Phaser.Math.Between(400, 1600),
                Phaser.Math.Between(3, 8),
                Phaser.Math.RND.pick([0xFF4444, 0x4ECDC4, 0x95E1D3, 0xFFE66D, 0xC7CEEA, 0xFFCC99]),
                0.7
            );

            this.tweens.add({
                targets: particle,
                y: particle.y - 400,
                alpha: 0,
                duration: Phaser.Math.Between(1000, 3000),
                ease: 'Quad.out'
            });
        }

        // Victory title
        this.add.text(centerX, centerY - 400, '🎉 LEVEL COMPLETE', {
            fontSize: '72px',
            fill: '#16c784',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Stars display
        const starY = centerY - 200;
        let starText = '';
        for (let i = 0; i < 3; i++) {
            starText += i < this.stars ? '⭐' : '☆';
        }
        const starsDisplay = this.add.text(centerX, starY, starText, {
            fontSize: '80px',
            align: 'center'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: starsDisplay,
            scaleX: { from: 0.5, to: 1.2 },
            scaleY: { from: 0.5, to: 1.2 },
            duration: 600,
            ease: 'Elastic.out'
        });

        // Score display
        this.add.text(centerX, starY + 100, `Score: ${this.score}`, {
            fontSize: '48px',
            fill: '#FFD700',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Coins earned
        const coinsEarned = Math.floor(this.score / 10) + (this.stars * 100);
        this.add.text(centerX, starY + 160, `Coins Earned: +${coinsEarned}`, {
            fontSize: '28px',
            fill: '#FFD700',
            align: 'center'
        }).setOrigin(0.5);

        // Update player data
        const playerData = SaveManager.getPlayerData();
        playerData.coins += coinsEarned;
        playerData.totalScore += this.score;
        SaveManager.updatePlayerData(playerData);

        // Buttons
        const buttonWidth = 300;
        const buttonHeight = 70;
        const startY = centerY + 250;
        const spacing = 100;

        const buttons = [
            { text: '▶ NEXT LEVEL', action: () => this.nextLevel() },
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

    nextLevel() {
        const nextLevelId = this.levelId + 1;
        if (nextLevelId <= 20) {
            const levelData = SaveManager.getLevelData();
            levelData[nextLevelId].unlocked = true;
            SaveManager.updateLevelData(nextLevelId, levelData[nextLevelId]);
            this.scene.start('GameplayScene', { levelId: nextLevelId });
        } else {
            this.add.text(540, 900, '🏆 YOU BEAT THE GAME! 🏆', {
                fontSize: '36px',
                fill: '#FFD700',
                fontStyle: 'bold',
                align: 'center'
            }).setOrigin(0.5);
            this.time.delayedCall(3000, () => this.scene.start('MainMenuScene'));
        }
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
