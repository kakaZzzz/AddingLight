define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        forecastList = require('data/forecastList').table,
        html = [];
    //create forecast table
    html.push('<div class="table-head"><ul class="table-captain"><li class="column">', forecastList.captain.join('</li><li>'), '</li></ul></div>');
    html.push('<div class="table-body"><div class="iscroll">');
    $.each(forecastList.rows, function(index, item){
        html.push('<ul class="table-row"><li class="column">', item[0], '</li>');
        html.push(item.join('"></li><li class="sex ').replace(item[0] + '"></li>', ''), '"></li></ul>');

    });
    html.push('</div></div>');
    $('.forecasttable_main div.table').html(html.join(''));
});