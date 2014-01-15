define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        gmu = require('dialog').gmu,
        Mustache = require('mustache'),
        tmpl = $('#forecast-dialog-content').html();
    $('.date-type input[type=radio]').change(function(evt){
        var name = this.name;
        $('.date-type input[name='+ name +']').removeClass('radio-checked');
        $(this).addClass('radio-checked');
    });

    $('.content a.view').click(function(evt){
        dialog.content(Mustache.render(tmpl, {
            age: '25',
            date: '阴历 七月',
            sex: '男',
            'class': 'baby girl'
        }));
        dialog.open();
    });

    var dialog = new gmu.Dialog('#forecast-dialog', {
        autoOpen: false,
        closeBtn: false,
        width: '100%',
        buttons: {
            '知道了': function(){
                this.close();
            }
        }
    });
    dialog._options['_wrap'].addClass('forecast_dialog');
});