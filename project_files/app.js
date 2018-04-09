console.log("Up and running");

var myGamePiece;
var myObstacles = [];
var myObstacles2 = [];
var myObstacles3 = [];
var myScore;
// myObstacles  = new component(10, 10, "red", 300, 120);

function startGame() {
  myGamePiece = new component(100, 3, "black", 10, 385);
  myScore = new component("30px", "Consolas", "black", 280, 40, "text")
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function(e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function(e) {
      myGameArea.key = false;
    })
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  score: function() {
    if (myGamePiece.crashWith == true) {
      return myScore += 1;

    };
  }
}


function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var score = true;
    if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
      score = false;
    }
    return score;
  }
}



function updateGameArea() {
  if (myGameArea.key && myGameArea.key == 37) {
    myGamePiece.speedX = -2.5;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    myGamePiece.speedX = 2.5;
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i] || myObstacles2[i] || myObstacles3[i])) {
      myGameArea.score();
      console.log(myScore.text += 1);
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;


  if (myGameArea.frameNo == 1 || everyinterval(100)) {
    myObstacles.push(new component(10, 10, "red", 60, 0));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += 1;
    myObstacles[i].update();
  }
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    y = myGameArea.canvas.height;
    myObstacles2.push(new component(10, 10, "red", 100, 0));
  }
  for (i = 0; i < myObstacles2.length; i += 1) {
    myObstacles2[i].y += 1;
    myObstacles2[i].update();
  }
  if (myGameArea.frameNo == 1 || everyinterval(450)) {
    y = myGameArea.canvas.height;
    myObstacles3.push(new component(10, 10, "red", 550, 0));
  }
  for (i = 0; i < myObstacles3.length; i += 1) {
    myObstacles3[i].y += 1;
    myObstacles3[i].update();
  }


  // if (myGamePiece.crashWith(myObstacles || myObstacles2 || myObstacles3)) {
  //       myGameArea.stop();
  //     } else {
  // myGameArea.clear();
  myScore.text="SCORE: " + myGamePiece.crashWith;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

// if myGamepiece.crashWith == true;
// return myScore += 1;


function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}


function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
