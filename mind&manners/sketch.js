
var manners; // this is gonna hold the text file

var thelyrics = new Array();
var thechain = {}; // new JSON

var thecurrentlyric = 'so';

// var thefont = new Array();
// var whichfont = 0;

var xpos = 20;
var ypos = 30;

function preload() {
  // ignore the bullshit error that happens when you do this:
  manners = loadStrings('./data/mannerslyrics.txt');
  
  // thefont[0] = loadFont('./data/Century Gothic');
  // thefont[1] = loadFont('./data/Dharma Punk 2.ttf');
  // thefont[2] = loadFont('./data/Dita-Sweet.otf');
  // thefont[3] = loadFont('./data/DJB I Love Me Some Brook.ttf');
  // thefont[4] = loadFont('./data/DK Petit Four.otf');
  // thefont[5] = loadFont('./data/Impact Label.ttf');
  // thefont[6] = loadFont('./data/JeanLuc-Thin.otf');
  // thefont[7] = loadFont('./data/Nervous.ttf');
  // thefont[8] = loadFont('./data/Walkway Expand.ttf');
}

function setup() {
  createCanvas(800, 600);
  frameRate(4);
  textSize(36);
  // textFont(thefont[whichfont], 32);

  var bigstring = ""; // the WHOLE BOOK in one HUGE STRING
  // concatenate whole book into one string:
  for (var i = 0; i<manners.length; i++)
  {
    bigstring+=manners[i]+" ";
  }
  thelyrics = bigstring.split(' ');

  domarkov();
}

function draw() {
  //background(255);
  
  console.log(thecurrentlyric);
  text(thecurrentlyric, xpos, ypos);
  xpos = xpos + textWidth(thecurrentlyric + ' ');
  
  if(xpos>width)
  {
    xpos = 20;
    ypos = ypos + 50;
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
    if(!thechain[thelyrics[i]]) { // isn't there yet
        //console.log(thelyrics[i] + " ain't there yet... adding... " + thelyrics[(i+1)%thelyrics.length]);
        thechain[thelyrics[i]] = new Array();
        thechain[thelyrics[i]][0] = thelyrics[(i+1)%thelyrics.length];
      }
      else { // it's there already
        thechain[thelyrics[i]].push(thelyrics[(i+1)%thelyrics.length]);
        //console.log("adding " + thelyrics[(i+1)%thelyrics.length] + " to " + thelyrics[i]);
      }
  }
}


function keyReleased(){
  background(255);
  xpos = 20;
  ypos = 30;
  // whichfont = (whichfont + 1)%9;
  // textFont(thefont[whichfont], 32);
}

