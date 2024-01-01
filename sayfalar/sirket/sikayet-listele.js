function getSirketData(sirketId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/sirket/" + sirketId,
      type: "GET",
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        console.log("Error: ", error);
        reject(error);
      },
    });
  });
}

function getKullaniciData(kullaniciID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/kullanici/" + kullaniciID,
      type: "GET",
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        console.log("Error: ", error);
        reject(error);
      },
    });
  });
}

function getSikayetData(sirket) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/sikayet/sirketAdi/" + sirket,
      type: "GET",
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        console.log("Error: ", error);
        reject(error);
      },
    });
  });
}

$(document).ready(function () {
  var sirketId = localStorage.getItem("kullaniciId");
  $("#button-addon2").on("click", function () {
    $("#sikayetler").empty();
    getSirketData(sirketId).then((data) => {
      sirket = data;
      getSikayetData(sirket.kullaniciAdi).then((data) => {
        let searchValue = $("#searchbar").val();
        let filteredData = data.filter((sikayet) =>
          sikayet.baslik.toLowerCase().includes(searchValue.toLowerCase())
        );
        sikayet = filteredData;
        $.each(sikayet, function (_, sikayet) {
          getKullaniciData(sikayet.sikayetSahibiID).then((data) => {
            kullanici = data;
            var sikayetHTML = ` <div class="timeline-time">
      <span class="date">today</span>
      <span class="time">04:20</span>
   </div>
   <div class="timeline-icon">
      <a href="javascript:;">&nbsp;</a>
   </div>
   <div class="timeline-body">
      <div class="timeline-header">
         <span class="userimage"><img src=${kullanici.avatar} alt=""></span>
         <span class="username">${kullanici.kullaniciAdi} <small></small></span>
      </div>
      <div class="timeline-content">
      <h5 class="card-title">${sikayet.baslik}</h5>
         <p>
           ${sikayet.sikayet}
         </p>
           <img src=${
             sikayet.fotoUrl
           } alt="" style="width: 70%; height: 70%; margin: auto; display: block; ">
      </div>
      <div class="timeline-footer">
         ${
           !sikayet.cozuldu
             ? '<button type="button" class="btn btn-outline-danger" style="border:none;"><i class="bi bi-exclamation-circle-fill"></i><i style="margin:5px;">Açık Şikayet</i></button>'
             : '<span class="m-r-15 text-success"><i class="bi bi-check-circle-fill"></i><i style="margin:5px;">Cevaplandı</i></span>'
         } 
      </div>
     ${
       !sikayet.cozuldu
         ? `<div class="timeline-comment-box">
              <div style="width: 34px; height: 34px;">
                 <span><img src=${sirket.logo}></span>    
                 </div>   
             <div class="input">
                <form action="">
                   <div class="input-group">
                       <input type="text" class="form-control rounded-corner" placeholder="Cevapla..." id="cevap">
                      <span class="input-group-btn p-l-10">
                       <button class="btn btn-primary f-s-12 rounded-corner" type="button" id="btn-cevap">Cevapla</button>
                      </span>
                    </div>
                </form>
               </div>
               </div>
            </div>`
         : ``
     }
   </div>`;

            $("#sikayetler").append(sikayetHTML);
            $(document).ready(function () {
              $(document).on("click", "#btn-cevap", function (e) {
                console.log("tıklandı");
                e.preventDefault();
                $.ajax({
                  type: "POST",
                  url: "http://localhost:3000/cevap",
                  data: JSON.stringify({
                    sikayetId: sikayet.id,
                    cevap: $("#cevap").val(),
                  }),
                  dataType: "json",
                  contentType: "application/json",
                  encode: true,
                }).done(function (data) {
                  console.log(data);
                });
                $.ajax({
                  url: "http://localhost:3000/sikayet/" + sikayet.id,
                  type: "PUT",
                  data: JSON.stringify({
                    cozuldu: true,
                  }),
                  contentType: "application/json",
                  success: function () {
                    alert("Cevabınız Gonderildi.");
                  },
                });
              });
            });
          });
        });
      });
    });
  });
});

