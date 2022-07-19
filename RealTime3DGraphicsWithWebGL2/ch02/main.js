import { utils } from './common/js/utils'

window.onload = init

function init() {
  const canvas = document.getElementById('webgl-canvas')

  /** @type {WebGLRenderingContext} */
  const gl = utils.getGLContext(canvas)

  // prettier-ignore
  const vertices = [
    -0.5, 0.5, 0,
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0.5, 0.5, 0,
  ]

  // バッファのガワを作成
  const positionBuffer = gl.createBuffer()
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices, gl.STATIC_DRAW))
}
