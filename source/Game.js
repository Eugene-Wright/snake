import Config from './Config.js';
import Canvas from './Canvas.js';
import GameLoop from './GameLoop.js';
import Snake from './Snake.js';
import Berry from './Berry.js';
import Score from './Score.js';

export default class Game {
  constructor(canvas_container, score_container) {
    this.config = new Config();
    this.canvas = new Canvas(canvas_container);
    this.score = new Score(score_container, this.config);
    this.snake = new Snake(this.canvas, this.config);
    this.berries = this._create_berries();
    this.loop = new GameLoop(
      this.update.bind(this),
      this.draw.bind(this),
      this.config
    ).start();
  }
  
  update() {
    this.snake.update();
    if (!this.snake.alive) {
      this.new_game();
      return;
    }
    this.berries.forEach((berry, index) => {
      if (this.snake.collision_with_berry(berry)) {
        this.score.increment();
        this.berries.splice(index, 1);
        if (this.berries.length === 0) {
          const extra_berries = new Array(Math.floor(Math.random() * 3) + 1);
          for (let i = 0; i < extra_berries.length; i++) {
            extra_berries[i] = this._new_berry();
          }
          this.berries.push(...extra_berries);
        }
      }
    });
  }
  
  draw() {
    this._clear_canvas();
    this.berries.forEach((berry) => {
      berry.draw();
    });
    this.snake.draw();
  }
  
  new_game() {
    this.score.clear();
    this.snake.refresh();
    this.berries = this._create_berries();
    this.config.max_step = 10;
    this.config.step = 0;
  }
  
  _clear_canvas() {
    this.canvas.context.clearRect(
      0, 0,
      this.canvas.get_width(),
      this.canvas.get_height()
    );
  }
  
  _create_berries() {
    const berries = []
    for (let i = 0; i < this.config.max_berries; i++) {
      berries.push(this._new_berry());
    }
    return berries;
  }
  
  _new_berry() {
    return new Berry(this.canvas, this.config);
  }
}