define(function(require, exports, module){
    var keyword = location.search,
        Mustache = require('mustache'),
        week = require('data/week').week,
        tmpl = '名称：{{name}} {{&alias}} {{&en}}<br/>释义：{{dis}} {{&ref}} {{&pic}}',
        input = $('.typebret_main input.search'),
        ret = $('.typebret_main div.ret'),
        engine = require('SearchEngine').getInstance(input),
        btn = $('.typebret_main a.search_btn').tap(function(){
            engine.search(input.val(), function(data){
                if(data && data.ref && week[data.ref]){
                    var ref = week[data.ref],
                        html = ['<table cellpadding="8" cellspacing="0" border="0"><thead><tr><th>孕周</th><th>范围</th></tr></thead><tbody>'];
                    $.each(ref.data, function(index, item){
                        html.push('<tr><td>孕', index + ref.start, '周</td><td>', item, '</td></tr>');
                    });
                    html.push('</tbody></table>');
                    data.ref = html.join('');
                }
                var renderHTML = data ? Mustache.render(tmpl, {
                    name: data.name,
                    alias: data.alias ? '<br/>其它表述：' + data.alias : '',
                    en: data.en ? '<br/>字母缩写：' + data.en : '',
                    dis: data.dis,
                    ref: data.ref ? '<br/>参考范围：' + data.ref : '',
                    pic: data.pic ? '<br/>插图：有图有真像' : ''
                }) : '<div class="red" align="center" style="margin: 20px 0px;">没有搜索结果！</div>';
                renderHTML = renderHTML.replace(/\$\{([^}]+)\}/gi, function(a, b){
                    return '<' + b.replace(/\&\#x2f;/gi, '/') + '>';
                });
                ret.html(renderHTML);
            });
        });
        
    if(keyword){
        keyword = decodeURI(keyword.split('=')[1]);
        input.val(keyword);
        btn.trigger('tap');
    }
});