console.log("Up and running");

var myGamePiece;
var myObstacles = [];
var myObstacles2 = [];
var myObstacles3 = [];
var myObstacles4 = [];
var myObstacles5 = [];
var myScore;
var myBackground;

function startGame() {
  myGamePiece = new component(200, 150, "https://i.imgur.com/kVwhPHP.png", 10, 470,"image");
  myScore = new component("30px", "Consolas", "black", 250, 40, "text");
  myBackground = new component(1000, 600, "https://i.imgur.com/MJJRGzZ.jpg", 0, 0, "image")
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 1000;
    this.canvas.height = 600;
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
      return myScore.score += 1;
    };
  }
}


function component(width, height, color, x, y, type) {
  this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
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
    } else if (this.type == "image") {
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
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
    if
      ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright))
      {
      score = false;
    }
    return score;
  }
}


var currentScore = 0;
function updateGameArea() {
  myGamePiece.speedX = 0;
  if (myGameArea.key && myGameArea.key == 37) {
    myGamePiece.speedX = -2.5;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    myGamePiece.speedX = 2.5;
  }
  myScore.text = "SCORE: " + currentScore;

  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      currentScore += .5;
    }
  }
  for (i = 0; i < myObstacles2.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles2[i])) {
      currentScore += .5;
    }
  }
  for (i = 0; i < myObstacles3.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles3[i])) {
      currentScore += .5;
    }
  }
  for (i = 0; i < myObstacles4.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles4[i])) {
      currentScore += .5;
    }
  }
  //negative object
  for (i = 0; i < myObstacles5.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles5[i])) {
      currentScore -= 1;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  myBackground.newPos();
  myBackground.update();
  // myBackground.speedX = -1;


  if (everyinterval(320)) {
    myObstacles.push(new component(50, 50, "https://i.imgur.com/dhjX6MZ.png", 60, 0, "image"));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += 2;
    myObstacles[i].update();
  }
  if (everyinterval(450)) {
    y = myGameArea.canvas.height;
    myObstacles2.push(new component(50, 50, "https://i.imgur.com/dhjX6MZ.png", 530, 0, "image"));
  }
  for (i = 0; i < myObstacles2.length; i += 1) {
    myObstacles2[i].y += 2;
    myObstacles2[i].update();
  }
  if (everyinterval(750)) {
    y = myGameArea.canvas.height;
    myObstacles3.push(new component(50, 50, "https://i.imgur.com/Kg3qGZb.png", 750, 0, "image"));
  }
  for (i = 0; i < myObstacles3.length; i += 1) {
    myObstacles3[i].y += 2;
    myObstacles3[i].update();
  }
  if (everyinterval(650)) {
    y = myGameArea.canvas.height;
    myObstacles4.push(new component(50, 50, "https://i.imgur.com/Kg3qGZb.png", 300, 0, "image"));
  }
  for (i = 0; i < myObstacles4.length; i += 1) {
    myObstacles4[i].y += 2;
    myObstacles4[i].update();
  }
  if (everyinterval(600)) {
    y = myGameArea.canvas.height;
    myObstacles5.push(new component(70, 70, "https://i.imgur.com/k1gfSzQ.png", 475, 0, "image"));
  }
  for (i = 0; i < myObstacles5.length; i += 1) {
    myObstacles5[i].y += 2;
    myObstacles5[i].update();
  }
  myScore.text="SCORE: " + currentScore;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
