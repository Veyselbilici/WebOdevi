$(document).ready(function () {
    // Giriş formunu dinle
    $("#loginForm").submit(function (e) {
        e.preventDefault(); // Formun otomatik gönderilmesini engelle

        // Kullanıcı adı ve şifre kontrolü (örnek kontrol, gerçek bir oturum kontrolü eklenmeli)
        /* TODO kullanici adi  ve sifre kontrolu icin ilkel auth sistemi yapilacak */
        var username = $("#username").val();
        var password = $("#password").val();

        if (username === "veysel" && password === "1234") {
            // Başarılı giriş, ana sayfaya yönlendir
            window.location.href = "/sayfalar/kullanici/sikayetler.html";
            localStorage.setItem('username', username);

        } else {
            // Başarısız giriş, hata bildirimi göster
            $("#loginError").show();
        }
    });
});
