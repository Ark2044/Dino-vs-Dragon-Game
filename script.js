score = 0;
cross = true;

audio = new Audio("images/music.mp3");
audiogo = new Audio("images/gameover.mp3");

setTimeout(() => {
  audio.play();
}, 1000);

setInterval(() => {
  const dino = document.querySelector(".dino");
  const gameOver = document.querySelector(".gameOver");
  const obstacle = document.querySelector(".obstacle");

  let dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  let dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );

  let ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  let oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  let offsetX = Math.abs(dx - ox);
  let offsetY = Math.abs(dy - oy);

  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - Reload to Play Again";
    obstacle.style.animationDuration = "0s"; // Stop the obstacle animation
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
      }, 100);
    }

    // Increase obstacle speed
    let aniDur = parseFloat(
      window
        .getComputedStyle(obstacle, null)
        .getPropertyValue("animation-duration")
    );
    let newDur = aniDur - 0.1;
    obstacle.style.animationDuration = newDur + "s";
    console.log("New animation duration: ", newDur);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}

document.onkeydown = function (e) {
  console.log("Key code is: ", e.key);

  if (e.key === "ArrowUp") {
    if (cross) {
      const dino = document.querySelector(".dino");
      dino.classList.add("animateDino");
      setTimeout(() => {
        dino.classList.remove("animateDino");
      }, 700);
    }
  }

  if (e.key === "ArrowRight") {
    const dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }

  if (e.key === "ArrowLeft") {
    const dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};
