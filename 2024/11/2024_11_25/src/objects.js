import * as THREE from "three"
import {width, height, floorSize} from './constants'

// floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorSize, floorSize, 98, 100, 100),
  new THREE.MeshStandardMaterial({ color: 0xaaaaff })
)
floor.name = "FLOOR"
floor.rotation.x = Math.PI * -2.5;
floor.receiveShadow = true;

// camera
const cameraSize = 12;
const camera = new THREE.OrthographicCamera(-cameraSize, cameraSize, cameraSize, -cameraSize, 0.1, 1000)
camera.position.set(20, 13, 20)
camera.lookAt(new THREE.Vector3(0, 0, 0));

// light
const ambientLight = new THREE.AmbientLight('#74cdf3', 0.9)
const directionalLight = new THREE.DirectionalLight('#f4f4ca', 6.4)
directionalLight.position.set(-9, 10, 4)
directionalLight.rotation.y = Math.PI * 0.15
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 30;
directionalLight.shadow.camera.top = 25;
directionalLight.shadow.camera.left = 25;
directionalLight.shadow.camera.right = -25;
directionalLight.shadow.camera.bottom = -25;

export {
  camera,
  floor,
  ambientLight,
  directionalLight,
}