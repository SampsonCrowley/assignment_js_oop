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
    this.objectsCanvas = this.gameWrapper.getElementsByClassName('asteroids-objects')[0] || this.createCanvas('asteroids-objects');
  },
  initCanvas: function initCanvas() {
    this.bgContext = this.backgroundCanvas.getContext('2d');
    this.objsContext = this.objectsCanvas.getContext('2d');
    this.resize();
  },
  listeners: function listeners(cb){
    cb = cb || {};
    var _this = this;

    if(cb.keyDown){
      document.body.addEventListener("keydown", function(e) {
        cb.keyDown(e.which || e.keyCode || 0)
      });
    }

    if(cb.keyUp){
      document.body.addEventListener("keyup", function(e) {
        cb.keyUp(e.which || e.keyCode || 0)
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
    this.objectsCanvas.height = this.height;
    this.objectsCanvas.width = this.width;

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
    this.bgContext.fillStyle = "black";
    this.bgContext.fillRect(0,0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  },
  clearAsteroid: function clearAsteroid(obj){
    this.objsContext.clearRect(obj.x - obj.width - (obj.vx + 1),
    obj.y - obj.width -(obj.vy + 1),
    obj.width*2 + 2, obj.width*2 + 2);
  },
  renderAsteroids: function renderObjects(objects){
    this.objsContext.strokeStyle = "white";
    // for(var i = 0; i < objects.length; i++){
    //   this.clearAsteroid(objects[i])
    // }

    this.objsContext.clearRect(0,0, this.width, this.height);

    for(var i = 0; i < objects.length; i++){
      this.objsContext.beginPath();
      this.objsContext.arc(objects[i].x, objects[i].y, objects[i].width, 0, Math.PI*2);
      this.objsContext.stroke();
      this.screenWrap(objects[i]);
    }
  },
  screenWrap: function screenWrap(obj){
    // Bottom right corner
    if(obj.x + obj.width >= this.width && obj.y + obj.width >= this.height){
      console.log("off the bottom right");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x-this.width, obj.y-this.height, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Top right Corner
    } else if(obj.x + obj.width >= this.width && obj.y - obj.width <= 0){
      console.log("off the top right");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x-this.width, obj.y+this.height, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Top Left Corner
    } else if(obj.x - obj.width <= 0 && obj.y - obj.width <= 0){
      console.log("off the top left");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x+this.width, obj.y+this.height, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Bottom Left Corner
    } else if(obj.x - obj.width <= 0 && obj.y + obj.width >= this.height){
      console.log("off the bottom left");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x+this.width, obj.y-this.height, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Right Side
    } else if(obj.x + obj.width >= this.width){
      console.log("off the right");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x-this.width, obj.y, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Left Side
    } else if(obj.x - obj.width <= 0) {
      console.log("off the left side");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x+this.width, obj.y, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Bottom Side
    } else if(obj.y + obj.width >= this.height) {
      console.log("off the bottom");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x, obj.y-this.height, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
      // Top Side
    } else if(obj.y - obj.width <= 0) {
      console.log("off the top");
      this.objsContext.beginPath();
      this.objsContext.arc(obj.x, obj.y+this.height, obj.width, 0, Math.PI*2);
      this.objsContext.stroke();
    }
  },
  renderSpaceship: function renderSpaceship(){

  }
}
