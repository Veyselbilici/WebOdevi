$(document).ready(function () {
  $("#sikayetForm").on("submit", function (e) {
    e.preventDefault();

    var sikayet = {
      sirket: $("#sirket").val(),
      baslik: $("#baslik").val(),
      sikayet: $("#sikayet").val(),
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/sikayet",
      data: JSON.stringify(sikayet),
      dataType: "json",
      contentType: "application/json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });
  });
});

