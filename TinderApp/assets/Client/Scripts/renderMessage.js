// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,
  properties: {
    message: cc.Label,
    userName: cc.Label,
    avatar:cc.Sprite,
    avatars:cc.SpriteAtlas,
  },
  setMes(data) {
    this.message.string = data.newMes.trim();
  },
  setName(data) {
    this.userName.string = data.userName;
    this.avatar.spriteFrame = this.avatars.getSpriteFrames()[data.avatarId];
  },
  setAnchor() {
    this.message.node.anchorX = 1;
    this.message.node.x = 350;
  },
  setOpacity(){
    this.avatar.node.opacity = 0;
  }
});
