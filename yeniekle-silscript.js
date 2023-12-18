// script.js
$(document).ready(function () {
    // Yeni şikayet ekleme formu submit olduğunda
    $("#addComplaintForm").submit(function (event) {
        event.preventDefault();
        var complaintDescription = $("#complaintDescription").val();
        addComplaint(complaintDescription);
    });

    // Şikayeti silme fonksiyonu
    window.deleteComplaint = function (complaintId) {
        // Silme işlemlerini gerçekleştir
        console.log("Şikayet silindi:", complaintId);
        // Burada şikayeti listeden kaldırabilir ve backend ile iletişim kurabilirsin
    };
});

// Yeni şikayet ekleyen fonksiyon
function addComplaint(description) {
    // Yeni şikayeti listeye ekle
    var newComplaint = "<li>" + description + " <button class='btn btn-danger btn-sm' onclick='deleteComplaint()'>Sil</button></li>";
    $("#complaintList").append(newComplaint);

    // Yeni şikayeti backend'e eklemek için gerekli işlemleri yapabilirsin
    console.log("Yeni şikayet eklendi:", description);
}
