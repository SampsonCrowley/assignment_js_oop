ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = ASTEROIDS.Model || {}
ASTEROIDS.Model.init = function init(options) {
  options = options || {};

  this.gameLevel = options.gameLevel || 0.1;
  this.minSpeed = options.minSpeed || 0.5;
  this.width = options.width || window.innerWidth;
  this.height = options.height || window.innerHeight;
  this.ship = new this.Ship();
  this.ship.setVertices();
  this.asteroids = [];
  this.initAsteroids(options.num);
  this.start = Date.now();
  this.keys = [];
}

ASTEROIDS.Model.increaseLevel = function increaseLevel() {
  this.gameLevel = (Date.now()-this.start)/(1000 * 60)
}

ASTEROIDS.Model.asteroidChance = function asteroidChance() {
  return Math.max((1 - this.gameLevel), .2)
}

ASTEROIDS.Model.pointCircleCollide = function pointCircleCollide(point, circle, r) {
  if (r===0) return false
  var dx = circle[0] - point[0]
  var dy = circle[1] - point[1]
  return dx * dx + dy * dy <= r * r
}

ASTEROIDS.Model.lineCircleCollide = function lineCircleCollide(line, circle, radius) {
  var a = line[0],
  b = line[1]
  //check to see if start or end points lie within circle
  if (this.pointCircleCollide(a, circle, radius)) {
    return true
  } if (this.pointCircleCollide(b, circle, radius)) {
    return true
  }

  var x1 = a[0],
  y1 = a[1],
  x2 = b[0],
  y2 = b[1],
  cx = circle[0],
  cy = circle[1];

  //vector d
  var dx = x2 - x1
  var dy = y2 - y1

  //vector lc
  var lcx = cx - x1
  var lcy = cy - y1

  //project lc onto d, resulting in vector p
  var dLen2 = dx * dx + dy * dy //len2 of d
  var px = dx
  var py = dy
  if (dLen2 > 0) {
    var dp = (lcx * dx + lcy * dy) / dLen2
    px *= dp
    py *= dp
  }

  var nearest = []
  nearest[0] = x1 + px
  nearest[1] = y1 + py

  //len2 of p
  var pLen2 = px * px + py * py

  //check collision
  return this.pointCircleCollide(nearest, circle, radius)
  && pLen2 <= dLen2 && (px * dx + py * dy) >= 0
}
ASTEROIDS.Model.checkCollision = function checkCollision() {
  var shipLines = [
    [this.ship.vertices[0],this.ship.vertices[1]],
    [this.ship.vertices[1],this.ship.vertices[3]],
    [this.ship.vertices[3],this.ship.vertices[0]]
  ], bulletLines;

  for (var i = 0; i < this.asteroids.length; i++){
    for(var n = 0; n < shipLines.length; n++){
      if(this.lineCircleCollide(shipLines[n], [this.asteroids[i].x, this.asteroids[i].y], this.asteroids[i].radius)){
        console.log("collide!");
        this.gameOver = true;
        return true;
      }
    }
    for(var n = 0; n < this.bullets.length; n++) {
      bulletLines = this.bullets[n].vertices;
      if(this.lineCircleCollide(bulletLines, [this.asteroids[i].x, this.asteroids[i].y], this.asteroids[i].radius)){
        this.bullets.splice(n, 1)
        var newAsteroid = this.asteroids[i].split()
        if(newAsteroid){
          this.asteroids.push(newAsteroid)
        }else{
          this.asteroids.splice(i, 1)
        }
      }
    }
  }
}

ASTEROIDS.Model.newSize = function newSize(w, h){
  this.height = h;
  this.width = w;
}

ASTEROIDS.Model.startKey = function startKey(key){
  ASTEROIDS.Model.keys[key] = true;
}
ASTEROIDS.Model.stopKey = function stopKey(key){
  ASTEROIDS.Model.keys[key] = false;
}
