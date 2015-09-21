// shelby firebaugh, homework1, 21 sept 2015
// drawing machine


// global variables, create arrays
var erratic = 10;
var x1 = new Array(erratic);
var y1 = new Array(erratic);
var x2 = new Array(erratic);
var y2 = new Array(erratic);


function setup() {

  // create screen&background color
  createCanvas(800, 600);
  background(0, 0, 50);

  // sound variables
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();

  // choose randome x&y starting point for lines
  for (var i = 0; i < erratic; i++) {
    x1[i] = random(0, width - 1);
    y1[i] = random(0, height - 1);

  }
}

function draw() {

  var weight = sqrt((mouseX - pmouseX) * (mouseX - pmouseX) + (mouseY - pmouseY) * (mouseY - pmouseY));
  var aa = max(0.1, min(weight / 25, 1.0));
  var bb = 1.0 - aa;

  // variables for distance between lines and mouse
  for (var i = 0; i < erratic; i++) {
    var dx = (mouseX - x1[i]) / 20;
    var dy = (mouseY - y1[i]) / 20;

    // variables for drunkness
    var drunkx = random(-20, 20);
    var drunky = random(-20, 20);

    // add distance&drunkness
    var shiftx = x1[i] + random(min(0, dx), max(0, dx)) + drunkx;
    var shifty = y1[i] + random(min(0, dy), max(0, dy)) + drunky;
    x2[i] = aa * shiftx + bb * x1[i];
    y2[i] = aa * shifty + bb * y1[i];

    // draw line
    noFill();
    stroke(255, 255, 230);
    line(x1[i], y1[i], x2[i], y2[i]);

    // establish new x1&y1
    x1[i] = x2[i];
    y1[i] = y2[i];

    // add sound
    var f = weight * 100;
    osc.freq(f);
    osc.amp(0.5, 0.05);


    // check boundaries
    if (x1[i] > width) x1[i] = 0;
    if (x1[i] < 0) x1[i] = width;
    if (y1[i] > height) y1[i] = 0;
    if (y1[i] < 0) y1[i] = height;
  }

}



// clear screen with space bar
function keyReleased() {
  if (key == ' ') background(0);

}