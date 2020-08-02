var grid = Array(9);
for (i = 0; i < 9; i++) {
    grid[i] = [0, 0, 0,  0, 0, 0,  0, 0, 0];
}

var deadZoneX;
var deadZoneY;

var gridZone;

function setup() {
  var cnv = createCanvas(windowWidth/2, windowHeight);
  cnv.style('display', 'block');

  deadZoneX = width/6;
  deadZoneY = height/6;

  gridZone = {
      x1: deadZoneX,
      x2: width - deadZoneX,
      y1: deadZoneY,
      y2: height - deadZoneY,
      width: (width - deadZoneX) - (deadZoneX),
      height: (height - deadZoneY) - (deadZoneY)
  };

  background(0);
}

function draw() {
  drawGrid();
 // drawCells();
}

function drawGrid() {
    push();
    stroke(255);
    strokeWeight(1);
    for (i = 0; i < 10; i++) {
        line( gridZone.x1 + ((gridZone.width / 10) * i), gridZone.y1, gridZone.x1 + ((gridZone.width / 10) * i), gridZone.y2); 
    }
    // for (i = 0; i < 10; i++) {
    //     line( gridZone.x1, )
    // }
    pop();
}