define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        redirect = require('redirect').html,
        combobox = require('gestCombobox'),
        img = $('.gestation_main .image'),
        imgMark = $('.gestation_main .img-mark'),
        gestData = new Array(40);
    //image loading
    img.on('load', function(){imgMark.hide();});
    //
    var combox = combobox.getInstance('.gestation_main .gest-select', {
        data: gestData,
        onchange: function(index){
            var url = './images/gest/' + (index + 1) + '.png',
                msg = gestData[index];
            if(img.attr('src') === url){return;}
            imgMark.show();//显示mark层
            img.prop('src', url);
            $.Deferred(function(dtd){
                if(!msg){
                    require.async('data/gest' + index, function(exp){
                        gestData[index] = exp.gest;
                        dtd.resolve(exp.gest);
                    });
                }else{
                    dtd.resolve(msg);
                }
            }).then(function(msg){
                $('.gestation_main .gest-msg').html(msg.babyMsg);
                $('.gestation_main .mother-msg').html('<span class="red">妈妈的变化：</span>' + msg.motherMsg);
            });
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