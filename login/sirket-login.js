$(document).ready(function () {
    $("#loginForm").submit(function (e) {
      e.preventDefault();
  
      var username = $("#username").val();
      var password = $("#password").val();
  
      $.ajax({
        url: "http://localhost:3000/sirket",
        type: "GET",
        success: function (data) {
          var sirketler = data;
          var sirket = sirketler.find(function (sirket) {
            return sirket.kullaniciAdi === username && sirket.sifre === password;
          });
  
          if (sirket) {
            window.location.href = "/sayfalar/sirket/sikayetlerim.html";
            localStorage.setItem("kullaniciId", sirket.id);
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
