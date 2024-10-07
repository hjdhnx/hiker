js:
    var d = [];
if (getAppVersion() < 3204) {
    setResult([{
        title: "您当前版本不支持本小程序，请更新至最新版本",
        url: "https://haikuo.lanzoui.com/u/GoldRiver"
    }])
} else {
    const {
        getFiles,
        getLink
    } = $.require('hiker://page/api');
    const {color,small}=$.require('hiker://page/utils');
    var path = getMyVar("path", "");
    d.push({
        title: '⚙️设置',
        col_type: 'scroll_button',
        url: 'hiker://page/settings#noHistory##noRecordHistory#',
        extra: {
            version: MY_RULE.version
        }
    });
    let sub_urls = $.get_sub_urls();
    let rstrip = $.rstrip;
    var base_path = rstrip(getMyVar("baseurl", sub_urls[0].url), '/');
    let nowSub = sub_urls.find(x=>rstrip(x.url,'/')===base_path);
    sub_urls.forEach((item) => {
        var isClicked = base_path === rstrip(item.url, '/');
        d.push({
            title: isClicked ? "‘‘’’<strong><font color='#1E90FF'>" + item.name + "</front></strong>" : item.name,
            url: isClicked ? base_path + path :  $(rstrip(item.url, '/')+"#noLoading#").lazyRule(() => {
                input = input.split('#')[0];
                putMyVar("baseurl", input);
                clearMyVar("path");
                refreshPage(false);
                return "toast://切换成功"
            }),
            col_type: "scroll_button"
        });
    });
    d.push({
        col_type: "blank_block"
    });
    d.push({
        title: "‘‘’’<strong><font color='#1E90FF'>...</front></strong>",
        url: $('#noLoading#').lazyRule((path) => {
            // 返回上级
            path.pop();
            putMyVar("path", path.join("/"));
            if(getItem('clear_change','')){
                clearMyVar('search','');
            }
            refreshPage(false);
            return "hiker://empty"
        }, path.split("/")),
        col_type: "scroll_button"
    });
    d.push({
        title: "🏠首页",
        col_type: "scroll_button",
        url: $('#noLoading#').lazyRule(() => {
            putMyVar("path", "");
            if(getItem('clear_refresh','')){
                clearMyVar('search','');
            }
            refreshPage(false);
            return "hiker://empty"
        }),
    });
    let paths = "";
    for (item of path.split("/")) {
        if (item !== "") {
            paths += "/" + item;
            d.push({
                title: item,
                col_type: "scroll_button",
                url: $('#noLoading#').lazyRule((paths) => {
                    putMyVar("path", paths);
                    if(getItem('clear_change','')){
                        clearMyVar('search','');
                    }
                    refreshPage(false);
                    return "hiker://empty"
                }, paths)
            })
        }
    }
    let sorts = ["名称", "类型", "大小", '时间'];
    let nsort = getMyVar('sort', '名称');
    let nsearch = getMyVar('search','');
    sorts.forEach(item => {
        let cc = nsort === item + "-";
        let isClicked = nsort === item;
        d.push({
            title: cc || isClicked ? "‘‘’’<strong><font color='#1E90FF'>" + item + (cc ? "∧" : "∨") + "</front></strong>" : item,
            col_type: "flex_button",
            url: $('#noLoading#').lazyRule((item, isClicked) => {
                if (isClicked) {
                    putMyVar("sort", item + "-");
                } else {
                    putMyVar("sort", item);
                    if(getItem('clear_change','')){
                        clearMyVar('search','');
                    }
                }
                refreshPage(false);
                return "hiker://empty"
            }, item, isClicked)
        });
    });
    let filterOption = getItem('filterOption','全部');
    let filter_rules = JSON.parse(readFile('filter_rules.json', 0) || '[]').filter(x=>x.active);
    let filterSels = ['全部','文件','文件夹'];
    filterSels = filterSels.concat(filter_rules.map(x=>x.name));
    let filterSel = filterSels.map(it=>it===filterOption?color(it,'#12b668'):it);
    filterSel.push(color('自定义过滤','#d96715'));
    d.push({
        title:'⏳'+color(filterOption,'#d96715'),
        col_type:'flex_button',
        url:$(filterSel,2,'选择要显示的内容').select((filterOption)=>{
            input = pdfh(input,'body&&Text').replace('““””','');
            if(input==='自定义过滤'){
                return 'hiker://page/superSettings#noHistory##noRecordHistory#'
            }
            if(filterOption!==input){
                setItem('filterOption',input);
                refreshPage(false);
            }
            return 'hiker://empty'
        },filterOption),
    });
    d.push({
        title:nsearch?"🔍"+small(color(':'+nsearch,'#12b668')):'🔍',
        col_type:'flex_button',
        url:$(nsearch,'输入要搜索的内容。支持正则。如\\.js').input((nsearch)=>{
            if(input!==nsearch){
                putMyVar('search',input);
                refreshPage(false);
            }
            return 'hiker://empty'
        },nsearch),
    });
    d.push({
        title: color("🕓历史","#d96715"),
        url: "hiker://page/history#noHistory##noRecordHistory#",
        col_type: "flex_button"
    });
    let dirInfo = getFiles(path,filterOption);
    if(dirInfo.can_upload){
        d.push({
            title: color("⛅访客","#15ab21"),
            url: "hiker://page/upload#noHistory##noRecordHistory#",
            col_type: "flex_button"
        });
    }
    // log(nowSub);
    if(path.split('/').length>1&&nowSub&&nowSub.webdav&&nowSub.webdav.user){
        let web_dav = nowSub.webdav;
        // log(webdav);
        d.push({
            title: color("📂创建","#15ab21"),
            url: $('','请输入待创建的文件夹名称').input((user,pwd,base_path,path)=>{
                if(input){
                    let url = base_path +'/dav'+path;
                    log(url);
                    let webdav = buildWebDav(url, user, pwd);
                    webdav.makeDir(input);
                    refreshPage(false);
                    return "toast://文件夹"+input+"创建完毕"
                }
                return 'hiker://empty'
            },web_dav.user,web_dav.pwd,base_path,path),
            col_type: "flex_button"
        });
        d.push({
            title: color("☁上传","#15ab21"),
            url: "hiker://page/webdavUpload#noHistory##noRecordHistory#",
            col_type: "flex_button"
        });
    }
    d.push({
        title:color('🔍全局','#12b668'),
        col_type:'flex_button',
        url:'hiker://page/search?page=fypage#noHistory##noRecordHistory#',
    });
    d.push({
        col_type: "line_blank"
    });
    let clickOption = getItem('clickOption', '打开');
    let showZimu = getItem('showZimu','开');
    dirInfo.result.forEach(item => {
        if (item.url) {
            d.push({
                title: item.title,
                img: item.img,
                url: item.url,
                col_type: item.col_type,
            });
        } else {
            // let it_type = item.extra.type;
            let it_type = item.type;
            let url = 'hiker://empty';
            let title = item.extra.name || item.title;
            let id=item.extra.id;
            if (it_type === 1) {
                url = $('#noLoading#').lazyRule((item, title) => {
                    putMyVar("path", $.rstrip(getMyVar("path", ""),'/' )+ "/" + title);
                    if(getItem('clear_change','')){
                        clearMyVar('search','');
                    }
                    refreshPage(false);
                    return "hiker://empty"
                }, item, title);
            } else if (it_type === 3 || /\.m3u8$/.test(title)) { //3是媒体,禁用下载和跳转
                url = getLink(title, null,'打开', showZimu,'#isVideo=true#');
            } else if (it_type === 6) {
                url = getLink(title, null,'打开', showZimu,"#.jpg");
            } else { //跟随系统预览和下载
                url = getLink(title, null,clickOption,showZimu);
            }
            d.push({
                title: item.title,
                img: item.img,
                url: url,
                col_type: item.col_type,
                extra: {
                    id:id,
                    type: it_type,
                    title: title,
                }
            });
        }
    });
    setResult(d);
}