ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = {
  init: function init(options) {
    options = options || {};

    this.height = options.width || window.innerWidth;
    this.width = options.height || window.innerHeight;
    this.asteroids = [new this.Asteroid()];
    for(var i=0; i < 15; i++){
      this.asteroids.push( new this.Asteroid())
    }
  },
  newSize: function newSize(w, h){
    this.height = w;
    this.width = h;
  },
  moveAsteroids: function moveAsteroids(){
    for(var i = 0; i < this.asteroids.length; i++){
      if(this.asteroids[i].dirty){
        this.asteroids[i].tic();
      }
    }
  },
  offScreen: function offScreen(obj, side, point){
    var coords = {}
    return {
      top: function offTop(point){

      },
      bottom: function offBottom(point){

      },
      right: function offRight(point){

      },
      left: function offLeft(point){

      }
    }[side](point)
  }
}

var _AM = ASTEROIDS.Model

_AM.Moveable = function Moveable(coords) {
  coords = coords || {};
  this.x = coords.x || _AM.height/2;
  this.y = coords.y || _AM.width/2;
  this.vx = coords.vx || 0;
  this.vy = coords.vy || 0;
  this.dirty = true;

}

_AM.Moveable.prototype.tic = function(){
  this.x += this.vx;
  this.y += this.vy;
  this.dirty = true;

  return this.x + ", " + this.y;
}

_AM.Asteroid = function Asteroid(coords){
  coords = coords || {};

  coords.x = coords.x || Math.random() * ASTEROIDS.Model.width;
  coords.y = coords.y || Math.random() * ASTEROIDS.Model.height;
  coords.vx = coords.vx || (Math.random() * 3) * (Math.random() > .5 ? -1 : 1);
  coords.vy = coords.vy || (Math.random() * 3) * (Math.random() > .5 ? -1 : 1);
  this.width = (Math.random() * 30) + 10;
  this.height = (Math.random() * 30) + 10;
  _AM.Moveable.call(this, coords);
}

_AM.Asteroid.prototype = Object.create(_AM.Moveable.prototype);
_AM.Asteroid.prototype.constructor = _AM.Asteroid;
