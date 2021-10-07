/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, createButton */

let backgroundColour, frogX, frogY, frogR, frogD, frogV, vehicles, initialVehcX, vehcHit, powerDowns;

function setup(){
  createCanvas(windowWidth - 20, windowHeight - 20);
  backgroundColour = 2;
  
  colorMode(HSB, 360, 100, 100);
  
  noStroke();
  
  // initialize frog for player 1
  frogX = width/2;
  frogY = height - 20;
  frogR = 10;
  frogD = frogR * 2;
  
  // initializes player 2 settings
  vehicles = [];
  initialVehcX = [-100, width + 100];
  powerDowns = [];
  
}

function draw(){
  
  background(backgroundColour);
  
  // frog
  fill(90, 70, 100);
  ellipse(frogX, frogY, frogD);
  
  // cars move
  for(let i = 0; i < vehicles.length; i++){
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.render();
    vehicle.detectVehcCollisions();
  }
  
}

function keyPressed(){
  
  // move the frog
  if(keyCode == UP_ARROW){
    frogY -= 20;
  }else if(keyCode == DOWN_ARROW){
    frogY += 20;
  }else if(keyCode == LEFT_ARROW){
    frogX -= 20;
  }else if(keyCode == RIGHT_ARROW){
    frogX += 20;
  }
  
  // create obstacles
  else if(keyCode == 65){
    vehicles.push(new vehicle(random(initialVehcX), random(80, height - 80), random(1, 8)));
  }
  
}

function resetFrog(){
  // sets frog in original position
  frogX = width/2;
  frogY = height - 20;
}

class vehicle{
  // defines variables for the vehicle class
  constructor(x, y, v){
    this.x = x;
    this.y = y;
    this.v = v;
    this.initialX = x;
  }
  
  move(){
    
    // if the car starts left of the canvas => move right
    if(this.initialX < 0){
      if(this.x < width + 100){
        this.x += this.v;
      }
    }
    
    // if the car starts right of the canvas => move left
    else if(this.initialX > width){
      if(this.x > -100){
        this.x += -1 * this.v;
      }
    }
  }
  
  render(){

    // car showing up on the screen
    rect(this.x, this.y, 40, 30); 
  }
  
  detectVehcCollisions(){
    // detecting collisions with vehicles
    vehcHit = collideRectCircle(this.x, this.y, 40, 30, frogX, frogY, frogD);
    
    // when frog gets hit returns to starting position
    if(vehcHit == true){
      resetFrog();
    }
  }
}

class powerDown{
  // defines variables for power downs (e.g. make frog velocity slower)
  constructor(type, x, y){
    this.type = type;
    this.x = x;
    this.y = y;
  }
  render(){
    
  }
  detectPowerDownCollision(){
    
  }
}
