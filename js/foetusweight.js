define(function(require, exports, module){
    $('.foetusweight_main .count').click(function(evt){
        var Mustache = require('mustache'),
            tmpl = '您宝宝的体重是：<span class="red">{{weight}}</span>';
        $('.foetusweight_main .ret').html(Mustache.render(tmpl, {weight: '3024g'}));
    });
});