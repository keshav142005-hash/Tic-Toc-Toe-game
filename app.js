let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnO= true; //playerX, playerO

const winPatterns = [
    [0,1,2,],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) { //playerO
            box.innerText = "O";
            turnO = false;
        } else { //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
  };

  const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
  };
const showWinner = (winner) => {
    msg.innerText = ` 🎉 Congratulations, Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    startConfetti(); 
};

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);

            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

/* ---------------- Confetti Code ---------------- */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiParticles = [];

// Canvas resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Confetti particle class
class Confetti {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4;   // ✅ Math.random for size
    this.color = color;
    this.speedX = Math.random() * 4 - 2; // ✅ random horizontal move
    this.speedY = Math.random() * 3 + 2; // ✅ random falling speed
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

// Confetti start
function startConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width; // ✅ random X
    const y = Math.random() * canvas.height; // ✅ random Y
    const colors = ["#ff0", "#f00", "#0f0", "#0ff", "#00f", "#f0f"];
    const color = colors[Math.floor(Math.random() * colors.length)]; // ✅ random color
    confettiParticles.push(new Confetti(x, y, color));
  }
  animateConfetti();
}

// Animate confetti
function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateConfetti);
}
