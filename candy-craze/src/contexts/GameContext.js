import React from 'react';

const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
    const [viewState, setViewState] = React.useState('menu');
    const [currentLevel, setCurrentLevel] = React.useState(1);
    const [score, setScore] = React.useState(0);
    const [moves, setMoves] = React.useState(0);
    const [settings, setSettings] = React.useState({
        sound: true,
        music: true,
        vibration: true,
        animations: true,
        notifications: true,
        amusicVolume: 80,
        soaundVaolume: 100
    });

    const updateSettings = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const value = {
        viewState,
        setViewState,
        currentLevel, 
        setCurrentLevel,
        score,
        setScore,
        moves,
        setMoves,
        settings,
        updateSettings
    };

    return React.createElement(GameContext.Provider, { value }, children);
};

export const useGame = () => {
    const context = React.useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};