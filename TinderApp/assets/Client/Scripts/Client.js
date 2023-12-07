cc.Class({
  extends: cc.Component,
  properties: {
    mUser: cc.require('LogginUser'),
    mApp: cc.require("appManager"),
    _serverUri: "http://172.16.0.87:3000",
    _socket: WebSocket,
  },

  start() {
    this._socket = io(this._serverUri);
    this._socket.on("connect", (data) => {
      cc.log("connected");
    });
    this._socket.on("chat", (data) => {
      this.mApp.onCreateCustomMes(data, this._socket.id);
    });
  },

  sendMesToServer() {
    const data = this.mApp.onSendMessage();
    if(data.newMes.trim() !=""){
      this._socket.emit("chat", data);
    }
  },

  senduserData(){
    const userData = this.mUser.onLogin()
    this._socket.emit('user', userData);
  }
});
