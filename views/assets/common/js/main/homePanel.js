/*------------- worldevents -----------*/
/*-------------------------------------*/
/*--------- main/homePanel.js ---------*/

$(function () {

    var user = "João";

    // clock
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        weekday = today.getDay();
        day = today.getUTCDate();
        month = today.getMonth();
        year = today.getFullYear();
        time = h + ":" + m;
        displayTime(day, month, year, time);
        t = setTimeout(function () {
            startTime()
        }, 1000);
    }
    startTime();

    // display welcome
    function displayWelcome() {
        var message = "Bem-vindo ";
        var content = user + "!";
        $("#welcome span:first-child").text(message);
        $("#welcome span:last-child").text(content);
    }
    displayWelcome();
    // display time
    function displayTime(day, month, year, time) {
        month = month + 1;
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "." + month + "." + year;
        var content = date + "\n" + time
        $("#date span").text(content);
    }

});