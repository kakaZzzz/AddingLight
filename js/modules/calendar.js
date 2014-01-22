define(function(require, exports, module){
    var util = require('util').util,
        $ = require('../libs/zepto.min'),
        Mustache = require('mustache'),
        tmpl = '<table class="os-calendar"><caption>{{year}}年</caption><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>{{&tbody0}}{{&tbody1}}</table>';

    function c(options){}
    util.defineProperties(c.prototype, {
        getHTMLString: function(mensDate, dateMapping){
            var me = this,
                date = mensDate || new Date(),
                feature = new Date(date.getFullYear(), date.getMonth() + 1, 1),
                year = date.getFullYear(),
                month = date.getMonth() + 1;
            return Mustache.render(tmpl, {
                year: year + (month === 12 ? ' - ' + (year + 1) : ''),
                tbody0: '<tbody>' + me.getDateList(date, dateMapping) + '</tbody>',
                tbody1: '<tbody>' + me.getDateList(feature, dateMapping) + '</tbody>'
            });
        },

        getDateList: function(date, dateMapping){
            var me = this,
                html = ['<tr><td class="month" colspan="7">', date.getMonth() + 1,'月</td></tr>'],
                first = new Date(date.getFullYear(), date.getMonth(), 1),
                lastDay = me.getMonthLastDay(date).getDate(),
                weekDay = first.getDay(),
                len = Math.ceil((lastDay + weekDay) / 7),
                day;
            dateMapping = dateMapping || {};
            for(var i = 0; i < len; i++){
                html.push('<tr>');
                for(var j = 0; j < 7; j++){
                    day = i * 7 + j - weekDay + 1;
                    html.push('<td>', day > 0 && day <= lastDay ? '<div class="'+ (dateMapping[util.date.format(date, 'yyyy-M-') + day] || '') +'">' + day + '</div>' : '&nbsp;','</td>');
                }
                html.push('</tr>');
            }
            return html.join('');
        },

        getMonthLastDay: function(date){
            var day = 24 * 60 * 60 * 1000,//一天的毫秒数
                dateTime = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - day;
            return new Date(dateTime);
        }
    });



    exports.getInstance = function(options){
        return new c(options);
    }
});