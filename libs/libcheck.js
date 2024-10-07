function 检测依赖(titles){
    let libs = [{
        title:'道长仓库Pro',
        url:'http://hiker.nokia.press/hikerule/rulelist.json?id=1094',
        version:139
    },{
        title:'DR模板',
        url:'http://hiker.nokia.press/hikerule/rulelist.json?id=4549',
        version:14
    }];
    if(titles && Array.isArray(titles) && titles.length > 0){
        libs = libs.filter(it=>titles.includes(it.title));
    }
    let d=[];
    let ruleHead = '海阔视界首页频道规则【';
    let ruleEnd = '】￥home_rule_url￥';
// log(ruleHead);
    for(let i in libs){
        let it = libs[i];
        let rule = "hiker://home@"+it.title;
        // log(rule);
        let r=fetch(rule);
        let ruleCode = ruleHead+it.title+ruleEnd+it.url;
        // log(ruleCode);
        if(r&&r!=='null'){
            r = JSON.parse(r);
            if(r.version<it.version){
                d.push({
                    title:it.title+'版本不符',
                    desc:it.title+'版本需要'+it.version+',当前:'+r.version+' 点击导入',
                    url:'rule://'+base64Encode(ruleCode),
                    col_type: 'text_1'
                })
            }
        }else{
            d.push({
                title:it.title+ '版本不符',
                desc:it.title+ '未安装,点击导入',
                url:'rule://'+base64Encode(ruleCode),
                col_type: 'text_1'
            })
        }
    }
    if(d.length>0) {
        let tips = d.map(it => it.title.replace('版本不符', '')).join(',')
        setResult(d);
        throw "请在上方先导入" + tips + '等前置规则,方能刷新使用本程序';
    }
}