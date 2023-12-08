cc.Class({
  extends: cc.Component,
  properties: {
    inputText: cc.EditBox,
    sMenu: cc.Node,
    sMain: cc.Node,
    userData: null,
    avatars: cc.SpriteAtlas,
    avatarOption: cc.Sprite,
    _avatarIndex: 0,
  },
  start() {
    this.avatarOption.width = this.avatarOption.height = 350;
    this.avatarOption.spriteFrame =
      this.avatars.getSpriteFrames()[this._avatarIndex];
  },
  onLogin() {
    if (this.inputText.string.trim() != "") {
      this.userData = {
        userName: this.inputText.string,
        avatarId: this._avatarIndex,
      };
      this.sMenu.active = false;
      this.sMain.active = true;
      return this.userData;
    }
  },
  onBack() {
    this._avatarIndex--;
    this.avatarOption.spriteFrame =
      this.avatars.getSpriteFrames()[this._avatarIndex];
    if (this._avatarIndex < 0) {
      this._avatarIndex = this.avatars.getSpriteFrames().length - 1;
    }
  },
  onNext() {
    this._avatarIndex++;
    this.avatarOption.spriteFrame =
      this.avatars.getSpriteFrames()[this._avatarIndex];
    if (this._avatarIndex >= this.avatars.getSpriteFrames().length) {
      this._avatarIndex = 0;
    }
  },
});
