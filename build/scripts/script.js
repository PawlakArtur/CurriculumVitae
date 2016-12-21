window.addEventListener("DOMContentLoaded", function() {
    var scrollpos = window.scrollY;
    var nav = document.getElementsByTagName('nav');
    window.addEventListener('scroll', function() {
        scrollpos = window.scrollY;
        if (scrollpos > 40) {
            nav[0].classList.toggle('navBarSmall', true);
        } else {
            nav[0].classList.toggle('navBarSmall', false);
        }
    });
}, false);