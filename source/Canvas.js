export default class Canvas {
  constructor(canvas_container) {
    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d');
    this.element.width = 320;
    this.element.height = 400;
    this.element.id = 'game-canvas';
    canvas_container.appendChild(this.element);
  }
  
  get_width() {
    return this.element.width;
  }
  
  get_height() {
    return this.element.height;
  }
}