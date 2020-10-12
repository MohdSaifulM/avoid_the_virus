document.querySelector(".start_screen").style.display = "none";
document.querySelector(".game").style.display = "block";

let $problem = document.querySelector(".problem");
let $player = document.querySelector(".player");
let arr = [];
arr.push($player);

let $box = document.querySelector(".innerbox");
$box.addEventListener("mousemove", trackPlayer);

function playIntro() {
    document.querySelector(".start_screen").style.display = "block";
    document.querySelector(".game").style.display = "none"
    setInterval(function () { document.querySelector(".start_screen").style.display = "none" }, 3000);
    setInterval(function () { document.querySelector(".game").style.display = "block" }, 3000);
}

function trackPlayer(e) {
    let left = e.offsetX;
    let top = e.offsetY;

    document.querySelector(".player").style.left = left + "px";
    document.querySelector(".player").style.top = top + "px";

}

function makeNewPos() {
    let height = $box.clientHeight - 50;
    let width = $box.clientWidth - 50;

    let randomHeight = Math.floor(Math.random() * height);
    let randomWidth = Math.floor(Math.random() * width);

    return [randomHeight, randomWidth];
}

function randomMove(virus) {

    let postion = makeNewPos();
    let y = postion[0] + "px";
    let x = postion[1] + "px";

    let startPosition = makeNewPos();
    let y1 = startPosition[0] + "px";
    let x1 = startPosition[1] + "px";

    let endPostion = makeNewPos();
    let y2 = endPostion[0] + "px";
    let x2 = endPostion[1] + "px";



    virus.animate([
        { transform: `translate(${x}, ${y})` },
        { transform: `translate(${x1}, ${$box.clientHeight}px)` },
        { transform: `translate(${x2}, ${y2})` },
        { transform: `translate(${$box.clientWidth}px, ${y1})` },
        { transform: `translate(${$box.clientLeft}px, ${y2})` },
        { transform: `translate(${x1}, ${$box.clientTop}px)` },
        { transform: `translate(${x}, ${y})` },
    ], {
        duration: 10000,
        iterations: Infinity,
    });


}

function createVirus() {

    let $createVirus = document.createElement("div");
    $createVirus.className = "virus";
    let uniqueID = Number($createVirus.id) + 1;
    $createVirus.id = uniqueID;
    randomMove(document.querySelector(".box").appendChild($createVirus));
    arr.push($createVirus);
}

function detectCollision(element) {

    setInterval(ifCollide, 5)

    function ifCollide() {

        let x1 = element[0].getBoundingClientRect().x;
        let y1 = element[0].getBoundingClientRect().y;

        for (let i = 1; i < element.length; i++) {

            let x2 = element[i].getBoundingClientRect().x;

            let y2 = element[i].getBoundingClientRect().y;
            let xDistance = x2 - x1;
            let yDistance = y2 - y1;

            d = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

            if (d < 50) {

                console.log("You're hit")

            }
        }
    };

}


setInterval(createVirus, 3000);


console.log(arr)

// detectCollision(arr);
