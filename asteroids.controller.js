ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Controller = {
  init: function init(){
    this.model = ASTEROIDS.Model;
    this.view = ASTEROIDS.View;
    this.model.init();
    this.view.init({resize: ASTEROIDS.Controller.resize, keyDown: ASTEROIDS.Model.startKey, keyUp: ASTEROIDS.Model.stopKey,});
    this.animationSpeed();
    this.animate()
  },
  resize: function(w, h){
    ASTEROIDS.Model.newSize(w, h);
  },
  animationSpeed: function animationSpeed(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  },
  animate: function animate(){
    if(this.model.gameOver){
      this.gameOver();
      return;
    }
    requestAnimationFrame(function(){ASTEROIDS.Controller.animate()});

    this.model.move();
    this.view.renderEntities({
      circles: this.model.asteroids,
      polygons: [this.model.ship, ...this.model.bullets]
    })
    this.model.increaseLevel();
  },
  gameOver: function gameOver(){
    this.view.gameOver();
  }
}
