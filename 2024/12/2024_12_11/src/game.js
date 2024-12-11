import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { Gun } from './gun'
import {Player} from './player'
import {Blocker} from './blocker'

class Game {
  constructor(scene, canvas) {
    this.gltfLoader = new GLTFLoader()
    this.player = new Player();
    this.charaMeshPath = './static/glb/chara_wizard.gltf'

    this.blockerStart = new Blocker('.blocker-start');
    this.blockerStart.show();
    this.blockerStop = new Blocker('.blocker-stop')

    this.domHeaderScore = document.querySelector('.header-score');
    this.domResultScore = document.querySelector('.score');
    this.domHeaderScore.textContent = 0;

    this.running = false;
    this.isOver = false;

    this.score = 0;
    this.clock = new THREE.Clock()
 
    this.group = new THREE.Group()
    this.scene = scene;
    this.gun = new Gun(this.group)

    this.scene.add(this.group)
    const clickHandler = this.clickCanvas.bind(this);
    canvas.addEventListener('click', clickHandler)
  }

  update() {
    this.player.update()
    this.gun.update()

    // scoreの更新
    this.score = Math.floor(this.clock.getElapsedTime() * 100)
    this.domHeaderScore.textContent = this.score

    // judge hit collision
    if (this.player.judgeCollistion(this.gun)) {
      this.player.hit()
      this._stop()
    } else {
      this.player.mesh.material = this.player._getDefaultMaterial()
    }
  }

  start() {
    this.running = true;
    this.player.start()
    this.gun.start()
    this.clock.start()
  }

  _stop() {
    this.running = false;
    this.player.stop()
    this.gun.stop()

    this.domResultScore.textContent = this.score

    this.blockerStop.show()
    this.clock.stop()
    this.isOver = true;
  }

  clickCanvas() {
    if (this.player.running) {
      this.player.stop()
    } else {
      this.player.start()
    }
  }

  unmounted() {
    this.group.removeFromParent()
  }

  // 
  loadGLTF(path) {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        path,
        gltf => resolve(gltf.scene)),
        error => reject(error)
    })
  }

  bindPlayerMesh = (scene) => {
    if (scene.isGroup) {
      this.player.mesh = scene.children[0]
    } else {
      this.player.mesh = scene
    }
    this.player.meshInit()
    this.group.add(this.player.mesh)
  }
}

export { Game }