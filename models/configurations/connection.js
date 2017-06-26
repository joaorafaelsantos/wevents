var exports = module.exports = {};

exports.connection = function () {

    global.connection = mysql.createConnection({
        host: 'webitcloud.net',
        user: 'webitclo_jaf5',
        password: 'sNRJy8t@yLzK',
        database: 'webitclo_G501'
    });
    global.connection.connect();
};