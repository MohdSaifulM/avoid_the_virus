let $virus = document.querySelector(".virus");
let $player = document.querySelector(".player");
let $box = document.querySelector(".innerbox");

class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
}

// declare game sounds
let acceptSound = new Sound("../audio/confirmation_002.ogg");
let backSound = new Sound("../audio/back_001.ogg");
let virusSound = new Sound("../audio/pluck_001.ogg");
let powerSound = new Sound("../audio/drop_001.ogg");
let loseSound = new Sound("../audio/error_008.ogg");
let powerAppear = new Sound("../audio/maximize_001.ogg");

let playerScore = 0;

//clear the local storage
// localStorage.clear();



// check if local storage is null, if null return with template values
if (localStorage.getItem("highscore") === null) {
    let scoreObj = [
        {
            name: "AAA",
            highscore: 100
        },
        {
            name: "BBB",
            highscore: 200
        },
        {
            name: "CCC",
            highscore: 300
        },
        {
            name: "DDD",
            highscore: 400
        },
        {
            name: "EEE",
            highscore: 500
        }
    ]
    let scoreJSON = JSON.stringify(scoreObj);
    localStorage.setItem("highscore", scoreJSON);
}

let retrieve = localStorage.getItem("highscore");
let scoreObj = JSON.parse(retrieve);
scoreObj.sort((a, b) => (a.highscore < b.highscore) ? 1 : -1);
scoreObj.splice(5, 1);
console.log(scoreObj);

let arr = [];
arr.push($player);

// display start screen and hide the rest
document.querySelector(".start_screen").style.display = "block";
document.querySelector(".game").style.display = "none";
document.querySelector(".high_score").style.display = "none";

// listen for start click
let $start = document.querySelector(".start");
$start.addEventListener("click", startGame);

// listen for highscore click
let $highscore = document.querySelector(".highscore");
$highscore.addEventListener("click", highScore);

function highScore() {

    acceptSound.play();

    document.querySelector(".start_screen").style.display = "none";
    document.querySelector(".score").style.display = "none";
    document.querySelector(".high_score").style.display = "block";

    //Retrieve highscore from localStorage
    let retrieve = localStorage.getItem("highscore");
    let scoreArr = JSON.parse(retrieve);
    scoreArr.sort((a, b) => (a.highscore < b.highscore) ? 1 : -1);

    //append text into page
    let $p1tag = document.createElement("h3");
    let $scoreDetails1 = document.createTextNode(`1st ${scoreArr[0].name}: ${scoreArr[0].highscore}`);
    document.querySelector(".high_score").appendChild($p1tag);
    $p1tag.appendChild($scoreDetails1);

    let $p2tag = document.createElement("h3");
    let $scoreDetails2 = document.createTextNode(`2nd ${scoreArr[1].name}: ${scoreArr[1].highscore}`);
    document.querySelector(".high_score").appendChild($p2tag);
    $p2tag.appendChild($scoreDetails2);

    let $p3tag = document.createElement("h3");
    let $scoreDetails3 = document.createTextNode(`3rd ${scoreArr[2].name}: ${scoreArr[2].highscore}`);
    document.querySelector(".high_score").appendChild($p3tag);
    $p3tag.appendChild($scoreDetails3);

    let $p4tag = document.createElement("h3");
    let $scoreDetails4 = document.createTextNode(`4th ${scoreArr[3].name}: ${scoreArr[3].highscore}`);
    document.querySelector(".high_score").appendChild($p4tag);
    $p4tag.appendChild($scoreDetails4);

    let $p5tag = document.createElement("h3");
    let $scoreDetails5 = document.createTextNode(`5th ${scoreArr[4].name}: ${scoreArr[4].highscore}`);
    document.querySelector(".high_score").appendChild($p5tag);
    $p5tag.appendChild($scoreDetails5);

    //append back button
    let $div = document.createElement("div");
    $div.className = "back btn animate__animated animate__zoomIn";
    $div.id = "back";
    let $htag = document.createElement("h3");
    let $btnText = document.createTextNode("BACK");
    document.querySelector(".high_score").appendChild($div);
    $div.appendChild($htag)
    $htag.appendChild($btnText);

    //return to start screen
    let $back = document.querySelector(".back");
    $back.addEventListener("click", function () {
        backSound.play();

        setTimeout(function () { window.location.reload() }, 100);

    });
}

function startGame() {

    acceptSound.play();

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
                loseSound.play();
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
                for (let j = 0; j < scoreObj.length; j++) {
                    if (playerScore > scoreObj[j].highscore) {
                        swal("You've made the highscore, enter your name:", {
                            content: "input",
                        })
                            .then((value) => {
                                scoreObj.push({ name: value, highscore: playerScore })
                                let myJSON = JSON.stringify(scoreObj);
                                localStorage.setItem("highscore", myJSON);
                            });
                    }
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

                    backSound.play();

                    setTimeout(function () { window.location.reload() }, 100);
                });
            }
            // check if power up is taken
            else if (d < 50 && arr[i].className == "powerup animate__animated animate__flash") {
                powerSound.play();
                console.log("power UPPP");
                arr[i].remove();
                arr[i - 1].remove();
                arr[i - 2].remove();
                playerScore = playerScore + 50;
            } else if (d > 50 && arr[i].className == "powerup animate__animated animate__flash") {
                setTimeout(function () { arr[i].remove() }, 5000);
            }
        }
    }, 5);
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
    virusSound.play();
}

function createPowerUp() {
    let $createPowerUp = document.createElement("div");
    $createPowerUp.className = "powerup animate__animated animate__flash";
    $createPowerUp.id = "2";
    randomMove(document.querySelector(".box").appendChild($createPowerUp));
    arr.push($createPowerUp);
    powerAppear.play();
}

