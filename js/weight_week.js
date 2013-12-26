define(function(require, exports, module){
    var section = require('section').getInstance(),
        ul = $('<ul></ul>')
        .appendTo('.weight_week_main')
        .delegate('li a', 'click', function(evt){
            var index = $('.weight_week_main ul li a').index(this);
            if(section){
                section.backward('weight');
            }else{
                location.href = 'weight.html';
            }
       });
    for(var i = 0; i < 40; i++){
        var x = $('<li><a href="#weight">孕' + (i + 1) + '周</li>').appendTo(ul);
    }
    
    $((section ? '#page_weight_week ' : '') + 'a.header_back').click(function(){
        var sectionId = this.href.split('#')[1];
        if(section){
            section.backward(sectionId);
        }else{
            location.href = './' + sectionId + '.html';
        }
    });
});