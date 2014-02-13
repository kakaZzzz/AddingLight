define(function(require, exports, module){
    var $ = require('../libs/zepto.min'),
        Mustache = require('mustache'),
        tmpl = '/v.gif?u={{&u}}&r={{&r}}&p={{p}}&a={{a}}&d={{d}}&v=1.0.0';
    exports.send = function(opts){
        var url = Mustache.render(tmpl, {
            u: location.href.split('?')[0],
            r: document.referrer.split('?')[0],
            p: 'light_' + opts.p,
            a: opts.a || opts.p,
            d: window.screen.width + '*' + window.screen.height
        });
        delete opts['a'];
        delete opts['p'];
        //发送请求记录日志
        $.ajax({
            url: url + '&' + $.param(opts)
        });
    };
});