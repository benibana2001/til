void setup() {
  size(600, 600);
  background(255);
  plotRandomizedQuad (200, 200, 200, 200, .2, .2);
} // end setup

void plotRandomizedQuad(float x, float y, float w, float h, float randW, float randH) {
  float jitterW = w*randW;
  float jitterH = h*randH;
  beginShape();
  vertex(x+random(-jitterW, jitterW), y+random(-jitterH, jitterH));
  vertex(x+random(-jitterW, jitterW), y+h+random(-jitterH, jitterH));
  vertex(x+w+random(-jitterW, jitterW), y+h+random(-jitterH, jitterH));
  vertex(x+w+random(-jitterW, jitterW), y+random(-jitterH, jitterH));
  endShape(CLOSE);
} // end plotRandomizedQuad