js:
    addListener('onClose', $.toString(()=>{
        clearVar("house.upload_code");
    }));
const {color,small,api, getFile} = $.require("hiker://page/utiliy");
let houseFile = getFile||false;
let put_url = api.host+'/hikerule/dev/put';
if(!houseFile){
    setItem('is_house_vip', 'false');
}
let house_data = houseFile();
// log(house_data.username+'-'+house_data.password);
var canup = house_data.username.length >= 6 && house_data.password.length > 2;
log('可以上传?'+canup);
let d = [];
let file_type = [{name:'静态文件',value:'html'},{name:'网页插件',value:'js_url'},{name:'主页配置',value:'config'}]; //上传类型
let file_redirect = [{name:'本地',value:'false'},{name:'直链302',value:'true'}]; //是否重定向
let file_ua = [{name:'电脑',value:'pc'},{name:'手机',value:'mobile'}];
let file_type_title = file_type.map((item) => {
    let name = getItem('house.file_type','静态文件');
    if(item.name===name){
        return '👉'+item.name;
    }else{
        return item.name;
    }
});
let file_redirect_title = file_redirect.map((item) => {
    let name = getItem('house.file_redirect','本地');
    if(item.name===name){
        return '👉'+item.name;
    }else{
        return item.name;
    }
});
let file_ua_title = file_ua.map((item) => {
    let name = getItem('house.file_ua','电脑');
    if(item.name===name){
        return '👉'+item.name;
    }else{
        return item.name;
    }
});
d.push({col_type: 'x5_webview_single', extra: {js: 'console.log("我加载了")'}});
d.push({
    title: '获取',
    desc: "文件路径,支持hiker,file,http,主题",
    extra: {
        onChange: "putVar('house.web_url',input)",
        titleVisible: true,
        id:'filePath',
        defaultValue:getVar('house.web_url')
    },
    url:$.toString(() => {
        let input = getVar('house.web_url','');
        if(input.length<2){
            return 'toast://链接不可以为空'
        } else if(/^hiker:|^file:|^http:|^https:|^\/storage\/|^\/sdcard\//.test(input)){
            if(/^\/storage\/|^\/sdcard\//.test(input)){
                input = 'file://'+input;
            }
            log('正常链接:'+input);
            let ua = getItem('house.file_ua')==='电脑'?'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36':'Mozilla/5.0 (Linux; Android 9; MI 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36';
            let web_url_arr = input.split(';');
            let web_url = web_url_arr[0];
            let headers = {
                'Referer':'https://blog.csdn.net',
                'User-Agent':ua,
                'Accept':'application/json, text/javascript, */*; q=0.01',
                'Accept-Language':'zh-CN',
            };
            if(web_url_arr.length>=3&&web_url_arr[2].length>2){ //设置编码
                headers['content-type'] = 'charset='+web_url_arr[2].toUpperCase();
            }
            let params = {headers:headers,withHeaders:false,redirect:false};
            if(web_url_arr.length>=2&&web_url_arr[1].length>2){ // 设置请求方法
                params['method'] = web_url_arr[1].toUpperCase();
            }
            log('开始获取源码');
            try {
                /*
                requestAsync(web_url,params,function (key,code) {
                    let back_code = code;
                    if(back_code.length>20){
                        putVar('house.upload_code',back_code);
                        refreshPage(true);
                        return 'toast://源码已获取,并部分插入到文本区域'
                    }else{
                        return 'toast://错误，本次获取到空文本，疑似你没有此文件!';
                    }
                });
                */
                let back_code = getItem('house.file_ua')==='电脑'?fetch(web_url,params):request(web_url,params);
                if(back_code.length>20){
                    putVar('house.upload_code',back_code);
                    refreshPage(true);
                    return 'toast://源码已获取,并部分插入到文本区域'
                }else{
                    return 'toast://错误，本次获取到空文本，疑似你没有此文件!';
                }
            }catch (e) {
                log(e.message);
                return 'toast://发生了错误:\n'+e.message;
            }
        }else if(/主题￥|元素￥/.test(input)){
            log('主题链接');
            let web_url_arr = input.split('￥');
            let web_url = web_url_arr[web_url_arr.length-1];
            let back_code = parsePaste(web_url);
            if(back_code.length>20) {
                putVar('house.upload_code',back_code);
                refreshPage(true);
                return 'toast://源码已获取,并部分插入到文本区域'
            }else{
                return 'toast://错误，本次获取返回为:\n'+back_code;
            }
        }else{
            return 'toast://非法链接:\n'+getVar('house.web_url');
        }
    }),
    col_type: "input"
});
d.push({
    title: "选择文件路径",
    url:$('#noLoading#').lazyRule(()=>{
        let fp = 'https://dr.playdreamer.cn/js/fileSelect.js';
        let f = require(fp);
        return f.fileSelectionUri({
            callback: $.toString(() => {
                let target = findItem("filePath").extra;
                updateItem("filePath", {
                    extra: Object.assign(target, {
                        defaultValue: PATH
                    })
                });
                putVar('house.web_url',PATH);
                return true;
            }),
            onClickType:'confirm',
            fileType: ".js|.txt|.hiker|.json|.html",
            pattern: 0,
            requireUrl:fp,
            initialPath:getPath('hiker://files/rules/dzHouse/').slice(7),
            memory:true,
        });
    }),
    col_type: "text_center_1",
});
d.push({
    title:'上传类型',
    desc:'上传文件的类型,当前为:'+color(getItem('house.file_type','静态文件'),'#ff7000'),
    col_type:'text_1',
    url:$(file_type_title,2).select(() => {
        setItem('house.file_type',input.replace('👉',''));
        refreshPage(true);
        return 'toast://你选择了:'+input;
    })
});

d.push({
    title:'文件定位',
    desc:'文件是否属于重定向,当前为:'+color(getItem('house.file_redirect','本地'),'#ff7000'),
    col_type:'text_1',
    url:$(file_redirect_title,2).select(() => {
        setItem('house.file_redirect',input.replace('👉',''));
        refreshPage(true);
        return 'toast://你选择了:'+input;
    })
});

d.push({
    title:'设备UA',
    desc:'发起网页请求头标识,当前为:'+color(getItem('house.file_ua','电脑'),'#ff7000'),
    col_type:'text_1',
    url:$(file_ua_title,2).select(() => {
        setItem('house.file_ua',input.replace('👉',''));
        refreshPage(true);
        return 'toast://你选择了:'+input;
    })
});
function compare(name) {
    return function(item) {
        return item.name === name;
    }
}
d.push({
    title:'🗄️环境',
    col_type:'flex_button',
    url:$().lazyRule((file_type,compare)=>{
        log('查看环境变量');
        try {
            let up_code = getVar('house.upload_code','');
            let ftype =  file_type.filter(compare(getItem('house.file_type','静态文件')))[0].value;
            let redirect = getItem('house.file_redirect','本地')!=='本地';
            let code = !redirect?up_code:input;
            let env = {
                web_url:getVar('house.web_url',''),
                device:getItem('house.file_ua','电脑'),
                ftype:ftype||"",
                redirect:redirect,
                code:code.substring(0,40)||"",
            }
            log(env);
            return 'toast://'+JSON.stringify(env);
            // alert(JSON.stringify(env));
        }catch (e) {
            return 'toast://'+e.message;
            // alert(e.message);
        }
    },file_type,compare)
});

d.push({
    title:'📃教程',
    col_type:'flex_button',
    url:$().x5Rule(()=>{
        let msg = '欢迎使用开发者更多分享工具\n1.输入网址为本地文件路径,hiker://或者file://开头\n2.点击网址输入栏后面的按钮\n3.看文本预览区是否正确\n4.点击上传按钮提交到仓库';
        alert(msg);
    })
});

d.push({
    title:'🗑️清空',
    col_type:'flex_button',
    url:$().lazyRule(()=>{
        clearVar('house.upload_code');
        refreshPage(true);
        return 'toast://已清除预览区域内容'
    })
});

d.push({
    title:'📲示例',
    col_type:'flex_button',
    url:$().lazyRule(()=>{
        let demo_code = getItem('house.demo','0');
        if(demo_code=='0'){
            putVar('house.web_url','hiker://files/rules/dzHouse/html/资源网书签.html');
            demo_code = parseInt(demo_code)+1;
            setItem('house.demo',demo_code+'');
        }else{
            putVar('house.web_url','file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/dzHouse/html/资源网书签.html');
            setItem('house.demo','0');
        }
        refreshPage(true);
        return 'toast://已设置示例地址'
    })
});

d.push({
    title:'📤上传',
    col_type:'flex_button',
    url:$().lazyRule((canup,house_data,put_url,file_type) =>{
        function compare(name) {
            return function(item) {
                return item.name === name;
            }
        }
        const {getNowFormatDate}=$.require("hiker://page/utiliy");
        let up_code = getVar('house.upload_code','');
        if(up_code.length < 2){
            return 'toast://源码区无内容，请先访问一个静态页面'
        }
        if(!canup){
            return 'toast://你不是开发者，没有提交到仓库的权利!'
        }
        let input = getVar('house.web_url','');
        let web_url = input.split(';')[0];
        let fileName = '';
        if(/^hiker:|^file:|^http:|^https:|^\/storage\/|^\/sdcard\//.test(web_url)){
            fileName = web_url.split('/')[web_url.split('/').length-1];
        }else if(/主题￥|元素￥/.test(input)){
            let bkarr = up_code.split('￥');
            if(bkarr.length<3){
                return 'toast://云剪贴板内容有误'
            }
            switch (bkarr[1]) {
                case 'my_home_theme':
                    fileName = up_code.split('「')[1].split('」')[0];
                    break;
                case 'my_home_single':
                    fileName = up_code.split('「')[1].split('」')[0];
                    break;
                case 'js_url':
                    fileName = up_code.split('￥')[2].split('@')[0];
                    break;
            }
        }else{
            return 'toast://错误，网页链接无内容!';
        }
        let ua = getItem('house.file_ua')==='电脑'?'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36':'Mozilla/5.0 (Linux; Android 9; MI 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36';
        let headers = {
            'Referer':'https://blog.csdn.net',
            "content-type": "application/json",
            'User-Agent':ua,
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Language':'zh-CN',
        };
        let toCompare = '';
        if(fileName.endsWith('.html')){
            toCompare = '静态文件';
        }else if(/主题/.test(fileName)){
            toCompare = '主页配置'
        }
        let ftype =  file_type.filter(compare(toCompare||getItem('house.file_type','静态文件')))[0].value;
        let redirect = getItem('house.file_redirect','本地')!=='本地';
        if(redirect&&!web_url.startsWith('http')){
            return 'toast://直链302重定向网址链接必须http开头';
        }
        let code = !redirect?up_code:web_url;
        let data = {"params":
                {"data": {rule_name: fileName, "rule_type": '更多分享', "version":getNowFormatDate(),"rule_value": code,
                        data_type:ftype, is_redirect:redirect,deviceUa:getItem('house.file_ua'),
                    },
                    "name": house_data.username,
                    "password": house_data.password}
        };
        let upparams = {headers:headers,body:JSON.stringify(data),withHeaders:false,redirect:false,method:'POST'};
        let backmsg = getItem('house.file_ua')==='电脑'?fetch(put_url,upparams):request(put_url,upparams);
        try{
            let result = JSON.parse(backmsg).result;
            let detail = result.detail;
            return 'toast://'+detail;
        }catch (e) {
            log(e.message);
            return 'toast://发生了错误\n'+e.message;
        }
    },canup,house_data,put_url,file_type)
});

d.push({
    title:'长文本预览区域',
    col_type:'text_1',
    url:'hiker://empty',
    extra: {textSize: 11,lineVisible:false}
});

d.push({
    title:getVar('house.upload_code','').substring(0,10240),
    col_type:'long_text',
    extra: {textSize: 11}
});
setPageTitle("更多分享");
setResult(d);
