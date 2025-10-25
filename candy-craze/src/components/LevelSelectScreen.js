import React from 'react';
import { useGame } from '../contexts/GameContext.js';
import { LEVELS } from '../constants.js';

const LevelSelectScreen = () => {
    const { setViewState, setCurrentLevel, playerData } = useGame();

    // Check if a level is locked
    const isLevelLocked = (levelNumber) => {
        // Level 1 is always unlocked
        if (levelNumber === 1) return false;
        
        // Check if previous level is completed
        const previousLevel = levelNumber - 1;
        return !playerData?.completedLevels?.includes(previousLevel);
    };

    // Get level status
    const getLevelStatus = (levelNumber) => {
        if (levelNumber === 1) return 'available';
        if (isLevelLocked(levelNumber)) return 'locked';
        return 'available';
    };

    const handleLevelSelect = (levelNumber) => {
        if (!isLevelLocked(levelNumber)) {
            setCurrentLevel(levelNumber);
            setViewState('game');
        }
    };

    return React.createElement('div', {
        className: 'bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 max-w-2xl w-full'
    }, [
        // Header
        React.createElement('div', {
            key: 'header',
            className: 'flex items-center justify-between mb-6'
        }, [
            React.createElement('button', {
                key: 'back',
                onClick: () => setViewState('menu'),
                className: 'bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2'
            }, [
                React.createElement('span', { key: 'arrow' }, '←'),
                React.createElement('span', { key: 'text' }, 'Menu')
            ]),
            
            React.createElement('h2', {
                key: 'title',
                className: 'text-4xl font-black text-white text-center'
            }, 'SELECT LEVEL'),
            
            React.createElement('div', {
                key: 'player-stats',
                className: 'bg-white/10 rounded-xl p-3 text-right min-w-[120px]'
            }, [
                React.createElement('p', {
                    key: 'level',
                    className: 'text-white font-bold text-sm'
                }, `Level ${playerData?.level || 1}`),
                React.createElement('p', {
                    key: 'score',
                    className: 'text-white/70 text-xs'
                }, `${playerData?.score || 0} points`)
            ])
        ]),

        // Levels Grid
        React.createElement('div', {
            key: 'levels',
            className: 'grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2'
        }, LEVELS.map(level => {
            const isLocked = isLevelLocked(level.level);
            const isCompleted = playerData?.completedLevels?.includes(level.level);
            
            return React.createElement('div', {
                key: level.level,
                className: `relative rounded-2xl transition-all duration-300 ${
                    isLocked 
                        ? 'opacity-60 cursor-not-allowed' 
                        : 'cursor-pointer transform hover:scale-105'
                }`
            }, React.createElement('button', {
                onClick: () => handleLevelSelect(level.level),
                disabled: isLocked,
                className: `w-full h-full p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden ${
                    isLocked 
                        ? 'bg-gray-600' 
                        : isCompleted
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                            : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white font-bold transition-all duration-300`
            }, [
                // Level Number
                React.createElement('div', {
                    key: 'number',
                    className: 'text-3xl font-black mb-2'
                }, level.level),
                
                // Difficulty Badge
                React.createElement('span', {
                    key: 'difficulty',
                    className: `px-2 py-1 rounded-full text-xs font-bold ${
                        level.difficulty === 'Easy' ? 'bg-green-500' :
                        level.difficulty === 'Medium' ? 'bg-yellow-500' :
                        level.difficulty === 'Hard' ? 'bg-orange-500' :
                        'bg-red-500'
                    } text-white mb-2`
                }, level.difficulty),
                
                // Level Info
                React.createElement('div', {
                    key: 'info',
                    className: 'text-center text-xs space-y-1'
                }, [
                    React.createElement('div', { key: 'target' }, `Target: ${level.targetScore}`),
                    React.createElement('div', { key: 'moves' }, `Moves: ${level.moves}`)
                ]),
                
                // Lock Icon for locked levels
                isLocked && React.createElement('div', {
                    key: 'lock',
                    className: 'absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl'
                }, React.createElement('span', { 
                    className: 'text-2xl'
                }, '🔒')),
                
                // Star for completed levels
                isCompleted && React.createElement('div', {
                    key: 'star',
                    className: 'absolute top-2 right-2 text-yellow-400 text-lg'
                }, '⭐'),
                
                // Current level indicator
                !isLocked && !isCompleted && level.level === playerData?.level && React.createElement('div', {
                    key: 'current',
                    className: 'absolute top-2 right-2 text-white text-lg'
                }, '🎯')
            ]));
        })),
        
        // Progress Info
        React.createElement('div', {
            key: 'progress',
            className: 'mt-6 text-center text-white/60 text-sm'
        }, [
            React.createElement('p', { key: 'info' }, 
                `Progress: ${playerData?.completedLevels?.length || 1}/${LEVELS.length} levels completed`
            ),
            React.createElement('p', { key: 'hint' }, 
                'Complete levels to unlock new challenges!'
            )
        ])
    ]);
};

export default LevelSelectScreen;