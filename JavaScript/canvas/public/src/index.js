const root = document.getElementById('root')
import Canv from './CanvWriter.js'
import chart from './canvases/chart.js'
import moveBox from './canvases/moveBox.js'
import aroundBox from './canvases/aroundBox.js'
import particle from './canvases/particleSnow.js'
import sprite from './canvases/sprite/index.js'
import sprite2 from './canvases/sprite-2/index.js'
import dotPattern from './canvases/dotPattern.js'
//
Canv.addFunc([
  chart,
  moveBox,
  aroundBox,
  particle,
  sprite,
  sprite2,
  dotPattern
], root)