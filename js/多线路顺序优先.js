let withBatch = !!(MyJiexi.isAuto && MyJiexi.autoMode === '速度优先');
    let withBatchOrder = !!(MyJiexi.isAuto && MyJiexi.autoMode === '顺序优先');
    if (typeof ParseS[str] == 'function') {
        if(/通免/.test(str)){
            return ParseS[str](vipUrl,timeout);
        }
        var url;
        var task = function(obj) {
            eval('var config_dp =' + fetch(getVar('oldConfig')));
            eval(fetch(config_dp.cj));
            return aytmParse(obj.vipUrl,obj.name,obj.timeout);
        };
        if(!withBatchOrder||strTitle) {//不开多线路顺序优先或者指定了解析
            url = ParseS[str](vipUrl,timeout);
        }else{//开了多线路顺序优先执行免嗅多任务
            parses.unshift({name:str}); //把主配置的免嗅探加入到多任务列表
            var count = parses.length; //设置任务数量
            log('魔断开启多任务解析,任务数量:'+count);
            log('解析列表:'+JSON.stringify(parses));
            var parseRet = []; //解析结果列表
            let tasks = parses.map((it,idex)=>{
                return {
                    func: task,
                    param: {
                        name:it.name,
                        // rule:it.rule,
                        vipUrl: vipUrl,
                        timeout: timeout
                    },
                    id: "task"+idex
                }
            });
            showLoading("魔断并发解析中，剩余解析:"+count);
            be(tasks,{
                func: function(obj, id, error,ret) {
                    log("监听到任务" + id+'已结束,error:'+error+',ret:'+ret);
                    parseRet.push({
                        task:id,
                        ret:ret,
                        name:tasks.filter(it=>it.id===id)[0].param.name
                    });
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
            log('多任务顺序执行结果:'+JSON.stringify(parseRet));
            let valuable = parseRet.filter(it=>/m3u8|mp4/.test(it.ret));
            if(valuable.length>1){//多线路
                let urls=valuable.map(it=>it.ret);
                let names=valuable.map(it=>it.name);
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

            }else if(valuable.length===0){
                // return 'toast://魔断多任务免嗅解析全军覆没'
                showLoading("魔断多任务免嗅失败,尝试json|x5");
                if(typeof(extra.playUrlList)==='object'&&extra.playUrlList.length>0){
                    extra.playUrlList = extra.playUrlList.filter(it=>it!==(ParseS[str]||str) + vipUrl);
                    let nameList = extra.nameList;
                    function unique2(array){
                        return Array.from(new Set(array));
                    }
                    extra.nameList=unique2(nameList);
                    extra.playUrlList = unique2(extra.playUrlList);
                }
                //排除第一个
                let extra2 = {
                    nameList:extra.nameList,
                    playUrlList:extra.playUrlList.slice(1),
                }
                // log(extra.playUrlList[0]);
                // log(extra2);
                return ParseS.defaultParseWeb?ParseS.defaultParseWeb(extra.playUrlList[0],timeout,extra2):extra.playUrlList[0];

            }else{
                return valuable[0].ret
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
        if (/=http/.test(url)) {
            url = /&url=/.test(url) ? url : 'http' + decodeURIComponent(url.split('=http')[1]);
        }
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
    }