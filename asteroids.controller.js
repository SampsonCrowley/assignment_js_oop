ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Controller = {
  init: function init(){
    this.model = ASTEROIDS.Model;
    this.view = ASTEROIDS.View;
    this.model.init();
    this.view.init();
  }
}
