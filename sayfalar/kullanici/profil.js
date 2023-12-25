$(document).ready(function () {
  var userId = localStorage.getItem("kullaniciId");
  $.ajax({
    url: "http://localhost:3000/kullanici/" + userId,
    type: "GET",
    success: function (data) {
      console.log(data);
      var userCard = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Kullanıcı Adı: ${data.kullaniciAdi}</h5>
                    </div>
                </div>`;
      $("#profile-card").append(userCard);
    },
    error: function (error) {
      console.log("Error: ", error);
    },
  });
});

