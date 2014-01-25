define(function(require, exports, module){
    var util = require('util').util,
        dot = require('doT'),
        tmpl = dot.template('<div class="{{=it.mainClass}}"><div class="{{=it.contentClass}}"></div><div class="{{=it.arrawClass}}"></div></div>'),
        $ = require('../libs/zepto.min');

    function c(){
        var me = this;
        me._target = $('body');
        $('body').append(tmpl({
            mainClass: 'popover',
            contentClass: 'content',
            arrawClass: 'arraw'
        })).on('tap', function(evt){
            if(evt.target === me._target.get(0)
                || $.contains($('.popover').get(0), evt.target)){return;}
            me.hide();
        });

        $(window).on('orientationchange', function(){
            $('.popover')
                .css('left', '0px')
                .css( 'top', '0px');
            me._position();
        });

    }
    util.defineProperties(c.prototype, {
        show: function(){
            $('.popover').show();
            this._position();
        },

        hide: function(){
            $('.popover').hide()
                .css('left', '0px')
                .css( 'top', '0px');
            $(this).trigger('hide');
        },

        content: function(content){
            $('.popover > .content').html(content);
        },

        target: function(elem){
            this._target = $(elem);
        },

        _position: function(){
            var me = this,
                target = me._target,
                main = $('.popover'),
                bodyWidth = $('body').width(),
                mainWidth = main.width(),
                pos = target.offset(),
                targetLeft = pos.left + Math.round(target.width() / 2),
                left = targetLeft - Math.round(mainWidth / 2),
                top = target.height() + pos.top + 10;
            left < 0 && (left = 0);
            left + mainWidth > bodyWidth && (left = bodyWidth - mainWidth);
            $('.popover').css('left', left + 'px')
                .css('top', top + 'px');
            $('.popover > .arraw').css('left', targetLeft - left - 10 + 'px');//10是arraw的宽度
        },

        on: function(evtName, handler){
            var me = this;
            $(me).on(evtName, handler);
        }
    });

    exports.getInstance = function(){
        return new c();
    }
});