define(function(require, exports, module){
    var currentPage = location.href.split('?')[0].match(/\/([^/]+)\.html$/i)[1],
        Mustache = require('mustache'),
        tmpl = '<li><a href="{{href}}" class="{{css}}">{{&html}}</a></li>',
        data = {
            foetusweight: {html: '想看看宝宝多重了吗？<br/><span class="red">胎儿体重计算</span>', css: 're-foet'},
            expect: {html: '算算你的预产期吧！<br/><span class="red">预产期计算器</span>', css: 're-expe'},
            typeblist: {html: '看不懂B超单？<br/><span class="red">解读B超单</span>', css: 're-type'},
            forecast: {html: '算算宝宝是男孩还是女孩？<br/><span class="red">清宫图生男生女</span>', css: 're-fore'},
            gestation: {html: '本周宝宝发育到哪个阶段了呢？<br/><span class="red">胎儿发育过程图</span>', css: 're-gest'},
            evaluation: {html: '您的宝宝发育标准吗？<br/><span class="red">宝宝发育评测</span>', css: 're-eval'}
        },
        mapping = {
            foetusweight: ['evaluation', 'typeblist'],
            expect: ['forecast', 'gestation'],
            typebret: ['evaluation', 'foetusweight'],
            forecast: ['evaluation', 'gestation'],
            forecasttable: ['evaluation', 'gestation'],
            gestation: ['evaluation', 'foetusweight'],
            evalret: ['foetusweight', 'typeblist']
        }[currentPage],
        ret = [], key, item;
    for(var i = 0; i < mapping.length; i++){
        key = mapping[i];
        item = data[key];
        ret.push(Mustache.render(tmpl, {
            href: key + '.html?from=' + currentPage,
            css: item.css,
            html: item.html
        }));
    }
    exports.html = '<ul class="hyperlink">'+ ret.join('') +'</ul>';
});