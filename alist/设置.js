js:
let d = [];
setPageTitle('Alist|设置');
const {color,small} = $.require('hiker://page/utils');
let timeout=$.getTimeOut();
addListener('onClose', $.toString(() => {
    refreshPage(false); //刷新
}));
let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
d.push({
    title: '基础设置 ①初始化',
    desc: `默认添加一些远程的alist地址方便订阅\n当前共计${color(sub_urls.length,'#d96715')}条Alist订阅链接`,
    col_type: 'text_1',
    url: $('确认初始化自带的远程地址吗?将丢失自定义的内容').confirm(() => {
        saveFile("sub_urls.json", JSON.stringify($.sub_urls), 0);
        refreshPage(false);
        return 'toast://已初始化'
    }),
});

let newVersion;
let myVersion = MY_PARAMS.version||999;
try {
    newVersion = JSON.parse(fetch("http://hiker.nokia.press/hikerule/dev/getbyid?id=5153",{timeout:timeout})).result.ver
} catch (e) {
    toast("道长仓库抽风了，本次未检测到新版信息");
    newVersion = myVersion;
}
let isUpdate = Number(newVersion) <= Number(myVersion);
let isVer = Number(newVersion) === Number(myVersion);
if(!isUpdate||!isVer){
    log('有新版本:'+newVersion+',当前:'+myVersion);
}
d.push({
    title: isUpdate ? "已是最新版" : "🆙新版本",
    url: "rule://5rW36ZiU6KeG55WM6aaW6aG16aKR6YGT6KeE5YiZ44CQQWxpc3TjgJHvv6Vob21lX3J1bGVfdXJs77+laHR0cDovL2hpa2VyLm5va2lhLnByZXNzL2hpa2VydWxlL3J1bGVsaXN0Lmpzb24/aWQ9NTE1Mw==",
    col_type: "text_2"
});

d.push({
    title: "超时毫秒:" + timeout,
    url: $(timeout,'请输入全局接口超时毫秒时间').input(() => {
        if(!Number(input)){
            return 'toast://超时毫秒数必须是整数！'
        }
        setItem("timeout",Number(input)+'');
        refreshPage(false);
        return "hiker://empty"
    }),
    col_type: "text_2"
});
let clickOption = getItem('clickOption','打开');
let showDetail = getItem('showDetail','开');
let showZimu = getItem('showZimu','开');
let save_mode = getItem("save_mode", "单个");
let clickSel = ['打开','下载','菜单'].map(it=>it===clickOption?color(it,'#12b668'):it);
d.push({
    title:'点击操作:'+color(clickOption,'#d96715'),
    col_type:'text_2',
    url:$(clickSel,2,'请选择点击文件执行操作').select((clickOption)=>{
        input = pdfh(input,'body&&Text').replace('““””','');
        if(clickOption!==input){
            setItem('clickOption',input);
            refreshPage(false);
        }
        return 'hiker://empty'
    },clickOption),
});
d.push({
    title: "显示文件详情:" + color(showDetail,'#d96715'),
    url: $('#noLoading#').lazyRule((showDetail) => {
        setItem("showDetail", showDetail === "开" ? "关" : "开");
        refreshPage(false);
        return "toast://切换成功"
    },showDetail),
    col_type: "text_2"
});
d.push({
    title: "外挂字幕开关:" + color(showZimu,'#d96715'),
    url: $('#noLoading#').lazyRule((showZimu) => {
        setItem("showZimu", showZimu === "开" ? "关" : "开");
        refreshPage(false);
        return "toast://切换成功"
    },showZimu),
    col_type: "text_2"
});
d.push({
    title: color('更多高级设置','#d96715'),
    url: 'hiker://page/superSettings#noHistory##noRecordHistory#',
    col_type: "text_2"
});

if(save_mode!=='批量') {
    d.push({
        title: '名称',
        desc: '备注...',
        col_type: 'input',
        url: $.toString(() => {
        }),
        extra: {
            defaultValue: getMyVar('alist_name', ''),
            onChange: 'putMyVar("alist_name",input)'
        }
    });
}
d.push({
    title: '链接',
    desc: 'alist服务的首页链接',
    col_type: 'input',
    url: $.toString(() => {

    }),
    extra: {
        defaultValue: getMyVar('alist_url', ''),
        onChange: 'putMyVar("alist_url",input)',
        height: 2,
        highlight: save_mode==='批量',
        type: "textarea",
    }
});

function saveSub(code) {
    let a_name = getMyVar('alist_name', '').trim();
    let a_url = code||getMyVar('alist_url', '').trim();
    let save_mode = code?'批量':getItem("save_mode", "单个");
    if(save_mode === '单个') {
        if (!a_name) {
            return 'toast://名称必填!'
        }
        if (!a_url || !/^http/.test(a_url)) {
            return 'toast://链接不合法!'
        }
        let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
        let idex = sub_urls.findIndex(it => $.rstrip(it.url,'/') === $.rstrip(a_name,'/'));
        if (idex > -1) {
            if (sub_urls[idex].url !== a_url||sub_urls[idex].name !== a_name) {
                sub_urls[idex].url = a_url;
                sub_urls[idex].name = a_name;
                return $('检测到本地有重复的' + a_name + ',是否覆盖?').confirm((sub_urls) => {
                    saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
                    refreshPage(false);
                    return 'toast://已保存'
                }, sub_urls)
            } else {
                return 'toast://没有操作'
            }
        } else {
            sub_urls.unshift({
                name: a_name,
                url: a_url,
            });
            saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
            refreshPage(false);
            return 'toast://已保存'
        }
    }else if(save_mode === '批量'){
        let add_data = [];
        try {
            add_data = eval(a_url);
            JSON.stringify(add_data);
        }catch (e) {
            return 'toast://批量添加格式有误,请参考预处理的json格式。名称重复会直接覆盖保存'
        }
        let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
        let sub_cnt = sub_urls.length;
        let new_add_data = []; // 自动去重
        add_data = add_data.filter(x=>x.name&&x.url);
        if(!Array.isArray(add_data) || add_data.length < 1){
            return 'toast://导入的东西看起来没对呢!'
        }
        add_data.forEach((it)=>{
            let idex = new_add_data.findIndex(x=>$.rstrip(x.url) === $.rstrip(it.url));
            idex>-1?new_add_data[idex] = it:new_add_data.unshift(it);
        });
        // log('准备新增列表:');
        // log(new_add_data);
        new_add_data.forEach((it)=>{
            let idex = sub_urls.findIndex(x=>$.rstrip(x.url) === $.rstrip(it.url));
            idex>-1?sub_urls[idex] = Object.assign(sub_urls[idex],it):sub_urls.unshift(it);
        });
        let new_cnt = sub_urls.length - sub_cnt;
        if(new_cnt > 0 ){
            saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
            refreshPage(false);
            return 'toast://已保存'+new_cnt+'条记录'
        }else{
            return 'toast://没有待保存的内容'
        }
    }
}
let opCol = 'scroll_button';
d.push({
    title: save_mode,
    col_type: opCol,
    url: $('#noLoading#').lazyRule((save_mode) => {
        let next_mode = save_mode === '单个'?'批量':'单个';
        setItem('save_mode',next_mode);
        refreshPage(false);
        return 'toast://已切换编辑保存模式为:'+next_mode
    },save_mode)
});
d.push({
    title: '保存',
    col_type: opCol,
    url: $('#noLoading#').lazyRule((saveSub) => {
        return saveSub();
    }, saveSub)
});
d.push({
    title: '保存并新增',
    col_type: opCol,
    url: $('#noLoading#').lazyRule((saveSub) => {
        let tips = saveSub();
        clearMyVar("alist_name");
        clearMyVar("alist_url");
        refreshPage(false);
        return tips
    }, saveSub)
});
d.push({
    title: '导入',
    col_type: opCol,
    url: $("{{clipboard}}", "自动识别剪切板内容或手动输入口令").input((saveSub)=>{
        input=input.trim();
        let code=input.split('\n')[1];
        if(!/Alist订阅编码分享/.test(input)){
            return 'toast://导入口令有误'
        }
        try {
            code = base64Decode(code);
            log(code);
        }catch (e) {
            return 'toast://发生错误:\n'+e.message;
        }
        return saveSub(code);
    },saveSub)
});
d.push({
    title: '全编码分享',
    col_type: opCol,
    url: $('#noLoading#').lazyRule(() => {
        let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
        confirm({title:'温馨提示',
            content:'将一键分享本地的所有订阅,是否将密码一起分享？',
            confirm:$.toString((sub_urls)=>{
                let code = 'Alist订阅编码分享 '+sub_urls[0].name+'等'+sub_urls.length+'条'+':\n'+base64Encode(JSON.stringify(sub_urls));
                return 'copy://'+code
            },sub_urls),
            cancel:$.toString((sub_urls)=>{
                sub_urls = sub_urls.map((it)=>{return {name:it.name,url:it.url}});
                let code = 'Alist订阅编码分享 '+sub_urls[0].name+'等'+sub_urls.length+'条'+':\n'+base64Encode(JSON.stringify(sub_urls));
                return 'copy://'+code
            },sub_urls)});
        return 'hiker://empty'
    }),
});
d.push({
    title: '全文件分享',
    col_type: opCol,
    url: $('#noLoading#').lazyRule(() => {
        let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
        let sharePath = 'hiker://files/cache/alist订阅.txt';
        confirm({title:'温馨提示',
            content:'将一键分享本地的所有订阅,是否将密码一起分享？',
            confirm:$.toString((sub_urls,sharePath)=>{
                writeFile(sharePath,JSON.stringify(sub_urls));
                return 'share://'+sharePath
            },sub_urls,sharePath),
            cancel:$.toString((sub_urls,sharePath)=>{
                sub_urls = sub_urls.map((it)=>{return {name:it.name,url:it.url}});
                // log(sub_urls);
                writeFile(sharePath,JSON.stringify(sub_urls));
                return 'share://'+sharePath
            },sub_urls,sharePath)});
        return 'hiker://empty'
    }),
});
let subPath = `hiker://files/rules/files/${MY_RULE.title}/sub_urls.json`;
let cachePath = 'hiker://files/cache/sub_urls.json';
d.push({
    title: '编辑JSON',
    col_type: opCol,
    url: $(['接着上次编辑','重新加载编辑'],1,'请选择如何编辑').select((subPath,cachePath) => {
        function sub_edit(subPath,cachePath,reload){
            reload = reload||false;
            if(!fileExist(cachePath)||reload){
                writeFile(cachePath,readFile('sub_urls.json', 0) || '[]');
            }
            let status = fetch('hiker://home@JSON编辑器');
            let hasJsonEditor = (status && status !== 'null');
            if(!hasJsonEditor){
                return 'editFile://'+cachePath;
            }else{
                return 'hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json='+base64Encode(cachePath);
            }
        }
        if(input==='接着上次编辑'){
            return sub_edit(subPath,cachePath);
        }else if(input==='重新加载编辑'){
            return sub_edit(subPath,cachePath,true);
        }else{
            return 'hiker://empty'
        }
    },subPath,cachePath)
});
d.push({
    title:'保存本地',
    col_type:opCol,
    url:$('将JSON编辑的缓存结果保存为本地订阅?').confirm((cachePath)=>{
        let code = JSON.parse(fetch(cachePath));
        code = code.filter(x=>x.name && x.url);
        saveFile('sub_urls.json', JSON.stringify(code), 0);
        refreshPage(false);
        return 'toast://保存完毕'
    },cachePath)
});

sub_urls.forEach((it, idex) => {
    d.push({
        title: it.name,
        desc: it.url,
        url: $(['置顶','删除', '修改名称','修改地址','快捷输入','密码管理','分享(含密码)','分享(无密码)'], 2, '请选择1个操作').select((it, sub_urls, idex) => {
            if (input === '置顶') {
                sub_urls.splice(idex, 1);
                sub_urls.unshift(it);
                if (getMyVar("baseurl", "") !== it.url) {
                    putMyVar("baseurl", it.url);
                    clearMyVar("path");
                }
            }
            else if (input === '删除') {
                sub_urls.splice(idex, 1);
                if (getMyVar("baseurl", "") === it.url) {
                    putMyVar("baseurl", sub_urls[0].url);
                    clearMyVar("path");
                }
            }else if (input === '修改名称') {
                return $(it.name,'给此订阅改个名字吧').input((sub_urls,idex)=>{
                    input = input.trim();
                    if(input){
                        sub_urls[idex].name = input;
                        saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
                        refreshPage(false);
                        return 'toast://修改成功'
                    }else{
                        return 'toast://修改失败'
                    }
                },sub_urls,idex);
            }else if (input === '修改地址') {
                return $(it.url,'给此订阅改个地址吧').input((sub_urls,idex)=>{
                    input = input.trim();
                    if(input&&/^http/.test(input)){
                        sub_urls[idex].url = input;
                        saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
                        refreshPage(false);
                        return 'toast://修改成功'
                    }else{
                        return 'toast://修改失败'
                    }
                },sub_urls,idex);
            } else if (input === '快捷输入') {
                putMyVar("alist_name",it.name);
                putMyVar("alist_url",it.url);
                refreshPage(false);
                return 'hiker://empty'
            }else if (input === '密码管理') {
                return 'hiker://page/passwordManage?idex='+idex
            }else if (/分享/.test(input)) {
                if(input.includes('无密码')){
                    delete it.password;
                }
                let code = 'Alist订阅编码分享 '+it.name+':\n'+base64Encode(JSON.stringify([it]));
                return 'copy://'+code
            }
            saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
            refreshPage(false);
            return 'toast://已' + input
        }, it, sub_urls, idex),
        col_type: "text_1",
        extra:{
            idex:idex+''
        }
    })
});
setResult(d);