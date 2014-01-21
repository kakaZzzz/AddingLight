define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        redirect = require('redirect').html,
        combobox = require('gestCombobox');
    //
    var combox = combobox.getInstance('.gestation_main .gest-select', {
        onchange: function(index, msg){
            $('.gestation_main .gest-img').css('backgroundImage', 'url(./images/gest/'+ (index + 1) +'.png)');
            $('.gestation_main .gest-msg').html(msg);
        }
    });
    $('.gestation_main .gest-content > a').on('tap', function(evt){
        combox[this.className]();
    });
    //redirect
    $('.gestation_main').append(redirect + '<br/><br/>');
    //旋屏调整高度
    function orientHandler(){
        var c = $('.gestation_main .gest-img');
        c.css('height', c.width() + 'px');
    }
    $(window).on('orientationchange', orientHandler);
    orientHandler();
});