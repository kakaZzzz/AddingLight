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