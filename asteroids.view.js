ASTEROIDS = ASTEROIDS || {}

ASTEROIDS.View = {
  init: function init() {
    this.gameWrapper = document.getElementsByTagName('asteroids')[0] || this.createWrapper();
    this.backgroundCanvas = this.gameWrapper.getElementsByClassName('asteroids-background')[0] || this.createCanvas('asteroids-background');
    this.objectsCanvas = this.gameWrapper.getElementsByClassName('asteroids-objects')[0] || this.createCanvas('asteroids-objects');
    this.initCanvas();
    this.renderBackground();
  },
  initCanvas: function initCanvas() {
    this.bgContext = this.backgroundCanvas.getContext('2d');
    this.objsContext = this.objectsCanvas.getContext('2d');

    var _this = this;

    window.addEventListener('resize', function() { _this.resize(); })
  },
  resize: function resize() {
    this.backgroundCanvas.height = window.innerHeight;
    this.backgroundCanvas.width = window.innerWidth;
    this.objectsCanvas.height = window.innerHeight;
    this.objectsCanvas.width = window.innerWidth;

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
  }
}
