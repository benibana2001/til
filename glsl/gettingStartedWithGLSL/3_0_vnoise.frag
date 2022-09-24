#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

const uint UINT_MAX = 0xffffffffu;
int channel;

uvec3 k = uvec3(0x456789abu, 0x6789ab45u, 0x89ab4567u);
uvec3 u = uvec3(1, 2, 3);

uvec2 uhash22(uvec2 n) {
  n ^= (n.yx << u.xy);
  n ^= (n.yx >> u.xy);
  n *= k.xy;
  n ^= (n.yx << u.xy);
  return n * k.xy;
}

float hash21(vec2 p) {
  uvec2 n = floatBitsToUint(p);
  return float(uhash22(n).x) / float(UINT_MAX);
}

float vnoise21(vec2 p) {
  vec2 n = floor(p);
  float[4] v;
  for(int j = 0; j < 2; j ++) {
    for(int i = 0; i < 2; i++) {
      v[i + 2 * j] = hash21(n + vec2(i, j));
    }
  }
  vec2 f = fract(p);
  if (channel == 1) {
    f = f * f * (3.0 - 2.0 * f);
  }

  return mix(mix(v[0], v[1], f[0]), mix(v[2], v[3], f[1]), f[1]);
}


void main() {
  vec2 pos = gl_FragCoord.xy / min(u_resolution.x, u_resolution.y);
  channel = int(gl_FragCoord.x * 3.0 / u_resolution.x);
  pos = 10.0 * pos + u_time;
  fragColor = vec4(vnoise21(pos));
}