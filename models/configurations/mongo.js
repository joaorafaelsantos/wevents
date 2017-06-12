var bodyParser = require("./bodyParser.js");

var exports = module.exports = {};

bodyParser.bodyParser();

var url = "mongodb://jaf:123@ds161471.mlab.com:61471/pw2_jaf";

exports.readMessages = function (response) {

    global.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection('messages').find({}, {
            "_id": 0
        }).toArray(function (err, result) {
            if (err) throw err;
            response.send(result)
            db.close();
        });
    });
};

exports.saveMessages = function (request, response) {

    global.MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var myobj = {
            name: request.body.name,
            email: request.body.email,
            message: request.body.comment
        };
        db.collection("messages").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            response.send("success");
            db.close();
        });
    });

};