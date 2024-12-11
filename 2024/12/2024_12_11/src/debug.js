import GUI from "lil-gui" // lil-gui https://github.com/georgealways/lil-gui
import * as Objects from './objects'

const gui = new GUI()

const cameraGUI = gui.addFolder('Camera')

// bulletGUI.add(bullet.position, 'x',-20, 20, 1)
const playerGUI = gui.addFolder('Player')
playerGUI.add(Objects.player.position, 'z', -20, 20, 1)
// cameraGUI.add(camera.position, 'x', 0, 20, 1)
// cameraGUI.add(camera.position, 'y', 0, 20, 1)
// cameraGUI.add(camera.position, 'z', 0, 20, 1)
cameraGUI.add(Objects.camera, 'left')
cameraGUI.add(Objects.camera, 'right')
cameraGUI.add(Objects.camera, 'top')
cameraGUI.add(Objects.camera, 'bottom')

const lightGUI = gui.addFolder('Light')
lightGUI.add(Objects.directionalLight.position,'x', -10, 10, 1)
lightGUI.add(Objects.directionalLight.position,'y', -10, 10, 1)
lightGUI.add(Objects.directionalLight.position,'z', -10, 10, 1)


export { gui }