#version 300 es
precision highp float;
out vec4 flagColor;
uniform vec2 u_resolution;

void main() {
  vec2 pos = gl_FragCoord.xy / u_resolution.xy;
  vec3 RED = vec3(1.0, 0.0, 0.0);
  vec3 BLUE = vec3(0.0, 0.0, 1.0);

  vec3 col = mix(RED, BLUE, pos.x);

  flagColor = vec4(col, 1.0);
}