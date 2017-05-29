var exports = module.exports = {};

exports.bodyParser = function () {
    global.app.use(global.bodyParser.urlencoded({
        extended: true
    }));
    global.app.use(global.bodyParser.json())
}