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

// KARUZELA

function loadCards(currentCardNumber, leftSwipe, touchDevice) {
  var i, allCards = document.getElementsByClassName("cards"),
      totalCards = allCards.length;

  for (i = 0; i < totalCards; i++) {
      allCards[i].className += " hideCard";
  }
  if (touchDevice) {
      if (leftSwipe) {
          document.getElementById('card' + currentCardNumber).className = 'cards animated reverseSlideOutLeft notCurrentCard'; //Previous Card
          document.getElementById('card' + ((totalCards + currentCardNumber + 1) % totalCards)).className = 'cards currentCard animated reverseSlideOutCenterLeft'; //Current Card
          document.getElementById('card' + ((totalCards + currentCardNumber + 2) % totalCards)).className = 'cards animated reverseSlideOutRight notCurrentCard'; //Next Card
      } else {

          document.getElementById('card' + ((totalCards + currentCardNumber - 2) % totalCards)).className = 'cards animated slideOutLeft notCurrentCard'; //Previous Card
          document.getElementById('card' + ((totalCards + currentCardNumber - 1) % totalCards)).className = 'cards currentCard animated slideOutCenterLeft'; //Current Card
          document.getElementById('card' + currentCardNumber).className = 'cards animated slideOutRight notCurrentCard '; //Next Card
      }
  } else {
      if (leftSwipe) {
          document.getElementById('card' + ((totalCards + currentCardNumber + 1) % totalCards)).className = 'cards animated reverseSlideOutLeft notCurrentCard prev'; //Previous Card
          document.getElementById('card' + ((totalCards + currentCardNumber + 2) % totalCards)).className = 'cards currentCard animated reverseSlideOutCenterLeft'; //Current Card
          document.getElementById('card' + ((totalCards + currentCardNumber + 3) % totalCards)).className = 'cards animated reverseSlideOutRight notCurrentCard nex'; //Next Card
      } else {
          document.getElementById('card' + ((totalCards + currentCardNumber - 3) % totalCards)).className = 'cards animated slideOutLeft notCurrentCard prev'; //Previous Card
          document.getElementById('card' + ((totalCards + currentCardNumber - 2) % totalCards)).className = 'cards currentCard animated slideOutCenterLeft'; //Current Card
          document.getElementById('card' + (totalCards + currentCardNumber - 1) % totalCards).className = 'cards animated slideOutRight notCurrentCard nex'; //Next Card
      }
  }
}

//If its a touch device then check for all the touch events
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  function swipedetect(el, callback) {
      var touchsurface = el,
          swipedir,
          startX,
          startY,
          distX,
          distY,
          threshold = 100, //required min distance traveled to be considered swipe
          restraint = 100, // maximum distance allowed at the same time in perpendicular direction
          allowedTime = 500, // maximum time allowed to travel that distance
          elapsedTime,
          startTime,
          handleswipe = callback || function(swipedir) {}

      touchsurface.addEventListener('touchstart', function(e) {
          var touchobj = e.changedTouches[0]
          swipedir = 'none'
          dist = 0
          startX = touchobj.pageX
          startY = touchobj.pageY
          startTime = new Date().getTime() // record time when finger first makes contact with surface
          e.preventDefault()
      }, false);

      touchsurface.addEventListener('touchmove', function(e) {
          e.preventDefault() // prevent scrolling when inside DIV
      }, false);

      touchsurface.addEventListener('touchend', function(e) {
          var touchobj = e.changedTouches[0]
          distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
          distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
          elapsedTime = new Date().getTime() - startTime // get time elapsed
          if (elapsedTime <= allowedTime) { // first condition for awipe met
              if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                  swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
              } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                  swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
              }
          }
          handleswipe(swipedir)
          e.preventDefault()
      }, false);
  }

  //Initial cards load
  loadCards(0, true, true);
  var allCards = document.getElementsByClassName("cards"),
      totalCards = allCards.length,
      i;
  for (i = 0; i < totalCards; i++) {
      swipedetect(allCards[i], function(swipedir) {
          var currentCard = Number(document.getElementsByClassName("currentCard")[0].id.slice(-1));
          if (swipedir === "left") {
              loadCards(currentCard, true, true);
          } else if (swipedir === "right") {
              loadCards(currentCard, false, true);
          }
      });
  }
} else {
  loadCards(0, false, false);
  var allCards = document.getElementsByClassName("cards"),
      totalCards = allCards.length,
      i;
  for (i = 0; i < totalCards; i++) {
      document.getElementsByClassName("cards")[i].addEventListener("click", function(event) {
          var clickedNode = event.currentTarget.classList;
          var detectSwipeDirectionClass = clickedNode[clickedNode.length - 1];
          if (detectSwipeDirectionClass === "nex") {
              loadCards(Number(event.currentTarget.id.slice(-1)), false, false);
          } else if (detectSwipeDirectionClass === "prev") {
              loadCards(Number(event.currentTarget.id.slice(-1)), true, false);
          }
      });
  }

}

document.addEventListener("DOMContentLoaded", function () {
  const children = document.querySelectorAll(".word");
  let currentIndex = 0;

  function addAnimationClass(index) {
    children[index].classList.add("animation");
    setTimeout(() => {
      children[index].classList.remove("animation");
      currentIndex = (currentIndex + 1) % children.length;
      addAnimationClass(currentIndex);
    }, 3000);
  }

  addAnimationClass(currentIndex);
});
