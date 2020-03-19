const root = document.getElementById('root')
import Canv from './CanvWriter.js'
import chart from './canvases/chart.js'
import moveBox from './canvases/moveBox.js'
import aroundBox from './canvases/aroundBox.js'

Canv.addFunc([
  chart,
  moveBox,
  aroundBox
], root)