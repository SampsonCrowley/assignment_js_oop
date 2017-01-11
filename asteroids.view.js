ASTEROIDS = ASTEROIDS || {}

ASTEROIDS.View = {
  init: function init(cb) {
    this.setHTML();
    this.initCanvas();
    this.listeners(cb);
    this.renderBackground();
  },
  setHTML: function setHTML(){
    this.gameWrapper = document.getElementsByTagName('asteroids')[0] || this.createWrapper();
    this.backgroundCanvas = this.gameWrapper.getElementsByClassName('asteroids-background')[0] || this.createCanvas('asteroids-background');
    this.asteroidCanvas = this.gameWrapper.getElementsByClassName('asteroids-objects')[0] || this.createCanvas('asteroids-objects');
  },
  initCanvas: function initCanvas() {
    this.bgContext = this.backgroundCanvas.getContext('2d');
    this.bgContext.fillStyle = "black";
    this.astrdContext = this.asteroidCanvas.getContext('2d');
    this.resize();
  },
  listeners: function listeners(cb){
    cb = cb || {};
    var _this = this;

    if(cb.keyDown){
      document.body.addEventListener("keydown", function(e) {
        cb.keyDown(e.which || e.keyCode || 0)
      });
      document.body.addEventListener("mousedown", function(e) {
        cb.keyDown("click")
      });
    }

    if(cb.keyUp){
      document.body.addEventListener("keyup", function(e) {
        cb.keyUp(e.which || e.keyCode || 0)
      });
      document.body.addEventListener("mouseup", function(e) {
        cb.keyUp("click")
      });
    }

    window.addEventListener('resize', function() {
      _this.resize();
      if(cb.resize){
        cb.resize(_this.width, _this.height);
      }
    });
  },
  resize: function resize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.backgroundCanvas.height = this.height;
    this.backgroundCanvas.width = this.width;
    this.asteroidCanvas.height = this.height;
    this.asteroidCanvas.width = this.width;

    this.renderBackground();
  },
  createWrapper: function createWrapper() {
    var wrapper = document.createElement('ASTEROIDS');
    document.body.appendChild(wrapper);

    return wrapper;
  },
  createCanvas: function createCanvas(className) {
    var canvas = document.createElement('CANVAS');
    canvas.classList.add(className);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    this.gameWrapper.appendChild(canvas);

    return canvas;
  },
  renderBackground: function renderBackground() {
    this.bgContext.clearRect(0,0, this.width, this.height);
    this.bgContext.fillRect(0,0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  },
  clearEntities: function clearEntities(){
    this.astrdContext.strokeStyle = "white";
    this.astrdContext.clearRect(0,0, this.width, this.height);
  },
  renderEntities: function renderEntities(objects){
    this.clearEntities();
    this.renderCircles(objects.circles);
    this.renderPolygons(objects.polygons);
  },
  renderCircles: function renderObjects(objects){
    var _this = this;
    for(var i = 0; i < objects.length; i++){
      this.drawCircle(objects[i])
      this.screenWrap(objects[i], function(addX, addY){
        _this.drawCircle(objects[i], addX, addY);
      });
    }
  },
  drawCircle: function renderObjects(object, addX, addY){
    addX = addX || 0, addY = addY || 0;
    this.astrdContext.beginPath();
    this.astrdContext.arc(object.x + addX, object.y + addY, object.radius, 0, Math.PI*2);
    this.astrdContext.stroke();

  },
  renderPolygons: function renderPolygon(polygons){
    var _this = this;
    for(var i = 0; i < polygons.length; i++){
      this.drawPolygon(polygons[i])
      this.screenWrap(polygons[i], function(addX, addY){
        _this.drawPolygon(polygons[i], addX, addY)
      });
    }
  },
  drawPolygon: function drawPolygon(polygon, addX, addY) {
    addX = addX || 0, addY = addY || 0;

    this.astrdContext.beginPath();
    this.astrdContext.moveTo(polygon.vertices[0][0] + addX, polygon.vertices[0][1] + addY);
    for(var i = 1; i < polygon.vertices.length; i++){
      this.astrdContext.lineTo(polygon.vertices[i][0] + addX, polygon.vertices[i][1] + addY);
    }
    this.astrdContext.closePath();
    this.astrdContext.stroke()
  },
  screenWrap: function screenWrap(obj, cb){
    var addX = 0, addY = 0;
    if(obj.x + obj.radius >= this.width){
      addX = -this.width;
    } else if(obj.x - obj.radius <= 0){
      addX = this.width;
    }
    if(obj.y + obj.radius >= this.height){
      addY = -this.height;
    } else if(obj.y - obj.radius <= 0){
      addY = this.height;
    }

    if( addX || addY) {
      cb(addX, addY);
    }
  },
  gameOver: function gameOver(){
    this.astrdContext.font="50vh Verdana";
    this.astrdContext.fillStyle="white";
    this.astrdContext.fillText("Game Over", this.width/4, this.height*.75, this.width/2)
  }
}
