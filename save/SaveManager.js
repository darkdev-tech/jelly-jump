import { GAME_CONFIG } from '../config.js';

export class SaveManager {
    static init() {
        this.initializePlayerData();
        this.initializeLevels();
        this.initializeSettings();
        this.initializeAchievements();
    }

    static initializePlayerData() {
        const key = GAME_CONFIG.STORAGE_KEYS.PLAYER_DATA;
        const existing = localStorage.getItem(key);
        
        if (!existing) {
            const defaultData = {
                name: 'Player',
                coins: 5000,
                gems: 100,
                totalScore: 0,
                gamesPlayed: 0,
                bestCombo: 0,
                lives: 5,
                lastLiveUpdate: Date.now(),
                boosters: {
                    hammer: 0,
                    shuffle: 0,
                    extraMoves: 0,
                    rainbowBomb: 0,
                    colorBlast: 0,
                    freezeTime: 0
                }
            };
            localStorage.setItem(key, JSON.stringify(defaultData));
        }
    }

    static initializeLevels() {
        const key = GAME_CONFIG.STORAGE_KEYS.LEVELS;
        const existing = localStorage.getItem(key);
        
        if (!existing) {
            const levels = {};
            for (let i = 1; i <= 20; i++) {
                levels[i] = {
                    completed: i === 1 ? true : false,
                    unlocked: i === 1 ? true : false,
                    bestScore: 0,
                    stars: 0,
                    attempts: 0
                };
            }
            localStorage.setItem(key, JSON.stringify(levels));
        }
    }

    static initializeSettings() {
        const key = GAME_CONFIG.STORAGE_KEYS.SETTINGS;
        const existing = localStorage.getItem(key);
        
        if (!existing) {
            const defaultSettings = {
                musicVolume: 0.7,
                soundVolume: 0.8,
                language: 'en',
                graphicsQuality: 'high',
                fullscreen: false,
                darkMode: true,
                notifications: true
            };
            localStorage.setItem(key, JSON.stringify(defaultSettings));
        }
    }

    static initializeAchievements() {
        const key = GAME_CONFIG.STORAGE_KEYS.ACHIEVEMENTS;
        const existing = localStorage.getItem(key);
        
        if (!existing) {
            const achievements = {};
            localStorage.setItem(key, JSON.stringify(achievements));
        }
    }

    static getPlayerData() {
        const key = GAME_CONFIG.STORAGE_KEYS.PLAYER_DATA;
        return JSON.parse(localStorage.getItem(key));
    }

    static updatePlayerData(updates) {
        const key = GAME_CONFIG.STORAGE_KEYS.PLAYER_DATA;
        const current = this.getPlayerData();
        const updated = { ...current, ...updates };
        localStorage.setItem(key, JSON.stringify(updated));
        return updated;
    }

    static getLevelData() {
        const key = GAME_CONFIG.STORAGE_KEYS.LEVELS;
        return JSON.parse(localStorage.getItem(key));
    }

    static updateLevelData(levelId, updates) {
        const key = GAME_CONFIG.STORAGE_KEYS.LEVELS;
        const levels = this.getLevelData();
        levels[levelId] = { ...levels[levelId], ...updates };
        localStorage.setItem(key, JSON.stringify(levels));
        return levels[levelId];
    }

    static getSettings() {
        const key = GAME_CONFIG.STORAGE_KEYS.SETTINGS;
        return JSON.parse(localStorage.getItem(key));
    }

    static updateSettings(updates) {
        const key = GAME_CONFIG.STORAGE_KEYS.SETTINGS;
        const current = this.getSettings();
        const updated = { ...current, ...updates };
        localStorage.setItem(key, JSON.stringify(updated));
        return updated;
    }

    static getLeaderboard() {
        const key = GAME_CONFIG.STORAGE_KEYS.LEADERBOARD;
        const existing = localStorage.getItem(key);
        return existing ? JSON.parse(existing) : [];
    }

    static addToLeaderboard(entry) {
        const key = GAME_CONFIG.STORAGE_KEYS.LEADERBOARD;
        const leaderboard = this.getLeaderboard();
        leaderboard.push({
            name: entry.name,
            score: entry.score,
            stars: entry.stars,
            date: new Date().toISOString(),
            level: entry.level || 'Unknown'
        });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.splice(100); // Keep only top 100
        localStorage.setItem(key, JSON.stringify(leaderboard));
        return leaderboard;
    }

    static getDailyRewardData() {
        const key = GAME_CONFIG.STORAGE_KEYS.DAILY_REWARD;
        const existing = localStorage.getItem(key);
        return existing ? JSON.parse(existing) : null;
    }

    static setDailyRewardClaimed() {
        const key = GAME_CONFIG.STORAGE_KEYS.DAILY_REWARD;
        localStorage.setItem(key, JSON.stringify({
            lastClaimed: Date.now(),
            streak: (this.getDailyRewardData()?.streak || 0) + 1
        }));
    }

    static canClaimDailyReward() {
        const data = this.getDailyRewardData();
        if (!data) return true;
        const now = Date.now();
        const lastClaimed = data.lastClaimed;
        const hoursPassed = (now - lastClaimed) / (1000 * 60 * 60);
        return hoursPassed >= 24;
    }

    static resetProgress() {
        localStorage.clear();
        this.init();
    }
}
