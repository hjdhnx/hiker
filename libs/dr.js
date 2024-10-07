var updateLog = `
2022/08/24 废除部分代码
2022/08/22 优化自动模板匹配的通用免嗅,修复搜索的自动匹配
2022/08/21 记录翻页位置(伪足迹,不能解决翻页但是没观看的足迹问题),智能最新章节优化
2022/08/20 增强小说模式免嗅探，内置净化内容,优化自动匹配抛错问题,一级处理判断 自动匹配属性为真的时候才抛错。二级增加双击线路名称快速切换选集按钮样式
2022/08/19 增强漫画模式免嗅探
2022/07/28 coding依赖链接全部转移至csdn
2022/07/15 修复蓝莓影视多多资源没法通免的问题
2022/07/08 增加config.ui插件，可被引用
2022/07/07 封装了另外一套常用动态分类写法，函数为动态分类(一级列表变量)
2022/07/06 优化动态翻页逻辑，增加bug
2022/07/05 dr模板升级到5.0，二级翻页组件升级为动态元素切换
2022/07/04 调整自动一级函数的参数顺序，html参数改到cates之后
2022/06/29 新增磁力兼容,新增嗅探结果处理
2022/06/21 增加牛逼功能二级处理=>附加数据,附加数据标题，内容附加折叠到简介后面
2022/06/20 兼容磁力链接动态解析
一级提速半秒以上，相比以前提升1.2倍。3.0支持套小说了!支持完美自动获取智能最新章节.支持验证码识别.小说模式优化。二级页面带cookie.取消程序自毁.支持小说下载。新增收藏二级显示单规则名
`.trim();
var version={
    author:"道长",
    ver:"5.2.1",
    // appv:2316,
    appv:583,
    requireId:"http://hiker.nokia.press/hikerule/rulelist.json?id=2505",
    update:'2022/08/24 14:25',
    info:updateLog,
    ua:';get;utf-8;{User-Agent@Mozilla/5.0&&Cookie@}',
    ok:'https://okjx.cc/?url=',
    jsRoot:'https://dr.playdreamer.cn/js/',
};
putVar('dr依赖',version.requireId);
/*
var lsg = (function() {
    evalPrivateJS("XnUmRAbE641s4myhkr5brclFfsHk4YBZw7AEwR2RDZo=");
    pathto=undefined;
    evalPrivateJS("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");
    return $.exports;
})();
*/
var lsg = evalPrivateJS("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");

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

var 取随机颜色 = function() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

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

if(typeof(config)==='undefined'||!config){
    // eval('config = {}');
    var config = {};
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
    return '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
}
function isPic(str){
    return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str);
}
function gbk编码(code){
    return encodeStr(code, 'GBK');
}


function getJdCk(ck){//获取京东cookie
    // m.jd.com 登录后取gif上面的cookie. 服务器里 docker-compose up -d
    // docker exec -it jd_scripts /bin/sh -c "node /scripts/jd_bean_sign.js |ts >> /scripts/logs/jd_bean_sign.log 2>&1"
    // docker exec -it jd_scripts /bin/sh -c "node /scripts/jd_fruit.js |ts >> /scripts/logs/jd_fruit.log 2>&1"
    // 青龙面板拉库 ql repo https://ghproxy.com/https://github.com/okyyds/yydspure.git "jd_|jx_|gua_|jddj_|jdCookie" "activity|backUp" "^jd[^_]|USER|function|utils|sendNotify|ZooFaker_Necklace.js|JDJRValidator_|sign_graphics_validate|ql|JDSignValidator" "master
    // 修复依赖 01  docker exec -it qinglong bash
    // 修复依赖 02  curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/shufflewzc/QLDependency/main/Shell/QLOneKeyDependency.sh | sh
    // 教程 https://thin-hill-428.notion.site/1c598629675145988b43a37998a1604a
    // 教程 https://blog.csdn.net/qq_29183811/article/details/120247352
    // 教程 https://thin-hill-428.notion.site/Ninja-7e693618f706453ab01d869fbd2adb69
    // 配置环境变量: JD_COOKIE
    // nginx -s reload ql.nokia.press
    document = typeof(document)!=='undefined'?document:{};
    ck = ck||document.cookie;
    let obj = ck.split(';').map(it=>{return {key:it.split('=')[0].trim(),value:it.split('=')[1].trim()}});
    obj = obj.filter(it=> ['pt_pin','pt_key'].includes(it.key));
    obj=obj.map(it=>it.key+'='+it.value);
    return obj.join(';')
}
function getTxCk(ck){//获取腾讯视频cookie
    document = typeof(document)!=='undefined'?document:{};
    ck = ck||document.cookie;
    let obj = ck.split(';').map(it=>{return {key:it.split('=')[0].trim(),value:it.split('=')[1].trim()}});
    obj = obj.filter(it=> ['vqq_appid','vqq_openid','vqq_access_token','vqq_vusession','vqq_vuserid'].includes(it.key));
    obj=obj.map(it=>it.key+'='+it.value);
    return obj.join(';')
}

function getAliToken() {//获取阿里云的refreshtoken,网页版登录后控制台执行即可
    //这个cookie获取后无法使用文件直链，需要去手机app抓token
    //获取移动端cookie；https://alist-doc.nn.ci/docs/driver/aliyundrive
    return JSON.parse(localStorage.token).refresh_token;
}

function 预处理固定代码(){//使用: require(version.jsRoot+'预处理.js')
    var dr_jsRoot = 'https://dr.playdreamer.cn/js/';
    try {
        const {getApi} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
        var 模板 = getApi('importUrl')+"2505";
        require(模板);
        预处理(模板)
    }catch (e) {
        log('预处理执行失败:'+e.message);
        var 模板 = dr_jsRoot+'dr.js';
        require(模板);
        预处理(模板)
    }
}

function 检测依赖固定代码(){
    // codeberyRoot:'https://gitlab.com/hjdhnx/hiker/-/raw/main/js/',
    // gitlabRoot:'https://codeberg.org/hjdhnx/hiker/raw/branch/main/js/',
    require('https://codeberg.org/hjdhnx/hiker/raw/branch/main/js/依赖检测.js');
    require('https://gitlab.com/hjdhnx/hiker/-/raw/main/js/依赖检测.js');
    检测依赖();
    //加密后
    evalPrivateJS('4ZFai6WdmDyH6oz/nhtVRLmKvoUg5wsLHMYcQURS3FcFSnRsh1drySmlUaq9i+3wo+Jg4/0WltZSeEhk515pl8ugSp/sJ0bZBw6cihfXZOTm6bWDcENtECiauhBo5b3DVfanahs/y0iZxcSL0PJAcQ==');
    //新的加密后
    evalPrivateJS('4ZFai6WdmDyH6oz/nhtVROAIx1c0dRGZtfmf6PyWCr6dHnPVIOLddKI4gXInyEoixmC+cyqM8V/plDjccHPKYdMRRu3DLjeWtkw/W5GbPWQVKdbbEohqdTqYxEM0KWdh');
}

function 依赖检测(){ // 一级进行依赖检测，固定写法，废弃原来的检测依赖固定代码
    require(version.jsRoot+'依赖检测.js');
    检测依赖();
}

function 预处理(模板参数,ckUrl){
    模板参数 = 模板参数||false;
    ckUrl=ckUrl||"";
    // log('进入了预处理...');
    模板 = (typeof(模板)!=='undefined'&&模板)?模板:模板参数;
    验证码 = (typeof(验证码)!=='undefined'&&验证码)?验证码:ckUrl;
    ua = (typeof(ua)!=='undefined'&&ua)?ua:false;//指定ua  var ua = PC_UA;
    let 全局ua=lsg.getItem('ua','电脑');//电脑 手机
    let obj = {
        模板:模板||config.模板,
        样式:['滚动','默认'].includes(lsg.getItem('样式','滚动'))?lsg.getItem('样式','滚动'):'滚动',//或者不填就是默认
        按钮样式:lsg.getItem('按钮样式',''),//空
        ua:全局ua,
    }
    if(ua){//指定ua加入config
        Object.assign(obj,{指定ua:ua});
    }
    initConfig(obj);
    let def_ua = 全局ua==='手机'?MOBILE_UA:PC_UA;//根据全局UA获得的ua字符串
    def_ua = ua||def_ua; // 取指定ua和全局ua中的
    // log('本小程序预处理默认UA:'+def_ua);
    //先预处理依赖,后获取cookie
    if(/^http/.test(验证码)){
        // log('验证码:'+验证码);
        if(!getMyVar('cookie')){
            let ret = fetchCookie(验证码, {
                headers: {
                    "User-Agent": def_ua
                }
            });
            // log('cookie:'+ret);
            let cookie = JSON.parse(ret||'[]');
            putMyVar('cookie', cookie.join(';'));
        }
    }
    引入动态分类()
}

function 匹配设置(col_type){//用于一级设置
    let d = [];
    col_type = col_type||'scroll_button';
    d.push({
        title:'清除匹配记录',
        col_type:col_type,
        url:$('清空匹配记录下次会重新匹配,第一次匹配速度将变慢,确认清空?').confirm(()=>{
            clearMyVar('ssmuban');
            clearMyVar('muban');
            clearMyVar('yjmuban');
            return 'toast://二级模板与搜索模板匹配记录已清除'
        })
    });

    function localMb(local){//本地模板
        // local: 一级模板,二级模板,搜索模板
        // writeFile(root+local+'.json',JSON.stringify(inner));
        // return inner
        var root = 'hiker://files/rules/dzHouse/json/'; //模板根目录
        let code = fetch(root+local+'.json')||'[]';
        try {
            return JSON.parse(code);
        }catch (e) {
            log(`本地${local}:${root+local+'.json'}有误:`+e.message);
            log(code);
            return []
        }
    }
    d.push({
        title:"指定一级模板",
        col_type:col_type,
        url:$('#noLoading#').lazyRule((localMb)=>{
            let now = JSON.parse(getMyVar('yjmuban','{}')).名称||false;
            log('当前一级模板:'+now);
            let sel = localMb('一级模板').map(it=>now&&it.名称===now?'👉'+it.名称:it.名称);
            return $(sel,2,'请指定一个一级模板').select(()=>{
                input = input.replace(/👉/g,'');
                // log(input);
                putMyVar('yjmuban',JSON.stringify({名称:input})); //匹配成功保存上次匹配的模板,下次匹配直接排第一个
                refreshPage(false);
                return 'hiker://empty'
            })
        },localMb)
    });
    d.push({
        title:"指定二级模板",
        col_type:col_type,
        url:$('#noLoading#').lazyRule((localMb)=>{
            let now = JSON.parse(getMyVar('muban','{}')).名称||false;
            log('当前二级模板:'+now);
            let sel = localMb('二级模板').map(it=>now&&it.名称===now?'👉'+it.名称:it.名称);
            return $(sel,2,'请指定一个二级模板').select(()=>{
                input = input.replace(/👉/g,'');
                // log(input);
                putMyVar('muban',JSON.stringify({名称:input})); //匹配成功保存上次匹配的模板,下次匹配直接排第一个
                refreshPage(false);
                return 'hiker://empty'
            })
        },localMb)
    });
    d.push({
        title:"指定搜索模板",
        col_type:col_type,
        url:$('#noLoading#').lazyRule((localMb)=>{
            let now = JSON.parse(getMyVar('ssmuban','{}')).名称||false;
            log('当前搜索模板:'+now);
            let sel = localMb('搜索模板').map(it=>now&&it.名称===now?'👉'+it.名称:it.名称);
            return $(sel,2,'请指定一个搜索模板').select(()=>{
                input = input.replace(/👉/g,'');
                // log(input);
                putMyVar('ssmuban',JSON.stringify({名称:input})); //匹配成功保存上次匹配的模板,下次匹配直接排第一个
                refreshPage(false);
                return 'hiker://empty'
            })
        },localMb)
    });
    let nextMode = lsg.getItem('dr_mode','WEB')==='WEB'?'APP':'WEB';
    d.push({
        title:'模式:'+color(lsg.getItem('dr_mode','WEB'),'#1aad19'),
        col_type: col_type,
        url:$('#noLoading#').lazyRule((nextMode)=>{
            return $(`切换一级匹配模式为${nextMode}?`).confirm((nextMode)=>{
                require(getVar('dr依赖'));
                lsg.setItem('dr_mode',nextMode);
                refreshPage(false);
                return 'hiker://empty'
            },nextMode)
        },nextMode)
    });
    return d
}

function 设置(d,end){
    end = end||false;
    if(typeof(page)==='undefined'||!page){
        page = MY_PAGE||1;
    }
    if(parseInt(page)===1) {
        if(!getMyVar('是否进入规则','')){
            try {
                eval(fetch(version.jsRoot+'更新.js',{timeout:2000}));
                let jsUpdate = new Date(updateT).getTime();
                // 依赖更新时间默认为当前减去一天
                let localDate = lsg.getItem('dr依赖更新时间',''+(new Date().getTime()-3600*24*1000));
                // if(parseInt(jsUpdate)!==parseInt(localDate)){
                if(parseInt(jsUpdate)>parseInt(localDate)){
                    log('云端依赖更新时间:'+jsUpdate+'\n,本地依赖更新时间:'+localDate);
                    confirm({
                        title:'更新完毕',
                        // content:'已自动更新依赖\n本地依赖时间:'+new Date(parseInt(localDate)).toLocaleString()+'\n云端最新时间:'+new Date(jsUpdate).toLocaleString(),
                        content:'已自动更新依赖\n本地依赖时间:'+$.dateFormat(new Date(parseInt(localDate)),"yyyy-MM-dd HH:mm:ss")+'\n云端最新时间:'+$.dateFormat(new Date(jsUpdate),"yyyy-MM-dd HH:mm:ss"),
                    });
                    try {
                        更新依赖();
                        lsg.setItem('dr依赖更新时间',''+jsUpdate);
                        refreshPage(true);
                    }catch (e) {}
                }
            }catch (e) {
                //confirm({title:'提示',content:e.message})
                log(new Date().toLocaleString()+'检测更新错误,可能是超时返回了空源码:'+e.message)
            }
        }
        putMyVar('是否进入规则','是');
        let settings = {
            title: '⚙️设置',
            col_type: 'scroll_button',
            url: $().rule((color,htmlTag,blank) => {
                try {
                    require(getVar('dr依赖'));
                }catch (e) {
                    setResult([{
                        title:e.message,
                        col_type:'long_text',
                        url:'hiker://empty'
                    }]);
                }
                function small(text) {
                    return htmlTag("small", text);
                }
                let d = [];
                addListener('onClose', $.toString(()=>{
                    // refreshPage(false); //返回自动刷新使设置生效
                }));
                d.push({
                    title: '小程序个性化设置 '+blank()+small(color('帮助','#0048ff')),
                    desc: 'dr模板(道长多功能模板+reborn动态分类)\n影视/漫画/听书/小说/图片/随机小姐姐',
                    col_type: 'text_1',
                    url: $().rule(()=>{
                        setPageTitle('影漫模板套娃帮助');
                        require(config['模板']);
                        require("http://hiker.nokia.press/hikerule/rulelist.json?id=3187");//md插件
                        let d = [];
                        // let help = fetch(version.jsRoot+'帮助.html');
                        let help = "#### 获取帮助失败,请检查网络";
                        try {
                            help = fetch(version.jsRoot+'dr_help.md');
                        }catch (e) {}
                        d.push({
                            title:'<h4>更新日志:</h4><div>'+version.info.replace('\n','<br>')+'</div>',
                            col_type:'rich_text'
                        });
                        d.push({
                            // title:help,
                            title:marked.parse(help),
                            col_type:'rich_text'
                        });
                        setResult(d);
                    })
                });
                let all_cols = [''].concat(getColTypes());
                // ['','text_2','text_3','text_4','text_5','flex_button']
                let 按钮样式 = all_cols.map((it) => {
                    return it === (lsg.getItem('按钮样式', '')||'') ? '👉' + it : it;
                });
                d.push({
                    title: '选集按钮样式:' + (lsg.getItem('按钮样式', '')||''),
                    col_type: 'text_1',
                    url: $(按钮样式, 2, '请选择选集按钮样式').select(() => {
                        require(getVar('dr依赖'));
                        input = input.replace(/👉/g, '');
                        lsg.setItem('按钮样式', input);
                        refreshPage(true);
                        return 'toast://已切换选集按钮样式为:' + input;
                    })
                });

                let zdcs = '““””<b><span style="color: #FF0000">∨</span></b>';
                let zdcss = lsg.getItem('折叠样式',zdcs)||zdcs;
                d.push({
                    title:'动态分类折叠按钮样式:'+zdcss,
                    col_type:'text_1',
                    url:$(zdcss).input(()=>{
                        require(getVar('dr依赖'));
                        lsg.setItem('折叠样式',input);
                        refreshPage(false);
                        return 'hiker://empty'
                    })
                });
                let zkcs='““””<b><span style="color: #1aad19">∧</span></b>';
                let zkcssd = lsg.getItem('展开样式',zkcs)||zkcs;
                d.push({
                    title:'动态分类展开按钮样式:'+zkcssd,
                    col_type:'text_1',
                    url:$(zkcssd).input(()=>{
                        require(getVar('dr依赖'));
                        lsg.setItem('展开样式',input);
                        refreshPage(false);
                        return 'hiker://empty'
                    }),
                    extra:{
                        lineVisible:false
                    }
                });
                d = d.concat(匹配设置());
                let catecolor = '#1aad19';
                catecolor = (lsg.getItem('分类颜色',catecolor)||catecolor);
                d.push({
                    title:'分类颜色:'+color(catecolor,catecolor),
                    col_type:'text_2',
                    url:$(catecolor).input(()=>{
                        require(getVar('dr依赖'));
                        lsg.setItem('分类颜色',input);
                        refreshPage(false);
                        return 'toast://已设置分类按钮颜色为:'+input
                    })
                });
                let jjwords = '100';
                d.push({
                    title:'简介字数:'+color(lsg.getItem('简介字数',jjwords),'#ff7000'),
                    col_type:'text_2',
                    url:$(jjwords).input(()=>{
                        if(!parseInt(input)||parseInt(input)<=0){
                            return 'toast://请设置字数必须大于0'
                        }
                        require(getVar('dr依赖'));
                        lsg.setItem('简介字数',input);
                        refreshPage(false);
                        return 'toast://已设置简介字数为:'+input
                    })
                });

                let 模板样式 = ['滚动', '默认'].map((it) => {
                    return it === lsg.getItem('样式', '滚动') ? '👉' + it : it;
                });
                d.push({
                    title: '样式:' + lsg.getItem('样式', '滚动'),
                    col_type: 'text_3',
                    url: $(模板样式, 2, '请选择模板样式').select(() => {
                        require(getVar('dr依赖'));
                        input = input.replace(/👉/g, '');
                        lsg.setItem('样式', input);
                        refreshPage(true);
                        return 'toast://已切换模板样式为:' + input;
                    })
                });

                d.push({
                    title:"通免:"+color(lsg.getItem("通免","WEB"),"#ff7000"),
                    col_type:"text_3",
                    url:$('#noLoading#').lazyRule(()=>{
                        require(getVar('dr依赖'));
                        if(lsg.getItem("通免","X5")==="X5"){
                            lsg.setItem("通免","WEB");
                        }else{
                            lsg.setItem("通免","X5");
                        }
                        refreshPage(false);
                        return "toast://已设置仓库通免模式为:"+lsg.getItem("通免");
                    })
                });

                d.push({
                    title:"超时:"+color(lsg.getItem("timeout","5000"),"#ff7000"),
                    col_type:"text_3",
                    url:$(lsg.getItem("timeout","5000"),'请输入通免超时毫秒数').input(()=>{
                        require(getVar('dr依赖'));
                        if(Number(input)){
                            lsg.setItem("timeout",input);
                            refreshPage(false);
                            return "toast://已设置仓库通免超时时间为:"+lsg.getItem("timeout");
                        }else{
                            return "toast://超时设置不合理,必须为整数。推荐5000~15000";
                        }
                    })
                });

                let ua = ['电脑', '手机'].map((it) => {
                    return it === (lsg.getItem('ua', '电脑')||'电脑') ? '👉' + it : it;
                });
                d.push({
                    title: '全局UA:' + (lsg.getItem('ua', '电脑')||'电脑'),
                    col_type: 'text_2',
                    url: $(ua, 2, '请选择全局UA').select(() => {
                        require(getVar('dr依赖'));
                        input = input.replace(/👉/g, '');
                        lsg.setItem('ua', input);
                        refreshPage(true);
                        return 'toast://已切换全局UA为:' + input;
                    })
                });
                let 分隔符 = ['双空格', '换行符'].map((it) => {
                    return it === (lsg.getItem('分隔符', '换行符')||'换行符') ? '👉' + it : it;
                });
                d.push({
                    title: '分隔符:' + (lsg.getItem('分隔符','换行符')||'换行符'),
                    col_type: 'text_2',
                    url: $(分隔符, 2, '请选择分隔符').select(() => {
                        require(getVar('dr依赖'));
                        input = input.replace(/👉/g, '');
                        lsg.setItem('分隔符', input);
                        refreshPage(true);
                        return 'toast://已切换分隔符为:' + input;
                    })
                });

                d.push({
                    title:'清除已选动态分类',
                    col_type:'text_2',
                    url:$('因开发者未过滤错误分类导致切换到该分类后源码全丢,可通过此按钮重置，是否继续?').confirm(()=>{
                        clearMyVar('header.url');
                        clearMyVar('header.category');
                        // clearMyVar('header.fold');
                        return 'toast://已清除'
                    })
                });
                d.push({
                    title:'清除cookie',
                    col_type:'text_2',
                    url:$('开发者用于测试是否成功过网站验证的好帮手,清除后需要重新验证，继续?').confirm(()=>{
                        clearMyVar('cookie');
                        clearMyVar('请求头');
                        return 'toast://已清除cookie及请求头'
                    })
                });
                d.push({
                    title:'翻页阀值:'+color(lsg.getItem('翻页阀值',40),'#d96715'),
                    col_type:'text_2',
                    url:$(lsg.getItem('翻页阀值',40),'最低指定线路选集总数超过此值才会显示翻页元素').input(()=>{
                        if(isNaN(parseInt(input))){
                            return 'toast://滚犊子吧,输入的都不是数字'
                        }
                        let num = parseInt(input);
                        if(num<40){
                            return 'toast://不可以小于40，谢谢'
                        }
                        require(getVar('dr依赖'));
                        lsg.setItem('翻页阀值',num+'');
                        refreshPage(false);
                        return 'toast://已保存'
                    })
                });
                d.push({
                    title:'每页数量:'+color(lsg.getItem('每页数量',40),'#d96715'),
                    col_type:'text_2',
                    url:$(lsg.getItem('每页数量',40),'满足选集翻页模式时每页显示选集数量').input(()=>{
                        if(isNaN(parseInt(input))){
                            return 'toast://滚犊子吧,输入的都不是数字'
                        }
                        let num = parseInt(input);
                        if(num<40){
                            return 'toast://不可以小于40，谢谢'
                        }
                        require(getVar('dr依赖'));
                        lsg.setItem('每页数量',num+'');
                        refreshPage(false);
                        return 'toast://已保存'
                    })
                });
                d.push({
                    title:'清空翻页足迹',
                    col_type:'text_3',
                    url:$('清除所有dr小程序的二级翻页足迹，是否继续?').confirm(()=>{
                        require(getVar('dr依赖'));
                        lsg.removeItem('footHistory'); //移除足迹
                        refreshPage(false);
                        return 'toast://已清除足迹'
                    })
                });
                d.push({
                    title:'恢复出厂设置',
                    col_type:'text_3',
                    url:$('恢复所有自定义配置项为默认，是否继续?').confirm((zkcs,zdcs)=>{
                        require(getVar('dr依赖'));
                        clearMyVar('header.url');
                        lsg.clear(); //清除所有
                        lsg.setItem('分类颜色','#1aad19');
                        lsg.setItem('展开样式',zkcs);
                        lsg.setItem('折叠样式',zdcs);
                        lsg.setItem('分隔符', '换行符');
                        lsg.setItem('ua', '电脑');
                        lsg.setItem('按钮样式', '');
                        lsg.setItem('样式', '滚动');
                        // clearItem('dr_mode');
                        lsg.setItem('dr_mode','WEB');
                        // lsg.removeItem('footHistory');
                        refreshPage(false);
                        return 'toast://已恢复'
                    },zkcs,zdcs)
                });
                d.push((new 匹配设置('text_3')).slice(-1)[0]);//将匹配的模式切换最后一个放进去
                d.push({
                    title: '🔙返回并刷新生效',
                    desc:'为节省性能，直接点左上角返回不会刷新和生效',
                    col_type: 'text_1',
                    url: $('#noLoading#').lazyRule(() => {
                        clearMyVar('是否进入规则');
                        back(true)
                        return 'hiker://empty'
                    })
                });
                d.push({
                    title: '♻清除依赖并返回升级',
                    desc:'清除所有dr依赖,等同于长按小程序标题清除缓存',
                    col_type: 'text_1',
                    url: $('确认清除所有dr系列小程序的缓存依赖吗?').confirm(() => {
                        deleteCache();
                        clearMyVar('是否进入规则');
                        back(true)
                        return 'toast://模块依赖缓存已清除'
                    })
                });
                setResult(d);
            },color,htmlTag,blank)
        };
        if(!end){
            d.unshift(settings)
        }else{
            d.splice(-1, 0, settings);
        }
    }
}
function 引入动态分类(){
    initConfig({
        categoryLib: 'http://hiker.nokia.press/hikerule/rulelist.json?id=2705',
        categoryLocalLib: 'hiker://files/rules/js/categories-header.js',
        categoryGiteeLib: 'https://gitee.com/reborn0/HikerRules/raw/master/plugins/categories-header.js',
        categoryCodeBergLib: version.jsRoot+'categories-header.js',
        UrlProcessorLib: 'http://hiker.nokia.press/hikerule/rulelist.json?id=2849',
        UrlProcessorLocalLib: 'hiker://files/rules/js/UrlProcessor.js',
        UrlProcessorGiteeLib: 'https://gitee.com/reborn0/HikerRules/raw/master/plugins/UrlProcessor.js',
        动态分类匹配:'hiker://files/rules/js/动态分类匹配.js',
        // 自动匹配:'https://gitlab.com/hjdhnx/hiker/-/raw/main/js/自动模板匹配.js',
        自动匹配:version.jsRoot+'自动模板匹配.js',
        通免:version.jsRoot+'lazy.js',
        ui:version.jsRoot+'hikerUi.js',//dr增加组件库,可写json类数据
    });
}
function 动态分类(d){//另一套动态分类写法
    const empty = "hiker://empty"

    try {
        var categories = pdfa(html, 大类定位).concat(pdfa(html, 拼接分类))
    } catch (e) {
        var categories = pdfa(html, 大类定位)
    }

    let init_cate = []

    for (let i = 0; i < 20; i++) {
        init_cate.push("0")
    }

    const fold = getMyVar('header.fold', "0")
    const cate_temp_json = getMyVar('header.category', JSON.stringify(init_cate))
    const cate_temp = JSON.parse(cate_temp_json)

    if (parseInt(MY_PAGE) === 1) {
        d.push({
            title: fold === '1' ? '““””<b><span style="color: #FF0000">∨</span></b>' : '““””<b><span style="color: #1aad19">∧</span></b>',
            url: $('#noLoading#').lazyRule((fold) => {
                putMyVar('header.fold', fold === '1' ? '0' : '1');
                refreshPage(false);
                return "hiker://empty"
            }, fold),
            col_type: 'scroll_button',
        })


        categories.forEach((category, index) => {
            let sub_categories = pdfa(category, 小类定位);
            if (index === 0) {
                sub_categories.forEach((item, key) => {
                    let title = pdfh(item, 分类标题)
                    d.push({
                        title: key.toString() === cate_temp[index] ? '““””<b><span style="color: ' + 分类颜色 + '">' + title + '</span></b>' : title,
                        url: $(pd(item, 分类链接) + '#noLoading#').lazyRule((params) => {
                            let new_cate = []
                            params.cate_temp.forEach((cate, index) => {
                                new_cate.push(index === 0 ? params.key.toString() : "0")
                            })
                            putMyVar('header.category', JSON.stringify(new_cate))
                            putMyVar('header.url', input)
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            cate_temp: cate_temp,
                            key: key,
                            page: page,
                        }),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    col_type: "blank_block"
                });
            } else if (fold === '1') {
                sub_categories.forEach((item, key) => {
                    let title = pdfh(item, 分类标题)
                    d.push({
                        title: key.toString() === cate_temp[index] ? '““””<b><span style="color: ' + 分类颜色 + '">' + title + '</span></b>' : title,
                        url: $(pd(item, 分类链接) + '#noLoading#').lazyRule((params) => {
                            params.cate_temp[params.index] = params.key.toString()

                            putMyVar('header.category', JSON.stringify(params.cate_temp))
                            putMyVar('header.url', input)
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            cate_temp: cate_temp,
                            index: index,
                            key: key,
                            page: page,
                        }),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    col_type: "blank_block"
                });
            }
        })
    }
    return d
}

function 香免(){//香佬通免
    require(config.通免||version.jsRoot+'lazy.js');
}

function 混合(fn,detailUrl,system,web_url){//混合一级
    if(typeof(system)==='undefined'){
        system = true; // 如果不传就不要拦截设置
    }
    web_url = web_url||false;
    if(lsg.getItem('dr_mode','WEB')==='APP'){
        refreshX5Desc('float&&0');
        refreshX5WebView('http://127.0.0.1:4848');//强制退出x5
        var page = MY_PAGE;
        fn(); // 执行混合函数,混合函数一般是下面这种自动一级函数
        /*
        true_url = 获取正确链接();
        let cates = 打造动态分类([]);
        设置(cates);
        自动一级(null,null,cates);
         */
    }else{
        依赖检测();
        // 一级书签('$detailUrl','$system');
        if(web_url){
            MY_URL = web_url.startsWith('http')?web_url:getHome(MY_URL.replace('hiker://empty##',''))+web_url
        }
        一级书签(detailUrl||'detail',system);
    }
}

function 加载动态分类(mode){
    // 模式不填就是gitee,1本地，2仓库,只能在一级里用此方法，并且预处理必须先加载
    var jsUrl;
    switch (mode) {
        case 0:
            jsUrl = config.categoryGiteeLib
        case 1:
            jsUrl = config.categoryLocalLib
            break;
        case 2:
            jsUrl = config.categoryLib
            break;
        default:
            jsUrl = config.categoryCodeBergLib
    }
    let htmlCategories=require(jsUrl);
    return htmlCategories; //返回动态分类对象
}

function 加载链接处理(mode){
    var jsUrl;
    switch (mode) {
        case 0:
            jsUrl = config.UrlProcessorGiteeLib
        case 1:
            jsUrl = config.UrlProcessorLocalLib
            break;
        case 2:
            jsUrl = config.UrlProcessorLib
            break;
        default:
            jsUrl = config.UrlProcessorLib
    }
    let 链接处理工具=require(jsUrl);
    return 链接处理工具; //返回链接处理工具对象
}

function 加载魔断(){
    // let tools = 加载魔断() tools.renrenmi
    return require('http://hiker.nokia.press/hikerule/rulelist.json?id=2971');
}

function 打造动态分类(定位列表,extra){
    let cates=[];
    if((Array.isArray(定位列表)&&定位列表.length<1)||!Array.isArray(定位列表)){
        return cates
    } else if(Array.isArray(定位列表)&&定位列表.length>0&&!定位列表[0].一级分类){//一级分类为空也返回空
        return cates
    }
    extra = extra||{};
    // log('html类型:'+typeof(html));
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
    // let ua = config.ua==='手机'?MOBILE_UA:PC_UA;
    if(源码) {
        html = 源码;
    }else{
        // html = (typeof (html) === 'undefined' || !html) ? (单次请求 ? getResCode() : 获取源码(true_url, ua)) : html;//全局变量,外部传进来的
        html = (typeof (html) === 'undefined' || !html) ? (单次请求 ? getResCode() : 获取源码(true_url)) : html;//全局变量,外部传进来的
    }
    const 当前折叠状态 = getMyVar('header.fold', '1');
    let 动态分类=加载动态分类(模式); //1本地 2仓库 其它gitee
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
}

function 获取正确链接(rule,url,调试){
    true_url = (typeof(true_url)!=='undefined'&&true_url)?true_url:getMyVar('header.url', MY_URL); //隐士全局变量，外面可以不传
    page = (typeof(page)!=='undefined'&&page)?page:MY_PAGE;
    // config.动态分类匹配
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
    let 链接处理工具 = 加载链接处理();
    if(调试===true){
        链接处理工具.debug();
    }
    true_url = 链接处理工具
        .链接(true_url)
        .页码(page)
        .插入新处理规则(rule)
        .获取处理结果();
    return true_url
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

function 获取源码(url,ua,referer,cookie,extrHeaders){//传url,ua和refer
    url = url.replace('hiker://empty##','');//获取源码自动去除占位的前缀
    let def_ua = config.ua==='手机'?MOBILE_UA:PC_UA;
    def_ua = config.指定ua?config.指定ua:def_ua;//如果传了指定ua给预处理,优先级更高,必须是ua字符串
    ua = ua||def_ua;
    extrHeaders = extrHeaders||{};
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
        Object.assign(headers, extrHeaders);//合并其他的请求头
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
function 初始分类页(parse,deal){
    if(!parse){
        setError('参数一必传,为初始分类页链接的都定位');
    }
    deal = deal||function (u){
        return u
    };
    //超级动态分类第一步，获取初始页
    if(!getMyVar('header.url','')){
        log('超级动态分类，获取初始分类页');
        var code=获取源码(MY_URL);
        var url=pd(code,parse);
        if(typeof(deal)==='function'){
            url = deal(url)
        }
        putMyVar('header.url',url);
        log('初始分类页链接为:'+url);
    }
}

function 获取验证码(url,ua){ // 验证码链接
    ua = ua||PC_UA;
    let ocr_api = 'http://ocr.nokia.press/dz6/api/ocr';
    let host = url.match(/(.*)\/\/(.*?)\//)[0];
    let headers = {
        'User-Agent': ua,
        'Referer':host,
        'Cookie':getMyVar('cookie'),
    };
    let hex=fetch(url,{headers:headers,toHex:true,timeout:3000});
    // log('hex:'+hex);
    let ret = request(ocr_api, {
        headers: {
            // 'content-type': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify(data),
        body: 'hex='+hex,
        method: 'POST'
    });
    try {
        ret = JSON.parse(ret).ret
    }catch (e) {}
    return ret
}

function 提交验证码(url,ua,method,body){
    ua = ua||PC_UA;
    method = method||'POST';
    body = body||'';
    let host = url.match(/(.*)\/\/(.*?)\//)[0];
    let headers = {
        'User-Agent': ua,
        'Referer':host,
        'Cookie':getMyVar('cookie'),
    };
    let params = {
        headers: headers,
        method: method,
        withHeaders:true
    };
    if(body){
        params.body = body
    }
    let cookie = JSON.parse(fetch(url, params));
    // log('验证后html:'+cookie.body);
    return cookie.body
}

function 动态源码(page,url){
    return {
        page:page,
        html:获取源码(url)
    }
}
function 是否视频(input){//判断是否视频，实现自动加UA
    const {isVideo} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    let realUrl = isVideo(input);
    if(realUrl&&!/User-Agent/.test(realUrl)){
        // realUrl = realUrl.split('#')[0]+';{User-Agent@Mozilla/5.0}';
        realUrl = realUrl+';{User-Agent@Mozilla/5.0}';
    }
    return realUrl;
}

function 获取链接函数示例(input){
    let html=fetch(input);
    let realUrl=html.match(/var player_aaaa=(.*?)url":"(.*?)",/)[2];
    realUrl=decodeURIComponent(realUrl);
    return realUrl
}
function 是否支持魔断(vipUrl,fromUrl){ // 正版地址,来源地址
    vipUrl = vipUrl||'';
    fromUrl = fromUrl||'';
    fromOk = typeof(fromUrl)==='string'?/bilibili|qiyi|youku|qq|sohu|mgtv|pptv|letv/.test(fromUrl):fromUrl;
    vipOk = /qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|tv\.sohu\.com|ixigua\.com|pptv\.com|miguvideo\.com|le\.com|1905\.com|fun\.tv|renrenmi-|fendou\.duoduozy|LT|RongXingVR|1\.ruifenglb\.com|xfy|suoyo|leduo/.test(vipUrl);
    return fromOk&&vipOk
}

function 是否正版(vipUrl){
    vipUrl = vipUrl||'';
    let vipOk = /qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|tv\.sohu\.com|ixigua\.com|pptv\.com|miguvideo\.com|le\.com|1905\.com|fun\.tv|renrenmi-|fendou\.duoduozy|LT|RongXingVR|1\.ruifenglb\.com|xfy|suoyo|leduo/.test(vipUrl);
    return vipOk
}

function 纯魔断(vipUrl){
    eval("var configDp =" + fetch("hiker://files/cache/MyParseSet.json"));
    eval(fetch(configDp.cj));
    log(vipUrl+'正在断插魔改版解析...');
    return aytmParse(vipUrl)
}

var 纯通免 = (function (){
    function 纯通免(playUrl,_reChange){
        if(typeof(_reChange)!=='function'){
            // _reChange = function (u){return u};
            _reChange = false;
        }
        try {
            let {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
            return lazyParse(playUrl,null,null,_reChange);
        }catch (e) {
            return 'toast://'+e.message
        }
    }
    return 纯通免
})();

var 纯X5 = (function (){
    function 纯X5(playUrl,_x5){
        playUrl = playUrl||input;
        require(getVar('dr依赖'));
        let useWeb=lsg.getItem("通免","X5")==="WEB";
        let ruleHead=useWeb&&parseInt(getAppVersion())>=2339?"webRule://":"x5Rule://";
        showLoading('dr模板'+lsg.getItem("通免","X5")+'嗅探中，请稍等...');
        log('开始'+lsg.getItem("通免","X5")+'嗅探:'+playUrl);
        playUrl = ruleHead+playUrl+ '@' +_x5;
        return playUrl
    }
    return 纯X5
})();

var 解析={ // 提供二级参数给那个免嗅探用
    是否支持魔断:是否支持魔断,
    是否正版:是否正版,
    是否视频:是否视频,
    纯魔断:纯魔断,
    纯通免:纯通免,
    纯X5:纯X5,
    加载魔断:加载魔断
};

function 魔断(获取链接函数){
    获取链接函数 = 获取链接函数||function (input){
        return input
    };
    let lazy=$('').lazyRule((获取链接函数)=>{
        try{
            let realUrl = 获取链接函数(input);
            eval("var configDp =" + fetch("hiker://files/cache/MyParseSet.json"));
            eval(fetch(configDp.cj));
            log(input+'->'+realUrl+'正在断插魔改版解析...');
            // 加入超时设置，建议在首页设置
            return aytmParse(realUrl)
        }catch(e){
            //return input
            const {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
            return lazyParse(input);
        }
    },获取链接函数);
    return lazy
}

function 通免(_reChange){
    // 嗅探链接再处理函数
    // _reChange = _reChange||function (url){return url}; // 必传,false
    _reChange = _reChange||false; // 必传,false
    let lazy=$("").lazyRule((_reChange)=>{
        const {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
        return lazyParse(input,null,null,_reChange);
    },_reChange);
    return lazy
}

function X5(_x5){
    let useWeb=lsg.getItem("通免","X5")==="WEB";
    //log("仓库使用web通免替代x5:"+useWeb);
    let ruleHead=useWeb&&parseInt(getAppVersion())>=2339?"webRule://":"x5Rule://";
    return $('').lazyRule((ruleHead,_x5)=>{
        showLoading('dr模板网页嗅探中，请稍等...');
        let playUrl = ruleHead+input+ '@' +_x5;
        // log(playUrl);
        return playUrl
    },ruleHead,_x5)
}

// 示例
/*
$.toString(() => {
    var urls = _getUrls();
    for (let i in urls) {
        if (urls[i].match(/\.mp3|\.mp4|\.m3u8|\.m4a/i)) {
            return urls[i] + '&memoryPosition=full#isMusic=true#'
        }
    }
    try {
        document.querySelector(".btn--play").click()
    } catch (e) {}

})
*/

var 通用一级处理 = {
    标题:function (input){
        return input
    },
    图片:function (input,html){
        //参数二是图片附加
        // if (isPic(input) && !/@Referer=/.test(input)) {
        if (input && input.length>8 &&!/@Referer=/.test(input)) {
            input += '@Referer='
        }
        return input
    },
    描述:function (input){
        return input
    },
    链接:function (input){
        // return input+'#immersiveTheme#'
        return input
    },
    内容:function (input){
        return input
    },
    沉浸:true
};


var 通用二级处理 = {
    选集名称:function (input){
        return input
    },
    选集链接:function (input){
        return input
    },
    图片:function (input){
        if (input && input.length>8 &&!/@Referer=/.test(input)) {
            input += '@Referer='
        }
        return input
    },
    图片点击:function(input){
        return input
    },
    重定向:function (input,html){ // 将选集和线路重定向,参数为网页链接，源码。
        // input进行处理获取源码之类的
        return html
    }
};

function addTb(html){//解决jsoup吞标签问题
    return (/<td>/.test(html)&&/<\/td>/.test(html)&&!/<table>/.test(html))?('<table>'+html+'</table>'):html;
}

function comParse(parStr,ej,onlyback,html,lazy,一级处理){
    //列表，标题，图片，描述，链接，内容
    ej = ej||false;//有二级
    onlyback=onlyback||false;//只返回数据
    html = html||getResCode();
    html = typeof(html)==='string'?html:html.html;
    let t = parStr.split(";");
    let d = [];
    // lazy = lazy || $('').lazyRule(() => {
    //     const {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    //     return lazyParse(input)
    // });
    def_lazy = 通免();
    一级处理 = 一级处理||通用一级处理;
    function hasItem(html,location){//判断源码有该定位
        let o = location.split('&&'); // 按 && 分割
        for(let j of o){
            j = j.replace(/[.#]/g,'').replace(/\|\|/g,'|');
            let reg = new RegExp(j);
            // console.log(reg,reg.test(html));
            if(!reg.test(html)){
                return false
            }
        }
        return true
    }
    // log(一级处理.自动匹配);
    if(一级处理.自动匹配){
        var list = pdfa(html, t[0]);
        if((list.length<1&&!hasItem(html,t[0]))||(list.length<1&&MY_PAGE===1&&hasItem(html,t[0]))){//第一页都没有结果
            // if(t[0].includes('module')){
            //     log(html);
            // }
            throw new Error("未匹配到一级列表:"+t[0]);
        }
    }else{
        var list = [];
        try {
            list = pdfa(html, t[0]);
        }catch (e) {
            throw new Error("未匹配到一级列表:"+t[0]);
        }
    }

    一级处理.标题=一级处理.标题||通用一级处理.标题;
    一级处理.图片=一级处理.图片||通用一级处理.图片;
    一级处理.描述=一级处理.描述||通用一级处理.描述;
    一级处理.链接=一级处理.链接||通用一级处理.链接;
    一级处理.内容=一级处理.内容||通用一级处理.内容;
    一级处理.图片附加=一级处理.图片附加||html;
    一级处理.沉浸=typeof(一级处理.沉浸)==='boolean'?一级处理.沉浸:通用一级处理.沉浸;
    for (let i in list) {
        let obj = {};
        let it = list[i];
        let 标题 = t[1].split('.js:')[0];
        let 图片 = t[2].split('.js:')[0];
        let 描述 = t[3].split('.js:')[0];
        let 链接 = t[4].split('.js:')[0];
        let _title = 标题 ? pdfh(addTb(it), 标题) : '';
        let _pic_url = 图片 ? pd(addTb(it), 图片) : '';
        let _desc = 描述 ? pdfh(addTb(it), 描述) : '';
        let _链接 = 链接 ? pd(addTb(it), 链接) : '';
        if (t.length > 5) {//内容，用于搜索
            let 内容 = t[5].split('.js:')[0];
            let _content = 内容 ? pdfh(addTb(it), 内容) : '';
            obj.content = 一级处理.内容(_content)
        }
        let _url = 一级处理.链接(_链接);
        if(!/#immersiveTheme#/.test(_url)&&一级处理.沉浸&&!/@lazyRule=/.test(_url)){//加上沉浸
            _url+='#immersiveTheme#'
        }
        // _url = ej ? _url : (_url + lazy);
        _url = ej ? _url : (_url + getLazy(_url,lazy));
        if (_url.startsWith('http') && ej) {//网络链接且有二级的情况下自动加hiker
            _url = 'hiker://empty##' + _url
        }
        let title = 一级处理.标题(_title);
        let pic_url = 一级处理.图片(_pic_url,一级处理.图片附加);
        let desc = 一级处理.描述(_desc);
        obj.title = title;
        obj.pic_url = pic_url;
        obj.desc = desc;
        // obj.url = _url;
        obj.url = getMyVar('test_mode') ? $(_url).rule(() => {
            let rule =  MY_RULE.title;//获取规则名
            let jsCode = JSON.parse(request('hiker://home@' + rule)).detail_find_rule.replace('js:','');
            eval(jsCode);
            // require(config.自动匹配);
            // 自动二级();
        }) : _url;
        obj.extra = {
            title:title||'',
            name:MY_RULE.title,
            pic_url:pic_url||'',
            desc:desc||'',
            content:obj.content||'',
            url:_url||'hiker://empty',
        };
        if (!ej) {
            Object.assign(obj.extra,{
                id: _链接,
                jsLoadingInject: true,
                blockRules: ['baidu.*.png','.mp3', '.mp4', '.flv', '.avi', '.3gp', '.mpeg', '.wmv', '.mov', '.rmvb', '.gif', '.png', '.ico', '.svg']
            });
        }
        if(一级处理.附加&&typeof(一级处理.附加)==='function'){
            let other_extra = 一级处理.附加(obj.extra)||{};
            Object.assign(obj.extra,other_extra);
        }
        if(一级处理.对象&&typeof(一级处理.对象)==='function'){
            let modyObj = 一级处理.对象(obj)||{};
            Object.assign(obj,modyObj);
        }
        d.push(obj);
    }
    if(onlyback){
        return d
    }else{
        setResult(d)
    }
}

//文件扩展名
function getFileUploadExtension(obj) {
    if (obj !== null) {
        var value = obj.value.trim();
        if (value.length > 0) {
            var index = value.lastIndexOf(".") + 1;
            var ext = value.substring(index).toLowerCase();
            return ext;
        }
    }
    return "";
}

//for(let key in lsg){log(key)}
function 图片(picStr){
    picStr = picStr||{};
    let 编码 = picStr.编码||'utf-8';//可选择gb18030
    let 最大页数 = picStr.最大页数||function (){return 1};
    let 列表 = picStr.列表||'.content&&img';
    let 图片 = picStr.图片||'img&&src';
    let 来源 = '@Referer='+(picStr.来源||'');
    let 链接替换 = picStr.链接替换||function (input,p){return input.replace(".html", "_" + p + ".html")};
    let obj = {
        编码:编码,
        最大页数:最大页数,
        列表:列表,
        图片:图片,
        来源:来源,
        链接替换:链接替换
    };
    /*
    let lazy=$('').lazyRule((obj)=>{
        let html = request(input, {
            headers: {
                "content-type": "charset="+obj.编码
            }
        });
        // let max = pdfh(html, ".page&&Text").match(/共(.*?)页/)[1];
        let max = obj.最大页数(html); // function(html){return pdfh(html, ".page&&Text").match(/共(.*?)页/)[1]}
        // log("共有:"+max+"页");
        let map = (html, arr) => {
            var realObj = [];
            if(typeof(obj.列表)==='string'){
                realObj = pdfa(html, obj.列表)
            }else if(typeof(obj.列表)==='function'){
                realObj = obj.列表(html)
            }
            realObj.map(it => {
                arr.push(pd(it, obj.图片)+obj.来源);
            });
        };
        var htmlUrl = [];
        for (let p = 2; p <= max; p++) {
            htmlUrl.push({
                // url: input.replace(".html", "_" + p + ".html"),
                url: obj.链接替换(input,p),
                options: {
                    headers: {
                        "content-type": "charset="+obj.编码
                    }
                }
            });
        }
        var htmlArr = htmlUrl.length>0?batchFetch(htmlUrl):[];
        let pics=[];
        htmlArr.unshift(html);
        htmlArr.map(it=>map(it,pics));
        return 'pics://' + pics.join('&&');
    },obj);
    */
    let lazy = `var obj=${$.stringify(obj)};var lazy=`+function (input){
        let html = request(input, {
            headers: {
                "content-type": "charset="+obj.编码
            }
        });
        // let max = pdfh(html, ".page&&Text").match(/共(.*?)页/)[1];
        let max = obj.最大页数(html); // function(html){return pdfh(html, ".page&&Text").match(/共(.*?)页/)[1]}
        // log("共有:"+max+"页");
        let map = (html, arr) => {
            var realObj = [];
            if(typeof(obj.列表)==='string'){
                realObj = pdfa(html, obj.列表)
            }else if(typeof(obj.列表)==='function'){
                realObj = obj.列表(html)
            }
            realObj.map(it => {
                arr.push(pd(it, obj.图片)+obj.来源);
            });
        };
        var htmlUrl = [];
        for (let p = 2; p <= max; p++) {
            htmlUrl.push({
                // url: input.replace(".html", "_" + p + ".html"),
                url: obj.链接替换(input,p),
                options: {
                    headers: {
                        "content-type": "charset="+obj.编码
                    }
                }
            });
        }
        var htmlArr = htmlUrl.length>0?batchFetch(htmlUrl):[];
        let pics=[];
        htmlArr.unshift(html);
        htmlArr.map(it=>map(it,pics));
        return 'pics://' + pics.join('&&');
    }.toString();
    let path = 'hiker://files/cache/js/dr图片免嗅.js';
    writeFile(path,lazy);
    lazy = $("").lazyRule((path)=>{
        // return input+request(path);
        eval(request(path));
        return lazy(input);
    },path);
    return lazy
}

function 下载图片(playUrl,定位){
    MY_URL = playUrl;
    定位 = 定位||{};
    let 编码 = 定位.编码||'utf-8';//可选择gb18030
    let 最大页数 = 定位.最大页数||function (){return 1};
    let 列表 = 定位.列表||'.content&&img';
    let 图片 = 定位.图片||'img&&src';
    let 来源 = '@Referer='+(定位.来源||'');
    let 链接替换 = 定位.链接替换||function (input,p){return input.replace(".html", "_" + p + ".html")};
    let obj = {
        编码:编码,
        最大页数:最大页数,
        列表:列表,
        图片:图片,
        来源:来源,
        链接替换:链接替换
    };
    let html = request(playUrl, {
        headers: {
            "content-type": "charset="+obj.编码
        }
    });
    // let max = pdfh(html, ".page&&Text").match(/共(.*?)页/)[1];
    let max = obj.最大页数(html); // function(html){return pdfh(html, ".page&&Text").match(/共(.*?)页/)[1]}
    // log("共有:"+max+"页");
    let map = (html, arr) => {
        var realObj = [];
        if(typeof(obj.列表)==='string'){
            realObj = pdfa(html, obj.列表)
        }else if(typeof(obj.列表)==='function'){
            realObj = obj.列表(html)
        }
        realObj.map(it => {
            arr.push(pd(it, obj.图片)+obj.来源);
            // arr.push([pd(it, obj.图片),{referer:obj.来源.split('@Referer=')[1]}]);
        });
    };
    var htmlUrl = [];
    for (let p = 2; p <= max; p++) {
        htmlUrl.push({
            // url: input.replace(".html", "_" + p + ".html"),
            url: obj.链接替换(playUrl,p),
            options: {
                headers: {
                    "content-type": "charset="+obj.编码
                }
            }
        });
    }
    var htmlArr = htmlUrl.length>0?batchFetch(htmlUrl):[];
    let pics=[];
    htmlArr.unshift(html);
    htmlArr.map(it=>map(it,pics));
    // log(pics);
    return pics;
}

function 小说(定位,指定编码){
    定位 = 定位||{
        标题:function (input){return input},
        内容:function (input){return input},
        // 链接:function (input){return input},
    };
    编码=(typeof(编码)==='undefined'||!编码)?false:编码;
    编码 = 指定编码||编码||'utf-8';
    阅读模式 = true;//申明全局阅读模式启用
    let lazy = `var 定位=${$.stringify(定位)};var 编码=${$.stringify(编码)};var lazy=`+function (input){
        require(config['模板']);
        input = MY_URL;
        // log('当前小说链接:'+input);
        // log('rule里的input:'+input);
        // let urls = [input]; // 链接列表
        var urls = []; // 链接列表
        let html = 获取源码(input,'','','',{
            "content-type": "charset="+编码
        });
        // log(html);
        if(typeof(定位.链接)==='function'){
            // log('执行定位链接');
            try {
                urls = 定位.链接(html)||[];
            }
            catch (e) {}
        }else{
            // log('定位链接不是个函数')
        }
        let d = [];
        let htmlUrl=[];
        if(urls.length>0&&urls.filter(it => it !== input).length>0) {
            for (let i in urls.filter(it => it !== input)) {
                htmlUrl.push({
                    url: urls[i],
                    options: {
                        headers: {
                            "content-type": "charset=utf-8"
                        }
                    }
                });
            }
            //批量请求源码开头加上自身html
            let htmls=batchFetch(htmlUrl);
            htmls.unshift(html);
            html = htmls;
        }else {
            html = [html];
        }

        function 小说净化(content){
            let path = 'hiker://files/rules/dzHouse/json/小说净化.json';
            if(!fileExist(path)){
                requireDownload('https://dr.playdreamer.cn/libs/小说净化.json', path);
            }
            content = pdfh(content,'body&&Text');
            let javaString = java.lang.String(content);
            let ruleList = JSON.parse(request(path) || "[]");
            let replacePattern = ["replace", "replaceAll"];
            for (let i = 0, len = ruleList.length; i < len; i++) {
                let replaceRule = ruleList[i];
                let replace = replacePattern[0 + replaceRule.isRegex];
                try {
                    javaString = javaString[replace](replaceRule.pattern, replaceRule.replacement);
                }catch (e) {log(replaceRule.name+'净化失败:'+e.message)}
            }
            content = String(javaString);
            content = "　　" + content.replace(/^\s+|\s+$/gm, "").split(/\n+/).join("<br>　　");
            return content
        }

        // log('本章节共计多少页:'+html.length);
        for (let j in html) {
            let it = html[j];
            d.push({
                col_type: "rich_text",
                // title: "““””<big>" + parseDomForHtml(getResCode(), "h1&&Text") + "</big>",
                title: 定位.标题(it),
            });
            d.push({
                // title: parseDomForHtml(getResCode(), "#acontent&&Html"),
                title: 小说净化(定位.内容(it)),
                col_type: 'rich_text',
                extra: {
                    textSize: 16,
                    click: true
                }
            });
        }
        setResult(d);

    }.toString();
    /*
    return $('').rule((定位,编码)=>{
        require(config['模板']);
        input = MY_URL;
        // log('rule里的input:'+input);
        // let urls = [input]; // 链接列表
        var urls = []; // 链接列表
        let html = 获取源码(input,'','','',{
            "content-type": "charset="+编码
        });
        if(typeof(定位.链接)==='function'){
            // log('执行定位链接');
            try {
                urls = 定位.链接(html)||[];
            }
            catch (e) {}
        }else{
            // log('定位链接不是个函数')
        }
        let d = [];
        let htmlUrl=[];
        if(urls.length>0&&urls.filter(it => it !== input).length>0) {
            for (let i in urls.filter(it => it !== input)) {
                htmlUrl.push({
                    url: urls[i],
                    options: {
                        headers: {
                            "content-type": "charset=utf-8"
                        }
                    }
                });
            }
            //批量请求源码开头加上自身html
            let htmls=batchFetch(htmlUrl);
            htmls.unshift(html);
            html = htmls;
        }else {
            html = [html];
        }
        // log('本章节共计多少页:'+html.length);
        for (let j in html) {
            let it = html[j];
            d.push({
                col_type: "rich_text",
                // title: "““””<big>" + parseDomForHtml(getResCode(), "h1&&Text") + "</big>",
                title: 定位.标题(it),
            });
            d.push({
                // title: parseDomForHtml(getResCode(), "#acontent&&Html"),
                title: 定位.内容(it),
                col_type: 'rich_text',
                extra: {
                    textSize: 16,
                    click: true
                }
            });
        }
        setResult(d);
    },定位,编码);
    */
    let path = 'hiker://files/cache/js/dr小说免嗅.js';
    writeFile(path,lazy);
    lazy = $("").rule((path)=>{
        input = MY_URL;//rule相比lazyRule没有input，所以得把MY_URL赋值给input
        // return input+request(path);
        eval(request(path));
        return lazy(input);
    },path);
    return lazy
}

function 章节内容(playUrl,定位,指定编码){
    MY_URL = playUrl;//关键
    定位 = 定位||{
        标题:function (input){return input},
        内容:function (input){return input},
        // 链接:function (input){return input},
    };
    编码=(typeof(编码)==='undefined'||!编码)?false:编码;
    编码 = 指定编码||编码||'utf-8';
    var urls = []; // 链接列表
    let html = 获取源码(playUrl,'','','',{
        "content-type": "charset="+编码
    });
    if(typeof(定位.链接)==='function'){
        // log('执行定位链接');
        try {
            urls = 定位.链接(html)||[];
        }
        catch (e) {}
    }else{
        //log('定位链接不是个函数，是:'+typeof(定位.链接));
    }
    let htmlUrl=[];
    if(urls.length>0&&urls.filter(it => it !== playUrl).length>0) {
        for (let i in urls.filter(it => it !== playUrl)) {
            htmlUrl.push({
                url: urls[i],
                options: {
                    headers: {
                        "content-type": "charset="+编码
                    }
                }
            });
        }
        //批量请求源码开头加上自身html
        let htmls=batchFetch(htmlUrl);
        htmls.unshift(html);
        html = htmls;
    }else {
        html = [html];
    }
    var content = '';
    for (let j in html) {
        let it = html[j];
        let tmp = 定位.内容(it).replace(/<p>/g,'').replace(/<\/p>/g,'').replace(/<br>/g,'\n');
        tmp = tmp.split('\n').join('\n　　');
        content+=tmp;
    }
    return content
}
//调用 var lazy=小说();


function getCode(){//用于一级函数获取源码
    let curl=MY_TYPE==='search'?获取搜索链接(MY_URL):MY_URL;
    return /<\/html>/.test(getResCode())?getResCode():获取源码(curl)
}

function 一级(parStr,ej,d,rule_id,yj_html,onlyback){
//列表，标题，图片，描述，链接，内容
//是否有二级，必须填true才有
//前置数据d。可不填,或者注入动态分类，搜索框之类的
//免责声明localstorage ID ,传false或者null则无需免责声明
//网页源码/文本或者json对象 {html:'',page:''}
    addListener('onClose', $.toString(()=>{
        // initConfig({}); //清空配置,避免炸视界
        clearMyVar('header.url');
        clearMyVar('header.category');
    }));
    initConfig({html:''});//清空二级记录
    d=d||[];
    onlyback = onlyback||false;
    // rule_id=rule_id||MY_RULE.title;
    rule_id=rule_id||false;
    password=(typeof(password)==='undefined'||!password)?'dz':password;
    let nv=parseInt(getAppVersion());
    var ruleName = MY_RULE.title;
    // log(ruleName+'=>'+nv);
    if(nv<version.appv){
        setResult([
            {
                title:"请更新视界至"+version.appv+"以上，当前"+nv,
                col_type:'text_1',
                url:'hiker://empty'
            }
        ]);
        return;
    }else if(rule_id===true&&!lsg.getItem(ruleName,'')){
        let title = '<small>说明 本程序所提供的所有数据均来自于互联网，个人存放在此作为备用，以备将来不时之需，同时作为大家的分享和学习成果，仅供个人研究和学习使用，请勿用于商业用途，下载后请于24小时内删除，请支持正版！</small>';
        let desc = '';
        let agree = '我同意';
        d = [];//重置分类等
        d.push({
            title:title+'<br>'+desc,
            col_type:'rich_text',
        });
        let pobj = {
            version:version,
            ruleName:ruleName,
            password:password,
        };
        let idata = base64Encode(JSON.stringify(pobj));
        d.push({
            title:color(agree,'#ab2415'),
            col_type:'text_center_1',
            url:$('',base64Decode('6K+36L6T5YWl6YGT6ZW/5LiT55So5a+G56CB')).input((idata)=>{
                idata = JSON.parse(base64Decode(idata));
                var version=idata.version,ruleName=idata.ruleName,password=idata.password;
                evalPrivateJS('zSWve+eeA6iL+f2fGTI+1q/UDtPcs7FYj2zolrQ08HHrDJCJG86PqcEvlowy2y4oJwlVUOGKTvxUQXa1G9IzhY6g0rc8E8bqMw0ePRKZ8u8FCmJPoRCqODM1Q1jlRBlxIHCS0p05zvTSHe4Nt1LsbA==');
                eval(base64Decode('cHdkID0gcGFzc3dvcmQrcHdkOw=='));
                if(input===eval(base64Decode('cHdk'))) {
                    require(version.requireId);
                    lsg.setItem(ruleName, 'ok');
                    refreshPage(true);
                    return 'toast://你已经接受此霸王条款,后续程序问题与作者无关'
                }else{
                    return 'toast://密码错误,拒绝访问'
                }
            },idata),
            // },version,ruleName,evalPrivateJS('GRDlFiXQPYhGvmtchpNk6Q==')),
            extra: {
                lineVisible:false
            }
        });
        setResult(d);
        return;
    }
    else if(nv>=2331&&rule_id&&typeof(rule_id)==='string'&&!lsg.getItem(rule_id,'')){
        let title = '<small>说明 本程序所提供的所有数据均来自于互联网，个人存放在此作为备用，以备将来不时之需，同时作为大家的分享和学习成果，仅供个人研究和学习使用，请勿用于商业用途，下载后请于24小时内删除，请支持正版！</small>';
        let desc = '<small>附: 二○○二年一月一日《计算机软件保护条例》第十七条规定：为了学习和研究软件内含的设计思想和原理，通过安装、显示、传输或者存储软件等方式使用软件的，可以不经软件著作权人许可，不向其支付报酬!</small>';
        desc = '';
        let agree = '我愿意承担责任,并开始学习研究';
        agree = '我同意';
        d = [];//重置分类等
        // let btn = '<a href="">我不愿承担责任,立即删除此程序</a><br><a href>我愿意承担责任,开始学习研究</a>'
        d.push({
            title:title+'<br>'+desc,
            // desc:desc,
            col_type:'rich_text',
        });
        d.push({
            title:color(agree,'#ab2415'),
            col_type:'text_center_1',
            url:$('#noLoading#').lazyRule((version,rule_id)=>{
                require(version.requireId);
                lsg.setItem(rule_id,'ok');
                // putMyVar('show','ok');
                refreshPage(true);
                return 'toast://你已经接受此霸王条款,后续程序问题与作者无关'
            },version,rule_id),
            extra: {
                lineVisible:false
            }
        });
        setResult(d);
        return;
    }
    lazy=(typeof(lazy)==='undefined'||!lazy)?false:lazy;
    html=((typeof(html)==='undefined'||!html)&&!yj_html)?getCode():(yj_html||html);
    一级处理=(typeof(一级处理)==='undefined'||!一级处理)?false:一级处理;
    let jscode=comParse(parStr,ej,true,html,lazy,一级处理);
    d=d.concat(jscode);
    if(onlyback){
        return d;
    }else{
        setResult(d);
        return d;
    }
}

function 一级书签(detailUrl,setUrl,extra,d){//贝贝书签 拦截详情页，设置页,过滤，附加功能
    detailUrl = detailUrl||'/detail/'; //详情页链接如 'vod/detail/'
    extra = extra||{};
    d = d&&Array.isArray(d)?d:[];//附加设置
    setUrl = setUrl||false;//设置页
    MY_URL = MY_URL.replace('hiker://empty##',''); // 拿到地址栏链接
    let js = $.toString((MY_RULE,detailUrl,setUrl,d) => {
        MY_URL=input;//附加首页地址为了getHome正常运行
        var rule = MY_RULE.title;//小程序名称
        var host=getHome(input);//获取拦截地址的域名
        var route=input.replace(host,'');//获取拦截地址的路由
        // if((!setUrl&&(route==='/'||route===''))||route===setUrl){//附加设置功能拦截首页
        var detail_reg = detailUrl.split('|').map(it=>it.startsWith(".")?'\\'+it:it).join("|");
        var setUrl_reg = setUrl?setUrl.split('|').map(it=>it.replace(/[.]/g,'\\.')).join("|"):'/';
        // route.includes(setUrl)
        if((!setUrl&&(route==='/'||route===''))||route===setUrl||(setUrl.length>2&&(new RegExp(setUrl_reg)).test(route))){//附加设置功能拦截首页
            return $.toString((url,MY_RULE, rule,d) => {
                let ejUrl = 'hiker://empty##' + url;
                let group = MY_RULE.group;
                let preRule = MY_RULE.preRule2||MY_RULE.preRule;
                let pages = MY_RULE.pages;
                fba.open(JSON.stringify({
                    title:'隐藏功能',
                    rule: rule,
                    url: ejUrl,
                    group:group,
                    preRule:preRule,
                    pages:pages,
                    findRule: "js:" + $$$.toString((preRule,rule,d) => {//自定义js页面规则代码写法
                        if(!config.模板){//执行预处理完了hook config，或者用refresh也行
                            eval(preRule);
                            // log('执行了预处理:'+preRule);
                            let _cfg = getMyVar('initConfig', '{}');
                            if (_cfg && _cfg.length > 0) {
                                config = JSON.parse(_cfg);
                            }
                        }
                        addListener('onClose', $.toString(() => {
                            refreshPage();//监听返回就刷新页面.yyds
                        }));
                        require(config['模板']);
                        var s = [];
                        // var page=1;//设置页面固定当前页数为1,不起作用的
                        // log('page:'+page);
                        // log('mpg:'+MY_PAGE);
                        设置(s);
                        d.unshift(s[0]);
                        d = d.concat(匹配设置('text_2'));
                        /*
                        d.push({
                            title: '🔙返回并刷新生效',
                            desc:'为节省性能，直接点左上角返回不会刷新和生效',
                            col_type: 'text_1',
                            url: $('#noLoading#').lazyRule(() => {
                                clearMyVar('是否进入规则');
                                back(true)
                                // refreshX5WebView('http://127.0.0.1:4848');
                                // refreshX5Desc('float&&0');
                                return 'hiker://empty'
                            })
                        });
                        */
                        setResult(d);
                    }, preRule,rule,d),
                }));
            }, input, MY_RULE,rule,d)

        }else if ((new RegExp(detail_reg)).test(input)) {
            // 原来写法,不支持正则 input.includes(detailUrl)
            return $.toString((url, MY_RULE,rule) => {
                let ejUrl = 'hiker://empty##' + url + '#immersiveTheme#';
                fba.parseLazyRule($$$().lazyRule((ck,rule)=>{
                    let privateCk = rule+'@cookie';
                    putVar(privateCk,ck);
                    // log('已设置cookie:'+ck);
                    // log('设置后cookie:'+getVar(privateCk));
                    return 'hiker://empty';
                },document.cookie,rule));
                let group = MY_RULE.group;
                let preRule = MY_RULE.preRule2||MY_RULE.preRule;
                let pages = MY_RULE.pages;
                let detail_find_rule = MY_RULE.detail_find_rule||JSON.parse(request('hiker://home@' + rule)).detail_find_rule;
                fba.open(JSON.stringify({
                    // title: rule,
                    title:'详情页',
                    rule: rule,
                    group:group,
                    preRule:preRule,
                    pages:pages,
                    // url: 'hiker://page/ej?rule=' + rule + '&url=' + url,//子页面写法
                    url: ejUrl,
                    // findRule:JSON.parse(request('hiker://home@' + rule)).detail_find_rule,
                    findRule: "js:" + $$$.toString((preRule,detail_find_rule) => {//自定义js页面规则代码写法
                        if(!config.模板){
                            eval(preRule);
                            // log('执行了预处理:'+preRule);
                            let _cfg = getMyVar('initConfig', '{}');
                            if (_cfg && _cfg.length > 0) {
                                config = JSON.parse(_cfg);
                            }
                        }
                        // log(config);
                        // 可能测试环境取不到 MY_RULE.detail_find_rule就eval本规则
                        eval(detail_find_rule);
                    }, preRule,detail_find_rule),
                }));
            }, input,MY_RULE, rule)
        }
    }, MY_RULE,detailUrl,setUrl,d);
    extra = Object.assign({
        canBack: true,
        urlInterceptor: js,
        floatVideo: true,
    },extra);
    setResult([{
        col_type: "x5_webview_single",
        url: MY_URL,
        desc: "float&&100%",
        extra: extra
    }]);
}

function getLazy(url,lazy) {//动态获取动态解析可兼容磁力链接
    if ((typeof(lazy)==='undefined'||!lazy) && /^magnet:\?|^ftp:|^thunder:/.test(url.trim())) {//处理磁力
        return ''
    } else {
        def_lazy = (typeof(def_lazy)==='undefined'||!def_lazy)?'':def_lazy;
        return lazy || def_lazy
    }
}

function 附加数据(more_data,more_tips){//传入附加的数据参数
    if(!Array.isArray(more_data)||more_data.length<1){//传入附加数据必须是大于0的列表
        return []
    }
    more_tips = more_tips||'附加数据';//可传磁力
    let c = [];//附加数据函数最终返回结果
    let b = [];//附加数据处理结果
    let cls = 'more';
    let switch_id = 'more_switch';
    for(let i in more_data){
        let tmp = more_data[i];
        tmp.extra = tmp.extra||{};
        Object.assign(tmp.extra,{id:cls+'_'+i,cls:cls});
        b.push(tmp);
    }
    function getMoreTitle(flag,more_tips,b){
        let drzd = '““””<b><span style="color: #FF0000">∨</span></b>';
        let drzk = '““””<b><span style="color: #1aad19">∧</span></b>';
        // let showOrder = getMyVar('附加数据','折叠')==='折叠'?color('(☆展开↑)','#228be6'):color('(★折叠↓)','#d0aa344');
        let showOrder = flag==='折叠'?(lsg.getItem('折叠样式',drzd)+color('(已折叠)','#228be6')):(lsg.getItem('展开样式',drzk)+color('(已展开)','#1aad19'));
        // let showOrder = flag==='折叠'?color('(☆展开↑)','#228be6'):color('(★折叠↓)','#d0aa344');
        return  small(color(more_tips+'列表共计','#098AC1')+color(b.length,'#d96715')+color('条记录','#098AC1'))+blank()+right(small(showOrder));
    }
    let switch_title1 = getMoreTitle('折叠',more_tips,b);
    let switch_title2 = getMoreTitle('展开',more_tips,b);
    c.push({
        title:getMoreTitle(getMyVar('附加数据','折叠'),more_tips,b),
        col_type:'text_1',
        url:$('#noLoading#').lazyRule((cls,switch_id,switch_title1,switch_title2,b)=>{
            if(getMyVar('附加数据','折叠')==='展开'){
                putMyVar('附加数据','折叠');
                deleteItemByCls(cls);
            }else{
                putMyVar('附加数据','展开');
                addItemAfter('more_switch', b);
            }
            let newTitle = getMyVar('附加数据','折叠')==='折叠'?switch_title1:switch_title2;
            updateItem(switch_id,{
                title:newTitle
            });
            // refreshPage(true);
            // return 'toast://已'+getMyVar('附加数据')
            return 'hiker://empty'
        },cls,switch_id,switch_title1,switch_title2,b),
        extra:{
            lineVisible:false,
            id:switch_id
        }
    });
    if(getMyVar('附加数据','折叠')==='展开'){
        c = c.concat(b);
    }
    return c
}

function 二级(parse,lazy,dp,错误){
    /*调用示例
    js:
    let parse={
     title:'',
     img:'',
     url:'',
     desc:'',
     content:'',
     tabs:'',
     lists:'',
    };
    二级(parse);
    */
    MY_PARAMS = MY_PARAMS||{};
    阅读模式=(!(typeof (阅读模式) === 'undefined' || !阅读模式));
    二级处理=(typeof(二级处理)==='undefined'||!二级处理)?false:二级处理;
    倒序=(typeof(倒序)==='undefined'||!倒序)?false:倒序;
    编码=(typeof(编码)==='undefined'||!编码)?false:编码;
    动态最新章节=(typeof(动态最新章节)==='undefined'||!动态最新章节)?false:动态最新章节;
    指定cookie=(typeof(指定cookie)==='undefined'||!指定cookie)?getMyVar('cookie',''):指定cookie;
    指定ua=(typeof(指定ua)==='undefined'||!指定ua)?false:指定ua;
    下载=(typeof(下载)==='undefined'||!下载)?false:下载;
    if(二级处理){
        二级处理.选集名称=二级处理.选集名称||通用二级处理.选集名称;
        二级处理.选集链接=二级处理.选集链接||通用二级处理.选集链接;
        二级处理.图片=二级处理.图片||通用二级处理.图片;
        二级处理.图片点击=二级处理.图片点击||通用二级处理.图片点击;
        二级处理.重定向=二级处理.重定向||通用二级处理.重定向; // 返回重定向后的源码
    }
    //log(typeof(二级处理.重定向));
    dp=dp||false;
    错误=错误||false;
    let d=[];
    var html;
    let ua = config.ua==='手机'?MOBILE_UA:PC_UA;
    if(config.指定ua){
        ua = config.指定ua
    }
    if(指定ua&&typeof(指定ua)==='string'){
        ua = 指定ua
    }
    let fetchParams = {headers: {
            "User-Agent": ua,
            "Cookie":getMyVar('cookie')
        }};
    var nowUrl = MY_URL.replace('hiker://empty##','').split('#')[0];
    function 足迹处理(){// 足迹处理
        let footHistory = lsg.getItem('footHistory','{}');
        try {JSON.parse(footHistory);}catch (e) {lsg.removeItem('footHistory');footHistory='{}'}//移除足迹
        footHistory = JSON.parse(footHistory);
        putMyVar('选集翻页',footHistory[nowUrl]||'1');
    }
    if(MY_URL.startsWith('hiker://empty##')){
        let lastUrl = getMyVar('lastUrl','');
        if(config.html&&lastUrl===nowUrl){
            html = config.html
        }else{
            //html = fetch(tUrl,fetchParams);
            var extra_headers='';
            if(编码){
                extra_headers={
                    "content-type":"charset="+编码||'utf-8',
                };
            }
            html=获取源码(nowUrl,ua,'',指定cookie,extra_headers);
            //log(html);
            if (/检测中/.test(html)){
                html = request(nowUrl + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {});
            }
            putMyVar('lastUrl',nowUrl);
            initConfig({html:html}); // 自动合并注入
            足迹处理();
        }
    }else{
        html=getResCode();
        if (/检测中/.test(html)){
            html = request(nowUrl + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {});
        }
        if(getMyVar('lastUrl','')!==nowUrl){
            putMyVar('lastUrl',nowUrl);
            足迹处理();
        }
    }
    let _title=parse.title;
    let _img=parse.img;
    let _url=parse.url;
    let _desc=parse.desc;
    let _col_type=parse.col_type||"movie_1_vertical_pic_blur";
    let _info=parse.content;
    let 样式 = config.样式||'默认'; //可以默认和滚动
    //样式,默认?滚动
    /*
    let _reChange=parse.reChange||function(playUrl){
        if(typeof(window)!=='undefined'){
            fba.log("开始改变链接");
        }else{
            log("开始改变链接");
        }
        if (/cat\.wkfile\.com\/m3u8/.test(playUrl)){
            playUrl+=";{Referer@https://fantuan.tv}"
        }
        return playUrl
    };
    */
    let _reChange=(parse.reChange && typeof(parse.reChange)==='function')?parse.reChange:false;
    let _tabs=parse.tabs;
    let _tabstr=parse.线路处理;
    let _lists=parse.lists;
    let _tab_id=parse.tab_id||false;
    let _list_id=parse.list_id||'a&&href';
    let _list_text=parse.list_text||'a&&Text';
    let _tab_text=parse.tab_text||'body&&Text';
    var bUrl='',bImg='';
    try {bUrl=_url?pd(html,_url):MY_PARAMS.pic_url||''}catch (e) {bUrl=MY_URL.split("##").slice(-1)[0];}
    try {bImg=_img?pd(html,_img):'';}catch (e) {}
    if(isPic(bUrl)&&!/@Referer=/.test(bUrl)){
        bUrl+='@Referer='
    }
    if(二级处理){
        bImg=二级处理.图片(bImg);
        bUrl=二级处理.图片点击(bUrl);
    }
    if(isPic(bImg)&&!/@Referer=/.test(bImg)){
        bImg+='@Referer='
    }else if(/^http/.test(bImg)&&bImg.length>10&&!/@Referer=/.test(bImg)){
        bImg+='@Referer='
    }
    bImg = bImg||MY_PARAMS.pic_url||'';
//https://z3.ax1x.com/2021/11/16/IfaPqf.jpg
//let showlist=parse.showlist||false;
    var title = '',desc='',info='';
    var 分隔符=lsg.getItem('分隔符','换行符')==='换行符'?'\n':'  ';
    if(_title){
        let tmpTitle=[];
        for(let it of _title.split(';')){
            try {
                tmpTitle.push(pdfh(addTb(html),it));
            }catch (e) {}
        }
        if(!MY_PARAMS.title&&tmpTitle[0]){//没传参数就可能是书签,设置二级标题
            setPageTitle(tmpTitle[0]);
        }
        title = tmpTitle.join(分隔符);
    }
    if(_desc){
        let tmpDesc = [];
        for(let it of _desc.split(';')){
            try {
                tmpDesc.push(pdfh(addTb(html),it));
            }catch (e) {}
        }
        desc = tmpDesc.join(分隔符);
    }
    title = title||MY_PARAMS.title||'暂无标题';
    desc = desc||MY_PARAMS.desc||'暂无描述';
    info = MY_PARAMS.content||info;
    var ChapterRule = {
        _tabs:_tabs,
        _tab_id:_tab_id,
        _lists:_lists,
        _list_id:_list_id,
        _list_text:_list_text,
        指定cookie:指定cookie,
        二级处理:二级处理,
        编码:编码,
        指定ua:指定ua,
    };
    var bookName = MY_PARAMS.title||title.split(分隔符)[0];
    var ruleName = MY_RULE.title;
    var rootPath = false;
    if(倒序!==false&&倒序!=='智能'){//传 真 或 ''
        ChapterRule._order=倒序?'0':'-1';
    }
    if(动态最新章节&&typeof(动态最新章节)==='boolean') {
        setLastChapterRule('js:' + $.toString((ChapterRule,MY_PARAMS) => {
            require(config['模板']);
            准最新(ChapterRule,MY_PARAMS);
        }, ChapterRule,MY_PARAMS));
    }else if(动态最新章节&&typeof(动态最新章节)==='function'){
        // 动态最新章节为剪头函数 ()=>{}  其中参数就是 _tabs, _tab_id, _lists, 倒序
        setLastChapterRule('js:' + $.toString(动态最新章节, ChapterRule));
    }
    // log('最新章节处理完毕');
    d.push({
        title:small(title),
        pic_url:dp?bImg||'https://z3.ax1x.com/2021/11/16/IfaPqf.jpg':bImg,
        url:dp?'hiker://page/Route?rule=MyFieldᴰⁿ&type=设置#noHistory##noRecordHistory#':bUrl,
        desc:small(desc),
        col_type:_col_type
    });
    setPagePicUrl(bImg); // 动态设置二级收藏图片
    // lazy=lazy||通免(_reChange);
    def_lazy=通免(_reChange);
    if(_info||info){
        try {info=(_info?pdfh(html,_info):info)||'暂无详情'}catch (e) {}
        // d.push({
        //     title:color("剧情简介","#098AC1"),
        //     desc:small(info),
        //     col_type:"text_1",
        //     extra:{
        //         lineVisible: false
        //     },
        //     url:$('hiker://empty#noHistory##noRecordHistory#').rule((info)=>{
        //         let d=[];
        //         d.push({
        //             title:info,
        //             col_type:"long_text"
        //         },info);
        //         setResult(d)
        //     },info)
        // });
        let limit_text = info.substring(0,parseInt(lsg.getItem('简介字数','100')))+'...';
        let download_text = '';
        if(/小说|漫画/.test(下载)){
            const Config = $.require("hiker://page/Config.json?rule=本地资源管理");
            rootPath = 下载==='小说'?Config.novelPath:Config.comicPath;
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
            download_text += '本地阅读'.link($().b64("'").lazyRule((bookName, ruleName,下载,rootPath) => {
                let rule_exits = fetch('hiker://home@本地资源管理');
                rule_exits = rule_exits !== 'null' && rule_exits !== '';
                if (!rule_exits) {
                    return $('未安装[本地资源管理]小程序，无法本地阅读,现在安装?').confirm(() => {
                        let ruleHead = '海阔视界首页频道规则【本地资源管理】￥home_rule_url￥';
                        let rulecode = 'rule://' + base64Encode(ruleHead + 'http://hiker.nokia.press/hikerule/rulelist.json?id=3559');
                        return rulecode
                    });
                } else {
                    // return "hiker://page/NovelBrowser.view?rule=本地资源管理";

                    let bindUrl = 下载==='小说'?'hiker://page/NovelBrowser.view':'hiker://page/ComicBrowser.view';
                    let localReadUrl = buildUrl(bindUrl, {
                        hasParams: true,
                        rule: "本地资源管理",
                        path: encodeURIComponent(rootPath + ruleName + "/" + bookName),
                        name: encodeURIComponent(bookName)
                    });
                    // log(localReadUrl);
                    return localReadUrl
                }
            }, bookName, ruleName,下载,rootPath));
        }
        let rich_html = ("剧情简介\t\t\t\t\t"+download_text+"<br><br>").fontcolor("#098AC1")+limit_text.fontcolor("grey").small();
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
    }
    var tabs;
    var error = function (info){
        return {
            title:'线路定位错误,不用玩了\n仔细检查是不是网站内地址跳了别的站点',
            desc:info,
            col_type:'text_1',
            url:'hiker://empty'
        }};
    var redhtml = html;//默认源码就是本身获得的
    if(二级处理&&二级处理.重定向){
        try {
            redhtml = 二级处理.重定向(MY_URL,html);
        }catch (e) {
            log('获取重定向源码失败:'+e.message);
        }
    }
    if(二级处理&&二级处理.附加数据&&typeof(二级处理.附加数据)==='function'){//有二级附加数据且考虑重定向问题t
        try {
            let more_data = 二级处理.附加数据(redhtml);
            let more_title = 二级处理.附加数据标题||false;
            d = d.concat(附加数据(more_data,more_title));
        }catch (e) {
            log('二级附加数据处理失败:'+e.message)
        }
    }
    try {
        var tabs_html = html;
        if(二级处理&&二级处理.重定向){
            tabs_html = redhtml;
        }
        if(typeof (_tabs)==='function'){
            tabs = _tabs(tabs_html);
        }else if(typeof (_tabs)==='string'){
            tabs=pdfa(tabs_html,_tabs);
        }else{
            tabs = []
        }
        if(tabs.length<1&&!错误){
            d.push(error('解析到线路列表为空'));
            setResult(d);
            return;
        }else if(tabs.length<1&&错误){
            throw new Error("线路匹配失败1");
        }
    }catch (e) {
        if(!错误){
            d.push(error(e.message));
            setResult(d);
            return;
        }else{
            throw new Error("线路匹配失败2");
        }
    }

    let showOrder = getMyVar('顺序','正续')==='逆序'?color('(☆逆序↑)','#228be6'):color('(★正序↓)','#d0aa344');
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
    //id是tab里的href，_lists是tab内播放列表解析式
    function showlist(id,_lists){
        //_lists=".tab-content&&id&&li";
        if(id){
            _lists=_lists.replace("#id",id);
        }
        return _lists;
    }

    function renderList(showList){//渲染列表
        let allList = [];
        for (let j in showList) {
            let it = showList[j];
            let mytt = pdfh(it, _list_text);
            let colt = config.按钮样式?config.按钮样式:(showList.length > 10 ? "flex_button" : "text_2");
            let playUrl=pd(it, _list_id);
            if(阅读模式){
                playUrl+='#autoPage##readTheme#';
            }
            if(二级处理){
                mytt=二级处理.选集名称(mytt);
                playUrl=二级处理.选集链接(playUrl);
            }
            allList.push({
                title: mytt,
                url: playUrl + getLazy(playUrl,lazy),
                col_type: colt,
                extra: {
                    id:playUrl,
                    cls:'playList',
                    ua:ua,
                    jsLoadingInject: true,
                    blockRules: ['baidu.*.png', '.mp3', '.mp4', '.flv', '.avi', '.3gp', '.mpeg', '.wmv', '.mov', '.rmvb', '.gif', '.png', '.ico', '.svg']
                }
            });
        }
        return allList
    }


    if(样式==='滚动'){
        let nowTab = parseInt(getMyVar('nowTab','0')||'0');
        // log('nowTab:'+nowTab);
        addListener('onClose', $.toString((nowUrl)=>{
            //log('滚动模式下检测到程序关闭,开始清历史线路');
            //putMyVar("nowTab","0"); //清除历史线路
            //clearMyVar("nowTab");
            require(config['模板']);
            let footHistory = lsg.getItem('footHistory','{}');
            try {JSON.parse(footHistory);}catch (e) {lsg.removeItem('footHistory');footHistory='{}'}//移除足迹
            footHistory = JSON.parse(footHistory);
            footHistory[nowUrl] = getMyVar('选集翻页','1');
            // 3天程序自毁
            // lsg.setItem('footHistory',JSON.stringify(footHistory),3600*24*3*1000);
            lsg.setItem('footHistory',JSON.stringify(footHistory));
            // 设置足迹页数缓存
            // clearMyVar('选集翻页'); //不清了
            //不管用。，妈蛋
            // return 'hiker://empty'
        },nowUrl));
        for(let i in tabs){
            let tab_name = pdfh(addTb(tabs[i]),_tab_text);
            if(_tabstr){
                try {
                    tab_name = _tabstr(tab_name)
                }catch (e) {}
            }
            d.push({
                title:nowTab===parseInt(i)?color(tab_name,'#09c11b'):color(tab_name,'#098AC1'),
                url:$('#noLoading#').lazyRule((i,tab_name,nowTab)=>{
                    if(nowTab===parseInt(i)){
                        require(getVar('dr依赖'));
                        let all_cols = [''].concat(getColTypes());
                        let col = (lsg.getItem('按钮样式', '')||'');
                        let 按钮样式 = all_cols.map((it) => {
                            return it === col ? '👉' + it : it;
                        });
                        let tips = '请选择选集按钮样式';
                        return $(按钮样式, 2, tips).select(() => {
                            require(getVar('dr依赖'));
                            input = input.replace(/👉/g, '');
                            lsg.setItem('按钮样式', input);
                            // config.按钮样式 = input;
                            initConfig({按钮样式:input});
                            // refreshPage(true);
                            let oldIds = (findItemsByCls('playList')||[]).map(it=>it.extra.id);//老元素ids
                            // log(oldIds);
                            oldIds.forEach(x=>{
                                updateItem(x, {
                                    col_type:input
                                });
                            });
                            let showList = storage0.getMyVar('showList'); //获取储存的选集列表
                            showList.forEach(x=>{x.col_type = input});
                            storage0.putMyVar('showList',showList);
                            return 'toast://已切换选集按钮样式为:' + input;
                        });
                        // return 'toast://吃饱了没事儿干?点什么点!'
                    }
                    putMyVar('nowTab',''+i);
                    refreshPage(false);
                    return 'toast://切换线路为:'+tab_name
                },i,tab_name,nowTab),
                col_type:"scroll_button"
            });
        }
        let id = '0';
        let list = [];
        try {
            id = _tab_id ? (pdfh(addTb(tabs[nowTab]), _tab_id) || (nowTab + '')) : (nowTab + '');
            if(二级处理&&二级处理.重定向){
                html = redhtml;
            }
            if(typeof(_lists)==='string'){
                list = pdfa(html, showlist(id, _lists));
            }else if(typeof(_lists)==='function'){
                list = _lists(html,MY_URL,id);
            }
            clearMyVar('线路错误');
        }catch (e) {
            if(getMyVar('nowTab','0')!=='0'){
                putMyVar('nowTab','0');
                refreshPage(false);
                return
            }else {
                if (!错误) {
                    d.push(error(e.message));
                    setResult(d);
                    return;
                } else {
                    throw new Error("获取线路列表0对应选集列表错误");
                }
            }
        }
        let 翻页阀值 = Number(lsg.getItem('翻页阀值',40));
        let 每页数量 = Number(lsg.getItem('每页数量',40));
        let 最大页数 = Math.ceil(list.length/每页数量);

        function force_order(list){//强制正序
            let start = Math.floor(list.length/2); // 0
            let end = Math.min(list.length-1,start+1); // list.slice(-1)[0]
            let first = pdfh(list[start], "a&&Text");
            let second = pdfh(list[end],"a&&Text");
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
        let showList = list;
        let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
        if(nowPage>最大页数){//防止切换线路导致页数数组越界
            nowPage = 最大页数
        }
        // 禁止 动态列表使用翻页功能
        var canPage = true;
        if(typeof(_lists)==='function'&&/request|fetch|获取源码/.test(_lists.toString())){
            canPage = false;
        }
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
        let showCol = 'avatar';
        let showPic = '';
        let pageTitleInfo = '';
        function jumpToPageOld(每页数量,toPage,nowPage,pageTitleInfo){//跳页旧版
            if(nowPage===toPage){
                return //跳转页数等于当前页，不操作
            }
            let toDeleteIds = (findItemsByCls('playList')||[]).map(it=>it.extra.id);
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
            let pageTitle = '';
            if (getMyVar('选集显示', '分页') === '分页') {
                // text_1 样式
                // pageTitle = color('翻页模式已启用  本页:','#585858')+color(showList.length, '#d96715')+color('  共计:','#585858')+color(list.length, '#d96715')+color('集  第:','#585858') + color(getMyVar('选集翻页', '1')+'/'+最大页数, '#d96715')+color('页','#585858');
                pageTitleInfo = color('翻页模式已启用  本页:','#585858')+color('$cnt', '#d96715')+color('  共计:','#585858')+color(list.length, '#d96715')+color('集  第:','#585858') + color('$page'+'/'+最大页数, '#d96715')+color('页','#585858');
                pageTitleInfo = small(pageTitleInfo);
                pageTitle = pageTitleInfo.replace('$page',getMyVar('选集翻页', '1')).replace('$cnt',showList.length);

                if(showCol==='avatar'){
                    pageTitle = pageTitle.replace(/““””/g,'');
                    showPic = 'https://hikerfans.com/tubiao/ke/53.png';
                }
            } else {
                // text_1 样式
                // pageTitle = color('翻页模式已关闭,点击启用','#585858');
                pageTitle = color('翻页模式已关闭,点击启用','#585858');
                pageTitle = small(pageTitle);
                if(showCol==='avatar'){
                    pageTitle = pageTitle.replace(/““””/g,'');
                    showPic = 'https://hikerfans.com/tubiao/ke/123.png';
                }
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
            /*
            d.push({
                title:'跳到该页',
                desc:'输入欲快速跳转的页数',
                col_type:'input',
                extra: {
                    onChange: "putMyVar('选集翻页',input)",
                    titleVisible: true,
                    textSize: 11,
                    type: "number",
                    defaultValue:getMyVar('选集翻页','1'),
                },
                url:$.toString(()=>{
                    refreshPage(false);
                    return 'hiker://empty'
                })
            });
             */
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
                        let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                        let toPage = Math.ceil(toNum/每页数量);
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
                        let toPage = 最大页数;
                        let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
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
        function getChapterList(showList){
            return showList.map((it) => {
                let mytt = pdfh(it, _list_text);
                let playUrl=pd(it, _list_id);
                if(二级处理){
                    mytt=二级处理.选集名称(mytt);
                    playUrl=二级处理.选集链接(playUrl);
                }
                return {
                    title:mytt,
                    url:playUrl,
                }});
        }
        if(/小说|漫画/.test(下载)){
            let chapterList = getChapterList(showList);
            let chapterListAll = getChapterList(list);
            let chapterListFile = rootPath + ruleName + "/" + bookName+'/chapterListAll.json';
            chapterListFile = chapterListFile.replace('/小说/','/dr章节缓存/小说/').replace('/漫画/','/dr章节缓存/漫画/');
            // log(chapterListAll.length);
            // log(chapterListFile);
            writeFile(chapterListFile,JSON.stringify(chapterListAll));
            let downloadInfo = {};
            if(下载==='小说'){
                downloadInfo = {
                    bookName: bookName,
                    ruleName: ruleName,
                    bookTopPic: bImg,
                    // topPicHeaders: !bImg.includes('@Referer=')?{}:{'Referer':bImg.split('@Referer=')[1].split('&')[0]},
                    // bookTopPic: bImg.split('@Referer=')[0],
                    parseCode: $.toString((定位,编码,cookie) => {
                        require(getVar('dr依赖'));
                        putMyVar('cookie',cookie);
                        return 章节内容(input,定位,编码);
                    },定位,编码,getMyVar('cookie','')),
                    type:"novel"
                };
            }else if(下载==='漫画'){
                downloadInfo = {
                    bookName: bookName,
                    ruleName: ruleName,
                    bookTopPic: bImg,
                    // bookTopPic: bImg.split('@Referer=')[0],
                    // topPicHeaders: !bImg.includes('@Referer=')?{}:{'Referer':定位.来源||bImg.split('@Referer=')[1].split('&')[0]},
                    parseCode: $.toString((定位,cookie) => {
                        require(getVar('dr依赖'));
                        putMyVar('cookie',cookie);
                        return 下载图片(input,定位);
                    },定位,getMyVar('cookie','')),
                };
            }
            download_extra = {
                // chapterListFile:chapterListFile,
                //chapterList: chapterList,
                chapterList: chapterListFile,
                info: downloadInfo,
                defaultView:下载==='小说'?'0':'1'
            };
            Object.assign(d[1].extra, download_extra);
        }
        d = d.concat(renderList(showList));
        storage0.putMyVar('showList',renderList(list));

    }else {
        for (let i in tabs) {
            let tab_name = pdfh(tabs[i], _tab_text);
            if (_tabstr) {
                try {
                    tab_name = _tabstr(tab_name)
                } catch (e) {
                }
            }
            d.push({
                title: color(tab_name, '#098AC1'),
                url: "hiker://empty",
                col_type: "text_1"
            });
            let id = _tab_id ? (pdfh(tabs[i], _tab_id) || (i + '')) : (i + '');
            let list = [];
            if(二级处理&&二级处理.重定向){
                html = redhtml;
            }
            if(typeof(_lists)==='string'){
                list = pdfa(html, showlist(id, _lists));
            }else if(typeof(_lists)==='function'){
                list = _lists(html,MY_URL,id);
            }
            if (getMyVar('顺序', '正续') === '逆序') {
                list = list.reverse();
            }
            d = d.concat(renderList(list));
        }
    }
    setResult(d);
    return d;
}
function 最新源码(MY_URL,指定cookie,二级处理,编码,指定ua){
    指定cookie = 指定cookie||getMyVar('cookie');
    二级处理=二级处理||false;
    编码=编码||'utf-8';
    let ua = config.ua==='手机'?MOBILE_UA:PC_UA;
    指定ua=指定ua||ua;
    if(/^hiker:\/\/empty##/.test(MY_URL)){
        MY_URL=MY_URL.split("##").slice(-1)[0];
        // log('指定cookie:'+指定cookie+',myVar:'+getMyVar('cookie'));
        // let fetchParams = {headers: {"User-Agent":ua,"cookie":getMyVar('cookie')}};
        let fetchParams = {headers: {"User-Agent":指定ua,"cookie":指定cookie,
                "content-type": "charset="+编码
            }};
        var html=fetch(MY_URL,fetchParams);
        if(二级处理&&typeof(二级处理.重定向)=='function'){
            html=二级处理.重定向(MY_URL,html);
        }
        // log('最新源码cookie:'+指定cookie);
        // var html = 获取源码(MY_URL,'','','',指定cookie);
        // log('最新源码html:'+html);
    }else{
        var html = getResCode();
    }
    return html
}
function 最新(newStr){
    var html=最新源码(MY_URL);
    newStr=newStr.replace(/#id/,'0');
    log(newStr);
    var newtips = MY_RULE.title+"|更新至"+pdfh(html, newStr);
    setResult(newtips);
}

function 准最新(ChapterRule,MY_PARAMS){
    cat = ChapterRule;
    if((!cat)||(typeof(cat)!=='object')){
        setResult('检测更新失败.参数有误');
        return;
    }
    指定cookie = cat.指定cookie||getMyVar('cookie');
    二级处理=cat.二级处理||false;
    编码=cat.编码||'utf-8';
    //log(MY_URL);
    var html=最新源码(MY_URL,指定cookie,二级处理,编码,cat.指定ua);
    //log(html);
    var _tabs,_tab_id,_lists,_order,_list_id,_list_text;
    _tabs = cat._tabs;
    _tab_id = cat._tab_id;
    _lists = cat._lists;
    _list_id = cat._list_id||'a&&href';
    _list_text = cat._list_text||'a&&Text';
    if(typeof(cat._order)==='undefined'){
        _order='智能';
    }else if(cat._order==='智能'){
        _order='智能';
    } else {
        _order=cat._order?cat._order:'-1';
    }
    function showlist(id,_lists){
        return id?_lists.replace("#id",id):_lists;
    }
    var tabs = [];
    if(typeof (_tabs)==='function'){
        tabs = _tabs(html);
    }else if(typeof (_tabs)==='string'){
        tabs=pdfa(html,_tabs);
    }
    var rlist=[];
    for (let i in tabs) {
        let id = _tab_id ? (pdfh(tabs[i], _tab_id) || (i + '')) : (i + '');
        var list = [];
        if(typeof(_lists)==='string'){
            list = pdfa(html, showlist(id, _lists));
        }else if(typeof(_lists)==='function'){
            list = _lists(html,MY_URL,id);
        }
        if(list.length>rlist.length){
            rlist=list
        }
    }
    let newCap='';
    if(_order==='智能'){
        // log('共计选集数量:'+rlist.length);
        let start = Math.floor(rlist.length/2); // 0
        let end = Math.min(rlist.length-1,start+1); // list.slice(-1)[0]
        let first = pdfh(rlist[start], _list_text||"a&&Text");
        let second = pdfh(rlist[end],_list_text||"a&&Text");
        if(二级处理){
            first=二级处理.选集名称(first);
            second=二级处理.选集名称(second);
        }
        //log(rlist.slice(-1));
        newCap=pdfh(rlist.slice(-1)[0], _list_text||"a&&Text");
        //log('first:'+first);
        //log('second:'+second);
        try{
            if(first.match(/(\d+)/)&&second.match(/(\d+)/)){ //数字章节的
                if(parseInt(first.match(/(\d+)/)[0])>parseInt(second.match(/(\d+)/)[0])){
                    newCap=pdfh(rlist[0], _list_text||"a&&Text");
                }
            }else{ // 中文转换
                if(汉字转数字(first)>汉字转数字(second)){
                    newCap=pdfh(rlist[0], _list_text||"a&&Text");
                }
            }
        }catch(e){}
        // log('汉字转数字第一百一十二章:'+汉字转数字('第一百一十二章'));
    }else{
        newCap=pdfh(rlist.slice(parseInt(_order))[0],_list_text||"a&&Text");
    }
    MY_PARAMS = MY_PARAMS||{};
    let ruleName = (MY_PARAMS.name||MY_RULE.title);
    // log(ruleName+'智能最新章节解析成功:'+newCap);
    var newtips = "更新至"+newCap;
    if(ruleName!==MY_RULE.title){
        newtips = ruleName+'|'+newtips
    }
    log(newtips);
    setResult(newtips);
}
function 注入(id){
    id=id||'buttons';
    if(typeof(log)=="undefiend"){
        log=fy_bridge_app.log;
    }
    log("开始注入js");
    const {isVideo} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    var js=$.toString((isVideo,id)=>{
        var btn = document.createElement('button');
        btn.setAttribute('style','border-radius:20px;width:32px;height:32px;');
        btn.setAttribute('id','btn1');
        btn.innerText = '下载';
        btn.onclick=function(){
            var urls = _getUrls();
            //fba.log(JSON.stringify(urls));
            //alert("开始下载");
            //let realUrl=false;
            let playUrl=urls.slice(-1)[0];
            let realUrl=isVideo(playUrl);
            if(typeof(realUrl)=='string'){
                fba.log("仓库x5免嗅结果:"+realUrl);
            }
            if(realUrl){
                if(confirm("进入exo播放?")){
                    fba.playVideo(realUrl);
                }
            }else{
                alert("没有视频，请先播放");
            }
        }
        var main = document.getElementById(id);
        main.appendChild(btn);
    },isVideo,id);
    return js
}
function 获取ck(set){
    var ckpath='hiker://files/cache/cookie.json';
    var oldck=fetch(ckpath)||'{}';
//log('旧的cookie:'+oldck);
    oldck=JSON.parse(oldck);
    return oldck[set]||''
}
function 注入验证码识别(id,set,extra){
    // id=id||'.tncode';
    id=id||'';
    set=set||'yzm_cookie';
    extra=extra||{};
    if(typeof(log)=="undefiend"){
        log=fy_bridge_app.log;
    }
    var js=$.toString((id,set,extra)=>{
        eval(fy_bridge_app.getInternalJs());
        //fba.log('进入x5处理中');
        //fba.log(fba.getVar('dr依赖'));
        var ckpath='hiker://files/cache/cookie.json';
        function cookieSet(){
            // fba.log('自动cookie设置:' + set + '=>' + document.cookie);
            //JSON.stringify
            //JSON.parse
            var oldck = request(ckpath) || '{}';
            fba.log('旧的cookie:' + oldck);
            oldck = JSON.parse(oldck);
            oldck[set] = document.cookie;
            fba.putVar(set, document.cookie);
            var newCk = JSON.stringify(oldck);
            fba.writeFile(ckpath, newCk);
            fba.log('新的cookie:' + newCk);
        }
        if(id) { //填了id的话
            var btn = document.createElement('button');
            let css = extra.样式 || 'border-radius:20px;width:auto;height:20px;';
            btn.setAttribute('style', css);
            btn.setAttribute('id', 'btn1');
            let text = extra.文字 || '完成并返回重试';
            btn.innerText = text;
            btn.onclick = function () {
                try {
                    fba.log('手动点击cookie设置:' + set + '=>' + document.cookie);
                    cookieSet();
                    if (confirm('已设置当前页cookie，返回查看搜索结果。返回后需要手动下拉刷新！！！')) {
                        fba.parseLazyRule('hiker://empty@lazyRule=.js:back()');
                    }

                } catch (e) {
                    alert(e.message)
                }
            }
            var main = document.querySelector(id);
            main.appendChild(btn);
        }else{//没填就自动注入，刷新都算
            if(document.cookie) {//如果有cookie
                try {
                    fba.log('自动cookie设置:' + set + '=>' + document.cookie);
                    cookieSet();
                } catch (e) {
                    alert(e.message)
                }
            }
        }
    },id,set,extra);
    return js
}

function 道长验证码(title,myurl,id,set,extra){

    if(getVar(set,'')&&!getMyVar('cookie')){
        putMyVar('cookie',getVar(set,''));
        refreshPage(true);
        return;
    }

//必填链接，id，cookie名称
    extra=extra||false;
    title=title||'网站触发了人机验证，点此处理';
    /*
    var url=$().lazyRule((title,MY_URL,id,set,extra,注入验证码识别)=>{
    if(getVar(set,'')&&!getMyVar('cookie')){
    putMyVar('cookie',getVar(set,''));
    refreshPage(true);
    return'hiker://empty';
    }
    return $(MY_URL).rule((注入验证码识别,id,set,extra)=>{
                //log(typeof(注入验证码识别))
                let d=[];
                d.push({
                 col_type: "x5_webview_single",
                 url: MY_URL,
                 desc: "float&&100%",
                 extra: {
                   canBack: true,
                   js:注入验证码识别(id,set,extra)
                  }});
                setResult(d);
          },注入验证码识别,id,set,extra);

    },title,MY_URL,id,set,extra,注入验证码识别);
    */
//log('待注入:'+MY_URL);
    var url=$(myurl).rule((注入验证码识别,id,set,extra)=>{
        //log(typeof(注入验证码识别))
        input=MY_URL;
        require(getVar('dr依赖'));
        //log('注入了:'+MY_URL);
        var oldck=获取ck(set);
        setPageTitle('道长验证码通杀');
        addListener('onClose', $.toString((set,oldck,获取ck)=>{
            // log(MY_TYPE)，首页将打印home，搜索为search
            log('退出了通杀界面,旧的cookie为:'+oldck);
            let newck=获取ck(set);
            log('新的cookie为:'+newck);
            if(!newck){
                let error='未获取cookie，验证失败！';
                log(error);
                //setError(error);
                //throw error;
            }else if(oldck===newck){
                log('cookie未更新，验证可能未通过');
            }
            if(MY_TYPE!=='search'){
                refreshPage(false); //非搜索过验证返回自动刷新使设置生效
            }
        },set,oldck,获取ck));
        let d=[];
        d.push({
            col_type: "x5_webview_single",
            url: input,
            desc: "float&&100%",
            extra: {
                canBack: true,
                js:注入验证码识别(id,set,extra)
            }});
        setResult(d);
    },注入验证码识别,id,set,extra);
    let d=[];
    d.push({
        title:title,
        col_type:'text_1',
        url:url,
    });
    setResult(d);
    // $().b64().rule()  可以实现在lazyRule里返回rule
}
