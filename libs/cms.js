var version={
    author:"道长",
    ver:"2.1.0",
    appv:583,
    requireId:"https://dr.playdreamer.cn/js/zyw.js",
    update:'2022/10/10 15:44',
    info:'新开模板，针对资源网采集站.3月20日连夜升级模板，支持xml/json格式的cms采集站。以及v1/v2/app/iptv格式的数据。抄自奇飞。更新插件库为xml2jsonJava\n支持通讯解密,预处理增加debug',
    ua:';get;utf-8;{User-Agent@Mozilla/5.0&&Cookie@}',
    ok:'https://okjx.cc/?url=',
    jsRoot:'https://dr.playdreamer.cn/js/',
};
putVar('zyw依赖',version.requireId);
// http://www.jshaman.com/ 代码加密

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

function right(text) {
    return '<span style="float:right">'+text+'</span>';
}
function blank(){
    return '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
}
function isPic(str){
    return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str);
}
function 是否正版(vipUrl){
    let flag = new RegExp('qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|ixigua\.com|pptv\.com|miguvideo\.com|le\.com|1905\.com|fun\.tv');
    return  flag.test(vipUrl);
}

function 是否切片(vipUrl){
    let ret =  /yanaifei|xinluan|LT|ruifenglb|suoyo|xfy|renrenmi|RongXingVR|xueren|wuduyun|laodi|Naifeimi|daodm|XMMT|v020c/.test(vipUrl);
    return ret
}

function 是否支持魔断(vipUrl){
    return 是否正版(vipUrl)||是否切片(vipUrl)
}
function 是否视频(input){//判断是否视频，实现自动加UA
    const {isVideo} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    let realUrl = isVideo(input);
    if(realUrl&&!/User-Agent/.test(realUrl)){
        realUrl = realUrl+';{User-Agent@Mozilla/5.0}';
    }
    return realUrl;
}
var 取随机列表 = function(arr, num) {
    var sData = arr.slice(0), i = arr.length, min = i - num, item, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        item = sData[index];
        sData[index] = sData[i];
        sData[i] = item;
    }
    return sData.slice(min);
};

var 汉字转数字 = (function(){
    var map = {
        "零": 0, "一": 1, "壹": 1, "二": 2, "贰": 2, "两": 2, "三": 3, "叁": 3,
        "四": 4, "肆": 4, "五": 5, "伍": 5, "六": 6, "陆": 6, "七": 7, "柒": 7,
        "八": 8, "捌": 8, "九": 9, "玖": 9, "十": 10, "拾": 10, "百": 100, "佰": 100,
        "千": 1000, "仟": 1000, "万": 10000, "十万": 100000, "百万": 1000000, "千万": 10000000, "亿": 100000000
    };
    // 解析失败返回-1，成功返回转换后的数字，不支持负数
    function numberDigit(chinese_number) {
        var len = chinese_number.length;
        if (len == 0) return -1;
        if (len == 1) return (map[chinese_number] <= 10) ? map[chinese_number] : -1;
        var summary = 0;
        if (map[chinese_number[0]] == 10) {
            chinese_number = "一" + chinese_number;
            len++;
        }
        if (len >= 3 && map[chinese_number[len - 1]] < 10) {
            var last_second_num = map[chinese_number[len - 2]];
            if (last_second_num == 100 || last_second_num == 1000 || last_second_num == 10000 || last_second_num == 100000000) {
                for (var key in map) {
                    if (map[key] == last_second_num / 10) {
                        chinese_number += key;
                        len += key.length;
                        break;
                    }
                }
            }
        }
        if (chinese_number.match(/亿/g) && chinese_number.match(/亿/g).length > 1) return -1;
        var splited = chinese_number.split("亿");
        if (splited.length == 2) {
            var rest = splited[1] == "" ? 0 : numberDigit(splited[1]);
            return summary + numberDigit(splited[0]) * 100000000 + rest;
        }
        splited = chinese_number.split("万");
        if (splited.length == 2) {
            var rest = splited[1] == "" ? 0 : numberDigit(splited[1]);
            return summary + numberDigit(splited[0]) * 10000 + rest;
        }
        var i = 0;
        while (i < len) {
            var first_char_num = map[chinese_number[i]];
            var second_char_num = map[chinese_number[i + 1]];
            if (second_char_num > 9)
                summary += first_char_num * second_char_num;
            i++;
            if (i == len)
                summary += first_char_num <= 9 ? first_char_num : 0;
        }
        return summary;
    }
    $.exports = numberDigit;
    return $.exports;
})();
//去重（ES6 Set）
function unique2(array){
    return Array.from(new Set(array));
}

function requests(url,paramas){//fetch请求加强版，过宝塔验证
    let html = fetch(url,paramas);
    if (/\?btwaf=/.test(html)) {//宝塔验证
        let ext = 'btwaf'+html.match(/btwaf(.*?)"/)[1];// btwaf=1213242424
        url=/\?/.test(url)?(url+'&'+ext):(url+'?'+ext);
        log("宝塔验证跳转到:"+url);
        html = fetch(url, paramas);
    }
    html = 通讯解密(html);
    return html
}

function isIptv(link){//判断是否为Iptv
    if(/iptv|Chengcheng/.test(link)){
        return true
    }
    let special = [
        'tv.hfys8.vip/api.php/Sntv/vod',//黑锋
        'dsxtv.tv.ci/api.php/dsx/vod',//大师兄
    ];
    for(let url of special){
        if(link.includes(url)){
            return true
        }
    }
    return false;
}

function xml2json(xmlText){//将xml结果转为json的obj对象
    let lib_path = 'hiker://files/rules/dzHouse/html/xml2json.html';
    if(!fetch(lib_path)){
        writeFile(lib_path, fetch('https://dr.playdreamer.cn/html/xml2json.html'));
    }
    if(!xmlText){
        return {}
    }
    putVar('xmlText',xmlText);
    let x5_url=getPath(lib_path);
    let html = fetchCodeByWebView(x5_url);
    let cache_html = 'hiker://files/rules/dzHouse/html/xml2json_cache.html';
    let cache_json = 'hiker://files/rules/dzHouse/html/xml2json_cache.json';
    writeFile(cache_html,html);
    // log(cache_html);
    let ret;
    if(parseInt(getAppVersion())>=2821){//修复webview获取代码的版本
        ret = pdfh(html,'#ret1&&Html');
    }else{
        ret = getVar('xmlRet','{}')
    }
    writeFile(cache_json,ret);
    try {
        let obj = JSON.parse(ret);
        log(cache_json);
        return obj;
    }catch (e) {
        log('尝试Json解析发生了错误:'+e.message);
        return {}
    }
}

function xml2jsonJava(xml) {// java库实现xml转json对象
    let remote = version.jsRoot+"xmljson.dex";
    let file = "hiker://files/cache/xmljson.dex";
    let cls = "com.example.hikerview.service.parser.XmlToJson$Builder";
    requireDownload(remote, file);
    let xml0 = loadJavaClass(file, cls);
    xml0.source(xml);
    let cache_json = 'hiker://files/rules/dzHouse/html/xml2json_cache.json';
    let ret = xml0.build().toString();
    writeFile(cache_json,ret);
    log(cache_json);
    return JSON.parse(ret);
}

function getKey(){//获取所需的key值，当前月日比如0330
    let time_str = $.dateFormat(new Date(),"yyyy-MM-dd HH:mm:ss");
    let tmp = time_str.split(' ')[0].split('-');
    return tmp[1] + tmp[2];
}

function 获取私钥(order){//获取小程序的私钥
    if(typeof(order)==='string' && order.length>=848){//如果传进去的就是私钥，直接返回私钥
        return order
    }
    var pkcs8Private;
    let pkcs8Private1 = `-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAK5WtrOWxP8FHYRu
t+qp2kz0JNfv47nj+EH9R/Ft7E7WeCUC/AcXcjrHQV0JqyAUQRec/7tBZZhOcQff
QB1flDVAsYvz8GlQfEumWK1zmf9YlljzaJq04jPXKVfr9eAiH1lcR1CsYKMqBK9b
W2Xm42QRwSFhijmUlrbNo2Cj1RC9AgMBAAECgYEAiSGQKIcpgWcmpqroY98i5XEN
IgWB3RBikJWH53INdJ3id0p3r6RTp8Rft60JO/xyjv5hcYupPDpHUmfa6L/rtQMi
AAiak6pWPasi+rMWHkWIyAHz3Lxxn89GeX1vC2FNqp9yLdRhc1qO3CMBz4AFiJPk
H2CRqZKNPc3boSW+j4kCQQDZ4j6s98yFErvN1OfJOTAfrfsB4cZdeClt63cxJpWe
cAUMBIGCloed663tgesag7a6X8JTBE2+GupxlT4VIuZDAkEAzNZWgta+H0eN6X7T
pk1Lyt/lrAW/l36PI6ft1y7fpKoJMQVA7sbIG4vHDIFW9EabAnABQ7HH3NiVDVsk
vt48/wJBAM82OnMXKzs3aMJFA7a8G4dVV80fYh6MY6I0+GMXFd3bHQGj22NNM2a9
t+iT0PqjXwl6fn2jLyhnwqUI0UUarq8CQFyT8v2neL5CZM1HWPksrji/ANrCrlkW
BjOjTkeXE9UkVIsnSLWiegaZIhlwy5AT6TMs1CV4UFBsQtGKhA0P/JkCQC28mkKq
uc0mONTWMSenwXHfpAzhOP3l/NxJBkVXPunaOb6kOP7JejGMjMhnRHh4nDiGQRi9
Kfo65lNN215J10s=
-----END PRIVATE KEY-----`;
    switch (order){
        default:
            pkcs8Private = pkcs8Private1;
            break;
    }
    pkcs8Private = pkcs8Private.split('\n').slice(1,-1).join('');
    return pkcs8Private
}

function 通讯解密(data){// 通讯加密，可以解密解析。通吃小龟类app
    order = (typeof (config.order) !== 'undefined' && config.order) ? config.order :false;
    if(/data|list|msg|code|{|}/.test(data)){
        return data
    }
    let pkcs8Private = 获取私钥(order);
    try {
        let decodedData = rsaDecrypt(data, pkcs8Private, {
            config: "RSA/ECB/PKCS1Padding",
            type: 1,
            long: 2
        });
        if(!decodedData){
            log('通讯解密不正确:',decodedData);
        }
        return decodedData||data
    }
    catch (e) {
        log('通讯解密失败:'+e.message);
        return data
    }
}

function 错误(d,msg,url,html,page){//一级分类，数据，以及搜索抛错
    page = page||2;
    if(page===1) {
        d.push({
            title: small(color('返回数据错误,可能是:\t', 'grey')) + small(color('缺UA/网站数据加密/挂了', '#cd6bd0')),
            desc: msg,
            url: $('#noLoading##noRecordHistory##noHistory#').lazyRule((url) => {
                return url
            }, url),
            col_type: 'text_1'
        });
        d.push({
            title: html,
            col_type: 'rich_text'
        });
        setResult(d);
        return true;
    }else{
        setResult([]);
        return false
    }
}

var lsg = evalPrivateJS("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");

function rstrip(str,drop){//去掉右边的字符
    if(drop&&str.endsWith(drop)){
        str = str.substr(0, str.length - 1);
    }
    return str
}
function 依赖检测(titles){ // 一级进行依赖检测，固定写法，废弃原来的检测依赖固定代码
    require(version.jsRoot+'依赖检测.js');
    检测依赖(titles);
}

function 指定类型(cmstype){//在预处理指定cms模板小程序类型
    cmstype = cmstype||false;
    type = (typeof (config.type) !== 'undefined' && config.type) ? config.type :false;
    type = cmstype||type; // 传入指定类型的优先,其次预处理
    if(type){
        v1 = false;
        v2 = false;
        app = false;
        iptv = false;
        log('指定了模板类型为:'+type);
        switch (type){
            case 'v1':
                v1 = true;
                break;
            case 'v2':
                app = true;
                v2 = true;
                break;
            case 'app':
                app = true;
                break;
            case 'iptv':
                iptv = true;
                break;
            default:
            // log('未指定类型，啥也不干');
        }
    }
}

function 一级(cmstype){
    依赖检测(['道长仓库Pro']); // 检测道长仓库依赖
    分类 = (typeof(分类)!=='undefined'&&分类)?分类:false;
    noEj = !!(typeof (config.debug) !== 'undefined' && config.debug);
    MY_URL = MY_URL.split('##').slice(-1)[0];
    var d = [];
    var api = MY_URL.split('#')[0];
    api = rstrip(api,'/');
    // var v1 = api.includes('v1.vod');
    var link = api.replace(/http:\/\/|https:\/\//g,'');
    v1 = link.includes('.vod');
    v2 = link.includes('app.php');
    app = link.includes('/app')||v2;
    iptv = isIptv(link);
    指定类型(cmstype);
    var page = MY_PAGE;
    var ua = v1?'Dart/2.13 (dart:io)':MOBILE_UA;
    ua = (typeof (config.ua) !== 'undefined' && config.ua) ? config.ua :ua;
    var timeout = config.timeout||5000;
    let headers = {
        "User-Agent": ua,
        "Referer": api
    };
    var cates; // 申明分类列表
    var cate_url;//定义分类链接
    if (v1) {
        cate_url = api + '/types';
    } else if (app) {
        cate_url = api + '/nav?token=';
    } else if (iptv) {
        cate_url = api + '/?ac=flitter';
    } else {
        cate_url = api + '?ac=list';
    }
    // log('分类链接:'+cate_url);
    if(page===1) {//在第一页的时候才去请求和渲染分页
        var no_cates = false; //没有分类,默认都有
        // var cate_url = v1?(api+'/types'):(api+'?ac=list');
        var html = requests(cate_url, {headers: headers,timeout:timeout});
        if (/<\?xml/.test(html)) {//返回数据是xml,构造分类json
            let class_list = [];
            pdfa(html, 'rss&&ty').forEach((it) => {
                class_list.push({
                    type_name: pdfh(it, 'ty&&Text'),
                    type_id: pdfh(it, 'ty&&id'),
                });
            });
            html = {class: class_list};
        } else {
            try {
                html = JSON.parse(html);
            } catch (e) {
                no_cates = true;
            }
        }
        if (no_cates) {
            cates = [];
        } else {
            if (v1) {
                let typelist = html.data.list||html.data.typelist;
                cates = typelist.map((it) => {
                    return {type_id: it.type_id, type_name: it.type_name}
                })
            } else if (app) {
                if (v2) {
                    cates = html.data.map((it) => {
                        return {type_id: it.type_id, type_name: it.type_name}
                    })
                } else {
                    let typelist = html.list||html.typelist;
                    cates = typelist.map((it) => {
                        return {type_id: it.type_id, type_name: it.type_name}
                    })
                }
            } else if (iptv) {
                let types = Object.keys(html);
                let type_dict = {
                    comic: '动漫',
                    movie: '电影',
                    tvplay: '电视剧',
                    tvshow: '综艺',
                    movie_4k: '4k',
                    hanguoju: '韩剧',
                    oumeiju: '欧美剧',
                    tiyu: '体育'
                };
                cates = types.filter(it => Object.keys(type_dict).includes(it)).map((it) => {
                    return {type_name: type_dict[it], type_id: it}
                });
                // cates = [{type_name:'电影',type_id:'movie'},{type_name:'连续剧',type_id:'tvplay'},{type_name:'综艺',type_id:'tvshow'},
                //     {type_name:'动漫',type_id:'comic'},{type_name:'4K',type_id:'movie_4k'},{type_name:'体育',type_id:'tiyu'},
                // ];
            } else {
                cates = html.class
            }
        }
        putMyVar('cates',JSON.stringify(cates)); //将分类设置为变量
    }else{
        try {
            cates = JSON.parse(getMyVar('cates','[]'));
        }catch (e) {
            log('取缓存的分类列表出了小问题:'+e.message);
            cates = [];
        }
    }
    let filterType = 分类?new RegExp(分类):/道长yyds/; //8090|电视
    cates = Array.isArray(cates)?cates.filter((it)=>{
        return !分类||!filterType.test(it.type_name)
    }):[]; // 过滤分类
    if(!app) {//app没全部分类
        cates.unshift({
            type_name: '全部',
            type_id: '',
        });
    }
    if(cates.length<1){//没有分类可能是app加密。第1页有html后面没有就需要requests
        return 错误(d,'没有获取到分类',cate_url,html||requests(cate_url, {headers: headers}),page);
    }
    let type_ids = cates.map(it=>it.type_id+'');
    var nowCate = getMyVar('nowCate',''+cates[0].type_id);
    var home_url;
    if(v1){
        home_url = api+'?limit=12&page='+page;
    }else if(app){
        home_url = api+'/video?limit=12&pg='+page;
    }else if(iptv){
        home_url = api+'?ac=list&page='+page;
    }
    else{
        home_url = api+'?ac=videolist&pg='+page;
    }

    if(nowCate&&type_ids.includes(nowCate)){
        if(v1){
            home_url = home_url+'&type='+nowCate;
        }else if(app){
            home_url = home_url+'&tid='+nowCate;
        }else if(iptv){
            home_url = home_url+'&class='+nowCate;
        }else{
            home_url = home_url+'&t='+nowCate;
        }
    }else if(nowCate&&!type_ids.includes(nowCate)){//有当前分类且不包含在分类列表里（轻合集系列)
        putMyVar('nowCate',cates[0].type_id);
        nowCate = cates[0].type_id; //轻合集切换分类,不存在这个分类就清空重置
    }
    // log('主页链接:'+home_url);
    html = requests(home_url,{headers:headers,timeout:timeout});//重新请求主页数据
    if(/<\?xml/.test(html)){//返回数据是xml,构造分类json
        // let tmp = xml2json(html);
        let tmp = xml2jsonJava(html);
        let new_json = tmp.rss.list.video;
        if(!new_json){
            html = {list: []};
        }else {
            if (!Array.isArray(new_json)) {
                new_json = [new_json]
            }
            new_json = new_json.map((it) => {
                return {
                    vod_name: it.name,
                    vod_pic: it.pic,
                    vod_id: it.id,
                    vod_remarks: it.note || it.remarks,
                    vod_blurb: (it.des || it.remarks || it.tag || '').trim(),
                    vod_time: it.last,
                }
            });
            // log(tmp);
            html = {list: new_json};
        }
    }else{
        try {
            html = JSON.parse(html);
        }catch (e) {
            return 错误(d,e.message,home_url,html,page)
        }
    }
    var datas;
    if(v1){
        datas = html.data.list;
    }else if(v2||iptv){//v2和iptv都是data
        datas = html.data;
    }else{
        datas = html.list;//cms和app都是html.list
    }
    if(page===1){
        for(let cate of cates){
            d.push({
                title: (cate.type_id + '') === nowCate ? color(cate.type_name, '#1aad19') : cate.type_name,
                url: $('#noLoading#').lazyRule((cate) => {
                    putMyVar('nowCate', cate.type_id + '');
                    refreshPage(false);
                    return 'hiker://empty'
                }, cate),
                col_type: 'scroll_button'
            });
        }
        d.push({
            col_type:"blank_block",
            extra: {
                lineVisible:false
            }
        });
        d.push({
            title: '♻检测升级',
            desc:'清除所有资源网依赖,等同于长按小程序标题清除缓存',
            col_type: 'scroll_button',
            url: $('#noLoading#').lazyRule(()=>{
                showLoading('升级检测中,请稍等...');
                require(getVar('zyw依赖')); // 读取本地依赖
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
            title:'🗑️清除足迹',
            col_type:'scroll_button',
            url:$('#noLoading#').lazyRule(()=>{
                return $('清除所有cms小程序的二级翻页足迹，是否继续?').confirm(()=>{
                    require(getVar('zyw依赖'));
                    lsg.removeItem('footHistory'); //移除足迹
                    refreshPage(false);
                    return 'toast://已清除足迹'
                })
            })
        });
    }
    if(noEj) {
        log('无需单独写二级[noEj]=>' + noEj);
    }
    if(datas&&Array.isArray(datas)) {
        datas.forEach((it) => {
            let picTmp = iptv?it.pic:it.vod_pic;
            let pic_url = picTmp ? (picTmp + '@Referer=') : "";
            if(pic_url.startsWith('//')){
                pic_url = 'https:'+pic_url
            }
            let title = iptv?it.title:it.vod_name;
            let desc = iptv?it.state:it.vod_remarks;
            let ejUrl;
            if(v1){//.vod的需要加key,干脆全部加了,反正一行代码
                ejUrl = api + '/detail?vod_id=' + it.vod_id+'&token=';
                ejUrl = ejUrl +'&key='+getKey();
            }
            else if(app){
                ejUrl = api + '/video_detail?id=' + it.vod_id+'&token=';
            }else if(iptv){
                ejUrl = it.nextlink.replace('chengcheng','Chengcheng');
            }
            else{
                ejUrl = api + '?ac=videolist&ids=' + it.vod_id
            }
            let playUrl = 'hiker://empty##' + ejUrl+'#immersiveTheme#';
            // 让cms模板测试支持打开二级
            let url = noEj ? $(playUrl).rule(() => {
                require(config['模板']);
                二级();
            }) : playUrl;
            d.push({
                title: title,
                pic_url: pic_url,
                url: url,
                desc: desc,
                content: it.vod_blurb || it.vod_time || '',
                extra: {
                    pic_url: pic_url,
                    name: MY_RULE.title
                }
            });
        });
    }
    setResult(d);
}

function getResCodeA(){//获取源码自动通讯解密
    var html = getResCode();
    html = 通讯解密(html);
    return html
}

function 搜索一级(cmstype,keyParam){
    noEj = !!(typeof (config.debug) !== 'undefined' && config.debug);
    var d = [];
    var api = MY_RULE.url.replace('hiker://empty##','').split('#')[0].split('?')[0];
    api = rstrip(api,'/');
    var link = api.replace(/http:\/\/|https:\/\//g,'');
    // var v1 = api.includes('v1.vod');
    v1 = link.includes('.vod');
    v2 = link.includes('app.php');
    app = link.includes('/app')||v2;
    iptv = isIptv(link);
    指定类型(cmstype);
    var ua = v1?'Dart/2.13 (dart:io)':MOBILE_UA;
    ua = (typeof (config.ua) !== 'undefined' && config.ua) ? config.ua :ua;
    var timeout = config.timeout||5000;
    var nowUrl = MY_URL.replace('hiker://empty##','');
    let headers = {
        "User-Agent": ua,
        "Referer": api
    };
    var key = nowUrl.match(/wd=(.*?)&/)[1]; // 搜索关键字
    var page = parseInt(nowUrl.match(/pg=(\d+)/)[1]);//取出当前页数
    if(MY_URL.startsWith('http')){
        var html = getResCodeA();
    }else{
        // MY_URL = getHome(MY_RULE.url) + MY_URL.replace('hiker://empty##','');
        MY_URL = api + nowUrl;
        if(!v1&&getMyVar(MY_RULE.title,'')==='list'){//非v1获取到被赋值过ac=list
            MY_URL = MY_URL.replace('ac=videolist','ac=list');
        }
        if(v1){
            MY_URL = MY_URL.replace('pg=','limit=20&page=')
        }else if(app){
            MY_URL = api+'/search?pg='+page+'&text='+key+'&token=';
        }else if(iptv){
            MY_URL = api+'/?ac=list&pg='+page+'&zm='+key;
        }
        if(typeof(keyParam)==='string'&&keyParam){
            MY_URL=MY_URL.replace(/wd=|text=|zm=/g,keyParam+'=');
        }
        if(typeof(搜索链接)==='function'){
            MY_URL=搜索链接(MY_URL);
        }
        log('搜索链接: '+MY_URL);
        var html = requests(MY_URL,{headers:headers,timeout:timeout});
    }
    let ret = html;
    try {
        ret = JSON.stringify(JSON.parse(html)); // json转换
    }catch(e){}

    if(!v1&&!app&&!iptv){//cms存在这俩问题
        if(!ret.includes(key)&&!/ac=list/.test(MY_URL)&&(getMyVar(MY_RULE.title,"")!=='list')){//非v1不包含关键词且未被赋值
            MY_URL = MY_URL.replace('ac=videolist','ac=list');
            html = requests(MY_URL,{headers:headers});
        }
        let mode = MY_URL.match(/ac=(.*)/)[1].split('&')[0]; //取出来mode是videlist还是list
        if (ret.includes(key)) {//包含关键字,直接赋值模式
            putMyVar(MY_RULE.title, mode);
        }
    }
    // api = MY_URL.split('?')[0];
    if(/<\?xml/.test(html)){//返回数据是xml,构造分类json
        // let tmp = xml2json(html);
        let tmp = xml2jsonJava(html);
        let new_json = tmp.rss.list.video;
        if(!new_json){
            html = {list: []};
        }else {
            if (!Array.isArray(new_json)) {
                new_json = [new_json]
            }
            new_json = new_json.map((it) => {
                return {
                    vod_name: it.name,
                    vod_pic: it.pic,
                    vod_id: it.id,
                    vod_remarks: it.note || it.remarks,
                    vod_blurb: (it.des || it.remarks || it.tag || '').trim(),
                    vod_time: it.last,
                }
            });
            html = {list: new_json};
        }
    }else{
        try {
            html = JSON.parse(html);
        }catch (e) {
            return 错误(d,e.message,MY_URL,html,page);
        }
    }
    var datas;
    if(v1){
        datas = html.data.list;
    }else if(v2||iptv){ //v2和iptv都是data
        datas = html.data;
    }else{
        datas = html.list;//cms和app.v1都是html.list
    }
    if(datas&&Array.isArray(datas)) {
        datas.forEach((it) => {
            let picTmp = iptv?it.pic:it.vod_pic;
            let pic_url = picTmp ? (picTmp + '@Referer=') : "";
            if(pic_url.startsWith('//')){
                pic_url = 'https:'+pic_url
            }
            let title = iptv?it.title:it.vod_name;
            let desc = iptv?it.state:it.vod_remarks;
            let ejUrl;
            if(v1){//.vod的需要加key,干脆全部加了,反正一行代码
                ejUrl = api + '/detail?vod_id=' + it.vod_id+'&token=';
                ejUrl = ejUrl +'&key='+getKey();
            } else if(app){
                ejUrl = api + '/video_detail?id=' + it.vod_id+'&token=';
            }else if(iptv){
                ejUrl = it.nextlink.replace('chengcheng','Chengcheng');
            } else{
                ejUrl = api + '?ac=videolist&ids=' + it.vod_id
            }
            let playUrl = 'hiker://empty##' + ejUrl+'#immersiveTheme#';
            // 让cms模板测试支持打开二级
            let url = noEj ? $(playUrl).rule(() => {
                require(config['模板']);
                二级();
            }) : playUrl;
            d.push({
                title: title,
                pic_url: pic_url,
                url: url,
                desc: desc,
                content: it.vod_blurb || it.vod_time || it.vod_time_add ||'',
                extra: {
                    pic_url: pic_url,
                    name: MY_RULE.title
                }
            });
        });
    }
    setResult(d);
}
function 通免(vipUrl){//仓库通免
    let {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    return lazyParse(vipUrl);
}

function lazyPlay(tab_name,app,playMode){ // 通免,传递线路名称
    app = app||false; //默认不传就是false
    playMode = playMode||false;
    return $(' ').lazyRule((tab_name,app,playMode)=>{//第二个参数是app，判断是v1,app,v2等
        let vipUrl = input.replace(/hiker:\/\/empty##/g,'').trim();
        require(getVar('zyw依赖'));
        let flag;
        if(/url=/.test(vipUrl)){
            flag = vipUrl.split('url=')[1];
        }else{
            flag = vipUrl;
        }
        // log('playMode:'+playMode);
        if(!app){//不是app就只有智能识别
            // log('flag:'+flag+',vipUrl:'+vipUrl);
            var realUrl = 是否视频(flag);
            // log('realUrl:'+realUrl);
            if (realUrl&&!是否支持魔断(flag)) {//是视频且不支持魔断才返回
                return realUrl
            }else if(!realUrl&&!是否支持魔断(flag)){//不是视频且不支持魔断就通免
                return 通免(vipUrl);
            }else if((!realUrl&&是否支持魔断(flag))||是否支持魔断(flag)){//不是视频且支持魔断
                try {
                    eval("var dpconfig =" + fetch("hiker://files/cache/MyParseSet.json"));
                    eval(fetch(dpconfig.cj));
                } catch (e) {
                    log(e.message);
                    return 'toast://资源网CMS检测播放地址非视频且支持魔断，但魔断环境异常!'
                }
                log('开始魔断解析=> ' + flag);
                return aytmParse(flag);
            }else{
                return 'x5Play://'+vipUrl
            }
        }else {
            let isDp = lsg.getItem('dpswitch', '否') === '是';//是否魔断
            if (playMode && getVar(playMode, '智能识别') === '强制解析') {
                if (!isDp) {
                    log('不用魔断,又强制解析，开始通免:' + vipUrl);
                    return 通免(vipUrl);
                } else {
                    try {
                        eval("var dpconfig =" + fetch("hiker://files/cache/MyParseSet.json"));
                        eval(fetch(dpconfig.cj));
                    } catch (e) {
                        log(e.message);
                        return 'toast://强制解析模式下检测到魔断环境异常!'
                    }
                    log('开始魔断解析=> ' + flag);
                    return aytmParse(flag);
                }
            } else if (playMode && getVar(playMode, '智能识别') === '强制直链') {
                return flag
            } else if (!playMode || getVar(playMode, '智能识别') === '智能识别') {
                let check = app ? isDp : true; //app的需要判断是否魔断，非app全走魔断
                if (check && 是否支持魔断(flag)) {//开了魔断且支持魔断
                    try {
                        eval("var dpconfig =" + fetch("hiker://files/cache/MyParseSet.json"));
                        eval(fetch(dpconfig.cj));
                    } catch (e) {
                        log(e.message);
                        return 'toast://智能识别支持魔断解析但检测到魔断环境异常!'
                    }
                    log('开始魔断解析=> ' + flag);
                    return aytmParse(flag);
                } else {
                    var realUrl = 是否视频(flag);
                    if (realUrl) {
                        return realUrl
                    }

                    if (tab_name && /iframe/.test(tab_name.trim())) {
                        return 通免(vipUrl);
                    }
                    if (/^http/.test(vipUrl)) {
                        return 通免(vipUrl);
                    }
                    return vipUrl
                }
            }
        }
    },tab_name,app,playMode); // 通免
}

function 二级(cmstype){
    MY_PARAMS = MY_PARAMS||{};
    var nowUrl = MY_URL.replace('hiker://empty##','');
    function 足迹处理(){// 足迹处理
        let footHistory = lsg.getItem('footHistory','{}');
        try {JSON.parse(footHistory);}catch (e) {lsg.removeItem('footHistory');footHistory='{}'}//移除足迹
        footHistory = JSON.parse(footHistory);
        putMyVar('选集翻页',footHistory[nowUrl]||'1');
    }
    var d = [];
    var html;
    var api = MY_RULE.url.replace('hiker://empty##','').split('#')[0].split('?')[0];
    api = rstrip(api,'/');
    var link = api.replace(/http:\/\/|https:\/\//g,'');
    var host = getHome(api); // 获取域名
    // log('当前域名:'+host);
    // var v1 = nowUrl.includes('v1.vod');
    // var v1 = nowUrl.includes('.vod');
    v1 = link.includes('.vod');
    v2 = link.includes('app.php');
    app = link.includes('/app')||v2;
    iptv = isIptv(link);
    指定类型(cmstype);
    var ua = v1?'Dart/2.13 (dart:io)':MOBILE_UA;
    ua = (typeof (config.ua) !== 'undefined' && config.ua) ? config.ua :ua;
    var timeout = config.timeout||5000;
    let headers = {
        "User-Agent": ua,
        "Referer": api
    };

    if(MY_URL.startsWith('hiker://empty##')){
        let lastUrl = getMyVar('lastUrl','');
        if(config.html&&lastUrl===MY_URL){
            html = config.html
        }else{
            html = requests(nowUrl,{headers:headers,timeout:timeout});
            putMyVar('lastUrl',MY_URL);
            initConfig({html:html}); // 自动合并注入
            足迹处理();
        }
    }else{
        html=getResCodeA();
        if(getMyVar('lastUrl','')!==MY_URL){
            putMyVar('lastUrl',MY_URL);
            足迹处理();
        }
    }
    var json; //全局变量二级数据
    if(/<\?xml/.test(html)){//返回数据是xml,构造分类json
        // let tmp = xml2json(html);
        let tmp = xml2jsonJava(html);
        let new_json = tmp.rss.list.video;
        if(!new_json){
            setResult([
                {
                    title:'没有片源',
                    pic_url:MY_PARAMS.pic_url,
                    url:MY_PARAMS.pic_url,
                    col_type:'movie_1_vertical_pic_blur'
                },
                {col_type: 'big_blank_block'},
                {
                    title:'啥也没有哟,不信你点击进去看看',
                    col_type:'text_1',
                    url:MY_URL.replace('hiker://empty##',''),
                }]);
            return;
        }
        new_json = [new_json].map((it)=>{
            // 下面是xml2jsonJava所需的判断条件
            let tabs = it.dl.dd;
            let vod_play_from;
            let vod_play_url;
            if(Array.isArray(tabs)){
                vod_play_from = tabs.map(it=>(it.flag||'道长专线')).join('$$$');
                vod_play_url = tabs.map(it=>it.content).join('$$$');
            }else{
                vod_play_from = tabs.flag||'道长专线iframe';
                vod_play_url = tabs.content;
            }
            return {
                vod_name:it.name,
                type_name:it.type||'',
                vod_pic:it.pic,
                vod_id:it.id,
                vod_remarks:it.remarks||it.note,
                vod_blurb:(it.subname||'').trim(),
                vod_tag:it.tag||'',
                vod_time:it.last,
                vod_class:it.class||'',
                vod_content:it.des||'',
                // vod_play_from:it.dt.split(',').reverse().join('$$$'),
                // vod_play_from:it.dt?it.dt.split(',').join('$$$'):'道长专线iframe',
                vod_play_from:vod_play_from,
                // vod_play_url:Array.isArray(it.dl.dd)?it.dl.dd.join('$$$'):it.dl.dd,
                vod_play_url:vod_play_url,
            }
        });
        json = new_json[0];
    }else{
        // var json = JSON.parse(html).list[0];
        // var json = referer.includes('v1.vod')?JSON.parse(html).data.list[0]:JSON.parse(html).list[0];
        if(v2){
            json = JSON.parse(html).data.vod_info;
        } else if(v1||app){//v1和app类似
            json = JSON.parse(html).data;
        } else if(iptv){
            json = JSON.parse(html);//iptv直接返回数据
        }else{
            json = JSON.parse(html);
            if(json.list||Array.isArray(json.list)){
                json = json.list[0];
            }else if(json.data&&json.data.list&&Array.isArray(json.data.list)){
                json = json.data.list[0];
            } else{
                json = [{}]
            }
        }
        // var json = v1?JSON.parse(html).data:JSON.parse(html).list[0];
    }
    if(Array.isArray(json)){//数据可能是个[{}]
        json = json[0]
    }
    var title,pic,desc,info;
    if(iptv){
        title = json.title+'\n'+json.pubtime+'\n'+(json.is_finish?'已完结':'');
        pic = json.img_url?(json.img_url+'@Referer='):"";
        desc = json.type.join(',')+'\n'+(json.trunk||'')+'\n'+json.area.join(',');
        info=json.intro?json.intro.replace(/\\r/g,' ').trim():'暂无详情';
    }else{
        title = json.vod_name+'\n'+(json.vod_remarks||'')+'\n'+(json.vod_class||'');
        pic = json.vod_pic?(json.vod_pic+'@Referer='):"";
        desc = (json.type_name||'')+'\n'+(json.vod_time||'')+'\n'+(json.vod_tag||'');
        info=json.vod_content?json.vod_content.replace(/\\r/g,' ').trim():'暂无详情';
    }
    if(pic.startsWith('//')){
        pic = 'https:'+pic
    }
    if(!/http/.test(pic)&&pic.length>10){
        pic = host+'/'+pic;
    }
    d.push({
        title:small(title),
        pic_url:pic,
        url:'hiker://page/Route?rule=MyFieldᴰⁿ&type=设置#noHistory##noRecordHistory#',
        desc:small(desc),
        col_type:'movie_1_vertical_pic_blur'
    });
    info = pdfh('<span id="ctx">'+info+'</span>','#ctx&&Text').replace(/<p>|<\/p>/g,'');//只取文本，过滤异常的字符串
    let limit_text = info.substring(0,parseInt(lsg.getItem('简介字数','100')))+'...';
    let rich_html = ("剧情简介\t\t\t\t\t"+"<br>").fontcolor("#098AC1")+limit_text.fontcolor("grey").small();
    rich_html = rich_html+"查看详情".fontcolor("#098AC1").small().link($().b64("'").rule(d => setResult(d), [{
        title:info,
        col_type:"long_text"
    }]));
    d.push({
        title:rich_html,
        col_type:"rich_text",
        extra:{
            lineVisible: false,
            textSizeb:11,
            lineSpacing:-11
        },
    });
    if(v1||app||iptv){//v1或者app,iptv都有魔断开关
        d.push({
            title:small(color("当前为V1/APP资源,自带解析。是否启用魔断?\t\t\t\t",'grey'))+color(lsg.getItem('dpswitch','否'),'#d96715'),
            url:$('#noLoading#').lazyRule(()=>{
                require(getVar('zyw依赖'));
                if(lsg.getItem('dpswitch','否')==='否'){
                    lsg.setItem('dpswitch','是');
                }else{
                    lsg.setItem('dpswitch','否');
                }
                refreshPage(true);
                return 'hiker://empty'
            }),
            col_type:"text_1"
        });
        //取parse||parse2 v1和app的播放列表
        if(iptv){
            let videolist = json.videolist;
            let keys = Object.keys(videolist);
            let play_list = [];
            for(let key of keys){
                let plays = videolist[key].map(it=>it.title+'$'+it.url);
                plays = plays.join('#');
                play_list.push(plays);
            }
            Object.assign(json, {
                vod_play_from: keys.join('$$$'),
                vod_play_url: play_list.join('$$$'),
            });
        }else {
            var vod_play_list = v1 ? json.vod_play_list : json.vod_url_with_player;
            if(Object.prototype.toString.call(vod_play_list)==='[object Object]'){
                let tmp = [];
                for(let k in vod_play_list){//不正规的播放列表处理
                    tmp.push(vod_play_list[k]);
                }
                vod_play_list = tmp;
            }
            if(!vod_play_list){
                vod_play_list = [];
                setResult([{
                    title:'无数据:\n'+html,
                    col_type:'rich_text'
                }]);
                return
            }
            writeFile('hiker://files/cache/cms1.html',JSON.stringify(vod_play_list));//写cms二级缓存文件方便调试
            let v1_vod_play_from = v1 ? vod_play_list.map(it => it.from).join('$$$') : vod_play_list.map(it => it.name).join('$$$');
            let v1_vod_play_url = vod_play_list.map(it => it.url).join('$$$');
            let v1_vod_play_urls = vod_play_list.map(it =>it.urls&&Array.isArray(it.urls)?it.urls.map(obj=>(obj.name||'')+'$'+(obj.url||'')).join('#'):'暂无选集$hiker://empty').join('$$$');
            // log(v1_vod_play_urls);
            Object.assign(json, {
                vod_play_from: v1_vod_play_from,
                vod_play_url: v1_vod_play_urls.length>v1_vod_play_url.length?v1_vod_play_urls:v1_vod_play_url,
            });
        }
    }

    let showOrder = getMyVar('顺序','正续')==='逆序'?color('(☆逆序↑)','#228be6'):color('(★正序↓)','#d0aa344');
    String.prototype.replaceAll = function(old,new_str){
        return this.split(old).join(new_str);
    };
    var vod_play_from = json.vod_play_from.replaceAll('$$$$$$$$$','$$$');
    var tabs = vod_play_from.split('$$$'); // 取出来线路列表


    var nowTab = parseInt(getMyVar('nowTab','0')||'0'); //当前线路默认0
    var nowParse='';//当前解析
    var playMode=false;//播放模式
    if((v1||app)&&vod_play_list){
        if(nowTab>vod_play_list.length-1){//线路越界
            nowTab = 0;
            putMyVar('nowTab','0');
            refreshPage(false);
            return;
        }
        let plist = vod_play_list[nowTab];
        // let nowParses = (plist.player_info.parse+','+plist.player_info.parse2).split(',').filter(it=>it);
        let nowParses;
        if(v1){
            nowParses = (plist.player_info.parse+','+plist.player_info.parse2).split(',').filter(it=>it);
        }else{
            nowParses = plist.parse_api?plist.parse_api.split(',').filter(it=>it):[];
        }
        let condition = Array.isArray(nowParses)&&nowParses.length>0;
        // condition = true;
        if(condition){
            nowParses = nowParses.map((it)=>{
                let newUrl = it.replace(/\.\./g,'.').trim();
                if(newUrl&&newUrl.length>8&&newUrl!=='undefined'&&!/^http/.test(newUrl)){
                    newUrl = 'https:'+newUrl;
                    return newUrl
                }else if(/^http/.test(newUrl)){
                    return newUrl
                }else{
                    return ''
                }

            });
            nowParses = unique2(nowParses);//解析去重
            nowParses = nowParses.filter(it=>it);//过滤空字符串
            let v1_path = 'hiker://files/jiexi/v1.txt';
            try {
                let localJxTxt = fetch(v1_path)||'';
                let localJx = localJxTxt.split('\n');
                let addJx = nowParses.filter(it=>!localJx.includes(it)&&!/\/player\/|\/dplayer\/|\/ckplayer\//.test(it));
                if(addJx.length>0){//可以添加到本地的解析
                    let newLocalJx = localJx.concat(addJx);
                    writeFile(v1_path,newLocalJx.join('\n').trim());
                }
            }catch(e){}
            log('当前v1/app线路['+tabs[nowTab]+']解析:'+nowParses);
            if(!getMyVar('nowParse','')){//没有当前应用的解析，随机取一个
                try {
                    // nowParse = 取随机列表(nowParses,1)[0].replace(/\.\./g,'.');
                    nowParse = (Array.isArray(nowParses)&&nowParses.length>0)?取随机列表(nowParses, 1)[0]:'';
                } catch (e) {
                    nowParse = '';
                }
                log('随机取出一个解析:'+nowParse);
            }else if(getMyVar('nowParse','')&&!nowParses.includes(getMyVar('nowParse',''))){//有解析但这个解析不是这个线路的，重置一下
                try {
                    // nowParse = 取随机列表(nowParses,1)[0].replace(/\.\./g,'.');
                    nowParse = (Array.isArray(nowParses)&&nowParses.length>0)?取随机列表(nowParses, 1)[0]:'';
                } catch (e) {
                    nowParse = '';
                }
                putMyVar('nowParse',nowParse)
                log('换线路后随机取出一个解析:'+nowParse);
            }
            let nowParsesSel = nowParses.map(it=>getMyVar('nowParse',nowParse)===it?'👉'+it:it);
            nowParsesSel.push('📝编辑本地已收集解析');
            d.push({
                title:small(color('可选解析列表共计:','grey'))+color(nowParses.length,'#d96715')+small(color('个','grey')),
                col_type:'text_1',
                desc:getMyVar('nowParse',nowParse)?'当前选择:  '+getMyVar('nowParse',nowParse):'',
                url:$(nowParsesSel, 1, '请选1条解析用于'+tabs[nowTab]).select((v1_path)=>{
                    input = input.replace(/👉/g,'');
                    if(/编辑本地/.test(input)){
                        return 'editFile://'+v1_path;
                    }
                    putMyVar('nowParse',input);
                    refreshPage(false);
                    copy(input);
                    return 'hiker://empty'
                },v1_path)
            });

            playMode = MY_RULE.title+'.playMode';
            // log(playMode);
            d.push({
                title: getVar(playMode,'智能识别')==='智能识别'?color('智能识别','#d96715'):'智能识别',
                col_type: 'text_3',
                url:$('#noLoading#').lazyRule((playMode)=>{
                    putVar(playMode,'智能识别');
                    refreshPage(false);
                    return 'hiker://empty'
                },playMode)
            });
            d.push({
                title: getVar(playMode,'智能识别')==='强制解析'?color('强制解析','#d96715'):'强制解析',
                col_type: 'text_3',
                url:$('#noLoading#').lazyRule((playMode)=>{
                    putVar(playMode,'强制解析');
                    refreshPage(false);
                    return 'hiker://empty'
                },playMode)
            });
            d.push({
                title: getVar(playMode,'智能识别')==='强制直链'?color('强制直链','#d96715'):'强制直链',
                col_type: 'text_3',
                url:$('#noLoading#').lazyRule((playMode)=>{
                    putVar(playMode,'强制直链');
                    refreshPage(false);
                    return 'hiker://empty'
                },playMode)
            });

        }else{
            nowParse = '';
        }
    }

    d.push({
        title:small(color('选集列表共计','#098AC1')+color(tabs.length,'#d96715')+color('条线路','#098AC1'))+blank()+right(small(showOrder)),
        col_type:'text_1',
        url:$('#noLoading#').lazyRule(()=>{
            if(getMyVar('顺序','正续')==='逆序'){
                putMyVar('顺序','正续');
            }else{
                putMyVar('顺序','逆序');
            }
            refreshPage(true);
            return 'toast://已切换顺序为:'+getMyVar('顺序','正续')
        }),
        extra:{
            lineVisible:false
        }
    });

    addListener('onClose', $.toString((nowUrl)=>{//监听返回事件
        require(config['模板']);
        let footHistory = lsg.getItem('footHistory','{}');
        try {JSON.parse(footHistory);}catch (e) {lsg.removeItem('footHistory');footHistory='{}'}//移除足迹
        footHistory = JSON.parse(footHistory);
        nowUrl = nowUrl.replace('hiker://empty##','');
        footHistory[nowUrl] = getMyVar('选集翻页','1');
        lsg.setItem('footHistory',JSON.stringify(footHistory));
        putMyVar('选集翻页',footHistory[nowUrl]||'1');
    },MY_URL));


    for(let i in tabs){
        let tab_name = tabs[i];
        d.push({
            title:nowTab===parseInt(i)?color(tab_name,'#09c11b'):color(tab_name,'#098AC1'),
            url:$('#noLoading#').lazyRule((i,tab_name,nowTab)=>{
                if(nowTab===parseInt(i)){
                    return 'toast://吃饱了没事儿干?点什么点!'
                }
                putMyVar('nowTab',''+i);
                refreshPage(false);
                // return 'toast://切换线路为:'+tab_name
                return 'hiker://empty'
            },i,tab_name,nowTab),
            col_type:"scroll_button"
        });
    }
    var vod_play_url = json.vod_play_url?json.vod_play_url.replaceAll('$$$$$$$$$','$$$'):'';
    // log('vod_play_url:'+vod_play_url);
    var lists = vod_play_url.split('$$$'); //可能是空列表
    // log('lists:'+lists);
    if(nowTab>tabs.length-1){//线路超了自动归零
        nowTab = 0;
        putMyVar('nowTab','0');
        refreshPage(false);
        return
    }
    var nowTabName = tabs[nowTab]; // 线路名称
    var list = ['无选集'];
    try {
        list = lists[nowTab].split('#');
    }catch (e) {}

    function force_order(list){//强制正序
        let start = Math.floor(list.length/2); // 0
        let end = Math.min(list.length-1,start+1); // list.slice(-1)[0]
        let first = list[start].split('$')[0];
        let second = list[end].split('$')[0];
        try{
            if(first.match(/(\d+)/)&&second.match(/(\d+)/)){ //数字章节的
                if(parseInt(first.match(/(\d+)/)[0])>parseInt(second.match(/(\d+)/)[0])){
                    list.reverse()
                }
            }else{ // 中文转换
                if(汉字转数字(first)>汉字转数字(second)){
                    list.reverse()
                }
            }
        }catch(e){}
        return list
    }
    //强制正序当前线路下的选集列表
    if(list.length>1) {
        list = force_order(list)
    }

    var rlist=[];//定义最新章节列表
    for (let i in tabs) {
        let tlist = [];
        try {
            tlist = lists[i].split('#');
        }catch (e) {}
        if (tlist.length > rlist.length) {
            rlist = tlist
        }
    }
    if(rlist.length<1){
        rlist = ['无选集'];
    }

    let showList = list;
    // 设置动态最新章节
    setLastChapterRule('js:' + $.toString((newCap,MY_PARAMS) => {
        MY_PARAMS = MY_PARAMS||{};
        let ruleName = (MY_PARAMS.name||MY_RULE.title);
        var newtips = "更新至"+newCap;
        if(ruleName!==MY_RULE.title){
            newtips = ruleName+'|'+newtips
        }
        setResult(newtips);
    }, rlist.slice(-1)[0].split('$')[0],MY_PARAMS));

    let 翻页阀值 = Number(lsg.getItem('翻页阀值',40));
    let 每页数量 = Number(lsg.getItem('每页数量',40));
    let 最大页数 = Math.ceil(list.length/每页数量);
    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
    if(nowPage>最大页数){ //防止切换线路导致页数数组越界
        nowPage = 最大页数
    }
    // 禁止 动态列表使用翻页功能填false
    var canPage = true;
    if(!canPage&&getMyVar('选集显示', '分页') === '分页'){
        putMyVar('选集显示', '全部');
    }
    if(list.length>翻页阀值&&getMyVar('选集显示', '分页') === '分页'){
        let maxNum = 每页数量*nowPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = list.slice((nowPage-1)*每页数量,maxNum);
    }
    if (getMyVar('顺序', '正续') === '逆序') {
        showList = showList.reverse();
    }
    var col_type = lsg.getItem('按钮样式','');
    // 数量超过设置开始渲染分页组件
    let pageTitleInfo = '';
    function jumpToPageOld(每页数量,toPage,nowPage,pageTitleInfo){//跳页旧版
        if(nowPage===toPage){
            return //跳转页数等于当前页，不操作
        }
        let toDeleteIds = (findItemsByCls('playList')||[]).map(it=>it.extra.id);
        // log(toDeleteIds);
        // deleteItemByCls('playList');
        let showList = storage0.getMyVar('showList'); //获取储存的选集列表
        let maxNum = 每页数量*toPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = showList.slice((toPage-1)*每页数量,maxNum);
        if (getMyVar('顺序', '正续') === '逆序') {
            showList = showList.reverse();
        }
        let pageTitle = pageTitleInfo.replace('$page',getMyVar('选集翻页', '1')).replace('$cnt',showList.length);
        pageTitle = pageTitle.replace(/““””/g,'');
        updateItem('pageTitle',{
            title:pageTitle
        });
        if(Array.isArray(showList)&&showList.length>0){
            addItemAfter('page',showList);
        }
        deleteItem(toDeleteIds);
    }
    function jumpToPage(每页数量,toPage,nowPage,pageTitleInfo){//跳页
        if(nowPage===toPage){
            return //跳转页数等于当前页，不操作
        }
        // showLoading(`正在前往第${toPage}页,请稍等`);
        let oldIds = (findItemsByCls('playList')||[]).map(it=>it.extra.id);//老元素ids
        let showList = storage0.getMyVar('showList'); //获取储存的选集列表
        let maxNum = 每页数量*toPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = showList.slice((toPage-1)*每页数量,maxNum);
        if (getMyVar('顺序', '正续') === '逆序') {
            showList = showList.reverse();
        }
        let toDeleteIds = [];//待删除的旧id
        let toAddDatas = [];//待新增的新数据
        if(oldIds.length > showList.length){
            toDeleteIds = oldIds.slice(showList.length);
        }else if(oldIds.length < showList.length){
            toAddDatas = showList.slice(oldIds.length)
        }
        let cnt = Math.min(oldIds.length,showList.length);
        let pageTitle = pageTitleInfo.replace('$page',getMyVar('选集翻页', '1')).replace('$cnt',showList.length);
        pageTitle = pageTitle.replace(/““””/g,'');
        updateItem('pageTitle',{
            title:pageTitle
        });
        if(toDeleteIds.length>0){//有删除的先删除
            deleteItem(toDeleteIds);
        }
        if(toAddDatas.length>0){//有新增的先新增
            addItemAfter(oldIds[cnt-1],toAddDatas);
        }
        for(let i=0;i<cnt;i++){//最后顺序更新
            updateItem(oldIds[i],showList[i]);
        }
        // updateItem(oldIds.slice(0,cnt),showList.slice(0,cnt));//批量更新?试了不行
        // hideLoading();
    }
    if(list.length>Number(lsg.getItem('每页数量',40))&&canPage) {
        var showCol = 'avatar';
        var showPic = '';
        var pageTitle = '';
        function setTitle(){
            if(showCol==='avatar'){
                pageTitle = pageTitle.replace(/““””/g,'');
                showPic = 'https://hikerfans.com/tubiao/ke/123.png';
            }
        }
        if (getMyVar('选集显示', '分页') === '分页') {
            pageTitleInfo = color('翻页模式已启用  本页:','#585858')+color('$cnt', '#d96715')+color('  共计:','#585858')+color(list.length, '#d96715')+color('集  第:','#585858') + color('$page'+'/'+最大页数, '#d96715')+color('页','#585858');
            pageTitleInfo = small(pageTitleInfo);
            pageTitle = pageTitleInfo.replace('$page',getMyVar('选集翻页', '1')).replace('$cnt',showList.length);
            setTitle();
        } else {
            pageTitle = color('翻页模式已关闭,点击启用','#585858');
            pageTitle = small(pageTitle);
            setTitle();
        }
        d.push({
            title: pageTitle,
            col_type: showCol,
            pic_url:showPic,
            url: $('确认切换分页显示状态?').confirm(() => {
                putMyVar('选集显示', getMyVar('选集显示', '分页') === '分页' ? '全部' : '分页');
                refreshPage(false);
                return 'hiker://empty'
            }),
            extra:{
                id:'pageTitle'
            }
        });

        if (getMyVar('选集显示', '分页') === '分页') {
            d.push({
                title: '✈️跳集',
                col_type: "text_5",
                url: $(list.length,'请输入要跳转到的集数').input((max,每页数量,pageTitleInfo,jumpToPage)=>{
                    if(isNaN(parseInt(input))){
                        return 'toast://输入有误,请输入一个1~'+max+'的数字'
                    }
                    let toNum = parseInt(input);
                    if(toNum<1||toNum>max){
                        return 'toast://输入有误,请输入一个1~'+max+'的数字'
                    }
                    let toPage = Math.ceil(toNum/每页数量);
                    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                    putMyVar('选集翻页', '' + toPage);
                    // refreshPage(false);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'toast://已跳到列表元素第'+toNum+'个所在页码:'+toPage
                },list.length,每页数量,pageTitleInfo,jumpToPage)
            });
            d.push({
                title: '🔝跳页',
                col_type: "text_5",
                url: $(1,'请输入要跳转到的页数').input((最大页数,每页数量,pageTitleInfo,jumpToPage)=>{
                    if(isNaN(parseInt(input))){
                        return 'toast://输入有误,请输入一个1~'+最大页数+'的数字'
                    }
                    let toPage = parseInt(input);
                    if(toPage<1||toPage>最大页数){
                        return 'toast://输入有误,请输入一个1~'+最大页数+'的数字'
                    }
                    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                    putMyVar('选集翻页', '' + toPage);
                    // refreshPage(false);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'toast://已跳到第'+toPage+'页'
                },最大页数,每页数量,pageTitleInfo,jumpToPage)
            });
            d.push({
                title: '⏮️上页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((每页数量,pageTitleInfo,jumpToPage) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = nowPage - 1;
                    if(toPage>0) {
                        putMyVar('选集翻页', '' + toPage);
                        // refreshPage(false);
                        jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                        return 'hiker://empty'
                    }else{
                        return 'toast://已经没有上一页了!'
                    }
                },每页数量,pageTitleInfo,jumpToPage)
            });
            d.push({
                title: '⏭️下页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((最大页数,每页数量,pageTitleInfo,jumpToPage) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = nowPage + 1;
                    if(toPage>最大页数){
                        return 'toast://已经没有下一页了!'
                    }
                    putMyVar('选集翻页', '' + toPage);
                    // refreshPage(false);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'hiker://empty'
                },最大页数,每页数量,pageTitleInfo,jumpToPage)
            });
            d.push({
                title: '🔚尾页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((最大页数,每页数量,pageTitleInfo,jumpToPage) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = 最大页数;
                    putMyVar('选集翻页', ''+toPage);
                    // refreshPage(false);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'toast://已跳转到第'+最大页数+'页'
                },最大页数,每页数量,pageTitleInfo,jumpToPage)
            });
            d.push({
                col_type:"line_blank",
                extra:{
                    id:'page' // 给翻页组件做id用
                }
            })
        }
    }
    // 预加载通免附加
    let isApp = v1||app||v2||iptv;
    // log('是否app:'+isApp);
    // log('1259 playMode:'+playMode);
    if(iptv||getMyVar('nowParse',nowParse)) {
        var playLazy = (typeof (lazy) !== 'undefined' && lazy) ? lazy : lazyPlay(nowTabName, isApp,playMode);
    }else{
        var playLazy = (typeof (lazy) !== 'undefined' && lazy) ? lazy : lazyPlay(nowTabName,false,playMode);
    }

    function renderList(showList){//渲染列表
        let allList = [];
        // 渲染选集列表
        for (let j in showList) {
            let it = showList[j];
            let tmp = it.split('$');
            let name = tmp.length>1?tmp[0]:nowTabName;
            let id = tmp.length>1?tmp[1]:tmp[0];
            let playUrlId = isApp?(getMyVar('nowParse',nowParse)||'')+id:id;
            let colt = col_type?col_type:(showList.length > 50 ? "flex_button" : "text_4");
            let blockRules = [];
            if(!是否支持魔断(id)){ // 为了兼容聚合解析
                blockRules = ['baidu.*.png', '.mp3', '.mp4', '.m3u8', '.flv', '.avi', '.3gp', '.mpeg', '.wmv', '.mov', '.rmvb', '.gif', '.png', '.ico', '.svg'];
            }
            allList.push({
                title: name,
                url: playUrlId + playLazy,
                col_type: colt,
                extra: {
                    id:id,
                    cls:'playList',
                    ua:MOBILE_UA,
                    jsLoadingInject: true,
                    blockRules: blockRules
                }
            });
        }
        return allList
    }
    d = d.concat(renderList(showList));
    storage0.putMyVar('showList',renderList(list));
    // 处理足迹遮挡选集问题
    d.push({
        col_type: 'big_blank_block'
    });
    // 处理底部搜索框挡住卡片的问题
    d.push({
        col_type: 'long_text'
    });
    setResult(d);
}
