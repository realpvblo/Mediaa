document.addEventListener("DOMContentLoaded", function () {
    const words = document.querySelectorAll(".animated-heading .word");
  
    function animateWords() {
      words.forEach((word, index) => {
        setTimeout(() => {
          word.classList.add("animating");
          setTimeout(() => {
            word.classList.remove("animating");
          }, 1000);
        }, index * 1000);
      });
    }
  
    setInterval(animateWords, 3000);
  });
  