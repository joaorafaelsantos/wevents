/*------------- worldevents -----------*/
/*-------------------------------------*/
/*------------ main/main.js -----------*/

var flag = false;
/* Set the width of the side navigation to 250px */
function openNav() {
    $("#mySidenav").css("width", "100%");
    $("#main").css("opacity", "0.7");
    flag = !flag;;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    $("#mySidenav").css("width", "0px");
    $("#main").css("opacity", "1");
    flag = !flag;
}

$(function () {

    // sidebar configuration
    if ($(window).width() <= 1366) {
        $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");
    }

    $(window).resize(function () {
        if ($(window).width() <= 1366) {
            $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");
            closeNav();
            $("#main").css("padding-left", "0px");
        } else if ($(window).width() > 1366) {
            $("#btnToggle").attr("class", "navbar-toggle pull-left");
            $("#mySidenav").css("width", "300px");
            $("#main").css("padding-left", "300px");
        }
    });



    $("#btnToggle").click(function () {
        var padding = $("#main").css("padding-left");
        if (flag) {
            closeNav();
            $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");

        } else {
            openNav();
            $("#btnToggle").attr("class", "navbar-toggle pull-left");
        }
    });

});