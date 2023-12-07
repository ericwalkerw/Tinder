cc.Class({
  extends: cc.Component,
  properties: {
    inputText: cc.EditBox,
    mItemMes: [cc.Prefab],
    chatArea: cc.Node,
    _textLength: 0,
  },
  //#region EVENT
  onEnded() {
    this.inputText.focus();
  },
  onSendMessage() {
    this._textLength = this.inputText.string.length;
    const data = {
      newMes: this.inputText.string,
    };
    this.inputText.string = "";
    return data;
  },
  CreateMessage(mPrefabs, data, id) {
    const newMess = cc.instantiate(mPrefabs);
    const customPrefab = newMess.getComponent("renderMessage");
    customPrefab.setMes(data);
    if (data.id == id) {
      data.userName ='';
      customPrefab.setName(data);
      customPrefab.setAnchor();
      customPrefab.setOpacity();
      newMess.parent = this.chatArea;
    } else {
      customPrefab.setName(data);
      newMess.parent = this.chatArea;
    }
  },

  onCreateCustomMes(data, id) {
    const selectedPrefab =
      this._textLength >= 20 ? this.mItemMes[1] : this.mItemMes[0];
    this.CreateMessage(selectedPrefab, data, id);
  },
});
