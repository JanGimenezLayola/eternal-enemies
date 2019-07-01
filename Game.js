'use strict';

function Game(canvas) {
  this.player = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
};

Game.prototype.startGame = function() {
  //inicialize player & enemies
  this.player = new Player(this.canvas);

   var loop = () => { //arrow function 

    if(Math.random() > 0.97) {
      var randomY = Math.random() * this.canvas.height - 10; // 10 --> all enemies inside the canvas (10x10)! 
      var newEnemy = new Enemy(this.canvas, randomY)
      this.enemies.push(newEnemy);
    }
    this.update();
    this.clear();
    this.draw();
    this.checkCollisions();
    if(!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }
  };
  loop();
};

Game.prototype.update = function() {
  this.player.move();
  this.enemies.forEach(function(enemy) {
    enemy.move();
  });
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.player.draw();
  this.enemies.forEach(function(enemy) {
    enemy.draw();
  });
};

Game.prototype.checkCollisions = function() {
  this.enemies.forEach((enemy, index) => {
    var rightLeft = this.player.x + this.player.width >= enemy.x;
    var leftRight = this.player.x <= enemy.x + enemy.width;
    var bottomTop = this.player.y + this.player.height >= enemy.y;
    var Topbottom = this.player.y <= enemy.y + enemy.height;

    if (rightLeft && leftRight && bottomTop && Topbottom) {
      this.enemies.splice(index, 1);
      this.player.lives --;
      if(this.player.lives === 0) {
        this.isGameOver = true;
      };
    };
  });
};

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
};