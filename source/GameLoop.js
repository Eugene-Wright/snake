export default class GameLoop {
  constructor(update, draw, config) {
    this.config = config;
    this.update = update;
    this.draw = draw;
    this.start = this.start.bind(this);
  }
  
  start() {
    requestAnimationFrame(this.start);
    if (++this.config.step < this.config.max_step) {
      return;
    }
    this.config.step = 0;
    this.update();
    this.draw();
  }
}