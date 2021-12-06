parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"w8NT":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var e=function e(){t(this,e),this.canvasElement=document.getElementById("main-canvas"),this.canvasCTX=this.canvasElement.getContext("2d"),this.height=this.canvasElement.height,this.width=this.canvasElement.width};exports.default=e;
},{}],"wexW":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0});var i=require("./index"),r=function(){function t(){e(this,t),this.playerXPosition=0,this.playerYPosition=0,this.levelXOffset=0,this.levelYOffset=0,this.weapon="",this.direction="",i.emitter.on("renderObjects",this.update.bind(this))}return n(t,[{key:"update",value:function(){var e=document.getElementById("debugger");if(e){var t="\n            Player X Position: ".concat(this.playerXPosition,"\n            <br>\n            Player Y Position: ").concat(this.playerYPosition,"\n            <br>\n            Level X Offset: ").concat(this.levelXOffset,"\n            <br>\n            Level Y Offset: ").concat(this.levelYOffset,"\n            <br>\n            Facing: ").concat(this.direction,"\n            <br><br>\n            Weapon: ").concat(this.weapon,"\n            ");e.innerHTML=t}}}]),t}();exports.default=r;
},{"./index":"KqmS"}],"LqgX":[function(require,module,exports) {
"use strict";var e=Object.prototype.hasOwnProperty,t="~";function n(){}function r(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function o(e,n,o,s,i){if("function"!=typeof o)throw new TypeError("The listener must be a function");var c=new r(o,s||e,i),f=t?t+n:n;return e._events[f]?e._events[f].fn?e._events[f]=[e._events[f],c]:e._events[f].push(c):(e._events[f]=c,e._eventsCount++),e}function s(e,t){0==--e._eventsCount?e._events=new n:delete e._events[t]}function i(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(t=!1)),i.prototype.eventNames=function(){var n,r,o=[];if(0===this._eventsCount)return o;for(r in n=this._events)e.call(n,r)&&o.push(t?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(n)):o},i.prototype.listeners=function(e){var n=t?t+e:e,r=this._events[n];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,s=r.length,i=new Array(s);o<s;o++)i[o]=r[o].fn;return i},i.prototype.listenerCount=function(e){var n=t?t+e:e,r=this._events[n];return r?r.fn?1:r.length:0},i.prototype.emit=function(e,n,r,o,s,i){var c=t?t+e:e;if(!this._events[c])return!1;var f,u,a=this._events[c],l=arguments.length;if(a.fn){switch(a.once&&this.removeListener(e,a.fn,void 0,!0),l){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,n),!0;case 3:return a.fn.call(a.context,n,r),!0;case 4:return a.fn.call(a.context,n,r,o),!0;case 5:return a.fn.call(a.context,n,r,o,s),!0;case 6:return a.fn.call(a.context,n,r,o,s,i),!0}for(u=1,f=new Array(l-1);u<l;u++)f[u-1]=arguments[u];a.fn.apply(a.context,f)}else{var v,h=a.length;for(u=0;u<h;u++)switch(a[u].once&&this.removeListener(e,a[u].fn,void 0,!0),l){case 1:a[u].fn.call(a[u].context);break;case 2:a[u].fn.call(a[u].context,n);break;case 3:a[u].fn.call(a[u].context,n,r);break;case 4:a[u].fn.call(a[u].context,n,r,o);break;default:if(!f)for(v=1,f=new Array(l-1);v<l;v++)f[v-1]=arguments[v];a[u].fn.apply(a[u].context,f)}}return!0},i.prototype.on=function(e,t,n){return o(this,e,t,n,!1)},i.prototype.once=function(e,t,n){return o(this,e,t,n,!0)},i.prototype.removeListener=function(e,n,r,o){var i=t?t+e:e;if(!this._events[i])return this;if(!n)return s(this,i),this;var c=this._events[i];if(c.fn)c.fn!==n||o&&!c.once||r&&c.context!==r||s(this,i);else{for(var f=0,u=[],a=c.length;f<a;f++)(c[f].fn!==n||o&&!c[f].once||r&&c[f].context!==r)&&u.push(c[f]);u.length?this._events[i]=1===u.length?u[0]:u:s(this,i)}return this},i.prototype.removeAllListeners=function(e){var r;return e?(r=t?t+e:e,this._events[r]&&s(this,r)):(this._events=new n,this._eventsCount=0),this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prefixed=t,i.EventEmitter=i,"undefined"!=typeof module&&(module.exports=i);
},{}],"KCsH":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}Object.defineProperty(exports,"__esModule",{value:!0});var r=function(){function e(){t(this,e),this.LeftArrow=37,this.UpArrow=38,this.RightArrow=39,this.DownArrow=40,this.Space=32,this.AKey=65,this.DKey=68,this.WKey=87,this.SKey=83,this.LeftArrowIsActive=!1,this.UpArrowIsActive=!1,this.RightArrowIsActive=!1,this.DownArrowIsActive=!1,this.SpaceIsActive=!1}return i(e,[{key:"setKey",value:function(t,e){switch(t){case this.LeftArrow:case this.AKey:this.LeftArrowIsActive=e,e&&(this.RightArrowIsActive=!1);break;case this.WKey:case this.UpArrow:this.UpArrowIsActive=e;break;case this.RightArrow:case this.DKey:this.RightArrowIsActive=e,e&&(this.LeftArrowIsActive=!1);break;case this.SKey:case this.DownArrow:this.DownArrowIsActive=e;break;case this.Space:this.SpaceIsActive=e}}}]),e}();exports.default=r;
},{}],"oNOt":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var e=function e(n,s){t(this,e),this.x=n,this.y=s};exports.default=e;
},{}],"HhU3":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function i(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var l=require("../index"),n=s(require("./coordinate")),a=function(){function e(i,s,n){t(this,e),this.col=i,this.row=s,this.isSolid=n,this.w=l.settings.tileSize,this.h=l.settings.tileSize,this.fillColor="",l.emitter.on("updatePhysics",this.update.bind(this)),l.emitter.on("renderObjects",this.draw.bind(this)),this.x=this.col*this.w,this.y=this.row*this.h}return i(e,[{key:"update",value:function(){}},{key:"draw",value:function(){if(this.h=l.settings.tileSize,this.w=l.settings.tileSize,!((this.col+1)*this.w-l.level.offsetX<0))if(this.isSolid){var t=new n.default(this.x-l.level.offsetX-1,this.y-l.level.offsetY-1);l.canvas.canvasCTX.fillStyle="#DDD",l.canvas.canvasCTX.fillRect(t.x,t.y,this.w+2,this.h+2),l.canvas.canvasCTX.fillStyle=this.fillColor?this.fillColor:"#AAA",l.canvas.canvasCTX.fillRect(this.x-l.level.offsetX,this.y-l.level.offsetY,this.w,this.h)}else{var e=document.getElementById("floor"),i=new n.default(this.x-l.level.offsetX,this.y-l.level.offsetY);l.canvas.canvasCTX.drawImage(e,i.x,i.y,this.w,this.h)}}}]),e}();exports.default=a;
},{"../index":"KqmS","./coordinate":"oNOt"}],"kdF2":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e[e.small=0]="small",e[e.medium=1]="medium",e[e.large=2]="large"}(e=exports.RoomSize||(exports.RoomSize={})),exports.default=e;
},{}],"k0V4":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.up="up",e.down="down",e.left="left",e.right="right"}(e||(e={})),exports.default=e;
},{}],"bTC0":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t){var e=i();return function(){var r,n=f(t);if(e){var o=f(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return u(this,r)}}function u(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return c(e)}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var s=l(require("./coordinate")),a=function(t){r(u,s.default);var n=o(u);function u(t,r,o){var c;return e(this,u),(c=n.call(this,t,r)).direction=o,c}return u}();exports.default=a;
},{"./coordinate":"oNOt"}],"WRMb":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var s=e(require("./room-size")),i=e(require("./direction")),h=e(require("./portal")),a=function e(a,r,u){switch(t(this,e),this.size=a,this.origin=r,this.previousRoomDirection=u,this.portals=[],this.w=0,this.h=0,a){case s.default.small:this.w=3,this.h=3;break;case s.default.medium:this.w=5,this.h=5;break;case s.default.large:this.w=7,this.h=7}this.portals.push(new h.default(r.x+(this.w-1)/2,r.y,i.default.up)),this.portals.push(new h.default(r.x+(this.w-1)/2,r.y+this.h-1,i.default.down)),this.portals.push(new h.default(r.x,r.y+(this.h-1)/2,i.default.left)),this.portals.push(new h.default(r.x+this.w-1,r.y+(this.h-1)/2,i.default.right))};exports.default=a;
},{"./room-size":"kdF2","./direction":"k0V4","./portal":"bTC0"}],"MyIl":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=t(require("./room-size")),s=function t(r,s,a){e(this,t),this.size=r,this.w=s,this.h=a};exports.roomPrefabs=[new s(r.default.large,7,7),new s(r.default.medium,5,5),new s(r.default.small,3,3)],exports.default=s;
},{"./room-size":"kdF2"}],"Q5Gq":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var a=require("../index"),r=o(require("./tile")),s=o(require("./room")),l=o(require("./direction")),f=require("./room-prefab-config"),n=o(require("./coordinate")),u=o(require("./room-size")),h=function(){function t(i,o){e(this,t),this.width=i,this.height=o,this.offsetX=0,this.offsetY=0,this.playerStartX=10,this.playerStartY=10,this.tileSize=0,this.tiles=[],a.emitter.on("renderObjects",this.update.bind(this)),this.tileSize=a.settings.tileSize,this.renderMap()}return i(t,[{key:"update",value:function(){a.debug.levelXOffset=this.offsetX,a.debug.levelYOffset=this.offsetY,this.tileSize!=a.settings.tileSize&&(this.tileSize=a.settings.tileSize,this.renderMap())}},{key:"renderMap",value:function(){this.tiles=[];for(var e=0;e<this.width;e++){for(var t=[],i=0;i<this.height;i++)t.push(new r.default(e,i,!0));this.tiles.push(t)}var o=!0,a=0,f=[];for(f.push(new s.default(u.default.large,new n.default(0,0),l.default.left)),this.carveRoom(f[0]);o;){++a>=5&&(o=!1);var h=this.getPossibleRooms(f[f.length-1]),c=h[Math.floor(Math.random()*h.length)];console.log("going "+this.getOppositeDirection(c.previousRoomDirection)+" into"),console.log(c),f.push(c),this.carveRoom(c),this.carveConnection(c)}console.log(f)}},{key:"carveConnection",value:function(e){var t=e.portals.filter(function(t){return t.direction==e.previousRoomDirection})[0];switch(e.previousRoomDirection){case l.default.up:this.tiles[t.x][t.y-1].isSolid=!1,this.tiles[t.x][t.y-1].fillColor="#aaffaa",this.tiles[t.x][t.y-2].isSolid=!1,this.tiles[t.x][t.y-2].fillColor="#aaffaa";break;case l.default.down:this.tiles[t.x][t.y+1].isSolid=!1,this.tiles[t.x][t.y+1].fillColor="#aaffaa",this.tiles[t.x][t.y+2].isSolid=!1,this.tiles[t.x][t.y+2].fillColor="#aaffaa";break;case l.default.right:this.tiles[t.x+1][t.y].isSolid=!1,this.tiles[t.x+1][t.y].fillColor="#aaffaa",this.tiles[t.x+2][t.y].isSolid=!1,this.tiles[t.x+2][t.y].fillColor="#aaffaa";break;case l.default.left:this.tiles[t.x-1][t.y].isSolid=!1,this.tiles[t.x-1][t.y].fillColor="#aaffaa",this.tiles[t.x-2][t.y].isSolid=!1,this.tiles[t.x-2][t.y].fillColor="#aaffaa"}}},{key:"carveRoom",value:function(e){for(var t=this,i=0;i<e.h;i++)for(var o=0;o<e.w;o++)this.tiles[e.origin.x+i][e.origin.y+o].isSolid=!1;return e.portals.forEach(function(e){t.tiles[e.x][e.y].fillColor="#ffaaaa"}),e}},{key:"getPossibleRooms",value:function(e){var t=this,i=[];return e.portals.forEach(function(e){f.roomPrefabs.forEach(function(o){var a=new n.default(0,0);switch(e.direction){case l.default.up:a.x=e.x-(o.w-1)/2,a.y=e.y-2-o.h;break;case l.default.down:a.x=e.x-(o.w-1)/2,a.y=e.y+3;break;case l.default.left:a.x=e.x-o.w-2,a.y=e.y-(o.h-1)/2;break;case l.default.right:a.x=e.x+3,a.y=e.y-(o.h-1)/2}var r=new s.default(o.size,new n.default(a.x,a.y),t.getOppositeDirection(e.direction));a.x>=0&&a.y>=0&&(e.direction!=l.default.down&&e.direction!=l.default.right||i.push(r))})}),i}},{key:"getOppositeDirection",value:function(e){switch(e){case l.default.up:return l.default.down;case l.default.down:return l.default.up;case l.default.left:return l.default.right;case l.default.right:return l.default.left}}}]),t}();exports.default=h;
},{"../index":"KqmS","./tile":"HhU3","./room":"WRMb","./direction":"k0V4","./room-prefab-config":"MyIl","./coordinate":"oNOt","./room-size":"kdF2"}],"vmJX":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function i(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}Object.defineProperty(exports,"__esModule",{value:!0});var s=require("."),a=function(){function e(i,a,r){t(this,e),this.text=i,this.x=a,this.y=r,this.xVelocity=1,this.yVelocity=-1,this.color="255, 255, 255",this.alpha=1,this.duration=40,this.update=this._update.bind(this),this.draw=this._draw.bind(this),s.emitter.on("updatePhysics",this.update),s.emitter.on("renderObjects",this.draw)}return i(e,[{key:"_update",value:function(){this.duration--,this.duration>10&&(this.x+=this.xVelocity,this.y+=this.yVelocity),0===this.duration&&(s.emitter.off("updatePhysics",this.update),s.emitter.off("renderObjects",this.draw))}},{key:"_draw",value:function(){s.canvas.canvasCTX.fillStyle=this.color,s.canvas.canvasCTX.fillText(this.text,this.x-s.level.offsetX,this.y)}}]),e}();exports.default=a;
},{".":"KqmS"}],"pP3Y":[function(require,module,exports) {
"use strict";function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function e(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./index"),a=s(require("./popup")),h=function(){function i(e,s){t(this,i),this.x=e,this.y=s,this.id=1,this.height=5,this.width=5,this.fallSpeed0=0,this.jumpSpeed=0,this.canJump=!0,this.xForCamera=0,this.yForCamera=0,this.direction="right",this.activeAttackHitboxWidth=0,this.activeAttackHitboxHeight=0,this.activeAttackDuration=0,this.enemiesHit=[],this.hitPoints=100,this.knockback=0,this.knockbackDirection="",this.moveSpeed=5,o.emitter.on("updatePhysics",this.update.bind(this)),o.emitter.on("renderObjects",this.draw.bind(this))}return e(i,[{key:"draw",value:function(){o.canvas.canvasCTX.fillStyle="#000000",o.canvas.canvasCTX.fillRect(this.xForCamera,this.yForCamera,this.width,this.height)}},{key:"update",value:function(){var t=0;o.keystates.RightArrowIsActive&&(this.direction="right",t=this.moveSpeed,this.moveHorizontal(t)),o.keystates.LeftArrowIsActive&&(this.direction="left",t=-1*this.moveSpeed,this.moveHorizontal(t)),o.keystates.UpArrowIsActive&&(this.direction="up",t=-1*this.moveSpeed,this.moveVertical(t)),o.keystates.DownArrowIsActive&&(this.direction="down",t=this.moveSpeed,this.moveVertical(t)),0===o.level.offsetX&&(this.xForCamera=this.x),0===o.level.offsetY&&(this.yForCamera=this.y),o.debug.playerXPosition=this.x,o.debug.playerYPosition=this.y,o.debug.direction=this.direction}},{key:"moveVertical",value:function(t){if(t>0)for(var i=1;i<=t;i++){if(this.y++,!this.validatePosition()){this.y--;break}this.y+this.width/2>o.canvas.width/2&&o.level.offsetY++}else for(var e=-1;e>=t;e--){if(this.y--,!this.validatePosition()){this.y++;break}o.level.offsetY>0&&o.level.offsetY--}}},{key:"moveHorizontal",value:function(t){if(t>0)for(var i=1;i<=t;i++){if(this.x++,!this.validatePosition()){this.x--;break}this.x+this.width/2>o.canvas.width/2&&o.level.offsetX++}else for(var e=-1;e>=t;e--){if(this.x--,!this.validatePosition()){this.x++;break}o.level.offsetX>0&&o.level.offsetX--}}},{key:"validatePosition",value:function(){var t=!0,i=Math.floor(this.x/o.settings.tileSize),e=Math.floor((this.x+this.width)/o.settings.tileSize),s=Math.floor(this.y/o.settings.tileSize),a=Math.floor((this.y+this.height-1)/o.settings.tileSize);return!(a<0||s<0||i<0||e<0)&&(o.level.tiles[i][s].isSolid&&(t=!1),o.level.tiles[e][s].isSolid&&(t=!1),o.level.tiles[i][a].isSolid&&(t=!1),o.level.tiles[e][a].isSolid&&(t=!1),t)}},{key:"applyHit",value:function(t,i,e){this.hitPoints-=t,this.knockback=i,this.jumpSpeed=8,this.knockbackDirection=e,new a.default(t.toString(),this.x,this.y),this.hitPoints<=0&&console.log("Oh dear, you are dead!")}}]),i}();exports.default=h;
},{"./index":"KqmS","./popup":"vmJX"}],"jR0p":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0});var i=function(){function t(){e(this,t),this.tileSize=15}return n(t,[{key:"zoom",value:function(e){e.preventDefault(),e.deltaY>0?this.tileSize+=-2:this.tileSize+=2}}]),t}();exports.default=i;
},{}],"KqmS":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./canvas")),n=e(require("./debug")),r=require("eventemitter3"),s=e(require("./keystates")),o=e(require("./map-generation/level")),a=e(require("./player")),i=e(require("./settings"));function u(){document.addEventListener("keydown",function(e){exports.keystates.setKey(e.keyCode,!0)}),document.addEventListener("keyup",function(e){exports.keystates.setKey(e.keyCode,!1)}),document.getElementById("main-canvas").addEventListener("wheel",function(e){exports.settings.zoom(e)}),document.getElementById("generate-button").addEventListener("click",function(e){exports.level.renderMap()}),setInterval(function(){exports.emitter.emit("updatePhysics")},16),setInterval(function(){exports.emitter.emit("renderObjects")},16)}exports.settings=new i.default,exports.emitter=new r.EventEmitter,exports.keystates=new s.default,exports.level=new o.default(100,100),exports.player=new a.default(exports.level.playerStartX,exports.level.playerStartY),exports.canvas=new t.default,exports.debug=new n.default,window.onload=function(){u()};
},{"./canvas":"w8NT","./debug":"wexW","eventemitter3":"LqgX","./keystates":"KCsH","./map-generation/level":"Q5Gq","./player":"pP3Y","./settings":"jR0p"}]},{},["KqmS"], null)
//# sourceMappingURL=scripts.3aa73191.js.map