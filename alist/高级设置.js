js:
let d = [];
setPageTitle('Alist|高级设置');
addListener('onClose', $.toString(() => {
    refreshPage(false); //刷新
}));
const {color,small} = $.require('hiker://page/utils');
const {iconStyles} = $.require('hiker://page/fileType');
d.push({
    title:'搜索记录自动清除',
    desc:'设置执行以下动作时是否自动清除搜索内容',
    col_type:'text_1',
    url:'hiker://empty'
});
let clear_change = getItem('clear_change','');
let clear_refresh = getItem('clear_refresh','开');
d.push({
    title:clear_change?color('切换目录','#12b668'):'切换目录',
    col_type:'text_2',
    url:$('#noLoading#').lazyRule((clear_change)=>{
        setItem("clear_change", clear_change? "" : "开");
        refreshPage(false);
        return 'hiker://empty'
    },clear_change)
});
d.push({
    title:clear_refresh?color('回首页','#12b668'):'回首页',
    col_type:'text_2',
    url:$('#noLoading#').lazyRule((clear_refresh)=>{
        setItem("clear_refresh", clear_refresh? "" : "开");
        refreshPage(false);
        return 'hiker://empty'
    },clear_refresh)
});
let size = storage0.getItem('search_size',20);
d.push({
    title:'搜索每页数:'+color(''+size,'#d96715'),
    col_type:'text_2',
    url:$(size,'请输入全局搜索的每页显示数量\n实测超过200有卡死的风险').input(()=>{
        if(!Number(input)){
            return 'toast://输入有误'
        }
        storage0.setItem('search_size',Number(input));
        refreshPage(false);
        return 'hiker://empty'
    }),
});
let auth = getItem("authorization", "");
d.push({
    title:'站长auth:'+color(auth.substr(0,3),'#d96715'),
    col_type:'text_2',
    url:$(auth,'你如果是站长可以设置authorization实现免密搜索').input((auth)=>{
        input = input.trim();
        if(auth!==input){
            setItem('authorization',input);
            refreshPage(false);
        }
        return 'hiker://empty'
    },auth),
});

let iconStyle = getItem('iconStyle','默认');
let iconSel = iconStyles.map(it=>it.name === iconStyles?color(it.name,'#12b668'):it.name);
d.push({
    title:'图标风格:    '+color(iconStyle,'#d96715'),
    desc:'可选全局图标主题样式',
    col_type:'text_1',
    url:$(iconSel,2,'请选择一套图标样式').select((iconStyle)=>{
        input = pdfh(input,'body&&Text').replace('““””','');
        if(iconStyle!==input){
            setItem('iconStyle',input);
            refreshPage(false);
        }
        return 'hiker://empty'
    },iconStyle)
});
d.push({
    title:'自定义过滤条件'+small(color('(点击来个例子)','#aaaaaa')),
    desc:'设置一些自定义的筛选内容附加到主页快速筛选栏',
    col_type:'text_1',
    url:$('来个示例?').confirm(()=>{
        putMyVar('filter_name', '视频');
        putMyVar('filter_rule', '\\.m3u8|\\.mp4');
        refreshPage(false);
        return 'toast://例子给你了,自己保存吧!'
    })
});
d.push({
    title: '名称',
    desc: '如: 视频',
    col_type: 'input',
    url: $.toString(() => {
    }),
    extra: {
        defaultValue: getMyVar('filter_name', ''),
        onChange: 'putMyVar("filter_name",input)'
    }
});
d.push({
    title: '内容',
    desc: '如: \\.m3u8|\\.mp4',
    col_type: 'input',
    url: $.toString(() => {

    }),
    extra: {
        defaultValue: getMyVar('filter_rule', ''),
        onChange: 'putMyVar("filter_rule",input)',
        height: 2,
        highlight: true,
        type: "textarea",
    }
});
function saveFilter() {
    let filter_name = getMyVar('filter_name', '').trim();
    let filter_rule = getMyVar('filter_rule', '').trim();
    if (!filter_name) {
        return 'toast://名称必填!'
    }
    if (!filter_rule) {
        return 'toast://过滤规则必填!'
    }
    let filter_rules = JSON.parse(readFile('filter_rules.json', 0) || '[]');
    let idex = filter_rules.findIndex(it => it.name === filter_name);
    if (idex > -1) {
        if (filter_rules[idex].rule !== filter_rule) {
            filter_rules[idex].rule = filter_rule;
            // filter_rules[idex].active = true;
            return $('检测到本地有重复的' + filter_name + ',是否覆盖?').confirm((filter_rules) => {
                saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
                refreshPage(false);
                return 'toast://已保存'
            }, filter_rules)
        } else {
            return 'toast://没有操作'
        }
    } else {
        filter_rules.unshift({
            name: filter_name,
            rule: filter_rule,
            active:true,
        });
        saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
        refreshPage(false);
        return 'toast://已保存'
    }
}

d.push({
    title:'保存规则',
    col_type: 'text_3',
    url:$('#noLoading#').lazyRule((saveFilter)=>{
        return saveFilter();
    },saveFilter)
});
d.push({
    title:'导入规则',
    col_type: 'text_3',
    url:$("{{clipboard}}", "自动识别剪切板内容或手动输入口令").input(()=>{
        input=input.trim();
        let url=input.split('\n')[1];
        if(!/Alist自定义过滤规则/.test(input)||!/^http/.test(url)){
            return 'toast://导入口令有误'
        }
        try {
            let code=parsePaste(url);
            let newRules = JSON.parse(base64Decode(code));
            let filter_rules = JSON.parse(readFile('filter_rules.json', 0) || '[]');
            let filter_cnt = filter_rules.length;
            newRules = newRules.filter(x=>x.name&&x.rule);
            if(!Array.isArray(newRules) || newRules.length < 1){
                return 'toast://导入的东西看起来没对呢!'
            }
            newRules.forEach((it)=>{
                let idex = filter_rules.findIndex(x=>$.rstrip(x.name) === $.rstrip(it.name));
                idex>-1?filter_rules[idex] = it:filter_rules.unshift(it);
            });
            let new_cnt = filter_rules.length - filter_cnt;
            if(new_cnt > 0 ){
                saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
                refreshPage(false);
                return 'toast://已保存'+new_cnt+'条记录'
            }else{
                return 'toast://没有待保存的内容'
            }
        }catch (e) {
            return 'toast://导入失败!\n'+ e.message;
        }
    }),
});
d.push({
    title:'分享规则',
    col_type: 'text_3',
    url:$('#noLoading#').lazyRule(()=>{
        let filter_rules = JSON.parse(readFile('filter_rules.json', 0) || '[]');
        if(filter_rules.length < 1){
            return 'toast://你还没有规则,无法分享!'
        }
        let shareText = base64Encode(JSON.stringify(filter_rules));
        var pastes = getPastes();
        var url = sharePaste(shareText,pastes.slice(-1)[0]);
        let import_rule= "Alist自定义过滤规则："+filter_rules[0].name+'等'+filter_rules.length+'条\n'+url;
        copy(import_rule);
        return 'hiker://empty'
    })
});
let filter_rules = JSON.parse(readFile('filter_rules.json', 0) || '[]');
filter_rules.forEach((it, idex) => {
    d.push({
        title: it.active?color(it.name,'#12b668'):color(it.name,'#aaaaaa'),
        desc: it.rule,
        url: $(['删除', '修改名称','修改规则','快捷输入','启用','禁用'], 2, '请选择1个操作').select((it, filter_rules, idex) => {
            if (input === '删除') {
                let filterOption = getItem('filterOption','全部');
                if(filterOption===it.name){
                    clearItem('filterOption')
                }
                filter_rules.splice(idex, 1);
            }else if (input === '修改名称') {
                return $(it.name,'给此规则改个名字吧').input((filter_rules,idex)=>{
                    input = input.trim();
                    if(input){
                        filter_rules[idex].name = input;
                        saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
                        refreshPage(false);
                        return 'toast://修改成功'
                    }else{
                        return 'toast://修改失败'
                    }
                },filter_rules,idex);
            }else if (input === '修改规则') {
                return $(it.rule,'给此规则改个匹配内容吧').input((filter_rules,idex)=>{
                    input = input.trim();
                    if(input){
                        filter_rules[idex].rule = input;
                        saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
                        refreshPage(false);
                        return 'toast://修改成功'
                    }else{
                        return 'toast://修改失败'
                    }
                },filter_rules,idex);
            } else if (input === '快捷输入') {
                putMyVar("filter_name",it.name);
                putMyVar("filter_rule",it.rule);
                refreshPage(false);
                return 'hiker://empty'
            }else if (input === '启用') {
                filter_rules[idex].active = true;
                saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
                refreshPage(false);
                return 'toast://已启用'
            }else if (input === '禁用') {
                filter_rules[idex].active = false;
                saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
                refreshPage(false);
                return 'toast://已禁用'
            }
            saveFile('filter_rules.json', JSON.stringify(filter_rules), 0);
            refreshPage(false);
            return 'toast://已' + input
        }, it, filter_rules, idex),
        col_type: "text_1",
        extra:{
            idex:idex+''
        }
    })
});
setResult(d);