js:
var d = [];
setPageTitle('Alist|🔍全局搜索');
let nsearch = getMyVar('searchAll','');
addListener('onClose', $.toString(() => {
    let clear_refresh = getItem('clear_refresh','开');
    if(clear_refresh === '开'){
        clearMyVar('searchAll');
    }
}));
if(MY_PAGE===1||!nsearch) {
    d.push({
        title: '🔍搜索',
        desc: '搜点什么吧?',
        url: $.toString(() => {
            refreshPage(false);
        }),
        col_type: 'input',
        extra: {
            defaultValue: nsearch,
            onChange: 'putMyVar("searchAll",input)',
        }
    });
}
let searchResult = [];
let showDetail = getItem('showDetail', '开') === '开';
let filterOption = getItem('filterOption','全部');
if(nsearch){
    let sub_urls = $.get_sub_urls();
    let baseurl = $.rstrip(getMyVar("baseurl", sub_urls[0].url), '/');
    let path = getMyVar("path", "");
    let lastSearch = baseurl + path + '?key='+nsearch+'|'+showDetail;
    if(lastSearch === getMyVar('lastSearch','')){
        if(MY_PAGE===1) {
            showLoading('获取上次搜索结果中...');
        }
        log(`搜索${nsearch},第${MY_PAGE}页`);
        searchResult = JSON.parse(readFile('search_results.json',0));
    }else {
        showLoading(`搜索${nsearch}中，请稍等...`);
        const icon_dict = $.require('hiker://page/fileType').get_icon_dict();
        const icons = $.require('hiker://page/fileType').get_icons();
        const {getLink} = $.require('hiker://page/api');
        let clickOption = getItem('clickOption', '打开');
        const {bytesToSize, small, color, getTime,sorts} = $.require('hiker://page/utils');
        let showZimu = getItem('showZimu', '开');
        d.push({
            title: '主页:' + small(color(baseurl, '#aaaaaa')),
            desc: '路径:' + small(color(path, '#aaaaaa')),
            url: 'hiker://empty',
            col_type: 'text_1'
        });

        try {
            let password = sub_urls.find(x => x.url.includes(baseurl)).password || {};
            let res = JSON.parse(post(baseurl + "/api/public/search", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getItem("authorization", "")
                },
                body: JSON.stringify({
                    path: path,
                    keyword: nsearch,
                    password: password[path] || ''
                }),
                timeout: $.getTimeOut(),
            }));

            let list = res.data;
            if (list.length < 1) {
                searchResult.push({
                    title: "找不到你想要的ʕ·ᴥ·ʔ",
                    url: "hiker://empty"
                });
            } else {
                if(filterOption==='文件'){
                    list = list.filter(x=>x.type!==1)
                }else if(filterOption==='文件夹'){
                    list = list.filter(x=>x.type===1)
                }else if(filterOption!=='全部'){
                    let filter_rules = JSON.parse(readFile('filter_rules.json', 0) || '[]');
                    let filter_rule = filter_rules.find(x=>x.name===filterOption);
                    if(filter_rule&&filter_rule.rule){
                        if(filter_rule.rule.startsWith('!')){
                            list = list.filter(x=>!(new RegExp(filter_rule.rule.slice(1))).test(x.name));
                        }else{
                            list = list.filter(x=>(new RegExp(filter_rule.rule)).test(x.name));
                        }
                    }
                }
                showLoading('搜索到' + list.length + '条结果,加载中');
                list.forEach((item) => {
                    let it_type = item.type;//资源类型
                    let url = 'hiker://empty';
                    let title = item.name;//资源名称
                    let path = item.path;//资源路径
                    let id = baseurl + path + title;//资源唯一标志
                    let ext = title.split('.').slice(-1)[0];
                    let img = it_type === 1 ? icon_dict['1'] : (icons[ext] || icon_dict[it_type + '']);
                    if (it_type === 1) {
                        url = $('#noLoading#').lazyRule((item) => {
                            putMyVar("path", item.path + "/" + item.name)
                            back();
                            return "hiker://empty"
                        }, item);
                    } else if (it_type === 3 || /\.m3u8$/.test(title)) { //3是媒体,禁用下载和跳转
                        url = getLink(title,path, '打开', showZimu, '#isVideo=true#',true);
                    } else if (it_type === 6) {
                        url = getLink(title,path, '打开', showZimu, "#.jpg",true);
                    } else { //跟随系统预览和下载
                        url = getLink(title,path, clickOption, showZimu,true);
                    }
                    searchResult.push({
                        name:title,
                        title: title,
                        img: img,
                        url: url,
                        col_type: "avatar",
                        extra: {
                            id: id,
                            type: it_type,
                            title: title,
                        }
                    });
                    // log(item);
                    if (showDetail) {
                        let date = (item.updated_at || item.time_str) ? getTime(item) : '\t\t\t\t';
                        let size = item.size_str;
                        if (!size || size === "") {
                            size = item.size === 0 ? "/" : bytesToSize(item.size)
                        }
                        if (size && size !== "" && size !== 0) {
                            size = "&nbsp;&nbsp;&nbsp;" + size;
                        } else {
                            size = "";
                        }
                        let desc = date + size;
                        searchResult.push({
                            name:title,
                            title: small(color(desc, '#aaaaaa')),
                            col_type: "text_1",
                            url: url,
                            extra: {
                                id: id,
                                type: it_type,
                                title: title,
                            }
                        })
                    }
                });
                toast('搜索结束，即将加载完毕...');
            }
            putMyVar('lastSearch', lastSearch);
            if(!showDetail){//非详细模式才自动按名称排序
                sorts(searchResult,'名称');
            }
            saveFile('search_results.json', JSON.stringify(searchResult), 0);

        } catch (e) {
            searchResult.push({
                title: "好像不能搜索,点击返回",
                desc: e.message,
                url: $('#noLoading#').lazyRule(() => {
                    back();
                    return "hiker://empty"
                })
            });
            putMyVar('lastSearch', lastSearch);
            saveFile('search_results.json', JSON.stringify(searchResult), 0);
            // log(e.message);
        }
    }
}
let size = storage0.getItem('search_size',20);
if(showDetail){size = size*2} // 显示详细需要x2
searchResult = searchResult.slice((MY_PAGE-1)*size,MY_PAGE*size);
d = d.concat(searchResult);
hideLoading();
setResult(d);