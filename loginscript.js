// loginscript.js
$(document).ready(function () {
    // Giriş formunu dinle
    $("#loginForm").submit(function (e) {
        e.preventDefault(); // Formun otomatik gönderilmesini engelle

        // Kullanıcı adı, şifre ve kullanıcı türü kontrolü (örnek kontrol, gerçek bir oturum kontrolü eklenmeli)
        var username = $("#username").val();
        var password = $("#password").val();
        var userType = $("#userType").val();

        if (userType === "customer") {
            // Müşteri girişi
            if (username === "musteri" && password === "1234") {
                // Başarılı giriş, ana sayfaya yönlendir
                window.location.href = "index.html";
            } else {
                // Başarısız giriş, hata bildirimi göster
                $("#loginError").show();
            }
        } else if (userType === "company") {
            // Firma girişi
            if (username === "firma" && password === "1234") {
                // Başarılı giriş, firma sayfasına yönlendir
                window.location.href = "index.html";
            } else {
                // Başarısız giriş, hata bildirimi göster
                $("#loginError").show();
            }
        } else {
            // Geçerli bir kullanıcı türü seçilmediyse hata bildirimi göster
            $("#loginError").show().text("Lütfen geçerli bir kullanıcı türü seçin.");
        }
    });
});
