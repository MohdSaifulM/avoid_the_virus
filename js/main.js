let $virus = document.querySelector(".virus");
let $player = document.querySelector(".player");
let $box = document.querySelector(".innerbox");

let playerScore = 0;
let arr = [];
arr.push($player);

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
    let position = makeNewPos();

    var x;
    var y;


    if ((position[0] + "px") == document.querySelector(".player").style.top && (position[1] + "px") == document.querySelector(".player").style.left) {

        position = makeNewPos();

    } else {

        y = position[0] + "px";
        x = position[1] + "px";

    }

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
        duration: 12000,
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

function createPowerUp() {
    let $createPowerUp = document.createElement("div");
    $createPowerUp.className = "powerup animate__animated animate__flash";
    $createPowerUp.id = "2";
    randomMove(document.querySelector(".box").appendChild($createPowerUp));
    arr.push($createPowerUp);
}

document.querySelector(".start_screen").style.display = "block";
document.querySelector(".game").style.display = "none";
document.querySelector(".high_score").style.display = "none";
document.querySelector(".instruct").style.display = "none";

let $start = document.querySelector(".start");
$start.addEventListener("click", startGame);

let $highscore = document.querySelector(".highscore");
$highscore.addEventListener("click", highScore);

let $instruct = document.querySelector(".instructions");
$instruct.addEventListener("click", instruct);

// function startGame() {
//     document.querySelector(".start_screen").style.display = "none";
//     document.querySelector(".game").style.display = "block";

//     $box.addEventListener("mousemove", trackPlayer);

//     let unleashTheVirus = setInterval(createVirus, 5000);

//     let trackScore = setInterval(function () {
//         playerScore++;
//         document.querySelector(".score").textContent = `Score: ${playerScore}`
//     }, 50)


//     let checkCollide = setInterval(function () {

//         let x1 = arr[0].getBoundingClientRect().x;
//         let y1 = arr[0].getBoundingClientRect().y;

//         for (let i = 1; i < arr.length; i++) {

//             let x2 = arr[i].getBoundingClientRect().x;
//             let y2 = arr[i].getBoundingClientRect().y;

//             let xDistance = x2 - x1;
//             let yDistance = y2 - y1;

//             d = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

//             if (d < 50) {
//                 console.log("IT HITSSS");
//                 clearInterval(unleashTheVirus);
//                 clearInterval(checkCollide);
//                 clearInterval(trackScore);

//                 // make hit object bigger to cover play area
//                 arr[i].animate([
//                     { transform: `scale(40)` },
//                 ], {
//                     duration: 3000,
//                     iterations: 1,
//                 });

//                 //log score
//                 let $pTag = document.createElement("p");
//                 let $playerScore = document.createTextNode(`Your final score is : ${playerScore}`);
//                 document.querySelector(".quote").appendChild($pTag);
//                 $pTag.appendChild($playerScore);

//                 //store highscore
//                 if (playerScore > localStorage.getItem("highscore")) {
//                     localStorage.setItem("highscore", playerScore);
//                     swal("You've made the highscore, enter your name:", {
//                         content: "input",
//                     })
//                         .then((value) => {
//                             localStorage.setItem("name", value);
//                         });
//                 }

//                 // game over screen appears
//                 setTimeout(function () { document.querySelector(".box").remove(); }, 3000);
//                 setTimeout(function () { document.querySelector(".score").style.display = "none" }, 3000);
//                 setTimeout(function () { document.querySelector("#game_over").style.display = "block" }, 3000);
//                 setTimeout(function () { document.querySelector(".quote").style.display = "block" }, 3000);
//                 setTimeout(function () { document.querySelector(".reset").style.display = "block" }, 3000);
//                 setTimeout(function () { document.querySelector(".game").style.cursor = "auto" }, 3000);

//                 //reset game
//                 let $reset = document.getElementById("reset");

//                 $reset.addEventListener("click", function () {
//                     window.location.reload();
//                 });
//             }
//         }
//     }, 5);
// }

function highScore() {
    document.querySelector(".start_screen").style.display = "none";
    document.querySelector(".score").style.display = "none";
    document.querySelector(".high_score").style.display = "block";

    //Retrieve highscore from localStorage
    let name = localStorage.getItem("name");
    let score = localStorage.getItem("highscore")

    //append text into page
    let $ptag = document.createElement("h3");
    let $scoreDetails = document.createTextNode(`${name} managed to avoid the virus for awhile
    and scored ${score}`);
    document.querySelector(".high_score").appendChild($ptag);
    $ptag.appendChild($scoreDetails);

    //append back button
    let $div = document.createElement("div");
    $div.className = "back btn animate__animated animate__zoomIn"
    let $htag = document.createElement("h3");
    let $btnText = document.createTextNode("BACK");
    document.querySelector(".high_score").appendChild($div);
    $div.appendChild($htag)
    $htag.appendChild($btnText);

    //return to start screen
    let $back = document.querySelector(".back");
    $back.addEventListener("click", function () {
        window.location.reload();
    });
}

function instruct() {

    document.querySelector(".start_screen").style.display = "none";
    document.querySelector(".score").style.display = "none";
    document.querySelector(".high_score").style.display = "none";
    document.querySelector(".instruct").style.display = "block";

    //append back button
    let $div = document.createElement("div");
    $div.className = "ins back btn animate__animated animate__zoomIn"
    let $htag = document.createElement("h3");
    let $btnText = document.createTextNode("BACK");
    document.querySelector(".instruct").appendChild($div);
    $div.appendChild($htag)
    $htag.appendChild($btnText);

    //return to start screen
    let $back = document.querySelector(".back");
    $back.addEventListener("click", function () {
        window.location.reload();
    });

}

function startGame() {
    document.querySelector(".start_screen").style.display = "none";
    document.querySelector(".game").style.display = "block";

    $box.addEventListener("mousemove", trackPlayer);

    let unleashTheVirus = setInterval(createVirus, 5000);

    let giveChance = setInterval(createPowerUp, 25000);

    let trackScore = setInterval(function () {
        playerScore++;
        document.querySelector(".score").textContent = `Score: ${playerScore}`
    }, 50)


    let checkCollide = setInterval(function () {

        let x1 = arr[0].getBoundingClientRect().x;
        let y1 = arr[0].getBoundingClientRect().y;

        for (let i = 1; i < arr.length; i++) {

            let x2 = arr[i].getBoundingClientRect().x;
            let y2 = arr[i].getBoundingClientRect().y;

            let xDistance = x2 - x1;
            let yDistance = y2 - y1;

            d = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

            if (d < 50 && arr[i].className == "virus") {
                console.log("IT HITSSS");
                clearInterval(unleashTheVirus);
                clearInterval(checkCollide);
                clearInterval(trackScore);
                clearInterval(giveChance);

                // make hit object bigger to cover play area
                arr[i].animate([
                    { transform: `scale(40)` },
                ], {
                    duration: 3000,
                    iterations: 1,
                });

                //log score
                let $pTag = document.createElement("p");
                let $playerScore = document.createTextNode(`Your final score is : ${playerScore}`);
                document.querySelector(".quote").appendChild($pTag);
                $pTag.appendChild($playerScore);

                //store highscore
                if (playerScore > localStorage.getItem("highscore")) {
                    localStorage.setItem("highscore", playerScore);
                    swal("You've made the highscore, enter your name:", {
                        content: "input",
                    })
                        .then((value) => {
                            localStorage.setItem("name", value);
                        });
                }

                // game over screen appears
                setTimeout(function () { document.querySelector(".box").remove(); }, 3000);
                setTimeout(function () { document.querySelector(".score").style.display = "none" }, 3000);
                setTimeout(function () { document.querySelector("#game_over").style.display = "block" }, 3000);
                setTimeout(function () { document.querySelector(".quote").style.display = "block" }, 3000);
                setTimeout(function () { document.querySelector(".reset").style.display = "block" }, 3000);
                setTimeout(function () { document.querySelector(".game").style.cursor = "auto" }, 3000);

                //reset game
                let $reset = document.getElementById("reset");

                $reset.addEventListener("click", function () {
                    window.location.reload();
                });
            }
            else if (d < 50 && arr[i].className == "powerup animate__animated animate__flash") {
                console.log("power UPPP");
                arr[i].remove();
                arr[i-1].remove();
                arr[i-2].remove();
                playerScore = playerScore + 50;
            } else if (d > 50 && arr[i].className == "powerup animate__animated animate__flash") {
                setTimeout(function(){arr[i].remove()}, 5000);
            }
        }
    }, 5);
}