import { CandyType } from './types.js';

export const BOARD_SIZE = 8;
export const LEVELS = [
    { level: 1, targetScore: 1000, moves: 15, difficulty: 'Easy' },
    { level: 2, targetScore: 2500, moves: 20, difficulty: 'Easy' },
    { level: 3, targetScore: 5000, moves: 25, difficulty: 'Medium' },
    { level: 4, targetScore: 8000, moves: 20, difficulty: 'Medium' },
    { level: 5, targetScore: 12000, moves: 18, difficulty: 'Hard' },
    { level: 6, targetScore: 18000, moves: 15, difficulty: 'Hard' },
    { level: 7, targetScore: 25000, moves: 20, difficulty: 'Expert' },
    { level: 8, targetScore: 35000, moves: 15, difficulty: 'Expert' },
    { level: 9, targetScore: 50000, moves: 12, difficulty: 'Master' },
    { level: 10, targetScore: 75000, moves: 10, difficulty: 'Master' }
];

export const CANDY_COLORS = {
    [CandyType.RED]: 'bg-red-500',
    [CandyType.BLUE]: 'bg-blue-500',
    [CandyType.GREEN]: 'bg-green-500',
    [CandyType.YELLOW]: 'bg-yellow-400',
    [CandyType.PURPLE]: 'bg-purple-500',
    [CandyType.ORANGE]: 'bg-orange-500'
};