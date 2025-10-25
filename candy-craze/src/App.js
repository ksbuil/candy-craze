import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext.js';
import MainMenu from './components/MainMenu.js';
import LevelSelectScreen from './components/LevelSelectScreen.js';
import GameScreen from './components/GameScreen.js';

const AppContent = () => {
    const { viewState } = useGame();

    const renderScreen = () => {
        switch (viewState) {
            case 'menu':
                return React.createElement(MainMenu);
            case 'level_select':
                return React.createElement(LevelSelectScreen);
            case 'game':
                return React.createElement(GameScreen);
            default:
                return React.createElement(MainMenu);
        }
    };

    return React.createElement('div', {
        className: 'w-screen h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4'
    }, renderScreen());
};

const App = () => {
    return React.createElement(GameProvider, {}, 
        React.createElement(AppContent)
    );
};

export default App;