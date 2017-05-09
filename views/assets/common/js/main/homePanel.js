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
        time = h + ":" + m + ":" + s;
        displayWelcome(h);
        displayTime(weekday, day, month, year, time);
        t = setTimeout(function () {
            startTime()
        }, 1000);
    }
    startTime();

    // display welcome
    function displayWelcome(h) {
        var message;
        if (h >= 05 && h < 12) {
            message = "Bom dia";
        } else if (h >= 12 && h < 20) {
            message = "Boa tarde";
        } else {
            message = "Boa noite";
        }
        var content = message + ", " + user + "!";
        $("#welcome").text(content);
    }
    // display time
    function displayTime(weekday, day, month, year, time) {
        var weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        var months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        var content = weekdays[weekday] + ", " + day + " de " + months[month] + " de " + year + " " + time;
        $("#date").text(content);
    }

});