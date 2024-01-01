$(document).ready(function () {
  var userId = localStorage.getItem("kullaniciId");
  $.ajax({
    url: "http://localhost:3000/kullanici/" + userId,
    type: "GET",
    success: function (data) {
      console.log(data);
      var userCard = `

      <div class="content">
          <div class="profileCard">
              <div class="firstinfo"><img src="${data.avatar}" />
                  <div class="profileinfo">
                      <h1>${data.kullaniciAdi}</h1>
                      <h3>Kullanıcı</h3>
                  </div>
              </div>
          </div>
          <div class="badgescard">
          <i class="bi bi-cake">12 Mar. 2001</i>
          <i class="bi bi-geo-alt">İzmir</i>
          </div>
      </div>`;
      $("#profile-card").append(userCard);
    },
    error: function (error) {
      console.log("Error: ", error);
    },
  });
});

