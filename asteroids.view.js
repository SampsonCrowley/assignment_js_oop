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
        cb.resize(this.width, this.height);
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
    for(var i = 0; i < objects.length; i++){
      this.clearAsteroid(objects[i])
    }
    for(var i = 0; i < objects.length; i++){
      this.objsContext.beginPath();
      this.objsContext.arc(objects[i].x, objects[i].y, objects[i].width, 0, Math.PI*2);
      this.objsContext.stroke();
      // if(objects[i].x + objects[i].width >= this.width && objects[i].y + objects[i].width >= this.height){
      //   this.objsContext.beginPath();
      //   this.objsContext.arc(objects[i].x-this.width, objects[i].y-this.height, objects[i].width, 0, Math.PI*2);
      //   this.objsContext.stroke();
      // } else if(objects[i].x - objects[i].width <= 0 && objects[i].y - objects[i].width <= 0){
      //   this.objsContext.beginPath();
      //   this.objsContext.arc(objects[i].x+this.width, objects[i].y+this.height, objects[i].width, 0, Math.PI*2);
      //   this.objsContext.stroke();
      // } else if(objects[i].x + objects[i].width >= this.width){
      //   this.objsContext.beginPath();
      //   this.objsContext.arc(objects[i].x-this.width, objects[i].y, objects[i].width, 0, Math.PI*2);
      //   this.objsContext.stroke();
      // } else if(objects[i].x - objects[i].width <= 0) {
      //   this.objsContext.beginPath();
      //   this.objsContext.arc(objects[i].x+this.width, objects[i].y, objects[i].width, 0, Math.PI*2);
      //   this.objsContext.stroke();
      // } else if(objects[i].y + objects[i].width >= this.height) {
      //   this.objsContext.beginPath();
      //   this.objsContext.arc(objects[i].x, objects[i].y-this.height, objects[i].width, 0, Math.PI*2);
      //   this.objsContext.stroke();
      // } else if(objects[i].y - objects[i].width <= 0) {
      //   this.objsContext.beginPath();
      //   this.objsContext.arc(objects[i].x, objects[i].y+this.height, objects[i].width, 0, Math.PI*2);
      //   this.objsContext.stroke();
      // }
    }
  },
  renderSpaceship: function renderSpaceship(){

  }
}
