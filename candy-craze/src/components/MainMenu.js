import React from 'react';
import { useGame } from '../contexts/GameContext.js';

const MainMenu = () => {
    const { setViewState, playerData } = useGame();

    return React.createElement('div', {
        className: 'bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full'
    }, [
        React.createElement('h1', {
            key: 'title',
            className: 'text-6xl font-black text-center text-white mb-4'
        }, 'CANDY CRAZE'),
        
        React.createElement('div', {
            key: 'buttons',
            className: 'space-y-4'
        }, [
            React.createElement('button', {
                key: 'play',
                onClick: () => setViewState('level_select'),
                className: 'w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl py-4 px-6 rounded-2xl transition-all duration-300'
            }, '🎮 PLAY GAME'),
            
            React.createElement('button', {
                key: 'google',
                onClick: () => alert('Google login would go here'),
                className: 'w-full bg-white hover:bg-gray-100 text-gray-800 font-bold text-xl py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3'
            }, [
                React.createElement('span', { key: 'icon' }, 'G'),
                React.createElement('span', { key: 'text' }, 'Sign in with Google')
            ]),
            
            React.createElement('button', {
                key: 'facebook',
                onClick: () => alert('Facebook login would go here'),
                className: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3'
            }, [
                React.createElement('span', { key: 'icon' }, 'f'),
                React.createElement('span', { key: 'text' }, 'Connect with Facebook')
            ])
        ]),
        
        playerData && React.createElement('div', {
            key: 'player-info',
            className: 'mt-4 text-center text-white/60 text-sm'
        }, `Welcome back! Level ${playerData.level}`)
    ]);
};

// Add this default export
export default MainMenu;