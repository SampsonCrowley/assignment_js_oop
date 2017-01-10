ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = {
  init: function init(options) {
    options = options || {};

    this.height = options.width || window.innerWidth;
    this.width = options.height || window.innerHeight;
  }
}
var _AM = ASTEROIDS.Model

_AM.Moveable = function Moveable(coords) {
  coords = coords || {};
  this.x = coords.x || _AM.height/2;
  this.y = coords.y || _AM.width/2;
  this.vx = coords.vx || 0;
  this.vy = coords.vy || 0;
}

_AM.Moveable.prototype.tic = function(){
  this.x += this.vx;
  this.y += this.vy;

  return this.x + ", " + this.y;
}

_AM.Asteroid = function Asteroid(coords){
  coords = coords || {};

  coords.x = coords.x || Math.random() * ASTEROIDS.Model.width;
  coords.y = coords.y || Math.random() * ASTEROIDS.Model.height;
  coords.vx = coords.vx || Math.random() * 3;
  coords.vy = coords.vy || Math.random() * 3;
  _AM.Moveable.call(this, coords);
}

_AM.Asteroid.prototype = Object.create(_AM.Moveable.prototype);
_AM.Asteroid.prototype.constructor = _AM.Asteroid;
