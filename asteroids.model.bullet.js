ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = ASTEROIDS.Model || {}
ASTEROIDS.Model.bullets = [];
ASTEROIDS.Model.firing = false;

ASTEROIDS.Model.moveBullets = function moveBullets(){
  for(var i = 0; i < this.bullets.length; i++){
    this.bullets[i].setVertices();
    this.bullets[i].tic()
    if(this.screenWrap(this.bullets[i])){
      this.bullets.splice(i, 1)
    }
  }
}

ASTEROIDS.Model.Bullet = function Bullet(coords){
  coords = coords || {};

  coords.x = coords.x;
  coords.y = coords.y;
  coords.vx = coords.vx;
  coords.vy = coords.vy;
  this.direction = coords.direction;
  this.radius = 5;

  ASTEROIDS.Model.Moveable.call(this, coords);

  this.setVertices = function() {
    this.vertices = [
      [this.x + this.dx(this.direction), this.y + this.dy(this.direction)],
      [this.x + this.dx(this.direction + Math.PI), this.y + this.dy(this.direction + Math.PI)],
    ]
  }
}
ASTEROIDS.Model.Bullet.prototype = Object.create(ASTEROIDS.Model.Moveable.prototype);
ASTEROIDS.Model.Bullet.prototype.constructor = ASTEROIDS.Model.Bullet;
