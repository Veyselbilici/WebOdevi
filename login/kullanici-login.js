$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
      url: "http://localhost:3000/kullanici",
      type: "GET",
      success: function (data) {
        var users = data;
        console.log(data);
        var user = users.find(function (user) {
          return user.kullaniciAdi === username && user.sifre === password;
        });

        if (user) {
          window.location.href = "/sayfalar/kullanici/sikayetler.html";
          localStorage.setItem("kullaniciId", user.id);
        } else {
          $("#loginError").show();
        }
      },
      error: function (error) {
        console.log("Error: ", error);
      },
    });
  });
});
