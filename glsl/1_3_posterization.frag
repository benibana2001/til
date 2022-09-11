#version 300 es
precision highp float;
out vec4 flagColor;
uniform vec2 u_resolution;

int channel;
void main() {
  vec3[4] col4 = vec3[](
    vec3(1.0, 0.0, 0.0),
    vec3(1.0, 1.0, 0.0),
    vec3(1.0, 0.0, 1.0),
    vec3(1.0, 1.0, 1.0)
  );
  vec2 pos = gl_FragCoord.xy / u_resolution.xy;

  float n = 4.0;//階調数
  pos *= n;//座標範囲を[0, n]にスケール
  channel = int(2.0 * gl_FragCoord.x / u_resolution.x);

  pos = floor(pos) + step(0.5, fract(pos));

  pos /= n;//座標範囲を[0, 1]に正規化
  vec3 col = mix(mix(col4[0], col4[1], pos.x), mix(col4[2], col4[3], pos.x), pos.y);
  flagColor = vec4(col, 1.0);
}