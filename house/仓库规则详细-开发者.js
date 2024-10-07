js:
    const {
        getApi,
        color,
        small,
        getFile,
        existFile,
        mapColType,
        htmlTag,
        api
    } = $.require("hiker://page/utiliy");
let {
    id
} = MY_PARAMS;
let {
    username,
    password,
} = getFile();
addListener('onClose', $.toString(() => {
    refreshPage(false);
}));
let dataItem = JSON.parse(request(getApi("getbyid") + "?id=" + id)).result;
setPageTitle("编辑「" + dataItem.name + "」");
let reqByGet = "?id=" + dataItem.id + "&qq=" + username + "&password=" + password;
let ruleListJson = getApi("ruleListJson") + "?id=";
let data = [];
data.push({
    title: htmlTag("big", "版本"),
    desc: "““””云端版本:" + color(dataItem.ver, "#5cff2c") + "\n上次提交于: [" + color(dataItem.last_update, "#ff7000") + "]",
    url: $("<开发者>\n" + dataItem.author + "\n<名称>\n" + dataItem.name + "\n<云端版本>\n" + dataItem.ver + "\n<更新时间>\n[" + dataItem.last_update + "]").confirm(() => {}),
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
let dataTypeTips = dataType[dataItem.data_type] || '未知规则:' + dataItem.data_type;

basic.title = htmlTag("big", "类型") + "\t\t\t" + small("(id:" + dataItem.id + ")");
basic.desc = "数据类型：" + color(dataTypeTips, "#cb54ff") + "\n分享状态为：" + dataItem.state;
if (["html", "config", "js_url"].includes(dataItem.data_type)) {
    basic.desc += "\n““”” =>" + small("点此预览");
    basic.url = ruleListJson + dataItem.id;
}
let auth = "";
if (dataItem.state == "private") {
    let auth_back = JSON.parse(request(getApi("auth") + reqByGet));
    basic.title = basic.title + "\n" + small(color(auth_back.result, "grey"));
    auth = '&auth=' + auth_back.result;
    basic.url = basic.url === "hiker://empty" ? basic.url : basic.url + auth;
}
data.push(basic);
data.push({
    title: htmlTag("big", "操作"),
    col_type: "text_1",
    url: "toast://你才是最帅的那个人！"
});
let importUrl, ruleCode, shareUrl, backCode = "";
let subUrl = ruleListJson + dataItem.id + auth;
if (!dataItem.is_json) {
    backCode = request(subUrl);
}
switch (dataItem.data_type) {
    case "home_rule_url":
        ruleCode = "海阔视界首页频道规则【" + dataItem.name + "】￥home_rule_url￥" + ruleListJson + dataItem.id + auth;
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
        ruleCode = "海阔视界本地文件分享￥file_url￥hiker://files/rules/dzHouse/" + file_path + "@" + ruleListJson + dataItem.id + auth;
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
if (importUrl) {
    data.push({
        title: "导入规则",
        url: importUrl,
        col_type: my_col_type
    });
    if(dataItem.is_json_list&&/home_rule_url|html/.test(dataItem.data_type)){
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
            },dataItem,subUrl),
            col_type: my_col_type
        });
    }
}
if (ruleCode) {
    data.push({
        title: "分享规则",
        url: "copy://" + ruleCode,
        col_type: my_col_type
    });
}

function setSettingItem(basic, pattern) {
    let temp = {
        title: basic.title,
        col_type: basic.col_type,
        url: $(basic.confirm).confirm((url, msg, pattern) => {
            let backA = request(url);
            let ret = JSON.parse(backA);
            if (ret.status == 0) {
                pattern ? back() : refreshPage(false);
                return "toast://" + msg[0];
            } else {
                pattern ? back() : refreshPage(false);
                return "toast://" + msg[1] + "\n" + ret.detail;
            }
        }, basic.url, basic.msg, pattern)
    };
    return temp;
}
if (dataItem.state == 'private') {
    data.push({
        title: "设为公开",
        url: $(getApi("share") + reqByGet + "&flag" + "#noLoading#").lazyRule(() => {
            request(input);
            refreshPage(false);
            return "toast://已设为公开";
        }),
        col_type: my_col_type
    }, {
        title: "随机密钥",
        col_type: my_col_type,
        url: $(getApi("genAuth") + reqByGet + "#noLoading#").lazyRule(() => {
            let back = request(input);
            let ret = JSON.parse(back);
            if (ret.status == 0) {
                refreshPage(false);
                return "toast://已生成随机密码\n" + ret.result
            } else {
                refreshPage(true);
                return "toast://随机密码生成失败"
            }
        })
    });
    let timeOver = {
        col_type: my_col_type
    };
    if (dataItem.time_over) {
        timeOver.title = small(color("短时密钥", "green") + color("(→永久)", "red"));
        timeOver.url = getApi("timeover") + reqByGet + "&flag=1";
        timeOver.confirm = "是否确认以后的私藏规则分享不过期?";
        timeOver.msg = ["已设为永久", "设为永久失败"];
    } else {
        timeOver.title = small(color("永久密钥", "red") + color("(→短时)", "green"));
        timeOver.url = getApi("timeover") + reqByGet;
        timeOver.confirm = "确认要以后分享的私藏规则自动到期?";
        timeOver.msg = ["已设为过期", "设为过期失败"];
    }
    data.push(setSettingItem(timeOver));
} else if (dataItem.state == 'public') {
    data.push({
        title: "设为私有",
        url: $(getApi("share") + reqByGet + "&flag=1#noLoading#").lazyRule(() => {
            request(input);
            refreshPage(false);
            return "toast://已设为私有";
        }),
        col_type: my_col_type
    });
}
data.push(setSettingItem({
    title: "删除数据",
    confirm: "是否确认删除",
    msg: ["已删除", "删除失败"],
    url: getApi("deleteUrl") + reqByGet,
    col_type: my_col_type
}, true));
data.push({
    title: "设置图标",
    url: $(dataItem.pic_url, "输入图标地址").input(api => {
        if (input === "") {
            return "toast://你在逗我链接哪?"
        }
        let result = request(api + "&rule_pic=" + input);
        result = JSON.parse(result);
        if (result.status !== 0) {
            return "toast://" + result.detail;
        }
        return "toast://修改成功";
    }, getApi("set_rule_pic") + dataItem.id + reqByGet),
    col_type: my_col_type
});

data.push({
    title: dataItem.can_discuss ? "禁止评论" : "开启评论",
    url: $(api.dis_set + dataItem.id + reqByGet + "&state=" + (dataItem.can_discuss ? "" : 1)).lazyRule((can_discuss) => {
        request(input);
        refreshPage(false);
        return can_discuss ? "toast://已禁止评论" : "toast://已开启评论";
    }, dataItem.can_discuss),
    col_type: my_col_type
});
MY_PARAMS.name = dataItem.name;
MY_PARAMS.username=username;
MY_PARAMS.password=password;
data.push({
    title: "设置备注",
    url: "hiker://page/set_rule_notes",
    extra: MY_PARAMS,
    col_type: my_col_type
});
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
    });
}
data.push({
    col_type: "line_blank"
});
data.push({
    title: dataItem.good_num,
    pic_url: "hiker://files/icon/赞.svg",
    col_type: "icon_small_3",
    url: "hiker://empty"
});
data.push({
    title: dataItem.bad_num,
    pic_url: "hiker://files/icon/踩.svg",
    col_type: "icon_small_3",
    url: "hiker://empty"
});
data.push({
    title: "评论",
    pic_url: "hiker://files/icon/评论.svg",
    col_type: "icon_small_3",
    url: "hiker://page/Reply#noHistory##noRecordHistory#",
    extra: {
        ruleId: dataItem.id,
        name: dataItem.author,
        password: password,
        username: username
    }
});
let totalSum = dataItem.good_num + dataItem.bad_num;

data.push({
    title: htmlTag("big", "评论(" + totalSum + ")") + "\t\t\t" + small(htmlTag("u", "查看全部评论(控评) >")),
    col_type: "text_1",
    url: "hiker://page/Comment",
    extra: {
        url: "hiker://empty#fypage#noHistory##noRecordHistory#",
        id: dataItem.id,
        totalSum: totalSum,
        no_active: true,
        username: username,
        password: password
    }
});
//const longestSum=120;
let icon = {
    "good": "👍",
    "bad": "👎",
    "reply": "开发者🗣"
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
            url: "hiker://page/Reply",
            extra:{
                ruleId: dataItem.id,
                name: item.name,
                password: password,
                username: username,
                replyId:item.id
            },
            pic_url: item.avatar_url
        });
        data.push({
            title: item.discuss_text,
            desc: Reply+item.create_date + "·" + icon[item.discuss_type],
            col_type: "text_1",
            url: "hiker://page/info",
            extra: {
                name: item.name,
                type: "long_text",
                text: item.discuss_text
            },
            pic_url: item.avatar_url
        });
    }
}
data.push({
    col_type: "line_blank"
});
setResult(data);
