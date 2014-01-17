define(function(require, exports, module){
    var currentPage = location.href.split('?')[0].match(/\/([^/]+)\.html$/i)[1],
        Mustache = require('mustache'),
        tmplLINK = '<li {{&style}}><a class="{{css}}" href="{{href}}">{{font}}</a></li>',
        html = [],
        links = [
            {id: 'expect', alias: '', name: '预产期计算器', css: 're-expe'},
            {id: 'foetusweight', alias: '', name: '胎儿体重计算', css: 're-foet'},
            {id: 'typeblist', alias: 'typeblist,typebret', name: '解读B超单', css: 're-type'},
            {id: 'forecast', alias: '', name: '清宫表生男生女', css: 're-fore'},
            {id: 'forecasttable', alias: '', name: '清宫图', css: 're-fore'}
        ],
        mod = Math.ceil((links.length - 1) / 2),
        index = 1, len = links.length, item, isMod;

    for(var i = 0; i < len; i++){
        item = links[i];
        if(item.id === currentPage || ~item.alias.indexOf(currentPage)){continue;}
        isMod = index % mod === 0;
        html.push(Mustache.render(tmplLINK, {
            style: isMod ? 'style="border: none"' : '',
            css: item.css,
            href: item.id + '.html?from=' + currentPage,
            font: item.name
        }), (isMod && i < len - 1) ? '</ul><ul class="cols" style="border: none;">' : '');
        index++;
    }
    exports.html = '<div class="redirect"><ul class="cols">'+ html.join('') +'</ul></div>';
});