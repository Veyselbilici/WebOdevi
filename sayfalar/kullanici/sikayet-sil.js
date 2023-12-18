$(document).ready(function() {
    $('#sikayet-sil-form').on('submit', function(e) {
        e.preventDefault();

        var sikayetId = $('#sikayet-id').val();
        console.log(sikayetId);
        $.ajax({
            url: 'http://localhost:3000/sikayet/' + sikayetId,
            type: 'DELETE',
            success: function(result) {
                alert('Sikayet silindi');
            }
        });
    });
});