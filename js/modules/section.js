define(function(require, exports, module){
    var util = require('util').util,
        linksMapping = {},
        scriptsMapping = {};
    
    function initSource(array, type){
        var mapping = type === 'script' ? scriptsMapping : linksMapping,
            prop = type === 'script' ? 'src' : 'href';
        $.each(array, function(index, item){
            var path = item[prop];
            if(mapping[path]){return;}
            mapping[path] = 1;
        });
    }
    
    function c(){
        var me = this;
        me._mapping= {};
        initSource(document.getElementsByTagName('link'), 'link');
        initSource(document.getElementsByTagName('script'), 'script');
        me._root =
        me._selectedIndex = $('section').first().on('webkitTransitionEnd', function(){
            if($(this).css('-webkit-transform') !== 'translateX(0%)'){
                this.style.display = 'none';
            }
        });
    };
    util.defineProperties(c.prototype, {
        forward: function(sectionId, param){
            var me = this,
                mapping = me._mapping;
            if(mapping[sectionId]){//已经存在于页面
                //开始滑动
                $('#pageId').prop('scrollTop', 0);
                $('#page_' + sectionId).get(0).style.display = 'block';
                me._selectedIndex
                    .css('-webkit-transform', 'translateX(-100%)')
                    .parent('div').prop('scrollTop', 0);
                me._selectedIndex = $('#page_' + sectionId).css('-webkit-transform', 'translateX(0%)');
                //数据和事件处理
                if(param){//异步，有风险
                    $('#page_' + sectionId).trigger('page:update', param);
                }
            }else{
                $.get('./' + sectionId + '.html')
                    .done(function(response){
                        //导入css
                        $.each(util.parser.getLinks(response), function(index, item){
                            var path = util.getFullPath(item);
                            if(linksMapping[path]){return;}
                            $('<link/>').appendTo(document.head)
                                .prop('rel', 'stylesheet')
                                .prop('type', 'text/css')
                                .prop('href', item);
                        });
                        //导入页面
                        $('<section></section>')
                            .prop('id', 'page_' + sectionId)
                            .appendTo('#pageId')
                            .html(util.parser.getBody(response))
                            .css('-webkit-transform', 'translateX(100%)')
                            .hide()
                            .on('webkitTransitionEnd', function(){
                                if($(this).css('-webkit-transform') !== 'translateX(0%)'){
                                    this.style.display = 'none';
                                }
                            });
                        //导入js
                        var ret = util.parser.getScripts(response);
                        $.each(ret.src, function(index, item){
                            var path = util.getFullPath(item);
                            if(scriptsMapping[path]){return;}
                            $('<script><\/script>')
                                .prop('type', 'text/javascript')
                                .prop('src', item)
                                .insertAfter(document.body);
                        });//先导
                        $.each(ret.tag, function(index, item){
                            $('<script><\/script>')
                                .prop('type', 'text/javascript')
                                .insertAfter(document.body)
                                .prop('text', item);
                                
                        });//再写入
                        //
                        mapping[sectionId] = 1;
                        me.forward(sectionId, param);
                    });
            }
        },
        
        backward: function(sectionId){
            var me = this,
                backward = sectionId === 'index' ? me._root : $('#page_' + sectionId);
            backward.get(0).style.display = 'block';
            me._selectedIndex.css('-webkit-transform', 'translateX(100%)');
            setTimeout(function(){
                me._selectedIndex = backward.css('-webkit-transform', 'translateX(0%)');
            }, 16);
        }
    });
    
    window._$section_ = window._$section_ || ($('section').length ? new c() : null);
    exports.getInstance = function(rootSectionId){return window._$section_;}
});