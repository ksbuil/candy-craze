import React from 'react';

const DailyTasks = () => {
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'
    }, React.createElement('div', {
        className: 'bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 shadow-2xl border border-white/20 max-w-md w-full'
    }, [
        React.createElement('h2', {
            key: 'title',
            className: 'text-3xl font-black text-white text-center mb-4'
        }, 'Daily Tasks'),
        React.createElement('p', {
            key: 'message',
            className: 'text-white text-center mb-4'
        }, 'Daily tasks feature coming soon!'),
        React.createElement('button', {
            key: 'close',
            onClick: () => {/* close function would go here */},
            className: 'w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl'
        }, 'Close')
    ]));
};

export default DailyTasks;