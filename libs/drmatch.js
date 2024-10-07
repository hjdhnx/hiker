var 一级定位模板 = [];
var 二级定位模板 = [];
var 搜索定位模板 = [];
var root = 'hiker://files/rules/dzHouse/json/'; //模板根目录
function mubans_init(){//初始化模板
    let api = 'http://hiker.nokia.press/hikerule/rulelist.json?id=';
    let mubans = {
        一级模板:api+'4551',
        二级模板:api+'4552',
        搜索模板:api+'4553',
    };
    requireDownload(mubans.一级模板, `${root}一级模板.json`);
    requireDownload(mubans.二级模板, `${root}二级模板.json`);
    requireDownload(mubans.搜索模板, `${root}搜索模板.json`);
}

mubans_init();
require(config.模板);//超级牛逼，只要使用自动匹配模板初始化就自动依赖dr模板

function mubans(inner,local){//模板合并 代码内置模板与本地文件模板
    // local: 一级模板,二级模板,搜索模板
    // writeFile(root+local+'.json',JSON.stringify(inner));
    // return inner

    let code = fetch(root+local+'.json');
    try {
        let localYj = JSON.parse(code);
        // let localYj = eval(fetch(root+local+'.json'));
        let newMb = [];
        if(Array.isArray(localYj)&&localYj.length>0){
            for(let it of localYj){
                let idex = inner.findIndex(x=>x.名称===it.名称);
                if(idex>-1){
                    inner[idex] = it
                }else{
                    newMb.push(it)
                }
            }
            inner = inner.concat(newMb)
        }
        return  inner
    }catch (e) {
        log(`本地${local}:${root+local+'.json'}有误:`+e.message);
        log(code);
        return inner
    }
}
一级定位模板.push({
    名称:'阿房影视',
    自动初始分类:true,
    初始分类链接定位:'.myui-header__menu&&li,1&&a&&href',
    初始分类链接处理:((u)=>{
        return u.replace(/\/type\/(.*?)\//,'/show/$1--------1---');
    }).toString(),
    解析:'.myui-vodlist&&li;.lazyload&&title;.lazyload&&data-original;.lazyload&&Text;.lazyload&&href',
    动态分类列表:[{
        一级分类: 'body&&ul.myui-header__menu',
        子分类: 'body&&li.hidden-sm:gt(0):lt(5)',
    }, {
        一级分类: 'body&&.myui-screen__list',
        子分类: 'ul&&li:has(a[href]):not(:matches(^$))',
    }
    ],
    一级处理:{},
    关闭折叠:false,
    设置倒放:false,
    是否有二级:true,
    免责:false,
});
一级定位模板=mubans(一级定位模板,'一级模板');
二级定位模板 = [{
    解析:{
        title:'.title&&Text;.data,3&&Text;.data,7&&Text',
        img:'.lazyload&&data-original',
        url:'.lazyload&&data-originalurl&&a&&href',
        desc:'.data&&Text;.data,6&&Text',
        content:'p.detail&&Text.js:input.replace("简介：","").replace("详情","")',
        tabs:'.nav-tabs&&li',
        lists:'body&&.stui-content__playlist,#id&&li',
        tab_id:'',
    }, 名称:'蓝莓影视', 免嗅:false, 需要魔断:false,动态最新章节:true,二级处理:{},
},
    {
        解析:{
            title:'h1.title&&Text;p.data,1&&Text',
            img:'.lazyload&&data-original',
            desc:'span.sketch.content&&Text',
            tabs:'.nav-tabs&&li',
            lists:'.tab-content&&div,#id&&ul&&li',
        }, 名称:'极品影视', 免嗅:false, 需要魔断:false,动态最新章节:true,
    },
    {
        解析:{
            title:'h1&&Text;.module-info-tag&&Text',
            img:'.lazyload&&data-original',
            desc:'.module-info-introduction-content&&Text',
            tabs:'body&&.module-tab-item',
            lists:'body&&.module-play-list,#id&&a',
        }, 名称:'极客影视', 免嗅:false, 需要魔断:false,动态最新章节:true,
    },
    {
        解析:{
            title:'h1.title&&Text;.data,1&&Text;#rating&&.branch&&Text',
            img:'.myui-content__thumb&&a&&img&&data-original',
            url:'.myui-content__thumb&&a&&href',
            desc:'.data,2&&Text;.data,3&&Text',
            content:'#desc&&span.data&&Text',
            tabs:'ul.nav-tabs&&li',
            lists:'.tab-content&&#id&&li',
            tab_id:'a&&href'
        }, 名称:'阿房影视', 免嗅:false, 需要魔断:false,动态最新章节:true,
    }
];
二级定位模板=mubans(二级定位模板,'二级模板');
搜索定位模板 = [{
    解析:'.stui-vodlist&&li;a&&title;.stui-vodlist__thumb&&data-original;.pic-text&&Text;a&&href;.stui-vodlist__item&&Text',
    名称:'蓝莓影视',
    一级处理:{},
    是否有二级:true,
    免责:false,
},{
    解析:'.myui-vodlist__media#searchList&&li;a&&title;a&&data-original;.pic_text&&Text;a&&href;p,3&&Text',
    名称:'极品影视',
    是否有二级:true,
    免责:false,
},
    {
        解析:'body&&.module-item;.module-card-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href;.module-info-item-content&&Text',
        名称:'极客影视',
        是否有二级:true,
        免责:false,
    }
];
搜索定位模板=mubans(搜索定位模板,'搜索模板');
var 自动一级分类 = function (){
    依赖检测();//一级界面检测依赖
    MY_URL=MY_URL.replace("hiker://empty##","").split('#')[0];
    var 规则处理=typeof(一级处理)!=='undefined';
    var page = MY_PAGE;
    var 匹配成功 = false;
    for(let i in 一级定位模板){
        let it = 一级定位模板[i];
        let parStr = it.解析;
        if(!规则处理){//规则没写处理
            if(it.一级处理&&typeof(it.一级处理)=='string'){//模板传了第二优先
                一级处理 = eval(it.一级处理);
            }else{//规则未写且模板未传
                一级处理 = {};
            }
        }
        try {
            if(it.自动初始分类) {
                if(typeof(it.初始分类链接处理)==='string'&&/return/.test(it.初始分类链接处理)){
                    it.初始分类链接处理 = eval(it.初始分类链接处理);
                }
                初始分类页(it.初始分类链接定位, it.初始分类链接处理);
            }
            true_url = 获取正确链接();
            var html = 获取源码(true_url);
            let cates = 打造动态分类(it.动态分类列表,{源码:html,关闭折叠:it.关闭折叠});
            设置(cates, it.设置倒放);
            一级(parStr, it.是否有二级, cates, it.免责, html);
            if(parseInt(page)===1){
                log('一级匹配成功,第'+i+'个模板:【'+it.名称+'】');
            }
            匹配成功 = true;
            break;
        }catch (e) {
            log('一级模板【'+it.名称+'】匹配失败,尝试下一个模板\n'+e.message)
        }
    }
    if(!匹配成功){
        throw new Error("全部已有一级模板匹配失败,请扩充模板库");
    }
}

var 自动一级 = function (success_flag,cates,html,test_mode){//不带分类的一级
    success_flag = success_flag||'html';//默认不传就是html，意思是只要源码含有Html标签都算是对的
    test_mode = test_mode||false; //测试模式
    依赖检测();//一级界面检测依赖
    MY_URL=MY_URL.replace("hiker://empty##","").split('#')[0];
    var 规则处理=typeof(一级处理)!=='undefined';
    if(!html){
        log('首页链接:'+MY_URL);
    }
    var page = MY_PAGE;
    var 匹配成功 = false;
    var obj = {};
    let muban = JSON.parse(getMyVar('yjmuban','{}'));//获取上次一级模板
    let idex = 一级定位模板.findIndex(it=>it.名称===muban.名称); // 找到索引
    if(idex>-1) {
        let delItem = 一级定位模板.splice(idex, 1);// 删除
        一级定位模板.unshift(delItem[0]);//放到最头上
    }
    let ck_id = `cookie.${MY_RULE.title}`;
    if(!getMyVar('cookie')||success_flag!=='html'){//如果没有cookie则主动获取cookie,有搜索验证结果的必然更新cookie
        let cookie= 获取ck(ck_id);
        putMyVar('cookie',cookie);
    }
    // log('cookie:'+getMyVar('cookie'));
    // let cookie='searchneed=ok';
    html = html&&typeof(html)==='string'&&/html/.test(html)?html:获取源码(MY_URL);//源码只获取一次
    cates = cates&&Array.isArray(cates)?cates:[];
    var mactchFlag = new RegExp(success_flag);//变量构造正则表达式
    if(!mactchFlag.test(html)){//没有包含成功标志的东西就跳道长验证
        log('开始道长验证通杀:'+ck_id);
        道长验证码('网站搜索异常，点此手动处理验证或看网页挂了么',MY_URL,'',ck_id);
    }else {
        for (let i in 一级定位模板) {
            let it = 一级定位模板[i];
            let parStr = it.解析;
            if(!规则处理){//规则没写处理
                if(it.一级处理&&typeof(it.一级处理)=='string'){//模板传了第二优先
                    一级处理 = eval(it.一级处理);
                }else{//规则未写且模板未传
                    一级处理 = {};
                }
            }
            一级处理.自动匹配 = true;
            try {
                var result = 一级(parStr, it.是否有二级, cates, it.免责, html,test_mode); //定义个变量接受返回值列表
                if (parseInt(page) === 1) {
                    log('一级模板匹配成功,第' + i + '个模板:【' + it.名称 + '】');
                }
                匹配成功 = true;
                obj = it;
                putMyVar('yjmuban', JSON.stringify(obj)); //匹配成功保存上次匹配的模板,下次匹配直接排第一个
                if(test_mode&&Array.isArray(result)&&result.length>0){//测试模式
                    result = result.filter(it=>it.url);//筛选正常url的
                    result = result.map((it)=>{
                        it.url = $(it.url).rule(()=>{
                            require(config.自动匹配);
                            // requireCache('https://hikerfans.com/lmysdm/lazy.js',24);
                            // 自动二级(lazy);
                            自动二级();
                        });
                        return it
                    });
                    setResult(result);
                }
                break;
            } catch (e) {
                log('一级模板【' + it.名称 + '】匹配失败,尝试下一个模板\n' + e.message)
            }
        }
        if (!匹配成功) {
            throw new Error("全部已有一级模板匹配失败,请扩充模板库");
        }
    }
}

var 自动搜索 = function (success_flag){
    success_flag = success_flag||'html';//默认不传就是html，意思是只要源码含有Html标签都算是对的
    // success_flag = success_flag||'搜索结果';
    依赖检测();
    if(typeof(html)!=='string'||!/html/.test(html)){
        MY_URL = 获取搜索链接();
        // html = 获取源码(MY_URL);//搜索源码只获取一次
        html=getCode();
    }
    var 规则处理=typeof(一级处理)!=='undefined';
    var page = MY_PAGE;
    var 匹配成功 = false;
    var obj = {};
    let muban = JSON.parse(getMyVar('ssmuban','{}'));//获取上次搜索模板
    let idex = 搜索定位模板.findIndex(it=>it.名称===muban.名称); // 找到索引
    if(idex>-1) {
        let delItem = 搜索定位模板.splice(idex, 1);// 删除
        搜索定位模板.unshift(delItem[0]);//放到最头上
    }
    let ck_id = `cookie.${MY_RULE.title}`;
    if(!getMyVar('cookie')||success_flag!=='html'){//如果没有cookie则主动获取cookie,有搜索验证结果的必然更新cookie
        let cookie= 获取ck(ck_id);
        putMyVar('cookie',cookie);
    }
    // log('cookie:'+getMyVar('cookie'));
    // let cookie='searchneed=ok';
    var mactchFlag = new RegExp(success_flag);//变量构造正则表达式
    if(!mactchFlag.test(html)){//没有包含搜索成功标志的东西就跳道长验证
        log('开始道长验证通杀:'+ck_id);
        道长验证码('网站搜索异常，点此手动处理验证或看网页挂了么',MY_URL,'',ck_id);
    }else {
        for (let i in 搜索定位模板) {
            let it = 搜索定位模板[i];
            let parStr = it.解析;
            if(!规则处理){//规则没写处理
                if(it.一级处理&&typeof(it.一级处理)=='string'){//模板传了第二优先
                    一级处理 = eval(it.一级处理);
                }else{//规则未写且模板未传
                    一级处理 = {};
                }
            }
            一级处理.自动匹配 = true;
            try {
                一级(parStr, it.是否有二级, [], it.免责, html);
                if (parseInt(page) === 1) {
                    log('搜索匹配成功,第' + i + '个模板:【' + it.名称 + '】');
                }
                匹配成功 = true;
                obj = it;
                putMyVar('ssmuban', JSON.stringify(obj)); //匹配成功保存上次匹配的模板,下次匹配直接排第一个
                break;
            } catch (e) {
                log('搜索模板【' + it.名称 + '】匹配失败,尝试下一个模板\n' + e.message)
            }
        }
        if (!匹配成功) {
            throw new Error("全部已有搜索模板匹配失败,请扩充模板库");
        }
    }
}

var 自动二级 = function (lazy){
    let lazy2 = `var 解析=${$.stringify(解析)};var lazy=`+function (input){
        var 全局免嗅 = function (input){
            try {
                let ret=request(input).match(/var player_(.*?)=(.*?)</)[2];
                let url = JSON.parse(ret).url;
                if(/\.m3u8|\.mp4/.test(url)){
                    return 解析.是否视频(url)
                }else if(!/http/.test(url)&&!/\//.test(url)){
                    try {
                        url = unescape(base64Decode(url));
                        if(/http/.test(url)){
                            return 解析.纯通免(url)
                        }else{
                            return 解析.纯通免(input)
                        }
                    }catch (e) {
                        return 解析.纯通免(input)
                    }
                }else{
                    return 解析.纯通免(input)
                }
            }catch (e) {
                return 解析.纯通免(input)
            }
        };
        return 全局免嗅(input)
    }.toString();
    let path = 'hiker://files/cache/js/自动匹配免嗅.js';
    writeFile(path,lazy2);
    lazy = lazy||$("").lazyRule((path)=>{
        // return input+request(path);
        eval(request(path));
        return lazy(input);
    },path);
    // var 动态最新章节=true;
    // var 倒序=false;
    var 匹配成功 = false;
    var 规则处理=typeof(二级处理)!=='undefined';
    var obj = {};
    var result = [];//匹配后的二级结果
    let muban = JSON.parse(getMyVar('muban','{}'));//获取上次模板
    let idex = 二级定位模板.findIndex(it=>it.名称===muban.名称); // 找到索引
    if(idex>-1) {
        let delItem = 二级定位模板.splice(idex, 1);// 删除
        二级定位模板.unshift(delItem[0]);//放到最头上
    }
    for(let i in 二级定位模板){
        let it = 二级定位模板[i];
        let parse=it.解析;
        动态最新章节 = !!it.动态最新章节;
        if(!规则处理){//规则没写处理
            if(it.二级处理&&typeof(it.二级处理)=='string'){//模板传了第二优先
                二级处理 = eval(it.二级处理);
            }else{//规则未写且模板未传
                二级处理 = {};
            }
        }
        try {
            result = 二级(parse,lazy,it.需要魔断,true);
            log('二级匹配成功,第'+i+'个模板:【'+it.名称+'】');
            匹配成功 = true;
            obj = it;
            putMyVar('muban',JSON.stringify(obj)); //匹配成功保存上次匹配的模板,下次匹配直接排第一个
            break;
        }catch (e) {
            log('二级模板【'+it.名称+'】匹配失败,尝试下一个模板\n'+e.message);
            // config.html='';//匹配失败清除缓存的页面
            // putMyVar('lastUrl','');
        }
    }
    if(!匹配成功){
        config.html='';//全部失败再清空模板
        throw new Error("全部已有二级模板匹配失败,请扩充模板库");
    }
}
