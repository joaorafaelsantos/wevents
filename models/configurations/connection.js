var exports = module.exports = {};

exports.connection = function () {

    global.connection = mysql.createConnection({
        host: 'webitcloud.net',
        user: 'webitclo_jaf3',
        password: 'sNRJy8t@yLzK',
        database: 'webitclo_G501'

        // sNRJy8t@yLzK
    });
    global.connection.connect();
};