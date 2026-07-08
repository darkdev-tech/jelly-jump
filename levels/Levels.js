export const LEVELS = {
    1: {
        id: 1,
        name: 'First Steps',
        targetScore: 1000,
        moves: 20,
        objective: 'Reach 1000 points',
        difficulty: 'Easy',
        boardLayout: 'standard',
        description: 'Learn the basics of matching jellies!'
    },
    2: {
        id: 2,
        name: 'Getting Started',
        targetScore: 1500,
        moves: 18,
        objective: 'Reach 1500 points',
        difficulty: 'Easy',
        boardLayout: 'standard',
        description: 'Swaps are key!'
    },
    3: {
        id: 3,
        name: 'Blue Collector',
        targetScore: 2000,
        moves: 15,
        objective: 'Collect 10 Blue Jellies',
        difficulty: 'Medium',
        boardLayout: 'standard',
        description: 'Focus on collecting specific colors!'
    },
    4: {
        id: 4,
        name: 'Green Harvest',
        targetScore: 2500,
        moves: 16,
        objective: 'Collect 15 Green Jellies',
        difficulty: 'Medium',
        boardLayout: 'standard',
        description: 'Collect more to earn more points!'
    },
    5: {
        id: 5,
        name: 'Ice Breaker',
        targetScore: 3000,
        moves: 17,
        objective: 'Break 5 Ice Blocks',
        difficulty: 'Medium',
        boardLayout: 'with_ice',
        description: 'Match jellies to melt the ice!'
    },
    6: {
        id: 6,
        name: 'Crate Crusher',
        targetScore: 3500,
        moves: 18,
        objective: 'Destroy 8 Crates',
        difficulty: 'Medium',
        boardLayout: 'with_crates',
        description: 'Smash those crates!'
    },
    7: {
        id: 7,
        name: 'High Score Challenge',
        targetScore: 4000,
        moves: 16,
        objective: 'Reach 4000 points',
        difficulty: 'Hard',
        boardLayout: 'standard',
        description: 'Can you reach the target?'
    },
    8: {
        id: 8,
        name: 'Rainbow Hunter',
        targetScore: 4500,
        moves: 15,
        objective: 'Collect 5 Rainbow Jellies',
        difficulty: 'Hard',
        boardLayout: 'standard',
        description: 'Rainbow jellies are rare!'
    },
    9: {
        id: 9,
        name: 'Chain Breaker',
        targetScore: 5000,
        moves: 14,
        objective: 'Break 6 Chains',
        difficulty: 'Hard',
        boardLayout: 'with_chains',
        description: 'Break the chains to free jellies!'
    },
    10: {
        id: 10,
        name: 'Mini Boss',
        targetScore: 5500,
        moves: 12,
        objective: 'Reach 5500 points',
        difficulty: 'Hard',
        boardLayout: 'boss1',
        description: 'First boss challenge!'
    },
    11: {
        id: 11,
        name: 'Purple Master',
        targetScore: 6000,
        moves: 15,
        objective: 'Collect 20 Purple Jellies',
        difficulty: 'Hard',
        boardLayout: 'standard',
        description: 'Master the purple jellies!'
    },
    12: {
        id: 12,
        name: 'Limited Moves',
        targetScore: 6500,
        moves: 10,
        objective: 'Reach 6500 points in 10 moves',
        difficulty: 'Very Hard',
        boardLayout: 'standard',
        description: 'Use every move wisely!'
    },
    13: {
        id: 13,
        name: 'Bomb Countdown',
        targetScore: 7000,
        moves: 13,
        objective: 'Defuse 3 Bombs',
        difficulty: 'Very Hard',
        boardLayout: 'with_bombs',
        description: 'Race against the clock!'
    },
    14: {
        id: 14,
        name: 'Moving Blocks',
        targetScore: 7500,
        moves: 14,
        objective: 'Move blocks 5 times',
        difficulty: 'Very Hard',
        boardLayout: 'moving_blocks',
        description: 'Blocks move after each turn!'
    },
    15: {
        id: 15,
        name: 'Treasure Hunt',
        targetScore: 8000,
        moves: 16,
        objective: 'Find 3 Treasure Chests',
        difficulty: 'Very Hard',
        boardLayout: 'treasure',
        description: 'Find the hidden treasures!'
    },
    16: {
        id: 16,
        name: 'Crystal Crusher',
        targetScore: 8500,
        moves: 15,
        objective: 'Break 10 Crystal Blocks',
        difficulty: 'Expert',
        boardLayout: 'with_crystals',
        description: 'Crystals are tough!'
    },
    17: {
        id: 17,
        name: 'Double Objective',
        targetScore: 9000,
        moves: 17,
        objective: 'Collect 15 Red AND 15 Yellow',
        difficulty: 'Expert',
        boardLayout: 'standard',
        description: 'Two objectives at once!'
    },
    18: {
        id: 18,
        name: 'Time Challenge',
        targetScore: 9500,
        moves: 12,
        objective: 'Reach 9500 in 12 moves',
        difficulty: 'Expert',
        boardLayout: 'standard',
        description: 'Can you beat the clock?'
    },
    19: {
        id: 19,
        name: 'Master Puzzle',
        targetScore: 10000,
        moves: 18,
        objective: 'Reach 10000 points',
        difficulty: 'Expert',
        boardLayout: 'puzzle',
        description: 'The ultimate puzzle!'
    },
    20: {
        id: 20,
        name: 'Final Temple',
        targetScore: 12000,
        moves: 20,
        objective: 'Defeat the Final Boss',
        difficulty: 'Legendary',
        boardLayout: 'final_boss',
        description: 'Face the final challenge and win the game!'
    }
};

export const ACHIEVEMENTS = [
    { id: 1, name: 'First Match', description: 'Make your first match', icon: '🟢' },
    { id: 2, name: 'Match Master', description: 'Make 100 matches', icon: '🎯' },
    { id: 3, name: 'Combo Master', description: 'Make a 10-combo', icon: '🔥' },
    { id: 4, name: 'Score 1000', description: 'Reach 1000 points in one level', icon: '💯' },
    { id: 5, name: 'Score 5000', description: 'Reach 5000 points in one level', icon: '🏆' },
    { id: 6, name: 'Score 10000', description: 'Reach 10000 points', icon: '👑' },
    { id: 7, name: 'Perfect Level', description: 'Complete a level with 3 stars', icon: '⭐' },
    { id: 8, name: 'All Stars', description: 'Get 3 stars on all levels', icon: '✨' },
    { id: 9, name: 'Treasure Hunter', description: 'Find 5 treasures', icon: '💎' },
    { id: 10, name: 'Jelly King', description: 'Complete level 20', icon: '🤴' },
    { id: 11, name: 'Daily Player', description: 'Claim daily reward 7 days in a row', icon: '🔥' },
    { id: 12, name: 'Shop Lover', description: 'Buy 10 items from the shop', icon: '🛒' },
    { id: 13, name: 'Collector', description: 'Collect 500 jellies', icon: '📦' },
    { id: 14, name: 'Millionaire', description: 'Earn 1,000,000 coins', icon: '💰' },
    { id: 15, name: 'Speed Master', description: 'Complete a level in under 30 seconds', icon: '⚡' }
];
