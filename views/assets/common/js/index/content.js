/*------------- worldevents -----------*/
/*-------------------------------------*/
/*---------- index/content.js ---------*/

$(function () {

    //  Global variables

    var conferences = [];
    var projects = [];
    var reunions = [];
    var workshops = [];

    var data = {};

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/loadEvents',
        success: function (data) {
            organizeData(data)
            structureJson();
            renderTemplate("#confRow", conferences, "Conferences");
            renderTemplate("#projRow", projects, "Projects");
            renderTemplate("#reunRow", reunions, "Reunions");
            renderTemplate("#workRow", workshops, "Workshops");
        }
    });

    // Structure to json pattern
    function structureJson() {
        conferences = {
            "conferences": conferences
        };
        projects = {
            "projects": projects
        };
        reunions = {
            "reunions": reunions
        };
        workshops = {
            "workshops": workshops
        };
    }

    // Organize the database fields into our project variables
    function organizeData(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].descricao == 'Conferência') {
                conferences.push(array[i]);
                array[i].data_desc = structureDate(array[i].data_desc);
            } else if (array[i].descricao == 'Projeto') {
                projects.push(array[i]);
                array[i].data_desc = structureDate(array[i].data_desc);
            } else if (array[i].descricao == 'Reunião') {
                reunions.push(array[i]);
                array[i].data_desc = structureDate(array[i].data_desc);
            } else if (array[i].descricao == 'Workshop') {
                workshops.push(array[i]);
                array[i].data_desc = structureDate(array[i].data_desc);
            }
        }
        // Organize the MySql default pattern of date to our traditional system (day/month/year)
        function structureDate(date) {
            date = date.split("-");
            date = date[2].charAt(0) + date[2].charAt(1) + "/" + date[1] + "/" + date[0];
            return date;
        }
    }

    // Mustache function to render the template to the given data
    function renderTemplate(container, data, template) {
        var template = "#mustache" + template;
        var targetContainer = $(container),
            template = $(template).html();
        var html = Mustache.to_html(template, data);
        $(targetContainer).html(html);
    }
});