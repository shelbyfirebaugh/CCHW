// shelby firebaugh, midterm: spirograph, 4 november 2015

var NUMSINES = 7; 
var sines = new Array(NUMSINES); 
var rad; 
var i; 
var oscs = new Array(NUMSINES);


var fund = 0.008; // the speed of the central sine
var ratio = 7; // what multiplier for speed is each additional sine?

var trace = false; 

var pitches = [42, 44, 46, 48, 50, 52, 54]

function setup()
{
  createCanvas(800, 600); 

  rad = height/4; 
  background(0); 
  
  for (i = 0; i<sines.length; i++)
  {
    sines[i] = PI; 
    
    oscs[i] = new p5.Oscillator();
    oscs[i].setType('triangle');
    oscs[i].freq(midiToFreq(pitches[i]));
    oscs[i].amp(0.01);
    oscs[i].start();
  }
}

function draw()
{
  if (!trace) {
    background(0); // clear screen if showing geometry
    stroke(255); // black pen
    noFill(); // don't fill
  } 

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen

  for (i = 0; i<sines.length; i++) // go through all the sines
  {
    oscs[i].amp((sin(sines[i])*2.-1.)*.1);
    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      noStroke();
      fill(165, 198, 255*((float(i)/sines.length))*5); 
      erad = 5.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
    }
    var radius = rad/(i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    if (!trace) ellipse(0, 0, 5, 5); // draw a little circle
    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    sines[i] = (sines[i]+(fund+(fund*i*ratio)))%TWO_PI; // update angle based on fundamental
  }
  
  pop(); // pop down final transformation
  
}

function keyReleased()
{
  if (key==' ') {
    trace = !trace; 
    background(0);
  }
}

