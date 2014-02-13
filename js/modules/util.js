define(function(require, exports, module){
    var elem = $('<a href=""></a>');
    exports.util = {
        defineProperties: function(obj, methods, options){
            var c = {}, item;
            for(var i in methods){
                item = c[i] = {value: methods[i]};
                if(options){
                    for(var j in options[i]){
                        item[j] = options[i][j];
                    }
                }
            }
            Object.defineProperties(obj, c);
        },

        parseQueryString: function(queryString){
            if(!queryString){return {};}
            queryString = queryString.replace(/^\?/, '');
            var ret = {},
                array = queryString.split('&'),
                len = array.length, item;
            for(var i = 0; i < len; i++){
                item = array[i].split('=');
                ret[item[0]] = item[1];
            }
            return ret;
        },

        date: {
            format: function(source, pattern){
                var o = { 
                    'M+': source.getMonth() + 1, //month 
                    'd+': source.getDate(), //day 
                    'h+': source.getHours(), //hour 
                    'm+': source.getMinutes(), //minute 
                    's+': source.getSeconds(), //second 
                    'q+': Math.floor((source.getMonth() + 3)/3), //quarter 
                    'S': source.getMilliseconds() //millisecond 
                }
                if(/(y+)/.test(pattern)) { 
                    pattern = pattern.replace(RegExp.$1, (source.getFullYear()+"").substr(4 - RegExp.$1.length)); 
                } 
                
                for(var k in o) {
                    if(new RegExp('('+ k +')').test(pattern)) { 
                        pattern = pattern.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)); 
                    } 
                } 
                return pattern;
            }
        },
        
        getFullPath: function(url){
            elem.prop('href', url);
            return elem.prop('href');
        },
        
        parser: {
            getLinks: function(str){
                var regexp = /<link[^>]+href=['"]([^'"]+)['"][^>]*\/>/gi;
                    ret = [];
                str.replace(regexp, function(mc, url){
                    ret.push(url);
                });
                return ret;
            },
            
            getScripts: function(str){
                var regexp1 = /<script[^>]+src=['"]([^'"]+)['"][^>]*>\s*<\/script>/gi,//查src
                    regexp2 = /<script[^>]*>([\s\S]+?)<\/script>/gi,//查<script>
                    ret = {src: [], tag: []};
                str.replace(regexp1, function(mc, url){
                    ret.src.push(url);
                    return '';
                }).replace(regexp2, function(mc, txt){
                    ret.tag.push(txt);
                });
                return ret;
            },
            
            getStyles: function(str){
                var regexp = /<style>/gi;
            },
            
            getBody: function(str){
                return str.match(/<body[^>]*>([\s\S]+?)<\/body>/i)[1];
            }
        }
    };
});