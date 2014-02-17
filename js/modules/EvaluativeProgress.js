define(function(require, exports, module){
    var util = require('util').util,
        $ = require('../libs/zepto.min'),
        Mustache = require('mustache'),
        tmpl = '<div class="range prev">{{prev}}mm</div><div class="center"></div><div class="range next">{{next}}mm</div>',
        popupTmpl = '<div class="popup"><div class="popup-content">{{&content}}</div><div class="pointer"></div></div>';
    
    //popup
    function popup(container, options){
        var me = this,
            opts = me._ooptions = {
                placement: 'top',//top bottom
                content: '',
                prefix: ''
            };
        me._target = container;
        $.extend(opts, options || {});
        me._popup = $(Mustache.render(popupTmpl, {
            content: opts.content + 'mm'
        })).appendTo(container);
        me.prefix(opts.prefix);
        me._popup.css('margin-left', Math.floor(me._popup.get(0).offsetWidth / 2 * -1) + 'px');
    }
    //
    util.defineProperties(popup.prototype, {
        prefix: function(prefix){
            var me = this;
            me._popup.addClass(prefix);
        },

        position: function(coordinate){
            var me = this;
            me._popup.css('left', coordinate.left);
        }
    });
    //progress
    function c(container, options){
        var me = this,
            opts = me._options = {
                range: [0, 100],
                value: 50
            },
            centerContainer;
        me._target = container;
        $.extend(opts, options);
        container.append(Mustache.render(tmpl, {
            prev: opts.range[0],
            next: opts.range[1]
        }));
        //
        centerContainer = container.find('.center');
        me._popupCursor = new popup(centerContainer, {prefix: 'cursor', placement: 'bottom', content: '本周：' + opts.value});
        centerContainer.append('<div class="progress-bar"><div class="bar"></div></div>');
        new popup(centerContainer, {prefix: 'standard', content: '平均值：' + opts.average});
        me.val(opts.value);
    }
    //
    util.defineProperties(c.prototype, {
        val: function(value){
            var me = this,
                opts = me._options,
                percent = (value - opts.range[0]) / (opts.range[1] - opts.range[0]) * 100;
            opts.value = value;
            percent = Math.floor(Math.min(Math.max(percent, 0), 100));//保证在0-100之间
            document.body.offsetWidth;//造成重排
            me._target.find('.progress-bar > .bar').css('width', percent === 0 ? '1px' : percent + '%');
            me._popupCursor.position({left: percent === 0 ? '1px' : percent + '%'});
        }
    });
    exports.getInstance = function(container, options){
        return new c(container, options);
    }
});