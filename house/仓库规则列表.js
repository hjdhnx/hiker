js:
    addListener('onClose',$.toString(()=>{
        clearVar("Warehouse.back");
        clearVar("Warehouse.filter");
        clearVar("Warehouse.type");
        if(getVar('Warehouse.can_upload','')){
            log('操作过禁止上传:'+getVar('Warehouse.can_upload'));
            clearVar("Warehouse.can_upload");
            refreshPage(true);
        }
    }));

if (getVar("Warehouse.back") === "1") {
    back(false);
}

const {
    getApi,
    api,
    color,
    small,
    localRuleVer,
    htmlTag,
    md
} = $.require("hiker://page/utiliy");
const { mergeSort } = $.require("hiker://page/sort");
let {
    avatarUrl,
    qq,
    id,
    can_upload
} = MY_PARAMS;
let dataType = getVar("Warehouse.type","");
let backCode = JSON.parse(request(getApi("rulesUrl") + "?name=" + qq+"&data_type="+dataType));
let devName = backCode.dev_name;
putVar("Warehouse.filter", devName);
let ruleList = backCode.result;
let subUrl = getApi("jsonList") + "?name=" + qq;
let hasSub = hasHomeSub(subUrl);
let devInfo = "这个人很懒,什么都没写哦~";
let tmpJson = JSON.parse(request(getApi("infoGetUrl") + qq));
if (tmpJson.status == 0) {
    devInfo = tmpJson.result || devInfo;
}
let subFlag = hasSub ? '🆗' : '📡';
let data = [];
require(md);
devInfo=marked.parse(devInfo);
data.push({
    title: "““””" + devName + "\n\n" + small(htmlTag("u", "点击查看完整公告")),
    desc: small(devInfo),
    url: 'hiker://page/info',
    extra: {
        text: devInfo,
        name: devName,
        type:"rich_text"
    },
    pic_url: avatarUrl,
    col_type: 'movie_1_vertical_pic'
});
data.push({
    title: "<big>订阅管理</big>&nbsp;&nbsp;<small>(当前" + (hasSub ? "已订阅" : "未订阅") + ")</small>",
    col_type: "rich_text"
});

let sub_code = '海阔视界合集规则订阅￥home_sub￥' + devName + "合集@@" + subUrl;
let rulesCode = '海阔视界合集规则￥home_rule_url￥' + subUrl;
data.push({
    title: '““””<span style="color: #ff7000">一键订阅</span>',
    desc: '订阅““””<span style="color: #5cff2c">' + devName + '</span>的所有单规则，合集需单独订阅',
    url: sub_code,
    col_type: 'text_2'
});
data.push({
    title: '““””<span style="color: #ff7000">导入全部</span>',
    url: rulesCode,
    col_type: 'text_2'
});
data.push({
    title: '““””<span style="color: #ff7000">导入轻合集</span>',
    url: $().lazyRule((devName,subUrl,avatarUrl)=>{
        const {genRule}=$.require("hiker://page/genApi");
        log("轻合集图标链接:"+avatarUrl);
        let import_rule=genRule("轻合集."+devName,subUrl,avatarUrl);
        //copy(import_rule);
        let ruleCode=parsePaste(import_rule.split("\n")[0]);
        //return "hiker://empty"
        importUrl = 'rule://' + base64Encode(ruleCode);
        return importUrl
    },devName,subUrl,avatarUrl),
    col_type: 'text_2'
});
data.push({
    title: '““””<span style="color: #ff7000">导入道德经</span>',
    url: $().lazyRule((devName,subUrl,avatarUrl)=>{
        let title = "H-"+devName;
        let subObj = {
            title: title,
            url: subUrl,
            desc: "hiker://files/rules/dzHouse/ruleCache/"+title+".json",
            code: "",
            active: false,//禁用并发更新
        }
        let shareText = base64Encode(JSON.stringify(subObj));
        var pastes = getPastes();
        var url = sharePaste(shareText,pastes.slice(-1)[0]);
        let import_rule= "轻合集订阅："+title+'\n'+url;
        copy(import_rule);
        const path = 'hiker://files/rules/dzHouse/ruleCache/sub.json';
        require(getVar('sub依赖','https://dr.playdreamer.cn/js/subscribe.js'));
        return 订阅导入(path)
    },devName,subUrl,avatarUrl),
    col_type: 'text_2'
});
let can_upload_api = getApi("manCanUpload")+id;
if(getVar('house.is_manager')){
    let tips = can_upload?'能':'否';
    // log('tips:'+tips);
    // log('can_upload:'+can_upload);
    data.push({
        title:'⚠能否上传:'+(getVar('Warehouse.can_upload')||tips),
        col_type:'scroll_button',
        url:'hiker://empty'
    });
    function setUpload(flag,can_upload_api) {
        flag = flag || '';
        try {
            let code = fetch(can_upload_api, {
                headers: {"User-Agent": MOBILE_UA},
                body: {
                    "params":
                        {
                            "username": getVar('house.username'),
                            "password": getVar('house.password'),
                            "can_upload": !!flag
                        }
                }
            });
            code = JSON.parse(code).result;
            if (code.status === 0) {
                return code.detail
            } else {
                return '操作失败:' + code.detail
            }
        } catch (e) {
            return '操作失败:' + e.message
        }
    }
    data.push({
        title:'🚫禁止上传',
        col_type:'scroll_button',
        url:$('禁止该开发者上传规则?你的操作将被系统记录').confirm((id,can_upload_api,setUpload)=>{
            let ret = setUpload(false,can_upload_api);
            if(!/操作失败/.test(ret)){
                putVar('Warehouse.can_upload','否');
                refreshPage(false);
            }
            return 'toast://'+ret
        },id,can_upload_api,setUpload)
    });
    data.push({
        title:'✅允许上传',
        col_type:'scroll_button',
        url:$('允许该开发者上传规则?你的操作将被系统记录').confirm((id,can_upload_api,setUpload)=>{
            let ret = setUpload(true,can_upload_api);
            if(!/操作失败/.test(ret)){
                putVar('Warehouse.can_upload','是');
                refreshPage(false);
            }
            return 'toast://'+ret
        },id,can_upload_api,setUpload)
    });
}
data.push({
    title: "<small>提示：开发者单独分享的合集文件只能单独导入。</small>",
    col_type: "rich_text"
});
data.push({
    title: "<big>规则列表</big>&nbsp;&nbsp;<small>(共" + ruleList.length + "条)</small>",
    col_type: "rich_text"
});
let dataTypeList = {
    "":"全部",
    "home_rule_url": '小程序',
    //"publish": '提交云仓库规则',
    "js_url": '网页插件',
    "html": '静态页面',
    "config": '主题'
};
for(let key in dataTypeList){
    data.push({
        title:dataType===key?"““"+dataTypeList[key]+"””":dataTypeList[key],
        url:$("#noLoading#").lazyRule((key)=>{
            putVar("Warehouse.type",key);
            refreshPage(false);
            return "hiker://empty";
        },key),
        col_type:"scroll_button"
    });
}
if (ruleList.length > 20) {
    data.push({
        title: "搜索",
        url: $.toString(name => "hiker://search?s=" + input + "&rule=" + name, MY_RULE.title),
        col_type: "input",
        desc: "搜索当前开发者的规则"
    });
}
let homeList = JSON.parse(request(api.home));
let mRuleList = [];
for (var item of ruleList) {
    var name = item.name;
    if (item.is_tap) {
        let location = JSON.parse(request(getApi("ruleListJson") + "?id=" + item.id));
        item.id = location.id;
        item.name = location.name;
        item.author = location.author;
        item.data_type = location.data_type;
        item.ver = location.ver
    }
    item.version = item.ver;
    let label = "",
        lver = -2;
    if (item.is_json && item.data_type === "home_rule_url") {
        lver = localRuleVer(homeList, item);
        if (lver === -1) {
            label = "🆕";
        } else if (lver < item.ver) {
            label = "🆙";
        }
    }
    mRuleList.push({
        title: label + name,
        url: "hiker://page/ruleDetail#noHistory##noRecordHistory#",
        extra: {
            lver: lver,
            id: item.id
        },
        pic_url: item.pic,
    });
}
/* 归并排序 Start */
//mRuleList = mergeSort(mRuleList);
/* 归并排序 End */
data.push.apply(data, mRuleList)
setResult(data);
