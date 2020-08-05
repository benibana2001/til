const FALLING_CHERRY = {
  INIT_PETAL_COUNT: 10,

  init: function () {
    this.setParameters();
    this.setup();
    this.render();
  },
  setParameters: function () {
    this.root = document.getElementById("root");
    this.width = this.root.offsetWidth;
    this.height = this.root.offsetHeight;
    this.canvas = setCanvas(this.root, this.width, this.height);
    this.context = this.canvas.getContext("2d");
    this.petals = [];
    this.requestAnimFrame =
      window.requestAnimationFrame.bind(window) ||
      window.webkitRequestAnimationFrame.bind(window) ||
      ((callback) => window.setTimeout(callback, 1000 / 60));
  },
  setup: function () {
    this.createPetals();
    // bind
    this.render = this.render.bind(this);
  },
  createPetals: function () {
    for (let i = 0; i < this.INIT_PETAL_COUNT; i++) {
      console.log(this.petals);
      this.petals.push(new Petal(this.root));
    }
  },
  render: function () {
    this.requestAnimFrame(this.render);
    this.context.clearRect(0, 0, this.width, this.height); // 背景を更新
    const ctx = this.context;
    this.petals.forEach((petal) => {
      petal.y += petal.speed;
      petal.render(ctx);
    });
  },
};

const Petal = function (renderer) {
  this.renderer = renderer;
  this.init();
};

Petal.prototype = {
  init: function () {
    this.x = Math.random() * this.renderer.offsetWidth;
    this.y = 0;
    this.r = 10;
    this.speed = 2 + Math.random() * 3; //  2 ~ 5
    this.color = "red";
  },
  render: function (context) {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  },
};

FALLING_CHERRY.init();

function setCanvas(node, w, h) {
  const canvas = document.createElement("canvas");
  node.appendChild(canvas);

  canvas.width = w;
  canvas.height = h;
  return canvas;
}
