define(function(require, exports, module){
    var keyword = location.search,
        Mustache = require('mustache'),
        week = require('data/week').week,
        tmpl = '<span class="art-title">{{name}}</span>{{&alias}} {{&en}}<br/>释义：{{dis}} {{&ref}} {{&pic}}',
        input = $('.typebret_main input.search'),
        ret = $('.typebret_main div.ret'),
        engine = require('SearchEngine').getInstance(input),
        form = $('#myform').submit(function(evt){
            evt.preventDefault();
            input.blur();
            engine.getSuggestion().hide();
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
                }) : '<div class="red" style="margin: 20px 0px;">抱歉，没有您要查询的结果哦~，请稍安勿躁，换个关键词试试。</div>';

                renderHTML = renderHTML.replace(/\$\{([^}]+)\}/gi, function(a, b){
                    return '<' + b.replace(/\&\#x2f;/gi, '/') + '>';
                });
                ret.html(renderHTML);
            });
        });
        $('.typebret_main a.search_btn').tap(function(){
            form.submit();
        });
    if(keyword){
        keyword = keyword.split('=')[1].replace('+', ' ');
        input.val(decodeURIComponent(keyword));
        form.submit();
    }
});