import React from 'react';

const SocialLogin = () => {
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'
    }, React.createElement('div', {
        className: 'bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl p-6 shadow-2xl border border-white/20 max-w-md w-full'
    }, [
        React.createElement('h2', {
            key: 'title',
            className: 'text-3xl font-black text-white text-center mb-4'
        }, 'Social Login'),
        React.createElement('p', {
            key: 'message',
            className: 'text-white text-center mb-4'
        }, 'Social login feature coming soon!'),
        React.createElement('button', {
            key: 'close',
            onClick: () => {/* close function would go here */},
            className: 'w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl'
        }, 'Close')
    ]));
};

export default SocialLogin;