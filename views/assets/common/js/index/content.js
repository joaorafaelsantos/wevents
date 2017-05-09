/*------------- worldevents -----------*/
/*-------------------------------------*/
/*---------- index/content.js ---------*/

$(function () {

    var data = {};
    data.title = "title";
    data.message = "message";

    // $.ajax({
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     url: 'http://localhost:3000/loadEvents',
    //     success: function (data) {
    //         console.log('success');
    //         console.log(JSON.stringify(data));
    //     }
    // });

    var item = {
            titulo: "Templates client-side com Mustache.js",
            permalink: "http://tableless.com.br/templates-client-side-com-mustache-js",
            thumb: "mustache.jpg"
        },
        template = document.getElementById('item-template').innerHTML;
    output = Mustache.render(template, item);
    console.log(output);





});