export default class Berry {
  constructor(canvas, config, color = 'rgb(245, 128, 37)') {
    this.canvas = canvas;
    this.context = canvas.context;
    this.config = config;
    this.color = color;
    const size = this.config.cell_size;
    this.x = this._get_random_int(0, this.canvas.get_width() / size) * size;
    this.y = this._get_random_int(0, this.canvas.get_height() / size) * size;
  }
  
  draw() {
    const diameter = this.config.cell_size * 0.5;
    this.context.save();
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x + diameter, this.y + diameter, diameter * 0.5, 0, Math.PI * 2);
    this.context.fill();
    this.context.restore();
  }
  
  _get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
