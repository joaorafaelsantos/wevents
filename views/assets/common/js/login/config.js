/*------------- worldevents -----------*/
/*-------------------------------------*/
/*---------- login/config.js ----------*/

$(function () {
    $("#btnCreateRedir").click(function () {
        $("#content").load("pages/login/create.html");
        $("#footer").css({
            "border-bottom": "thin solid rgba(189, 190, 192, 0.5)"
        });
    });
    $("#btnRecRedir").click(function () {
        $("#content").load("pages/login/recover.html");
    });
    $("#btnSessionRedir").click(function () {
        $("#content").load("pages/login/login.html");
    });


});