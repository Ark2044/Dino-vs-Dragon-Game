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

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Calculate offsetX and offsetY based on the centers of the elements
    const dinoCenterX = dinoRect.left + dinoRect.width / 2;
    const dinoCenterY = dinoRect.top + dinoRect.height / 2;
    const obstacleCenterX = obstacleRect.left + obstacleRect.width / 2;
    const obstacleCenterY = obstacleRect.top + obstacleRect.height / 2;

    const offsetX = Math.abs(dinoCenterX - obstacleCenterX) - (dinoRect.width + obstacleRect.width) / 2;
    const offsetY = Math.abs(dinoCenterY - obstacleCenterY) - (dinoRect.height + obstacleRect.height) / 2;

    if (offsetX < 0 && offsetY < 0) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        gameOver.style.display = "block";
        obstacle.style.animation = "none"; // Stop obstacle animation on collision
        audiogo.play();
        cross = false;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 50 && cross) { // Adjust collision threshold as needed
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
    let dinoX = parseFloat(window.getComputedStyle(dino).getPropertyValue("left"));
    const screenWidth = window.innerWidth;
    const dinoWidth = dino.offsetWidth;
    const moveDistance = screenWidth * 0.25; // Adjust for different screen sizes

    dinoX = Math.min(dinoX + moveDistance, screenWidth - dinoWidth);
    dino.style.left = dinoX + "px";
}

function moveLeft() {
    const dino = document.querySelector(".dino");
    let dinoX = parseFloat(window.getComputedStyle(dino).getPropertyValue("left"));
    const moveDistance = window.innerWidth * 0.25; // Adjust for different screen sizes

    dinoX = Math.max(dinoX - moveDistance, 0);
    dino.style.left = dinoX + "px";
}
