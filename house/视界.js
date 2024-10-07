   function getHikerItems(home){
        var refreshX5 = $().lazyRule(() =>{
            let local_html = "hiker://files/rules/dzHouse/html/主页时钟天气.html";
            // const {getApi, api} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
            // let online_html = getApi('importUrl')+"467";
            let online_html = 'http://dr.nokia.press/html/主页时钟天气.html';
            try {
                let back = request(online_html, {
                    timeout: 2000
                });
                if (back && back.length > 500&&/主页时钟天气/.test(back)) {
                    writeFile(local_html, back);
                    refreshPage(true);
                    return 'toast://刷新成功'
                } else {
                    return 'toast://获取到的数据不完整,本次更新取消'
                }
            } catch(e) {
                log(e.message);
                return 'toast://刷新失败，疑似网络不佳导致访问超时'
            }
        });
        var arr_a=[
            {"标题":"⚙主页设置⚙","名称":"hiker://empty#noHistory##noRecordHistory#@rule=js:eval(fetch('hiker://assets/home.js',{}));HikerHome.load('setuppage')"},
            {"标题":"更多设置","名称":"hiker://settingMore"},
            {"标题":"WEB编辑","名称":"hiker://webRule"},
            {"标题":"接口管理","名称":"@js:let base_api_set_js = 'hiker://files/rules/dzHouse/js/主页接口设置.js';if(!fetch(base_api_set_js)){    writeFile(base_api_set_js,fetch('http://hiker.nokia.press/hikerule/rulelist.json?id=1756'));}eval(fetch(base_api_set_js).replace(base64Decode('QGpzOg=='),''))"},
 {"标题":"DR模板","名称":"hiker://home@DR模板"},
 {"标题":"CMS模板","名称":"hiker://home@CMS模板"},
            {"标题":"🔄刷新海报","名称":refreshX5},
            {"标题":"视界设置","名称":"hiker://setting"},
            {"标题":"书签","名称":"hiker://bookmark"},
            {"标题":"下载","名称":"hiker://download"},
            {"标题":"收藏","名称":"hiker://collection"},
            {"标题":"历史","名称":"hiker://history"},
            {"标题":"插件","名称":"hiker://js"},
            {"标题":"云备份","名称":"hiker://webdav"},
            {"标题":"路过图床","名称":"https://imgtu.com/"},
            {"标题":"遇见图床","名称":"https://www.hualigs.cn/simple"},
            {"标题":"复制密码","名称":$('#noLoading#').lazyRule(()=>{evalPrivateJS('zSWve+eeA6iL+f2fGTI+1q/UDtPcs7FYj2zolrQ08HHrDJCJG86PqcEvlowy2y4oJwlVUOGKTvxUQXa1G9IzhY6g0rc8E8bqMw0ePRKZ8u8FCmJPoRCqODM1Q1jlRBlxIHCS0p05zvTSHe4Nt1LsbA==');return 'copy://'+pwd})},
 {"标题":"阅读","名称":"http://reader.nokia.press/#/"},
//{标题:'新番',名称:'hiker://home@新番'}
        ];
        const hikercfg='hiker://files/rules/dzHouse/ruleCache/hiker.json';
        if(!fileExist(hikercfg)){
            writeFile(hikercfg,JSON.stringify(arr_a));
        }
        var hikerItems;
        try{
            let code=fetch(hikercfg);
            code=JSON.parse(code);
            if(Array.isArray(code)){
                hikerItems=code;
            }else{
                hikerItems=arr_a
            }
        }catch(e){
            hikerItems=arr_a
        }
        getNewest=typeof(getNewest)=='undefined'||!getNewest?function(a){return 'toast://'+a}:getNewest;
        域名=typeof(域名)=='undefined'||!域名?'缺预处理，此功能不可用':域名;
        hikerItems.push({
            "标题":"海阔更新",
            "名称":$(域名 + "u/GoldRiver").lazyRule((getNewest) => {
                return getNewest(input)
            },getNewest)
        });
hikerItems.push({
            "标题":"海阔内测",
            "名称":$("https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&shareKey=fajA-n6LQh&SharePwd=&ParentFileId=1678340&Page=1").lazyRule((hikerNew) => {
                return hikerNew(input)
            },hikerNew)
        });
        hikerItems.push({
            "标题":"口令转json",
            "名称":$('{{clipboard}}','请输入群友分享的海阔单个小程序导入口令').input(()=>{
                input=input.trim();
                if(!/^http/.test(input)){
                    return 'toast://导入口令有误'
                }
                let url=input.split('\n')[0];
                let code=parsePaste(url);
                if(code.includes('base64://')){
                    let rule=code.split('@').slice(-1)[0];
                    rule=base64Decode(rule);
                    copy(rule);
                    return 'hiker://empty'
                }
                //log(code);
                return 'toast://'+input
            })
        });
        hikerItems.unshift({
            '标题':'重置视界',
            '名称':$('将视界按钮快捷选项恢复出厂设置?').confirm((hikercfg,arr_a)=>{
                writeFile(hikercfg,JSON.stringify(arr_a));
                refreshPage(false);
                return 'toast://已恢复';
            },hikercfg,arr_a),
        });
        let status = fetch('hiker://home@JSON编辑器');
        let hasJsonEditor = (status && status !== 'null');
        let cachePath = hikercfg;
        let editUrl;
        if(!hasJsonEditor){
            editUrl='editFile://'+cachePath;
        }else{
            editUrl=
                'hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json='+base64Encode(cachePath);
        }
        hikerItems.unshift({
            '标题':'✍编辑视界',
            '名称':editUrl,
        });
        const hikerTitles=hikerItems.map(r=>r.标题);
        return {title:'视界',
            col_type:'icon_round_small_4',
            pic_url:'https://s1.ax1x.com/2022/07/28/v9A55D.png',
            url:$(hikerTitles, 2,"视界").select((hikerItems)=>{
                let idex=hikerItems.findIndex(r=>r.标题==input);
                let code=hikerItems[idex].名称;
//log(code);
                if(!/^@js:/.test(code.trim())){
                    return code
                }else{
                    try{
                        return eval(code.split('@js:')[1]);
                    }catch(e){
                        return 'toast://'+e.message
                    }
                }
            },hikerItems)
        }
    }
[getHikerItems()];