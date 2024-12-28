import { Game } from "./game";
import { MeshManager } from "./meshManager";
class GameFactory {
  #meshManager;
  #playerMesh;
  #game = null;
  #restart = false;

  constructor(scene, canvas) {
    this.scene = scene;
    this.canvas = canvas
  }

  async init() {
    this.#meshManager = new MeshManager();
    await this.#meshManager.init();
  }

  #killGame() {
    if (!this.#game) {
      return;
    }
    this.#game.unmounted();
    this.#game = null;
    this.#restart = true;
  }

  async createGame() {
    this.#killGame();
    this.#playerMesh = this.#meshManager.getPlayerMesh();
    const parentFunc = async () => {
      this.createGame();
      this.#game.start();
    };
    this.#game =  new Game(this.scene, this.canvas, this.#playerMesh, parentFunc, this.#restart);
  }

  async getGame() {
    await this.createGame() 
    return this.#game
  }

  async hitBullet() {
    this.#game.stop();
  }
}

export { GameFactory };
