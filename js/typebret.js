define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        keyword = location.search,
        Mustache = require('mustache'),
        tmpl = '<span class="art-title">{{name}}</span>{{&alias}} {{&en}}<br/>释义：{{dis}} {{&pic}} {{&ref}}',
        input = $('.typebret_main input.search'),
        ret = $('.typebret_main div.ret'),
        engine = require('SearchEngine').getInstance(input),
        form = $('#myform').submit(function(evt){
            evt.preventDefault();
            input.blur();
            engine.getSuggestion().hide();
            engine.search(input.val(), function(data){
                if(data && $.isPlainObject(data.ref)){
                    var ref = data.ref,
                        html = ['<table align="center" cellpadding="3" cellspacing="0" border="0">'];
                    html.push('<thead><tr><th>', ref.captain.join('</th><th>'), '</th></thead>');
                    html.push('<tbody>');
                    $.each(ref.rows, function(_, item){
                        html.push('<tr><td>', item.join('</td><td>'), '</td></tr>');
                    });
                    html.push('</tbody></table>');
                    data.ref = html.join('');
                }
                var stringHTML = data ? Mustache.render(tmpl, {
                    name: data.name,
                    alias: data.alias ? '<br/>其它表述：' + data.alias : '',
                    en: data.en ? '<br/>字母缩写：' + data.en : '',
                    dis: data.dis,
                    ref: data.ref ? '<br/>参考范围：' + data.ref : '',
                    pic: data.pic ? '<div class="data-pic" style="background-image: url(./images/'+ data.pic +');"></div>' : ''
                }) : '<div class="red" style="margin: 20px 0px;">抱歉，没有您要查询的结果哦~，请稍安勿躁，换个关键词试试。</div>';

                stringHTML = stringHTML.replace(/\$\{([^}]+)\}/gi, function(a, b){
                    return '<' + b.replace(/\&\#x2f;/gi, '/') + '>';
                });
                ret.html(stringHTML);
            });
        });
        $('.typebret_main a.search_btn').click(function(){
            form.submit();
        });
    if(keyword){
        keyword = keyword.split('=')[1].replace('+', ' ');
        input.val(decodeURIComponent(keyword));
        form.submit();
    }
});