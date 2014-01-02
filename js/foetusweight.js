define(function(require, exports, module){
    var rNum = /^\d+(\.\d+)?/;
    $('.foetusweight_main .content input').keyup(function(evt){
        if(!evt.target.value || evt.keyCode !== 13){return};
        var index = evt.target.tabIndex;
        
//        if(evt.target.tabIndex === 3){
//            evt.target.blur();
//            $('.foetusweight_main .count').trigger('click');
//        }else{
//            $('.foetusweight_main .content input').get(index).focus();
//        }
    });
   
   $('.foetusweight_main .count').click(function(evt){
        var bpd = $('#BPD'),//双顶径
            ac = $('#AC'),//腹围
            fl = $('#FL'),//股骨长
            ret = 0, jin, lian;
        if(!rNum.test(bpd.val())){
            alert('双顶径请填入合适的数值！');
            bpd.focus();
            return;
        }
        if(!rNum.test(ac.val())){
            alert('腹围请填入合适的数值！');
            ac.focus();
            return;
        }
        if(!rNum.test(fl.val())){
            alert('股骨长请填入合适的数值！');
            fl.focus();
            return;
        }
        bpd = parseFloat(bpd.val());
        ac = parseFloat(ac.val());
        fl = parseFloat(fl.val());
        //1.07*BDP*BDP*BDP+0.3*AC*AC*FL
        ret = 1.07 * bpd * bpd * bpd + .3 * ac * ac * fl;
        jin = Math.floor(ret * 0.002);
        lian = Math.round((ret * 0.002 - jin) * 10);
        var Mustache = require('mustache'),
            tmpl = '您宝宝的体重是：<span class="red">{{weight}}</span>（{{jin}}{{liang}}）<br/>以上结果仅供参考。';
        $('.foetusweight_main .ret').html(Mustache.render(tmpl, {
            weight: ret.toFixed(2) + '克',
            jin: jin ? jin + '斤' : '',
            liang: lian ? lian + '两' : ''
        }));
    });
});