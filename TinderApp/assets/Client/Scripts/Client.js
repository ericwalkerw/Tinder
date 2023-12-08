cc.Class({
  extends: cc.Component,
  properties: {
    mUser: require('LogginUser'),
    mApp: require("appManager"),
    _serverUri: 
    {
      default:"https://socket-chat-app-ce41.onrender.com/",
      serializable:true,
    },
    _socket: WebSocket,
  },

  start() {
    this._serverUri = "https://socket-chat-app-ce41.onrender.com/";
    cc.log(this._serverUri)
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
