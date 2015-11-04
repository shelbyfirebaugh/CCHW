// shelby firebaugh, midterm: turtle graphics&lindenmayer system, 4 november 2015

var x, y; 
var currentangle = 270; 
var step = 40; 
var angle = 45; 

var thestring = 'RF+++F-LF++F--OFF+DFF';

var whereinstring = 0;

function preload()
{
  turtle = loadImage('./data/turtle.png');
  splinter = loadImage('./data/splinter.jpg')
}


function setup()
{
  createCanvas(800, 600);
  background(splinter);
  
  x = 100;
  y = 220;
  
  // console.log(thestring);
}

function draw()
{
  drawIt(thestring.charAt(whereinstring));
  
  whereinstring++;
  if(whereinstring>thestring.length-1) whereinstring = 0;
  


}


function drawIt(key)
{
  
  if(key=='F') // draw forward
  {
    
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
  
    x = x1;
    y = y1;
  }
  else if(key=='+')
  {
  currentangle+=angle; // turn left
  }
  else if(key=='-')
  {
  currentangle-=angle; // turn right   
  }
  else if(key=='R') // Raphael is red
  {
    tint(255, 0, 0, 255);
  }
  else if(key=='L') // Leonardo is blue
  {
    tint(0, 0, 255, 255);
  }
  else if(key=='D') // Donatello is purple
  {
    tint(204, 0, 255, 255);
  }
  else if(key=='O') // Michelangelo is orange
  {
    tint(255, 145, 0, 255);
  }
  
   image(turtle, x, y);
  
}

