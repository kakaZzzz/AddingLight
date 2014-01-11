void function(){
    var output = '../js/modules/data',
        util = require('util'),
        path = require('path'),
        fs = require('fs');

    //create dataList start
    var strArray = fs.readFileSync('./dataList.txt', {encoding: 'UTF-8'}).split(/\r?\n/),
        tmpl = '{name: "%s", en: "%s", alias: "%s", dis: %s, ref: "%s", pic: "%s"}',
        code = [],
        disMapping = {'28': 28, '29': 28,'30': 28,'31': 28,'32': 28,'33': 28,'34': 28,'35': 28,'36': 28,'37': 28,'38': 28,'39': 28,'40': 28,'41': 28,'42': 28,'43': 28},
        refMapping = {7: 'BPD', 8: 'HC', 9: 'AC', 10: 'FL', 13: 'TCD'},
        picMapping = {6: 'data-crl.png', 7: 'data-bpd.png', 8: 'data-hc.png', 9: 'data-ac.png', 10: 'data-fl.png', 12: 'data-ofd.png', 14: 'data-fhj.png'},
        count = 0,
        disValue;
    strArray.forEach(function(item, index){
        item = item.split(/\t/);
        if(disMapping[index]){
            disValue = disMapping[index];
            count >= disValue && (count = disValue + 1);
        }else{
            disValue = count++;
        }
        code.push(util.format(tmpl, item[0], item[1] || '', item[2] || '', disValue, refMapping[index] || '', picMapping[index] || ''));
    });
    fs.writeFileSync(path.join(output, 'dataList.js'), util.format('define(function(require, exports, modules){\nexports.dataList = [%s];\n});', code.join(',\n')));
    //create dataList end

    //create discription start
    strArray = fs.readFileSync('./dis.txt', {encoding: 'UTF-8'}).split(/\r?\n/);
    tmpl = 'define(function(require, exports, modules){\n    exports.dis = \'%s\';\n});';
    strArray.forEach(function(item, index){
        fs.writeFileSync(path.join(output, 'discription' + index + '.js'), util.format(tmpl, item));
    });
    //create discription end

    //create rrs start
    var fileName, rrs;
    tmpl = 'define(function(require, exports, modules){\n    exports.rrs = %s;\n});';
    for(var i = 0; i < 5; i++){
        strArray = fs.readFileSync('./rrs'+ i +'.txt', {encoding: 'UTF-8'}).split(/\r?\n/);
        fileName = 'rrs-' + strArray.shift().split(/\t+/)[1] + '.js';
        rrs = {
            captain: [],
            rows: []
        };
        rrs.captain = strArray.shift().split(/\t+/);
        rrs.captain.forEach(function(item, index){
            rrs.captain[index] = item.replace('（单位：cm）', '<br/>（单位：cm）');//单位换行
        });
        strArray.forEach(function(item, index){
            item = item.split(/[\s\t]+/);
            item[0] = item[0].match(/\d+/);//孕X周只取出数字
            rrs.rows.push(item);
        });
        fs.writeFileSync(path.join(output, fileName), util.format(tmpl, JSON.stringify(rrs)));
    }
    /*
    captain: []
    rows: [[], []]
    */
    //create rrs end
}();