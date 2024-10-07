js:
// http://www.jshaman.com/ 代码加密
putVar('cmsapp.jsRoot','https://gitcode.net/qq_32394351/dr/-/raw/master/js/');
var d=[];
function demo(p){
    let d_url;
    switch (p){
        case 0:
            d_url='https://taopianapi.com/home/cjapi/as/mc/vod/xml';
            break;
        case 1:
            d_url='https://gfzycj.hnmj.vip/api.php/provide/vod';
            break;
        case 2:
            d_url = 'https://dxys2233.com/mogai_api.php/v1.vod';
            break;
        case 3:
            d_url = 'http://360yy.cn/api.php/app';
            break;
        case 4:
            d_url = 'http://qqtvapp.com/xgapp.php/v2';
            break;
        case 5:
            d_url = 'http://tv2.aixixi.vip/api.php/iptv/vod';
            break;
    }
    return $('#noLoading#').lazyRule((d_url)=>{
        putMyVar('url',d_url);
        refreshPage(false);
        return 'toast://例子已经给你了，别再找我要了！'
    },d_url)
}

function demos(p){
    let d_url;
    switch (p){
        case 0:
            d_url='hiker://files/rules/dzHouse/dzMovie/m点佬.txt';
            break;
        case 1:
            d_url=getVar('cmsapp.jsRoot')+'/cmsDemo.txt';
            break;
    }
    return $('#noLoading#').lazyRule((d_url)=>{
        putMyVar('lurl',d_url);
        refreshPage(false);
        return 'toast://例子已经给你了，别再找我要了！'
    },d_url)
}
d.push({
    title: '““””<span style="color: #1aad19">♻检测升级</span>',
    desc:'清除所有资源网依赖,等同于长按小程序标题清除缓存',
    col_type: 'scroll_button',
    url: $('#noLoading#').lazyRule(()=>{
        showLoading('升级检测中,请稍等...');
        require(getVar('cmsapp.jsRoot')+'资源网预处理.js');
        let _cfg = getMyVar('initConfig', '{}');
        if (_cfg && _cfg.length > 0) {
            config = JSON.parse(_cfg);
        }
        // config.模板=getVar('cmsapp.jsRoot')+'zyw.js';
        require(config['模板']);
        let requireId = version.requireId;
        let ver = version.ver;
        let update = version.update;
        let localDate = new Date(update);
        try {
            var webLib = fetch(requireId);
            var webVer = (function(webLib) {
                eval(webLib);
                return version;
            })(webLib);
        }catch (e) {
            hideLoading();
            return 'toast://远程服务器通讯错误,本次检测升级失败\n'+e.message;
        }
        let webDate = new Date(webVer.update);
        // $.dateFormat(new Date(parseInt(localDate)),"yyyy-MM-dd HH:mm:ss");
        if(webDate>localDate||webVer.ver!==ver){//网页更新时间大于本地库时间或者版本号不等
            hideLoading();
            let msg = '本地依赖更新时间:'+update+',版本:'+ver+'\n云端依赖更新时间:'+webVer.update+',版本:'+webVer.ver+'\n有升级:['+ver+']=>['+webVer.ver+'],立即升级?';
            return $(msg).confirm((requireId,webLib) => {
                let jsp = 'hiker://files/libs/'+md5(requireId)+'.js';
                log('本地依赖模块路径=> '+jsp);
                deleteCache();
                clearMyVar('是否进入规则');
                writeFile(jsp,webLib)
                refreshPage(false);
                return 'toast://升级成功!模块依赖缓存已清除'
            },requireId,webLib);
        }else{
            hideLoading();
            return 'toast://经检测已经是最新的['+ver+']了!'
        }
    })
});

d.push({
    title:  '““””<span style="color: #ff7000">例子</span>' ,
    url: 'toast://别点我，点右边的!',
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  'cms.json' ,
    url: demo(1),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  'cms.xml' ,
    url: demo(0),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  'app' ,
    url: demo(3),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  'app.v1' ,
    url: demo(2),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  'app.v2' ,
    url: demo(4),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  'iptv' ,
    url: demo(5),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  '本地合集' ,
    url: demos(0),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
d.push({
    title:  '远程合集' ,
    url: demos(1),
    col_type: "scroll_button",
    desc: "",
    pic_url: ""
});
let desc="测试如果能正常进首页即成功，支持常见json和xml采集数据地址。测试环境已升级完整的运行沙箱，点击二级进不去的人记得升级模板，出来了一级就说明可用";
d.push({
    title: 'CMS资源网采集模板说明',
    url: 'toast://'+desc,
    col_type: "text_1",
    desc:desc ,
    pic_url: ""
});

d.push({
    title: '测试',
    url: $.toString(()=>{
        let url=getMyVar('url','').trim();
        if(!url||!/^http/.test(url)){
            return 'toast://请输入正确的采集地址'
        }
        let homeUrl='hiker://empty##'+url+'#pg=fypage';
        var ua = getMyVar('ua','');
        let cmsType=getMyVar('type','');
        let keyParam = getMyVar('keyParam','');
        let obj = {
            ua:ua,
            模板:getVar('cmsapp.jsRoot')+'zyw.js',
            debug:true,//调试模式，才能进二级
        };
        if(cmsType){
            obj.type = cmsType
        }
        initConfig(obj);
        // log(config.模板);
        // log(config.ua);
        return $(homeUrl).rule(()=>{
            addListener('onClose', $.toString(()=>{//监听返回事件
                // initConfig({}); //清空配置
            }));
            require(config['模板']);
            一级();
        })
    }),
    col_type: "input",
    desc: "输入待添加的资源网CMS地址",
    pic_url: "",
    extra:{
        defaultValue:getMyVar('url',''),
        onChange:"putMyVar('url',input)"
    }
});
d.push({
    title: '搜索关键字:'+'““””<span style="color: #ab2415">'+getMyVar('skey','斗罗')+'</span>',
    col_type:'text_2',
    url:$(getMyVar('skey','斗罗'),'请输入搜索关键字').input(()=>{
        putMyVar('skey',input);
        refreshPage(false);
        return 'hiker://empty'
    })
});
d.push({
    title: '搜索测试',
    col_type:'text_2',
    url:$('#noLoading#').lazyRule(()=>{
        let url=getMyVar('url','').trim();
        if(!url||!/^http/.test(url)){
            return 'toast://请输入正确的采集地址'
        }
        var ua = getMyVar('ua','');
        let cmsType=getMyVar('type','');
        let keyParam = getMyVar('keyParam','');
        let obj = {
            ua:ua,
            模板:getVar('cmsapp.jsRoot')+'zyw.js',
            debug:true,//调试模式，才能进二级
        };
        if(cmsType){
            obj.type = cmsType
        }
        initConfig(obj);
        let surl = 'hiker://empty##?wd=**&pg=fypage&ac=videolist'.replace('**',getMyVar('skey','斗罗'));
        let homeUrl = 'hiker://empty##'+url+'#pg=fypage';
        return $(surl).rule((keyParam,homeUrl)=>{
            require(config['模板']);
            MY_RULE.url = homeUrl;
            搜索一级(null,keyParam);
        },keyParam,homeUrl)
    })
});
d.push({
    title: '自定义UA',
    url: $.toString(()=>{
        return $('清空输入?').confirm(()=>{
            putMyVar('ua','');
            refreshPage(false);
            return 'toast://已清空自定义UA'
        });
    }),
    col_type: "input",
    desc: "输入自定义的UA,可不填",
    pic_url: "",
    extra:{
        defaultValue:getMyVar('ua',''),
        onChange:"putMyVar('ua',input)",
        titleVisible: true,
        textSize: 13,
        type: "textarea",
        height:2,
    }
});
d.push({
    title: '🚇快捷UA',
    col_type: "text_3",
    url:$('#noLoading#').lazyRule(()=>{
        let sel_title = ['电脑','手机','Dart/2.13 (dart:io)','Dalvik/2.1.0'];
        return $(sel_title,2,'请选择一个快捷UA').select(()=>{
            switch (input){
                case '电脑':
                    putMyVar('ua',PC_UA);
                    break;
                case '手机':
                    putMyVar('ua',MOBILE_UA);
                    break;
                case 'Dart/2.13 (dart:io)':
                    putMyVar('ua',input);
                    break;
                case 'Dalvik/2.1.0':
                    putMyVar('ua','Dalvik/2.1.0 (Linux; U; Android 9; RVL-AL09 Build/HUAWEIRVL-AL09)');
                    break;
            }
            refreshPage(false);
            return 'hiker://empty'
        });
    })
});

d.push({
    title: '🚇指定类型',
    col_type: "text_3",
    url:$('#noLoading#').lazyRule(()=>{
        let cmsType = getMyVar('type','');
        let sel_title = ['','cms','v1','v2','app','iptv'].map(it => it===cmsType?'👉'+it:it);
        return $(sel_title,2,'请选择一个指定类型').select(()=>{
            input = input.replace(/👉/g,'');
            putMyVar('type',input);
            refreshPage(false);
            return 'hiker://empty'
        });
    })
});

d.push({
    title: '🚇搜索参数',
    col_type: "text_3",
    url:$('#noLoading#').lazyRule(()=>{
        let keyParam = getMyVar('keyParam','');
        let sel_title = ['','wd','zm','text'].map(it => it===keyParam?'👉'+it:it);
        return $(sel_title,2,'请选择一个搜索参数').select(()=>{
            input = input.replace(/👉/g,'');
            putMyVar('keyParam',input);
            refreshPage(false);
            return 'hiker://empty'
        });
    })
});


d.push({
    title:  '📲生成规则' ,
    url: $('#noLoading#').lazyRule(()=>{
        let url=getMyVar('url','').trim();
        if(!url||!/^http/.test(url)){
            return 'toast://你没输入正确的地址呢？'
        }
        return $('','确定测试好了并生成小程序吗？取个名字吧').input((url)=>{
            if(!input){
                return 'toast://小程序不起名你想玩蛇皮？'
            }
            const {rule}=$.require('hiker://page/ruleGen');
            rule.title=input;
            let ourl=rule.url.match(/##(.*?)#/)[1];
            let opre=rule.preRule;
            let ua=getMyVar('ua','');
            let cmsType=getMyVar('type','');
            let keyParam = getMyVar('keyParam','');
            rule.url=rule.url.replace(ourl,url);
            // rule.preRule=opre.replace('$ua',ua);
            rule.preRule='js:\n';
            if(ua){
                rule.preRule+=`var ua='${ua}';\n`
            }
            if(cmsType){
                rule.preRule+=`var type='${cmsType}';\n`
            }
            rule.preRule+="require('"+getVar('cmsapp.jsRoot')+"资源网预处理.js');"
            rule.searchFind='js:\nrequire(config.模板);\n';
            let endStr=!keyParam?'搜索一级()':`搜索一级(null,'${keyParam}')`;
            rule.searchFind+=endStr;
//             rule.find_rule=`js:
// require(config.模板);`;
            rule.icon='http://1.117.152.239:39000/tupian.php?text='+input;
            //log(rule);
            let path='hiker://files/ruleCache/cms/'+input+'.json';
            writeFile(path,JSON.stringify(rule));
            putMyVar('genRule',JSON.stringify({
                title:input,
                url:path,
                ua:ua
            }));
            return 'toast://已生成小程序:'+input+'=>地址:'+url
        },url);

    }),
    col_type: "text_2",
    desc: "",
    pic_url: ""
});
d.push({
    title:  '📥导入' ,
    url: $('#noLoading#').lazyRule(()=>{
        var rule=getMyVar('genRule','');
        if(!rule){
            return 'toast://没生成过规则，无法导入，请先测试好并生成一个规则吧'
        }
        try{
            rule=JSON.parse(rule);
        }catch(e){
            log(e.message);
            return 'toast://生成的规则有误，请重试吧'
        }
        log(rule);
        /*
        let ruleCode = "海阔视界规则分享，当前分享的是：小程序，无根树，花正清，不断荤腥不戒淫￥home_rule_v2￥base64://@测试CMS@" + base64Encode(fetch(rule.url));
        importUrl = "rule://" + base64Encode(ruleCode);
        */
        let ruleCode = "海阔视界首页频道规则【"+rule.title + "】￥home_rule_url￥" + rule.url;
        log(ruleCode);
        let importUrl = "rule://" + base64Encode(ruleCode)
        return importUrl
    }),
    col_type: "text_2",
    desc: "",
    pic_url: ""
});
d.push({
    title: '批量操作生成轻合集(免测试)',
    url: $('#noLoading#').lazyRule(()=>{
        return $('来个测试地址?').confirm(()=>{
            var 取随机列表 = function(arr, num) {
                num = num || 1; //默认取一个
                var sData = arr.slice(0), i = arr.length, min = i - num, item, index;
                while (i-- > min) {
                    index = Math.floor((i + 1) * Math.random());
                    item = sData[index];
                    sData[index] = sData[i];
                    sData[i] = item;
                }
                return sData.slice(min);
            };
            var lurl = 取随机列表(['http://hiker.nokia.press/hikerule/zyw_data/27',
                '/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/dzHouse/zyw/本地资源.txt'])[0];
            putMyVar('lurl',lurl);
            refreshPage(false);
            return 'toast://给你了！！！'
        })
    }),
    col_type: "text_1",
    desc: "生成后导入的轻合集需要进轻合集设置里启用自定义分类才能显示原资源网采集规则里的各种个性化分类",
    pic_url: "",
    extra:{
        lineVisible:false
    }
});
d.push({
    title: '开始生成',
    url: $.toString(()=>{
        let url=getMyVar('lurl','').trim();
        if(!url||!/^http|^hiker:|^file:|^\/storage|^\/sdcard/.test(url)){
            return 'toast://请输入正确的采集配置地址，不会的话可以去app.dp里复制分类对应的本地资源txt文件路径'
        }

        if(/storage|sdcard/.test(url)&&!/file:/.test(url)){
            url='file://'+url
        }
        let code=fetch(url);
        if(!code){
            return 'toast://文件有误,请先打开编辑确定格式正确并保存后再试'
        }
        // log(code);
        let arr = /http/.test(code) ? code.match(/#[\s\S]*?#/g) : base64Decode(code).match(/#[\s\S]*?#/g);
        if(!Array.isArray(arr)){
            return 'toast://文件内容有误,试试别的地址?请参考资源网采集里面的地址格式或者远程合集例子里的格式'
        }
        let genData = [];

        arr.forEach((it)=>{
            let tabs = it.match(/#.*?[\s]/g)[0].split('#')[1].replace(/\n/, '').trim();
            let list = it.match(/[\S]*?,.*?[\s]/g);
            list.forEach(it=>{
                let t = it.split(',');
                let t2 = t[0].trim();
                genData.push({
                    title: t2,
                    url: t[1].trim(),
                    // pic:t.length > 2? t[2].trim() :'',
                    pic:t.length > 2? t[2].trim() :'http://1.117.152.239:39000/tupian.php?text='+t2,
                    type: tabs
                })
            })
        });
        // log(genData);
        function clone(myObj) {//拷贝对象
            if (typeof (myObj) != 'object') return myObj;
            if (myObj == null) return myObj;
            var myNewObj = new Object();
            for (var i in myObj)
                myNewObj[i] = clone(myObj[i]);
            return myNewObj;
        }
        const {rule}=$.require('hiker://page/ruleGen');
        let link=rule.url.match(/##(.*?)#/)[1];//获取源地址
        let ua=getMyVar('ua','');
        var d = [];
        genData.forEach((it)=>{
            let tmp = clone(rule);
            tmp.title=it.title;
            tmp.url=tmp.url.replace(link,it.url);
            tmp.sort_url=it.type;
            tmp.preRule=tmp.preRule.replace('$ua',ua);
            if(it.pic){
                tmp.icon = it.pic
            }
            d.push(tmp)
        });
        let path='hiker://files/ruleCache/cms/'+md5(url)+'.json';
        writeFile(path,JSON.stringify(d));
        putMyVar('genRules',JSON.stringify({
            title:'资源合集',
            path:path
        }));
        return 'toast://已生成合集,共计'+d.length+'个小程序。可以本地查看或者导入了!'
    }),
    col_type: "input",
    desc: "配置地址，参考资源网采集.dp",
    pic_url: "",
    extra:{
        defaultValue:getMyVar('lurl',''),
        onChange:"putMyVar('lurl',input)"
    }
});

d.push({
    title: '📝打开编辑',
    url: $('#noLoading#').lazyRule(()=>{
        let lurl=getMyVar('lurl','');
        if(/storage|sdcard/.test(lurl)&&!/file:/.test(lurl)){
            lurl='file://'+lurl
        }
        if(!fileExist(lurl)){
            writeFile(lurl,'');
        }
        return 'editFile://'+lurl
    }),
    col_type: "text_3",
});

d.push({
    title: '🎡转换器',
    url: $('hiker://empty##').rule(()=>{
        let d = [];
        let inpath = 'hiker://files/rules/dzHouse/zyw/待转换.txt';
        let outpath = 'hiker://files/rules/dzHouse/zyw/已转换.txt';
        addListener("onClose", $.toString(() => {
            refreshPage(false);
        }));
        d.push({
            title:'① 编辑文件',
            desc:inpath+'\n复制对应源的文本进去就行了,比如 影视猫/备份站源/source.json里的文本内容',
            url:$('#noLoading#').lazyRule((inpath)=>{
                if(!fileExist(inpath)){
                    writeFile(inpath,'');
                }
                return 'editFile://'+inpath
            },inpath),
            col_type:'text_1'
        });
        let sel_title = ['影视猫','biubiu','猫影视'];
        sel_title = sel_title.map(it=>getMyVar('smode','影视猫')===it?'👉'+it:it);
        d.push({
            title:'② 选择源类型: '+getMyVar('smode','影视猫'),
            desc:'影视猫/biubiu/猫影视/',
            url:$(sel_title,2,'请选择待转换的源类型').select(()=>{
                input = input.replace(/👉/g,'');
                let supports = ['影视猫','biubiu'];
                if(!supports.includes(input)){
                    return 'toast://暂不支持'+input+',看看就好'
                }
                putMyVar('smode',input);
                refreshPage(false);
                return 'hiker://empty'
            }),
            col_type:'text_1'
        });
        d.push({
            title:'③ 开始转换',
            desc:outpath,
            url:$('#noLoading#').lazyRule((inpath,outpath)=>{
                let html = fetch(inpath);
                if(!html){
                    return 'toast://'+inpath+'空空如也，叫我如何是好?'
                }
                let smode = getMyVar('smode','影视猫');
                if(smode==='影视猫'){
                    try {
                        html = JSON.parse(html);
                        let code = html.map(it=>it.名称+','+it.搜索链接);
                        code.unshift('#'+smode);
                        code.push('#');
                        code = code.join('\n').trim();
                        writeFile(outpath,code);
                        putMyVar('lurl',outpath);
                        return 'toast://转换完毕'
                    }catch (e) {
                        return 'toast://转换错误:'+e.message;
                    }
                }else if(smode==='biubiu'){
                    try{
                        eval('var bbdata = '+html);
                        var bbjiekou = bbdata.zhuyejiekou;
                        var bbcaiji = bbdata.caijizhan;
                        let code1 = bbjiekou.map(it=>it.name+','+it.url).join('\n').trim();
                        let code2 = bbcaiji.map(it=>it.name+','+it.url).join('\n').trim();
                        let code = '#接口\n'+code1+'\n#\n#采集\n'+code2+'\n#';
                        writeFile(outpath,code);
                        putMyVar('lurl',outpath);
                        return 'toast://转换完毕'
                    } catch (e) {
                        return 'toast://转换错误:'+e.message;
                    }
                }else{
                    return 'toast://暂不支持转换【'+smode+'】的数据'
                }
            },inpath,outpath),
            col_type:'text_1'
        });
        d.push({
            title:'④ 返回查看或生成',
            desc:'这里可以不用点击了,等同于左上角返回。当然点这里也行',
            url:$('#noLoading#').lazyRule(()=>{
                back(true);
                return 'hiker://empty'
            }),
            col_type:'text_1'
        });
        setResult(d);
    }),
    col_type: "text_3",
});

d.push({
    title: '““””<span style="color: #ff7000">导入轻合集</span>',
    url: $('#noLoading#').lazyRule(()=>{
        let genRules = getMyVar('genRules','');
        if(!genRules){
            return 'toast://还没有生成过,无法导入'
        }
        try {
            genRules = JSON.parse(genRules);
        }catch (e) {
            return 'toast://生成记录有误，请重新生成'
        }
        const {genRule}=$.require("hiker://page/genApi?rule=道长仓库Pro");
        let import_rule=genRule(genRules.title,genRules.path);
        //copy(import_rule);
        let ruleCode=parsePaste(import_rule.split("\n")[0]);
        importUrl = 'rule://' + base64Encode(ruleCode);
        return importUrl
    }),
    col_type: "text_3",
});
d.push({
    title: '🎭查看生成结果',
    url: $('#noLoading#').lazyRule(()=>{
        let genRules = getMyVar('genRules','');
        if(!genRules){
            return 'toast://还没有生成过,无法查看'
        }
        try {
            genRules = JSON.parse(genRules);
        }catch (e) {
            return 'toast://生成记录有误，请重新生成'
        }
        return 'editFile://'+genRules.path
    }),
    col_type: "text_2",
});
d.push({
    title: '📑复制地址',
    url: $('#noLoading#').lazyRule(()=>{
        let genRules = getMyVar('genRules','');
        if(!genRules){
            return 'toast://还没有生成过,无法复制'
        }
        try {
            genRules = JSON.parse(genRules);
        }catch (e) {
            return 'toast://生成记录有误，请重新生成'
        }
        log(genRules.path);
        return 'copy://'+genRules.path
    }),
    col_type: "text_2",
});
setResult(d);
