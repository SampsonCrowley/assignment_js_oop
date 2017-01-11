
ASTEROIDS.Model.move = function move(){
  this.moveAsteroids();
  this.moveShip();
  this.moveBullets();
  this.checkCollision();
}

ASTEROIDS.Model.screenWrap = function screenWrap(obj){
  reset = false;
  // Right Side
  if(obj.x - obj.radius >= this.width){
    // console.log("off the right");
    obj.x -= this.width;
    reset = true;
    // Left Side
  } else if(obj.x + obj.radius <= 0) {
    // console.log("off the left side");
    obj.x += this.width;
    reset = true;
  }
  // Bottom Side
  if(obj.y - obj.radius >= this.height) {
    // console.log("off the bottom");
    obj.y -= this.height;
    reset = true;
    // Top Side
  } else if(obj.y + obj.radius <= 0) {
    // console.log("off the top");
    obj.y += this.height;
    reset = true;
  }
  return reset;
}
