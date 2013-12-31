define(function(require, exports, module){
    $('.foetusweight_main .count').click(function(evt){
        var bpd = $('#BPD'),//双顶径
            ac = $('#AC'),//腹围
            fl = $('#FL'),//股骨长
            ret = 0;
        if(!bpd.get(0).checkValidity()){
            alert('双顶径请填入合适的数值！');
            bpd.focus();
            return;
        }
        if(!ac.get(0).checkValidity()){
            alert('腹围请填入合适的数值！');
            ac.focus();
            return;
        }
        if(!fl.get(0).checkValidity()){
            alert('股骨长请填入合适的数值！');
            fl.focus();
            return;
        }
        bpd = parseFloat(bpd.val());
        ac = parseFloat(ac.val());
        fl = parseFloat(fl.val());
        //1.07*BDP*BDP*BDP+0.3*AC*AC*FL
        ret = 1.07 * bpd * bpd * bpd + .3 * ac * ac * fl;
        var Mustache = require('mustache'),
            tmpl = '您宝宝的体重是：<span class="red">{{weight}}</span><br/>以上结果仅供参考。';
        $('.foetusweight_main .ret').html(Mustache.render(tmpl, {weight: ret.toFixed(2) + 'g'}));
    });
});