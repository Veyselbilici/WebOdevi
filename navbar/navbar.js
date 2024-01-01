$(document).ready(function() {
    let currentPath = window.location.pathname;
    let navLinks = $('.navbar-nav a');

    navLinks.each(function() {
        let linkPath = $(this).attr('href');
        if(linkPath === currentPath) {
            $('.nav-item').removeClass('active');
            $(this).parent().addClass('active');
        }
    });
});