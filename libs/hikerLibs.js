var updateLog = `
2022/08/24 增加一级通用函数
2022/08/23 增加翻页组件的足迹处理函数,分别为储存足迹(在二级监听返回函数用),加载足迹
2022/08/22 初步模块化
`.trim();
var version={
    author:"道长",
    ver:"1.0.2",
    appv:2400,
    requireId:"https://gitcode.net/qq_32394351/dr/-/raw/master/libs/hikerLibs.js",
    update:'2022/08/24 11:16',
    info:updateLog,
    ua:';get;utf-8;{User-Agent@Mozilla/5.0&&Cookie@}',
    ok:'https://okjx.cc/?url=',
    jsRoot:'https://gitcode.net/qq_32394351/dr/-/raw/master/libs/',
};
function objectI18n(obj,i18n){//对象翻译
    let new_obj = {};
    for(let key in i18n){
        new_obj[i18n[key]] = obj[key]
    }
    Object.assign(obj,new_obj);
}
function 初始化(){
    log('初始化海阔视界道长组件库,引入全局函数中...');
    $.extend({
        依赖:version.requireId,
        ejListPath: "hiker://files/cache/json/",
        getList(key,defaultList){
            defaultList = defaultList||[];
            let code = fetch(this.ejListPath+key);
            try {
                let list = JSON.parse(code);
                return Array.isArray(list) ? list :defaultList
            }catch (e) {
                log('获取列表发生了错误:'+e.message);
                return defaultList
            }
        },
        putList(key,list){
            if(!Array.isArray(list)){
                throw new Error('"list" must be list(json object) type');
            }
            writeFile(this.ejListPath+key,JSON.stringify(list));
        },
        readCache(key,defaultValue){
            defaultValue = defaultValue||'';
            let code = fetch(this.ejListPath+key);
            return code||defaultValue
        },
        saveCache(key,value){
            writeFile(this.ejListPath+key,value);
        },
    });
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

function right(text) {
    return '<span style="float:right">'+text+'</span>';
}
function blank(){
    return '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
}

function addTb(html){//解决jsoup在table取值吞标签问题
    return (/<td>/.test(html)&&/<\/td>/.test(html)&&!/<table>/.test(html))?('<table>'+html+'</table>'):html;
}

function getLazy(url,lazy) {//动态获取动态解析可兼容磁力链接
    if ((typeof(lazy)==='undefined'||!lazy) && /^magnet:\?|^ftp:|^thunder:/.test(url.trim())) {//处理磁力
        return ''
    } else {
        def_lazy = (typeof(def_lazy)==='undefined'||!def_lazy)?'':def_lazy;
        return lazy || def_lazy
    }
}

function 获取搜索链接(){
    if(MY_URL.startsWith('hiker://empty##')){
        var api = MY_RULE.url.replace('hiker://empty##','').split('#')[0].split('?')[0];
        var host = getHome(api); // 获取域名
        var sapi = MY_URL.replace("hiker://empty##","");//搜索接口
        MY_URL=sapi.startsWith('http')?sapi:host+sapi;//看搜索接口是不是完整链接
    }
    log('搜索链接:'+MY_URL);
    return MY_URL
}

function getCode(){//用于一级函数获取源码
    let curl=MY_TYPE==='search'?获取搜索链接(MY_URL):MY_URL;
    return /<\/html>/.test(getResCode())?getResCode():获取源码(curl)
}

function 获取源码(url,ua,referer,cookie,extraHeaders){//传url,ua和refer
    url = url.replace('hiker://empty##','').split('#')[0];//获取源码自动去除占位的前缀
    let def_ua = config.ua==='手机'?MOBILE_UA:PC_UA;
    def_ua = config.指定ua?config.指定ua:def_ua;//如果传了指定ua给预处理,优先级更高,必须是ua字符串
    ua = ua||def_ua;
    extraHeaders = extraHeaders||{};
    let headers = {
        'User-Agent': ua
    };
    if(typeof(referer)!=='undefined'&&referer.length>4){
        headers.Referer = referer
    }
    if(typeof(cookie)!=='undefined'&&cookie.length>4){
        headers.Cookie = cookie
    }else{
        // 获取源码在接入下载管理跳到其他规则子页面可能会无法获取，需要在进去的时候处理
        if(getMyVar('cookie','')){
            headers.Cookie = getMyVar('cookie');
        }
    }
    try{
        Object.assign(headers, extraHeaders);//合并其他的请求头
        // log(headers);
        putMyVar('请求头',JSON.stringify(headers)); // 把这个放进去,为了后面方便打印的时候进行读取
        let html = fetch(url, {
            headers: headers
        });
        if (/\?btwaf=/.test(html)) {//宝塔验证
            url=url.split('#')[0]+'?btwaf'+html.match(/btwaf(.*?)\"/)[1];
            log("宝塔验证跳转到:"+url);
            html = fetch(url, {
                headers: headers
            });
        }
        return html
    }catch(e){
        log('获取源码出错'+e.message);
        return ''
    }
}

var 工具 = {
color:color,//给文字增加颜色
htmlTag:htmlTag,//给文字增加html标签
small:small,//文字缩小
addTb:addTb,//添加表
right:right,//文字右对齐
blank:blank,//加空格
similar(s, t, f) {//判断两个字符串之间的相似度
    if (!s || !t) {
        return 0
    }
    if(s === t){
        return 100;
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d = []
    f = f || 2
    var min = function (a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = (1 - d[n][m] / l) *100
    return res.toFixed(f)
},
ChineseMap:{
    "零": 0, "一": 1, "壹": 1, "二": 2, "贰": 2, "两": 2, "三": 3, "叁": 3,
    "四": 4, "肆": 4, "五": 5, "伍": 5, "六": 6, "陆": 6, "七": 7, "柒": 7,
    "八": 8, "捌": 8, "九": 9, "玖": 9, "十": 10, "拾": 10, "百": 100, "佰": 100,
    "千": 1000, "仟": 1000, "万": 10000, "十万": 100000, "百万": 1000000, "千万": 10000000, "亿": 100000000
},
ChineseToNumber(chinese_number){//中文转数字
        let len = chinese_number.length;
        if (len === 0) return -1;
        if (len === 1) return (this.ChineseMap[chinese_number] <= 10) ? this.ChineseMap[chinese_number] : -1;
        let summary = 0;
        if (this.ChineseMap[chinese_number[0]] === 10) {
            chinese_number = "一" + chinese_number;
            len++;
        }
        if (len >= 3 && this.ChineseMap[chinese_number[len - 1]] < 10) {
            let last_second_num = this.ChineseMap[chinese_number[len - 2]];
            if (last_second_num === 100 || last_second_num === 1000 || last_second_num === 10000 || last_second_num === 100000000) {
                for (let key in this.ChineseMap) {
                    if (this.ChineseMap[key] === last_second_num / 10) {
                        chinese_number += key;
                        len += key.length;
                        break;
                    }
                }
            }
        }
        if (chinese_number.match(/亿/g) && chinese_number.match(/亿/g).length > 1) return -1;
        let splited = chinese_number.split("亿");
        if (splited.length === 2) {
            let rest = splited[1] === "" ? 0 : this.ChineseToNumber(splited[1]);
            return summary + this.ChineseToNumber(splited[0]) * 100000000 + rest;
        }
        splited = chinese_number.split("万");
        if (splited.length === 2) {
            let rest = splited[1] === "" ? 0 : this.ChineseToNumber(splited[1]);
            return summary + this.ChineseToNumber(splited[0]) * 10000 + rest;
        }
        let i = 0;
        while (i < len) {
            let first_char_num = this.ChineseMap[chinese_number[i]];
            let second_char_num = this.ChineseMap[chinese_number[i + 1]];
            if (second_char_num > 9)
                summary += first_char_num * second_char_num;
            i++;
            if (i === len)
                summary += first_char_num <= 9 ? first_char_num : 0;
        }
        return summary;
},
force_order(list,fn){//强制正序
    fn = fn||function (list){//默认为视界的列表
        return list.map(x=>x.title)
    };
    let start = Math.floor(list.length/2); // 0
    let end = Math.min(list.length-1,start+1); // list.slice(-1)[0]
    let listFn = fn(list);
    let first = listFn[start];
    let second = listFn[end];
    try{
        if(first.match(/(\d+)/)&&second.match(/(\d+)/)){ //数字章节的
            if(parseInt(first.match(/(\d+)/)[0])>parseInt(second.match(/(\d+)/)[0])){
                list.reverse()
            }
        }else{ // 中文转换
            if(this.ChineseToNumber(first)>this.ChineseToNumber(second)){
                list.reverse()
            }
        }
    }catch(e){}
    return list
},
sleep(timeout) {//延时
    java.lang.Thread.sleep(timeout);
},
nameCompare(a, b) {//名称排序
    if (a == null || b == null) {
        return a == null ? b == null ? 0 : -1 : 1;
    }

    a = a.replace(/([零一壹二贰两三叁四肆五伍六陆七柒八捌九玖十拾百佰千仟万亿])/g, function(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return this.ChineseToNumber(p1);
    });
    b = b.replace(/([零一壹二贰两三叁四肆五伍六陆七柒八捌九玖十拾百佰千仟万亿])/g, function(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return this.ChineseToNumber(p1);
    });

    let NUMBERS = java.util.regex.Pattern.compile("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)");
    let split1 = NUMBERS.split(new java.lang.String(a));
    let split2 = NUMBERS.split(new java.lang.String(b));

    for (let i = 0; i < Math.min(split1.length, split2.length); i++) {
        let c1 = split1[i].charCodeAt(0);
        let c2 = split2[i].charCodeAt(0);
        let cmp = 0;
        let zeroCharCode = '0'.charCodeAt(0);
        let nineCharCode = '9'.charCodeAt(0);

        if (c1 >= zeroCharCode && c1 <= nineCharCode && c2 >= zeroCharCode && c2 <= nineCharCode) {
            cmp = new java.math.BigInteger(split1[i]).compareTo(new java.math.BigInteger(split2[i]));
        }

        if (cmp === 0) {
            let regex = /[a-zA-Z0-9]/;
            let s1 = String(split1[i]);
            let s2 = String(split2[i]);
            if (regex.test(s1) || regex.test(s2)) {
                cmp = new java.lang.String(split1[i]).compareTo(new java.lang.String(split2[i]));
                // cmp = s1.localeCompare(s2, 'en')
            } else {
                cmp = s1.localeCompare(s2, 'zh');
            }
        }

        if (cmp !== 0) {
            return cmp;
        }
    }
    let lengthCmp = split1.length - split2.length;
    // if (lengthCmp !== 0) lengthCmp = lengthCmp > 0 ? -1 : 1;
    return lengthCmp;
},
isPic(str){//判断是否为图片
    if(!str){
        return false
    }
    return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str);
},
blockRules:['baidu.*.png','.mp3', '.mp4', '.flv', '.avi', '.3gp', '.mpeg', '.wmv', '.mov', '.rmvb', '.gif', '.png', '.ico', '.svg'],
isVideo(playUrl,rechange){//判断是否为视频,是的话返回加料的视频链接
//注意.php不可以被排除否则融兴解析不了 |.php$
//如果是播放地址就直接返回地址加上UA，不是的话就返回false
// let t1 = new Date().getTime();
let cacheRegx = new RegExp('file:///storage/emulated/(.*?)\\.m3u8|hiker://files/(.*?)\\.m3u8');
if(cacheRegx.test(playUrl)){
    return playUrl
}
function getHost(url){
// fba的parseLazy太慢了千万别用
try {
    return url.match(/^http(s)?:\/\/(.*?)\//)[0].slice(0,-1);
}catch (e) {
    return false
}
}
let pUrl=playUrl.split(";")[0];//获取抠掉海阔ua等参数的网页播放链接
let host = getHost(pUrl); // 获取域名
if(!host){//判断无域名直接不是视频
return false
}
function print(data){
if(typeof(log)==='undefined'){
    return  fba.log(data)
}else {
    return log(data)
}
}
rechange=typeof(rechange)==="function"?rechange:function(playUrl){return playUrl};
// let exceptWords = '.js$|.css$|.ts$|.html$|.htm$|.gif$|.jpg$|.jpeg$|.png$|.ico$|.svg$|.txt$'.split('|').map(it=>'\\'+it).join('|');
// var exceptKeys = new RegExp(exceptWords);
var exceptKeys = /\.(js|css|ts|html|htm|gif|jpg|png|ico|svg|txt)$/;
// let exceptWords1 = 'referer=|url='.split('|').map(it=>it).join('|');
// var exceptKeys1 = new RegExp(exceptWords1);
var exceptKeys1 = /(referer|url)=/;
let replaceKeys = /playm3u8|m3u8\.tv/g;
let videoWords = "/video/tos|.mp4$|.m3u8$|.flv$|.avi$|.3gp$|.mpeg$|.wmv$|.mov$|rmvb|.dat$|.mp3$|.m4a$|qqBFdownload|mime=video%2F|mime_type=video_|type=m3u8|pt=m3u8".split('|').map((it)=>{
    //type=mp4
    if(it.startsWith(".")){
        return '\\'+it
    }else{
        return it
    }
}).join("|");
let videoKeys = new RegExp(videoWords);
let rUrl = pUrl.replace(host,'');//获取除开域名的剩余链接
let pUrl2=pUrl.split("&")[0].split("?")[0];//获取不带参数的网页链接
let rurl2 = pUrl2.replace(host,'');//获取除开域名的剩余不带参数链接
let hasKey = videoKeys.test(rUrl)||videoKeys.test(rurl2);
let parUrl = pUrl.replace(pUrl.split("?")[0],''); // 分割问号后剩余参数的完整链接
let excKey = exceptKeys1.test(parUrl);
if(rUrl.split('?').length>2){
    let rUrl3=rUrl.split("?")[1];//获取?分割后的第一段
    hasKey = hasKey||videoKeys.test(rUrl3);
}
if(hasKey&&!excKey){
    let tips = '检测到疑似多媒体的地址:';
    print("js中"+tips+pUrl);
    print("分割问号后:"+parUrl);
}
if ((hasKey||videoKeys.test(rUrl.replace(replaceKeys,"").split("&")[0].split("?")[0]) )&& !exceptKeys.test(pUrl2)&&!exceptKeys1.test(pUrl2)) {
if(!(/User-Agent|Referer@/.test(playUrl))){
    if(/lecloud\.com|bilivideo/.test(playUrl)){
        playUrl+=";{Referer@https://www.bilibili.com/&&User-Agent@Mozilla/5.0}";
    }else if(/ixigua\.com/.test(playUrl)){
        playUrl+=";{Referer@https://www.ixigua.com/&&User-Agent@Mozilla/5.0}#isVideo=true#";
    }
    else if(/mgtv\.com|byteamone/.test(playUrl)){
        playUrl+=";{User-Agent@Mozilla/5.0}";
    }else if(/ptwo\.wkfile\.com/.test(playUrl)&&/url=/.test(playUrl)){
        playUrl=playUrl.split("url=")[1]+";{Referer@https://fantuan.tv}"
    }
}
playUrl=rechange(playUrl);
if(!/#isVideo=true#/.test(playUrl)){
    playUrl+="#isVideo=true#";
}
return playUrl;
}else{
    return false;
}
},
通免(_reChange){
    // 嗅探链接再处理函数
    _reChange = _reChange||false; // 必传,false
    let lazy=$("").lazyRule((_reChange)=>{
        const {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
        return lazyParse(input,null,null,_reChange);
    },_reChange);
    return lazy
},
bytesToSize(size) {//体积格式化
    if (size < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        size = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        size = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else {
        // 其他转化成GB
        size = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    // 转成字符串
    let sizeStr = size + "",
        // 获取小数点处的索引
        index = sizeStr.indexOf("."),
        // 获取小数点后两位的值
        dou = sizeStr.substr(index + 1, 2);
    // 判断后两位是否为00，如果是则删除00
    if (dou === "00") return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    return size;
},
};
var 工具_翻译 = {
    color:'颜色',
    htmlTag:'标签',
    small:'缩小',
    right:'右对齐',
    blank:'空格',
    ChineseToNumber:'中文转数字',
    force_order:'强制正序',
    similar:'相似度',
    sleep:'延时',
    nameCompare:'名称对比',
    isPic:'是否图片',
    isVideo:'是否视频',
    bytesToSize:'体积格式化',
    addTb:'添加表',
};
objectI18n(工具,工具_翻译);

var 储存 = (function() {
    //自定义
    const KEYS = "daozhangyyds";
    const PATH = "hiker://files/localStorage/StorageDz.local";
    //核心代码勿动
    const symbolSet = Object.freeze({
        init: Symbol("init"),
        save: Symbol("save"),
        data: Symbol("data")
    });
    function LocalStorage(path) {
        this.path = path;
        this[symbolSet.data] = this[symbolSet.init]();
    }
    const LSPT = LocalStorage.prototype;
    LSPT[symbolSet.save] = function(data) {
        data = data || this[symbolSet.data];
        if (data) {
            writeFile(this.path, aesEncode(KEYS, JSON.stringify(data)));
        } else {
            throw new Error("data exception");
        }
    }
    LSPT[symbolSet.init] = function() {
        let plaintext = request(this.path);
        try {
            return JSON.parse(aesDecode(KEYS, plaintext));
        } catch (e) {
            this[symbolSet.save]({});
            return {};
        }
    }
    Object.assign(LSPT, {
        constructor: LocalStorage,
        setItem(key, value, expiredTimeMS) {
            if (typeof key !== "string" || typeof value !== "string") {
                throw new Error('"key" and "value" must be string type');
            }
            if ((expiredTimeMS === 0) || (expiredTimeMS == null)) {
                this[symbolSet.data][key] = {
                    value: value
                }
            } else {
                if (typeof expiredTimeMS !== "number") {
                    throw new Error('"expiredTime" must be number type');
                }
                this[symbolSet.data][key] = {
                    value: value,
                    est: new Date().getTime(),
                    etm: expiredTimeMS
                }
            }
            this[symbolSet.save]();
        },
        getItem(key,value) {
            value = value||'';
            let item = this[symbolSet.data][key];
            if (item === void 0) {
                return value?value:undefined;
            }
            if (!item.est || !item.etm) {
                return item.value;
            }
            let curTime = new Date().getTime();
            let sum = item.est + item.etm;
            if (sum > curTime) {
                return item.value;
            } else {
                //this.removeItem(key);
                //this[symbolSet.save]();
                return null;
            }
        },
        removeItem(key) {
            this[symbolSet.data][key] = undefined;
            this[symbolSet.save]();
        },
        hasItem(key) {
            return this[symbolSet.data].hasOwnProperty(key);
        },

        isExpired(key) {
            let item = this[symbolSet.data][key];
            if (item === void 0) {
                return true;
            }
            if (!item.est || !item.etm) {
                return false;
            }
            let curTime = new Date().getTime();
            let sum = item.est + item.etm;
            return sum <= curTime;
        },
        expiredReset(key, expiredTimeMS) {
            if (typeof key !== "string") {
                throw new Error('"key" must be string type');
            }
            if (typeof expiredTimeMS !== "number") {
                throw new Error('"expiredTime" must be number type');
            }
            let item = this[symbolSet.data][key];
            if (item === void 0) {
                throw new Error(key + " does not exist");
            }
            if ((expiredTimeMS === 0) || (expiredTimeMS == null)) {
                this[symbolSet.data][key] = {
                    value: item.value
                };
            } else {
                this[symbolSet.data][key] = {
                    value: item.value,
                    est: new Date().getTime(),
                    etm: expiredTimeMS
                };
            }
            this[symbolSet.save]();
        },
        clear() {
            this[symbolSet.data] = {};
            this[symbolSet.save]();
        }
    });
    return new LocalStorage(PATH);
})();

var lsg = 储存;


var 文件 = (function(){
    const File = java.io.File;
    const {
        Files,
        Paths,
        StandardCopyOption,
        StandardOpenOption
    } = java.nio.file;
    const javaString = java.lang.String;
    let javaScope = new JavaImporter(java.io, java.lang, java.lang.reflect, java.util.Vector);

    function deleteFiles(fileName) {
        let file = new File(fileName);
        if (!file.exists()) {
            //log("删除文件失败：" + fileName + "文件不存在");
            return false;
        } else {
            if (file.isFile()) {
                return deleteFile(fileName);
            } else {
                return deleteDirectory(fileName);
            }

        }

    }
    /**
     * 删除单个文件
     *
     * @param fileName
     *            被删除文件的文件名
     * @return 单个文件删除成功返回true,否则返回false
     */
    function deleteFile(fileName) {
        let file = new File(fileName);
        if (file.isFile() && file.exists()) {
            file.delete();
            //log("删除单个文件" + fileName + "成功！");
            return true;
        } else {
            //log("删除单个文件" + fileName + "失败！");
            return false;
        }

    }
    /**
     * 删除目录（文件夹）以及目录下的文件
     *
     * @param dir
     *            被删除目录的文件路径
     * @return 目录删除成功返回true,否则返回false
     */
    function deleteDirectory(dir) {
        // 如果dir不以文件分隔符结尾，自动添加文件分隔符
        if (!dir.endsWith(File.separator)) {
            dir = dir + File.separator;
        }
        let dirFile = new File(dir);
        // 如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            //log("删除目录失败" + dir + "目录不存在！");
            return false;
        }
        let flag = true;
        // 删除文件夹下的所有文件(包括子目录)
        let files = dirFile.listFiles();
        for (let i = 0; i < files.length; i++) {
            // 删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) {
                    break;
                }
            } else { // 删除子目录
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) {
                    break;
                }
            }
        }
        if (!flag) {
            //log("删除目录失败");
            return false;
        }
        // 删除当前目录
        if (dirFile.delete()) {
            //log("删除目录" + dir + "成功！");
            return true;
        } else {
            //log("删除目录" + dir + "失败！");
            return false;
        }
    }
    //copy单个文件
    function copyFile(source, target, isCover){
        let sourcePath = Paths.get(source);
        let targetPath = Paths.get(target);
        let isExist = Files.exists(targetPath);
        if(Files.isDirectory(sourcePath)||(isExist&&!isCover)||(isExist&&Files.isDirectory(targetPath))){
            return false;
        }
        try{
            if(!isExist){
                Files.createDirectories(targetPath.getParent());
            }
            if(isCover === true){
                Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.COPY_ATTRIBUTES);
                return true;
            } else {
                Files.copy(sourcePath, targetPath, StandardCopyOption.COPY_ATTRIBUTES);
                return true;
            }
        } catch(e) {
            return false;
        }
    }

    /**
     *
     * @param source 源文件夹
     * @param target 目标文件夹
     * @param pattern 0：格式化目标文件夹在复制  1：不格式化但覆盖目标文件夹里重复的文件 2：跳过已经有的文件
     * @returns {boolean|*|boolean}
     */
    function copyDirs(source, target, pattern){
        pattern = pattern || 0;
        let sourceDir = new File(source);
        let targetDir = new File(target);
        if(pattern === 0&&targetDir.exists()&&targetDir.isDirectory()){
            if(!deleteFiles(target)) return false;
        }
        if(targetDir.isFile()&&targetDir.exists()){
            if(pattern === 0){
                if(!deleteFiles(target)) return false;
            }else{
                return false;
            }
        }
        let copy;
        if(pattern===0||pattern===1){
            copy=(source, target)=>copyFile(source, target, true);
        }else if(pattern===2){
            copy=(source, target)=>copyFile(source, target, false);
        }else{
            return false;
        }
        return copyDir(sourceDir, targetDir, copy);
    }
    function copyDir(sourceDir, targetDir, copy){
        let files = sourceDir.listFiles();
        if(files == null) return false;
        for(let file of files){
            let file1 = new File(targetDir, file.getName());
            if(file.isFile()){
                return copy(file.toString(),file1.toString());
            } else {
                file1.mkdir();
                return copyDir(file,file1, copy);
            }
        }
    }
    function forEachs(options){
        let v = Object.assign({
            baseDir: "",
            targetDepth: 5,
            isIgnoreDir: true,
            callback: null
        }, options);
        if(!v.baseDir || typeof v.callback!=="function"){
            throw new Error("参数错误");
        }
        v.baseDir=new File(v.baseDir);
        forEach(v.baseDir,v.targetDepth,v.isIgnoreDir,v.callback);
    }
    function forEach(baseDir, targetDepth, isIgnoreDir, callback, depth) {
        depth = depth || 0;
        if (!baseDir.exists() || !baseDir.isDirectory() || depth >= targetDepth) {
            return;
        }
        let files = baseDir.listFiles();
        if(files == null){
            return;
        }
        for (let file of files) {
            let isDirectory = file.isDirectory();
            if ((!isIgnoreDir&&isDirectory)||!isDirectory) {
                callback({
                    name: String(file.getName()),
                    path: String(file.getPath()),
                    isDirectory: isDirectory
                });
            }
            if (isDirectory) {
                forEach(file, targetDepth, isIgnoreDir, callback, depth + 1);
            }
        }
    }
    function getFileTime(path) {
        let file = new File(path);
        let lastModified = file.lastModified();
        let date = new Date(lastModified);
        return date.getTime();
    }

    function getName(path) {
        return new File(path).getName() + "";
    }

    function getFilePath(path, type, expand) {
        type = type || "file";
        if (!["file", "dir"].includes(type)) throw new Error("类型错误");
        let fileType = type === "file" ? "isFile" : "isDirectory";
        let file = new File(path);
        let array = file.listFiles() || [];
        let pathList = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i][fileType]()) {
                pathList.push({
                    name: array[i].getName() + "",
                    path: array[i].getPath() + ""
                });
            }
        }
        if (expand) {
            pathList = pathList.filter(it => it.name.endsWith(expand));
        }
        return pathList;
    }

    function renameFile(fromPath, name, isCover) {
        isCover=isCover||false;
        let fromFile = new File(fromPath);
        let toFile = new File(fromFile.getParent() + "/" + name);

        try {

            if (!fromFile.exists()) {
                return false;
            }
            if(String(fromFile.toString())===String(toFile.toString())){
                return false;
            }
            if (toFile.exists()) {
                if (isCover&&!deleteFiles(toPath)) {
                    return false;
                } else if(!isCover){
                    return false;
                }
            }
            Files.move(fromFile.toPath(), toFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return toFile.toString();
        } catch (e) {
            log(e.toString());
            return false;
        }
    }

    function moveFiles(fromPath, toPath) {
        let fromFile = new File(fromPath);
        let toFile = new File(toPath);
        try {
            if (!fromFile.exists()) {
                return false;
            }
            if (toFile.exists()) {
                if (!deleteFiles(toPath)) {
                    return false;
                }
            }
            Files.move(fromFile.toPath(), toFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (e) {
            log(e.toString());
            return false;
        }
    }

    function fileWrite(path, content) {
        writeFile("file://" + path, content)
    }

    function fileWriteAppend(path, content) {
        let file = new File(path);
        let paths = file.toPath();
        if (file.exists()) {
            Files.write(paths, new javaString(content).getBytes(), StandardOpenOption.APPEND);
        } else {
            writeFile("file://" + path, content);
        }
    }

    function getTotalSizeOfFilesInDir(file) {
        if (file.isFile()) {
            return file.length();
        }
        let children = file.listFiles();
        let total = 0;
        if (children != null) {
            for (let child of children) {
                total += getTotalSizeOfFilesInDir(child);
            }
        }
        return total;
    }

    function getFileSize(filePath) {
        //Byte
        let size = getTotalSizeOfFilesInDir(new File(filePath));
        if (size < 0) {
            return null;
        }
        let unitForm = ["Byte", "KB", "MB", "GB", "TB"];
        for (let i = 0, len = unitForm.length; i < len; i++) {
            if (size > 1024) {
                size /= 1024;
                continue;
            } else {
                return Math.ceil(size) + unitForm[i];
            }
        }
        return "ERROR:数值过大";
    }

    function fileRule(filesInput, fileOut, intercept) {
        with(javaScope) {
            const BUFFER_SIZE = 0x300000;
            let tmpFile = new File(filesInput);
            if(!(tmpFile.exists()&&tmpFile.isFile())){
                return false;
            }
            let outFile = new File(fileOut);

            let tis = new FileInputStream(tmpFile);
            let os = new BufferedOutputStream(new FileOutputStream(outFile));
            let len = 0;
            let bys = Array.newInstance(Byte.TYPE, BUFFER_SIZE);
            while ((len = tis.read(bys)) != -1) {
                let nbys = intercept(new String(bys,0,len));
                os.write(nbys, 0, nbys.length);
            }
            tmpFile.delete();
            tis.close();
            os.close();
            return true;
        }
    }

    /**
     * 获取文件后缀
     * @param originalFilename 原文件名/文件路径
     * @returns {string}
     */
    function getExtension(originalFilename) {
        originalFilename = String(originalFilename).trim();
        let i = originalFilename.lastIndexOf(".");
        if (i === -1) {
            return "";
        }
        let suffix = originalFilename.substring(i);
        return suffix.toLowerCase();
    }

    return {
        getExtension: (path) => getExtension(path),
        getFileTime: (path) => getFileTime(path),
        getFilePath: (path, type, expand) => getFilePath(path, type, expand),
        deleteFiles: (path) => deleteFiles(path),
        renameFile: (path, name, isCover) => renameFile(path, name, isCover),
        moveFiles: (fromPath, toPath) => moveFiles(fromPath, toPath),
        fileWrite: (path, content) => fileWrite(path, content),
        fileWriteAppend: (path, content) => fileWriteAppend(path, content),
        getName: (path) => getName(path),
        getFileSize: (filePath) => getFileSize(filePath),
        fileRule: (filesInput, fileOut, intercept) => fileRule(filesInput, fileOut, intercept),
        copyFile: (source, target, isCover) => copyFile(source, target, isCover),
        copyDirs: (source, target, pattern) => copyDirs(source, target, pattern),
        forEachs: (options) => forEachs(options)
    }
})();

var 组件 = {
一级传参(d,obj){
let def_obj = {
    noRef:false,//图片不用referer
    noCj:false,//不用沉浸
}
obj = obj||{};
obj = Object.assign(def_obj,obj);
d.forEach((it)=>{
    if(!obj.noRef&&工具.isPic(it.pic_url)&&!/@Referer=/.test(it.pic_url)){
        it.pic_url+='@Referer=';
    }
    if(!obj.noRef&&工具.isPic(it.img)&&!/@Referer=/.test(it.img)){
        it.img+='@Referer=';
    }
    if(!obj.noCj&&!/#immersiveTheme#/.test(it.url)&&!/@lazyRule=|@rule=/.test(it.url)){//加上沉浸
        it.url+='#immersiveTheme#';
    }
    if(!it.extra){
        it.extra = {};
    }
    it.extra.url = it.url||'';
    it.extra.pic_url = (it.pic_url||it.img)||'';
    it.extra.title = it.title||'';
    it.extra.desc = it.desc||'';
    it.extra.content = it.content||'';
});
return d
},
通用一级处理:{
    标题(input){
        return input
    },
    图片(input){
        if (input && input.length>8 &&!/@Referer=/.test(input)) {
            input += '@Referer='
        }
        return input
    },
    描述(input){
        return input
    },
    链接(input){
        return input
    },
    内容(input){
        return input
    },
    沉浸:true,
    链接识别:true,
},
一级通用(parStr,ej,onlyback,html){//可以规则一级和搜索一级
    //列表，标题，图片，描述，链接，内容
    ej = ej||false;//有二级
    onlyback=onlyback||false;//只返回数据
    html = html||getResCode();//源码
    html = typeof(html)==='string'?html:html.html;
    let t = parStr.split(";");
    let d = [];
    lazy=(typeof(lazy)==='undefined'||!lazy)?false:lazy;
    def_lazy = lazy||工具.通免();
    let deal = this.通用一级处理;
    一级处理 = 一级处理||deal;
    var list = [];
    try {
        list = pdfa(html, t[0]);
    }catch (e) {
        throw new Error("未匹配到一级列表:"+t[0]);
    }
    function getPos(t,idex){
        return t[idex].split('.js:')[0];
    }
    一级处理.标题=一级处理.标题||deal.标题;
    一级处理.图片=一级处理.图片||deal.图片;
    一级处理.描述=一级处理.描述||deal.描述;
    一级处理.链接=一级处理.链接||deal.链接;
    一级处理.内容=一级处理.内容||deal.内容;
    一级处理.沉浸=typeof(一级处理.沉浸)==='boolean'?一级处理.沉浸:deal.沉浸;
    一级处理.链接识别=typeof(一级处理.链接识别)==='boolean'?一级处理.链接识别:deal.链接识别;
    for (let i in list) {
        let obj = {content:''};
        let it = addTb(list[i]);
        let 标题 = getPos(t,1);
        let 图片 = getPos(t,2);
        let 描述 = getPos(t,3);
        let 链接 = getPos(t,4);
        let _title = 标题 ? pdfh(it, 标题) : '';
        let _pic_url = 图片 ? pd(it, 图片) : '';
        let _desc = 描述 ? pdfh(it, 描述) : '';
        let _url = 链接 ? (一级处理.链接识别?pd(it, 链接):pdfh(it, 链接)) : '';
        if (t.length > 5) {//内容，用于搜索
            let 内容 = getPos(t,5);
            let _content = 内容 ? pdfh(it, 内容) : '';
            obj.content = 一级处理.内容(_content)
        }
        _url = 一级处理.链接(_url);
        if(!/#immersiveTheme#/.test(_url)&&一级处理.沉浸&&!/@lazyRule=/.test(_url)){//加上沉浸
            _url+='#immersiveTheme#'
        }
        _url = ej ? _url : (_url + getLazy(_url,lazy));
        // if (_url.startsWith('http') && ej) {//网络链接且有二级的情况下自动加hiker
        //     _url = 'hiker://empty##' + _url
        // }
        Object.assign(obj,{title:一级处理.标题(_title),pic_url:一级处理.图片(_pic_url),desc:一级处理.描述(_desc),url:_url});
        obj.extra = {
            title:obj.title,
            name:MY_RULE.title,
            pic_url:obj.pic_url,
            desc:obj.desc,
            content:obj.content,
            url:obj.url,
        };
        if (!ej) {
            Object.assign(obj.extra,{
                id: obj.url,
                jsLoadingInject: true,
                blockRules: 工具.blockRules,
            });
        }
        d.push(obj);
    }
    if(onlyback){
        return d
    }else{
        setResult(d);
    }
},
海报(d,obj){
let def_obj = {
    noCj:false,//不用沉浸
    dp:false,//启用断插
    title:MY_PARAMS.title, //标题
    pic_url:MY_PARAMS.pic_url,//图片
    url:MY_PARAMS.pic_url||MY_PARAMS.url,//链接
    desc:MY_PARAMS.desc,//描述
};
obj = obj||{};
obj = Object.assign(def_obj,obj);
let _col_type=obj.noCj?"movie_1_vertical_pic":"movie_1_vertical_pic_blur";
d.push({
    title:small(obj.title),
    pic_url:obj.pic_url,
    url:obj.dp?'hiker://page/Route?rule=MyFieldᴰⁿ&type=设置#noHistory##noRecordHistory#':obj.pic_url,
    desc:small(obj.desc),
    col_type:_col_type
});
setPagePicUrl(obj.pic_url); // 动态设置二级收藏图片
return d
},
剧情简介(d,obj){
let def_obj = {
    title:MY_PARAMS.title, // 小说/漫画名称
    info:'暂无详情',
    content:'',//点击详情进入的rich_text页面
    download:'',//下载类型
    limit:Number(储存.getItem('简介字数','100')),//限制最大显示字数
}
obj = obj||{};
obj = Object.assign(def_obj,obj);
let download_text = '';
var bookName = obj.title;
var ruleName = MY_RULE.title;
    if(/小说|漫画/.test(obj.download)){
        const Config = $.require("hiker://page/Config.json?rule=本地资源管理");
        rootPath = obj.download ==='小说'?Config.novelPath:Config.comicPath;
        download_text = '下载'.link($().b64("'").lazyRule(() => {
            let rule_exits = fetch('hiker://home@本地资源管理');
            rule_exits = rule_exits!=='null'&&rule_exits!=='';
            if(!rule_exits){
                return $('未安装[本地资源管理]小程序，无法下载资源,现在安装?').confirm(()=>{
                    let ruleHead = '海阔视界首页频道规则【本地资源管理】￥home_rule_url￥';
                    let rulecode = 'rule://'+base64Encode(ruleHead+'http://hiker.nokia.press/hikerule/rulelist.json?id=3559');
                    return rulecode
                });
            }else{
                return "hiker://page/download.view#noHistory##noRecordHistory##noRefresh#?rule=本地资源管理";
            }
        }));
        download_text+='\t\t\t\t\t';
        download_text+='更新下载器'.link($().b64("'").lazyRule(() => {
            let ruleHead = '海阔视界首页频道规则【本地资源管理】￥home_rule_url￥';
            let rulecode = 'rule://'+base64Encode(ruleHead+'http://hiker.nokia.press/hikerule/rulelist.json?id=3559');
            return rulecode
        }));

        download_text+='\t\t\t\t\t';
        download_text += '本地阅读'.link($().b64("'").lazyRule((bookName, ruleName,download,rootPath) => {
            let rule_exits = fetch('hiker://home@本地资源管理');
            rule_exits = rule_exits !== 'null' && rule_exits !== '';
            if (!rule_exits) {
                return $('未安装[本地资源管理]小程序，无法本地阅读,现在安装?').confirm(() => {
                    let ruleHead = '海阔视界首页频道规则【本地资源管理】￥home_rule_url￥';
                    let rulecode = 'rule://' + base64Encode(ruleHead + 'http://hiker.nokia.press/hikerule/rulelist.json?id=3559');
                    return rulecode
                });
            } else {
                let bindUrl = download ==='小说'?'hiker://page/NovelBrowser.view':'hiker://page/ComicBrowser.view';
                let localReadUrl = buildUrl(bindUrl, {
                    hasParams: true,
                    rule: "本地资源管理",
                    path: encodeURIComponent(rootPath + ruleName + "/" + bookName),
                    name: encodeURIComponent(bookName)
                });
                return localReadUrl
            }
        }, bookName, ruleName,obj.download,rootPath));
    }
    let limit_text = obj.info.substring(0,obj.limit)+'...';
    let rich_html = ("剧情简介\t\t\t\t\t"+download_text+"<br><br>").fontcolor("#098AC1")+limit_text.fontcolor("grey").small();
    let aData;
    if(obj.content){
        aData = [{
            title:obj.content,
            col_type:"rich_text"
        }]
    }else{
        aData = [{
            title:obj.info,
            col_type:"long_text"
        }]
    }
    rich_html = rich_html+"查看详情".fontcolor("#098AC1").small().link($().b64("'").rule(d => setResult(d), aData));
    d.push({
        title:rich_html,
        col_type:"rich_text",
        extra:{
            lineVisible: false,
            textSizeb:11,
            lineSpacing:-11
        },
    });
    return d
},
顺序切换(tab_cnt,list_cnt){
    tab_cnt = tab_cnt||1;
    list_cnt = list_cnt||0;
    let tips1 = color('(☆逆序↑)','#228be6');
    let tips2 = color('(★正序↓)','#d0aa344');
    let showOrder = getMyVar('顺序','正序')==='逆序'?tips1:tips2;
    let title = small(color('播放列表共计','#098AC1')+color('$tab_cnt','#d96715')+color('条线路 ','#098AC1')+color('$list_cnt','#d96715')+color('集','#098AC1'))+blank()+right(small('$showOrder'));
    let title2 = title.replace('$tab_cnt',tab_cnt).replace('$list_cnt',list_cnt);
    return {
        title:title2.replace('$showOrder',showOrder),
        col_type:'text_1',
        url:$('#noLoading#').lazyRule((title2,tips1,tips2)=>{
            if(getMyVar('顺序','正序')==='逆序'){
                putMyVar('顺序','正序');
            }else{
                putMyVar('顺序','逆序');
            }
            let orderNow = getMyVar('顺序','正序');
            // refreshPage(false);
            let showOrder = orderNow==='逆序'?tips1:tips2;
            updateItem('changeOrder',{
                title:title2.replace('$showOrder',showOrder)
            });
            let nowData = $.getList("nowList.json");// 读取缓存的选集数据列表
            let oldIds = nowData.map(it=>it.extra.id);//老元素ids
            for(let i in oldIds){//批量更新其中的cls
                updateItem(oldIds[i],{extra:{cls:'toDelete'}});
            }
            if(orderNow==='逆序'){
                nowData.reverse();
            }
            // 在最后一个老元素后面增加新的元素
            addItemAfter(oldIds.slice(-1)[0],nowData);
            // 删除老元素
            deleteItemByCls('toDelete');
            return 'toast://已切换顺序为:'+orderNow
        },title2,tips1,tips2),
        extra:{
            lineVisible:false,
            id:'changeOrder', //改变排序
        }
    }
},
选集翻页(d,obj){//d 是加入到数据,obj是构造对象,showBottom是否同时在底部显示
    // 关键操作:选集列表extra必须有唯一id并且cls为playList
    // 选集列表必须处理完后 storage0.putMyVar('showList') 或者 saveFile('showList.json',JSON.stringify(list),0)
    let def_obj = {
        list:[],//必传
        size:Number(储存.getItem('每页数量',40)),//每页数量
        over:Number(储存.getItem('翻页阀值',40)),//翻页阀值，超过多少才显示翻页组件
        col_type:储存.getItem('按钮样式','')||MY_RULE.col_type||'text_5',//二级选集样式
        show_order:false,//显示排序切换
        tab_cnt:1,//线路数
        pos:'top', //显示位置:top,bottom,both
    }
    obj = obj||{};
    obj = Object.assign(def_obj,obj);
    let pageTitleInfo = '';//翻页统计标题
    let showPic = 'https://hikerfans.com/tubiao/ke/53.png';//翻页提示图标
    let showCol = 'avatar';//翻页提示样式
    let col_type = obj.col_type;//二级选集样式
    let show_order = obj.show_order;//显示顺序
    let tab_cnt = obj.tab_cnt; // 线路数量
    let showBottom = /both|bottom/.test(obj.pos); // 底部显示
    let showTop = /both|top/.test(obj.pos); // 顶部显示
    let list = Array.isArray(obj.list)?obj.list:[]// 选集列表完整数据,请确保是强制正序的
    let 每页数量 = obj.size; // 分页的每页数量
    let 最大页数 = Math.ceil(list.length/每页数量);
    let 翻页阀值 = obj.over; // 分页的翻页阀值，超过多少才显示翻页
    this.加载足迹(MY_URL,每页数量);
    addListener('onClose', $.toString((MY_URL,每页数量,MY_PARAMS)=>{
        require($.依赖);
        组件.储存足迹(MY_URL,每页数量,MY_PARAMS);
    },MY_URL,每页数量,MY_PARAMS||{}));
    if(list.length>0){
        list = 工具.force_order(list);
        if(!list[0].extra||!list[0].extra.id||!list[0].extra.cls){//选集列表大于0但是无id或者cls,循环修复后进行变量储存
            list.forEach((it,idex)=>{
                if(!it.extra){
                    it.extra = {}
                }
                if(!it.col_type){
                    it.col_type = col_type
                }
                let url = it.url.split('@')[0];
                let id = /hiker:\/\/empty/.test(url)?(idex+''):url;
                id = it.extra.id||id;
                Object.assign(it.extra,{
                    id:id,
                    cls:'playList'
                })
            });
            $.putList('showList.json',list);
        }else if(!list[0].col_type){
            list.forEach((it)=>{
                it.col_type = col_type
            });
            $.putList('showList.json',list);
        }else{
            $.putList('showList.json',list);
        }
    }else{
        $.putList('showList.json',[]);
    }
    let showList = list;//首次渲染的选集列表
    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
    if(nowPage>最大页数){//防止切换线路导致页数数组越界
        nowPage = 最大页数;
        putMyVar('选集翻页', ''+nowPage);
    }
    if(list.length>翻页阀值&&getMyVar('选集显示', '分页') === '分页'){
        let maxNum = 每页数量*nowPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = list.slice((nowPage-1)*每页数量,maxNum);
    }
    $.putList('nowList.json', showList);// 将当前页的选集变量储存列表
    if (getMyVar('顺序', '正序') === '逆序') {//对该页的数据进行正逆序排列
        showList = showList.reverse();
    }
    function jumpToPage(每页数量,toPage,nowPage,pageTitleInfo){//跳页
        if(nowPage===toPage){
            return //跳转页数等于当前页，不操作
        }
        // showLoading(`正在前往第${toPage}页,请稍等`);
        let oldIds = (findItemsByCls('playList')||[]).map(it=>it.extra.id);//老元素ids
        let showList = $.getList("showList.json"); //获取储存的选集列表
        // log(showList.length);
        let maxNum = 每页数量*toPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = showList.slice((toPage-1)*每页数量,maxNum);
        $.putList("nowList.json", showList);// 将当前页的选集变量储存列表
        if (getMyVar('顺序', '正序') === '逆序') {
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
    let btns = [];
    let seps = [];
    if(show_order&&list.length>0){
        let order_data = this.顺序切换(tab_cnt,list.length);
        d.push(order_data);
    }

    if(list.length>obj.size) {//传入的数据数组大于翻页的每页数量,已经包含大于0判断了
        let pageTitle = '';
        if (getMyVar('选集显示', '分页') === '分页') {
            pageTitleInfo = color('翻页模式已启用  本页:','#585858')+color('$cnt', '#d96715')+color('  共计:','#585858')+color(list.length, '#d96715')+color('集  第:','#585858') + color('$page'+'/'+最大页数, '#d96715')+color('页','#585858');
            pageTitleInfo = small(pageTitleInfo);
            pageTitle = pageTitleInfo.replace('$page',getMyVar('选集翻页', '1')).replace('$cnt',showList.length).replace(/““””/g,'');
        } else {
            pageTitle = color('翻页模式已关闭,点击启用','#585858');
            pageTitle = small(pageTitle).replace(/““””/g,'');
            pageTitle = pageTitle.replace(/““””/g,'');
        }
        d.push({
            title: pageTitle,
            col_type: showCol,
            pic_url:showPic,
            url: $('确认切换分页显示状态?').confirm(() => {
                let nextMode = getMyVar('选集显示', '分页') === '分页' ? '全部' : '分页';
                putMyVar('选集显示', nextMode);
                refreshPage(false); // 开关动态难以实现，放弃
                /*
                if(nextMode==='全部'){
                    let showList = storage0.getMyVar('showList'); //获取储存的选集列表
                    if (getMyVar('顺序', '正序') === '逆序') {//对该页的数据进行正逆序排列
                        showList = showList.reverse();
                    }
                    deleteItemByCls('playList');
                    addItemAfter('page',showList);
                }
                */
                return 'hiker://empty'
            }),
            extra:{
                id:'pageTitle'
            }
        });
        if (getMyVar('选集显示', '分页') === '分页') {
            btns.push({
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
                    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                    let toPage = Math.ceil(toNum/每页数量);
                    putMyVar('选集翻页', '' + toPage);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'toast://已跳到列表元素第'+toNum+'个所在页码:'+toPage
                },list.length,每页数量,pageTitleInfo,jumpToPage)
            });
            btns.push({
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
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'toast://已跳到第'+toPage+'页'
                },最大页数,每页数量,pageTitleInfo,jumpToPage)
            });
            btns.push({
                title: '⏮️上页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((每页数量,pageTitleInfo,jumpToPage) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = nowPage - 1;
                    if(toPage>0) {
                        putMyVar('选集翻页', '' + toPage);
                        jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                        return 'hiker://empty'
                    }else{
                        return 'toast://已经没有上一页了!'
                    }
                },每页数量,pageTitleInfo,jumpToPage)
            });
            btns.push({
                title: '⏭️下页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((最大页数,每页数量,pageTitleInfo,jumpToPage) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = nowPage + 1;
                    if(toPage>最大页数){
                        return 'toast://已经没有下一页了!'
                    }
                    putMyVar('选集翻页', '' + toPage);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'hiker://empty'
                },最大页数,每页数量,pageTitleInfo,jumpToPage)
            });
            btns.push({
                title: '🔚尾页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((最大页数,每页数量,pageTitleInfo,jumpToPage) => {
                    let toPage = 最大页数;
                    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                    putMyVar('选集翻页', ''+toPage);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo);
                    return 'toast://已跳转到第'+最大页数+'页'
                },最大页数,每页数量,pageTitleInfo,jumpToPage)
            });
            seps.push({
                col_type:"line_blank",
                extra:{
                    id:'page' // 给翻页组件做id用
                }
            })
        }
    }
    if(showTop){
        Array.prototype.push.apply(d,btns);//顶部显示翻页开关
    }
    Array.prototype.push.apply(d,seps);//下面分割
    Array.prototype.push.apply(d,showList);//刷新有效的链接
    if(showBottom){
        d.push({col_type:"line_blank"});
        Array.prototype.push.apply(d,btns);//底部显示翻页开关
    }
    // d = d.concat(showList);//刷新有效的链接，不支持concat
    return d
},
储存足迹(MY_URL,size,MY_PARAMS){
    size = size||Number(储存.getItem('每页数量',40));//每页数量
    MY_URL = MY_URL.replace('hiker://empty##').split('#')[0];
    let list = $.getList('footHistory.json');
    let footIdex = list.findIndex(x=>x.url===MY_URL);
    let item = {url:MY_URL,page:Number(getMyVar('选集翻页','1')),size:size};
    if(MY_PARAMS.title){
        Object.assign(item,{title:MY_PARAMS.title});
    }
    if(footIdex>-1){
        list[footIdex] = item;
    }else{
        list.push(item);
    }
    $.putList('footHistory.json',list);
    // log('已储存足迹:'+JSON.stringify(list));
},
加载足迹(MY_URL,size){
    size = size||Number(储存.getItem('每页数量',40));//每页数量
    MY_URL = MY_URL.replace('hiker://empty##').split('#')[0];
    let lastUrl = getMyVar('lastUrl','');
    if(lastUrl!==MY_URL) {//上个链接不等于当前链接才处理足迹
        let list = $.getList('footHistory.json');
        let footItem = list.find(x => x.url === MY_URL);
        let page = footItem && footItem.page ? footItem.page + '' : '1';
        if(footItem&&footItem.page&&footItem.size!==size){
            page = (footItem.page * footItem.size)/size;
            page = Math.ceil(page)+'';
            log(`${footItem.title||''}足迹已加载,正确页数:`+page);
        }
        putMyVar('lastUrl',MY_URL);
        putMyVar('选集翻页', page);
    }
},
};

var 模板 = {
一级(parStr,ej,onlyback,html){
    return 组件.一级通用(parStr,ej,onlyback,html);
},
自动一级(){

},
二级(){

},
自动二级(){

},
自动搜索(){

},
获取正确链接(rule,url,调试){
    true_url = (typeof(true_url)!=='undefined'&&true_url)?true_url:getMyVar('header.url', MY_URL); //隐式全局变量，外面可以不传
    page = (typeof(page)!=='undefined'&&page)?page:MY_PAGE;
    rule = rule||[];
    url = url||'';
    调试 = 调试||false;
    if(url.startsWith('hiker://')){
        try {
            let code = fetch(url);
            eval(code);
            if (rule.constructor === Array) {
                rule = rule.concat(matches);
            } else {
                matches.unshift(rule);
                rule = matches;
            }
        }catch (e) {}
    }
    // log($.stringify(rule));
    let 链接处理工具 = require('http://hiker.nokia.press/hikerule/rulelist.json?id=2849');
    if(调试){
        链接处理工具.debug();
    }
    true_url = 链接处理工具
        .链接(true_url)
        .页码(page)
        .插入新处理规则(rule)
        .获取处理结果();
    return true_url
},
打造动态分类(定位列表,extra){
    page = (typeof(page)!=='undefined'&&page)?page:MY_PAGE;
    let cates=[];
    if((Array.isArray(定位列表)&&定位列表.length<1)||!Array.isArray(定位列表)){
        return cates
    } else if(Array.isArray(定位列表)&&定位列表.length>0&&!定位列表[0].一级分类){//一级分类为空也返回空
        return cates
    }
    extra = extra||{};
    单次请求 = extra.单次请求||false;
    分类颜色 = extra.分类颜色||(lsg.getItem('分类颜色','#1aad19')||'#1aad19');
    源码 = extra.源码||'';
    折叠 = extra.关闭折叠||'';
    模式 = extra.模式||'';
    if(折叠!==''){
        关闭折叠 = !!折叠;
    }else {
        关闭折叠 = typeof (关闭折叠) === 'undefined' ? false : 关闭折叠;
    }
    if(源码) {
        html = 源码;
    }else{
        html = (typeof (html) === 'undefined' || !html) ? (单次请求 ? getResCode() : 获取源码(true_url)) : html;//全局变量,外部传进来的
    }
    const 当前折叠状态 = getMyVar('header.fold', '1');
    let 动态分类=require(version.jsRoot+'dt.js');
    let drzd = '““””<b><span style="color: #FF0000">∨</span></b>';
    let drzk = '““””<b><span style="color: #1aad19">∧</span></b>';
    动态分类.界面(cates)
        .分类链接(true_url)
        .选中的分类颜色(分类颜色)
        .源码(html)
        .页码(page)
        .添加分类定位(定位列表)
    if(!关闭折叠){
        动态分类.开启内置折叠功能() // 必须
            .折叠按钮样式({ title: 当前折叠状态==="1"?(lsg.getItem('折叠样式',drzd)||drzd):(lsg.getItem('展开样式',drzk)||drzk) }) // 可选
            .第几行开始折叠(1) // 可选
            .折叠按钮样式({ 折叠按钮插入行: 1 })
            .折叠(当前折叠状态)  // 必须
    }
    动态分类.开始打造分类();
    return cates
},
};

if(!$.依赖||$.依赖!==version.requireId){
    初始化();
}
