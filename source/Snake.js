export default class Snake {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.context = canvas.context;
    this.config = config;
    this.refresh();
    this._keydown_handler = this._keydown_handler.bind(this);
    document.addEventListener('keydown', this._keydown_handler);
  }
  
  refresh() {
    this.alive = true;
    this.x = 160;
    this.y = 160;
    this.x_speed = this.config.cell_size;
    this.y_speed = 0;
    this.tail = [];
    this.min_tail_length = 2;
  }
  
  draw() {
    this.tail.forEach((item, index) => {
      if (index === 0) {
        this._draw_item(item.x, item.y, 'rgb(150, 35, 31)', 'rgb(255, 255, 255)');
      } else {
        this._draw_item(item.x, item.y, 'rgb(9, 90, 166)', 'rgb(255, 255, 255)');
      }
    });
  }
  
  update() {
    this._move();
    this._collision_with_border();
    this._collision_with_oneself();
  }
  
  collision_with_berry(berry) {
    if (this.tail[0].x === berry.x && this.tail[0].y === berry.y) {
      this.min_tail_length++;
      return true;
    }
  }
  
  _keydown_handler(event) {
    switch (event.code) {
      case 'ArrowUp': case 'KeyW':
        if (this.y_speed === this.config.cell_size) break;
        this.x_speed = 0;
        this.y_speed = -this.config.cell_size;
        break;
      case 'ArrowDown': case 'KeyS':
        if (this.y_speed === -this.config.cell_size) break;
        this.x_speed = 0;
        this.y_speed = this.config.cell_size;
        break;
      case 'ArrowLeft': case 'KeyA':
        if (this.x_speed === this.config.cell_size) break;
        this.x_speed = -this.config.cell_size;
        this.y_speed = 0;
        break;
      case 'ArrowRight': case 'KeyD':
        if (this.x_speed === -this.config.cell_size) break;
        this.x_speed = this.config.cell_size;
        this.y_speed = 0;
        break;
    }
  }
  
  _move() {
    this.x += this.x_speed;
    this.y += this.y_speed;
    this.tail.unshift( {x: this.x, y: this.y} );
    if (this.tail.length > this.min_tail_length) {
      this.tail.pop();
    }
  }
  
  _draw_item(x, y, inner_color, outer_color) {
    const diameter = this.config.cell_size * 0.5;
    this.context.fillStyle = outer_color;
    this.context.beginPath();
    this.context.arc(x + diameter, y + diameter, diameter * 0.5, 0, Math.PI * 2);
    this.context.fill();
    this.context.beginPath();
    this.context.fillStyle = inner_color;
    this.context.arc(x + diameter, y + diameter, diameter * 0.25, 0, Math.PI * 2);
    this.context.fill();
  }
  
  _collision_with_border() {
    if (this.x > this.canvas.get_width()) this.x = -this.config.cell_size;
    else if (this.x < 0) this.x = this.canvas.get_width();
    if (this.y > this.canvas.get_height()) this.y = -this.config.cell_size;
    else if (this.y < 0) this.y = this.canvas.get_height();
  }
  
  _collision_with_oneself() {
    this.tail.forEach((item, index) => {
      for (let i = index + 1; i < this.tail.length; i++) {
        if (item.x === this.tail[i].x && item.y === this.tail[i].y) {
          this.alive = false;
        }
      }
    });
  }
}
