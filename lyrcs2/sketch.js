// shelby firebaugh, homework2, 5 oct 2015
// text machine

var manners;
var thelyrics = new Array();
var thechain = {}; // new JSON
var thecurrentlyric = 'so';
var xpos = 20;
var ypos = 30;
var framecount = 0;
var font1;
var font2;

function preload() {
  manners = loadStrings('./data/mannerslyrics.txt');
  font2 = loadFont('./data/DK Petit Four.otf');
  font1 = loadFont('./data/Nervous.ttf');
}


function setup() {
  createCanvas(800, 600); 
  background(0);
  frameRate(60);
  
  var bigstring = "";
  
  for (var i = 0; i<manners.length; i++)
  {
    bigstring+=manners[i]+" ";
  }
  thelyrics = bigstring.split(' ');

  domarkov();
}

function draw() {
  strokeWeight(3);
  if(framecount<30)
  {
    stroke(0, 51, 102);
    fill(255, 204, 204, 20);
  }
  else
  {
    stroke(255);
    noFill();
  }
  rect(200, 150, 400, 300); 
  
  textSize(100);
  textFont(font2);
  noStroke();
  if(framecount<30)
  {
    fill(0, 51, 102);
  }
  else
  {
    fill(255);
  }
  text('Manners', 250, 340);

  console.log(thecurrentlyric);
  textSize(18);
  textFont(font1);
  if(framecount<12);
  {
    fill(0, 153, 76);
  }
  if((framecount>=12) && (framecount<24)){
    fill(0, 153, 153);
  }
  if((framecount>=24) && (framecount<36)){
    fill(0, 204, 204);
  }
  if((framecount>=36) && (framecount<48)){
    fill(0, 102, 204);
  }
  if((framecount>=48) && (framecount<=60)){
    fill(0, 76, 153);
  }
  text(thecurrentlyric, xpos, ypos);
  framecount = (framecount+1) % 60
  xpos = xpos + textWidth(thecurrentlyric + ' ');
  
  if(xpos>(width-40))
  {
    xpos = 20;
    ypos = ypos + 30;
  }
  if(ypos>height){
    background(0);
    xpos = 20;
    ypos = 30;
  }
 
  thecurrentlyric = picklyric(thecurrentlyric);
}

function picklyric(n)
{
  var pick = floor(random(0, thechain[n].length));
  return(thechain[n][pick]);
}

function domarkov()
{
  for(var i = 0;i<thelyrics.length;i++)
  {
    if(!thechain[thelyrics[i]]) { 
        thechain[thelyrics[i]] = new Array();
        thechain[thelyrics[i]][0] = thelyrics[(i+1)%thelyrics.length];
      }
      else {
        thechain[thelyrics[i]].push(thelyrics[(i+1)%thelyrics.length]);
      }
  }
}


function keyReleased(){
  noLoop();
}
