let obj = {
    // 模板:'https://gitcode.net/qq_32394351/dr/-/raw/master/js/zyw.js',
    模板:'https://gitcode.net/qq_32394351/dr/-/raw/master/js/zyw.js',
};
ua = (typeof (ua) !== 'undefined' && ua) ? ua :'';
type = (typeof (type) !== 'undefined' && type) ? type :'';
jm = (typeof (jm) !== 'undefined' && jm) ? jm :'';
debug = (typeof (debug) !== 'undefined' && debug) ? debug :'';
timeout = (typeof (timeout) !== 'undefined' && timeout && !!Number(timeout)) ? timeout :'5000';
if(ua){
    Object.assign(obj,{ua:ua});
}
if(type){
    Object.assign(obj,{type:type});
}
if(jm){
    Object.assign(obj,{jm:jm});
}
if(debug){
    Object.assign(obj,{debug:true});
}
Object.assign(obj,{timeout:parseInt(timeout)});
initConfig(obj);
