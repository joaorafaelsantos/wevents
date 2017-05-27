var exports = module.exports = {};

exports.connection = function () {

    var connection = mysql.createConnection({
        host: 'webitcloud.net',
        user: 'webitclo_G501',
        password: 'BD1617G501526',
        database: 'webitclo_G501'
    });
    connection.connect();
};