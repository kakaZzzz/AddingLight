define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        dot = require('doT'),
        tmpl = dot.template($('#popover-content').html());
        child = $('.children > div[class^=child]'),
        popover = require('popover').getInstance(),
        data = [
            {font: '马上有福', type: '福'},
            {font: '马上发财', type: '禄'},
            {font: '马上长寿', type: '寿'},
            {font: '马上有喜', type: '喜'}
        ];

    popover.on('hide', function(){
        child.removeClass('active');
    });

    child.on('tap', function(evt){
        popover.hide();
        $(this).addClass('active');
        popover.content(tmpl(data[child.index(this)]));
        popover.target(this);
        popover.show();
    });
});