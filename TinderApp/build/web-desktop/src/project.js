window.__require=function t(e,s,a){function n(i,c){if(!s[i]){if(!e[i]){var o=i.split("/");if(o=o[o.length-1],!e[o]){var p="function"==typeof __require&&__require;if(!c&&p)return p(o,!0);if(r)return r(o,!0);throw new Error("Cannot find module '"+i+"'")}}var h=s[i]={exports:{}};e[i][0].call(h.exports,function(t){return n(e[i][1][t]||t)},h,h.exports,t,e,s,a)}return s[i].exports}for(var r="function"==typeof __require&&__require,i=0;i<a.length;i++)n(a[i]);return n}({Client:[function(t,e,s){"use strict";cc._RF.push(e,"d39cf5Unt9L4IoH+vRAIw8B","Client"),cc.Class({extends:cc.Component,properties:{mUser:t("LogginUser"),mApp:t("appManager"),_serverUri:{default:"https://socket-chat-app-ce41.onrender.com/",serializable:!0},_socket:WebSocket},start:function(){var t=this;this._serverUri="https://socket-chat-app-ce41.onrender.com/",cc.log(this._serverUri),this._socket=io(this._serverUri),this._socket.on("connect",function(t){cc.log("connected")}),this._socket.on("chat",function(e){t.mApp.onCreateCustomMes(e,t._socket.id)})},sendMesToServer:function(){var t=this.mApp.onSendMessage();""!=t.newMes.trim()&&this._socket.emit("chat",t)},senduserData:function(){var t=this.mUser.onLogin();this._socket.emit("user",t)}}),cc._RF.pop()},{LogginUser:"LogginUser",appManager:"appManager"}],LogginUser:[function(t,e,s){"use strict";cc._RF.push(e,"01c54SWCRFGPa+PLPu+HoGY","LogginUser"),cc.Class({extends:cc.Component,properties:{inputText:cc.EditBox,sMenu:cc.Node,sMain:cc.Node,userData:null,avatars:cc.SpriteAtlas,avatarOption:cc.Sprite,_avatarIndex:0},start:function(){this.avatarOption.width=this.avatarOption.height=350,this.avatarOption.spriteFrame=this.avatars.getSpriteFrames()[this._avatarIndex]},onLogin:function(){return this.userData={userName:this.inputText.string,avatarId:this._avatarIndex},this.sMenu.active=!1,this.sMain.active=!0,this.userData},onBack:function(){this._avatarIndex--,this.avatarOption.spriteFrame=this.avatars.getSpriteFrames()[this._avatarIndex],this._avatarIndex<0&&(this._avatarIndex=this.avatars.getSpriteFrames().length-1)},onNext:function(){this._avatarIndex++,this.avatarOption.spriteFrame=this.avatars.getSpriteFrames()[this._avatarIndex],this._avatarIndex>=this.avatars.getSpriteFrames().length&&(this._avatarIndex=0)}}),cc._RF.pop()},{}],appManager:[function(t,e,s){"use strict";cc._RF.push(e,"fb65aQm3nBOzbn5AEYG/7Ms","appManager"),cc.Class({extends:cc.Component,properties:{inputText:cc.EditBox,mItemMes:[cc.Prefab],chatArea:cc.Node,mScrollView:cc.ScrollView,_textLength:0},onEnded:function(){this.inputText.focus()},onSendMessage:function(){this._textLength=this.inputText.string.length;var t={newMes:this.inputText.string};return this.inputText.string="",t},CreateMessage:function(t,e,s){var a=cc.instantiate(t),n=a.getComponent("renderMessage");n.setMes(e),e.id==s?(e.userName="",n.setName(e),n.setAnchor(),n.setOpacity(),a.parent=this.chatArea):(n.setName(e),a.parent=this.chatArea)},onSizeChange:function(){var t=this;this.mScrollView.content.on("size-changed",function(){t.mScrollView.scrollToBottom()})},onCreateCustomMes:function(t,e){var s=this._textLength>=20?this.mItemMes[1]:this.mItemMes[0];this.CreateMessage(s,t,e)}}),cc._RF.pop()},{}],renderMessage:[function(t,e,s){"use strict";cc._RF.push(e,"2f841SA/y9DAoS1JRSwaEuh","renderMessage"),cc.Class({extends:cc.Component,properties:{message:cc.Label,userName:cc.Label,avatar:cc.Sprite,avatars:cc.SpriteAtlas},setMes:function(t){this.message.string=t.newMes.trim()},setName:function(t){this.userName.string=t.userName,this.avatar.spriteFrame=this.avatars.getSpriteFrames()[t.avatarId]},setAnchor:function(){this.message.node.anchorX=1,this.message.node.x=350},setOpacity:function(){this.avatar.node.opacity=0}}),cc._RF.pop()},{}]},{},["Client","LogginUser","appManager","renderMessage"]);