js:
    function getHeaders(playUrl){
        let headers = {};
        let refer=playUrl.split("//")[0]+"//"+playUrl.split("//")[1].split("/")[0];
        if(/lecloud\.com|bilivideo\.com/.test(playUrl)){
            headers = {"Referer": 'https://www.bilibili.com/',"User-Agent":"Mozilla/5.0"}
        }else if(/mgtv\.com/.test(playUrl)){
            headers = {"Referer": refer,"User-Agent":"Mozilla/5.0"}
        }else if(/ixigua\.com/.test(playUrl)){
            headers = {"Referer": 'https://www.ixigua.com/',"User-Agent":"Mozilla/5.0"}
        }else{
            // headers = {"Referer": refer,'User-Agent':'Dart/2.13 (dart:io)'}
            // headers = {"Referer": refer,'User-Agent':MOBILE_UA};
            headers = {'User-Agent':MOBILE_UA};
        }
        return headers
    }
function isPic(str){
    return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str);
}
function isVideo(playUrl,rechange){
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
        /*
        if(typeof(log)==='undefined'){
            return  fba.parseLazyRule($$$().lazyRule((url)=>{
                return getHome(url)
            },url))
        }else {
            return getHome(url)
        }
        */
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
    let exceptWords = '.js$|.css$|.ts$|.html$|.htm$|.gif$|.jpg$|.jpeg$|.png$|.ico$|.svg$|.txt$'.split('|').map(it=>'\\'+it).join('|');
    var exceptKeys = new RegExp(exceptWords);
    let exceptWords1 = 'referer=|url='.split('|').map(it=>it).join('|');
    var exceptKeys1 = new RegExp(exceptWords1);
    let replaceWords = 'playm3u8|m3u8\.tv'.split('|').map(it=>it).join('|');
    let replaceKeys = new RegExp(replaceWords,'g');
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
    // log('1:'+(videoKeys.test(pUrl)||videoKeys.test(pUrl2)||videoKeys.test(pUrl.replace(replaceKeys,"").split("&")[0].split("?")[0])));
    // log('2:'+!exceptKeys.test(pUrl.split("?")[0].split('&')[0]));
    // log('3:'+!exceptKeys1.test(pUrl.replace(pUrl.split("?")[0],'')));
    if ((hasKey||videoKeys.test(rUrl.replace(replaceKeys,"").split("&")[0].split("?")[0]) )&& !exceptKeys.test(pUrl2)&&!exceptKeys1.test(pUrl2)) {
        if(!(/User-Agent|Referer@/.test(playUrl))){
            if(/lecloud\.com|bilivideo/.test(playUrl)){
                playUrl+=";{Referer@https://www.bilibili.com/&&User-Agent@Mozilla/5.0}";
            }else if(/ixigua\.com/.test(playUrl)){
                playUrl+="#isvideo=true#;{Referer@https://www.ixigua.com/&&User-Agent@Mozilla/5.0}";
            }
            else if(/mgtv\.com|byteamone/.test(playUrl)){
                playUrl+=";{User-Agent@Mozilla/5.0}";
            }else if(/ptwo\.wkfile\.com/.test(playUrl)&&/url=/.test(playUrl)){
                playUrl=playUrl.split("url=")[1]+";{Referer@https://fantuan.tv}"
            }
            // 处理大师兄之类的app
            // else{
            //     playUrl+=";{User-Agent@Mozilla/5.0}";
            // }
        }
        playUrl=rechange(playUrl);
        if(!/#isVideo=true#/.test(playUrl)){
            playUrl+="#isVideo=true#";
        }
        // let t2 = new Date().getTime();
        // print('判断isVideo耗时:'+(t2-t1));
        return playUrl;
    }else{
        // let t2 = new Date().getTime();
        // print('判断isVideo耗时:'+(t2-t1));
        return false;
    }
}
function comParse(parStr,ej,onlyback,html){
    //列表，标题，图片，描述，链接，内容
    ej = ej||false;//有二级
    onlyback=onlyback||false;//只返回数据
    html = html||getResCode();
    html = typeof(html)==='string'?html:html.html;
    return $.toString((parStr,ej,onlyback,html,isPic)=>{
        let t=parStr.split(";");
        let d=[];
        // let list=pdfa(getResCode(),t[0]);
        let list=pdfa(html,t[0]);
        let lazy = $('').lazyRule(()=>{
            const {lazyParse} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
            return lazyParse(input)
        });
        for(let i in list){
            let _pic = t[2]?pd(list[i],t[2]):'';
            if(isPic(_pic)&&!/@Referer=/.test(_pic)){
                _pic+='@Referer='
            }
            let it={
                title:pdfh(list[i],t[1]),
                pic_url:_pic,
                desc:pdfh(list[i],t[3]),
                url:ej?pd(list[i],t[4]):pd(list[i],t[4])+lazy
            };
            if(t.length>5){//内容，用于搜索
                it.content=pdfh(list[i],t[5])
            }
            d.push(it);
        }
        if(onlyback){
            return d
        }else{
            setResult(d)
        }
    },parStr,ej,onlyback,html,isPic)
}

function isBadVideo(videoUrl) {//是坏的视频
    let dmPath = 'hiker://files/cache/diaomao.txt';//吊毛模式过滤文件路径
    let dmUrls;
    try {
        dmUrls = request(dmPath).trim().split('\n').filter(it => it && !it.startsWith('//'));
    } catch (e) {
        dmUrls = [];
    }

    function hasDm(videoUrl, dmUrls) {//播放地址是否为吊毛视频
        if (dmUrls.length < 1) {
            return false
        }
        function print(str){
            if(typeof(log)!=='undefined'){
                log(str);
            }else{
                fba.log(str);
            }
        }
        for (let dmUrl of dmUrls) {
            if ((new RegExp(dmUrl)).test(videoUrl)) {//播放地址包含吊毛标志的地址
                print('吊毛视频,自动过滤:'+videoUrl);
                return true
            }
        }
        print('非吊毛视频,可播放:'+videoUrl);
        return false
    }

    function isDm(ret) {
        if (!ret) {
            return true
        }
        return hasDm(ret.split('#')[0].split(';')[0], dmUrls)
    }
    return isDm(videoUrl)
}

function lazyParse(playUrl,ms,tm,rechange){
    // log('调用仓库免嗅探传参超时为:'+ms);
    tm = parseInt(tm)||5000;
    const {isVideo,getHeaders,isBadVideo} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    let realUrl = isVideo(playUrl,rechange);
    //log(realUrl);
    if(typeof(realUrl)=='string'){//bool值就是失败
        try{
            let rurl=realUrl.split(";")[0].split("#")[0];
            return JSON.parse(request(rurl,{timeout:tm})).url
        }catch(e){
            return realUrl
        }
        //return realUrl
    }

    //log("访问超时:"+tm);
    log("尝试道长仓库x5免嗅:"+playUrl);
    clearVar("_x5jxUrl");
    let bad=$("网络不佳或者疑似对方网站挂了，你要查看其网页吗？").confirm((playUrl)=>{
        log("网站看起来挂了:"+playUrl);
        return playUrl
    },playUrl);
    try{
        var back=request(playUrl,{headers: getHeaders(playUrl),timeout:tm});
        //var back=fetch(playUrl,{headers: {'User-Agent': PC_UA}});
        if(!back){
            log("网站"+playUrl+"确实啥也没返回");
            return bad
        }else if(/#EXTINF/.test(back)){
            //let lcache="/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/cache/video.m3u8";
            //writeFile(lcache,back);
            //return lcache+"##"+playUrl+"#isVideo=true#"
            playUrl=cacheM3u8(playUrl);
            return playUrl
        }else if((!/触发了防盗链|未授权|接口防盗/.test(back))&&(!/http|url/.test(back))&&(!/msg|code|html/.test(back))){
            log(back);
            return 'toast://疑似对方数据加密了，具体数据看日志'
        }
    }catch(e){
        log(e.message);
        return bad
    }
    try {
        back=JSON.parse(back);
        let realUrl=back.url;
        if(typeof(realUrl)=="undefined"||!realUrl){
            log(back);
            return "toast://道长仓库解析失败！返回播放地址为空"
        } else if(typeof(isVideo(realUrl,rechange))=='string'){
            return isVideo(realUrl,rechange);
        }else{
            return realUrl+"#isVideo=true#";
        }
        //else{
        //realUrl+=";{User-Agent@Mozilla/5.0}";
        // }
    }catch (e) {
        log("检测到解析口非json错误:"+e.message+',开始x5免嗅探');
        // require('https://hjdhnx.coding.net/p/hiker/d/dr/git/raw/master/js/lsg.js');//引用本地储存插件
        const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");//引用子页面本地储存插件
        let local_ms = lsg.getItem('timeout');
        let ms = parseInt(ms)||parseInt(local_ms)||5000;
        let max_count=Math.ceil(ms/250);
        log("本次嗅探超时:"+ms+"共计待抓包:"+max_count+"次");
        showLoading('嗅探中，若失败就切换web嗅探...');
        let _x5 = $.toString((isVideo,rechange,playUrl,max_count,PC_UA,isBadVideo)=>{
            try {
                if(typeof(fba)=='undefined'||!fba){
                    var fba = fy_bridge_app;
                }
                try {
                    if(typeof(request)=='undefined'||!request){
                        eval(fba.getInternalJs());
                    }
                }catch (e) {
                    fba.log(e.message);
                }
                fba.putVar("_x5jxUrl",playUrl);
                if(window.count == null){
                    window.count=1;
                }
                let text='';
                try {
                    text=document.querySelector("body").innerText;
                }catch (e) {fba.log(e.message)}
                if(/触发了防盗链|未授权|接口防盗/.test(text)&&window.count===1){
                    fba.log("检测到有授权，开始过授权");
                    //location.reload();
                    location.href=fba.getVar("_x5jxUrl");
                }
                window.count++;
                // fba.log('count:'+window.count+',max_count:'+max_count);
                if( window.count >= max_count){
                    fba.log("超过"+max_count*250+"毫秒未获取到资源地址，跳到源网页,以下是加载过的地址");
                    try {
                        let text=document.querySelector("body").innerText;
                        // fba.log(text);
                    }catch (e) {fba.log(e.message)}
                    fba.log(JSON.stringify(_getUrls()));
                    return fba.getVar("_x5jxUrl");
                }
                function muteMe(elem) {
                    try {
                        elem.pause();
                    }
                    catch (e) {
                    }
                }
                var videos = document.querySelectorAll("video"), audios = document.querySelectorAll("audio"), v2 = document.querySelectorAll("embed"), v3 = document.querySelectorAll("#player");
                try {
                    [].forEach.call(videos, function (video) {
                        muteMe(video);
                    });
                } catch (e) {}
                try {
                    [].forEach.call(audios, function (audio) {
                        muteMe(audio);
                    });
                } catch (e) {}
                try {
                    [].forEach.call(v2, function (v) {
                        muteMe(v);
                    });
                } catch (e) {}
                try {
                    [].forEach.call(v3, function (v) {
                        muteMe(v);
                    });
                } catch (e) {}
                var urls = _getUrls();
                // fba.log(JSON.stringify(urls));
                try {
                    for(let i in urls) {
                        let u=urls[i];
                        try{u=decodeURIComponent(u);}catch(e){
                            u=unescape(u);
                        }
                        //
                        if(/url=http/.test(u)){
                            u = u.split("url=").slice(-1)[0];
                            // fba.log("url分割:"+u);
                        }else if(/url=\//.test(u)&&/\.m3u8/.test(u)){
                            let host = u.match(/(.*)\/\/(.*?)\//)[0];
                            u = host+u.split("url=").slice(-1)[0];
                            // fba.log("url分割:"+u);
                        }
                        else if(/vid=http/.test(u)){
                            u = u.split("vid=").slice(-1)[0];
                            fba.log("vid分割:"+u);
                        }else if(/vid=\//.test(u)&&/\.m3u8/.test(u)){
                            let host = u.match(/(.*)\/\/(.*?)\//)[0];
                            u = host+u.split("vid=").slice(-1)[0];
                            fba.log("vid分割:"+u);
                        }
                        else if(/\?(.*)=http/.test(u)&&/\.m3u8/.test(u)){
                            u = "http"+u.split(/\?(.*)=http/).slice(-1)[0];
                            fba.log("其他分割:"+u);
                        }
                        //|index\.m3u8$
                        else if(/\/1\.m3u8/.test(u)){
                            continue;
                        }
                        u=u.replace(/&from=.*|&next=.*|&jump=.*/,'');
                        let realUrl = isVideo(u,rechange);
                        if(typeof(realUrl)=='string'&&!isBadVideo(u)){//过滤吊毛视频
                            //fy_bridge_app.setWebUa(PC_UA);
                            if(typeof(fba.getHeaderUrl)!=='undefined'&&typeof(rechange)!=='function'){
                                // let backUrl = fba.getHeaderUrl(u.replace(";{","#isVideo=true#;{"));
                                let backUrl = fba.getHeaderUrl(urls[i]).replace(';{','#ignoreImg=true##isVideo=true#;{');
                                let u1 = backUrl.split('#ignoreImg')[0];
                                let u2 = '#ignoreImg'+backUrl.split('#ignoreImg')[1];
                                u1 = u1.replace(/&from=.*|&next=.*|&jump=.*/,'');
                                if(/url=http/.test(u1)){
                                    u1 = u1.split("url=").slice(-1)[0];
                                }else if(/url=\//.test(u1)&&/\.m3u8/.test(u1)){
                                    let host1 = u1.match(/(.*)\/\/(.*?)\//)[0];
                                    u1 = host1+u1.split("url=").slice(-1)[0];
                                    // fba.log("url分割:"+u);
                                }
                                else if(/vid=http/.test(u1)){
                                    u1 = u1.split("vid=").slice(-1)[0];
                                }else if(/vid=\//.test(u1)&&/\.m3u8/.test(u1)){
                                    let host1 = u1.match(/(.*)\/\/(.*?)\//)[0];
                                    u1 = host1+u1.split("vid=").slice(-1)[0];
                                }
                                else if(/\?(.*)=http/.test(u1)&&/\.m3u8/.test(u1)){
                                    u1 = "http"+u1.split(/\?(.*)=http/).slice(-1)[0];
                                }
                                backUrl = u1 + u2;
                                // fba.log('返回自动加cookie链接:'+backUrl);
                                fba.log('返回链接:'+u+'并自动加了cookie,具体cookie在视频播放处查看');
                                return backUrl;
                            }
                            else{
                                fba.log("返回仓库x5免嗅结果:"+realUrl);
                                return realUrl
                            }
                        }
                    }
                }catch (e) {
                    fba.log(e.message)
                }
            }catch (e) {
                // fy_bridge_app.log('x5大范围错误:'+e.message);
                alert('x5大范围错误:'+e.message);
                return 'toast://报错结束x5'
            }
        },isVideo,rechange,playUrl,max_count,PC_UA,isBadVideo);
        let useWeb=lsg.getItem("通免","X5")==="WEB";
        //log("仓库使用web通免替代x5:"+useWeb);
        let ruleHead=useWeb&&parseInt(getAppVersion())>=2339?"webRule://":"x5Rule://";
        let x5Url = ruleHead+playUrl+ '@' +_x5;
        return x5Url
    }
}

function x5ParsePro(x5list,x5Timeout,isVideo){
    let bpath = 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/dzHouse/html/海阔嗅探器.html';
    let bcode = fetch(bpath);
    if(!bcode||!/fy_bridge_app/.test(bcode)){
        log('本地未安装嗅探器，开始安装');
        const {api} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
        let html = fetch(api.host+'/rulelist.json?id=2055');
        if(/海阔视界/.test(html)){
            writeFile(bpath,html);
        }else{
            writeFile(bpath,fetch('https://hjdhnx.coding.net/p/hiker/d/dr/git/raw/master/html/getVideo.html'))
        }
    }
    x5Timeout = parseInt(x5Timeout)||5000;
    let max_count=(x5Timeout/250); //根据超时自动计算了可执行的次数
    putVar('x5List',JSON.stringify(x5list));
    let _x5 = $.toString((isVideo, max_count,x5Timeout,isBadVideo) => {
        //初始化fba和requst
        if (typeof (fba) == 'undefined' || !fba) {
            var fba = fy_bridge_app;
        }
        try {
            if (typeof (request) == 'undefined' || !request) {
                eval(fba.getInternalJs());
            }
        } catch (e) {
            fba.log(e.message);
        }
        //------------------
        try {
            if (window.count == null) {
                window.count = 1;
            }
            let text='';
            try {
                text=document.querySelector("body").innerText;
            }catch (e) {fba.log(e.message)}
            if(/触发了防盗链|未授权|接口防盗/.test(text)&&window.count==1){
                location.reload();
                fba.log("检测到有授权，开始过授权");
            }
            window.count++;
            // fba.log('count:' + window.count + ',max_count:' + max_count);
            if (window.count >= max_count) {
                fba.clearVar('x5List');
                fba.hideLoading();
                let fmsg = '道长仓库通免解析失败,原因:超时'+x5Timeout+'毫秒';
                fba.log(fmsg);
                return 'toast://'+fmsg;
            }
        }catch (e) {
            fba.log(e.message);
        }

        function muteMe(elem) {
            try {
                elem.pause();
            } catch (e) {
            }
        }

        var videos = document.querySelectorAll("video"), audios = document.querySelectorAll("audio"),
            v2 = document.querySelectorAll("embed"), v3 = document.querySelectorAll("#player");
        try {
            [].forEach.call(videos, function (video) {
                muteMe(video);
            });
        } catch (e) {
        }
        try {
            [].forEach.call(audios, function (audio) {
                muteMe(audio);
            });
        } catch (e) {
        }
        try {
            [].forEach.call(v2, function (v) {
                muteMe(v);
            });
        } catch (e) {
        }
        try {
            [].forEach.call(v3, function (v) {
                muteMe(v);
            });
        } catch (e) {
        }
        var urls = _getUrls();
        try {
            for (let i in urls) {
                let u=urls[i];
                //u=decodeURIComponent(u);
                try{u=decodeURIComponent(u);}catch(e){
                    u=unescape(u);
                }
                if(/url=http/.test(u)){
                    u = u.split("url=").slice(-1)[0];
                }else if(/vid=http/.test(u)){
                    u = u.split("vid=").slice(-1)[0];
                }else if(/\?(.*)=http/.test(u)){
                    u = "http"+u.split(/\?(.*)=http/).slice(-1)[0];
                    //fba.log("其他分割:"+u);
                }else if(/\/1\.m3u8$/.test(u)){
                    continue;
                }
                u=u.replace(/&from=.*|&next=.*|&jump=.*/,'');
                let realUrl = isVideo(u);
                if (realUrl&&!isBadVideo(u)) {//过滤吊毛
                    fba.log("仓库x5免嗅结果:" + realUrl);
                    fba.clearVar('x5List');
                    return realUrl
                }
            }
        } catch (e) {
            fba.log(e.message)
        }
    }, isVideo, max_count,x5Timeout,isBadVideo);
    const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");
    let useWeb=lsg.getItem("通免","X5")==="WEB";
    //log("仓库使用web通免替代x5:"+useWeb);
    let ruleHead=useWeb&&parseInt(getAppVersion())>=2339?"webRule://":"x5Rule://";
    return ruleHead+bpath+'@' + _x5;
}

function LazyParseFast(playUrlList,getTimeout,x5Timeout){
    const {isVideo,getHeaders,x5ParsePro} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
    // log('开始执行'+playUrlList.length+'个地址的批量嗅探:'+playUrlList);
    log('开始执行'+playUrlList.length+'个地址的批量嗅探');
    let playUrls = playUrlList.map((it)=>{
        return {
            url:it.split(";")[0],
            options: {
                headers: {
                    //"User-Agent": "Dart/2.13 (dart:io)",
                    "User-Agent":"Mozilla/5.0"
                },
                timeout: getTimeout
            }
        }
    });
    let bhtml = batchFetch(playUrls);
    let videos = [];
    let x5list = [];
    for(let i in bhtml){
        let order = parseInt(i)+1;
        let tname=order+'号解析网址:';
        //log(tname);
        let turl=playUrlList[i].split(";")[0];
        let jname=playUrlList[i].split(";").length>1?playUrlList[i].split(";")[1]:"";
        tname+=jname;
        let backcode = bhtml[i];
        if((!/url|http/.test(backcode))&&(!/#EXTINF/.test(backcode))){
            log(tname+turl+'有问题,可能加密或者挂了');
            continue;
        }else if(/#EXTINF/.test(backcode)){
            //let lcache="/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/cache/video_"+tname+".m3u8";
            //writeFile(lcache,backcode);
            //videos.push(lcache);
            let pUrl=cacheM3u8(turl);
            videos.push(pUrl);
            continue;
        }
        try {
            let url = JSON.parse(backcode).url;
            if(/^http/.test(url)){
                let realVideo = isVideo(url);
                if(typeof(realVideo)=='string'){
                    log(tname+'已解析出视频:'+realVideo);
                    if(jname){
                        realVideo+="★"+jname
                    }
                    videos.push(realVideo);
                }else{
                    log(tname+'解析出不知道什么东西:'+url);
                    url+="#isVideo=true#";
                    if(jname){
                        url+="★"+jname
                    }
                    videos.push(url);
                }
            }else{
                log(tname+'为json接口且无返回视频地址数据:'+playUrlList[i]+'\n'+backcode);
            }
        }catch (e) {
            log(tname+'为x5接口,加入x5嗅探列表');
            x5list.push(playUrlList[i]);
        }
    }
    // log(videos);
    if(videos.length>0){
        if(getVar('dp.cacheVideo','true')==='true'&&parseInt(getAppVersion())>=2255)
        {
            log("尊敬的魔断用户，视频缓存已启用，请尽情享受看剧时光");
            let videosCache=videos.map((it)=>{
                let headers={};
                if(it.split(";").length>1){
                    let head = it.split(';')[1];
                    if(/@/.test(head)&&/{|}/.test(head)){
//head = head.replace(/{|}/g,'');
                        head = head.split("{")[1].split("}")[0];
                        head = head.split('&&');
                        for(let i in head){
                            let key = head[i].split('@')[0];
                            let value =head[i].split('@')[1].replace(/;/,'；；');
                            headers[key] = value;
                        }
                    }
                }
                return {
                    url:it.split(";")[0].split("★")[0],
                    options:{
                        headers:headers
                    }
                }
            });
            var data=batchCacheM3u8(videosCache);
            data=data.map((it,id)=>{
                let extra="";
                if(videos[id].split(";").length>1){
                    extra=";"+videos[id].split(";")[1];
                }else if(videos[id].split("★").length>1){
                    extra="★"+videos[id].split("★")[1];
                }

                if(it+""!="null"){
                    return it+extra
                }else{
                    return videos[id]
                }
            });
            //log(data);
            return data
            //return videos
        }else{
            return videos
        }
    }
    log('共有'+x5list.length+'个x5地址进行轮流嗅探');
    //没有的话就开始依次x5嗅探
    showLoading('嗅探中，若失败就切换web嗅探...');
    return x5ParsePro(x5list,x5Timeout,isVideo);
}
var lazy=$('').lazyRule(()=>{
    try{
        realUrl=input;
        eval("var config_dp =" + fetch("hiker://files/cache/MyParseSet.json"));
        eval(fetch(config_dp.cj));
        log(input+'->正在断插魔改版解析...');
        // 加入超时设置，建议在首页设置
        return aytmParse(realUrl)
    }catch(e){
        return input
    }
});
$.exports.isPic=isPic;
$.exports.isVideo=isVideo;
$.exports.isBadVideo=isBadVideo;
$.exports.comParse=comParse;
$.exports.getHeaders=getHeaders;
$.exports.lazyParse=lazyParse;
$.exports.x5ParsePro=x5ParsePro;
$.exports.LazyParseFast=LazyParseFast;
$.exports.lazy=lazy;