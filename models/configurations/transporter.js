var exports = module.exports = {};

exports.transporter = function () {

    global.transporter = nodemailer.createTransport({
        host: 'cp26.webserver.pt',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'jaf@webitcloud.net',
            pass: 'PW2G501567'
        }
    });
};