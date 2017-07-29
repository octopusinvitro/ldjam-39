'use strict';

function Button(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'button');

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.collideWorldBounds = true;
};

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.press = function() {
  this.y += this.height;
};

module.exports = Button;
