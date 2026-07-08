import { GAME_CONFIG, COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';
import { Board } from '../gameplay/Board.js';
import { ScoreManager } from '../gameplay/ScoreManager.js';

export class GameplayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameplayScene' });
    }

    init(data) {
        this.levelId = data.levelId || 1;
        this.levelData = data.levelData || {};
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        // Background
        this.add.rectangle(centerX, height / 2, width, height, COLORS.BACKGROUND);

        // UI Background
        const uiBg = this.add.rectangle(centerX, 80, width, 150, COLORS.UI_DARK, 0.9);
        uiBg.setStrokeStyle(2, COLORS.UI_LIGHT);

        // Level and Score display
        this.add.text(50, 40, `Level ${this.levelId}`, {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        });

        this.scoreText = this.add.text(centerX, 40, 'Score: 0', {
            fontSize: '28px',
            fill: '#FFD700',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        this.movesText = this.add.text(width - 50, 40, 'Moves: 20', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(1, 0);

        // Pause button
        const pauseBtn = this.add.rectangle(centerX, 120, 100, 50, 0x16c784, 0.8);
        pauseBtn.setStrokeStyle(2, 0xFFFFFF);
        pauseBtn.setInteractive({ useHandCursor: true })
            .on('pointerover', () => pauseBtn.setFillStyle(0x20d997))
            .on('pointerout', () => pauseBtn.setFillStyle(0x16c784))
            .on('pointerdown', () => this.scene.pause('GameplayScene').launch('PauseScene'));

        this.add.text(centerX, 120, '⏸ PAUSE', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Initialize game board
        this.board = new Board(this, this.levelId, this.levelData);
        this.scoreManager = new ScoreManager();

        // Initialize game state
        this.score = 0;
        this.moves = this.levelData.moves || 20;
        this.isProcessing = false;

        // Event listeners
        this.events.on('shutdown', () => {
            this.board.destroy();
        });
    }

    update() {
        if (this.board) {
            this.board.update();
        }
    }

    addScore(amount) {
        this.score += amount;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    consumeMove() {
        this.moves--;
        this.movesText.setText(`Moves: ${this.moves}`);

        if (this.moves <= 0) {
            this.endGame(false);
        }
    }

    endGame(won) {
        // Save level data
        if (won) {
            const levelData = SaveManager.getLevelData();
            const stars = this.calculateStars();
            const currentLevel = levelData[this.levelId];

            if (this.score > (currentLevel.bestScore || 0)) {
                currentLevel.bestScore = this.score;
            }
            if (stars > (currentLevel.stars || 0)) {
                currentLevel.stars = stars;
            }
            currentLevel.completed = true;

            SaveManager.updateLevelData(this.levelId, currentLevel);
            this.scene.start('WinScene', { score: this.score, stars });
        } else {
            this.scene.start('GameOverScene', { levelId: this.levelId });
        }
    }

    calculateStars() {
        const targetScore = this.levelData.targetScore || 1000;
        if (this.score >= targetScore * 1.5) return 3;
        if (this.score >= targetScore) return 2;
        return 1;
    }
}
