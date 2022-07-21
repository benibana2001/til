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

  const indices = [0, 1, 2, 0, 2, 3]

  // VBO
  const squareVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  // IBO
  const squareIndexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer)
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  )

  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
}
