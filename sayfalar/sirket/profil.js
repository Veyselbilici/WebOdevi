$(document).ready(function () {
  var sirketId = localStorage.getItem("kullaniciId");
  $.ajax({
    url: "http://localhost:3000/sirket/" + sirketId,
    type: "GET",
    success: function (data) {
      console.log(data);
      var userCard = `

      <div class="content">
          <div class="profileCard">
              <div class="firstinfo"><img src="${data.logo}" />
                  <div class="profileinfo">
                      <h1>${data.kullaniciAdi}</h1>
                      <h3>Kullanıcı</h3>
                  </div>
              </div>
          </div>
          <div class="badgescard">
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

