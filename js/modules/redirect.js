define(function(require, exports, module){
    var currentPage = location.href.split('?')[0].match(/\/([^/]+)\.html$/i)[1],
        Mustache = require('mustache'),
        tmplLI = '<li {{&style}}><a class="{{css}}" href="{{href}}">{{font}}</a></li>',
        links = [
            {id: 'expect', alias: '', name: '预产期计算器', css: 're-expe'},
            {id: 'foetusweight', alias: '', name: '胎儿体重计算', css: 're-foet'},
            {id: 'typeblist', alias: 'typeblist,typebret', name: '解读B超单', css: 're-type'},
            {id: 'forecast', alias: '', name: '清宫表生男生女', css: 're-fore'}
            //{id: 'forecasttable', alias: '', name: '清宫图', css: 're-fore'}
        ],
        len = links.length,
        array = [], li1 = [], li2 = [], item, mod;
    for(var i = 0; i < len; i++){
        item = links[i];
        if(~(item.id + ',' + item.alias).indexOf(currentPage)){
            links.splice(i, 1);
            break;
        }
    }
    len = links.length;
    mod = len % 2 === 0 ? 3 : 2;
    for(var i = 0; i < len; i++){
        item = links[i];
        array = (li1.length - li2.length) <= 0 ? li1 : li2;
        array.push(Mustache.render(tmplLI, {
            style: len - i < mod ? 'style="border: none;"' : '',
            css: item.css,
            href: item.id + '.html?from=' + currentPage,
            font: item.name
        }));
    }
    exports.html = '<div class="redirect"><ul class="cols">'+ li1.join('') +'</ul><ul class="cols" style="border: none;">'+ li2.join('') +'</ul></div>';
});