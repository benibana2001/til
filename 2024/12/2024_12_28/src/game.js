import * as THREE from "three";
import { Gun } from "./gun";
import { Player } from "./player";
import { Blocker } from "./blocker";

class Game {
  constructor(
    scene, 
    canvas, 
    playerMesh, 
    parentFunc = null, 
    restart = false
  ) {
    this.group = new THREE.Group(); // mesh group
    this.scene = scene;

    // meshの割り当て
    this.player = new Player(playerMesh);
    this.player.meshInit();
    this.group.add(this.player.mesh);

    this.gun = new Gun(this.group);

    this.blockerStart = new Blocker(".blocker-start");
    if(!restart){ // 初回のみblockerを表示する
      this.blockerStart.show();
    }
    this.blockerStart.elem.addEventListener("click", () => {
      this.blockerStart.hide()
      this.start();
    });

    this.blockerStop = new Blocker(".blocker-stop");
    this.blockerStop.elem.addEventListener('click', async() => {
      if(!this.isOver) return;
      this.blockerStop.hide()
      parentFunc();
    })

    this.domHeaderScore = document.querySelector(".header-score");
    this.domResultScore = document.querySelector(".score");
    this.domHeaderScore.textContent = 0;

    this.running = false;
    this.isOver = false;

    this.score = 0;
    this.clock = new THREE.Clock();

    this.scene.add(this.group);
    const clickHandler = this.clickCanvas.bind(this);
    canvas.addEventListener("click", clickHandler);
  }

  update() {
    this.player.update();
    this.gun.update();

    // scoreの更新
    this.score = Math.floor(this.clock.getElapsedTime() * 100);
    this.domHeaderScore.textContent = this.score;

    // judge hit collision
    if (this.player.judgeCollistion(this.gun)) {
      this.stop();
    } else {
      this.player.mesh.material = this.player._getDefaultMaterial();
    }
  }

  start() {
    this.running = true;
    this.player.start();
    this.gun.start();
    this.clock.start();
  }

  stop() {
    this.player.hit();
    this.running = false;
    this.player.stop();
    this.gun.stop();

    this.domResultScore.textContent = this.score;

    this.blockerStop.show();
    this.clock.stop();
    this.isOver = true;
  }
  getScore() {
    return this.score;
  }

  clickCanvas() {
    if (this.player.running) {
      this.player.stop();
    } else {
      this.player.start();
    }
  }

  unmounted() {
    this.blockerStop.hide();
    this.group.removeFromParent();
  }
}

export { Game };
