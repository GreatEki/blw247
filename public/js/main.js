const menubtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuItems = document.querySelectorAll(".menu-items");
const btnLine1 = document.querySelector("#ln1");
const btnLine2 = document.querySelector("#ln3");

//Set the inital state of the menu
let showMenu = false;

menubtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menubtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");

    menuItems.forEach(item => item.classList.add("show"));
    btnLine1.style.background = "white";
    btnLine2.style.background = "white";

    showMenu = true;
  } else {
    menubtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");

    menuItems.forEach(item => item.classList.remove("show"));
    btnLine1.style.background = "black";
    btnLine2.style.background = "black";

    showMenu = false;
  }
}

$("document").ready(function() {
  var curPos = 0;
  var slider = $(".slider");
  var cntImages = slider.length;
  var sliderWidth = slider.width();
  $("#sliderWrapper").css("width", sliderWidth * cntImages);
  setInterval(SlideImage, 2000);

  function SlideImage() {
    if (curPos == cntImages - 1) {
      curPos = 0;
    } else {
      $("#sliderWrapper").animate({
        marginLeft: sliderWidth * -curPos
      });
    }
  }
});
