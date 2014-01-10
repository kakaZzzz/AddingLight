define(function(require, exports, module){
    var dataList = require('data/dataList').dataMapping,
        util = require('util').util;

    function c(elem){
        var me = this;
        me._input = elem;
        me._timeout = null;
        me._keyword = null;
        me._suggestion = new gmu.Suggestion(elem, {
            listCount: 50,
            sendrequest: function(e, keyword, render, cacheData){
                e.preventDefault();
                clearTimeout(me._timeout);
                me._timeout = setTimeout(function(){
                    var array = me.getSugList(keyword),
                        data = [];
                    if(!array || !array.length){return;}
                    $.each(array, function(index, item){
                        data.push(item.name + ' ' + item.en);
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
                data = sugList && sugList[0];
            callback = callback || function(){};
            if(!data){callback(data); return;}
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
            $.each(dataList, function(index, item){
                if(~(item.name + ',' + item.alias + ',' + item.en).indexOf(key)){
                    ret.push(item);
                }
            });
            return ret;
        },

        getSuggestion: function(){
            return this._suggestion;
        }
    });
    exports.getInstance = function(inputId){
        return new c(inputId);
    }
});