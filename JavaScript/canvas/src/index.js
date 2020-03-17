const root = document.getElementById('root')
const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
root.appendChild(canvas)
const c = canvas.getContext('2d')
c.fillStyle = 'gray'
c.fillRect(100, 100, 400, 300)
