// shelby firebaugh, midterm: conway's game of life, 4 november 2015

var threshold = 128;
var howwide = 50;
var howtall = 50;
var img = new Array(2); // this is gonna store two images
var whichimage = 0;

function setup() {
  frameRate(10);
  createCanvas(600, 600);
  img[0] = createImage(howwide, howtall);
  img[1] = createImage(howwide, howtall);
  randomize();
  
}

function draw() {
  background(0, 0, 255, 10);
  if (frameCount/10 < 4){
    tint(random(0, 255), random(0, 255), random(0, 255));
  }
  else {
    tint(random(0, 255), random(0, 255), random(0, 255));
  }
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = 0; i < howwide; i++) {
    for (var j = 0; j < howtall; j++) {
      // read pixels from source image...
      // everything is b&w, so the red (array index 0) channel is fine:
      var p0 = img[whichimage].get(i-1, j-1)[0]>threshold; // upper left
      var p1 = img[whichimage].get(i, j-1)[0]>threshold; // upper mid
      var p2 = img[whichimage].get(i+1, j-1)[0]>threshold; // upper right
      var p3 = img[whichimage].get(i-1, j)[0]>threshold; // left
      var p4 = img[whichimage].get(i, j)[0]>threshold; // center pixel
      var p5 = img[whichimage].get(i+1, j)[0]>threshold; // right
      var p6 = img[whichimage].get(i-1, j+1)[0]>threshold; // lower left
      var p7 = img[whichimage].get(i, j+1)[0]>threshold; // lower mid
      var p8 = img[whichimage].get(i+1, j+1)[0]>threshold; // lower right
      var neighbors = p0+p1+p2+p3+p5+p6+p7+p8; // how many neighbors are alive?
      var result;
      
      // THESE ARE THE RULES FOR THE SIMULATION
      
      if(p4==1) // center pixel is alive
      {
        // if two or three live neighbors, keep alive; otherwise die.
        if(neighbors==2 || neighbors==3 || neighbors==1) result = 1; else result = 0;
      }
      else // center pixel is DEAD
      {
        // if exactly three live neighbors, become alive; otherwise stay dead.
        if(neighbors==3) result = 1; else result = 0;
      }
     // write pixels into destination image, scaled to 0 or 255:
      img[1-whichimage].set(i, j, color(result*255), color(result*255)); 
    }
  }
  img[1-whichimage].updatePixels(); // update pixels on destination

  whichimage = 1-whichimage; // flip source and destination
  image(img[whichimage], 0, 0, width, height); // draw the new source

  
}

function mouseClicked()
{
  fillatmouse();
}

function mouseDragged()
{
  fillatmouse();
}

function keyReleased() 
{
  randomize();
}


function randomize()
{
  var randthresh = 8; // 80% of pixels will be dead.
  img[whichimage].loadPixels(); 
  img[1-whichimage].loadPixels(); 
  for (var i = 0; i < img[whichimage].width; i++) {
    for (var j = 0; j < img[whichimage].height; j++) {
      var r = random(10)>randthresh; 
      var thecolor = color(r*255);
      img[whichimage].set(i, j, thecolor, thecolor);
      img[1-whichimage].set(i, j, thecolor, thecolor);
    }
  }
  img[whichimage].updatePixels(); 
  img[1-whichimage].updatePixels(); 
  
  

}

// set a pixel at the mouse position to ON
function fillatmouse()
{
  img[whichimage].loadPixels();
  var thex = floor(mouseX/(width/howwide));
  var they = floor(mouseY/(height/howtall));
  img[whichimage].set(thex, they, color(255));
  img[whichimage].updatePixels();
}