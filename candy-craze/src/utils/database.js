export class PlayerDatabase {
    static STORAGE_KEY = 'candy_craze_player_data';

    static getPlayerData() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading player data:', error);
            return null;
        }
    }

    static savePlayerData(playerData) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playerData));
            return true;
        } catch (error) {
            console.error('Error saving player data:', error);
            return false;
        }
    }

    static initializeNewPlayer() {
        const defaultData = {
            playerId: 'player_' + Date.now(),
            name: 'Player',
            level: 1,
            score: 0,
            completedLevels: [1], // Only level 1 starts as completed
            loginMethod: 'guest',
            lastPlayed: new Date().toISOString()
        };
        this.savePlayerData(defaultData);
        return defaultData;
    }

    static unlockNextLevel(currentLevel) {
        const data = this.getPlayerData();
        if (data) {
            // Mark current level as completed if not already
            if (!data.completedLevels.includes(currentLevel)) {
                data.completedLevels.push(currentLevel);
            }
            
            // Unlock next level
            const nextLevel = currentLevel + 1;
            if (!data.completedLevels.includes(nextLevel)) {
                data.completedLevels.push(nextLevel);
            }
            
            // Update current level to the highest completed level
            data.level = Math.max(...data.completedLevels);
            data.lastPlayed = new Date().toISOString();
            this.savePlayerData(data);
        }
        return data;
    }

    static updateLevelProgress(level, score) {
        const data = this.getPlayerData();
        if (data) {
            data.level = level;
            data.score = Math.max(data.score, score); // Keep highest score
            data.lastPlayed = new Date().toISOString();
            this.savePlayerData(data);
        }
        return data;
    }
}