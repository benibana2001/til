import * as THREE from "three";
// import GUI from "lil-gui"; // lil-gui https://github.com/georgealways/lil-gui
import { width, height } from "./src/constants";
import * as Objects from "./src/objects";

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { GameFactory } from "./src/GameFactory";

const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// const meshManager = new MeshManager();
// await meshManager.init();

let game,
  gameFactory = new GameFactory(scene, canvas),
  hiScore = 0,
  ElemHighScore = document.querySelector(".high-score")

const textureLoader = new THREE.TextureLoader();
const backgroundImagePath = "./static/bg.jpg";
function loadTexture(path) {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      path,
      (tex) => resolve(tex),
      (error) => reject(error)
    );
  });
}
loadTexture(backgroundImagePath).then((tex) => (scene.background = tex));

scene.add(new THREE.CameraHelper(Objects.camera));
scene.add(Objects.floor);
scene.add(Objects.directionalLight);
scene.add(new THREE.CameraHelper(Objects.directionalLight.shadow.camera));
scene.add(Objects.ambientLight);

await gameFactory.init();

async function init() {
  initMusic();
  // initGame();
  game = await gameFactory.getGame()
  animate()
}

await init();

/**
 * DEBUG
 */
// (() => {
//   const gui = new GUI();
//   gui.domElement.id = "gui";

//   const cameraGUI = gui.addFolder("Camera");
//   const gameGUI = gui.addFolder("Game");
//   const lightGUI = gui.addFolder("Light");

//   gameGUI.add(mainFuncs, "hitBullet");
//   gameGUI.add(mainFuncs, "killGame");
//   gameGUI.add(mainFuncs, "createGame");
//   gameGUI.add(mainFuncs, "consoleLogMesh"),
//     gameGUI.add(mainFuncs, "consoleLogMeshManager"),
//     cameraGUI.add(Objects.camera, "left");
//   cameraGUI.add(Objects.camera, "right");
//   cameraGUI.add(Objects.camera, "top");
//   cameraGUI.add(Objects.camera, "bottom");
//   lightGUI.add(Objects.directionalLight.position, "x", -10, 10, 1);
//   lightGUI.add(Objects.directionalLight.position, "y", -10, 10, 1);
//   lightGUI.add(Objects.directionalLight.position, "z", -10, 10, 1);
//   // const controls = new OrbitControls(Objects.camera, canvas)
//   // const pointerControls = new PointerLockControls( Objects.camera, document.body );
// })();

function animate() {
  if (!game) {
    console.log("no game");
  }

  if (game) {
    if (game.running) {
      game.update();
    }

    // update hi-score
    const lastScore = game.getScore();
    if (lastScore > hiScore) {
      hiScore = lastScore;
    }

    if (game.isOver) {
      ElemHighScore.textContent = hiScore;
    }
  }

  renderer.render(scene, Objects.camera);
  requestAnimationFrame(animate);
}

function initMusic() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector("audio");
  audioElement.loop = true;
  const track = audioContext.createMediaElementSource(audioElement);
  track.connect(audioContext.destination);

  const playButton = document.querySelector("button");
  playButton.addEventListener("click", function () {
    if (audioContext.state === "suspended") {
      console.log("resume");
      audioContext.resume();
    }
    console.log(this.dataset);
    if (this.dataset.playing === "false") {
      console.log("play");
      audioElement.play();
      this.dataset.playing = "true";
    } else if (this.dataset.playing === "true") {
      console.log("pause");
      audioElement.pause();
      this.dataset.playing = "false";
    }
  });
}
