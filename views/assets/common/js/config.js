/*------------- worldevents -----------*/
/*-------------------------------------*/
/*------------- config.js -------------*/

// service worker
if ('serviceWorker' in navigator) {
    // console.log("Will the service worker register?");
    navigator.serviceWorker.register('service-worker.js')
        .then(function (reg) {
            // console.log("Yes, it did.");
        }).catch(function (err) {
            // console.log("No it didn't. This happened: ", err)
        });
}

$(function () {

    // scrolling
    function smoothScrolling() {
        // add smooth scrolling to all a
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                // save hash
                var hash = this.hash;
                // use method animate() of jquery to add 'smooth page scroll'
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {
                    window.location.hash = hash;
                });
            }
        });
    }
    smoothScrolling();

    // console message
    if (typeof console != "undefined") {
        console.log("%cworldevents - The soul of your events!", "color: rgb(13, 182, 184); font-family: Helvetica; font-size: 200%;");
        console.log("%cIf you have any questions, please don't hesitate to contact us.", "color: rgb(189, 190, 192); font-family: Helvetica; font-size: 115%;");
        console.log("%cjaf@webitcloud.net", "color: rgb(189, 190, 192); font-family: Helvetica; font-size: 115%;");
        console.log("");
    }

    // detect user browser language to automatically translate the page
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang[0] + userLang[1];
    var langs = ['en', 'zh', 'fr', 'de', 'it', 'pt', 'ru', 'es']
    var defaultLang = '';
    for (var i = 0; i < langs.length; i++) {
        if (langs[i] == userLang && langs[i] != 'pt') {
            defaultLang = "pt|" + userLang;
            doGTranslate(defaultLang);
            active();
            break;
        } else if (langs[i] == userLang && langs[i] == 'pt') {
            active();
            break;
        } else if (langs[i] = !userLang) {
            doGTranslate('pt|en');
            active();
            break;
        }
    }

    // click event change 'active' class
    $("#flags a").on("click", function () {
        $("#flags a").removeClass("active");
        $(this).addClass("active");
    });

    function active() {
        $("#flags a").removeClass("active");
        $("#" + userLang).addClass("active");
    }

    var auth = false;

    $("#reservedArea").click(function () {
        if (!auth) {
            $("nav").remove();
            $("#content").load("pages/login/login.html");
            $("#footer").removeAttr("style");
            $("#footer").find("h4").remove();
        } else {
            window.location.replace("main.html");
        }
    });



});