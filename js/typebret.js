define(function(require, exports, module){
    var keyword = location.search,
        Mustache = require('mustache'),
        week = require('data/week'),
        tmpl = '名称：{{name}} {{alias}} {{en}}<br/>释义：{{dis}} {{ref}} {{pic}}',
        input = $('.typebret_main input.search'),
        ret = $('.typebret_main div.ret'),
        engine = require('SearchEngine').getInstance(input),
        btn = $('.typebret_main a.search_btn').click(function(){
            engine.search(input.val(), function(data){
                ret.html(data ? Mustache.render(tmpl, {
                    name: data.name,
                    alias: data.alias ? '<br/>其它表述：' + data.alias : '',
                    en: data.en ? '<br/>字母缩写：' + data.en : '',
                    dis: data.dis,
                    ref: data.ref ? '<br/>参考范围：' : '',
                    pic: data.pic ? '<br/>插图：有图有真像' : ''
                }) : '<div class="red" align="center" style="margin: 20px 0px;">没有搜索结果！</div>');
            });
        });
        
    if(keyword){
        keyword = decodeURI(keyword.split('=')[1]);
        input.val(keyword);
        btn.trigger('click');
    }
});