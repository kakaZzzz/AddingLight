define(function(require, exports, module){
    var currentPage = location.href.split('?')[0].match(/\/([^/]+)\.html$/i)[1],
        Mustache = require('mustache'),
        tmpl = '<li><a href="{{href}}" class="{{css}}">{{&html}}</a></li>',
        links = [
            {id: 'foetusweight', alias: '', html: '想看看宝宝多重了吗？<br/><span class="red">胎儿体重计算</span>', css: 're-foet'},
            {id: 'typeblist', alias: 'typeblist,typebret', html: '看不懂B超单？<br/><span class="red">解读B超单</span>', css: 're-type'},
            {id: 'evaluation', alias: 'evalret', html: '您的宝宝发育标准吗？<br/><span class="red">宝宝发育评测</span>', css: 're-eval'}
        ],
        ret = [], item;
    for(var i = 0; i < links.length; i++){
        item = links[i];
        if(~(item.id + ',' + item.alias).indexOf(currentPage)){continue;}
        ret.push(Mustache.render(tmpl, {
            href: item.id + '.html?from=' + currentPage,
            css: item.css,
            html: item.html
        }));
    }
    exports.html = '<ul class="hyperlink">'+ ret.join('') +'</ul>';
});