function getCevap(sikayetId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/cevap/" + sikayetId,
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
  var sikayetId;
  $.getJSON("/sikayetler.json", function (data) {
    var row = $('<div class="row"></div>');
    $.each(data, function (key, complaint) {
      getCevap(complaint.id).then((data) => {
        cevap = data;
        var complaintCard = `
      <div class="container">
      <article class="postcard dark green">
        <a class="postcard__img_link" href="#">
          <img
            class="postcard__img"
            src=${complaint.fotoUrl}
            alt="Image Title"
          />
        </a>
        <div class="postcard__text" >
          <h1 class="postcard__title green">
            <a href="#">${complaint.baslik}</a>
          </h1>
          <div class="postcard__subtitle small">
            <time datetime="2020-05-25 12:00:00">
              <i class="fas fa-calendar-alt mr-2 ml-2"></i>Mon, May 25th 2020
            </time>
          </div>
          <div class="postcard__subtitle small">
          <i class="bi bi-building mr-2 ml-2"></i>${complaint.sirket}
        </div>
       
          <div class="postcard__bar"></div>
          <div class="postcard__preview-txt">
           ${complaint.sikayet}
          </div>
          <div class="postcard__preview-txt">
          ${
            !complaint.cozuldu
              ? '<button type="button" class="btn btn-outline-danger" style="border:none;"><i class="bi bi-hourglass-split"></i><i style="margin:5px;">Cevap Bekleniyor</i></button>'
              : '<span class="m-r-15 text-success"><i class="bi bi-check-circle-fill"><i style="margin:5px;">Cevaplandı</i></i></span>'
          } 
          ${
            cevap &&
            `          <div class="postcard__bar" style="height:2px"></div>
            <div class="postcard__preview-txt">
          ${cevap?.cevap} </div>`
          }
         </div>
          <ul class="postcard__tagbox">
            <li class="tag__item play green">
            <button type="button" class="btn sikayet-sil" data-id="${
              complaint.id
            }">
              <i class="bi bi-trash m-1 danger"></i><span class="text-danger">Sil</span>
              </button>
            </li>
            <li class="tag__item play green">
            <button type="button" class="btn sikayet-duzenle-btn" data-id="${
              complaint.id
            }">
              <i class="icon-pencil font-large p-1 primary"></i><span class="text-primary">Düzenle</span>              </button>
            </li>
          </ul>
        </div>
      </article>
    </div>
      `;

        row.append(complaintCard);
        if ((key + 1) % 2 === 0) {
          $("#complaintsContainer").append(row);
          row = $('<div class="row"></div>');
        }

        if (row.children().length > 0) {
          $("#complaintsContainer").append(row);
        }
      });
    });
  });

  $(document).on("click", ".sikayet-sil", function (e) {
    e.preventDefault();

    var sikayetId = $(this).data("id");

    $.ajax({
      url: "http://localhost:3000/sikayet/" + sikayetId,
      type: "DELETE",
      success: function (result) {
        alert("Sikayet silindi");
        // Optionally, remove the complaint card from the page
        $(this).closest(".card").remove();
      },
    });
  });

  $(document).on("click", ".sikayet-duzenle-btn", function (e) {
    e.preventDefault();

    sikayetId = $(this).data("id");

    $.ajax({
      url: "http://localhost:3000/sikayet/" + sikayetId,
      type: "GET",
      success: function (sikayet) {
        $("#sirket").val(sikayet.sirket);
        $("#baslik").val(sikayet.baslik);
        $("#sikayet").val(sikayet.sikayet);
        $("#logo").attr("src", sikayet.fotoUrl);

        var options = {
          keyboard: false,
          focus: true,
        };

        var myModal = new bootstrap.Modal(
          document.getElementById("editModal"),
          options
        );
        myModal.show();
      },
    });
  });

  $("#guncelle-btn").on("click", function (e) {
    e.preventDefault();

    var sirket = $("#sirket").val();
    var baslik = $("#baslik").val();
    var sikayet = $("#sikayet").val();

    $.ajax({
      url: "http://localhost:3000/sikayet/" + sikayetId,
      type: "PUT",
      data: JSON.stringify({
        sirket: sirket,
        baslik: baslik,
        sikayet: sikayet,
      }),
      contentType: "application/json",
      success: function () {
        alert("Sikayet duzenlendi");
      },
    });
  });

  $("#create-sikayet-btn").on("click", function () {
    var options = {
      keyboard: false,
      focus: true,
    };

    var myModal = new bootstrap.Modal(
      document.getElementById("sikayetModal"),
      options
    );
    myModal.show();
  });

  $("#sikayetForm").on("submit", function (e) {
    e.preventDefault();

    var sikayet = {
      sirket: $("#sirketYeni").val(),
      baslik: $("#baslikYeni").val(),
      sikayet: $("#sikayetYeni").val(),
      fotoUrl: $("#imageUrl").val(),
      sikayetSahibiID: localStorage.getItem("kullaniciId"),
      cozuldu: false,
    };
    console.log(sikayet);

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/sikayet",
      data: JSON.stringify(sikayet),
      dataType: "json",
      contentType: "application/json",
      encode: true,
    }).done(function (data) {
      console.log(data);
      $("#sikayetModal").modal("hide");
    });
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/cevap",
      data: JSON.stringify(""),
      dataType: "json",
      contentType: "application/json",
      encode: true,
    }).done(function (data) {
      console.log(data);
      $("#sikayetModal").modal("hide");
    });
  });
});
