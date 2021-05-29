import Game from './Game.js';

const canvas_container = document.querySelector('.canvas-wrapper');
const score_container = document.querySelector('.game-score');

new Game(canvas_container, score_container);
