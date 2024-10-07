//============免嗅调用============
//－－－=^_^=

var version = "3.49221205";//1205

var updateDate = '2022/12/05/ 13:18';
var _mySet = {
    qju: '默认',
    oth:'道长仓库通免',
    cjcache: 'hiker://files/cache/Parse_Dn.js',
    themecache: 'hiker://files/cache/MyTheme.json',
    jiexicache: 'hiker://files/cache/MyJiexi.json',
    x5cache: 'hiker://files/cache/Parse_Dn.html',
    dmCache: 'hiker://files/cache/diaomao.txt',
    oldConfig: 'hiker://files/cache/MyParseSet.json',
    ckLink: 'https://code.aliyun.com/AI957/Hiker/raw/master/v/',
    // cj: 'https://code.aliyun.com/AI957/Hiker/raw/master/v/CloudParse-V2_Dn.js',
    cj: 'https://dr.playdreamer.cn/dp/Parse_Dn.js',
    // x5Url: 'https://code.aliyun.com/AI957/Hiker/raw/master/v/Parse_Dn.html',
    x5Url: 'https://dr.playdreamer.cn/html/Parse_Dn-vue.html',
    parseRoute: 'hiker://files/rules/DuanNian/MyParse.json',
    // x5Route: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/cache/Parse_Dn.html'
    x5Route: getPath('hiker://files/cache/Parse_Dn.html'),
    batchRoute:getPath('hiker://files/cache/plscParse.html')
};
var MyParseS = {};
var mySet = _mySet;
if (fileExist(_mySet.parseRoute)) {
    eval('var parseFile =' + fetch(_mySet.parseRoute));
    MyParseS = parseFile.codes;
    mySet = parseFile.settings;
}
var parseTitle = [
    "yun1717",
    "PanGu",
    "FuXing",
    "isVideo",
    "defaultParse",
    "道长仓库通免",
    "timeOut",
    "源码匹配",
    "defaultParseWeb",
    "OK解析",
    "M3U8TV",
];
//－－－=^_^=

//接口设置.

var setUrl = "hiker://page/Route?rule=MyFieldᴰⁿ&type=设置#noRecordHistory#";
var set_switch = setUrl;
var lazy = `eval('var config_dp =' + fetch(getVar('oldConfig')));eval(fetch(config_dp.cj));aytmParse(input)`;

//var parwix = `var yurl='https://daili.mayixiongdi.cn/?url=';Referer': 'https://www.mayixiongdi.cn/ys?id=';'https://daili.mayixiongdi.cn/api.php', 'Referer':'https://daili.mayixiongdi.cn';
// 全民https://pcvideoaliyun.tianshangrenjian.mgtv.com.88wuma.com/?url=

//－－－备 用－－－
/*
 * 影视工场： https://ysgc.cc/
 * 江湖: 555电影 https://www.555dy2.com/phone.html ｜ 17看 http://17kanyy.cn/ http://jhjiexi.30vr.cn/?url= ｜ http://api.maizimall.com/index.php?url=
 * 江湖: http://www.tianshuyun.net/index.php/vod/play/id/448377/sid/1/nid/1.html
 * 江湖2: http://98hyk.cn/index.php/vod/play/id/72841/sid/1/nid/1.html
 * 人人迷: https://vip.susou.tv/player/?url= ｜ https://www.momdm.cc/
 *
 * wuigen: https://www.5igen.com/dmplayer/player/?url=
 * 干饭(人人迷): https://jx.zui.cm/?url=
 * https://2.66movie.top/player/?url=
 *
 */


var tools = {
    MD5: function(data) {
        eval(getCryptoJS());
        return CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);
    },
    AES: function(text, key, iv, isEncrypt) {
        eval(getCryptoJS());
        var key = CryptoJS.enc.Utf8.parse(key);
        var iv = CryptoJS.enc.Utf8.parse(iv);
        if (isEncrypt) {
            return CryptoJS.AES.encrypt(text, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        };
        return CryptoJS.AES.decrypt(text, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    },
    //ascii
    nextCharacter: function(asciiValue, k) {
        var s = asciiValue;
        return String.fromCharCode(s + k);
    },
    //凯撒
    caesarCipher: function(stringValue, k) {
        var newString = "";
        for (var i = 0; i < stringValue.length; i++) {
            newString += this.nextCharacter(stringValue[i].charCodeAt(), k);
        }
        return newString;
    },
    nowDate: function() {
        var date1 = new Date();
        var dateStr = "";
        if (date1) {
            dateStr = date1.getFullYear();
            var month = date1.getMonth() + 1;
            var day = date1.getDate();
            if (month < 10) {
                dateStr += "-0" + month;
            } else {
                dateStr += "-" + month;
            }
            if (day < 10) {
                dateStr += "-0" + day;
            } else {
                dateStr += "-" + day;
            }
        }
        return dateStr;
    },
    nowDateStr:function (){ // 利用$工具获取格式化后的当前时间
        return  $.dateFormat(new Date(),"yyyy-MM-dd HH:mm:ss");
    },
    toJSON: function(json) {
        return JSON.stringify(json, (key, value) => {
            if (typeof value == 'function') {
                return value.toString();
            } else {
                return value;
            }
        }, 4);
    },
    toVNum: function(a) {
        var a = a.toString();
        var c = a.split('.');
        var num_place = ["", "0", "00", "000", "0000"],
            r = num_place.reverse();
        for (var i = 0; i < c.length; i++) {
            var len = c[i].length;
            c[i] = r[len] + c[i];
        }
        var res = c.join('');
        return res;
    },
    cprVersion: function(a, b) {
        var _a = parseInt(this.toVNum(a)),
            _b = parseInt(this.toVNum(b));
        b = isNaN(_b) ? version : b;
        if (_a > _b) {
            putVar('jxNewV', '有新版本: ' + a);
        } else {
            clearVar('jxNewV');
        }
        putVar('jxOldV', b);
    },
    atob:function (str){
        require('https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js');
        return Base64.atob(str);
    },
    btoa:function (str){
        require('https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js');
        return Base64.btoa(str);
    },
    江湖:function (config_url, tem, token) {
        require('https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js');
        var atob=Base64.atob;
        var btoa=Base64.btoa;
        var config_a = tem || "ffsirllq";
        var video = '';
        var tem = [];
        var config_arry = [];
        var config_b = config_a.length;
        if (token == 0x1) {
            var config_url = atob(config_url);
        } else {
            var config_url = encodeURIComponent(config_url);
        }
        var config_c = config_url.length;
        for (i = 0x0; i < 0x100; i++) {
            tem[i] = config_a[i % config_b].charCodeAt();
            config_arry[i] = i;
        }
        for (j = i = 0x0; i < 0x100; i++) {
            j = (j + config_arry[i] + tem[i]) % 0x100;
            tmp = config_arry[i];
            config_arry[i] = config_arry[j];
            config_arry[j] = tmp;
        }
        for (a = j = i = 0x0; i < config_c; i++) {
            a = (a + 0x1) % 0x100;
            j = (j + config_arry[a]) % 0x100;
            tmp = config_arry[a];
            config_arry[a] = config_arry[j];
            config_arry[j] = tmp;
            k = config_arry[(config_arry[a] + config_arry[j]) % 0x100];
            video += String.fromCharCode(config_url[i].charCodeAt() ^ k);
        }
        log(decodeURIComponent(video));
        if (token == 0x1) {
            return decodeURIComponent(video);
        } else {
            return btoa(video);
        }
    }
};
if (getVar("jxOldV", "0") != version) {
    putVar('cjCache', _mySet.cjcache);
    putVar('x5Cache', _mySet.x5Cache);
    putVar('oldConfig', _mySet.oldConfig);
    putVar('parseRoute', _mySet.parseRoute);
    // let jxNewV = fetch('https://gitee.com/Duan-Nian/Dn/raw/master/hikerview/ParseVersion.txt');
    let jxNewV = fetch('https://dr.playdreamer.cn/dp/ParseVersion.txt');
    let jxOldV = (fetch(_mySet.cjcache).split('version = "')[1] + '').split('"')[0];
    tools.cprVersion(jxNewV, jxOldV);
}

var ParseS = {};
var originalParseS = {
    // updateDate: updateDate,
    parseLc:'https://code.aliyun.com/AI957/Hiker/raw/master/p/parseLc.js',
    CityIP: 'http://pv.sohu.com/cityjson',
    pcUA: 'User-Agent@Mozilla/5.0 (Windows NT 10.0\；\； WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
    cacheM3u8: function(vUrl, ref) {
        let paramas = ref?{headers:{Referer:ref}}:{};
        return cacheM3u8(url, paramas)
    },
    isVideo:function(playUrl){
        const {isVideo} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
        return isVideo(playUrl)
    },
    timeOut:function () {
        const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");
        return parseInt(lsg.getItem('timeout', '5000'));  //超时
    },
    源码匹配:function (vipUrl,regex,pos,headers){
        if(!regex||!vipUrl){
            return 'toast://解析播放链接和正则匹配字符串必填!'
        }
        if((!pos&&pos!==0)||(pos&&typeof(pos)!="number")){//match匹配位置
            pos = 1
        }
        headers = headers||{};
        headers['User-Agent'] = headers['User-Agent']||MOBILE_UA;
        let html = fetch(vipUrl, {headers:headers,timeout:this.timeOut()});
        try {
            let realUrl = html.match(new RegExp(regex))[pos];
            return this.isVideo(realUrl);
        } catch (e) {
            log(e.message);
            return vipUrl;
        }
    },
    defaultParse: function(url,timeout) {
        return ParseS.defaultParseWeb(url,timeout);
    },
    defaultParseWeb: function(playUrl,timeout,extra) {
        // log('传入defaultParseWeb的超时:'+timeout);
        timeout = parseInt(timeout)||parseInt(getVar('dp.jxTimeout','5000'))||5000;
        extra = extra||{};
        let playUrlList = extra.playUrlList||[];
        if(typeof(playUrlList)==='object'&&playUrlList.length>0){
            playUrlList.unshift(playUrl);
            let playUrls=playUrlList.slice(0,4);
            let names=extra.nameList.slice(0,4);
            // log('开始批量解析(已去重,只取前3个备胎，加道长群:486722328获取最新魔断动态):'+names);
            playUrls=playUrls.map((it,id)=>it+";"+names[id]);
            //log(playUrls);
            const {LazyParseFast} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
            let ret = LazyParseFast(playUrls,timeout,timeout);
            if(typeof(ret)==='object'&&ret.length>0){
                //return ret[0]
                //log(ret);
                let v = getAppVersion();
                if(parseInt(v)>=2194&&ret.length>1){
                    let urls = Array.from(new Set(ret));
                    names=urls.map((it,id)=>it.split("★").length>1?it.split("★")[1]:"线路:"+parseInt(id+1));
                    urls=urls.map(it=>it.split("★")[0]);
                    let headers = urls.map((it)=>{
                        if(!/;/.test(it)||it.split(';').length<2){
                            return {}
                        }else{
                            let head = it.split(';')[1];
                            if(!/@/.test(head)||!/{|}/.test(head)){
                                return {}
                            }
                            head=head.split("{")[1].split("}")[0];
                            //head = head.replace(/{|}/g,'');
                            head = head.split('&&');
                            let obj = {};
                            for(let i in head){
                                let key = head[i].split('@')[0];
                                let value = head[i].split('@')[1].replace(/;/,'；；');
                                obj[key] = value;
                            }
                            return obj
                        }
                    });
                    urls = urls.map((it)=>{
                        let turl=it.split(';')[0];
                        if(it.includes("#isVideo=true#")&&!turl.includes("#isVideo=true#")){
                            turl+="#isVideo=true#";
                        }
                        return turl
                    });
                    return JSON.stringify({urls:urls,headers:headers,names:names});
                }else{
                    return ret[0].split("★")[0]
                }
            }else{
                return ret
            }
        }else{
            const {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
            let x5Play=lazyParse(playUrl,timeout);
            if(typeof(x5Play)=="undefined"||!x5Play){
                return "toast://道长仓库解析失败"
            }
            let tips=/x5Rule|webRule/.test(x5Play)?"x5/web免嗅开始":"极速免嗅探完毕，地址:"+(/^http/.test(x5Play)?x5Play:'非正常链接');
            log(tips);
            return x5Play;
        }
    },
    "maoss":
        function (jxurl, ref, key) {
            return this.猫(jxurl, ref, key)
        },
    免嗅:function(vipUrl,k){
        k=k||"url";
        try{
            let realUrl=JSON.parse(fetch(vipUrl))[k];
            if(realUrl.startsWith('/')){
                realUrl = 'https://'+realUrl;
            }
            return this.isVideo(realUrl)||"";
        }catch(e){
            //log(e.message);
            return ""
        }
    },
    X5:function(vipUrl,ref){// https://api.52wyb.com/webcloud/?v=http://vip.1905.com/play/691940.shtml http://www.cdcer.net/
        let _x5 = $.toString((vipUrl) => {
            if(!location.href.includes(vipUrl)){
                location.href = vipUrl;
            }
            if(window.count == null){
                window.count=1;
            }
            window.count++;
            if( window.count >= 20){
                fba.log("未获取到资源地址，跳到解析页");
                return vipUrl
            }
            var urls = _getUrls();
            for (var i in urls) {
                if (!/playm3u8|m3u8\.tv/.test(urls[i]) && urls[i].match(/\.mp3|\.mp4|\.m3u8|\.flv/)) {
                    fba.log(urls[i]);
                    return urls[i]
                }
            }
        },vipUrl);
        let playUrl = ref?ref:vipUrl;
        let x5Url = 'webRule://'+playUrl+ '@' +_x5;
        showLoading('魔断.js嗅探中...');
        return x5Url
    },
    '道长':function (vipUrl){
        evalPrivateJS('zSWve+eeA6iL+f2fGTI+1pR8jnLd0SiyV6yvgcPMWwBMP5aYpqhTFbISxnvhb0bd5VgizyUMHe4dmsnGhWLBkqfb5HfNbIW4MBMxzLpP/9TjNT8SIQAfjdTj4P8oX35ekKNvGVxDolyfcYrpoKwNoQ==');
        return this.免嗅(vipUrl+'&secret='+secret)
    },
    '猫':function (jxurl, ref, key) {
        try {
            var getVideoInfo = function (text) {
                return tools.AES(text, key, iv);
            };
            let headers = {headers: {"Referer": ref||''}};
            key = key == undefined ? "dvyYRQlnPRCMdQSe" : key;
            var html = ref?request(jxurl, headers):request(jxurl);
            if (/&btwaf=/.test(html)) {
                html = request(jxurl + "&btwaf" + html.match(/&btwaf(.*?)"/)[1], headers);
            }
            var iv = html.split("_token = \"")[1].split("\"")[0];
            eval(html.match(/var config = {[\s\S]*?}/)[0] + "");
            if (!/^http/.test(config.url)) {
                config.url = decodeURIComponent(tools.AES(config.url, key, iv));
            }
            return config.url;
        }
        catch (e) {
            // return "";
            return jxurl;
        }
    },
    LLQ: function(jxurl) {
        try {
            var api = jxurl.split('?url=')[0] + "api.php";
            var b64id = base64Encode(jxurl.split('url=')[1]);
            var parseid = tools.caesarCipher(b64id, -1);
            var json = JSON.parse(request(api, {
                headers: {
                    'Referer': jxurl
                },
                method: 'POST',
                body: 'url=' + parseid
            }));
            url = (json.code == 200 ? base64Decode(tools.caesarCipher(json.url, -1)) : '');
            return url;
        } catch (e) {
            return '';
        }
    },
    PanGu: function(vipUrl, data) {
        try {
            /*var ref = 'https://www.pangujiexi.com/';
            var parse = 'https://panguapi.ntryjd.net/jiexi/?url=' + vipUrl;
            var api = 'https://panguapi.ntryjd.net/jiexi/api.php';
            */
            //var ref = 'https://xmystv.com/';
            //var parse = 'https://www.99kpw.com/pangu/index.php?url=' + tailUrl;
            //var api = 'https://www.99kpw.com/pangu/api.php';
            var parse = 'https://www.pangujiexi.com/pangu/?url=' + vipUrl;
            var api = 'https://panguapi.ntryjd.net/pangu2021/api.php';
            if (data) {
                ref = data[0];
                parse = data[1];
                api = data[2];
            }
            var Time = (Math.floor(new Date().getTime() / 1000) * 1).toString();
            var url = JSON.parse(request(api, {
                headers: {
                    'Referer': parse
                },
                body: 'url=' + vipUrl + '&referer=' + base64Encode(parse) + '&ref=1&time=' + Time + '&type=&other=' + base64Encode(vipUrl) + '&ios=0',
                method: 'POST'
            })).url;
            return url;
        } catch (e) {
            return '';
        }
    },
    yun1717: function (vipUrl) {
        var isyk = vipUrl.indexOf('youku');
        var ref = "https://www.1717yun.com/jx/ty.php?url=" + vipUrl;
        var parse = "https://1717yun.com.zh188.net/0828/?url=" + vipUrl;
        var api = "https://1717yun.com.zh188.net/1004/..index..php";
        return isyk == -1 ? this.PanGu(vipUrl, [ref, parse, api]) : this.PanGu(vipUrl, [ref + ',vip:', parse + ',vip:', api]);
    },
    OK解析:'https://okjx.cc/?url=',
    M3U8TV:'https://jx.m3u8.tv/jiexi/?url=',
    道长仓库通免:function (url,timeout){
        return ParseS.defaultParseWeb(url,timeout);
    },
    FuXing: function(vipUrl) {
        try {
            //if(vipUrl.indexOf('v.youku')!=-1){
            //    vipUrl = (JSON.parse(request(vipUrl, {redirect:false, withHeaders:true})).headers.location + '').replace(/\?.*/,'');
            //}
            var ref = 'https://jx.xuetuiguang.cn/jiexi/?url=' + vipUrl;
            var parse = ref;
            var api = 'https://jx.xuetuiguang.cn/jiexi/apiu_fx.php';
            return this.PanGu(vipUrl, [ref, parse, api]);
        } catch (e) {
            return '';
        }
    },
};

Object.assign(ParseS, originalParseS, MyParseS);
//覆盖顺序，第三个覆盖第二个然后覆盖第一个


function aytmParse(vipUrl,strTitle,timeout,playUrl) {
    // 参数1:正版网址地址 参数2 定向解析接口名称 参数3 x5解析超时 参数4 完整的播放链接
    strTitle = strTitle||'';
    vipUrl = decodeURIComponent(vipUrl);
    if(!/miguvideo/.test(vipUrl)){
        vipUrl=vipUrl.split('#')[0].split('?')[0];
    }
    playUrl=decodeURIComponent(playUrl)||vipUrl||'';
    // log('传入aytmParse的超时:'+timeout);
    timeout = parseInt(timeout)||parseInt(getVar('dp.jxTimeout','5000'))||5000;

    //-------------------------------------------------
    let jxsRoute = "hiker://files/cache/MyJiexi.json";
    let MyJiexi = {};
    let jiexis = {};
    try {
        MyJiexi = JSON.parse(fetch(jxsRoute));
        jiexis = MyJiexi.jiexis.filter(it=>it.name===MyJiexi.now)[0];
    }catch (e) {}
    function getPlayJx(key){
        let playUrlList = [];//批量播放地址列表
        let nameList = [];
        let jxs = jiexis[key]; // 适用于这个网站的解析列表
        if(jxs){
            for(let i in jxs){
                if(typeof ParseS[jxs[i]] == 'string'&&ParseS[jxs[i]].match(/http.*?=/)){
                    playUrlList.push(ParseS[jxs[i]]+vipUrl);
                    nameList.push(jxs[i]);
                }
            }
        }
        // return playUrlList
        return {playUrlList:playUrlList,nameList:nameList}
    }
    function getLazyList(key){//只获取备胎列表的免嗅探解析列表
        let parses = [];
        let jxs = jiexis[key]||[]; // 适用于这个网站的解析列表
        // log(jxs);
        if(jxs){
            for(let i in jxs){
                if(typeof ParseS[jxs[i]] == 'function'&&!/通免/.test(ParseS[jxs[i]].toString())){
                    parses.push({
                        name:jxs[i],
                        // rule:ParseS[jxs[i]]
                    })
                }
            }
        }
        return parses
    }
    var extra = {};
    var parses = []; //免嗅探列表
    //-------------------------------------------------------
    if(!strTitle){
        if(/LT/.test(vipUrl)){
            str = mySet.lt;
            extra = getPlayJx('lt');
            parses = getLazyList('lt',str);
        } else if(/renrenmi/.test(vipUrl)){
            str = mySet.rr;
            extra = getPlayJx('rr');
            parses = getLazyList('rr',str);
        }else if(/wuduyun/.test(vipUrl)){
            str = mySet.wd;
            extra = getPlayJx('wd');
            parses = getLazyList('wd',str);
        }else if(/yanaifei|xinluan|LT|ruifenglb|suoyo|xfy|renrenmi|RongXingVR|xueren|wuduyun|laodi|Naifeimi|daodm|XMMT|v020c/.test(vipUrl)){
            str = mySet.oth;
            extra = getPlayJx('oth');
            parses = getLazyList('oth',str);
        }else{
            var host;
            try{
                host = vipUrl.match(/\.(.*?)\//)[1];
            }catch(e){
                if(!/^http/.test(playUrl)){
                    return "断插调用失败！\n非正常的vip正版地址且未识别原站解析播放地址";
                }else{
                    return ParseS.道长仓库通免(playUrl,timeout)
                }
            }
            //host = decodeURIComponent(host);
            switch (mySet.qju) {
                case "默认":
                    switch (host) {
                        case "qq.com":
                            str = mySet.tx;
                            extra = getPlayJx('tx');
                            parses = getLazyList('tx');
                            break;
                        case "iqiyi.com":
                            str = mySet.qy;
                            extra = getPlayJx('qy');
                            parses = getLazyList('qy');
                            break;
                        case "youku.com":
                            str = mySet.yk;
                            extra = getPlayJx('yk');
                            parses = getLazyList('yk');
                            break;
                        case "alizy":
                            str = mySet.al;
                            extra = getPlayJx('al');
                            parses = getLazyList('alizy');
                            break;
                        case "mgtv.com":
                            str = mySet.mg;
                            extra = getPlayJx('mg');
                            parses = getLazyList('mg');
                            break;
                        case "bilibili.com":
                            str = mySet.bl;
                            extra = getPlayJx('bl');
                            parses = getLazyList('bl');
                            break;
                        case "sohu.com":
                            str = mySet.sh;
                            extra = getPlayJx('sh');
                            parses = getLazyList('sh');
                            break;
                        case "tv.sohu.com":
                            str = mySet.sh;
                            extra = getPlayJx('sh');
                            parses = getLazyList('sh');
                            break;
                        case "ixigua.com":
                            str = mySet.xg;
                            extra = getPlayJx('xg');
                            parses = getLazyList('xg');
                            break;
                        case "pptv.com":
                            str = mySet.pp;
                            extra = getPlayJx('pp');
                            parses = getLazyList('pp');
                            break;
                        case "miguvideo.com":
                            str = mySet.mi;
                            extra = getPlayJx('mi');
                            parses = getLazyList('mi');
                            break;
                        case "le.com":
                            str = mySet.le;
                            extra = getPlayJx('le');
                            parses = getLazyList('le');
                            break;
                        case "1905.com":
                            str = mySet.one;
                            extra = getPlayJx('one');
                            parses = getLazyList('one');
                            break;
                        case "fun.tv":
                            str = mySet.fun;
                            extra = getPlayJx('fun');
                            parses = getLazyList('fun');
                            break;
                        default:
                            str = mySet.oth;
                            extra = getPlayJx('oth');
                            parses = getLazyList('oth');
                            break;
                    }
                    break;
                default:
                    str = mySet.qju;
                    break;
            }
        }
    }else{
        log('魔断执行定向解析线路头:'+strTitle);
        str = strTitle;
    }
    let withBatch = !!(MyJiexi.isAuto && MyJiexi.autoMode === '速度优先');
    let withBatchOrder = !!(MyJiexi.isAuto && /顺序优先|嗅探优先/.test(MyJiexi.autoMode));
    let singleBack = MyJiexi.singleBack||false; //吊毛模式。单个结果直接返回，停止后面的
    let ignore_mx = MyJiexi.ignore_mx||false; //忽略免嗅,嗅探优先模式使用
    let use_mx = !(MyJiexi.autoMode === '嗅探优先' && MyJiexi.ignore_mx); // 只要不是免嗅优先模式下的忽略免嗅,都使用免嗅
    let dmPath = 'hiker://files/cache/diaomao.txt';//吊毛模式过滤文件路径
    let dmUrls;
    try {
        dmUrls = fetch(dmPath).trim().split('\n').filter(it=>it&&!it.startsWith('//'));
    }catch (e) {
        dmUrls = [];
    }
    function hasDm(videoUrl,dmUrls){//播放地址是否为吊毛视频
        if(dmUrls.length<1){
            return false
        }
        for(let dmUrl of dmUrls){
            if((new RegExp(dmUrl)).test(videoUrl)){//播放地址包含吊毛标志的地址
                return true
            }
        }
        return false
    }

    function unique2(array){//去重函数
        return Array.from(new Set(array));
    }
    function ArrSet(Arr, id) {//对象数组去重
        var obj = {};
        const arrays = Arr.reduce((setArr, item) => {
            obj[item[id]] ? '' : obj[item[id]] = true && setArr.push(item);
            return setArr;
        }, []);
        return arrays;
    }
    function sortByKey(array, key, order) {//对象数组按某个键值排序
        return array.sort(function(a, b) {
            var x = parseInt(a[key].match(/(\d+)/)[1]);//修复大于10出问题
            var y = parseInt(b[key].match(/(\d+)/)[1]);
            // log('x:'+x+",y:"+y);
            if (order) {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            } else {
                return ((x < y) ? ((x > y) ? 1 : 0) : -1)
            }
        })
    }
    if (typeof ParseS[str] == 'function') { // 主配置放免嗅才会触发(不太友好,躺平不想优化)
        if(/通免/.test(str)){
            return ParseS[str](vipUrl,timeout);
        }
        var url;
        var task = function(obj) {
            eval('var config_dp =' + fetch(getVar('oldConfig')));
            eval(fetch(config_dp.cj));
            return aytmParse(obj.vipUrl,obj.name,obj.timeout);
        };
        let t = (new Date()).getTime();
        if (Array.isArray(extra.playUrlList) && extra.playUrlList.length > 0) {
            extra.nameList = unique2(extra.nameList);
            extra.playUrlList = unique2(extra.playUrlList);
        }else{
            extra.nameList = [];
            extra.playUrlList = [];
        }
        function getMyUrls(urls){
            return urls.map((it) => {
                let turl = it.split(';')[0];
                if (it.includes("#isVideo=true#") && !turl.includes("#isVideo=true#")) {
                    turl += "#isVideo=true#";
                }
                return turl
            });
        }

        function getMyHeaders(urls){
            return urls.map((it) => {
                if (!/;/.test(it) || it.split(';').length < 2) {
                    return {}
                } else {
                    let head = it.split(';')[1];
                    if (!/@/.test(head) || !/{|}/.test(head)) {
                        return {}
                    }
                    head = head.split("{")[1].split("}")[0];
                    //head = head.replace(/{|}/g,'');
                    head = head.split('&&');
                    let obj = {};
                    for (let i in head) {
                        let key = head[i].split('@')[0];
                        let value = head[i].split('@')[1].replace(/;/, '；；');
                        obj[key] = value;
                    }
                    return obj
                }
            });
        }

        function getMyPlayUrlList(){
            if(Array.isArray(extra.playUrlList)){
                // return extra.playUrlList.map(it=>'video://'+it.replace('?url=','?id='+t+'&url=').replace('?v=','?id='+t+'&v='));
                return extra.playUrlList.map(it=>'video://'+it);
            }
            return []
        }


        if(!withBatchOrder||strTitle) {//不开多线路顺序优先或者指定了解析
            url = ParseS[str](vipUrl,timeout);
        }
        else{//开了多线路顺序优先执行免嗅多任务
            if(typeof ParseS[str] == 'function'&&!/通免/.test(ParseS[str].toString())){
                parses.unshift({name:str}); //把主配置的免嗅探加入到多任务列表
            }
            parses = ArrSet(parses,'name'); //去重
            if(use_mx) { // 如果使用免嗅,先多任务跑免嗅
                var count = parses.length; //设置任务数量
                log('魔断开启多任务解析,任务数量:' + count);
                log('解析列表:' + JSON.stringify(parses));
                var parseRet = []; //解析结果列表
                let tasks = parses.map((it, idex) => {
                    return {
                        func: task,
                        param: {
                            name: it.name,
                            // rule:it.rule,
                            vipUrl: vipUrl,
                            timeout: timeout
                        },
                        id: "task" + idex
                    }
                });
                showLoading("魔断并发解析中，剩余解析:" + count);

                function isDm(ret) {
                    if (!ret) {
                        return true
                    }
                    return hasDm(ret.split('#')[0].split(';')[0], dmUrls)
                }

                be(tasks, {
                    func: function (obj, id, error, ret) {
                        log("监听到任务" + id + '已结束,error:' + error + ',ret:' + ret);
                        ret = ret || '';
                        parseRet.push({
                            task: id,
                            ret: ret,
                            name: tasks.filter(it => it.id === id)[0].param.name
                        });

                        if (singleBack) {//吊毛模式开始的话,判断ret有效性
                            log('任务' + id + '结果是吊毛?' + isDm(ret));
                            if (!isDm(ret) && ParseS.isVideo(ret.split('#')[0].split(';')[0])) {
                                hideLoading();
                                log('吊毛模式中断解析并返回视频' + ret);
                                return 'break'
                            }
                        }
                        count -= 1; //完成了任务，任务数量-1
                        //log(obj);
                        if (count > 0) {
                            showLoading("魔断并发解析中，剩余解析:" + count)
                        } else {
                            hideLoading();
                        }
                    },
                    param: {//传到监听函数的obj参数里
                        hi: "ccc",
                    }
                });//执行多任务
                // let valuable = parseRet.filter(it=>/m3u8|mp4/.test(it.ret));
                log("多任务执行结果数:" + parseRet.length);
                let valuable = [];
                parseRet.forEach((it)=>{
                    if(it.ret){
                        if(/names/.test(it.ret)&&/urls/.test(it.ret)){
                            log('尝试聚合解析解包:'+it.ret);
                            try {
                                let rets = JSON.parse(it.ret.replace(/#isVideo=true#/g,''));
                                rets.names.forEach((name,idex)=>{
                                    valuable.push({
                                        name:name,
                                        ret:rets.urls[idex],
                                        task:it.task,
                                    });
                                });
                            }catch (e) {
                                log('解包发生错误:'+e.message);
                            }
                        }else if(ParseS.isVideo(it.ret.split('#')[0].split(';')[0])){
                            valuable.push(it);
                        }else if(it.ret.startsWith('video://')){
                            valuable.push(it);
                        }
                    }
                });
                // let valuable = parseRet.filter(it => it.ret && ParseS.isVideo(it.ret.split('#')[0].split(';')[0]));
                valuable = valuable.filter(it => !isDm(it.ret));//过滤吊毛视频
                log('多任务顺序执行有效结果:' + JSON.stringify(valuable));
                if (valuable.length > 1) {//多线路
                    valuable = sortByKey(valuable, 'task', true);//升序排列
                    let urls = valuable.map(it => it.ret);//取出链接,缓存前的
                    if (getVar('dp.cacheVideo', 'true') === 'true' && parseInt(getAppVersion()) >= 2255) {//开始缓存
                        log("尊敬的魔断用户，视频缓存已启用，请尽情享受看剧时光");
                        let videosCache = urls.map((it) => {
                            let headers = {};
                            if (it.split(";").length > 1) {
                                let head = it.split(';')[1];
                                if (/@/.test(head) && /{|}/.test(head)) {
                                    //head = head.replace(/{|}/g,'');
                                    head = head.split("{")[1].split("}")[0];
                                    head = head.split('&&');
                                    for (let i in head) {
                                        let key = head[i].split('@')[0];
                                        let value = head[i].split('@')[1].replace(/;/, '；；');
                                        headers[key] = value;
                                    }
                                }
                            }
                            return {
                                url: it.split(";")[0].split("#")[0],
                                options: {
                                    headers: headers
                                }
                            }
                        });
                        var data = batchCacheM3u8(videosCache);
                        data = data.map((it, id) => {
                            let extra = "";
                            if (urls[id].split(";").length > 1) {
                                extra = ";" + urls[id].split(";")[1];
                            } else if (urls[id].split("★").length > 1) {
                                extra = "★" + urls[id].split("★")[1];
                            }
                            if (it + "" !== "null") {
                                return it + extra
                            } else {
                                return urls[id]
                            }
                        });
                        urls = data
                    }
                    // log('排序完毕后结果:'+JSON.stringify(valuable));
                    let names = valuable.map(it => it.name);
                    let headers = getMyHeaders(urls);
                    urls = getMyUrls(urls);
                    if(MyJiexi.autoMode === '嗅探优先'){
                        urls = urls.concat(getMyPlayUrlList());
                        names = names.concat(extra.nameList);
                        // headers = headers.concat(extra.nameList.map((it)=>{return {}}));
                    }
                    return JSON.stringify({urls: urls, headers: headers, names: names});

                } else if (valuable.length === 0) {
                    if (extra.nameList.length < 1) {
                        hideLoading();
                        return 'toast://芭比Q了,多任务免嗅解析全军覆没并且没有可用的json|x5解析了'
                    }
                    showLoading("魔断多任务免嗅失败,尝试json|x5");
                    //排除第一个
                    let extra2 = {
                        nameList: extra.nameList,
                        playUrlList: extra.playUrlList.slice(1),
                    }
                    if(MyJiexi.autoMode === '嗅探优先'){
                        return JSON.stringify({
                            urls: getMyPlayUrlList(),
                            names: extra.nameList
                        });
                    }else{
                        return ParseS.defaultParseWeb ? ParseS.defaultParseWeb(extra.playUrlList[0], timeout, extra2) : extra.playUrlList[0];
                    }
                    // log(extra.playUrlList[0]);
                    // log(extra2);

                } else {
                    // 免嗅后只有一个结果,嗅探优先自动拼x5和json, 顺序优先自动返回一个播放链接
                    if(MyJiexi.autoMode === '嗅探优先') {
                        let urls = valuable.map(it => it.ret);//取出链接,缓存前的
                        let names = valuable.map(it => it.name);
                        let headers = getMyHeaders(urls);
                        urls = getMyUrls(urls);
                        names = names.concat(extra.nameList);
                        urls = urls.concat(getMyPlayUrlList());
                        // headers = headers.concat(extra.nameList.map((it)=>{return {}}));
                        return JSON.stringify({
                            urls: urls,
                            names: names,
                            headers:headers
                        });
                    }else{
                        return valuable[0].ret
                    }
                }
            }else{ // 纯video://分支
                if (extra.nameList.length < 1) {
                    hideLoading();
                    return 'toast://芭比Q了,多任务免嗅解析全军覆没并且没有可用的json|x5解析了'
                }
                log("魔断多任务免嗅失败,尝试json|x5");
                return JSON.stringify({
                    urls: getMyPlayUrlList(),
                    names: extra.nameList
                });
            }
        }
        if(/^hiker:|^toast:|^rule:|^x5Rule:|^webRule:|^select/.test(url)){
            return url;
        }
        if(!url&&!/^http/.test(vipUrl)){
            return 'toast://魔断解析失败>'+vipUrl
        }
        // log(vipUrl+'免嗅探结果:'+url);
        if (/^\//.test(url)) {
            url = 'https:' + url
        }
        // 魔断免嗅截取
        // if (/=http/.test(url)) {
        //     url = /&url=/.test(url) ? url : 'http' + decodeURIComponent(url.split('=http')[1]);
        // }
        /*if(url.match(/mgtv.com/g)=='mgtv.com'){
            url = url + ';{Referer@https://www.mgtv.com}';
        } else */
        if (/\.flv/.test(url)&&!/User-Agent/.test(url)) {
            url = url + ';{User-Agent@app&&Referer@' + vipUrl + '}';
        }
        if (url === '' || url === vipUrl) {
            return vipUrl;
        } else if(!/#isVideo=true#/.test(url)){
            return url + '#isVideo=true#';
        }else{
            return url
        }
    } else if (typeof ParseS[str] == 'string'&&ParseS[str].match(/http.*?=/)) {
        // log("断插开始通用执行免嗅 defaultParseWeb:"+timeout);
        //log("默认x5"+ParseS.defaultParseWeb);
        if(withBatch){ // 速度优先
            if(Array.isArray(extra.playUrlList)&&extra.playUrlList.length>0){
                extra.playUrlList = extra.playUrlList.filter(it=>it!==(ParseS[str]||str) + vipUrl);
                let nameList = extra.nameList;
                nameList.unshift(str);
                extra.nameList=unique2(nameList);
                extra.playUrlList = unique2(extra.playUrlList);
            }
        }else{
            extra = {}
        }
        return ParseS.defaultParseWeb?ParseS.defaultParseWeb((ParseS[str]||str) + vipUrl,timeout,extra):(ParseS[str]||str) + vipUrl;
    } else if(typeof(str)==='string'&&str.length>1&&(typeof ParseS[str]=='undefined'||!ParseS[str])&&!/^http/.test(str)){
        return 'toast://请先进行断插配置确保该解析存在!\n检测到无效的解析配置:'+str;
    }else {
        return ParseS.defaultParse(str + vipUrl,timeout);
    }
}

var playParse = {
    player_xx: function(jurl, Label) {
        return $(jurl).lazyRule((k) => {
            var jsUrl = JSON.parse(fetch(getVar('oldConfig'))).cj;
            var Label = k;
            var fa = ['letv', 'pptv', 'qq', 'youku', 'qiyi', 'iqiyi', 'mgtv', 'bilibili', 'sohu', 'migu', 'm1905', 'vip'];
            var html = parseDom(request(input), Label);
            eval(html.replace(/player_.*?={/, 'pdata={'));
            eval(fetch(jsUrl));
            if (pdata.url.substr(0, 8).match(/JT..JT../)) {
                pdata.url = base64Decode(pdata.url);
            }
            if (pdata.url.substr(0, 8).match(/%..%../)) {
                pdata.url = unescape(pdata.url);
            }
            if (fa.includes(pdata.from)) {
                return aytmParse(pdata.url);
            } else {
                return pdata.url + '#isVideo=true#';
            }
        }, Label)
    }
};
function mzPopup() {
    /*
    if (getVar("ijk-tx", "") == "1") {
        setItem("tixing", "1")
        clearVar("ijk-tx")
    }
    if (getItem("tixing", "") == "") {
        confirm({
            title: '免责声明',
            content: '本程序不提供视频解析服务\n所有内容均从用户分享中收集\n仅供测试和学习交流\n\n确定即认可，不再提醒',
            confirm: $.toString(() => {
                putVar("ijk-tx", "1");
                refreshPage(false);
                return "toast://点击了确认"

            })
        })
    }
     */
}
/*
if (!getVar("tixing")) {
    mzPopup();
    putVar('tixing','ok');
}
*/
function saveButton(content,name) {
    name = name||'';
    var data = content.split('★★★');
    if (data.length === 2) {
        var _dt = parsePaste(data[0]);
        content = _dt.substr(0, 6) !== 'error:' ? _dt : '';
    }
    data = content.split('★');
    var type = data[0];
    var arrList = [];
    var objCode = {};
    if (data.length > 2 && data[0] !== '直链') {
        var objKey = data[1];
        var objValue = data[2];
        if (type === 'MyParseS') {
            objValue = base64Decode(objValue);
        }
        if (objValue.split('function').length > 1) {
            eval('objValue=' + objValue);
        }
        arrList.splice(0, 0, objKey); //添加项目非删除
        objCode[objKey] = objValue;

    } else if (type === '直链') {
        arrList = data;
        arrList.splice(0, 1);
    } else {
        arrList = null;
    }
    if (arrList != null) {
        var parseRoute = getVar('parseRoute');
        eval('var json =' + fetch(parseRoute));
        Array.prototype.remove = function(val) {
            let index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        if(name){//删除名称列表和代码
            json.title.remove(name);
            delete json.codes[name];
        }
        arrList = arrList.concat(json.title);
        json.title = Array.from(new Set(arrList));
        Object.assign(json.codes, objCode);
        if (type === '测试') {
            eval('var config =' + fetch(getVar('oldConfig')));
            eval(fetch(config.cj));
            if (typeof ParseS[data[1]] == "function") {
                return ParseS[data[1]](data[2]);
            } else {
                return ParseS.defaultParseWeb(ParseS[data[1]] + data[2]);
            }
        } else {
            writeFile(parseRoute, $.stringify(json));
            return "toast://已保存内容";
        }
    } else {
        return "toast://无法识别这个内容呢"
    }
}
// 以下代码千万不要放出来否则报错
if (getItem('updateDate') != updateDate) {
// if (true) {
    // 把function变成string
    let functionCode = saveButton + ';'+mzPopup;
    // writeFile('hiker://files/cache/plscParse.html', fetch(_mySet.ckLink + 'plscParse.html'));
    setItem('myFunction', functionCode);
    setItem('updateDate', updateDate);
}
var bjItem = {
    hfPlugin: function(parseRoute) {
        return $('#noLoading#').lazyRule((k) => {
            if (fileExist(k)) {
                var cjcache = getVar('cjCache');
                eval('var json =' + fetch(k));
                json.settings.cj = cjcache;
                writeFile(k, $.stringify(json));
                var oldRoute = getVar('oldConfig');
                var oldConfig = json.settings;
                oldConfig.cj = cjcache;
                writeFile(oldRoute, $.stringify(oldConfig));
                refreshPage(false);
                return 'toast://恢复成功';
            } else {
                return 'toast://需要先拉取列表'
            }
        }, parseRoute)
    },
    pullCode: function(k) {
        return $('#noLoading#').lazyRule((k) => {
            var pullMode = k[0];
            var parseRoute = k[1];
            var parseFile = fetch(parseRoute);
            if (!parseFile) {
                var settings = fetch(getVar('oldConfig'));
                settings = !settings ? {} : JSON.parse(settings);
                var json = {};
                json.settings = settings;
                json.title = [];
                json.codes = {};
            } else {
                eval('var json =' + parseFile);
            }
            var parseTitle = [];
            var parseCode={};
            var cjLink = getVar('pluginLink');
            try {
                if(/@base64:\/\//.test(cjLink)){
                    eval(base64Decode(cjLink.split('@base64://')[1]));
                }else if(/插件名/.test(cjLink)){
                    let realLink = cjLink.split('插件名')[0].replace(/[\s]/g,'');
                    log('解析云剪切板:'+realLink);
                    let yPaste = parsePaste(realLink);
                    if(/@base64:\/\//.test(yPaste)){
                        try {
                            eval(base64Decode(yPaste.split('@base64://')[1]));
                            if(typeof ParseS==='undefined'){
                                return 'toast://拉取个鸡毛插件,里面连ParseS对象都没有!'
                            }
                        }catch (e) {
                            return 'toast://鸡毛插件执行报错:\n'+e.message;
                        }
                    }else{
                        return 'toast://未能识别云剪切板中的内容:\n'+yPaste.substring(0,100);
                    }
                } else if (cjLink === 'Q神') {
                    let jiexi = fetch('hiker://files/jiexi/jiexi.txt').split('\n');
                    for (i in jiexi) {
                        let title=jiexi[i].split('&&')[0];
                        let code=jiexi[i].split('&&')[1];
                        parseTitle.push(title);
                        parseCode[title]=code;
                    }
                }
                // }else if(/^#[a-zA-Z0-9]{2,10}$/.test(cjLink)){//福利口令2到10位
                else if(/^#[\S]{2,10}$/.test(cjLink)){//福利口令2到10位任意非空字符串
                    const {taskCall, taskRun,taskReq} = $.require("hiker://page/taskCall?rule=道长仓库Pro");
                    // log('开始执行任务仓库获取断念插件福利口令');
                    let result = taskCall(17,'DnFuli',[cjLink]);
                    if (result.status === 0) {
                        let ret = JSON.parse(result.result);
                        // log(ret);
                        if(ret.opt==='error'){
                            return 'toast://'+ret.msg;
                        }else if(ret.opt==='url'){
                            let html = fetch(ret.ret);
                            let arr = html.includes('http')? html:base64Decode(html);
                            let jiexi = arr.match(/[\S]*?,.*?[\s]/g);
                            for (let i in jiexi) {
                                let title=jiexi[i].split(',')[0];
                                let code=jiexi[i].split(',')[1].split("\n")[0];
                                if(!/^http|function/.test(code)&&code.length>20){//base64编码的函数
                                    code = base64Decode(code);
                                }
                                parseTitle.push(title);
                                parseCode[title]=/function/.test(code)?eval(code):code;
                            }
                        }else if(ret.opt==='jx'){
                            if(/[\S]*?,http[\S]/.test(ret.ret)){
                                let title = ret.ret.split(',')[0];
                                let code = ret.ret.split(',')[1].split('\n')[0];
                                parseTitle.push(title);
                                parseCode[title]=code;
                            }else if(/^http/.test(ret.ret)){
                                let title = cjLink.split('#')[1];
                                let code = ret.ret.split('\n')[0];
                                parseTitle.push(title);
                                parseCode[title]=code;
                            }else{
                                return 'toast://未知的福利:\n'+ret.ret;
                            }
                        }else if(ret.opt==='vipJx'){
                            let title = cjLink.split('#')[1];
                            let code = ret.ret;
                            // log(code);
                            parseTitle.push(title);
                            parseCode[title]=/function/.test(code)?eval(code):code;
                        }
                    }else{
                        return 'toast://仓库非最新版或者福利社功能开发中'
                    }
                }else if(cjLink==='断插'){
                    eval(fetch("hiker://files/cache/Parse_Dn.js"));
                    parseTitle=Object.keys(ParseS);
                }else if(/^hiker:\/\/|^file:\/\/|^http|^\/storage\/|^\/sdcard\//.test(cjLink)){
                    if(/^\/storage\/|^\/sdcard\//.test(cjLink)){
                        cjLink = 'file://'+cjLink;
                    }
                    eval(fetch(cjLink));
                    parseTitle=Object.keys(ParseS);
                }else{
                    return 'toast://拉取口令有误'
                }
            } catch (e) {
                log(e.message);
            }
            var jxJudge = typeof ParseS == 'object';
            var lbJudge = typeof(parseTitle) == 'object';
            if (jxJudge || lbJudge) {
                // if (pullMode === '列表') {
                //     if (!lbJudge) {
                //         parseTitle = Object.keys(ParseS);
                //     }
                //     var newParseTitle = json.title.concat(parseTitle);
                //     json.title = Array.from(new Set(newParseTitle));
                // }
                // 不管拉取代码还是列表都要把列表拉了
                if (!lbJudge) {
                    parseTitle = Object.keys(ParseS);
                    log(parseTitle);
                }
                var scObject = ["CityIP", "pcUA", "cacheM3u8","isVideo","timeOut","源码匹配", "defaultParse","defaultParseWeb","maoss", "LLQ","parseLc"];
                parseTitle = parseTitle?parseTitle.filter(it=>!scObject.includes(it)):[];
                var newParseTitle = json.title.concat(parseTitle);
                json.title = Array.from(new Set(newParseTitle));

                if (pullMode === '代码') {
                    if (typeof originalParseS == 'object') {
                        for (let i in scObject) {
                            delete originalParseS[scObject[i]];
                        }
                        // originalParseS =originalParseS.filter(it=>!scObject.includes(Object.getOwnPropertyNames(it)[0]));
                        Object.assign(json.codes, originalParseS);
                    } else {
                        if(typeof(ParseS)=="undefined"){
                            Object.assign(json.codes, parseCode);
                            //return "toast://没有代码，不可拉取"
                        }else{
                            Object.assign(json.codes, ParseS);
                        }
                    }
                }
                //var newFile = tools.toJSON(json);//自定义stringify函数，带有转义字符
                var newFile = $.stringify(json); //JSON.parse会报错
                writeFile(parseRoute, newFile);
                refreshPage(false);
                return 'toast://拉取' + pullMode + '成功';
            } else {
                return 'toast://未获取到对象';
            }
        }, [k, _mySet.parseRoute])
    },
    pullScript: function(cj, x5) {
        return $('#noLoading#').lazyRule((k) => {
            var cjFrom = 'hiker://page/Parse_Dn.js?rule=MyFieldᴰⁿ';
            var x5From = 'hiker://page/Parse_Dn.html?rule=MyFieldᴰⁿ';
            try {
                var cjFile = JSON.parse(fetch(cjFrom)).rule;
                var x5File = JSON.parse(fetch(x5From)).rule;
                writeFile(k[0], cjFile);
                writeFile(k[1], x5File);
                clearVar('jxOldV');
                clearVar('jxNewV');
                refreshPage(false);
                return 'toast://拉取成功';
            } catch (e) {
                return 'toast://未成功获取内容';
            }
        }, [cj, x5])
    },
    xlSelect: function(bianji, lbLength) {
        return "select://" + JSON.stringify({
            options: ['‘‘’’<span style="color:red" title="删除||' + bianji + '">删 除', '‘‘’’<span style="color:#F57474" title="隐藏||' + bianji + '">隐 藏', '‘‘’’<span style="color:#FF8000" title="修改||' + bianji + '">修 改', '‘‘’’<span style="color:#098AC1" title="置顶||' + bianji + '0' + '">置 顶', '‘‘’’<span style="color:#098AC1" title="移动||' + bianji + '">移 动', '‘‘’’<span style="color:#098AC1" title="置底||' + bianji + lbLength + '">置 底', '‘‘’’<span style="color:#04B431" title="分享||' + bianji + '">地板分享', '‘‘’’<span style="color:#04B431" title="云分享||' + bianji + '">云板分享'],
            col: '2',
            js: $.toString(() => {
                var parseRoute = getVar('parseRoute');
                eval('var json =' + fetch(parseRoute));
                var newInput = parseDomForHtml(input, 'span&&title').split('||');
                // 修改,迪迪,0   操作类型,名称,索引
                var type = newInput[0];
                var name = newInput[1];
                var num = newInput[2];
                var num2 = newInput[3];
                switch (type) {
                    case "删除":
                        let k = [name, num];
                        // 总感觉筛选或者搜索后，由于num的位置不对可能会删除错,事实如此,已修?
                        return $("即将删除: " + name).confirm((k) => {
                            var name = k[0];
                            var num = k[1];
                            var parseRoute = getVar('parseRoute');
                            eval('var json =' + fetch(parseRoute));
                            if (json.codes.hasOwnProperty(name)) {
                                delete json.codes[name];
                            }
                            num = json.title.indexOf(name); //这样才会得到正确的索引
                            json.title.splice(num, 1);
                            writeFile(parseRoute, $.stringify(json));
                            refreshPage(false);
                            return "toast://已将〖" + name + "〗删除";
                        }, k);
                    case "隐藏":
                        return $("hiker://empty#noLoading#").lazyRule((k) => {
                            var name = k[0];
                            var num = k[1];
                            var parseRoute = getVar('parseRoute');
                            eval('var json =' + fetch(parseRoute));
                            if (json.codes.hasOwnProperty(name)) {
                                num = json.title.indexOf(name); //这样才会得到正确的索引
                                json.title.splice(num, 1);
                                writeFile(parseRoute, $.stringify(json));
                                refreshPage(false);
                                return "toast://已将〖" + name + "〗隐藏";
                            } else {
                                return "toast://可能是个网址, 您可选择删除";
                            }
                        }, [name, num]);
                    case "修改":
                        //if (json.codes[name]) {
                        var nCode = name;
                        var titles = json.title;
                        var nName = "这是名称";
                        if (json.codes[name]) {
                            nCode = json.codes[name].toString();
                            nName = name;
                        }
                        return $("hiker://empty#noRecordHistory#").rule((k,titles) => {
                            var d = [];
                            eval(getItem('myFunction'));
                            var name = k[0];
                            var code = k[1];
                            d.push({
                                title: '保 存',
                                url: saveButton + "saveButton(getVar('input_edit'),name);back();",
                                col_type: "input",
                                desc: "建议按默认的代码格式修改哦",
                                extra: {
                                    onChange: "putVar('input_edit', input)",
                                    type: "textarea",
                                    height: "-1",
                                    highlight: true,
                                    titleVisible: false,
                                    defaultValue: '修改★' + name + '★' + code,
                                }
                            });
                            d.push({
                                title: '‘‘’’<small><span style="color:#6EB897">格式为：操作类型★标题★function(){自定义内容}<br>请勿填入其他格式',
                                url: $('#noLoading#').lazyRule((saveButton,name,titles) => {
                                    let tmpAr = getVar('input_edit').split('★');
                                    if(tmpAr.length<2){
                                        return 'toast://修改格式有误，访问被拒绝'
                                    }
                                    let newName = tmpAr[1];
                                    if(newName!==name&&titles.includes(newName)){
                                        return $('检测到同名接口:'+newName+',是否覆盖?').confirm((saveButton,name)=>{
                                            let code = saveButton(getVar('input_edit'),name);
                                            back();
                                            return 'toast://已保存修改\n请自行检测覆盖后的内容';
                                        },saveButton,name);
                                    }else{
                                        let code = saveButton(getVar('input_edit'),name);
                                        back();
                                        return 'toast://已保存修改';
                                    }
                                    // if(typeof(code)==='string'&&code.length>2){
                                    //     return code
                                    // }else{
                                    //     return 'toast://已保存修改';
                                    // }
                                }, saveButton,name,titles),
                                desc: '‘‘’’<big><big><span style="color:#298A08">保 存',
                                col_type: 'text_center_1'
                            });
                            setResult(d);
                        }, [nName, nCode],titles) //[name, json.codes[name].toString()])
                    /*} else {
                        return "toast://只有网址或者标题, 不支持修改"
                    }*/
                    case "置顶":
                    case "置底":
                        eval('var json =' + fetch(parseRoute));
                        num = json.title.indexOf(name); //这样才会得到正确的索引
                        if(num>-1){
                            var item = json.title.splice(num, 1);
                            json.title.splice(num2, 0, item[0]);
                            writeFile(parseRoute, $.stringify(json));
                            refreshPage(false);
                        }else{
                            return 'toast://没找到:'+name;
                        }
                        break;
                    case "移动":
                        return $('hiker://empty#noLoading#').lazyRule((k) => {
                            putVar('bianji', '移动#' + k);
                            refreshPage(false);
                            return input;
                        }, num);
                    case "分享":
                    case "云分享":
                        if (json.codes[name]) {
                            var parseText = typeof json.codes[name] == 'function' ? $.stringify(json.codes[name]) : json.codes[name];
                            parseText = 'MyParseS★' + name + '★' + base64Encode(parseText);
                        } else {
                            var parseText = '直链★' + json.title[num];
                        }
                        if (type == '云分享' && parseText.substr(0, 8) == 'MyParseS') {
                            parseText = sharePaste(parseText);
                            return parseText.substr(0, 6) != 'error:' ? 'copy://' + parseText + '\n★★★\n' + 'MyParseS：' + name : 'toast://分享失败!!云剪贴板可能挂了';
                        } else {
                            return 'copy://' + parseText;
                        }
                    default:
                        return 'toast://暂不支持';
                } //switch的
            }) //String的
        }) //stringify的
    },
    xjParse: function() {
        return $("hiker://empty#noHistory#").rule(() => {
            var d = [];
            eval(getItem('myFunction'));
            d.push({
                title: '保 存',
                url: saveButton + "saveButton(input);back();clearVar('input_add')",
                col_type: "input",
                desc: "输入正确格式内容",
                extra: {
                    onChange: 'putVar("input_add", input)',
                    type: "textarea",
                    height: "-1",
                    highlight: true,
                    titleVisible: false,
                    defaultValue: getVar('input_add'),
                }
            });
            d.push({
                title: '‘‘’’<small><span style="color:#6EB897">按描述诉格式输入, 请勿填入其他格式<br>本地口令: 操作类型★名称★代码<br>云口令: 链接★★★名称; 纯网址: 直链★url1★url2',
                desc: '‘‘’’<big><big><span style="color:#298A08">保 存',
                url: $('noLoading').lazyRule((saveButton) => {
                    return saveButton(getVar('input_add'));
                }, saveButton),
                col_type: 'text_center_1'
            });
            setResult(d);
        })
    },
    ydParse: function(BJmode, i) {
        return $('#noLoading#').lazyRule((k) => {
            var A = k[0].split('#')[1];
            var B = k[1];
            var parseRoute = getVar('parseRoute');
            eval('var json =' + fetch(parseRoute));
            var item = json.title.splice(A, 1); // 1: 标记开始位置，2: 删除到哪个位置
            json.title.splice(B, 0, item[0]); // 1: 同上，2: 0表示不删除，3: 添加对象
            writeFile(parseRoute, $.stringify(json));
            clearVar('bianji');
            refreshPage(false);
            return 'hiker://empty';
        }, [BJmode, i])
    },
    plscParse: function() {
        return $('hiker://empty#noRecordHistory#').rule(() => {
            var d = [];
            d.push({
                title: '批量修改/删除解析',
                desc: 'auto&&float',
                // url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/cache/plscParse.html',
                url: _mySet.batchRoute,
                col_type: 'x5_webview_single'
            })
            setResult(d);
        })
    }
};

function setParse() {
    $.require("hiker://page/Route?rule=MyFieldᴰⁿ").setParse();
}
