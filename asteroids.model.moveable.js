ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = ASTEROIDS.Model || {}

ASTEROIDS.Model.Moveable = function Moveable(coords) {
  coords = coords || {};
  this.x = coords.x || ASTEROIDS.Model.height/2;
  this.y = coords.y || ASTEROIDS.Model.width/2;
  this.vx = coords.vx || 0;
  this.vy = coords.vy || 0;
}

ASTEROIDS.Model.Moveable.prototype.tic = function(){
  this.x += this.vx;
  this.y += this.vy;

  return this.x + ", " + this.y;
}
ASTEROIDS.Model.Moveable.prototype.dx = function(theta, radius){
  return (radius || this.radius) * Math.cos(theta)
}

ASTEROIDS.Model.Moveable.prototype.dy = function(theta, radius){
  return (radius || this.radius) * Math.sin(theta)
}
