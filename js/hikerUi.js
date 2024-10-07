var version={
    author:"道长",
    ver:"1.0.6",
    desc:'已停更',
    appv:2316,
    requireId:"https://gitcode.net/qq_32394351/dr/-/raw/master/js/hikerUi.js",
    update:'2022/07/26 13:50',
    info:'新开模板，封装海阔UI',
    ua:';get;utf-8;{User-Agent@Mozilla/5.0&&Cookie@}',
    ok:'https://okjx.cc/?url=',
    jsRoot:'https://gitcode.net/qq_32394351/dr/-/raw/master/js/',
};
putVar('hikerUi',version.requireId);

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
function 强制正序(list){//强制正序
    let start = Math.floor(list.length/2); // 0
    let end = Math.min(list.length-1,start+1); // list.slice(-1)[0]
    let first = list[start].title;
    let second = list[end].title;
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

if(typeof(lsg)==='undefined'){//如果私有储存未定义的话就定义这个全局变量
    lsg = evalPrivateJS("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");
}
function 顺序切换(tab_cnt,list_cnt){
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
            let nowData = JSON.parse(readFile("nowList.json",0)||'[]');// 读取缓存的选集数据列表
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
}
function 选集储存(list,mode){//选集翻页前调用方法，也可以不调用，直接给选集翻页obj传参 list
    mode === 1?saveFile('showList.json',JSON.stringify(list),0):storage0.putMyVar('showList',list);
    return true
}
function 选集翻页(d,obj,showBottom){//d 是加入到数据,obj是构造对象,showBottom是否同时在底部显示
    // 关键操作:选集列表extra必须有唯一id并且cls为playList
    // 选集列表必须处理完后 storage0.putMyVar('showList') 或者 saveFile('showList.json',JSON.stringify(list),0)
    showBottom = showBottom||false;//底部也显示5大件
    let def_obj = {
        list:[],//可以对象传递,不传的话默认取storage0.gettMyVar('showList')
        size:Number(lsg.getItem('每页数量',40)),//每页数量
        over:Number(lsg.getItem('翻页阀值',40)),//翻页阀值，超过多少才显示翻页组件
        col_type:lsg.getItem('按钮样式','')||MY_RULE.col_type||'text_5',//二级选集样式
        show_order:false,//显示排序切换
        tab_cnt:1,//线路数
        mode:1,// 模式，1用私有文件,其他用内存
    }
    obj = obj||{};
    obj = Object.assign(def_obj,obj);
    let pageTitleInfo = '';//翻页统计标题
    let showPic = 'https://hikerfans.com/tubiao/ke/53.png';//翻页提示图标
    let showCol = 'avatar';//翻页提示样式
    let col_type = obj.col_type;//二级选集样式
    let show_order = obj.show_order;//显示顺序
    let tab_cnt = obj.tab_cnt; // 线路数量
    let list = Array.isArray(obj.list)&&obj.list.length>0?obj.list:(obj.mode === 1?JSON.parse(readFile("showList.json",0) || "[]"):storage0.getMyVar('showList'));// 选集列表完整数据,请确保是强制正序的
    if(list.length>0){
        list = 强制正序(list);
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
            obj.mode === 1?saveFile('showList.json',JSON.stringify(list),0):storage0.putMyVar('showList',list);
        }else if(!list[0].col_type){
            list.forEach((it)=>{
                it.col_type = col_type
            });
            obj.mode === 1?saveFile('showList.json',JSON.stringify(list),0):storage0.putMyVar('showList',list);
        }
    }
    if(!(obj.mode === 1?JSON.parse(readFile("showList.json",0) || "[]"):storage0.getMyVar('showList'))){
        obj.mode === 1?saveFile('showList.json',JSON.stringify(list),0):storage0.putMyVar('showList',list);
    }
    let showList = list;//首次渲染的选集列表
    let 每页数量 = obj.size; // 分页的每页数量
    let 最大页数 = Math.ceil(list.length/每页数量);
    let 翻页阀值 = obj.over; // 分页的翻页阀值，超过多少才显示翻页
    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
    if(nowPage>最大页数){//防止切换线路导致页数数组越界
        nowPage = 最大页数;
        putMyVar('选集翻页', ''+nowPage);
    }
    if(list.length>翻页阀值&&getMyVar('选集显示', '分页') === '分页'){
        let maxNum = 每页数量*nowPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = list.slice((nowPage-1)*每页数量,maxNum);
    }
    saveFile("nowList.json", JSON.stringify(showList),0);// 将当前页的选集变量储存列表
    if (getMyVar('顺序', '正序') === '逆序') {//对该页的数据进行正逆序排列
        showList = showList.reverse();
    }

    function jumpToPage(每页数量,toPage,nowPage,pageTitleInfo,mode){//跳页
        if(nowPage===toPage){
            return //跳转页数等于当前页，不操作
        }
        // showLoading(`正在前往第${toPage}页,请稍等`);
        let oldIds = (findItemsByCls('playList')||[]).map(it=>it.extra.id);//老元素ids
        let showList = (mode === 1?JSON.parse(readFile("showList.json",0) || "[]"):storage0.getMyVar('showList')); //获取储存的选集列表
        let maxNum = 每页数量*toPage; //第一页的话,最大显示40*1集,第2页41-80集
        showList = showList.slice((toPage-1)*每页数量,maxNum);
        saveFile("nowList.json", JSON.stringify(showList),0);// 将当前页的选集变量储存列表
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
        let order_data = 顺序切换(tab_cnt,list.length);
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
                url: $(list.length,'请输入要跳转到的集数').input((max,每页数量,pageTitleInfo,jumpToPage,mode)=>{
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
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo,mode);
                    return 'toast://已跳到列表元素第'+toNum+'个所在页码:'+toPage
                },list.length,每页数量,pageTitleInfo,jumpToPage,obj.mode)
            });
            btns.push({
                title: '🔝跳页',
                col_type: "text_5",
                url: $(1,'请输入要跳转到的页数').input((最大页数,每页数量,pageTitleInfo,jumpToPage,mode)=>{
                    if(isNaN(parseInt(input))){
                        return 'toast://输入有误,请输入一个1~'+最大页数+'的数字'
                    }
                    let toPage = parseInt(input);
                    if(toPage<1||toPage>最大页数){
                        return 'toast://输入有误,请输入一个1~'+最大页数+'的数字'
                    }
                    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                    putMyVar('选集翻页', '' + toPage);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo,mode);
                    return 'toast://已跳到第'+toPage+'页'
                },最大页数,每页数量,pageTitleInfo,jumpToPage,obj.mode)
            });
            btns.push({
                title: '⏮️上页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((每页数量,pageTitleInfo,jumpToPage,mode) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = nowPage - 1;
                    if(toPage>0) {
                        putMyVar('选集翻页', '' + toPage);
                        jumpToPage(每页数量,toPage,nowPage,pageTitleInfo,mode);
                        return 'hiker://empty'
                    }else{
                        return 'toast://已经没有上一页了!'
                    }
                },每页数量,pageTitleInfo,jumpToPage,obj.mode)
            });
            btns.push({
                title: '⏭️下页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((最大页数,每页数量,pageTitleInfo,jumpToPage,mode) => {
                    let nowPage = parseInt(getMyVar('选集翻页', '1'))||1;
                    let toPage = nowPage + 1;
                    if(toPage>最大页数){
                        return 'toast://已经没有下一页了!'
                    }
                    putMyVar('选集翻页', '' + toPage);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo,mode);
                    return 'hiker://empty'
                },最大页数,每页数量,pageTitleInfo,jumpToPage,obj.mode)
            });
            btns.push({
                title: '🔚尾页',
                col_type: "text_5",
                url: $('#noLoading#').lazyRule((最大页数,每页数量,pageTitleInfo,jumpToPage,mode) => {
                    let toPage = 最大页数;
                    let nowPage = Number(getMyVar('选集翻页', '1'))||1; //当前页数
                    putMyVar('选集翻页', ''+toPage);
                    jumpToPage(每页数量,toPage,nowPage,pageTitleInfo,mode);
                    return 'toast://已跳转到第'+最大页数+'页'
                },最大页数,每页数量,pageTitleInfo,jumpToPage,obj.mode)
            });
            seps.push({
                col_type:"line_blank",
                extra:{
                    id:'page' // 给翻页组件做id用
                }
            })
        }
    }
    Array.prototype.push.apply(d,btns);//顶部显示翻页开关
    Array.prototype.push.apply(d,seps);//下面分割
    Array.prototype.push.apply(d,showList);//刷新有效的链接
    if(showBottom&&list.length>obj.size){
        d.push({col_type:"line_blank"});
        Array.prototype.push.apply(d,btns);//底部显示翻页开关
    }
    // d = d.concat(showList);//刷新有效的链接，不支持concat
    return d
}

function 剧情简介(d,obj){
    let def_obj = {
        title:MY_PARAMS.title, // 小说/漫画名称
        info:'暂无详情',
        content:'',//点击详情进入的rich_text页面
        download:'',//下载类型
        limit:Number(lsg.getItem('简介字数','100')),//限制最大显示字数
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
}

function 海报(d,obj){
    let def_obj = {
        noCj:false,//不用沉浸
        dp:false,//启用断插
        title:MY_PARAMS.title, //标题
        pic_url:MY_PARAMS.pic_url,//图片
        url:MY_PARAMS.pic_url||MY_PARAMS.url,//链接
        desc:MY_PARAMS.desc,//描述
    }
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
}

function isPic(str){//判断是否为图片
    if(!str){
        return false
    }
    return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str);
}

function 一级传参(d,obj){
    let def_obj = {
        noRef:false,//图片不用referer
        noCj:false,//不用沉浸
    }
    obj = obj||{};
    obj = Object.assign(def_obj,obj);
    d.forEach((it)=>{
        if(!obj.noRef&&isPic(it.pic_url)&&!/@Referer=/.test(it.pic_url)){
            it.pic_url+='@Referer='
        }
        if(!obj.noRef&&isPic(it.img)&&!/@Referer=/.test(it.img)){
            it.img+='@Referer='
        }
        if(!obj.noCj&&!/#immersiveTheme#/.test(it.url)&&!/@lazyRule=|@rule=/.test(it.url)){//加上沉浸
            it.url+='#immersiveTheme#'
        }
        it.extra.url = it.url||'';
        it.extra.pic_url = (it.pic_url||it.img)||'';
        it.extra.title = it.title||'';
        it.extra.desc = it.desc||'';
        it.extra.content = it.content||'';
    });
    return d
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
    let 链接处理工具 = require('http://hiker.nokia.press/hikerule/rulelist.json?id=2849');
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

function 打造动态分类(定位列表,extra){
    page = (typeof(page)!=='undefined'&&page)?page:MY_PAGE;
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
    let 动态分类=require(version.jsRoot+'categories-header.js');
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
