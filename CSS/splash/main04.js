const root = document.getElementById("root");
const canvas = setCanvas(root, root.offsetWidth, root.offsetHeight);
// コンテキスト取得
const ctx = canvas.getContext("2d");

// 描画
drawArc(ctx, 10, 10, 10, "red");

function drawArc(context, x, y, r, color) {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  context.closePath();
  context.fillStyle = color;
  context.fill();
}

//
const petals = createPetals(10);

//

// create some petals
function createPetal() {
  return {
    x: Math.random() * root.offsetWidth,
    y: 0,
    speed: 2 + Math.random() * 3, //  2 ~ 5
    color: 'red'
  };
}

//
function createPetals(num) {
  const ary = [];
  for (let i = 0; i < num; i++) ary.push(createPetal());
  return ary;
}

function setCanvas(node, w, h) {
  const canvas = document.createElement("canvas");
  node.appendChild(canvas);

  canvas.width = w;
  canvas.height = h;
  return canvas;
}
