define(function(require, exports, module){
    var dataList = require('data/dataList').dataMapping,
        util = require('util').util,
        data = [];
    
    $.each(dataList, function(key, item){
        data.push(item.name + ' ' +item.alias + ' ' + item.en);
    });
    function c(elem){
        var me = this;
        me._input = elem;
        me._timeout = null;
        me._keyword = null;
        elem.suggestion({
            listCount: 50,
            sendrequest: function(e, keyword, render, cacheData){
                e.preventDefault();
                clearTimeout(me._timeout);
                me._timeout = setTimeout(function(){
                    var array = me.getSugList(keyword),
                        data = [];
                    if(!array || !array.length || me._keyword === keyword){return;}
                    $.each(array, function(index, item){
                        data.push(item.text);
                    });
                    render(keyword.toUpperCase(), data);
                    cacheData(keyword, data);
                }, 500);
            }
        });
    }
    util.defineProperties(c.prototype, {
        getSugList: function(keyword){
            if(!keyword){return;}
            var me = this,
                keyList = keyword.split(/\s+/),
                len = keyList.length,
                ret = [];
            me._keyword = keyword;
            for(var i = 0; i < len; i++){
                ret = ret.concat(me._indexOf(keyList[i]));
                if(ret.length > 0){break;}
            }
            return ret;
        },
        
        search: function(keyword, callback){
            var me = this,
                sugList = me.getSugList(keyword),
                data = sugList && dataList[sugList[0].pk];
            callback = callback || function(){};
            if(!data){return callback(data); return;}
            if(typeof data.dis === 'number'){
                require.async('data/discription' + data.dis, function(c){
                    c && (data.dis = c.dis)
                    data.dis = c.dis;
                    callback(data);
                });
            }else{
                callback(data);
            }
        },
        
        _indexOf: function(keyword){
            var me = this,
                key = keyword.toUpperCase(),
                ret = [];
            $.each(data, function(index, item){
                if(~item.indexOf(key)){
                    ret.push({pk: index, text: item});
                }
            });
            return ret;
        }
    });
    exports.getInstance = function(inputId){
        return new c(inputId);
    }
});