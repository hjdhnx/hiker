js:
    const {
        getApi,
        color,
        small,
        htmlTag,
        api,
        md
    } = $.require("hiker://page/utiliy");
let {
    id,
    lver,
    isAll
} = MY_PARAMS;
addListener('onClose', $.toString((isAll) => {
    if(!isAll){
        refreshPage(false);
    }
},isAll));
let dataItem = JSON.parse(request(getApi("getbyid") + "?id=" + id)).result;
setPageTitle("「" + dataItem.name + "」")
let ruleListJson = getApi("ruleListJson") + "?id=";
let data = [];
var hasSub = false;

if (dataItem.is_json_list) {
    hasSub = hasHomeSub(ruleListJson + dataItem.id);
} else if (!dataItem.is_json_list && dataItem.data_type == 'home_rule_url') {
    hasSub = hasHomeSub(ruleListJson + dataItem.id + '&debug=true');
}

data.push({
    title: htmlTag("big", "版本"),
    desc: "““””开发者：" + color(dataItem.author, "#228BE6") + "\n云端版本：" + color(dataItem.ver, "#5cff2c") + "\t\t本地版本：" + color(lver, "#5cff2c") + "\n更新于: [" + color(dataItem.last_update, "#ff7000") + "]",
    url: $("<开发者>\n" + dataItem.author + "\n<名称>\n" + dataItem.name + "\n<云端版本>\n" + dataItem.ver + "\n<本地版本>\n" + lver + "\n<更新时间>\n[" + dataItem.last_update + "]").confirm(() => {}),
    col_type: 'text_1'
});
let dataType = {
    home_rule_url: '首页云规则',
    publish: '提交云仓库规则',
    js_url: '网页插件规则',
    html: '静态页面',
    config: '主页配置'
};

let basic = {
    col_type: "text_1",
    url: "hiker://empty"
};
let dataTypeTips = dataType[dataItem.data_type] || '未知规则：' + dataItem.data_type;

let safe_tip=dataItem.is_safe?"安全":"危险";
let good_tip = dataItem.is_good?small(color("【优质规则】",'#ff7000')):"";
let not_safe_note=dataItem.not_safe_note;
basic.title = htmlTag("big", "类型") + "\t\t\t" + small("(id:" + dataItem.id + ")")+"\t\t\t" + small("(风险检测:" +safe_tip+")")+good_tip;
basic.desc = "数据类型：" + color(dataTypeTips, "#cb54ff") + "\n分享状态为：" + dataItem.state;
if (["html", "config", "js_url"].includes(dataItem.data_type)) {
    basic.desc += "\n““”” =>" + small("点此预览");
    basic.url = ruleListJson + dataItem.id;
}

data.push(basic);
let hasSubs = "";
if (hasSub) {
    hasSubs = "\t\t\t" + small("已订阅")
}

let notes = request(getApi("get_rule_note") + id);
notes = JSON.parse(notes).result;
require(md);
let notesHtml=""
try{
    notesHtml=marked.parse(notes);
}catch(e){}

if (notes !== false) {
    data.push({
        title: htmlTag("big", "备注") + "\t\t\t" + small(htmlTag("u", "查看完整公告 >")),
        desc: notes,
        col_type: "text_1",
        url: "hiker://page/info",
        extra: {
            text: notesHtml,
            name: dataItem.name,
            // type: "long_text"
            type: "rich_text"
        }
    });
}
data.push({
    title: htmlTag("big", "操作") + hasSubs,
    col_type: "text_1",
    url: "toast://你才是最帅的那个人！"
});
let importUrl, ruleCode, shareUrl, backCode = "";
if (!dataItem.is_json) {
    backCode = request(ruleListJson + dataItem.id);
}
switch (dataItem.data_type) {
    case "home_rule_url":
        ruleCode = "海阔视界首页频道规则【" + dataItem.name + "】￥home_rule_url￥" + ruleListJson + dataItem.id;
        importUrl = "rule://" + base64Encode(ruleCode)
        break;
    case 'publish':
        ruleCode = '海阔视界规则分享，当前分享的是：' + dataItem.name + '￥publish￥' + base64Encode(backCode);
        importUrl = 'rule://' + base64Encode(ruleCode);
        break;
    case 'js_url':
        ruleCode = '海阔视界规则分享，当前分享的是：网页插件￥js_url￥' + dataItem.name + '@base64://' + base64Encode(backCode);
        importUrl = 'rule://' + base64Encode(ruleCode);
        break;
    case 'html':
        let file_tmp = dataItem.name.split('.');
        let file_path = file_tmp.length > 1 ? file_tmp[file_tmp.length - 1] + "/" + dataItem.name : dataItem.name;
        ruleCode = "海阔视界本地文件分享￥file_url￥hiker://files/rules/dzHouse/" + file_path + "@" + ruleListJson + dataItem.id;
        importUrl = 'rule://' + base64Encode(ruleCode);
        break
    case "config":
        importUrl = $().rule(password => {
            eval(fetch("hiker://assets/home.js"));
            HikerHome.load("import", password);
        }, backCode);
        break;
}
let my_col_type = "text_2";
let my_col_type2 = "text_3";
if (importUrl) {
    data.push({
        title: "导入规则",
        url: dataItem.is_safe?importUrl:'toast://风险规则禁止导入!!!',
        col_type: my_col_type
    });
}
if (ruleCode) {
    data.push({
        title: "分享口令",
        url: "copy://" + ruleCode,
        col_type: my_col_type
    });
}

if (importUrl) {
    if (dataItem.is_json_list && !hasSub) {
        let sub_rule_code = '海阔视界合集规则订阅￥home_sub￥' + dataItem.name + "@@" + ruleListJson + dataItem.id;
        let sub_url = 'rule://' + base64Encode(sub_rule_code);
        data.push({
            title: '订阅合集',
            url: sub_url,
            col_type: my_col_type2
        });
        data.push({
            title: '““””<span style="color: #ff7000">导入轻合集</span>',
            url: $().lazyRule((dataItem,subUrl)=>{
                const {genRule}=$.require("hiker://page/genApi");
                let import_rule=genRule(dataItem.name+"."+dataItem.author,subUrl);
                //copy(import_rule);
                let ruleCode=parsePaste(import_rule.split("\n")[0]);
                //return "hiker://empty"
                importUrl = 'rule://' + base64Encode(ruleCode);
                return importUrl
            },dataItem,ruleListJson + dataItem.id),
            col_type: my_col_type2
        });
        data.push({
            title: '““””<span style="color: #ff7000">导入道德经</span>',
            url: $().lazyRule((dataItem,subUrl)=>{
                // let title = "H-"+dataItem.name+"."+dataItem.author;
                let title = "J-"+dataItem.name.split('.')[0];
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
            },dataItem,ruleListJson + dataItem.id),
            col_type: my_col_type2
        });
        data.push({
            title: "<small>提示：开发者单独分享的合集文件只能单独导入。</small>",
            col_type: "rich_text"
        });
    } else if (!dataItem.is_json_list && !hasSub && dataItem.data_type == 'home_rule_url') {
        let sub_rule_code = '海阔视界单规则订阅￥home_sub￥' + dataItem.name + "@@" + ruleListJson + dataItem.id + '&debug=true';
        let sub_url = 'rule://' + base64Encode(sub_rule_code);
        data.push({
            title: '订阅规则',
            url: sub_url,
            col_type: my_col_type
        })
    }
}
if (dataItem.is_json && dataItem.data_type === "home_rule_url" && !dataItem.is_json_list) {
    data.push({
        title: '进入频道',
        url: $( /*"#noLoading#"*/ ).lazyRule((name,home) => {
            let ruleList = JSON.parse(request(home));
            let hasRule = ruleList.some(item => item.title === name);
            if (hasRule) {
                putVar("Warehouse.back", "1");
                back();
                return home+"s@" + name;
            } else {
                return "toast://未安装";
            }
        }, dataItem.name,api.home),
        col_type: my_col_type
    })
}
let man_rule_safe = getApi("manRuleSafe")+dataItem.id;
let man_rule_good = getApi("manRuleGood")+dataItem.id;
// dataItem.is_safe;
if(getVar('house.is_manager')){
    function setIsSafe(flag,man_rule_safe) {
        flag = flag || '';
        try {
            let code = fetch(man_rule_safe, {
                headers: {"User-Agent": MOBILE_UA},
                body: {
                    "params":
                        {
                            "username": getVar('house.username'),
                            "password": getVar('house.password'),
                            "is_safe": !!flag
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
    function setIsGood(flag,man_rule_good) {
        flag = flag || '';
        try {
            let code = fetch(man_rule_good, {
                headers: {"User-Agent": MOBILE_UA},
                body: {
                    "params":
                        {
                            "username": getVar('house.username'),
                            "password": getVar('house.password'),
                            "is_good": !!flag
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
        title:'🚫风险',
        col_type:'scroll_button',
        url:$('标记该规则为风险?风险规则无法被导入').confirm((id,man_rule_safe,setIsSafe)=>{
            let ret = setIsSafe(false,man_rule_safe);
            if(!/操作失败/.test(ret)){
                refreshPage(false);
            }
            return 'toast://'+ret
        },dataItem.id,man_rule_safe,setIsSafe)
    });
    data.push({
        title:'✅正常',
        col_type:'scroll_button',
        url:$('标记该规则为正常?').confirm((id,man_rule_safe,setIsSafe)=>{
            let ret = setIsSafe(true,man_rule_safe);
            if(!/操作失败/.test(ret)){
                refreshPage(false);
            }
            return 'toast://'+ret
        },dataItem.id,man_rule_safe,setIsSafe)
    });
    data.push({
        title:'♥非优质',
        col_type:'scroll_button',
        url:$('标记该规则为非优质?').confirm((id,man_rule_good,setIsGood)=>{
            let ret = setIsGood(false,man_rule_good);
            if(!/操作失败/.test(ret)){
                refreshPage(false);
            }
            return 'toast://'+ret
        },dataItem.id,man_rule_good,setIsGood)
    });
    data.push({
        title:'💖优质',
        col_type:'scroll_button',
        url:$('标记该规则为优质?').confirm((id,man_rule_good,setIsGood)=>{
            let ret = setIsGood(true,man_rule_good);
            if(!/操作失败/.test(ret)){
                refreshPage(false);
            }
            return 'toast://'+ret
        },dataItem.id,man_rule_good,setIsGood)
    });
}

data.push({
    col_type: "line_blank"
});
data.push({
    title: dataItem.good_num,
    pic_url: "hiker://files/icon/赞.svg",
    col_type: "icon_small_3",
    url: "hiker://page/MakeAcomment#noHistory##noRecordHistory#",
    extra: {
        id: dataItem.id,
        name: dataItem.name
    }
});
data.push({
    title: dataItem.bad_num,
    pic_url: "hiker://files/icon/踩.svg",
    col_type: "icon_small_3",
    url: "hiker://page/MakeAcomment#noHistory##noRecordHistory#",
    extra: {
        id: dataItem.id,
        name: dataItem.name,
        defaultType:"bad"
    }
});
data.push({
    title: "评论",
    pic_url: "hiker://files/icon/评论.svg",
    col_type: "icon_small_3",
    url: "hiker://page/MakeAcomment#noHistory##noRecordHistory#",
    extra: {
        id: dataItem.id,
        name: dataItem.name
    }
});
let totalSum = dataItem.good_num + dataItem.bad_num;

data.push({
    title: htmlTag("big", "评论(" + totalSum + ")") + "\t\t\t" + small(htmlTag("u", "查看全部评论 >")),
    col_type: "text_1",
    url: "hiker://page/Comment",
    extra: {
        url: "hiker://empty#fypage#noHistory##noRecordHistory#",
        id: dataItem.id,
        totalSum: totalSum,
        no_active: false
    }
});
//const longestSum=120;
let icon = {
    "good": "👍",
    "bad": "👎",
    "reply":"开发者🗣"
}
if (totalSum === 0) {
    data.push({
        title: "<h5 style='text-align:center'>一条评论也没有，快来抢沙发吧！</h5>",
        col_type: "rich_text"
    });
} else {
    let commentList = JSON.parse(request(api.dis_get + dataItem.id + "?limit=5")).result;
    for (let item of commentList) {
        let Reply = item.discuss_type==="reply"&&item.reply_to_name!==false&&item.reply_to_id!==false?"‘‘回复@"+item.reply_to_name+" #"+item.discuss_id+"’’\n":"";
        data.push({
            title: item.name + "&nbsp;&nbsp;<font color='gray'><small>#" + item.id + "</small><font>",
            col_type: "avatar",
            //url: "toast://" + item.qq,
            url:"mqqwpa://im/chat?chat_type=wpa&uin="+item.qq,
            pic_url: item.avatar_url
        });
        data.push({
            title: item.discuss_text,
            desc: Reply+item.create_date + "·" + icon[item.discuss_type],
            col_type: "text_1",
            url: "hiker://page/info",
            extra:{
                name:item.name,
                type:"long_text",
                text:item.discuss_text
            },
            pic_url: item.avatar_url
        });
    }
    data.push({
        col_type: "line_blank"
    });
}

setResult(data);
