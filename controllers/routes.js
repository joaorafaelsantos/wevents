var login = require("../models/login/login.js");
var events = require("../models/events/events.js");
var access = require("../models/access/access.js");

var exports = module.exports = {};


exports.init = function () {

    // Load homepage
    global.app.get('/', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/index.html").pipe(res);
    });

    // Load portal
    global.app.get('/portal', function (req, res) {
        access.redirectPortal(req, res);
    });

    /* Login */

    // Check login
    global.app.post('/login/checkLogin', function (req, res) {
        login.checkLogin(req, res);
    });

    // Get user
    global.app.post('/login/getUser', function (req, res) {
        login.getUser(req, res);
    });

    // Facebook

    global.app.post('/login/facebook', function (req, res) {
        login.checkLoginFacebook(req, res);
    });

    // Google

    global.app.post('/login/google', function (req, res) {
        login.checkLoginGoogle(req, res);
    });

    // Logout

    global.app.post('/login/logout', function (req, res) {
        login.logout(req, res);
    });

    // Create user ***
    global.app.post('/login/createUser', function (req, res) {
        login.createUser(req, res);
    });

    /* Events */

    // Get Events (only public events)
    global.app.post('/events/getEvents', function (req, res) {
        events.loadEvents(res);
    });

    // Get User Events
    global.app.post('/events/getUserEvents', global.upload.single('img'), function (req, res) {
        events.loadUserEvents(req, res);
    });

    // Create event
    global.app.post('/events/createEvent', function (req, res) {
        events.createEvent(req, res);
    });

    // 404 error handler
    global.app.get('*', function (req, res) {
        global.request("https://webitcloud.net/PW/1617/JAF/App/views/pages/errors/404.html").pipe(res);
    });



    storage = global.multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './upload')
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + global.path.extname(file.originalname))
        }
    })

    // global.app.post('/imginsert', multer({
    //     storage: global.storage,
    //     fileFilter: function (req, file, callback) {
    //         directory = file.filename;
    //         var ext = global.path.extname(file.originalname)
    //         if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //             return callback(res.end('Only images are allowed'), null)
    //         }
    //         callback(null, true)
    //     }
    // }).single('img'), function (req, res) {
    //     /*img is the name that you define in the html input type="file" name="img" */
    //     console.log(req.body);

    //     var connection = mysql.createConnection({
    //         host: 'webitcloud.net',
    //         user: 'webitclo_jaf2',
    //         password: 'sNRJy8t@yLzK',
    //         database: 'webitclo_G501'
    //     });
    //     connection.connect();

    //     var query = connection.query("INSERT INTO Imagem (img) VALUES ('" + req.file.filename + "');", function (err, rows) {

    //         if (err)
    //             throw err;
    //         res.redirect('/image');
    //     });
    // });
    // global.app.use(global.express.static('upload'))




};