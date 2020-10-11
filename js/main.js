
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

let $problem = document.querySelector(".problem");

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

// function simpleMove() {
//     let position = makeNewPos();

//     setInterval(frame, 5);

//     let speed = 0.8;

//     function frame() {
//         if (position[0] > $box.clientHeight || position[1] > $box.clientWidth) {
//             speed = speed * -1;
//             position[0] += speed;
//             position[1] += speed;
//             $problem.style.top = position[0] + "px";
//             $problem.style.left = position[1] + "px";

//         } else if (position[0] < $box.clientTop || position[1] < $box.clientLeft) {
//             speed = Math.abs(speed);
//             position[0] += speed;
//             position[1] += speed;
//             $problem.style.top = position[0] + "px";
//             $problem.style.left = position[1] + "px";
//         }
//         else {
//             position[0] += speed;
//             position[1] += speed;
//             $problem.style.top = position[0] + "px";
//             $problem.style.left = position[1] + "px";
//         }
//         console.log($problem.style.left)
//         console.log($problem.style.top)
//     }
// }


function randomMove(problem) {

    let postion = makeNewPos();
    let y = postion[0] + "px";
    let x = postion[1] + "px";

    let startPosition = makeNewPos();
    let y1 = startPosition[0] + "px";
    let x1 = startPosition[1] + "px";

    let endPostion = makeNewPos();
    let y2 = endPostion[0] + "px";
    let x2 = endPostion[1] + "px";



    problem.animate([
        // keyframes
        { transform: `translate(${x}, ${y})` },
        { transform: `translate(${x1}, ${y1})` },
        { transform: `translate(${x2}, ${y2})` },
        { transform: `translate(${x}, ${y})` }

    ], {
        // timing options
        duration: 8000,
        iterations: Infinity,
        // iterationComposite: "accumulate"
    });
}

function createProblems() {
    let $createProblem = document.createElement("div");
    $createProblem.className = "problem";
    randomMove(document.querySelector(".box").appendChild($createProblem));
}

createProblems();









