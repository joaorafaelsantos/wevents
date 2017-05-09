/*------------- worldevents -----------*/
/*-------------------------------------*/
/*------------ main/main.js -----------*/

$(function () {

    // sidebar configuration
    if ($(window).width() <= 768) {
        $("#wrapper").attr("class", "");
        $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");
    }

    $(window).resize(function () {
        if ($(window).width() <= 768) {
            $("#wrapper").attr("class", "");
            $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");
        } else if ($(window).width() > 768 && $("#wrapper").attr("class") != "toggled") {
            $("#wrapper").attr("class", "toggled");
            $("#btnToggle").attr("class", "navbar-toggle pull-left");
        }
    });

    $('#btnToggle').on('click', function () {
        if ($("#wrapper").attr("class") == "toggled") {
            $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");
        } else {
            $("#btnToggle").attr("class", "navbar-toggle pull-left");
        }
    });

    $("#btnToggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });


});