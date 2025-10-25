import React from 'react';
import { useGame } from '../contexts/GameContext.js';
import { PlayerDatabase } from '../utils/database.js';
import { LEVELS } from '../constants.js';

const GameScreen = () => {
    const { setViewState, currentLevel, score, setScore, moves, setMoves, playerData } = useGame();
    const [gameCompleted, setGameCompleted] = React.useState(false);

    const currentLevelData = LEVELS.find(level => level.level === currentLevel);

    // Initialize moves when level starts
    React.useEffect(() => {
        if (currentLevelData) {
            setMoves(currentLevelData.moves);
            setScore(0);
            setGameCompleted(false);
        }
    }, [currentLevel]);

    // Check if level is completed
    React.useEffect(() => {
        if (currentLevelData && score >= currentLevelData.targetScore && !gameCompleted) {
            setGameCompleted(true);
            
            // Update player progress
            const updatedData = PlayerDatabase.unlockNextLevel(currentLevel);
            
            // Show completion message
            setTimeout(() => {
                if (updatedData && updatedData.level > currentLevel) {
                    alert(`🎉 Level ${currentLevel} Completed! 🎉\nLevel ${updatedData.level} unlocked!`);
                } else {
                    alert(`🎉 Level ${currentLevel} Completed! 🎉`);
                }
            }, 500);
        }
    }, [score, currentLevel, gameCompleted]);

    const handleScoreClick = () => {
        if (!gameCompleted && moves > 0) {
            setScore(prev => prev + 100);
            setMoves(prev => prev - 1);
        }
    };

    const handleBackToLevels = () => {
        setViewState('level_select');
    };

    return React.createElement('div', {
        className: 'bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 max-w-md w-full'
    }, [
        // Header
        React.createElement('div', {
            key: 'header',
            className: 'flex justify-between items-center mb-6'
        }, [
            React.createElement('button', {
                key: 'back',
                onClick: handleBackToLevels,
                className: 'bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200'
            }, '← Menu'),
            
            React.createElement('div', {
                key: 'title',
                className: 'text-center'
            }, [
                React.createElement('h2', {
                    key: 'level',
                    className: 'text-2xl font-black text-white'
                }, `LEVEL ${currentLevel}`),
                React.createElement('p', {
                    key: 'target',
                    className: 'text-white/80 text-sm'
                }, `Target: ${currentLevelData?.targetScore || 1000}`)
            ]),
            
            React.createElement('div', {
                key: 'stats',
                className: 'text-right'
            }, [
                React.createElement('div', {
                    key: 'score',
                    className: 'text-white font-bold text-lg'
                }, `Score: ${score}`),
                React.createElement('div', {
                    key: 'moves',
                    className: 'text-white/80 text-sm'
                }, `Moves: ${moves}`)
            ])
        ]),
        
        // Game Area
        React.createElement('div', {
            key: 'game-area',
            className: `bg-black/30 rounded-2xl p-6 mb-4 text-center transition-all duration-300 ${
                gameCompleted ? 'border-2 border-green-400 bg-green-500/20' : ''
            }`
        }, [
            gameCompleted ? 
                React.createElement('div', {
                    key: 'completed'
                }, [
                    React.createElement('div', {
                        key: 'icon',
                        className: 'text-4xl mb-4'
                    }, '🎉'),
                    React.createElement('h3', {
                        key: 'title',
                        className: 'text-2xl font-black text-white mb-2'
                    }, 'LEVEL COMPLETED!'),
                    React.createElement('p', {
                        key: 'message',
                        className: 'text-white/80 mb-4'
                    }, `You scored ${score} points!`),
                    React.createElement('div', {
                        key: 'next-level',
                        className: 'bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold'
                    }, 'Next Level Unlocked! 🚀')
                ])
            :
                React.createElement('div', {
                    key: 'playing'
                }, [
                    React.createElement('p', {
                        key: 'message',
                        className: 'text-white mb-4 text-lg'
                    }, `Level ${currentLevel} - ${currentLevelData?.difficulty || 'Easy'}`),
                    React.createElement('button', {
                        key: 'score-btn',
                        onClick: handleScoreClick,
                        disabled: moves <= 0,
                        className: `text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 ${
                            moves > 0 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                                : 'bg-gray-500 cursor-not-allowed'
                        }`
                    }, moves > 0 ? 'Click for +100 points!' : 'No moves left!'),
                    React.createElement('div', {
                        key: 'progress',
                        className: 'mt-4'
                    }, [
                        React.createElement('div', {
                            key: 'progress-bar',
                            className: 'w-full bg-white/20 rounded-full h-3 mb-1'
                        }, React.createElement('div', {
                            className: 'bg-gradient-to-r from-green-400 to-cyan-400 h-3 rounded-full transition-all duration-500',
                            style: { 
                                width: `${Math.min((score / (currentLevelData?.targetScore || 1000)) * 100, 100)}%` 
                            }
                        })),
                        React.createElement('p', {
                            key: 'progress-text',
                            className: 'text-white/70 text-sm'
                        }, `Progress: ${score}/${currentLevelData?.targetScore || 1000}`)
                    ])
                ])
        ]),
        
        // Action Buttons
        React.createElement('div', {
            key: 'actions',
            className: 'space-y-3'
        }, [
            React.createElement('button', {
                key: 'levels-btn',
                onClick: handleBackToLevels,
                className: 'w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300'
            }, 'Back to Levels'),
            
            gameCompleted && React.createElement('button', {
                key: 'next-level-btn',
                onClick: () => {
                    const nextLevel = currentLevel + 1;
                    if (nextLevel <= LEVELS.length) {
                        setCurrentLevel(nextLevel);
                        setScore(0);
                        setGameCompleted(false);
                    } else {
                        alert('🎊 All levels completed! You are a Candy Master! 🎊');
                        handleBackToLevels();
                    }
                },
                className: 'w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105'
            }, 'Play Next Level →')
        ])
    ]);
};

export default GameScreen;