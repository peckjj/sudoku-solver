var grid;

var currentSelection = [0, 0];

var deadZoneX;
var deadZoneY;

var gridZone;

var executeButton;

var numButtons = Array(10);

var solved;

var clearAllButton;

function createGrid() {
  newGrid = Array(9);
  for (i = 0; i < 9; i++) {
    newGrid[i] = [0, 0, 0,  0, 0, 0,  0, 0, 0];
  }

  return newGrid;
}

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

  grid = createGrid();

  textAlign(CENTER, CENTER);

  background(0);

  executeButton = createButton("Solve!");
  executeButton.position((windowWidth / 4) + gridZone.x2 + 8, gridZone.y1);
  executeButton.mousePressed(solveWrapper);
  executeButton.style('background-color', color(0, 255, 0));
  executeButton.size(gridZone.width/4.5, gridZone.height/18);

  for (let i = 1; i < 10; i++) {
      numButtons[i] = createButton(i);
      numButtons[i].position((windowWidth / 4) + gridZone.x2 + 8 + ( ((i - 1) % 2) * (gridZone.width/9) ), ( gridZone.y1 * 1.5 ) + (int(((i - 1) / 8) * 4) * gridZone.height / 9) );
      numButtons[i].size(gridZone.width/9, gridZone.height/9);
      numButtons[i].mousePressed(function() {
          grid[currentSelection[1]][currentSelection[0]] = i;
      });
  }

  numButtons[0] = createButton("C");
  numButtons[0].position((windowWidth / 4) + gridZone.x2 + 8 + ( ((9) % 2) * (gridZone.width/9) ), ( gridZone.y1 * 1.5 ) + (int(((9) / 8) * 4) * gridZone.height / 9) );
  numButtons[0].size(gridZone.width/9, gridZone.height/9);
  numButtons[0].mousePressed( function() {
    grid[currentSelection[1]][currentSelection[0]] = 0;
  });

  clearAllButton = createButton("CE");
  clearAllButton.position((windowWidth / 4) + gridZone.x2 + 8 + (gridZone.width/18), ( gridZone.y1 * 1.5 ) + (5 * (gridZone.height / 9)) );
  clearAllButton.size(gridZone.width/9, gridZone.height/9);
  clearAllButton.mousePressed(function() {
    grid = createGrid();
    currentSelection = [0, 0];
  })
}

function solveWrapper() {
    solved = false;
    if (checkInitialPossibilty()) {
        solve();
    if (!solved) {
        print("Impossible board");
    }
}

function solve() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (grid[x][y] == 0) {
                for (let k = 1; k < 10; k++) {
                    if ( isPossible(x, y, k) ) {
                        grid[x][y] = k;
                        solve();
                    }
                    if (solved) {
                        return;
                    }
                }
                grid[x][y] = 0;
                return;
            }
        }
    }
    print("done");
    solved = true;
}

function checkInitialPossibilty() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (grid[x][y] != 0) {
                let k = grid[x][y];
                grid[x][y] = 0; 
                if (!isPossible(x, y, k)) {
                    grid[x][y] = k;
                    return false;
                }
                grid[x][y] = k;
            }
        }
    }
    return true;
}

function isPossible(x, y, n) {
    for (i = 0; i < 9; i++) {
        if (grid[x][i] == n) {
            return false;
        }
        if (grid[i][y] == n) {
            return false;
        }
    }
    x0 = int(x / 3) * 3;
    y0 = int(y / 3) * 3;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (grid[i + x0][j + y0] == n) {
                return false;
            }
        }
    }
    return true;
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