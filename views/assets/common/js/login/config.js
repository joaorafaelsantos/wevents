/*------------- worldevents -----------*/
/*-------------------------------------*/
/*---------- login/config.js ----------*/

$(function () {

    // redirect paths
    $("#btnCreateRedir").click(function () {
        $("#content").load("pages/login/create.html");
        cleanStructure();
    });
    $("#btnRecRedir").click(function () {
        $("#content").load("pages/login/recover.html");
        cleanStructure();
    });
    $("#btnSessionRedir").click(function () {
        $("#content").load("pages/login/login.html");
        cleanStructure();
    });

    // function that format the structure
    function cleanStructure() {
        $("#footer").removeAttr("style");
        $("#footer").find("h4").remove();
    }

});