
// Game intro function
function playIntro() {
    document.querySelector(".start_screen").style.display = "block";
    document.querySelector(".game").style.display = "none"
    setInterval(function () { document.querySelector(".start_screen").style.display = "none" }, 3000);
    setInterval(function () { document.querySelector(".game").style.display = "block" }, 3000);
}

// Invoke intro
// playIntro();

document.querySelector(".start_screen").style.display = "none";
document.querySelector(".game").style.display = "block";

let $box = document.querySelector(".innerbox");
$box.addEventListener("mousemove", trackPlayer);

function trackPlayer(e) {
    let left = e.offsetX;
    let top = e.offsetY;

    document.querySelector(".player").style.left = left + "px";
    document.querySelector(".player").style.top = top + "px";
  
}