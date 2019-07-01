'use strict';

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 20;
  this.width = 20;
  this.x = 20;
  this.y = (this.canvas.height / 2) - this.height / 2;
  this.lives = 3;
  this.velocity = 3;
  this.direction = 0;
  this.color = "blue";

};

Player.prototype.move = function() {
  this.y = this.y + this.direction * this.velocity;
};

Player.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.setDirection = function(newDirection) {
  this.direction = newDirection;
};