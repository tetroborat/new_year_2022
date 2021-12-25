$(document).ready(function() {
    $('.card').on('click', function() {
        $('.bg').toggleClass('is-opened')
        $(this).toggleClass('is-opened')
        $('.click-icon').toggleClass('is-hidden')
    })
})