/* global createCanvas, colorMode, HSB, width, height, random, background, fill, noFill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, round */

let backgroundColor, playerSnake, currentApple, score;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  // text for to display score
  fill(0);
  text(`Score: ${score}`, 20, 20);
}

class Snake {
  constructor() {
    // defining snake variables
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = [];
    this.direction.unshift("N");
    this.speed = 12;
    this.tail = [];
    this.tail.unshift(new TailSegment(this.x, this.y));
  }

  moveSelf() {
    // moving the snake
    let direction = this.direction[0];
    if (this.direction.length > 1) {
      this.direction.shift();
    }
    if (direction === "N") {
      this.y -= this.speed;
      if (this.y < 0) {
        this.y = height;
      }
    } else if (direction === "S") {
      this.y = (this.y + this.speed) % height;
    } else if (direction === "E") {
      this.x = (this.x + this.speed) % width;
    } else if (direction === "W") {
      this.x -= this.speed;
      if (this.x < 0) {
        this.x = width;
      }
    } else {
      console.log("Error: invalid direction");
    }
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.tail.pop();
  }

  showSelf() {
    // displaing the snake
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    // If the head of the snake collides with the apple...
    if (
      collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        currentApple.x,
        currentApple.y,
        currentApple.size,
        currentApple.size
      )
    ) {
      // Make a new apple and increment the score
      score += round(currentApple.fresh / 12);
      currentApple = new Apple();
      this.extendTail();
      this.speed += 1;
    }
    if (currentApple.fresh <= 0) {
      currentApple = new Apple();
    }
  }

  checkCollisions() {
    // If there is only one tail segment, no need to check
    if (this.tail.length <= 2) {
      return;
    }

    for (let i = 1; i < this.tail.length; i++) {
      if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
        gameOver();
      }
    }
  }

  extendTail() {
    // adding to tail once colliding with apple
    let lastTailSegment = this.tail[this.tail.length - 1];
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y));
  }
}

class TailSegment {
  constructor(xpos, ypos) {
    // defining variables for snake tail segments
    this.size = 10;
    this.x = xpos;
    this.y = ypos;
  }

  showSelf() {
    fill(0);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Apple {
  constructor() {
    // defining variables for apples
    this.size = 10;
    this.x = random(10, width - 10);
    this.y = random(10, height - 10);
    this.fresh = 12 * 5;
  }

  showSelf() {
    // displaying apples
    this.fresh -= 1;
    if (this.fresh <= 0) {
      return;
    }
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  // player controlls
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction.push("N");
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction.push("S");
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction.push("E");
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction.push("W");
  } else if (keyCode === 32) {
    restartGame();
  } else {
    console.log("wrong key");
  }
}

function restartGame() {
  // reseting game
  score = 0;
  playerSnake = new Snake();
  currentApple = new Apple();
  loop();
}

function gameOver() {
  // game over sequence
  console.log("GAME OVER!");
  stroke(0);
  text("GAME OVER", 50, 50);
  noLoop();
}
