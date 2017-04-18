$(function () {


  function teste() {
    var request = $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      url: "wek.webitcloud.net/home2"
    });
    request.done(function (data) {
      console.log(JSON.stringify(data));
    });
  }

  $("#btnClick").click(function () {
    teste();
  })

});