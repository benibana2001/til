"use strict";

var FALLING_CHERRY = {
  INIT_PETAL_COUNT: 200,
  init: function init() {
    this.setParameters();
    this.setup();
    this.render();
  },
  setParameters: function setParameters() {
    this.root = document.getElementById("root");
    this.inner = document.getElementById("inner");
    this.width = this.root.offsetWidth;
    this.height = this.inner.offsetHeight + this.inner.offsetTop;
    this.top = this.root.offsetTop;
    this.left = this.root.offsetLeft;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    this.canvas = this.setCanvas();
    this.context = this.canvas.getContext("2d");
    this.petals = [];

    this.requestAnimFrame = window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame.bind(window) || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  },
  setup: function setup() {
    this.createPetals();
    this.render = this.render.bind(this);
  },
  setCanvas: function setCanvas(w, h) {
    var canvas = document.createElement("canvas");
    this.root.appendChild(canvas);
    canvas.width = this.width;
    canvas.height = this.height;
    return canvas;
  },
  createPetals: function createPetals() {
    for (var i = 0; i < this.INIT_PETAL_COUNT; i++) {
      console.log(this.petals);
      this.petals.push(new Petal(this));
    }
  },
  render: function render() {
    this.requestAnimFrame(this.render);
    this.context.clearRect(0, 0, this.width, this.height); // 背景を更新

    var ctx = this.context;
    this.petals.forEach(function (petal) {
      petal.render(ctx);
    });
  }
};

var Petal = function Petal(renderer) {
  this.MIN_SIZE = 10;
  this.MAX_SIZE = 20;
  this.renderer = renderer;
  this.init();
};

Petal.prototype = {
  init: function init() {
    this.x = Math.random() * this.renderer.width;
    this.y = Math.random() * this.renderer.height;
    this.r = this.MIN_SIZE + Math.random() * this.MAX_SIZE; // 20 ~ 50

    this.vx = -1 + Math.random() * 2;
    this.vy = 1 + Math.random() * 2;
    this.opacity = Math.random();
    this.color = "pink";
  },
  render: function render(context) {
    context.beginPath();
    context.globalAlpha = this.opacity;
    this.renderArc(context);
    context.fillStyle = this.color;
    context.fill();
    this.update();
  },
  renderArc: function renderArc(context) {
    context.arc(this.x + this.r, this.y + this.r, this.r, Math.PI, 1.5 * Math.PI, false);
    context.arc(this.x, this.y, this.r, 0, 0.5 * Math.PI, false);
  },
  update: function update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= this.renderer.width) this.x = 0;
    if (this.x < 0) this.x = this.renderer.width;
    if (this.y >= this.renderer.height) this.y = 0;
  }
};
FALLING_CHERRY.init();

function setCanvas(node, w, h) {
  var canvas = document.createElement("canvas");
  node.appendChild(canvas);
  canvas.width = w;
  canvas.height = h;
  return canvas;
}