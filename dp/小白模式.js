js:
    setPageTitle('道长给小白的关爱');
const {color, small,api} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
let fileRoot = api.host+'/hikerule/zyw_data/';
// log(fileRoot);
let d = [];
var themeRoute = "hiker://files/cache/MyTheme.json";
var themeOnline = fileRoot+'11';
var oldRoute = "hiker://files/cache/MyParseSet.json";
var oldOnline = fileRoot+'12';
var newRoute = "hiker://files/rules/DuanNian/MyParse.json";
var newOnline = fileRoot+'13';
var jxsRoute = "hiker://files/cache/MyJiexi.json";
var jxOnline = fileRoot+'14';
var dmOnline = fileRoot+'30';
var cjcache = 'hiker://files/cache/Parse_Dn.js';
var x5cache = 'hiker://files/cache/Parse_Dn.html';
var dmPath = "hiker://files/cache/diaomao.txt";
d.push({
    title:small('你好,小白,即使啥也不会,也可以看明白下面的字吧?'),
    desc:'如果还是不会,请删以永治,告辞不谢',
    col_type:'text_1',
    url:$('#noLoading#').lazyRule(()=>{
        return 'toast://据说你不服气,不承认自己是小白?\n点我只是为了宣泄一下你的愤怒?啥也别说了,下去搞!'
    })
});
d.push({
    title:small('批量管理界面文件是什么?')+color('不知道,来一份道长的','#5FB878'),
    desc:'自动拉取道长的批量管理界面文件，可批量删除和导出解析',
    col_type:'text_1',
    url:$('确认吗？').confirm(()=>{
        let localHtml = 'hiker://files/cache/plscParse.html';
        writeFile(localHtml,request('https://gitcode.net/qq_32394351/dr/-/raw/master/dp/batch_delete.html'));
        return 'toast://拉取完毕,可返回查看批量管理操作是否正常'
    })
});
d.push({
    title:small('单项解析选择界面主题是什么?')+color('不知道,来一份道长的','#5FB878'),
    desc:'自动拉取道长的主题配置以及网页插件和静态页面',
    col_type:'text_1',
    url:$('确认吗?如果你不是小白，总该会提前备份自己主题的吧!\n'+themeRoute).confirm((cjcache,x5cache,themeRoute,themeOnline)=>{
        let themeCode = fetch(themeOnline);
        if(!/now_theme/.test(themeCode)){
            log(themeCode);
            return 'toast://失败!与道长服务器通讯错误,估计是网络卡了'
        }
        let cjFrom = "hiker://page/Parse_Dn.js?rule=MyFieldᴰⁿ";
        let x5From = "hiker://page/Parse_Dn.html?rule=MyFieldᴰⁿ";
        try {
            let cjFile = JSON.parse(fetch(cjFrom)).rule;
            let x5File = JSON.parse(fetch(x5From)).rule;
            writeFile(cjcache, cjFile);
            writeFile(x5cache, x5File);
            writeFile(themeRoute, themeCode);
            clearVar("jxOldV");
            clearVar("jxNewV");
            refreshPage(false);
            return 'toast://主题已成功应用'
        }
        catch(e){
            return 'toast://主题应用失败\n未期望的错误:'+e.message;
        }
    },cjcache,x5cache,themeRoute,themeOnline)
});
d.push({
    title:small('断插解析及默认列表是什么?')+color('不知道,来一份道长的','#5FB878'),
    desc:'自动拉取道长在用的两个MyParse.json文件',
    col_type:'text_1',
    url:$('确认吗?如果你不是小白，总该会提前备份自己的配置文件吧!\n'+oldRoute+'\n'+newRoute).confirm((oldRoute,oldOnline,newRoute,newOnline)=>{
        let oldCode = fetch(oldOnline);
        let newCode = fetch(newOnline);
        if(!/Parse_Dn\.js/.test(oldCode)||!/Parse_Dn\.js/.test(newCode)){
            return 'toast://失败!与道长服务器通讯错误,估计是网络卡了'
        }
        try {
            writeFile(oldRoute, oldCode);
            writeFile(newRoute, newCode);
            return 'toast://断插解析配置及默认列表已经配置成功'
        }
        catch(e){
            return 'toast://配置应用失败\n未期望的错误:'+e.message;
        }
    },oldRoute,oldOnline,newRoute,newOnline)
});
d.push({
    title:small('断插解析自动档模式是什么?')+color('不知道,来一份道长的','#5FB878'),
    desc:'自动拉取道长在用的MyJiexi.json文件',
    col_type:'text_1',
    url:$('确认吗?如果你不是小白，总该会提前备份自己的自动档方案吧!\n'+jxsRoute).confirm((jxsRoute,jxOnline)=>{
        let jxCode = fetch(jxOnline);
        if(!/jiexis/.test(jxCode)){
            return 'toast://失败!与道长服务器通讯错误,估计是网络卡了'
        }
        try {
            writeFile(jxsRoute, jxCode);
            return 'toast://断插解析配置及默认列表已经配置成功'
        }
        catch(e){
            return 'toast://自动档应用失败\n未期望的错误:'+e.message;
        }
    },jxsRoute,jxOnline)
});
d.push({
    title:small('吊毛过滤文件是什么?')+color('不知道,来一份道长的','#5FB878'),
    desc:'自动拉取道长在用的diaomao.txt文件',
    col_type:'text_1',
    url:$('确认吗?如果你不是小白，总该会提前备份自己的吊毛过滤文件吧!\n'+dmPath).confirm((dmPath,dmOnline)=>{
        let dmCode = fetch(dmOnline);
        if(!dmCode||!/mp4|m3u8/.test(dmCode)){
            return 'toast://失败!与道长服务器通讯错误,估计是网络卡了'
        }
        try {
            writeFile(dmPath, dmCode);
            return 'toast://吊毛过滤文件已配置成功'
        }
        catch(e){
            return 'toast://吊毛过滤文件应用失败\n未期望的错误:'+e.message;
        }
    },dmPath,dmOnline)
});
d.push({
    title:small('真的啥也不会了,还懒得一个个点?')+color('不知道,来一份道长的','#5FB878'),
    desc:'自动拉取道长在用的上述所有文件\n一键搞完直接去支持断插的小程序看视频就行啦',
    col_type:'text_1',
    url:$('修仙法力无边','确认吗?如果你不是小白，总该会提前备份自己的上述所有文件吧!\n请输入道长修仙法力无边来确认执行此操作').input((cjcache,x5cache,themeRoute,oldRoute,newRoute,jxsRoute,themeOnline,oldOnline,newOnline,jxOnline,dmPath,dmOnline)=>{
        if(input!=='道长修仙法力无边'){
            return 'toast://本次取消执行'
        }
        let themeCode = fetch(themeOnline);
        if(!/now_theme/.test(themeCode)){
            log('themeCode:'+themeCode);
            return 'toast://拉主题失败!与道长服务器通讯错误,估计是网络卡了'
        }
        let cjFrom = "hiker://page/Parse_Dn.js?rule=MyFieldᴰⁿ";
        let x5From = "hiker://page/Parse_Dn.html?rule=MyFieldᴰⁿ";
        let cjFile = JSON.parse(fetch(cjFrom)).rule;
        let x5File = JSON.parse(fetch(x5From)).rule;
        let oldCode = fetch(oldOnline);
        let newCode = fetch(newOnline);
        let dmCode = fetch(dmOnline);
        if(!/Parse_Dn\.js/.test(oldCode)||!/Parse_Dn\.js/.test(newCode)){
            // log('oldCode:'+oldCode);
            // log('newCode:'+newCode);
            return 'toast://失败!与道长服务器通讯错误,估计是网络卡了'
        }
        let jxCode = fetch(jxOnline);
        if(!/jiexis/.test(jxCode)){
            // log('jxCode:'+jxCode);
            return 'toast://失败!与道长服务器通讯错误,估计是网络卡了'
        }
        try {
            writeFile(cjcache, cjFile); // 拉插件
            writeFile(x5cache, x5File); //拉网页文件
            writeFile(themeRoute, themeCode); //拉主题文件
            clearVar("jxOldV");
            clearVar("jxNewV");
            writeFile(oldRoute, oldCode); //拉断插默认选择界面的配置
            writeFile(newRoute, newCode); //拉断插内的解析
            writeFile(jxsRoute, jxCode); // 拉自动档文件
            if(dmCode&&/mp4|m3u8/.test(dmCode)) {//验证吊毛文件合法性
                writeFile(dmPath, dmCode); // 拉吊毛过滤文件
            }
            back(true);
            return 'toast://断插解析配置及默认列表已经配置成功'
        }
        catch(e){
            return 'toast://一键模式应用失败\n未期望的错误:'+e.message;
        }
    },cjcache,x5cache,themeRoute,oldRoute,newRoute,jxsRoute,themeOnline,oldOnline,newOnline,jxOnline,dmPath,dmOnline)
});
let descInfo = '主题文件:'+themeRoute+'\n主界面配置:'+oldRoute+'\n嫖到的解析:'+newRoute+'\n自动档解析:'+jxsRoute;
descInfo+='\n主插件:'+cjcache+'\n主配置选择界面文件:'+x5cache+'\n吊毛过滤文件:'+dmPath;
d.push({
    title:'文件描述:\n'+descInfo,
    col_type:'long_text',
    extra:{textSize: 13,lineVisible:false}
});
setResult(d);