function getFiles(path,filterOption) {
    let sort = getMyVar('sort', '名称');
    let search = getMyVar('search','');
    filterOption = filterOption||'全部';
    let result = [];
    let can_upload = false;
    let sub_urls = $.get_sub_urls();
    let baseurl = $.rstrip(getMyVar("baseurl", sub_urls[0].url), '/');
    try {
        let password = sub_urls.find(x => x.url.includes(baseurl)).password || {};
        var res = JSON.parse(post(baseurl + "/api/public/path", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                path: path,
                password: password[path] || '',
            }),
            timeout: $.getTimeOut(),
        }));
    } catch (e) {
        log('获取文件列表失败:'+e.message);
        return {result:result,can_upload: can_upload}
    }
    const icon_dict = $.require('hiker://page/fileType').get_icon_dict();
    const icons = $.require('hiker://page/fileType').get_icons();
    const {
        bytesToSize,
        small,
        color,
        sorts,
        getTime
    } = $.require('hiker://page/utils');
    let showDetail = getItem('showDetail', '开') === '开';
    try {
        let msg = res.message.trim();
        if (msg === "success") {
            let list = res.data.files;
            storage0.putMyVar("now_files",list);//把当前路径的文件信息储存起来,后面获取匹配字幕要用
            can_upload = res.data.meta.upload;
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

            if(search){
                list = list.filter(x=>(new RegExp(search)).test(x.name))
            }
            if (['大小', '类型', '名称', '时间'].includes(sort)) {
                sorts(list, sort);
            } else {
                sorts(list, sort.replace('-', '')).reverse();
            }
            list.forEach(item => {
                let ext = item.name.split('.').slice(-1)[0];
                let img = item.type === 1 ? icon_dict['1'] : (icons[ext] || icon_dict[item.type + '']);
                result.push({
                    title: item.name,
                    img: img,
                    type: item.type,
                    col_type: "avatar",
                    extra: {
                        id:baseurl+path+item.name,
                        type: item.type,
                        name:item.name,
                    }
                });
                if (showDetail) {
                    let date = getTime(item);
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
                    result.push({
                        type: item.type,
                        title: small(color(desc, '#aaaaaa')),
                        col_type: "text_1",
                        extra: {
                            id:baseurl+path+item.name,
                            type: item.type,
                            name: item.name,
                        }
                    })
                }
            });
        } else if (msg === "Wrong password") {
            result.push({
                title: "点我输入密码",
                col_type: "text_1",
                url: $(getMyVar("password", "")).input((path, baseurl) => {
                    let sub_urls = $.get_sub_urls();
                    let idex = sub_urls.findIndex(x => x.url.includes(baseurl));
                    if (idex > -1) {
                        if (!sub_urls[idex].password) {
                            sub_urls[idex].password = {}
                        }
                        sub_urls[idex].password[path] = input;
                        saveFile('sub_urls.json', JSON.stringify(sub_urls), 0);
                        putMyVar("password", input);
                        refreshPage(false);
                        return "hiker://empty"
                    } else {
                        return 'toast://未获取到链接为:' + baseurl + '的索引'
                    }

                }, path, baseurl),
            })
        }
    } catch (e) {
        log('发生了错误:' + e.message);
        throw e
    }
    return {result:result,can_upload:can_upload}
}

function getLink(input, path,clickOption,showZimu, ext,reload) {
    clickOption = clickOption || '打开';
    showZimu = showZimu || '开';
    ext = ext || false;
    reload = reload||false;
    path = (path||getMyVar("path", "")) + "/";
    let sub_urls = $.get_sub_urls();
    let baseurl = $.rstrip(getMyVar("baseurl", sub_urls[0].url), '/');
    let npath = path + input;
    let homeUrl='hiker://empty';
    if(/菜单/.test(clickOption)){
        homeUrl+='#noLoading#'
    }
    return $(homeUrl).lazyRule((baseurl, npath, path,clickOption,showZimu,input, ext,reload) => {
        const {clickLazy} = $.require('hiker://page/clickFunction');
        return clickLazy(baseurl, npath, path,clickOption,showZimu,input, ext,reload)
    }, baseurl, npath, path,clickOption,showZimu, input,ext,reload);
    // log('当前文件路径:'+npath);
}

function getU(baseurl,npath,ext){
    try {
        let sub_urls = $.get_sub_urls();
        let password = sub_urls.find(x => x.url.includes(baseurl)).password || {};
        let res = JSON.parse(post(baseurl + "/api/public/path", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                path: npath,
                password: password[npath] || '',
            }),
            timeout: $.getTimeOut(),
        }));
        if (res.data) {
            let u = res.data.files[0].url;
            u = !/^http/.test(u) ? baseurl.split('//')[0] + u : u;
            if (ext) {
                u = u + ext;
            }
            return u
        }else{
            return "toast://" + res.message
        }
    }catch (e) {
        return 'toast://文件' + npath + '信息获取发生错误:' + e.message;
    }
}

$.exports.getFiles = getFiles;
$.exports.getLink = getLink;
$.exports.getU = getU;