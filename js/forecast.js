define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        lunar = require('lunar'),
        forecastList = require('data/forecastList').table.rows,
        popup = require('popup'),
        redirect = require('redirect').html,
        Mustache = require('mustache'),
        tmpl = $('#forecast-dialog-content').html();
    //util
    function getLunarDate(dateStr, isSolar){
        var date = new Date(Date.parse(dateStr)),
            lunarDate = isSolar ? lunar.getLunarDate(date) : {};
        return {
            year: lunarDate.year || date.getFullYear(),
            month: lunarDate.month || date.getMonth() + 1
        }
    }
    function getBabySex(age, month){
        var row = forecastList[age - 18];
        if(!row || month < 1 || month > 12){return;}
        return row[month];
    }
    function getMonthString(month){
        var m = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return m[month - 1];
    }
    //radio
    $('.date-type input[type=radio]').change(function(evt){
        var name = this.name;
        $('.date-type input[name='+ name +']').removeClass('radio-checked');
        $(this).addClass('radio-checked');
    });
    //submit
    $('#myform').submit(function(evt){
        evt.preventDefault();
        var birthday = $('#myform input[name=birthday]'),
            ovulation = $('#myform input[name=ovulation]'),
            ageRange = [parseInt(forecastList[0][0]), forecastList.length - 1 + parseInt(forecastList[0][0])],
            sex, age, month;
        if(!ovulation.get(0).checkValidity()){
            alert('请选择您的排卵日！');
            return;
        }
        birthday = getLunarDate(new Date(Date.parse(birthday.val() || '1980-01-01')), $('#solar1').prop('checked'));
        ovulation = getLunarDate(new Date(Date.parse(ovulation.val())), $('#solar2').prop('checked'));
        age = parseInt(ovulation.year - birthday.year) + 1;
        if(age < ageRange[0] || age > ageRange[1]){
            alert('您的虚岁是' + age + '岁，请确认你是在' + ageRange.join('-') + '岁之间！');
            return;
        }
        month = parseInt(ovulation.month);
        sex = getBabySex(age, month);
        //
        po.content(Mustache.render(tmpl, {
            age: age,
            month: getMonthString(month),
            sex: sex === 'b' ? '男' : '女',
            'class': 'baby' + (sex === 'g' ? ' girl' : ''),
            redirect: redirect
        }));
        po.show();
    });

    $('.content a.view').click(function(evt){
        $('#myform').submit();
    });
    //popup
    var po = popup.getInstance();
        po.prefix('forecast-dialog');
});