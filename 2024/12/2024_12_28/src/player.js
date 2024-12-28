import * as THREE from "three"
import {width, height, floorSize} from './constants'

class Player {
  constructor(mesh) {
    this.mesh = mesh; // gltfを参照
    this.clock = new THREE.Clock()
    this.clock.prev = 0;
    this.running = false;
    this.scale = 2;
    this.playerMoveRange = floorSize / 2 - 14;
    this.inputMaterial = null; // gltfを参照
    this.PLAYER_SPEED = 4.0;
    this.audioContext = new AudioContext() // HIT時のサウンド再生
  }
  hitMaterial = new THREE.MeshStandardMaterial({ color: 'red' })
  meshInit() {
    this.mesh.name = 'Player'
    this.mesh.geometry.computeBoundingSphere();
    this.mesh.collider = new THREE.Sphere(this.mesh.position, this.mesh.geometry.boundingSphere.radius);
    this.inputMaterial = this.mesh.material
    this.mesh.position.set(0, 0, -floorSize / 2 + 10)
    if (this.scale) this.mesh.scale.set(this.scale, this.scale, this.scale)
    this.mesh.castShadow = true;
  }
  _getDefaultMaterial = () => {
   return this.inputMaterial || new THREE.MeshStandardMaterial({ color: 'yellow' })
  }
  stop() {
    this.clock.stop()
    this.clock.prev = this.clock.getElapsedTime()
    this.running = false;
  }
  start() {
    this.clock.start()
    this.clock.elapsedTime = this.clock.prev
    this.running = true;
  }
  update() {
    if (!this.running) return;
    this.mesh.position.x = this.playerMoveRange * Math.sin(this.clock.getElapsedTime()* this.PLAYER_SPEED)
    this.mesh.collider.center.set = (this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
  }
  judgeCollistion(gun) {
    let hit = false;
    gun.bullets.forEach(bullet => {
      if (this.mesh.collider.intersectsSphere(bullet.collider)) {
        hit = true;
      }
    })
    return hit;
  }

  async hit() {
    console.log('HIT')
    this.mesh.material = this.hitMaterial

    const audioBuffer = await this._fetchAudioAsBuffer()
    const source = this.audioContext.createBufferSource()
    source.buffer = audioBuffer;

    source.connect(this.audioContext.destination)
    source.start();
  }

  async _fetchAudioAsBuffer() {
    const res = await fetch("/audio/hit.mp3");
    const arrayBuffer = await res.arrayBuffer()
    return await this.audioContext.decodeAudioData(arrayBuffer)
  }
}

export {Player}