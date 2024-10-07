var updateT = '2022/11/11 22:50';
var 更新依赖 = function (){
    let jsRoot = 'https://gitcode.net/qq_32394351/dr/-/raw/master/js/';
    let jss = ['自动模板匹配.js','categories-header.js',
        'houseLazy.js','hikerUi.js','dr.js'].map(it=>jsRoot+it);
    let libs = [
        config.UrlProcessorLib,version.requireId,
        'http://hiker.nokia.press/hikerule/rulelist.json?id=2971',
    ];
    libs = libs.concat(jss);
    for(let lib of libs){
        deleteCache(lib);
    }
    log('已清除依赖:'+libs.join(','));
}