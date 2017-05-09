$(function () {
    //Classe 'active' muda com click de opções da navbar
    $(".nav li").on("click", function () {
        $(".nav li").removeClass("active");
        $(this).addClass("active");
    });

    

    function smoothScrolling() {
        //Adiciona o smooth scrolling a todos os links
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                // Guarda o hash
                var hash = this.hash;
                //Usa o metódo animate() do jQuery para adicionar 'smooth page scroll'
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {
                    window.location.hash = hash;
                });
            }
        });
    }
    smoothScrolling();

    // //Força que a 1º 'língua' seja o Português
    // var srcLangPT = $("#langPT").attr("src");
    // $("#lang").attr("src", srcLangPT);
    // //Aparece a 'língua' seleciona na opção
    // $(".dropdown-menu li a img").click(function () {
    //     $("#lang").attr("src", $(this).attr("src"));
    //     $("#lang").attr("src", $(this).attr("src"));
    // });

});