export const GAME_CONFIG = {
    // Game Dimensions
    WIDTH: 1080,
    HEIGHT: 1920,
    BOARD_SIZE: 8, // 8x8 board
    TILE_SIZE: 100,
    
    // Game Settings
    MIN_MATCH: 3,
    FPS: 60,
    
    // Colors (Jelly Types)
    JELLY_TYPES: {
        RED: 0,
        BLUE: 1,
        GREEN: 2,
        YELLOW: 3,
        PURPLE: 4,
        ORANGE: 5
    },
    
    // Special Jellies
    SPECIAL_TYPES: {
        NONE: 0,
        STRIPED: 1,
        WRAPPED: 2,
        RAINBOW_BOMB: 3,
        LIGHTNING: 4,
        EXPLOSIVE: 5,
        FREEZE: 6
    },
    
    // Obstacles
    OBSTACLE_TYPES: {
        NONE: 0,
        ICE: 1,
        CRATE: 2,
        CHAIN: 3,
        CRYSTAL: 4
    },
    
    // Animation Durations (ms)
    ANIMATION_DURATION: 300,
    MATCH_ANIMATION_DURATION: 400,
    FALL_DURATION: 200,
    
    // Scoring
    BASE_SCORE: 100,
    MATCH_3_MULTIPLIER: 1,
    MATCH_4_MULTIPLIER: 3,
    MATCH_5_MULTIPLIER: 5,
    SPECIAL_MULTIPLIER: 2,
    COMBO_MULTIPLIER: 1.5,
    
    // Store Keys
    STORAGE_KEYS: {
        PLAYER_DATA: 'jelly_jump_player',
        LEVELS: 'jelly_jump_levels',
        LEADERBOARD: 'jelly_jump_leaderboard',
        SETTINGS: 'jelly_jump_settings',
        ACHIEVEMENTS: 'jelly_jump_achievements',
        DAILY_REWARD: 'jelly_jump_daily_reward'
    },
    
    // Debug
    DEBUG: false
};

export const COLORS = {
    RED: 0xFF4444,
    BLUE: 0x4444FF,
    GREEN: 0x44FF44,
    YELLOW: 0xFFFF00,
    PURPLE: 0xFF44FF,
    ORANGE: 0xFF8800,
    BACKGROUND: 0x1a1a2e,
    UI_DARK: 0x0f3460,
    UI_LIGHT: 0x16c784,
    TEXT: 0xFFFFFF
};

export const JELLY_COLORS = [
    { color: 0xFF6B6B, name: 'Red', emoji: '🔴' },
    { color: 0x4ECDC4, name: 'Blue', emoji: '🔵' },
    { color: 0x95E1D3, name: 'Green', emoji: '💚' },
    { color: 0xFFE66D, name: 'Yellow', emoji: '💛' },
    { color: 0xC7CEEA, name: 'Purple', emoji: '💜' },
    { color: 0xFFCC99, name: 'Orange', emoji: '🧡' }
];