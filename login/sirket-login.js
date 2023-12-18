// loginscript.js
$(document).ready(function () {
    // Giriş formunu dinle
    $("#loginForm").submit(function (e) {
        e.preventDefault(); // Formun otomatik gönderilmesini engelle

        // Kullanıcı adı ve şifre kontrolü (örnek kontrol, gerçek bir oturum kontrolü eklenmeli)
        var username = $("#username").val();
        var password = $("#password").val();

        if (username === "vestel" && password === "1234") {
            // Başarılı giriş, ana sayfaya yönlendir
            window.location.href = "sayfalar/sikayetlerim.html";
            localStorage.setItem('username', username);

        } else {
            // Başarısız giriş, hata bildirimi göster
            $("#loginError").show();
        }
    });
});
