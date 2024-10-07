js:
    const {
        getApi,
        color,
        small,
        getFile,
        htmlTag,
        api,
        md
    } = $.require("hiker://page/utiliy");

const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");
let classA = getVar("Warehouse.class", "0");
let listUrl = getApi("usersUrl") + classA,
    myUrl = getApi("devSelf");
// myUrl = getApi("rulesAllUrl");
putVar("Warehouse.filter", "");
var noWait=true;//无需重试
var timeout=500;
var tmp_headers={
    timeout:timeout
};
try{
    var userList = JSON.parse(request(listUrl,tmp_headers)).result,
        nowCon = 0,
        ruleCount = JSON.parse(request(getApi("ruleCountUrl"),tmp_headers)).result;
}catch(e){
    noWait=false;
    setResult([{
        title:'仓库同时访问量过大或网络差，繁忙中...\n请耐心等待稍后再试',
        desc:'点击尝试重新访问',
        col_type:'text_1',
        url:$('#noLoading#').lazyRule(()=>{
            refreshPage(false);
            return 'toast://已刷新'
        })
    }]);
}
if(noWait){
    let data = [];
    let classTab = [
        ["上次活跃", "0"],
        ["规则数", "1"],
        ["注册时间", "-1"]
    ]
    for (let item of classTab) {
        data.push({
            title: item[1] === classA ? "““" + item[0] + "””" : item[0],
            url: $("#noLoading#").lazyRule((key) => {
                putVar("Warehouse.class", key);
                refreshPage(false);
                return "hiker://empty";
            }, item[1]),
            col_type: "scroll_button"
        });
    }
    data.push({
        title: "全部规则",
        url: "hiker://page/AllPublicRule?url=hiker://empty#fypage#noHistory##noRecordHistory#",
        col_type: "scroll_button"
    });
    data.push({
        title: "刷新依赖",
        url: $('#noLoading#').lazyRule((jsonUrl)=>{
            jsonUrl = jsonUrl+'2505';
            // log(jsonUrl);
            let text = request(jsonUrl);
            if(!/version/.test(text)){
                return 'toast://服务器正忙,请稍候再试...'
            }
            deleteCache(jsonUrl);
            try {
                require(jsonUrl);
                confirm({title:'刷新成功提示',content:"toast://已刷新,当前版本信息:\n"+JSON.stringify(version)})
                return 'hiker://empty'
            }catch (e) {
                return 'toast://糟糕，本地缓存插件被清除了，但是服务器通讯失败!'
            }
        },getApi("importUrl")),
        col_type: "scroll_button"
    });
    data.push({
        title:"通免:"+color(lsg.getItem("通免","X5"),"#ff7000"),
        col_type:"scroll_button",
        url:$('#noLoading#').lazyRule(()=>{
            const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");
            if(lsg.getItem("通免","X5")=="X5"){
                lsg.setItem("通免","WEB");
            }else{
                lsg.setItem("通免","X5");
            }
            refreshPage(false);
            return "toast://已设置仓库通免模式为:"+lsg.getItem("通免");
        })
    });
    data.push({
        title:color("仓库公告","#ff7000"),
        col_type:"scroll_button",
        url:$('hiker://empty#noHistory##noRecordHistory#').rule((md)=>{
            require(md);
            let d = [];
            let 仓库公告="暂无公告";
            try{
                仓库公告=fetch('https://gitcode.net/qq_32394351/dr/-/raw/master/js/仓库公告.md');
            }catch(e){}
            if(仓库公告) {
                d.push({
                    title: marked.parse(仓库公告),
                    col_type: 'rich_text',
                    url: 'hiker://empty'
                });
            }
            setResult(d);
        },md)
    });

    data.push({
        title:color("升级仓库","#15ab21"),
        col_type:"scroll_button",
        url:$('#noLoading#').lazyRule(()=>{
            const {getApi} = $.require("hiker://page/utiliy");
            let ruleHead = '海阔视界首页频道规则【道长仓库Pro】￥home_rule_url￥';
            let url = getApi('importUrl')+"1094";
            let importUrl = 'rule://'+base64Encode(ruleHead+url);
            return importUrl
        })
    });

    data.push({
        title:color("升级$扩展","#15ab21"),
        col_type:"scroll_button",
        url:$('#noLoading#').lazyRule(()=>{
            const {getApi} = $.require("hiker://page/utiliy");
            let ruleHead = '海阔视界，网页插件￥js_url￥$hiker@';
            let url = getApi('importUrl')+"5111";
            let importUrl = 'rule://'+base64Encode(ruleHead+url);
            return importUrl
        })
    });

    addListener('onClose', $.toString(() => {
        clearVar("Warehouse.class");
    }));
    let {
        username,
        password,
        user
    } = getFile();

    let is_login = false;
    let is_manager = false;
    if (username !== void 0 && password !== void 0) {
        myUrl += '?qq=' + username + '&password=' + password;
        let code_str = request(myUrl,tmp_headers);
        let code = {};
        try{
            code=JSON.parse(code_str);
        }catch(e){}
        if (code.status === 0&& code.result.active) {
            is_login = true;
            if(code.result.is_manager){
                is_manager = true;
                putVar('house.is_manager','真');
                putVar('house.username',username);
                putVar('house.password',password);
            }else{
                putVar('house.is_manager','');
                clearVar('house.username');
                clearVar('house.password');
            }
        }
    }
    if (is_login) {
        try{
            nowCon = JSON.parse(request(getApi("nowConUrl"),tmp_headers)).result;
        }catch(e){
            nowCon='未知';
        }
        let devData = userList.find(item => item.qq === username);
        data.push({
            title: '<strong><span style="color: #ff7000">' + devData.name + '</span></strong>&nbsp;&nbsp;&nbsp;&nbsp;<small><u>规则管理 ></u></small>',
            pic_url: devData.avatar,
            col_type: "avatar",
            url: "hiker://page/devManage#noHistory##noRecordHistory#",
            extra: {
                //username: username,
                //password: password,
                dev: devData
            }
        });
        data.push({
            col_type: 'text_1',
            title: small("现有 " + color(userList.length, "#ff7000") + " 名开发者，" + color(ruleCount[0], "#ff7000") + " 条公开规则，" + color(ruleCount[1], "#ff7000") + " 条集芳阁规则。在线:"+color(nowCon, "#ff7000")),
            url: "toast://喵喵喵?",
        });
    } else {
        data.push({
            title: small(color("开发者登录", "#00BFFF")),
            col_type: 'text_center_1',
            desc: small("现有" + color(userList.length, "#ff7000") + "名开发者，" + color(ruleCount[0], "#ff7000") + "条公开规则，" + color(0, "#ff7000") + "条集芳阁规则。"),
            url: "hiker://page/devLogin"
        });
    }
    if (Array.isArray(user) && user.length === 2) {
        let userlogin = request(api.dis_login, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "params": {
                    "qq": user[0],
                    "auth_code": user[1]
                }
            }),
            method: 'POST',
            timeout:timeout
        });
        userlogin = JSON.parse(userlogin).result;
        if (userlogin.status === 0) {
            userlogin = userlogin.result
            data.push({
                title: userlogin.name + "&nbsp;&nbsp;" + userlogin.qq + "&nbsp;&nbsp;&nbsp;&nbsp;<small><u>更换账号 ></u></small>",
                col_type: 'avatar',
                pic_url: userlogin.avatar_url,
                url: "hiker://page/Userregistration"
            });
            data.splice(3,0,{
                title: userlogin.has_reply?"🆕回复":"🔔回复",
                url: "hiker://page/MyReply?url=hiker://empty#fypage#noHistory##noRecordHistory#",
                col_type: "scroll_button",
                extra:{
                    auth_code:user[1],
                    qq:user[0]
                }
            });
        } else {
            data.push({
                title: userlogin.detail,
                col_type: 'text_center_1',
                desc: "““””<small><u>重新获取验证码 ></u></small>",
                url: "hiker://page/Userregistration"
            });
        }
    } else {
        data.push({
            title: "评论登录/注册",
            col_type: 'text_center_1',
            desc: "",
            url: "hiker://page/Userregistration"
        });
    }
    for (var item of userList) {
        data.push({
            title: item.name + "(" + item.rule_num + ")",
            desc: item.id + ':' + item.nick_name,
            pic_url: item.avatar,
            url: "hiker://page/rules#noHistory#",
            extra: {
                avatarUrl: item.avatar,
                qq: item.qq,
                id:item.id,
                can_upload:item.can_upload
            }
        });
    }

    data.push({
        col_type: 'long_text'
    });
    setResult(data);
    let img = [
        [
            "hiker://files/icon/赞.svg", "https://bafybeiaeetwbc3thoy22y5zd7al6rndeqbrbwhszqb6oitnf7a5zvsz5pe.ipfs.cf-ipfs.com/"
        ],
        [
            "hiker://files/icon/踩.svg", "https://bafybeiehxynphaafe4mukacs7we4d6lrb35kppdiffjv4vwnsq22nfqnl4.ipfs.cf-ipfs.com/"
        ],
        [
            "hiker://files/icon/评论.svg", "https://bafybeifhxi5rdnxq5xly7r4qdbwico2343smelxdqoytalguctgc2ojsdy.ipfs.cf-ipfs.com/"
        ]
    ]
    for (let item of img) {
        if (!fileExist(item[0])) {
            writeFile(item[0], request(item[1]));
        }
    }
}