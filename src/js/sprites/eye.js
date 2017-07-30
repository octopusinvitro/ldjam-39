'use strict';

function Eye(game, x, y, keys, sfx) {
  Phaser.Sprite.call(this, game, x, y, 'eye');
  this.keys = keys;
  this.sfx = sfx;

  this.game.physics.arcade.enable(this);
  this.body.setSize(32, 48);
  this.body.bounce.y = 0.2;
  this.body.gravity.y = 1000;
  this.body.collideWorldBounds = true;

  this.animations.add('left', [0, 1, 2, 3], 10, true);
  this.animations.add('right', [5, 6, 7, 8], 10, true);

  this.chargeTimeInSeconds = Phaser.Timer.SECOND * 2;
};

Eye.prototype = Object.create(Phaser.Sprite.prototype);
Eye.prototype.constructor = Eye;

Eye.prototype.update = function(hitGround) {
  this.body.velocity.x = 0;
  this._move();
  this._jump(hitGround);
};

Eye.prototype.charge = function(center) {
  this.x = center.x - (this.width/2);
  this.y = center.y - (this.height/2);
};

Eye.prototype._move = function() {
  if (this.keys.left.isDown) {
    this.body.velocity.x = -300;
    this.animations.play('left');
  } else if (this.keys.right.isDown) {
    this.body.velocity.x = 300;
    this.animations.play('right');
  } else {
    this.animations.stop();
    this.frame = 4;
  }
};

Eye.prototype._jump = function(hitGround) {
  if (this.keys.up.isDown && this.body.touching.down && hitGround) {
    this.sfx.jump.play()
    this.body.velocity.y = -700;
  }
};

module.exports = Eye;
