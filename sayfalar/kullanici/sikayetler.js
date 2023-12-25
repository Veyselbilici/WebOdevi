$(document).ready(function () {
  var sikayetId;
  $.getJSON("/sikayetler.json", function (data) {
    var row = $('<div class="row"></div>');
    $.each(data, function (key, complaint) {
      var complaintCard = `
        <div class="col-md-6">
          <div class="card bg-secondary text-light mb-3 shadow-lg">
            <div class="row g-0">
              <div class="col-md-4 d-flex justify-content-center align-items-center" style="height: 200px;">
                <img src="${complaint.fotoUrl}" style="max-width: 80%; max-height: 80%;" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body" style="position: relative; padding-bottom: 40px;">
                  <h5 class="card-title">${complaint.sirket}</h5>
                  <h6 class="card-subtitle mb-2 text-light">${complaint.baslik}</h6>
                  <p class="card-text">${complaint.sikayet}</p>
                  <button type="button" class="btn btn-info btn-sm delete-complaint" data-id="${complaint.id}" style="position: absolute; top: 10px; right: 10px;">
                    <i class="fas fa-trash"></i>
                  </button>
                  <button type="button" class="btn btn-warning btn-sm edit-complaint" data-id="${complaint.id}" style="position: absolute; top: 10px; right: 50px;">
                    <i class="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      row.append(complaintCard);
      if ((key + 1) % 2 === 0) {
        $("#complaintsContainer").append(row);
        row = $('<div class="row"></div>');
      }
    });
    if (row.children().length > 0) {
      $("#complaintsContainer").append(row);
    }
  });

  $(document).on("click", ".delete-complaint", function (e) {
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

  $(document).on("click", ".edit-complaint", function (e) {
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
      };
      console.log(sikayet)
      
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
  });
});
