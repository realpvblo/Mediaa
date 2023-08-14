// document.addEventListener("DOMContentLoaded", function () {
//     const words = document.querySelectorAll(".animated-heading .word");
  
//     function animateWords() {
//       words.forEach((word, index) => {
//         setTimeout(() => {
//           word.classList.add("animating");
//           setTimeout(() => {
//             word.classList.remove("animating");
//           }, 1000);
//         }, index * 1000);
//       });
//     }
  
//     setInterval(animateWords, 3000);
//   });
  
var $header = $('#header');
var prevScroll = 0;

$(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    
    if (currentScroll > 10) {
        $header.css({
            'backdrop-filter': 'blur(5px)'
        });
        $header.addClass('header-active');
    } else {
        $header.css({
            'backdrop-filter': 'none'
        });
        $header.removeClass('header-active');
    }
    
    prevScroll = currentScroll;
});

$(document).ready(function() {
  $(document).on('mousemove', function(e) {
    $('#circularcursor').css({
      left: e.pageX,
      top: e.pageY
    });
  })
});