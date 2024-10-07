var updateLog = `
2024/04/21 优化二级嗅探规则改用海阔video;新增专业写源支持class_parse
2022/07/04 增加版号管理
`.trim();
var version={
    author:"道长",
    ver:"1.2.5",
    appv:2316,
    requireId:"https://gitcode.net/qq_32394351/dr/-/raw/master/js/ruleEditor.js",
    update:'2024/04/21 00:41',
    info:updateLog,
    ua:';get;utf-8;{User-Agent@Mozilla/5.0&&Cookie@}',
    ok:'https://okjx.cc/?url=',
    jsRoot:'https://gitcode.net/qq_32394351/dr/-/raw/master/js/',
};
putVar('editor依赖',version.requireId);
putVar('editor.jsRoot',version.jsRoot);
function objReverse(obj){//键值对反转
    var keys = Object.keys(obj);
    var res = {};
    keys.forEach((val) => {
        res[obj[val]] = val;
    });
    return res
}
function clone(myObj) {//拷贝对象
    if (typeof (myObj) != 'object') return myObj;
    if (myObj == null) return myObj;
    var myNewObj = {};
    for (var i in myObj)
        myNewObj[i] = clone(myObj[i]);
    return myNewObj;
}
function keyMap(){//海阔中英文规则属性字典
    var attrMap={
        // firstHeader:'',
        last_chapter_rule:'最新章节解析',
        title:'小程序名称',
        author:'作者',
        type:'小程序类别',
        url:'小程序链接',
        version:'小程序版本',
        col_type:'显示样式',
        class_parse:'分类解析式',
        class_name:'分类名称',
        class_url:'分类替换词',
        area_name:'地区名称',
        area_url:'地区替换词',
        sort_name:'排序名称',
        // sort_url:'排序替换词',
        sort_url:'自定义分类名',
        year_name:'年代名称',
        year_url:'年代替换词',
        find_rule:'解析规则',
        searchFind:'搜索解析规则',
        search_url:'搜索链接',
        group:'小程序分组',
        detail_col_type:'二级列表显示样式',
        detail_find_rule:'二级列表解析规则',
        sdetail_col_type:'搜索二级列表显示样式',
        sdetail_find_rule:'搜索二级列表解析规则',
        ua:'UA',
        preRule:'JS预处理',
        pages:'子页面',
        icon:'小程序图标地址',
        // ej_title:"二级海报标题(最多3个定位用;隔开)",
        ej_title:"二级海报标题",
        ej_img:"二级海报图片",
        ej_url:"二级海报点击",
        // ej_desc:"二级海报描述(最多3个定位用;隔开)",
        ej_desc:"二级海报描述",
        ej_content:"二级剧情简介",
        ej_tabs:"二级线路名称列表",
        ej_tab_text:"二级线路名称标题",
        // ej_lists:"二级选集列表(#id是线路替换,必然包含)",
        ej_lists:"二级选集列表",
        ej_list_text:"二级选集标题",
        ej_tab_id:"二级线路替换",
    };
    storage0.putMyVar('attrMap',attrMap);
    storage0.putMyVar('attrMap2',objReverse(attrMap));
    return attrMap
}

function initUiAttr(){//初始化默认参数
    if(!storage0.getMyVar('attrMap','')){
        keyMap();
    }
    var keys = ['title','type','author','version','group','icon','url','col_type','class_parse','class_name','class_url','sort_url','find_rule',
        'search_url','searchFind','ej_title','ej_img','ej_url','ej_desc','ej_content','ej_tabs','ej_tab_text','ej_lists','ej_list_text','ej_tab_id','ua'
    ];
    // 'detail_col_type',
    var defaultValue = {
        type:'video',
        author: '道长',
        version: '1',
        group:'#️⃣道长DR',
        icon:'http://1.117.152.239:39000/tupian.php?text=道长',
        url:'hiker://empty##',
        col_type:'movie_3_marquee',
        sort_url:'影视',
        search_url:'hiker://empty##',
        // detail_col_type:'text_5',
        ua:MOBILE_UA,
    };
    var defaultDesc = {
        find_rule:'列表;标题;描述;详情;链接;内容',
        searchFind:'列表;标题;描述;详情;链接;内容',
        ej_title:'支持最多3个定位用;隔开',
        ej_desc:'支持最多3个定位用;隔开',
        ej_lists:'#id是线路替换,必然包含',
        ej_tab_id:'#id实际定位,默认顺序数字',
        ua:'全局UA设备标识'
    };
    var requiredKeys = {//简单模式显示的输入框
        title:true,
        url:true,
        search_url:true,
        find_rule:true,
        searchFind:true,
        ej_content:false,
        ej_tabs:true,
        ej_lists:true,
        ua:true
    };
    // var simpleKeys = clone(requiredKeys);
    // Object.assign(simpleKeys,{})
    return {keys:keys,defaultValue:defaultValue,defaultDesc:defaultDesc,requiredKeys:requiredKeys}
}

function getInputUrl(key){//获取搜索组件标题点击事件
    let typesMap = { 'all': '聚合', 'video': '视频', 'music': '音频', 'live': '直播', 'cartoon': '漫画', 'read': '阅读', 'picture': '图集', 'news': '资讯', 'tool': '工具', 'other': '其它' }
    typesMap = objReverse(typesMap);
    //去重（ES6 Set）
    function unique2(array){
        return Array.from(new Set(array));
    }
    var actions = {
        type:$.toString((typesMap)=>{
            let types = ['聚合','视频','音频','直播','漫画','阅读','图集','资讯','工具','其它'];
            return $(types,3,'请选择小程序类别').select((typesMap)=>{
                putMyVar('type',typesMap[input]);
                refreshPage(false);
                return 'hiker://empty'
            },typesMap)
        },typesMap),
        col_type:$.toString(()=>{
            let all_cols = getColTypes();
            return $(all_cols, 2, '请选择一级显示样式').select(() => {
                putMyVar('col_type',input);
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
        detail_col_type:$.toString(()=>{
            let all_cols = getColTypes();
            return $(all_cols, 2, '请选择二级列表显示样式').select(() => {
                putMyVar('detail_col_type',input);
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
        class_parse:$.toString(()=>{
            let sels = ['示例','执行'];
            return $(sels, 2, '请选择要进行的操作').select(() => {
                if(input==='示例'){
                    putMyVar('class_parse','.nav-menu-items&&li;a&&Text;a&&href;.*/(.*?).html');
                }else if(input==='执行'){
                    let url = getMyVar('url','').replace('hiker://empty##','').replace(/fypage/g,'1');
                    let class_parse = getMyVar('class_parse','');
                    if(!/http/.test(url)){
                        return 'toast://小程序链接有误'
                    }
                    let parse = class_parse.split(';');
                    if(parse.length < 4){
                        return 'toast://分类解析式有误,格式为: 列表;标题;链接;链接正则提取'
                    }
                    let html = fetch(url,{headers:{'User-Agent':getMyVar('ua',MOBILE_UA)}});
                    let parseList = _pdfa(html,parse[0]);
                    let class_name_list = [];
                    let class_url_list = [];
                    let cate_exclude = '首页|留言|APP|下载|资讯|新闻|动态';
                    parseList.forEach((it)=>{
                        let cname = _pdfh(it,parse[1]);
                        let curl = _pdfh(it,parse[2]);
                        try {
                            if(!(new RegExp(cate_exclude).test(cname))){
                                curl = curl.match(new RegExp(parse[3]))[1];
                                class_name_list.push(cname);
                                class_url_list.push(curl);
                            }
                        }catch (e) {}
                    });
                    putMyVar('class_name', class_name_list.join('&'));
                    putMyVar('class_url', class_url_list.join('&'));
                }
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
        class_name:$.toString(()=>{
            return $(getMyVar('last_class_name','.navbar-items&&li;body&&Text'),'请输入定位 列表;标题 如: .navbar-items&&li;body&&Text').input(()=>{
                if(!getMyVar('class_name','')&&!input) {
                    putMyVar('class_name', '电影&电视剧&综艺&动漫');
                    refreshPage(false);
                }else if(input&&input.includes(';')){
                    putMyVar('last_class_name',input);
                    let url = getMyVar('url','').replace('hiker://empty##','').replace(/fypage/g,'1');
                    if(!/http/.test(url)){
                        return 'toast://小程序链接有误'
                    }
                    let html = fetch(url,{headers:{'User-Agent':getMyVar('ua',MOBILE_UA)}});
                    let parse = input.split(';');
                    let parseList = pdfa(html,parse[0]);
                    function matchIt(text){
                        try {
                            return text.match(new RegExp(parse[2]))[1]
                        }catch (e) {
                            return ''
                        }
                    }
                    // log(parseList);
                    let list = parseList.map((it)=>{
                        return !parse[2] ? pdfh(it,parse[1]):matchIt(pdfh(it,parse[1]))
                    });
                    putMyVar('class_name', list.join('&'));
                    refreshPage(false);
                }
                return 'hiker://empty'
            })
        }),
        class_url:$.toString(()=>{
            return $(getMyVar('last_class_url','.navbar-items&&li;a&&href\n.navbar-items&&li;a&&href;(\\d+)'),'请输入定位 列表;标题 如: .navbar-items&&li;a&&href;(\\d+)').input(()=>{
                if(!getMyVar('class_url','')&&!input) {
                    putMyVar('class_url', '1&2&3&4');
                    refreshPage(false);
                }else if(input&&input.includes(';')){
                    putMyVar('last_class_url',input);
                    let url = getMyVar('url','').replace('hiker://empty##','').replace(/fypage/g,'1');
                    if(!/http/.test(url)){
                        return 'toast://小程序链接有误'
                    }
                    let html = fetch(url,{headers:{'User-Agent':getMyVar('ua',MOBILE_UA)}});
                    let parse = input.split(';');
                    let parseList = pdfa(html,parse[0]);
                    function matchIt(text){
                        try {
                            return text.match(new RegExp(parse[2]))[1]
                        }catch (e) {
                            return ''
                        }
                    }
                    // log(parseList);
                    let list = parseList.map((it)=>{
                        return !parse[2] ? pdfh(it,parse[1]):matchIt(pdfh(it,parse[1]))
                    });
                    putMyVar('class_url', list.join('&'));
                    refreshPage(false);
                }
                return 'hiker://empty'
            })
        }),
        url:$.toString(()=>{
            if(!getMyVar('url','')||!getMyVar('url').startsWith('hiker://empty##')) {
                putMyVar('url', 'hiker://empty##'+getMyVar('url',''));
                refreshPage(false);
            }
            return 'hiker://empty'
        }),
        search_url:$.toString(()=>{
            if(!getMyVar('search_url','')||!getMyVar('search_url').startsWith('hiker://empty##')) {
                putMyVar('search_url', 'hiker://empty##'+getMyVar('search_url',''));
                refreshPage(false);
            }
            return 'hiker://empty'
        }),
        version:$.toString(()=>{
            let ver = getMyVar('version','1');
            if(Number(ver)){
                putMyVar('version',(Number(ver)+1)+'');
            }else{
                putMyVar('version','1');
            }
            refreshPage(false);
            return 'hiker://empty'
        }),
        group:$.toString((unique2)=>{
            let groups=storage0.getMyVar('groups','');
            if(!groups){//最好还是缓存一下,要不然每次请求太耗时了;
                let rules = JSON.parse(fetch("hiker://home"));//获取海阔视界所有小程序
                groups=rules.map(it=>it.group||"");
                groups=unique2(groups);//获取所有规则的分组列表自动去重
                storage0.putMyVar('groups',groups);
            }
            return $(groups, 3, '请从个'+groups.length+'分组中选择1个').select(() => {
                putMyVar('group',input);
                refreshPage(false);
                return 'hiker://empty'
            })
        },unique2),
        ua:$.toString(()=>{
            let sels = ['PC_UA','MOBILE_UA','UC_BROWSER'];
            return $(sels, 2, '请选择一个UA').select(() => {
                let uas = {
                    PC_UA:PC_UA,
                    MOBILE_UA:MOBILE_UA,
                    UC_BROWSER:'Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36',
                }
                putMyVar('ua',uas[input]);
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
        searchFind:$.toString(()=>{
            if(!getMyVar('searchFind','')){
                putMyVar('searchFind','*');
                refreshPage(false);
            }
            return 'hiker://empty'
        }),
        ej_tab_text:$.toString(()=>{
            if(!getMyVar('ej_tab_text','')){
                putMyVar('ej_tab_text','body&&Text');
                refreshPage(false);
            }
            return 'hiker://empty'
        }),
        ej_list_text:$.toString(()=>{
            if(!getMyVar('ej_list_text','')){
                putMyVar('ej_list_text','a&&Text');
                refreshPage(false);
            }
            return 'hiker://empty'
        }),
        ej_title:$.toString(()=>{
            let sels = ['.title&&Text','h1&&Text','h1--span&&Text','h2&&Text','h3&&Text','h4&&Text','.y-part-eone&&Text','.fed-list-deta&&.fed-part-eone&&Text',
                '.v_title&&a&&Text','.info&&.name&&Text','.dy_tit_big&&Text','img&&title'];
            return $(sels, 2, '请选择1个二级海报标题').select(() => {
                putMyVar('ej_title',input);
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
        ej_img:$.toString(()=>{
            let sels = ['.lazyload&&data-original','img&&data-original','.lazyload&&data-src','.fed-lazy&&data-original','.fl-lazy&&data-original','.lazy&&data-original','.y-part-2by3&&data-original','.fed-part-2by3&&data-original',
                '.detail-pic&&img&&src','.pic&&img&&src','.cover&&img&&src','.poster&&img&&src','img&&src','.poster&&a&&style','.lazy&&src','#imglazy&&src'];
            return $(sels, 2, '请选择1个二级海报图片').select(() => {
                putMyVar('ej_img',input);
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
        ej_url:$.toString(()=>{
            let sels = ['.lazyload&&data-original','img&&data-original','.lazyload&&data-src','.fed-lazy&&data-original','.fl-lazy&&data-original','.lazy&&data-original','.y-part-2by3&&data-original','.fed-part-2by3&&data-original',
                '.detail-pic&&img&&src','.pic&&img&&src','.cover&&img&&src','.poster&&img&&src','img&&src','.poster&&a&&style','.lazy&&src','#imglazy&&src'];
            return $(sels, 2, '请选择1个二级海报点击链接').select(() => {
                putMyVar('ej_url',input);
                refreshPage(false);
                return 'hiker://empty'
            })
        }),
    }
    return actions[key]||''
}
function color(text, color) {
    text += "";
    if (text.indexOf("““””") === 0) {
        text.replace("““””", "");
    }
    return "““””<font color='" + color + "'>" + text + "</font>";
}
function htmlTag(tag, text) {
    text += "";
    if (text.indexOf("““””") === 0) {
        text.replace("““””", "");
    }
    return "““””" + "<" + tag + ">" + text + "</" + tag + ">";

}
function small(text) {
    return htmlTag("small", text);
}
function initHome(){//加载主页
    var d=[];
    let editMode = getItem('editMode','简单');
    d.push({
        title: '““””<span style="color: #1aad19">♻检测升级</span>',
        desc:'清除写源神器依赖,比长按小程序标题清除缓存温柔一些',
        col_type: 'scroll_button',
        url: $('#noLoading#').lazyRule(()=>{
            showLoading('升级检测中,请稍等...');
            require(getVar('editor依赖'));
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
                    deleteCache(requireId);
                    // clearMyVar('是否进入规则');
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
        title:'模式:'+(editMode==='简单'?color(editMode,'#12b668'):color(editMode,'#ab2415')),
        col_type:'scroll_button',
        url:$('#noLoading#').lazyRule(()=>{
            let editMode = getItem('editMode','简单');
            let nextEditMode = editMode==='简单'?'专业':'简单';
            setItem('editMode',nextEditMode);
            // updateItem('editMode',{title:'当前写源模式:'+nextEditMode});
            refreshPage(false);
            return 'hiker://empty'
        }),
        extra:{
            id:'editMode'
        }
    });
    d.push({
        title:'全部重写',
        col_type:'scroll_button',
        url:$('#noLoading#').lazyRule(()=>{
            return $('确定要这么做吗？该操作将清除所有已编辑的记录').confirm(()=>{
                let attrMap = storage0.getMyVar('attrMap',attrMap);
                let keys = Object.keys(attrMap);
                keys.forEach((it)=>{
                    clearMyVar(it);
                });
                refreshPage(false);
                return 'toast://全部手写记录已清除并恢复默认值'
            })
        })
    });
    d.push({
        title:'保存并导入',
        col_type:'scroll_button',
        url:$('#noLoading#').lazyRule((initUiAttr)=>{
            var inputData = initUiAttr();
            var defaultValue = inputData.defaultValue;

            let newRule = {
                title:getMyVar('title',''),
                type:getMyVar('type',''),
                author:getMyVar('author',''),
                version:Number(getMyVar('version','1')),
                group:getMyVar('group',defaultValue.group),
                icon:getMyVar('icon',''),
                url:getMyVar('url','hiker://empty##'),
                col_type:getMyVar('col_type',defaultValue.col_type),
                class_parse:getMyVar('class_parse',''),
                class_name:getMyVar('class_name',''),
                class_url:getMyVar('class_url',''),
                sort_url:getMyVar('sort_url',defaultValue.sort_url),
                search_url:getMyVar('search_url',defaultValue.search_url),
                sdetail_find_rule:'*'
            };
            if(!getMyVar('find_rule')){
                newRule.find_rule = 'js:\nrequire(config.自动匹配)\nlet cates=[];\n设置(cates);\n自动一级(null,cates)'
            }else{
                newRule.find_rule = `js:
require(config.模板)
依赖检测();
let p = '${getMyVar("find_rule")}';
true_url = 获取正确链接();
let cates = 打造动态分类([{
一级分类:'',
子分类:'',
}]);
设置(cates);
一级(p,true,cates,null)           
`.trim();
            }
            if(!getMyVar('searchFind')){
                newRule.searchFind = 'js:\nrequire(config.自动匹配)\n自动搜索()'
            }else if(getMyVar('searchFind')==='*'){
                newRule.searchFind = `js:
require(config.模板)
let p = '${getMyVar("find_rule")}';
一级(p,true)           
`.trim();
            }else{
                newRule.searchFind = `js:
require(config.模板)
let p = '${getMyVar("searchFind")}';
一级(p,true)           
`.trim();
            }
            if(!getMyVar('ej_tabs','')||!getMyVar('ej_lists','')){
                // newRule.detail_find_rule = 'js:\nrequire(config.自动匹配)\n//香免();\n//自动二级(lazy);\n自动二级()'
                newRule.detail_find_rule = `js:\nrequire(config.自动匹配)\n//香免();\nvar lazy=$('#noLoading#').lazyRule(()=>{return 'video://'+input});\n自动二级(lazy);\n//自动二级()`
            }else{
                newRule.detail_find_rule = `js:
require(config.自动匹配);
let p = {
title:"${getMyVar('ej_title','')}",
img:"${getMyVar('ej_img','')}",
url:"${getMyVar('ej_url','')}",
desc:"${getMyVar('ej_desc','')}",
content:"${getMyVar('ej_content','')}",
tabs:"${getMyVar('ej_tabs','')}",
tab_text:"${getMyVar('ej_tab_text','')}",
lists:"${getMyVar('ej_lists','')}",
list_text:"${getMyVar('ej_list_text','')}",
tab_id:"${getMyVar('ej_tab_id','')}",
};
// 香免();
// 二级(p,lazy);
二级(p)
`.trim();
            }
            if(!getMyVar('ua')){
                newRule.preRule = "require('"+getVar('editor.jsRoot')+"预处理.js');"
            }else{
                let k = null;
                if(getMyVar("ua")===PC_UA){
                    k = 'PC_UA'
                }else if(getMyVar("ua")===MOBILE_UA){
                    k = 'MOBILE_UA'
                }
                if(k){
                    newRule.preRule = `var ua=${k};\nrequire('${getVar('editor.jsRoot')}预处理.js');`
                }else{
                    newRule.preRule = `var ua='${getMyVar("ua")}';\nrequire('${getVar('editor.jsRoot')}预处理.js');`
                }
            }
            let ruleHead = '海阔视界首页频道规则【'+getMyVar('titile','未命名')+'】￥home_rule￥';
            let rulecode = 'rule://'+base64Encode(ruleHead+JSON.stringify(newRule));
            // log(newRule);
            return rulecode
        },initUiAttr)
    });
    d.push({
        title:'存为模板',
        col_type:'scroll_button',
        url:$('#noLoading#').lazyRule(()=>{
            return $(getMyVar('title','测试模板'),'取一个模板名字吧').input(()=>{
                let mt = input.trim();
                if(!mt){
                    return 'toast://模板名称必填!'
                }
                let fp='hiker://files/rules/dzHouse/json/ruleEditor.json'; //模板文件
                let fpJson = JSON.parse(fetch(fp)||'{}');
                let okeys = Object.keys(fpJson);
                let attrMap = storage0.getMyVar('attrMap',attrMap);
                let keys = Object.keys(attrMap);
                let mtv = {};
                keys.forEach((it)=>{
                    if(getMyVar(it,'')){
                        mtv[it] = getMyVar(it)
                    }
                });
                fpJson[mt] = mtv;

                if(okeys.includes(mt)){
                    return $('模板'+mt+'已存在,是否覆盖保存?').confirm((fp,fpJson)=>{
                        writeFile(fp, JSON.stringify(fpJson));
                        copy(getPath(fp).replace('file://', ''));
                        return 'toast://模板已保存至:' + fp
                    },fp,fpJson)
                }else {
                    writeFile(fp, JSON.stringify(fpJson));
                    copy(getPath(fp).replace('file://', ''));
                    return 'toast://模板已保存至:' + fp
                }
            })
        })
    });
    d.push({
        title:'从模板导入',
        col_type:'scroll_button',
        url:$('#noLoading#').lazyRule(()=>{
            let fp='hiker://files/rules/dzHouse/json/ruleEditor.json'; //模板文件
            let fpJson = JSON.parse(fetch(fp)||'{}');
            let mts = Object.keys(fpJson);
            if(mts.length<1){
                return 'toast://还没保存过模板，暂时无法导入'
            }
            return $(mts, 2, '请选择一个模板').select((fpJson) => {
                let mtAttr = fpJson[input];
                let keys = Object.keys(mtAttr);
                keys.forEach((it)=>{
                    putMyVar(it,mtAttr[it])
                });
                refreshPage(false);
                return 'toast://已导入模板:'+input
            },fpJson)
        })
    });
    d.push({
        title:"模板管理",
        col_type:'scroll_button',
        url:$('#noLoading#').lazyRule(()=>{
            let status = fetch('hiker://home@JSON编辑器');
            let hasJsonEditor = (status && status !== 'null');
            let fp='hiker://files/rules/dzHouse/json/ruleEditor.json'; //模板文件
            if(!hasJsonEditor){
                return 'editFile://'+fp;
            }else{
                return 'hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json='+base64Encode(fp);
            }
        })
    });
    d.push({
        title: '搜索词:'+color(getMyVar('skey','斗罗'),'#ab2415'),
        col_type:'text_3',
        url:$(getMyVar('skey','斗罗'),'请输入搜索关键词').input(()=>{
            putMyVar('skey',input);
            refreshPage(false);
            return 'hiker://empty'
        })
    });
    d.push({
        title:'测试搜索',
        col_type:'text_3',
        url:$('#noLoading#').lazyRule(()=>{
            let key = getMyVar('skey','斗罗');
            let url = getMyVar('url','').replace('hiker://empty##','').split('#')[0];
            let surl = getMyVar('search_url','').replace('hiker://empty##','').split('#')[0];
            if(!url.startsWith('http')){
                if(!surl.startsWith('http')){
                    return 'toast://搜索链接不正确!\n小程序链接异常且搜索链接不是http开头完整链接'
                }
            }else{
                if(!surl){
                    return 'toast://搜索链接不正确!\n不允许为空'
                }
                if(!surl.startsWith('http')){
                    surl = getHome(url) + surl;
                }
            }
            surl = surl.replace('**',key);
            log('搜索链接为:'+surl);
            let homeUrl='hiker://empty##'+surl;//搜索链接避免第一次请求
            var ua = getMyVar('ua','');
            initConfig({
                指定ua:ua,
            });
            if(ua) {
                log('搜索测试指定ua:' + ua);
            }
            // log(homeUrl);
            let p = getMyVar('searchFind','');
            if(p==='*'&&!getMyVar('find_rule','')){
                return 'toast://搜索解析继承一级解析，但一级解析为空!'
            }else if(p==='*'&&getMyVar('find_rule','')){
                p = getMyVar('find_rule');
            }
            // putMyVar('test_mode','true');//设置为测试模式,这样二级才有,道长影视模板有Bug
            clearMyVar('test_mode');
            return $(homeUrl).rule((key,p)=>{
                setPageTitle('搜索测试:'+key);
                // log(MY_URL);
                require(config.自动匹配);
                if(!p){
                    putMyVar('test_mode','true');
                    自动搜索('的结果|搜索|共有|相关');
                }else {
                    var result = 一级(p, true, [], null,null,true);
                    if(Array.isArray(result)&&result.length>0){
                        result = result.filter(it=>it.url);//筛选正常url的
                        result = result.map((it)=>{
                            it.url = $(it.url).rule(()=>{
                                require(config.自动匹配);
                                // requireCache('https://hikerfans.com/lmysdm/lazy.js',24);
                                if(!getMyVar('ej_tabs','')||!getMyVar('ej_lists','')){
                                    自动二级();
                                }else{
                                    let p = {
                                        title:getMyVar('ej_title',''),
                                        img:getMyVar('ej_img',''),
                                        url:getMyVar('ej_url',''),
                                        desc:getMyVar('ej_desc',''),
                                        content:getMyVar('ej_content',''),
                                        tabs:getMyVar('ej_tabs',''),
                                        tab_text:getMyVar('ej_tab_text',''),
                                        // ej_lists:"二级选集列表(#id是线路替换,必然包含)",
                                        lists:getMyVar('ej_lists',''),
                                        list_text:getMyVar('ej_list_text',''),
                                        tab_id:getMyVar('ej_tab_id',''),
                                    };
                                    二级(p);
                                }
                                // 自动二级(lazy);
                            });
                            return it
                        });
                        setResult(result);
                    }

                }
            },key,p)
        })
    });
    d.push({
        title:'测试一二级',
        col_type:'text_3',
        url:$('#noLoading#').lazyRule(()=>{
            let url=getMyVar('url','').trim();
            let homeUrl=url.replace('hiker://empty##','');
            if(!url||!/^http/.test(homeUrl)){
                return 'toast://请输入正确的网页地址'
            }
            var ua = getMyVar('ua','');
            initConfig({
                指定ua:ua,
                // 模板:'http://hiker.nokia.press/hikerule/rulelist.json?id=2505'
            });
            if(ua) {
                log('测试一级指定ua:' + ua);
            }
            return $(homeUrl).rule(()=>{
                setPageTitle('测试');
                require(config.自动匹配);
                if(!getMyVar('find_rule','')){
                    自动一级(null,null,null,true);
                }else{
                    依赖检测();
                    let p = getMyVar('find_rule','');
                    let cates = [];
                    设置(cates);
                    var result = 一级(p, true, cates, null,null,true);
                    if(Array.isArray(result)&&result.length>0){
                        result = result.filter(it=>it.url);//筛选正常url的
                        result = result.map((it)=>{
                            it.url = $(it.url).rule(()=>{
                                require(config.自动匹配);
                                // requireCache('https://hikerfans.com/lmysdm/lazy.js',24);
                                if(!getMyVar('ej_tabs','')||!getMyVar('ej_lists','')){
                                    自动二级();
                                }else{
                                    let p = {
                                        title:getMyVar('ej_title',''),
                                        img:getMyVar('ej_img',''),
                                        url:getMyVar('ej_url',''),
                                        desc:getMyVar('ej_desc',''),
                                        content:getMyVar('ej_content',''),
                                        tabs:getMyVar('ej_tabs',''),
                                        tab_text:getMyVar('ej_tab_text',''),
                                        // ej_lists:"二级选集列表(#id是线路替换,必然包含)",
                                        lists:getMyVar('ej_lists',''),
                                        list_text:getMyVar('ej_list_text',''),
                                        tab_id:getMyVar('ej_tab_id',''),
                                    };
                                    二级(p);
                                }
                                // 自动二级(lazy);
                            });
                            return it
                        });
                        setResult(result);
                    }
                }
            })
        })
    });
    var inputData = initUiAttr();
    var attrMap=storage0.getMyVar('attrMap');
    if(editMode==='简单'){
        inputData.keys = Object.keys(inputData.requiredKeys);
    }
    for(let i in inputData.keys){
        let key = inputData.keys[i];
        let value = attrMap[key];
        let title = inputData.requiredKeys[key]?value+'*':value;
        let desc = inputData.defaultDesc[key]||'';
        d.push({
            title: title,
            col_type: "input",
            url:getInputUrl(key),
            desc: `${value}(${key})${desc}`,
            extra:{
                defaultValue:getMyVar(key,inputData.defaultValue[key]||''),
                onChange:`putMyVar('${key}',input)`,
                // titleVisible: false,
                textSize: 11,
                type: "textarea",
                height:-1,
            }
        });
    }
    setResult(d);
}
