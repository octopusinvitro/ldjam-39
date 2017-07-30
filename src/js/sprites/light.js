'use strict';

function Light(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'light');

  this.game.physics.arcade.enable(this);
  this.animations.add('off', [0], 10, true);
  this.animations.add('on', [1], 10, true);
  this.animations.play('off')
};

Light.prototype = Object.create(Phaser.Sprite.prototype);
Light.prototype.constructor = Light;

Light.prototype.turnOn = function() {
  this.animations.play('on');
};

Light.prototype.turnOff = function() {
  this.animations.play('off');
};

module.exports = Light;
