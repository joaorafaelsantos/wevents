/*------------- worldevents -----------*/
/*-------------------------------------*/
/*----------- index/index.js ----------*/

$(function () {

    // click event change 'active' class
    $(".nav li").on("click", function () {
        $(".nav li").removeClass("active");
        $(this).addClass("active");
        $("#navbar-collapse").removeClass("in");
        $("#btnToggle").addClass("collapsed");
    });

    // click event change btnViewMore class (plus/minus)
    function btnViewMore(id) {
        var tempElement = $("#" + id + "").find("i");
        var tempSpan = $("#" + id + "").find("span");
        var tempHref = $(this).closest('ul').attr('href');
        if (tempElement.attr("class") == "fa fa-plus-square-o fa-2x") {
            tempElement.attr("class", "fa fa-minus-square-o fa-2x");
            $(tempSpan).attr("title", "Ver menos").tooltip('fixTitle');
        } else {
            tempElement.attr("class", "fa fa-plus-square-o fa-2x")
            $(tempSpan).attr("title", "Ver mais").tooltip('fixTitle');
        }
    }

    $("#btnConfViewMore").click(function () {
        btnViewMore("btnConfViewMore");
    });
    $("#btnProjViewMore").click(function () {
        btnViewMore("btnProjViewMore");
    });
    $("#btnReunViewMore").click(function () {
        btnViewMore("btnReunViewMore");
    });
    $("#btnWorkViewMore").click(function () {
        btnViewMore("btnWorkViewMore");
    });
    $('[rel="tooltip"]').tooltip();


    // When scroll stops the video

    $(window).scroll(function () {
        var aboutSectionClass = $("li").first().attr("class");
        var src = $("#player").attr("src");
        var url = "https://www.youtube.com/embed/txTqtm58AqM";
        if (aboutSectionClass != "active" && src == url + "?rel=0&controls=0&autoplay=1;showinfo=0") {
            $("#player").attr("src", url + "?rel=0&controls=0&autoplay=0;showinfo=0");
        }
    });

});