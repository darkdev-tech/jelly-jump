import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
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

        this.add.text(centerX, 40, '🛒 SHOP', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Coins display
        const playerData = SaveManager.getPlayerData();
        this.coinsText = this.add.text(width - 50, 40, `${playerData.coins} 🪙`, {
            fontSize: '24px',
            fill: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(1, 0);

        // Back button
        this.createBackButton(50, 40, () => {
            this.cameras.main.fade(400);
            this.time.delayedCall(400, () => this.scene.start('MainMenuScene'));
        });

        // Shop items
        const items = [
            { name: 'Lives Pack', icon: '❤️', price: 500, type: 'lives', amount: 5 },
            { name: 'Hammer Booster', icon: '🔨', price: 300, type: 'booster', booster: 'hammer', amount: 3 },
            { name: 'Shuffle Booster', icon: '🔄', price: 300, type: 'booster', booster: 'shuffle', amount: 3 },
            { name: 'Extra Moves', icon: '➕', price: 400, type: 'moves', amount: 5 },
            { name: 'Rainbow Bomb', icon: '🌈', price: 500, type: 'booster', booster: 'rainbowBomb', amount: 2 },
            { name: 'Coin Pack +1000', icon: '💰', price: 0, gems: 10, type: 'coins', amount: 1000 },
        ];

        const startY = 180;
        const spacing = 150;
        const cols = 2;

        items.forEach((item, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const x = 270 + col * 540;
            const y = startY + row * spacing;

            this.createShopItem(x, y, item);
        });
    }

    createShopItem(x, y, item) {
        const width = 400;
        const height = 120;

        const bg = this.add.rectangle(x, y, width, height, 0x16c784, 0.7);
        bg.setStrokeStyle(2, 0xFFFFFF);

        // Icon
        this.add.text(x - 140, y, item.icon, {
            fontSize: '48px'
        }).setOrigin(0.5);

        // Name
        this.add.text(x - 20, y - 30, item.name, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        // Price
        const priceText = item.gems ? `${item.gems} 💎` : `${item.price} 🪙`;
        this.add.text(x - 20, y + 10, `Price: ${priceText}`, {
            fontSize: '16px',
            fill: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        // Buy button
        const buyBtn = this.add.rectangle(x + 140, y, 100, 50, 0x20d997, 0.8);
        buyBtn.setStrokeStyle(2, 0xFFFFFF);
        buyBtn.setInteractive({ useHandCursor: true })
            .on('pointerover', () => buyBtn.setFillStyle(0x16c784))
            .on('pointerout', () => buyBtn.setFillStyle(0x20d997))
            .on('pointerdown', () => this.purchaseItem(item));

        this.add.text(x + 140, y, 'BUY', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }

    purchaseItem(item) {
        const playerData = SaveManager.getPlayerData();
        const canAfford = item.gems ? (playerData.gems >= item.gems) : (playerData.coins >= item.price);

        if (!canAfford) {
            this.showNotification('Not enough currency!');
            return;
        }

        // Deduct payment
        if (item.gems) {
            playerData.gems -= item.gems;
        } else {
            playerData.coins -= item.price;
        }

        // Add item
        switch (item.type) {
            case 'lives':
                playerData.lives += item.amount;
                break;
            case 'coins':
                playerData.coins += item.amount;
                break;
            case 'booster':
                playerData.boosters[item.booster] = (playerData.boosters[item.booster] || 0) + item.amount;
                break;
        }

        SaveManager.updatePlayerData(playerData);
        this.coinsText.setText(`${playerData.coins} 🪙`);
        this.showNotification(`Purchased ${item.name}!`);
    }

    showNotification(text) {
        const notification = this.add.text(540, 1800, text, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center',
            backgroundColor: '#16c784',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        this.tweens.add({
            targets: notification,
            alpha: 0,
            duration: 2000,
            delay: 1000,
            onComplete: () => notification.destroy()
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
