/*!Extend matchMedia.js*/
(function(a){a.matchMedia=(function(){var e=0,c="gmu-media-detect",b=a.fx.transitionEnd,f=a.fx.cssPrefix,d=a("<style></style>").append("."+c+"{"+f+"transition: width 0.001ms; width: 0; position: absolute; clip: rect(1px, 1px, 1px, 1px);}\n").appendTo("head");return function(i){var k=c+e++,j,h=[],g;d.append("@media "+i+" { #"+k+" { width: 1px; } }\n");j=a('<div class="'+c+'" id="'+k+'"></div>').appendTo("body").on(b,function(){g.matches=j.width()===1;a.each(h,function(l,m){a.isFunction(m)&&m.call(g,g)})});g={matches:j.width()===1,media:i,addListener:function(l){h.push(l);return this},removeListener:function(m){var l=h.indexOf(m);~l&&h.splice(l,1);return this}};return g}}())})(Zepto);
/*!Extend event.ortchange.js*/
$(function(){$.mediaQuery={ortchange:"screen and (width: "+window.innerWidth+"px)"};$.matchMedia($.mediaQuery.ortchange).addListener(function(){$(window).trigger("ortchange")})});
/*!Extend highlight.js*/
(function(c){var e=c(document),a,d;function b(){var f=a.attr("hl-cls");clearTimeout(d);a.removeClass(f).removeAttr("hl-cls");a=null;e.off("touchend touchmove touchcancel",b)}c.fn.highlight=function(g,f){return this.each(function(){var h=c(this);h.css("-webkit-tap-highlight-color","rgba(255,255,255,0)").off("touchstart.hl");g&&h.on("touchstart.hl",function(j){var i;a=f?(i=c(j.target).closest(f,this))&&i.length&&i:h;if(a){a.attr("hl-cls",g);d=setTimeout(function(){a.addClass(g)},100);e.on("touchend touchmove touchcancel",b)}})})}})(Zepto);
/*!Extend parseTpl.js*/
(function(a,b){a.parseTpl=function(f,e){var c="var __p=[];with(obj||{}){__p.push('"+f.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(g,h){return"',"+h.replace(/\\'/,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(g,h){return"');"+h.replace(/\\'/,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+'\');}return __p.join("");',d=new Function("obj",c);return e?d(e):d}})(Zepto);
/*!Extend touch.js*/
(function(i){var g={},b,k,h,e=750,a;function c(m){return"tagName" in m?m:m.parentNode}function j(n,m,p,o){var r=Math.abs(n-m),q=Math.abs(p-o);return r>=q?(n-m>0?"Left":"Right"):(p-o>0?"Up":"Down")}function l(){a=null;if(g.last){g.el.trigger("longTap");g={}}}function d(){if(a){clearTimeout(a)}a=null}function f(){if(b){clearTimeout(b)}if(k){clearTimeout(k)}if(h){clearTimeout(h)}if(a){clearTimeout(a)}b=k=h=a=null;g={}}i(document).ready(function(){var m,n;i(document.body).bind("touchstart",function(o){m=Date.now();n=m-(g.last||m);g.el=i(c(o.touches[0].target));b&&clearTimeout(b);g.x1=o.touches[0].pageX;g.y1=o.touches[0].pageY;if(n>0&&n<=250){g.isDoubleTap=true}g.last=m;a=setTimeout(l,e)}).bind("touchmove",function(o){d();g.x2=o.touches[0].pageX;g.y2=o.touches[0].pageY;if(Math.abs(g.x1-g.x2)>10){o.preventDefault()}}).bind("touchend",function(o){d();if((g.x2&&Math.abs(g.x1-g.x2)>30)||(g.y2&&Math.abs(g.y1-g.y2)>30)){h=setTimeout(function(){g.el.trigger("swipe");g.el.trigger("swipe"+(j(g.x1,g.x2,g.y1,g.y2)));g={}},0)}else{if("last" in g){k=setTimeout(function(){var p=i.Event("tap");p.cancelTouch=f;g.el.trigger(p);if(g.isDoubleTap){g.el.trigger("doubleTap");g={}}else{b=setTimeout(function(){b=null;g.el.trigger("singleTap");g={}},250)}},0)}}}).bind("touchcancel",f);i(window).bind("scroll",f)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(n){i.fn[n]=function(m){return this.bind(n,m)}})})(Zepto);
/*!Extend gmu.js*/
var gmu=gmu||{version:"@version",$:window.Zepto,staticCall:(function(c){var b=c.fn,d=[].slice,a=c();a.length=1;return function(f,e){a[0]=f;return b[e].apply(a,d.call(arguments,2))}})(Zepto)};
/*!Extend event.js*/
(function(e,f){var i=[].slice,g=/\s+/,a=function(){return false},d=function(){return true};function k(l,n,m){(l||"").split(g).forEach(function(o){m(o,n)})}function h(l){return new RegExp("(?:^| )"+l.replace(" "," .* ?")+"(?: |$)")}function c(l){var m=(""+l).split(".");return{e:m[0],ns:m.slice(1).sort().join(" ")}}function b(l,m,q,n){var p,o;o=c(m);o.ns&&(p=h(o.ns));return l.filter(function(r){return r&&(!o.e||r.e===o.e)&&(!o.ns||p.test(r.ns))&&(!q||r.cb===q||r.cb._cb===q)&&(!n||r.ctx===n)})}function j(m,l){if(!(this instanceof j)){return new j(m,l)}l&&f.extend(this,l);this.type=m;return this}j.prototype={isDefaultPrevented:a,isPropagationStopped:a,preventDefault:function(){this.isDefaultPrevented=d},stopPropagation:function(){this.isPropagationStopped=d}};e.event={on:function(l,p,m){var n=this,o;if(!p){return this}o=this._events||(this._events=[]);k(l,p,function(q,s){var r=c(q);r.cb=s;r.ctx=m;r.ctx2=m||n;r.id=o.length;o.push(r)});return this},one:function(l,o,m){var n=this;if(!o){return this}k(l,o,function(p,r){var q=function(){n.off(p,q);return r.apply(m||n,arguments)};q._cb=r;n.on(p,q,m)});return this},off:function(l,o,n){var m=this._events;if(!m){return this}if(!l&&!o&&!n){this._events=[];return this}k(l,o,function(p,q){b(m,p,q,n).forEach(function(r){delete m[r.id]})});return this},trigger:function(m){var q=-1,o,p,n,l,r;if(!this._events||!m){return this}typeof m==="string"&&(m=new j(m));o=i.call(arguments,1);m.args=o;o.unshift(m);p=b(this._events,m.type);if(p){l=p.length;while(++q<l){if((n=m.isPropagationStopped())||false===(r=p[q]).cb.apply(r.ctx2,o)){n||(m.stopPropagation(),m.preventDefault());break}}}return this}};e.Event=j})(gmu,gmu.$);
/*!Extend widget.js*/
(function(j,f,h){var m=[].slice,n=Object.prototype.toString,q=function(){},d=["options","template","tpl2html"],e=(function(){var t={},v=0,u="_gid";return function(z,y,A){var w=z[u]||(z[u]=++v),x=t[w]||(t[w]={});A!==h&&(x[y]=A);A===null&&delete x[y];return x[y]}})(),o=j.event;function i(t){return n.call(t)==="[object Object]"}function k(u,t){u&&Object.keys(u).forEach(function(v){t(v,u[v])})}function c(u){try{u=u==="true"?true:u==="false"?false:u==="null"?null:+u+""===u?+u:/(?:\{[\s\S]*\}|\[[\s\S]*\])$/.test(u)?JSON.parse(u):u}catch(t){u=h}return u}function g(x){var v={},u=x&&x.attributes,t=u&&u.length,w,y;while(t--){y=u[t];w=y.name;if(w.substring(0,5)!=="data-"){continue}w=w.substring(5);y=c(y.value);y===h||(v[w]=y)}return v}function l(u){var v=u.substring(0,1).toLowerCase()+u.substring(1),t=f.fn[v];f.fn[v]=function(y){var x=m.call(arguments,1),A=typeof y==="string"&&y,w,z;f.each(this,function(B,C){z=e(C,u)||new j[u](C,i(y)?y:h);if(A==="this"){w=z;return false}else{if(A){if(!f.isFunction(z[A])){throw new Error("\u7ec4\u4ef6\u6ca1\u6709\u6b64\u65b9\u6cd5\uff1a"+A)}w=z[A].apply(z,x);if(w!==h&&w!==z){return false}w=h}}});return w!==h?w:this};f.fn[v].noConflict=function(){f.fn[v]=t;return this}}function a(t,v){var u=this;if(t.superClass){a.call(u,t.superClass,v)}k(e(t,"options"),function(w,x){x.forEach(function(z){var A=z[0],y=z[1];if(A==="*"||(f.isFunction(A)&&A.call(u,v[w]))||A===v[w]){y.call(u)}})})}function s(t,v){var u=this;if(t.superClass){s.call(u,t.superClass,v)}k(e(t,"plugins"),function(w,x){if(v[w]===false){return}k(x,function(y,A){var z;if(f.isFunction(A)&&(z=u[y])){u[y]=function(){var B=u.origin,C;u.origin=z;C=A.apply(u,arguments);B===h?delete u.origin:(u.origin=B);return C}}else{u[y]=A}});x._init.call(u)})}function p(){var t=m.call(arguments),u=t.length,v;while(u--){v=v||t[u];i(t[u])||t.splice(u,1)}return t.length?f.extend.apply(null,[true,{}].concat(t)):v}function b(v,t,w,x,u){var z=this,y;if(i(x)){u=x;x=h}u&&u.el&&(x=f(u.el));x&&(z.$el=f(x),x=z.$el[0]);y=z._options=p(t.options,g(x),u);z.template=p(t.template,y.template);z.tpl2html=p(t.tpl2html,y.tpl2html);z.widgetName=v.toLowerCase();z.eventNs="."+z.widgetName+w;z._init(y);z._options.setup=(z.$el&&z.$el.parent()[0])?true:false;a.call(z,t,y);s.call(z,t,y);z._create();z.trigger("ready");x&&e(x,v,z)&&z.on("destroy",function(){e(x,v,null)});return z}function r(w,v,y){if(typeof y!=="function"){y=j.Base}var x=1,u=1;function t(A,z){if(w==="Base"){throw new Error("Base\u7c7b\u4e0d\u80fd\u76f4\u63a5\u5b9e\u4f8b\u5316")}if(!(this instanceof t)){return new t(A,z)}return b.call(this,w,t,x++,A,z)}f.extend(t,{register:function(A,B){var z=e(t,"plugins")||e(t,"plugins",{});B._init=B._init||q;z[A]=B;return t},option:function(A,B,C){var z=e(t,"options")||e(t,"options",{});z[A]||(z[A]=[]);z[A].push([B,C]);return t},inherits:function(z){return r(w+"Sub"+u++,z,t)},extend:function(B){var A=t.prototype,z=y.prototype;d.forEach(function(C){B[C]=p(y[C],B[C]);B[C]&&(t[C]=B[C]);delete B[C]});k(B,function(C,D){if(typeof D==="function"&&z[C]){A[C]=function(){var F=this.$super,E;this.$super=function(){var G=m.call(arguments,1);return z[C].apply(this,G)};E=D.apply(this,arguments);F===h?(delete this.$super):(this.$super=F);return E}}else{A[C]=D}})}});t.superClass=y;t.prototype=Object.create(y.prototype);t.extend(v);return t}j.define=function(u,t,v){j[u]=r(u,t,v);l(u)};j.isWidget=function(u,t){t=typeof t==="string"?j[t]||q:t;t=t||j.Base;return u instanceof t};j.Base=r("Base",{_init:q,_create:q,getEl:function(){return this.$el},on:o.on,one:o.one,off:o.off,trigger:function(v){var t=typeof v==="string"?new j.Event(v):v,u=[t].concat(m.call(arguments,1)),x=this._options[t.type],w=this.getEl();if(x&&f.isFunction(x)){false===x.apply(this,u)&&(t.stopPropagation(),t.preventDefault())}o.trigger.apply(this,u);w&&w.triggerHandler(t,(u.shift(),u));return this},tpl2html:function(v,u){var t=this.template;t=typeof v==="string"?t[v]:((u=v),t);return u||~t.indexOf("<%")?f.parseTpl(t,u):t},destroy:function(){this.$el&&this.$el.off(this.eventNs);this.trigger("destroy");this.off();this.destroyed=true}},Object);f.ui=j})(gmu,gmu.$);
/*!Widget suggestion/suggestion.js*/
(function(b,c){var a=0;gmu.define("Suggestion",{options:{historyShare:true,confirmClearHistory:true,autoClose:false},template:{wrapper:'<div class="ui-suggestion"><div class="ui-suggestion-content"></div><div class="ui-suggestion-button"><span class="ui-suggestion-clear">\u6e05\u9664\u5386\u53f2\u8bb0\u5f55</span><span class="ui-suggestion-close">\u5173\u95ed</span></div></div>'},_initDom:function(){var d=this,f=d.getEl().attr("autocomplete","off"),e=f.parent(".ui-suggestion-mask");e.length?d.$mask=e:f.wrap(d.$mask=b('<div class="ui-suggestion-mask"></div>'));d.$mask.append(d.tpl2html("wrapper"));d.$wrapper=d.$mask.find(".ui-suggestion").prop("id","ui-suggestion-"+(a++));d.$content=d.$wrapper.css("top",f.height()+(d.wrapperTop=parseInt(d.$wrapper.css("top"),10)||0)).find(".ui-suggestion-content");d.$btn=d.$wrapper.find(".ui-suggestion-button");d.$clearBtn=d.$btn.find(".ui-suggestion-clear");d.$closeBtn=d.$btn.find(".ui-suggestion-close");return d.trigger("initdom")},_bindEvent:function(){var f=this,d=f.getEl(),e=f.eventNs;f._options.autoClose&&b(document).on("tap"+e,function(g){!b.contains(f.$mask.get(0),g.target)&&f.hide()});d.on("focus"+e,function(){!f.isShow&&f._showList().trigger("open")});d.on("input"+e,function(){f._showList()});f.$clearBtn.on("click"+e,function(){f.history(null)}).highlight("ui-suggestion-highlight");f.$closeBtn.on("click"+e,function(){f.getEl().blur();f.hide().trigger("close")}).highlight("ui-suggestion-highlight");return f},_create:function(){var f=this,e=f._options,d=e.historyShare;e.container&&(f.$el=b(e.container));f.key=d?((b.type(d)==="boolean"?"":d+"-")+"SUG-Sharing-History"):f.getEl().attr("id")||("ui-suggestion-"+(a++));f.separator=encodeURIComponent(",");f._initDom()._bindEvent();return f},_showList:function(){var d=this,f=d.value(),e;if(f){d.trigger("sendrequest",f,b.proxy(d._render,d),b.proxy(d._cacheData,d))}else{(e=d._localStorage())?d._render(f,e.split(d.separator)):d.hide()}return d},_render:function(e,d){this.trigger("renderlist",d,e,b.proxy(this._fillWrapper,this))},_fillWrapper:function(d){this.$clearBtn[this.value()?"hide":"show"]();d?(this.$content.html(d),this.show()):this.hide();return this},_localStorage:function(i){var g=this,f=g.key,j=g.separator,d,h;try{d=c.localStorage;if(i===undefined){return d[f]}else{if(i===null){d[f]=""}else{if(i){h=d[f]?d[f].split(j):[];if(!~b.inArray(i,h)){h.unshift(i);d[f]=h.join(j)}}}}}catch(e){console.log(e.message)}return g},_cacheData:function(d,e){this.cacheData||(this.cacheData={});return e!==undefined?this.cacheData[d]=e:this.cacheData[d]},value:function(){return this.getEl().val()},history:function(e){var d=this,f=e!==null||function(){return d._localStorage(null).hide()};return e===null?(d._options.confirmClearHistory?c.confirm("\u6e05\u9664\u5168\u90e8\u67e5\u8be2\u5386\u53f2\u8bb0\u5f55\uff1f")&&f():f()):d._localStorage(e)},show:function(){if(!this.isShow){this.$wrapper.show();this.isShow=true;return this.trigger("show")}else{return this}},hide:function(){if(this.isShow){this.$wrapper.hide();this.isShow=false;return this.trigger("hide")}else{return this}},destroy:function(){var f=this,d=f.getEl(),e=f.ns;f.trigger("destroy");d.off(e);f.$mask.replaceWith(d);f.$clearBtn.off(e);f.$closeBtn.off(e);f.$wrapper.children().off().remove();f.$wrapper.remove();f._options.autoClose&&b(document).off(e);this.destroyed=true;return f}})})(gmu.$,window);
/*!Widget suggestion/compatdata.js*/
(function(a,b){gmu.Suggestion.options.compatdata=true;gmu.Suggestion.option("compatdata",true,function(){this.on("ready",function(){var d=this.key,c="SUG-History-DATATRANS",h,f;try{h=b.localStorage[d];if(h&&!b.localStorage[c]){b.localStorage[c]="\u001e";f=h.split(",");b.localStorage[d]=f.join(this.separator)}}catch(g){console.log(g.message)}})})})(gmu.$,window);
/*!Widget suggestion/renderlist.js*/
(function(a){a.extend(gmu.Suggestion.options,{isHistory:true,usePlus:false,listCount:5,renderlist:null});gmu.Suggestion.option("renderlist",function(){return a.type(this._options.renderlist)!=="function"},function(){var d=this,b=a("<div></div>"),c=function(f){return b.text(f).html()},e=function(m,h){var l=d._options,k=[],n="",g,f,j;if(!h||!h.length){d.hide();return k}h=h.slice(0,l.listCount);m=c(m||"");for(j=0,f=h.length;j<f;j++){n=c(g=h[j]);m&&(n=a.trim(g).replace(m,"<span>"+m+"</span>"));l.usePlus&&(n+='<div class="ui-suggestion-plus" data-item="'+g+'"></div>');k.push("<li>"+n+"</li>")}return k};d.on("ready",function(){var h=this,g=h.eventNs,f=a(h._options.form||h.getEl().closest("form"));f.size()&&(h.$form=f.on("submit"+g,function(j){var i=gmu.Event("submit");h._options.isHistory&&h._localStorage(h.value());h.trigger(i);i.isDefaultPrevented()&&j.preventDefault()}));h.$content.on("touchstart"+g,function(i){i.preventDefault()});h.$content.on("tap"+g,function(j){var k=h.getEl(),i=a(j.target);if(i.hasClass("ui-suggestion-plus")){k.val(i.attr("data-item"))}else{if(a.contains(h.$content.get(0),i.get(0))){setTimeout(function(){k.val(i.text());h.trigger("select",i).hide().$form.submit()},400)}}}).highlight("ui-suggestion-highlight");h.on("destroy",function(){f.size()&&f.off(g);h.$content.off()})});d.on("renderlist",function(i,h,g,j){var f=e(g,h);return j(f.length?"<ul>"+f.join(" ")+"</ul>":"")})})})(gmu.$);
/*!Widget suggestion/sendrequest.js*/
(function(a,b){a.extend(gmu.Suggestion.options,{isCache:true,queryKey:"wd",cbKey:"cb",sendrequest:null});gmu.Suggestion.option("sendrequest",function(){return a.type(this._options.sendrequest)!=="function"},function(){var g=this,f=g._options,e=f.queryKey,c=f.cbKey,i=f.param,d=f.isCache,h;this.on("sendrequest",function(n,m,o,k){var l=f.source,j="suggestion_"+(+new Date());if(d&&(h=k(m))){o(m,h);return g}l=(l+"&"+e+"="+encodeURIComponent(m)).replace(/[&?]{1,2}/,"?");!~l.indexOf("&"+c)&&(l+="&"+c+"="+j);i&&(l+="&"+i);b[j]=function(p){o(m,p.s);d&&k(m,p.s);delete b[j]};a.ajax({url:l,dataType:"jsonp"});return g})})})(gmu.$,window);
/*!Widget suggestion/$quickdelete.js*/
(function(b,a){b.Suggestion.register("quickdelete",{_init:function(){var d=this,e,c;d.on("ready",function(){e=d.getEl();c=d.eventNs;d.$mask.append(d.$quickDel=a('<div class="ui-suggestion-quickdel"></div>'));e.on("focus"+c+" input"+c,function(){d["_quickDel"+(a.trim(e.val())?"Show":"Hide")]()});e.on("blur"+c,function(){d._quickDelHide()});d.$quickDel.on("touchstart"+c,function(f){f.preventDefault();f.formDelete=true;e.val("");d.trigger("delete").trigger("input")._quickDelHide();e.blur().focus()});d.on("destroy",function(){d.$quickDel.off().remove()})})},_quickDelShow:function(){if(!this.quickDelShow){b.staticCall(this.$quickDel.get(0),"css","visibility","visible");this.quickDelShow=true}},_quickDelHide:function(){if(this.quickDelShow){b.staticCall(this.$quickDel.get(0),"css","visibility","hidden");this.quickDelShow=false}}})})(gmu,gmu.$);
/*!Widget suggestion/$posadapt.js*/
(function(b,c){var a=Array.prototype.reverse;gmu.Suggestion.options.listSelector="li";gmu.Suggestion.register("posadapt",{_init:function(){var e=this,d;e.on("show ortchange",function(){if(e._checkPos()){e.$wrapper.css("top",-e.$wrapper.height()-e.wrapperTop);a.call(d=e.$content.find(e._options.listSelector));d.appendTo(d.parent());e.$btn.prependTo(e.$wrapper)}})},_checkPos:function(){var e=this._options.height||66,d=this.getEl().offset().top-c.pageYOffset;return b(c).height()-d<e&&d>=e}})})(gmu.$,window);
