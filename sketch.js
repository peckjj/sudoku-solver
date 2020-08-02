var grid = Array(9);
for (i = 0; i < 9; i++) {
    grid[i] = [0, 0, 0,  0, 0, 0,  0, 0, 0];
}

var currentSelection = [0, 0];

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

  textAlign(CENTER, CENTER);

  background(0);
}

function draw() {
  background(0);
  drawCells();
  drawGrid();
//   debug();
}

function debug() {
    push();
    stroke(255);
    fill(255);
    text("mouse: (" + mouseX + ", " + mouseY + ")", 100, 10);
    pop();
}

function drawGrid() {
    push();
    stroke(255);
    strokeWeight(2);
    for (i = 0; i < 10; i++) {
        push();
        if (i % 3 == 0) {
            strokeWeight(8);
        }
        line( gridZone.x1 + ((gridZone.width / 9) * i), gridZone.y1, gridZone.x1 + ((gridZone.width / 9) * i), gridZone.y2); 
        pop();
    }
    for (i = 0; i < 10; i++) {
        push();
        if (i % 3 == 0) {
            strokeWeight(8);
        }
        line( gridZone.x1, gridZone.y1 + ((gridZone.height / 9) * i), gridZone.x2, gridZone.y1 + ((gridZone.height / 9) * i));
        pop();
    }
    pop();
}

function drawCells() {
    push();
    // Fill current selection
    stroke(255, 0, 0);
    fill(255, 0, 0);
    rect(gridZone.x1 + ((gridZone.width / 9) * currentSelection[0]), gridZone.y1 + ((gridZone.height / 9) * currentSelection[1]), gridZone.width / 9, gridZone.height / 9);
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            stroke(200, 200, 200);
            fill(200, 200, 200);
            rect(gridZone.x1 + ((gridZone.width / 9) * x), gridZone.y1 + ((gridZone.height / 9) * y), gridZone.width / 9, gridZone.height / 9);

            if (grid[y][x] != 0) {
                stroke(255);
                fill(255);
                textSize(32);
                text(grid[y][x], gridZone.x1 + (gridZone.width / 18) + ((gridZone.width / 9) * x), gridZone.y1 + (gridZone.height / 18) + ((gridZone.height / 9) * y));
            }
        }
    }
    fillCurrentSelection();
    pop();
}

function fillCurrentSelection() {
    // Fill current selection
    stroke(255, 0, 0);
    fill(255, 0, 0);
    rect(gridZone.x1 + ((gridZone.width / 9) * currentSelection[0]), gridZone.y1 + ((gridZone.height / 9) * currentSelection[1]), gridZone.width / 9, gridZone.height / 9);
    if (grid[currentSelection[1]][currentSelection[0]] != 0) {
        stroke(255);
        fill(255);
        textSize(32);
        text(grid[currentSelection[1]][currentSelection[0]], gridZone.x1 + (gridZone.width / 18) + ((gridZone.width / 9) * currentSelection[0]), gridZone.y1 + (gridZone.height / 18) + ((gridZone.height / 9) * currentSelection[1]));
    }
}

function mousePressed() {
    mx = mouseX;
    my = mouseY;
    x = int( ((mx - gridZone.x1) / gridZone.width ) * 9);
    y = int( ((my - gridZone.y1) / gridZone.height) * 9);
    if (x >= 0 && x < 9 & y >= 0 && y < 9) {
        currentSelection = [x, y];
    }
}

function keyTyped() {
    val = parseInt(key);
    if (!isNaN(val)) {
        grid[currentSelection[1]][currentSelection[0]] = val;
    }
}