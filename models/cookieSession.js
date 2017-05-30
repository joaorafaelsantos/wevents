var exports = module.exports = {};

exports.cookieSession = function () {
    global.app.use(global.cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
        // Cookie Options
        maxAge: 1 * 60 * 60 * 1000 // 1 hour
    }));
}