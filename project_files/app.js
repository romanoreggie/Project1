console.log("Up and running");

var myGamePiece;
var myObstacle;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(50, 3, "black", 10, 385);
    myObstacle  = new component(10, 10, "red", 300, 120);
}

const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
    }
  }

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myObstacle.update();
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -2.5; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 2.5; }
    myGamePiece.newPos();
    myGamePiece.update();
}
