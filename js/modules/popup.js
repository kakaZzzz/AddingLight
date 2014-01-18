define(function(require, exports, module){
    var util = require('util').util,
        $ = require('../libs/zepto.min'),
        Mustache = require('mustache'),
        tmpl = '<div class="{{markClass}}"><div class="{{popupClass}}"><div class="{{contentClass}}"></div></div></div>';

    function c(options){
        var me = this,
            opts;
        util.defineProperties(me._options = opts = {
            prefix: '',
            markClass: 'popup-mark',
            popupClass: 'popup-main',
            contentClass: 'popup-content',
            hideAndClear: true
        }, options || {});
        var html = Mustache.render(tmpl, {
            markClass: me._options.markClass,
            popupClass: me._options.popupClass,
            contentClass: me._options.contentClass
        });
        $('body').append($(html));
        me._popup = $('.' + opts.markClass).css('visibility', 'hidden');
        me._main = $('.' + opts.markClass + ' > div.' + opts.popupClass);
        me._content = $('.' + opts.markClass + ' div.' + opts.popupClass + ' > div.' + opts.contentClass);
        me._initialize();
    }

    util.defineProperties(c.prototype, {
        _initialize: function(){
            var me = this,
                popup = me._popup,
                main = me._main;
            popup.css('position', 'absolute')
                .css('width', '100%')
                .css('left', '0px')
                .css('top', '0px');
            main.css('position', 'absolute')
                .css('left', '0px')
                .css('top', '0px')
                .css('right', '0px')
                .css('bottom', '0px');
            me._content.delegate('.popup-close', 'click', function(){me.hide();});
            me.refresh();
        },

        show: function(){
            this._popup.css('visibility', 'visible');
            return this;
        },

        hide: function(){
            var me = this,
                opts = me._options;
            me._popup.css('visibility', 'hidden');
            if(!opts.hideAndClear){return me;}
            me._content.html('');
            me._main.css('marginTop', '0px');
            me._popup.css('width', '100%')
                .css('height', '100%');
            return me;
        },

        content: function(content){
            var me = this;
            this._content.html(content);
            me.refresh();
            return me;
        },

        prefix: function(className){
            var me = this,
                opts = me._options,
                popup = me._popup;
            if(popup.hasClass(className)){return;}
            popup.addClass(className);
            return me;
        },

        refresh: function(){
            var me = this,
                body = $('body').get(0),
                main = document.documentElement,
                top = Math.round((main.clientHeight - me._content.get(0).offsetHeight) / 2 + Math.max(main.scrollTop, body.scrollTop)),
                height;
            me._main.css('marginTop', Math.max(top, 0) + 'px');
            height = Math.max(body.scrollHeight, main.scrollHeight),
            me._popup.css('height', height + 'px')//.css('width',  width + 'px');
            return me;
        }
    });
    exports.getInstance = function(options){
        return new c(options);
    }
});