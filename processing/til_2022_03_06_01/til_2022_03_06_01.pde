// processing-java --sketch=/Users/yusuke/_work/til/processing/til_2022_03_06_01 --run
int diam = 100;
float centX, centY;

void setup() {
  size(500, 300);
  frameRate(24);
  smooth();
  background(180);
  
  centX = width/2;
  centY = height/2;
  
  stroke(0);
  strokeWeight(1);
  noFill();
}

void draw() {
  if(diam <= 400) {
    ellipse(centX, centY, diam, diam);
    diam += 10;
  }
}