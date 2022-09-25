#version 300 es
precision highp float;
out vec4 flagColor;
uniform vec2 u_mouse;
void main() {
  vec2 pos = gl_FragCoord.xy / u_mouse.xy;
  flagColor = vec4(pos, 1.0,  1.0);
}