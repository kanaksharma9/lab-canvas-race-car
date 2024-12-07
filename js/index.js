let obstacles = []; 
let gameInterval; 
let frame = 0; 
let score = 0;

function startGame() {
  const gameIntro = document.querySelector('.game-intro');
  const gameBoard = document.querySelector('#game-board');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  const roadImage = new Image();
  roadImage.src = './images/road.png';

  const carImage = new Image();
  carImage.src = './images/car.png';

  const carWidth = 50;
  const carHeight = 100;
  let carX = (canvas.width - carWidth) / 2;
  const carY = canvas.height - carHeight - 20;

  const carSpeed = 10;

  gameIntro.style.display = 'none';
  gameBoard.style.display = 'block';

  function drawRoad() {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
  }

  function drawCar() {
    ctx.drawImage(carImage, carX, carY, carWidth, carHeight);
  }

  function createObstacle() {
    const obstacleWidth = Math.random() * 150 + 50; 
    const obstacleX = Math.random() * (canvas.width - obstacleWidth); 
    obstacles.push({ x: obstacleX, y: 0, width: obstacleWidth, height: 30 });
  }

  function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach((obstacle) => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  }

  function updateObstacles() {
    obstacles.forEach((obstacle) => {
      obstacle.y += 5; 
    });

    obstacles = obstacles.filter((obstacle) => obstacle.y < canvas.height);

    if (frame % 120 === 0) {
      createObstacle();
    }
  }

  function checkCollision() {
    obstacles.forEach((obstacle) => {
      if (
        carY < obstacle.y + obstacle.height &&
        carY + carHeight > obstacle.y &&
        carX < obstacle.x + obstacle.width &&
        carX + carWidth > obstacle.x
      ) {
        clearInterval(gameInterval); 
        alert(`Game Over! Your final score is: ${score}`); 
        location.reload(); 
      }
    });
  }

  function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20); 
  }

  function updateGame() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawCar();
    updateObstacles();
    drawObstacles();
    checkCollision();

    
    if (frame % 30 === 0) {
      score++;
    }

    drawScore();
  }

  roadImage.onload = () => {
    drawRoad();
    drawCar();
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      carX = Math.max(0, carX - carSpeed); 
    } else if (event.key === 'ArrowRight') {
      carX = Math.min(canvas.width - carWidth, carX + carSpeed); 
    }
  });

  gameInterval = setInterval(updateGame, 20); 

window.addEventListener('load', () => {
  let startBtn = document.querySelector('#start-button');

  startBtn.addEventListener('click', () => {
    startGame();
  });
})}
