ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = ASTEROIDS.Model || {}

ASTEROIDS.Model.moveShip = function moveShip(){
  console.log(this.keys)
  if (this.keys[38] || this.keys[87]) {
    // up arrow
    this.ship.vx += this.ship.dx(this.ship.direction, 0.05)
    this.ship.vy += this.ship.dy(this.ship.direction, 0.05)
  }
  if (this.keys[39] || this.keys[68]) {
    // right arrow
    this.ship.direction += (Math.PI/30)
  }
  if (this.keys[37] || this.keys[65]) {
    // left arrow
    this.ship.direction -= (Math.PI/30)
  }
  if(this.keys[32] || this.keys["click"]){
    // spacebar
    if(!this.firing){
      this.firing = true;
      this.bullets.push(this.ship.fire())
    }
  } else {
    this.firing = false
  }
  this.ship.tic();
  this.ship.setVertices();
  this.screenWrap(this.ship)
}

ASTEROIDS.Model.Ship = function Ship(coords){
  coords = coords || {};

  coords.x = coords.x || ASTEROIDS.Model.width/2;
  coords.y = coords.y || ASTEROIDS.Model.height/2;
  coords.vx = coords.vx || 0;
  coords.vy = coords.vy || 0;
  this.direction = coords.direction || Math.PI*3/2;
  this.radius = coords.radius || 20;
  ASTEROIDS.Model.Moveable.call(this, coords);

  this.setVertices = function() {
    this.vertices = [
      [this.x + this.dx(this.direction), this.y + this.dy(this.direction)],
      [this.x + this.dx(this.direction + 3*Math.PI/4), this.y + this.dy(this.direction + 3*Math.PI/4)],
      [this.x + this.dx(this.direction + Math.PI, this.radius*2/5), this.y + this.dy(this.direction + Math.PI,this.radius*2/5)],
      [this.x + this.dx(this.direction - 3*Math.PI/4), this.y + this.dy(this.direction - 3*Math.PI/4)]
    ]
  }
  this.fire = function fire(){
    return new ASTEROIDS.Model.Bullet({
      x: this.x,
      y: this.y,
      vx: this.dx(this.direction, 5),
      vy: this.dy(this.direction, 5),
      direction: this.direction,
    })
  }
}

ASTEROIDS.Model.Ship.prototype = Object.create(ASTEROIDS.Model.Moveable.prototype);
ASTEROIDS.Model.Ship.prototype.constructor = ASTEROIDS.Model.Ship;
