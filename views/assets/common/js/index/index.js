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
        if (tempElement.attr("class") == "fa fa-plus-square-o fa-2x") {
            tempElement.attr("class", "fa fa-minus-square-o fa-2x");
        } else {
            tempElement.attr("class", "fa fa-plus-square-o fa-2x")
        }
    }

    $("#btnConfViewMore").click(function () {
        closeAll("projRow", "reunRow", "workRow");
        btnViewMore("btnConfViewMore");
    });
    $("#btnProjViewMore").click(function () {
        closeAll("confRow", "reunRow", "workRow");
        btnViewMore("btnProjViewMore");
    });
    $("#btnReunViewMore").click(function () {
        closeAll("confRow", "projRow", "workRow");
        btnViewMore("btnReunViewMore");
    });
    $("#btnWorkViewMore").click(function () {
        closeAll("confRow", "projRow", "reunRow");
        btnViewMore("btnWorkViewMore");
    });

    // Close rows on button event click
    function closeAll(fiRow, seRow, thRow) {
        var rows = [];
        rows.push(fiRow, seRow, thRow);
        for (var i = 0; i < rows.length; i++) {
            var tempRow = rows[i];
            var classRow = $("#" + tempRow).attr("class");
            if (classRow == "row collapse in") {
                $("#" + tempRow).attr("class", "collapse");
                var tempBtn = $("#" + tempRow).next().attr("id");
                $("#" + tempBtn + " i").attr("class", "fa fa-plus-square-o fa-2x");;
            }
        }
    }


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