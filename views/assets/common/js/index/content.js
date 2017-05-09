/*------------- worldevents -----------*/
/*-------------------------------------*/
/*---------- index/content.js ---------*/

$(function () {

    var data = {};
    data.title = "title";
    data.message = "message";

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/',
        success: function (data) {
            console.log('success');
            console.log(JSON.stringify(data));
        }
    });


});