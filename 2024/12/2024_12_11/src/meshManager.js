import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

class MeshManager {
  #gltfLoader = new GLTFLoader();
  #meshPath = {
    player: "./static/glb/chara_wizard.gltf",
  };
  constructor() {
    this.playerMesh = null;
  }

  async init() {
    const res = await this.#loadGLTF(this.#meshPath.player);
    this.playerMesh = res.children[0];
  }

  #loadGLTF(path) {
    return new Promise((resolve, reject) => {
      this.#gltfLoader.load(path, (gltf) => resolve(gltf.scene)),
        (error) => reject(error);
    });
  }

  getPlayerMesh() {
    return this.playerMesh.clone(); // meshをクローンしないと参照渡しになってしまう
  }
}

export { MeshManager };
