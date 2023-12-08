cc.Class({
  extends: cc.Component,
  properties: {
    mUser: require("LogginUser"),
    mApp: require("appManager"),
    serverUri: "https://socket-chat-app-ce41.onrender.com/",
    _socket: WebSocket,
    userOnline:cc.Label,
    userConnected:cc.Label,
  },

  start() {
    this._socket = io(this.serverUri);
    this._socket.on("chat", (data) => {
      this.mApp.onCreateCustomMes(data, this._socket.id);
    });
    this._socket.on("login", (data) => {
      cc.log(data);
      this.userConnected.string = `${data.userName}`;
      const seq = cc.sequence(  
        cc.moveTo(1,206,800),
        cc.delayTime(1),
        cc.moveTo(1,560,800),
      )
      this.userConnected.node.stopAllActions();
      this.userConnected.node.runAction(seq);
      this.userOnline.string = `Online: ${data.numberUsers}`
    });
  },

  sendMesToServer() {
    const data = this.mApp.onSendMessage();
    if (data.newMes.trim() != "") {
      this._socket.emit("chat", data);
    }
  },

  senduserData() {
    const userData = this.mUser.onLogin();
    if (userData.userName.trim() != "") {
      this._socket.emit("login", userData);
    }
  },
});
