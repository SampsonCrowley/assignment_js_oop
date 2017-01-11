ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = ASTEROIDS.Model || {}

ASTEROIDS.Model.initAsteroids = function initAsteroids(num) {
  num = Math.max((num || 3), 1);

  for(var i=0; i < num; i++){
    this.addAsteroid();
  }
  var _this = this;
  this.randAsteroid = setInterval(function(){
    (Math.random() > _this.asteroidChance() ? _this.addAsteroid() : null)
  }, 1000)
}

ASTEROIDS.Model.addAsteroid = function addAsteroid(options){
  this.asteroids.push( new this.Asteroid(options));
}

ASTEROIDS.Model.moveAsteroids = function moveAsteroids(){
  for(var i = 0; i < this.asteroids.length; i++){
    this.asteroids[i].tic();
    this.screenWrap(this.asteroids[i]);
  }
}

ASTEROIDS.Model.Asteroid = function Asteroid(coords){
  coords = coords || {};

  coords.x = coords.x || Math.random() * ASTEROIDS.Model.width;
  coords.y = coords.y || Math.random() * ASTEROIDS.Model.height;
  coords.vx = coords.vx || ((Math.random() * ASTEROIDS.Model.gameLevel) + ASTEROIDS.Model.minSpeed) * (Math.random() > .5 ? -1 : 1);
  coords.vy = coords.vy || ((Math.random() * ASTEROIDS.Model.gameLevel) + ASTEROIDS.Model.minSpeed) * (Math.random() > .5 ? -1 : 1);
  this.radius = coords.radius || (Math.random() * 30) + 10;
  ASTEROIDS.Model.Moveable.call(this, coords);

  this.newVel = function newVel(op){
    var dir = (this.vx < 0 ? -1 : 1);
    var magnitude = Math.sqrt(this.vy*this.vy + this.vx*this.vx)
    var theta = Math.atan(this.vx / this.vy) + op*Math.atan(this.vx / this.vy)/2
    return [magnitude * Math.cos(theta) * dir, magnitude * Math.sin(theta) * dir]
  }

  this.split = function() {
    if(this.radius == 10){
      return false
    } else {
      if(this.radius < 20){
        this.radius = 10;
      } else {
        this.radius /= 2
      }
      var vel1 = this.newVel(1)
      var vel2 = this.newVel(-1)
      this.vx = vel1[0]
      this.vy = vel1[1]
      return new ASTEROIDS.Model.Asteroid({
        x: this.x,
        y: this.y,
        vx: vel2[0],
        vy: vel2[1],
        radius: this.radius
      })
    }
  }
}

ASTEROIDS.Model.Asteroid.prototype = Object.create(ASTEROIDS.Model.Moveable.prototype);
ASTEROIDS.Model.Asteroid.prototype.constructor = ASTEROIDS.Model.Asteroid;
