import * as THREE from "three"
import GUI from "lil-gui" // lil-gui https://github.com/georgealways/lil-gui
import {width, height, floorSize} from './src/constants'
import * as Objects from './src/objects'

import { Game } from './src/game'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })

// renderer.setClearColor(0xffff00, 1)
renderer.setSize(width, height)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

let 
  game,
  hiScore = 0; // TODO: not implemented yet

// scene
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()
const backgroundImagePath = './static/bg.jpg'
function loadTexture(path) {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      path,
      tex => resolve(tex),
      error => reject(error)
    )
  })
}
loadTexture(backgroundImagePath).then(
  tex => scene.background = tex
)

scene.add(new THREE.CameraHelper(Objects.camera))
scene.add(Objects.floor)
scene.add(Objects.directionalLight)
scene.add(new THREE.CameraHelper(Objects.directionalLight.shadow.camera))
scene.add(Objects.ambientLight)

// Main functions
const gameFunctions = {
  killGame: function () {
    if (!game) {
      console.log('no game')
      return
    }
    game.unmounted()
    game = null
  },
  createGame: function () {
    game = new Game( scene, canvas,)
    game.loadGLTF(game.charaMeshPath).then(game.bindPlayerMesh).catch(error => console.error(error))

    // attach event
    game.blockerStart.elem.addEventListener('click', () => {
      game.blockerStart.hide()
      game.start()
    })
    game.blockerStop.elem.addEventListener('click', () => {
      game.blockerStop.hide()
      if(game.isOver) {
        gameFunctions.killGame()
        gameFunctions.createGame()
      }
    })
  },
  consoleLogMesh: () => console.log(scene.children)
}

// const controls = new OrbitControls(Objects.camera, canvas)
// const pointerControls = new PointerLockControls( Objects.camera, document.body );

function animate() {
  if (game && game.running) {
    game.update()
  }

  renderer.render(scene, Objects.camera)
  requestAnimationFrame(animate)
}

function init() {
  initMusic()
  gameFunctions.createGame()
  animate()
}

init()

function initMusic() {
  const audioContext = new AudioContext()
  const audioElement = document.querySelector("audio")
  audioElement.loop = true;
  const track = audioContext.createMediaElementSource(audioElement)
  track.connect(audioContext.destination);

  const playButton = document.querySelector("button")
  playButton.addEventListener('click', function() {
    if(audioContext.state === 'suspended') {
      console.log('resume')
      audioContext.resume()
    }
    console.log(this.dataset)
    if(this.dataset.playing === 'false') {
      console.log('play')
      audioElement.play()
      this.dataset.playing = 'true'
    }else if(this.dataset.playing === 'true') {
      console.log('pause')
      audioElement.pause()
      this.dataset.playing = 'false'
    }
  })
}

/**
 * DEBUG
 */
const gui = new GUI()
gui.domElement.id = 'gui';

const cameraGUI = gui.addFolder('Camera')
const gameGUI = gui.addFolder('Game')
const lightGUI = gui.addFolder('Light')
// const playerGUI = gui.addFolder('Player')

gameGUI.add(gameFunctions, 'killGame')
gameGUI.add(gameFunctions, 'createGame')
// gameGUI.add(gameFunctions, 'gameStop')
gameGUI.add(gameFunctions, 'consoleLogMesh')

// bulletGUI.add(bullet.position, 'x',-20, 20, 1)
// if(game){
//   playerGUI.add(game.player.position, 'z', -20, 20, 1)
// }

cameraGUI.add(Objects.camera, 'left')
cameraGUI.add(Objects.camera, 'right')
cameraGUI.add(Objects.camera, 'top')
cameraGUI.add(Objects.camera, 'bottom')

lightGUI.add(Objects.directionalLight.position,'x', -10, 10, 1)
lightGUI.add(Objects.directionalLight.position,'y', -10, 10, 1)
lightGUI.add(Objects.directionalLight.position,'z', -10, 10, 1)
