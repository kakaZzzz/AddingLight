define(function(require, exports, module){
    var util = require('util').util,
        $ = require('../libs/zepto.min'),
        iscroll = require('iscroll').iScroll,
        Mustache = require('mustache'),
        tmpl = '';

    function c(elem, options){
        var me = this;
        $.extend(me._options = {
            selectedIndex: 0,
            count: 10,
            data: [{}]
        }, options || {});
        me._container = $(elem);
        me._ul = null;
        me.initialize();
    }
    
    util.defineProperties(c.prototype, {

        initialize: function(){
            var me = this,
                opts = me._options,
                html = [],
                child, ul;
            $.each(opts.data, function(index, item){
                html.push('<li class="gest-item"><a href="javascript: void(0);">孕', index + 1, '周</a></li>');
            });
            me._container.css('overflow', 'hidden');
            me._ul = ul = $('<ul></ul>');
            child = me._container.children();
            child.append(ul);
            ul.addClass('gest-combobox')
                .append(html.join(''));
            me._iscroll = new iscroll(child.get(0), {hideScrollbar: true});
            me.select(opts.selectedIndex);
            ul.children().eq(opts.selectedIndex).addClass('selected');
            opts.onchange && opts.onchange(opts.selectedIndex);
            //event
            ul.delegate('li', 'tap', function(evt){//click在手持端会变成激发两次
                me._onClickItem(evt, this);
            });
            //
            me._container.on('tap', function(evt){evt.stopPropagation();});
            //document
            $('body').on('tap', function(evt){
                if(me._container.css('overflow') === 'hidden'){return;}
                me.select(opts.selectedIndex);
            });
        },

        _onClickItem: function(evt, elem){
            var me = this,
                opts = me._options,
                container = me._container,
                ul = me._ul,
                iscroll = me._iscroll;
            if(container.css('overflow') === 'hidden'){//当前处于非激活
                container.children().height(ul.children('li').height() * opts.count);
                iscroll.refresh();
                container.css('overflow', 'visible');
                iscroll.enable();
            }else{//当前处于激活
                me.select(ul.children('li').index(elem));
            }
        },

        select: function(index){
            var me = this;
                opts = me._options,
                container = me._container,
                iscroll = me._iscroll,
                ul = me._ul,
                child = ul.children();
            container.css('overflow', 'hidden')
                .children().height(child.eq(0).height());
            iscroll.refresh();
            iscroll.scrollToElement(child.get(index), 0);
            iscroll.disable();
            //
            if(opts.selectedIndex === index){return;}
            $(child.get(opts.selectedIndex)).removeClass('selected');
            $(child.get(index)).addClass('selected');
            opts.selectedIndex = index;
            opts.onchange && opts.onchange(opts.selectedIndex);
        },

        prev: function(){
            var me = this,
                opts = me._options;
            if(opts.selectedIndex - 1 < 0){return;}
            me.select(opts.selectedIndex - 1);
        },

        next: function(){
            var me = this,
                opts = me._options;
            if(opts.selectedIndex + 1 >= opts.data.length){return;}
            me.select(opts.selectedIndex + 1);
        }
    });

    exports.getInstance = function(elem, opts){
        return new c(elem, opts);
    };
});