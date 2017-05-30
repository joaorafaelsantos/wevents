var exports = module.exports = {};

exports.cookieSession = function () {
    global.app.use(global.cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
        // Cookie Options
        maxAge: 0.5 * 60 * 60 * 1000 // 30 minutes
    }));
}