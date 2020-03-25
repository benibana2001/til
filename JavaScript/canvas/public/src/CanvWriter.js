class Canv {}

Canv.rootNode = void 0;
Canv.btnListNode = void 0;
Canv.canvas = void 0;
Canv.ctx = void 0;
Canv.funcs = new Map();
Canv.currentFuncID = void 0;

Canv.setNode = root => {
  Canv.rootNode = root;
  Canv.btnListNode = document.createElement('div');
  Canv.rootNode.appendChild(Canv.btnListNode);
};

Canv.createBtn = (node, name, func) => {
  const btn = document.createElement('button');
  btn.innerText = name;
  btn.addEventListener('click', func);
  node.appendChild(btn);
};

Canv.addFunc = (funcs, root = document.getElementById('root')) => {
  Canv.setNode(root);

  for (const func of funcs) {
    const name = func.name;
    Canv.funcs.set(name, func);
    Canv.createBtn(Canv.btnListNode, name, () => Canv.exeFunc(name));
  }

  Canv.defaultFunc(funcs[funcs.length - 1].name);
};

Canv.defaultFunc = name => {
  name = location.search ? location.search.slice(1) : name;
  Canv.exeFunc(name);
};

Canv.setCanvSize = (x = window.innerWidth) => (y = 600) => {
  Canv.canvas.width = x;
  Canv.canvas.height = y;
};

Canv.imgLoaded = [];

Canv.waitResolveImgs = async () => await Promise.all(Canv.imgLoaded);

Canv.createImg = path => {
  const img = new Image();
  const promise = new Promise(resolve => {
    img.src = path;

    img.onload = () => resolve(true);

    console.log(`resolved: ${path}`);
  });
  Canv.imgLoaded.push(promise);
  return img;
};

Canv.exeFunc = name => {
  // Remove old canvas, function, imgPromises
  if (Canv.canvas) Canv.rootNode.removeChild(Canv.canvas);

  if (Canv.currentFuncID) {
    cancelAnimationFrame(Canv.currentFuncID);
    Canv.currentFuncID = 0;
  }

  if (Canv.imgLoaded) Canv.imgLoaded = [];
  if (Canv.events) Canv.removeEvents(); // Create canvas Html Element

  Canv.canvas = document.createElement('canvas');
  Canv.rootNode.appendChild(Canv.canvas);
  Canv.setCanvSize()(); // Instanciate Context 

  Canv.ctx = Canv.canvas.getContext('2d'); // Exec function

  Canv.funcs.get(name)(Canv.ctx);
};

Canv.loop = f => {
  if (Canv.currentFuncID) cancelAnimationFrame(Canv.currentFuncID);

  const requestAnimFrame = (() => window.requestAnimationFrame || window.webkitRequestAnimationFrame || ( // window.mozRequestAnimationFrame ||
  // window.msRequestAnimationFrame ||
  callback => window.setTimeout(callback, 1000 / 60)))();

  const repeat = () => {
    f();
    Canv.currentFuncID = requestAnimFrame(repeat);
  };

  Canv.currentFuncID = requestAnimFrame(repeat);
};

Canv.events = [];

Canv.registerEvent = (type, func) => {
  Canv.events.push([type, func]);
  window.addEventListener(type, func);
};

Canv.removeEvents = () => {
  for (let e of Canv.events) {
    window.removeEventListener(e[0], e[1]);
  }
};

Canv.drawBG = (color, clear = true) => {
  const clearBG = () => Canv.ctx.clearRect(0, 0, Canv.canvas.width, Canv.canvas.height);

  if (clear) clearBG();
  Canv.ctx.fillStyle = color;
  Canv.ctx.fillRect(0, 0, Canv.canvas.width, Canv.canvas.height);
};

Canv.drawArc = (x, y, r, color) => {
  Canv.ctx.beginPath();
  Canv.ctx.arc(x, y, r, 0, Math.PI * 2);
  Canv.ctx.closePath();
  Canv.ctx.fillStyle = color;
  Canv.ctx.fill();
};

Canv.randomRGBA = opacity => `rgba(${randomColor()},${randomColor()},${randomColor()}, ${opacity})`;

Canv.particle = O => size => col => [O.x, O.y, size, col];

Canv.moveParticle = O => size => col => V => {
  O.x += V.x;
  O.y += V.y;
  return [O.x, O.y, size, col];
};

Canv.moveObj = O => V => {
  O.x += V.x;
  O.y += V.y;
  return {
    x: O.x,
    y: O.y,
    w: O.w,
    h: O.h
  };
};

Canv.parse = data => {
  const frames = data.frames;

  const frametoary = frameObj => [frameObj.x, frameObj.y, frameObj.w, frameObj.h];

  let ary = [];

  for (let key of Object.keys(frames)) {
    ary.push(frametoary(frames[key].frame));
  }

  return ary;
};

Canv.keydownHandler = funcs => e => {
  const isArrowKey = e => e.key.slice(0, 5) === 'Arrow';

  if (isArrowKey(e)) e.preventDefault();

  switch (e.key) {
    case 'ArrowRight':
      if (funcs.right) funcs.right();
      break;

    case 'ArrowLeft':
      if (funcs.left) funcs.left();
      break;

    case 'ArrowUp':
      if (funcs.up) funcs.up();
      break;

    case 'ArrowDown':
      if (funcs.down) funcs.down();
      break;
  }
};

Canv.keyupHandler = func => e => func();

Canv.drawImage = (source, inputFrame, outputImage) => {
  Canv.ctx.drawImage(source, ...inputFrame, ...[outputImage.x, outputImage.y, outputImage.w, outputImage.h]);
};

Canv.flipImage = image => {
  const canv = document.createElement('canvas');
  const ctx = canv.getContext('2d');
  const newImage = new Image();
  canv.width = image.width;
  canv.height = image.height;
  ctx.scale(-1, 1);
  ctx.drawImage(image, -image.width, 0);
  newImage.src = canv.toDataURL();
  return newImage;
};

const randomColor = () => Math.random() * 255;

export default Canv;