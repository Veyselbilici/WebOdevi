$(document).ready(function () {
  $.getJSON("/sikayetler.json", function (data) {
    console.log(data); // Log the data

    $.each(data, function (key, complaint) {
      var complaintCard = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${complaint.sirket}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${complaint.baslik}</h6>
                        <p class="card-text">${complaint.sikayet}</p>
                    </div>
                </div>
            `;

      $("#complaintsContainer").append(complaintCard);
    });
  });
});