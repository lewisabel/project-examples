/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random, noStroke,
          rect, ellipse, stroke, image, text, mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight */

let dots;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  dots = [];
  
  for(let i = 0; i<100; i++){
    dots.push(
      new bouncyDot(
      random(width),
      random(height),
      random(5, 12),
      random(360),
      random(0.5, 3),
      random(0.5, 3)
      )
    )
  }
  
  // use the master velocities to set xVelocity and yVelocity on each dot
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    dot.xVelocity = dot.baseXvelocity;
    dot.yVelocity = dot.baseYvelocity;
  }
}

function draw() {
  background(220, 0, 80);
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    
    // call the move method
    dot.move();
    
    // draw the dot
    dot.render();
    
  }
}

class bouncyDot {
  constructor(x, y, r, color, baseXvelocity, baseYvelocity){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.baseXvelocity = baseXvelocity;
    this.baseYvelocity = baseYvelocity;
  }
  
  move(){
    // determining directions of movement and detecting if cirlces have reached an edge
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.baseXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.baseXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.baseYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.baseYvelocity;
    }
  }
  
  render(){
    fill(this.color, 30, 90);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
  
}

function mousePressed() {
  // console log statements only
  console.log(dots);
}