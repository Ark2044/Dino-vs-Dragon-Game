let score = 0;
let cross = true;
let obstacleSpeed = 5; // Initial speed for obstacle

const audio = new Audio("images/music.mp3");
const audiogo = new Audio("images/gameover.mp3");

setTimeout(() => {
    audio.play();
}, 1000);

setInterval(() => {
    const dino = document.querySelector(".dino");
    const gameOver = document.querySelector(".gameOver");
    const obstacle = document.querySelector(".obstacle");

    const dx = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
    const dy = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    const ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    const oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue("bottom"));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    if (offsetX < 145 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        gameOver.style.display = "block";
        obstacle.style.animation = "none"; // Stop obstacle animation on collision
        audiogo.play();
        cross = false;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);

        if (cross) {
            dino.classList.add("animateDino");
            setTimeout(() => {
                dino.classList.remove("animateDino");
            }, 700);
        }

        // Increase obstacle speed gradually
        obstacleSpeed *= 0.98; // Adjust the multiplier for speed increase as needed
        obstacle.style.animationDuration = obstacleSpeed + "s";
    }
}, 10);

function updateScore(score) {
    const scoreCont = document.getElementById("scoreCont");
    scoreCont.innerHTML = "Your Score: " + score;
}

document.addEventListener("keydown", (e) => {
    handleKeyPress(e.key);
});

document.addEventListener("click", handleTap);

// Touch events for mobile
document.addEventListener("touchstart", handleTap);

function handleKeyPress(key) {
    if (key === "ArrowUp") {
        jump();
    } else if (key === "ArrowRight") {
        moveRight();
    } else if (key === "ArrowLeft") {
        moveLeft();
    }
}

function handleTap() {
    jump();
}

function jump() {
    if (cross) {
        const dino = document.querySelector(".dino");
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700);
    }
}

function moveRight() {
    const dino = document.querySelector(".dino");
    let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
    dino.style.left = dinoX + 112 + "px";
}

function moveLeft() {
    const dino = document.querySelector(".dino");
    let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
    dino.style.left = dinoX - 112 + "px";
}
