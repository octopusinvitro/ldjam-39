'use strict';

function Circuit(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'circuit');
  this.angle = -45;
};

Circuit.prototype = Object.create(Phaser.Sprite.prototype);
Circuit.prototype.constructor = Circuit;

Circuit.prototype.close = function() {
  this.x = 393;
  this.y = 198;
  this.angle = 0;
};

module.exports = Circuit;
