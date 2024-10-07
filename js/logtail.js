js:
var d = [];
let ip = getIP();
let logtail_file = 'hiker://files/rules/dzHouse/html/日志网页.html';
if(!fileExist(logtail_file)){
    let logtail_html = JSON.parse(fetch('hiker://page/logtail.html')).rule;
    writeFile(logtail_file, logtail_html);
}
d.push({
    title:'当前ip:'+ip,
    img:MY_RULE.icon,
    col_type:'avatar',
    url:$('#noLoading#').lazyRule((logtail_file)=>{
        let logtail_html = JSON.parse(fetch('hiker://page/logtail.html')).rule;
        writeFile(logtail_file, logtail_html);
        return 'toast://道长开发，用于海阔查看tvbox的实时日志,已拉取日志html文件'
    },logtail_file)
});
const {color, small,api} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
function 推送组件(d,obj){ // {}
    obj = obj || {line:'both'}; // top,bottom,none
    let tv_col = obj.col_type||'icon_small_3';
    if(obj.line&&/both|top/.test(obj.line)){
        d.push({
            col_type:'line'
        });
    }
    d.push({
        title: '扫描',
        img: 'https://hikerfans.com/tubiao/messy/25.svg',
        url: $(['极速', '全部','手动输入'], 2, '局域网TVBOX扫描模式').select(() => {
            let sniffer_file = 'hiker://files/rules/dzHouse/tvbox/辅助嗅探.json';
            if(/极速|全部/.test(input)){ //https://gitcode.net/qq_32394351/dr_py/-/raw/master/txt/json/sniffer.json
                let single_back = /极速/.test(input);
                let ip = getIP();
                if(ip.startsWith('0')){
                    return 'toast://当前设备未接入局域网,请连接wifi后再试!'
                }
                showLoading(`${input}扫描附近TVB,请稍等...`);
                // log(ip);
                let ip_base = ip.split('.').slice(0, -1).join('.');
                let url_list = [];
                for (let i = 1; i < 256; i++) {
                    url_list.push(`http://${ip_base}.${i}:9978/`);
                }
                // 倒着扫描更快
                url_list.reverse();
                // log(url_list);
                let htmlUrl = [];
                let task = function (obj) {
                    return request(obj.url, obj.options);
                };
                url_list.forEach(it => {
                    htmlUrl.push({
                        url: it,
                        options: {
                            headers: {
                                "content-type": "charset=utf-8"
                            },
                            timeout: 250,
                            // method:'GET'
                        }
                    });
                });
                let tasks = htmlUrl.map((it, idex) => {
                    return {
                        func: task,
                        param: it,
                        // id: it.url
                        id: '' + idex
                    }
                });
                let bhtml = [];
                let count = tasks.length;
                be(tasks, {
                    func: function (obj, id, error, taskResult) {
                        // bhtml.push(taskResult);
                        bhtml.push({html: taskResult, id: id});
                        count = count - 1;
                        if (single_back && /推送/.test(taskResult)) {
                            hideLoading();
                            return "break";
                        } else if (count > 0) {
                            showLoading(`${input}扫描中，剩余：${count}`);
                        } else {
                            hideLoading();
                        }
                    }
                });
                // let bhtml = bf(htmlUrl);
                let tvbs = [];
                for (let j in bhtml) {
                    if (/推送/.test(bhtml[j].html)) {
                        // tvbs.push(url_list[j]);
                        tvbs.push(url_list[parseInt(bhtml[j].id)]);
                    }
                }
                // log(tvbs);
                hideLoading();
                let tvb_info = {
                    now: tvbs[0],
                    lists: tvbs,
                };
                writeFile('hiker://files/rules/dzHouse/tvbox/推送地址.json', JSON.stringify(tvb_info));
                return `toast://${input}扫描完毕,发现附近${tvbs.length}个tvbox软件并自动连接第1个设备`
            }else if(/手动输入/.test(input)){
                let ip = getIP();
                let api = 'http://'+ip+':9978/';
                return $(api,'请手动输入地址').input(()=>{
                    let cpath = 'hiker://files/rules/dzHouse/tvbox/推送地址.json';
                    let tvb_info;
                    try {
                        tvb_info = JSON.parse(fetch(cpath));
                    } catch (e) {
                        tvb_info = {};
                    }
                    tvb_info.now = input;
                    if(Array.isArray(tvb_info.lists)){
                        if(!tvb_info.lists.includes(input)){
                            tvb_info.lists.push(input);
                        }
                    }else{
                        tvb_info.lists = [input];
                    }
                    writeFile(cpath, JSON.stringify(tvb_info));
                    // copy(tvb_info.now);
                    return 'toast://已添加并连接设备:'+input
                });
            }
        }),
        col_type: tv_col
    });
    d.push({
        title: '连接',
        img: 'https://hikerfans.com/tubiao/messy/37.svg',
        url: $('#noLoading#').lazyRule((color) => {
            let tvb_info;
            try {
                tvb_info = JSON.parse(fetch('hiker://files/rules/dzHouse/tvbox/推送地址.json'));
            } catch (e) {
                return '本地未存在历史扫描结果,无法设置,请扫描后再试'
            }
            if (!tvb_info.lists || !Array.isArray(tvb_info.lists) || tvb_info.lists.length < 1) {
                return '本地历史扫描结果有误,请重新扫描'
            }
            let tvbs = tvb_info.lists.map(it => it !== tvb_info.now ? it : color(it, '#09c11b'));
            return $(tvbs, 1, '请选择要推送的TVBOX设备').select((tvb_info) => {
                if (input.includes('color')) {
                    copy(tvb_info.now);
                    return 'hiker://empty'
                }
                tvb_info.now = input;
                writeFile('hiker://files/rules/dzHouse/tvbox/推送地址.json', JSON.stringify(tvb_info));
                copy(tvb_info.now);
                return 'toast://已设置推送地址为:' + input
            }, tvb_info);
        }, color),
        col_type: tv_col
    });
    d.push({
        title: '查看日志',
        img: 'https://hikerfans.com/tubiao/more/337.png',
        url: $('#noLoading#').lazyRule((logtail_file) => {
            let tvb_info;
            try {
                tvb_info = JSON.parse(fetch('hiker://files/rules/dzHouse/tvbox/推送地址.json'));
            } catch (e) {
                log(e.message);
                return 'toast://查看日志失败,请扫描并连接设备后再试'
            }
            if (!tvb_info.lists || !Array.isArray(tvb_info.lists) || tvb_info.lists.length < 1) {
                return 'toast://本地历史扫描结果有误,请重新扫描'
            }
            let ws_url = tvb_info.now.replace('http:','ws:')+'ws';
            putVar('WSURL',ws_url);
            let x5_app=getPath(logtail_file);
            refreshX5WebView(x5_app);
            // refreshX5Desc('360&&list');
            return 'toast://web组件刷新成功\n'+ws_url
        },logtail_file),
        col_type: tv_col
    });
    if(obj.line&&/both|bottom/.test(obj.line)){
        d.push({
            col_type:'line'
        });
    }
    return d
}
推送组件(d);
let x5_app=getPath(logtail_file);
d.push({
    title:'tvbox日志',
    url:x5_app,
    extra:{ua:MOBILE_UA},
    col_type:'x5_webview_single',
    desc:'585&&list',
});
d.push({
    col_type:'line'
});
d.push({
    title:'到底了!!!上面是日志区域',
    col_type:'text_center_1',
    url:'hiker://empty'
});
setResult(d);
