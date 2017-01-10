ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Controller = {
  init: function init(){
    this.model = ASTEROIDS.Model;
    this.view = ASTEROIDS.View;
    this.model.init();
    this.view.init({resize: ASTEROIDS.Controller.resize});
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
    requestAnimationFrame(function(){ASTEROIDS.Controller.animate()});
    this.model.moveAsteroids();
    this.view.renderAsteroids(this.model.asteroids);
  }
}
