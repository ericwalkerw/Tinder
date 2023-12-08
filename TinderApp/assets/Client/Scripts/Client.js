cc.Class({
  extends: cc.Component,
  properties: {
    mUser: require("LogginUser"),
    mApp: require("appManager"),
    serverUri: "https://socket-chat-app-ce41.onrender.com/",
    _socket: WebSocket,
  },

  start() {
    this._socket = io(this.serverUri);
    this._socket.on("connect", (data) => {
      cc.log("connected");
    });
    this._socket.on("chat", (data) => {
      this.mApp.onCreateCustomMes(data, this._socket.id);
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
    if(userData.userName.trim()!= ""){
      this._socket.emit("user", userData);
    }
  },
});
