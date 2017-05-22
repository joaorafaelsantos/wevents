/*------------- worldevents -----------*/
/*-------------------------------------*/
/*---------- main/content.js ----------*/

$(function () {

    // Load begin page
    function loadBegin() {
        $("#content").load("pages/main/begin.html");
    }

    // Load my events page
    function loadMyEvents() {
        $("#content").load("pages/main/myEvents.html");
    }

    // Load create event page
    function loadCreateEvent() {
        $("#content").load("pages/main/createEvent.html");
    }

    // Load subscribed events page
    function loadSubscribedEvents() {
        $("#content").load("pages/main/subscribedEvents.html");
    }

    // Button begin
    $("#btnBegin").click(function () {
        loadBegin();
        close();
    });

    // Button my events
    $("#btnMyEvents").click(function () {
        loadMyEvents();
        close();
    });

    // Button create event
    $("#btnCreateEvent").click(function () {
        loadCreateEvent();
        close();
    });

    // Button my events
    $("#btnSubscribedEvents").click(function () {
        loadSubscribedEvents();
        close();
    });

    // Load begin page on start
    loadBegin();

    // If windows smaller or equal than 1366, close sidebar and do toggle animation
    function close() {
        if ($(window).width() <= 1366) {
            closeNav();
            $("#btnToggle").attr("class", "navbar-toggle collapsed pull-left");
        }
    }

    // Active class on a 
    $('.sidenav a').click(function (e) {
        e.preventDefault();
        $('.sidenav a').removeClass('active');
        $(this).addClass('active');
    });

});