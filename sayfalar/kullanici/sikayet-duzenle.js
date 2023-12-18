$(document).ready(function() {
    $('#sikayet-sec-form').on('submit', function(e) {
        e.preventDefault();

        var sikayetId = $('#sikayet-id').val();

        $.ajax({
            url: 'http://localhost:3000/sikayet/' + sikayetId,
            type: 'GET',
            success: function(sikayet) {
                $('#sirket').val(sikayet.sirket);
                $('#baslik').val(sikayet.baslik);
                $('#sikayet').val(sikayet.sikayet);
                $('#sikayet-duzenle-form').show();
            }
        });
    });
    $('#sikayet-duzenle-form').on('submit', function(e) {
        e.preventDefault();

        var sikayetId = $('#sikayet-id').val();
        var sirket = $('#sirket').val();
        var baslik = $('#baslik').val();
        var sikayet = $('#sikayet').val();
        $.ajax({
            url: 'http://localhost:3000/sikayet/' + sikayetId,
            type: 'PUT',
            data: JSON.stringify({
                sirket: sirket,
                baslik: baslik,
                sikayet: sikayet
            }),
            contentType: "application/json",
            success: function() {
                alert('Sikayet duzenlendi');
            }
        });
    });
});