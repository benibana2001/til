import * as THREE from "three"
import {width, height, floorSize} from './constants'

/**
 * GUN
 * target: bulletをaddするTHREE.Object
 */
class Gun {
  constructor(target) {
    this.target = target
    this.clock = new THREE.Clock()
    this.clock.prev = 0; // 直前の値を保持
    this.BULLET_SIZE = 0.4;
  }
  bullets = [];
  _MAX_LENGTH = 6
  fire() {
    if (this.bullets.length > this._MAX_LENGTH) {
      this.bullets.shift()
    }

    const bulletGeometry = new THREE.SphereGeometry(this.BULLET_SIZE)
    const bulletMaterial = new THREE.MeshStandardMaterial()
    const newBullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    newBullet.name = 'BULLET'
    newBullet.position.set(Math.random() * floorSize - floorSize / 2, 1, floorSize / 2)

    newBullet.geometry.computeBoundingSphere();//コライダーを生成
    newBullet.collider = new THREE.Sphere(newBullet.position, newBullet.geometry.boundingSphere.radius)
    newBullet.castShadow = true

    this.bullets.push(newBullet)
    this.target.add(newBullet)
  }
  start() {
    this.clock.start()
  }
  stop() {
    this.clock.stop()
    this.bullets = [] // 空にする
  }
  update() {
    const elapsed = this.clock.getElapsedTime()
    if ((Math.floor(elapsed) !== this.clock.prev)) {
      // bullet発射 1000msごとに更新
      this.fire()
      this.clock.prev = Math.floor(elapsed)
    }

    if (this.bullets.length === 0) return;
    this.bullets.forEach(bullet => {
      bullet.position.z -= 0.2
    })
  }
}

export {Gun}