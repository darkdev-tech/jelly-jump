import { GAME_CONFIG, COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class Board {
    constructor(scene, levelId, levelData) {
        this.scene = scene;
        this.levelId = levelId;
        this.levelData = levelData;
        this.size = GAME_CONFIG.BOARD_SIZE;
        this.tiles = [];
        this.tileGroup = scene.add.group();
        this.startX = (1080 - (this.size * GAME_CONFIG.TILE_SIZE)) / 2;
        this.startY = 250;

        this.init();
    }

    init() {
        this.generateBoard();
    }

    generateBoard() {
        this.tiles = [];
        this.tileGroup.clear(true);

        for (let y = 0; y < this.size; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.size; x++) {
                this.tiles[y][x] = this.createTile(x, y);
            }
        }
    }

    createTile(x, y) {
        let type = Phaser.Math.Between(0, 5); // Random jelly type

        // Prevent initial matches
        if (x > 1 && this.tiles[y][x - 1]?.type === type && this.tiles[y][x - 2]?.type === type) {
            type = (type + 1) % 6;
        }
        if (y > 1 && this.tiles[y - 1][x]?.type === type && this.tiles[y - 2][x]?.type === type) {
            type = (type + 1) % 6;
        }

        const tile = {
            x,
            y,
            type,
            special: 0,
            matched: false,
            graphics: null
        };

        // Create visual representation
        const posX = this.startX + x * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
        const posY = this.startY + y * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;

        const graphic = this.scene.add.circle(posX, posY, 40, this.getJellyColor(type), 0.9);
        graphic.setStrokeStyle(3, 0xFFFFFF);
        graphic.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.onTileClick(tile));

        tile.graphics = graphic;
        this.tileGroup.add(graphic);
        return tile;
    }

    getJellyColor(type) {
        const colors = [0xFF6B6B, 0x4ECDC4, 0x95E1D3, 0xFFE66D, 0xC7CEEA, 0xFFCC99];
        return colors[type];
    }

    onTileClick(tile) {
        if (!this.selectedTile) {
            this.selectedTile = tile;
            tile.graphics.setStrokeStyle(5, 0xFFFFFF);
        } else {
            // Check if adjacent
            const distance = Math.abs(tile.x - this.selectedTile.x) + Math.abs(tile.y - this.selectedTile.y);
            if (distance === 1) {
                this.swapTiles(this.selectedTile, tile);
                this.selectedTile.graphics.setStrokeStyle(3, 0xFFFFFF);
                this.selectedTile = null;
            } else {
                this.selectedTile.graphics.setStrokeStyle(3, 0xFFFFFF);
                this.selectedTile = tile;
                tile.graphics.setStrokeStyle(5, 0xFFFFFF);
            }
        }
    }

    swapTiles(tile1, tile2) {
        // Swap types
        [tile1.type, tile2.type] = [tile2.type, tile1.type];
        this.updateTileGraphics(tile1);
        this.updateTileGraphics(tile2);

        // Check for matches
        this.scene.time.delayedCall(200, () => {
            const matches = this.findMatches();
            if (matches.length > 0) {
                this.removeMatches(matches);
                this.scene.consumeMove();
            }
        });
    }

    updateTileGraphics(tile) {
        tile.graphics.setFillStyle(this.getJellyColor(tile.type));
    }

    findMatches() {
        const matches = [];
        const matched = Array(this.size).fill(null).map(() => Array(this.size).fill(false));

        // Check horizontal
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size - 2; x++) {
                if (this.tiles[y][x].type === this.tiles[y][x + 1].type &&
                    this.tiles[y][x].type === this.tiles[y][x + 2].type) {
                    matched[y][x] = matched[y][x + 1] = matched[y][x + 2] = true;
                }
            }
        }

        // Check vertical
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size - 2; y++) {
                if (this.tiles[y][x].type === this.tiles[y + 1][x].type &&
                    this.tiles[y][x].type === this.tiles[y + 2][x].type) {
                    matched[y][x] = matched[y + 1][x] = matched[y + 2][x] = true;
                }
            }
        }

        // Collect matched tiles
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (matched[y][x]) matches.push(this.tiles[y][x]);
            }
        }

        return matches;
    }

    removeMatches(matches) {
        matches.forEach(tile => {
            tile.graphics.destroy();
            tile.matched = true;
        });

        // Score
        const score = matches.length * GAME_CONFIG.BASE_SCORE;
        this.scene.addScore(score);

        this.scene.time.delayedCall(300, () => {
            this.fallTiles();
        });
    }

    fallTiles() {
        for (let x = 0; x < this.size; x++) {
            let writePos = this.size - 1;
            for (let y = this.size - 1; y >= 0; y--) {
                if (!this.tiles[y][x].matched) {
                    if (writePos !== y) {
                        this.tiles[writePos][x] = this.tiles[y][x];
                        this.tiles[writePos][x].y = writePos;
                        this.updateTilePosition(this.tiles[writePos][x]);
                    }
                    writePos--;
                }
            }

            // Create new tiles
            for (let y = 0; y <= writePos; y++) {
                this.tiles[y][x] = this.createTile(x, y);
            }
        }

        // Check for more matches
        this.scene.time.delayedCall(200, () => {
            const matches = this.findMatches();
            if (matches.length > 0) {
                this.removeMatches(matches);
            }
        });
    }

    updateTilePosition(tile) {
        const posX = this.startX + tile.x * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
        const posY = this.startY + tile.y * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;

        this.scene.tweens.add({
            targets: tile.graphics,
            x: posX,
            y: posY,
            duration: GAME_CONFIG.FALL_DURATION,
            ease: 'Quad.out'
        });
    }

    update() {
        // Game update logic
    }

    destroy() {
        this.tileGroup.clear(true);
        this.tiles = [];
    }
}
