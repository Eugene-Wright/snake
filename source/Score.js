export default class Score {
  constructor(score_container, config) {
    this.config = config;
    this.element = document.createElement('span');
    this.clear();
    this._update();
    this.element.className = 'score-count';
    score_container.appendChild(this.element);
  }
  
  increment() {
    this.value++;
    if (this.value > 0 && this.value % 5 === 0) {
      if (this.config.max_step > 3) this.config.max_step--;
    }
    this._update();
  }
  
  clear() {
    this.value = 0;
    this._update();
  }
  
  _update() {
    this.element.innerHTML = this.value;
  }
}
