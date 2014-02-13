define(function(require, exports, module){
    var util = require('util').util,
        $ = require('../libs/zepto.min'),
        Mustache = require('mustache'),
        tmpl = '<div class="range prev">{{prev}}mm</div><div class="center"><div class="pointer"></div><div class="progress-bar"></div></div><div class="range next">{{next}}mm</div>';

    function c(container, options){
        var me = this,
            opts = me._options = {
                range: [0, 100],
                value: 50
            };
        me._target = container;
        $.extend(opts, options);
        container.append(Mustache.render(tmpl, {
            prev: opts.range[0],
            next: opts.range[1]
        }));
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
            document.body.offsetWidth;
            me._target.find('.progress-bar').css('width', percent + '%');
            me._target.find('.pointer').css('left', percent + '%');
        }
    });
    exports.getInstance = function(container, options){
        return new c(container, options);
    }
});