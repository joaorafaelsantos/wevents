var exports = module.exports = {};

exports.connection = function () {

    global.connection = mysql.createConnection({
        host: 'webitcloud.net',
        user: 'webitclo_G501',
        password: 'PW2G501567',
        database: 'webitclo_G501'

        // sNRJy8t@yLzK
    });
    global.connection.connect();
};