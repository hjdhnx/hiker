function clickLazy(baseurl, npath, path,clickOption,showZimu,input, ext,reload){
    if (clickOption !== '菜单') {
        let u=$.getU(baseurl,npath,ext);
        if(/toast:/.test(u)){
            return u
        }
        let playUrl = baseurl + "/d" + npath;//文件302直链
        u = ext?playUrl+ext:playUrl; // 既然获取u没报错,为了可以让视频投屏,那么u覆写为302直链
        //log(u);
        if (clickOption === '打开') {
            if(ext&&/isVideo/.test(ext)&&showZimu==='开'){//判断打开的是媒体文件才走字幕逻辑
                let id = baseurl + npath;//当前文件的唯一标识
                let data = {
                    title: input,
                    desc: id,
                    extra:{
                        id:id,
                    }
                };
                var now_files = storage0.getMyVar("now_files",[]);//获取缓存的,避免二次请求
                // log('同目录文件数为:'+now_files.length);
                if(now_files.length < 1|| reload){//从搜索进去的,只能重新获取了
                    const {getFiles} = $.require('hiker://page/api');
                    let dirInfo = getFiles(path,'文件');
                    now_files = dirInfo.result||[];
                    // log('重新获取同目录文件:'+now_files.length);
                }
                let files;
                if(reload){
                    files = now_files.filter(x=>x.type!==1&&/\.srt$|\.vtt$|\.ass$|\.ssa$/.test(x.title)).map(x=>x.title); // 筛选文件并且名称含字幕后缀的
                }else{
                    files = now_files.filter(x=>x.type!==1&&/\.srt$|\.vtt$|\.ass$|\.ssa$/.test(x.name)).map(x=>x.name); // 筛选文件并且名称含字幕后缀的
                }
                // log(now_files);
                if(files.length > 0){//当前目录有字幕文件
                    let bestFile = files.find(x=>$.removeExt(input).includes($.removeExt(x)));//视频文件去掉后缀完美包含字幕文件去后缀
                    if(bestFile){//找到了最符合的文件名称
                        log(`${input}自动匹配最佳外挂字幕文件:${bestFile}`);
                        let realUrl = baseurl + '/d' + path + bestFile;
                        data.url = JSON.stringify({
                            urls: [u],
                            subtitle: realUrl
                        });
                        $.saveHistory(id,data);
                        return JSON.stringify({
                            urls: [u],
                            subtitle: realUrl
                        });
                    }else{
                        files = files.filter(x=>$.similar($.removeExt(input),$.removeExt(x))>=30);//筛选相似度>30的文件
                        if (files.length > 0) {
                            files.unshift('不需要字幕');
                            return $(files, 1, "请选择字幕").select((baseurl, path, u,ext,id,playUrl,data) => {
                                if(input==='不需要字幕'){
                                    data.url = u;
                                    $.saveHistory(id,data);
                                    return u
                                }
                                let realUrl = baseurl + '/d' + path + input;
                                data.url = JSON.stringify({
                                    urls: [u],
                                    subtitle: realUrl
                                });
                                $.saveHistory(id,data);
                                return JSON.stringify({
                                    urls: [u],
                                    subtitle: realUrl
                                });
                            }, baseurl, path, u,ext,id,playUrl,data);
                        } else {
                            data.url = u;
                            $.saveHistory(id,data);
                            return u
                        }
                    }
                }else{
                    data.url = u;
                    $.saveHistory(id,data);
                    return u
                }
            }else if(ext&&/isVideo/.test(ext)&&showZimu!=='开'){
                let id = baseurl + npath;//当前文件的唯一标识
                let data = {
                    title: input,
                    desc: id,
                    url:u,
                    extra:{
                        id:id,
                    }
                };
                $.saveHistory(id,data);
                return u
            }else{
                return u
            }
        }
        if (clickOption === '打开') {
            return u
        } else if (clickOption === '下载') {
            return 'download://' + u
        }
    }else{
        let sub_urls = $.get_sub_urls();
        let rstrip = $.rstrip;
        let nowSub = sub_urls.find(x=>rstrip(x.url,'/')===baseurl);
        let dav = nowSub?nowSub.webdav||{}:{};
        let sel_list = ['打开', '下载', '预览', '复制直链'];
        if(path.split('/').length>1&&nowSub&&nowSub.webdav&&nowSub.webdav.user){
            sel_list.push('删除');
        }
        return $(sel_list, 2, '请选择1个文件操作').select((baseurl, path,npath,ext,user,pwd) => {
            let u=$.getU(baseurl,npath,ext);
            if(/toast:/.test(u)){
                return u
            }
            let realUrl = baseurl + '/d' + npath;
            if (input === '打开') {
                return u;
            } else if (input === '下载') {
                return 'download://' + u
            } else if (input === '复制直链') {
                return 'copy://' + realUrl
            }else if(input === '删除'){
                // let url = baseurl +'/dav'+npath;
                let fname = npath.split('/').slice(-1)[0];
                let url = baseurl +'/dav'+path;
                return $('确认删除:'+fname+' ?').confirm((realUrl,url,fname,user,pwd)=>{
                    let webdav = buildWebDav(url, user, pwd);
                    // log(fname);
                    log(url+fname);
                    webdav.delete(fname)
                    refreshPage(false);
                    return "toast://已删除"+realUrl
                },realUrl,url,fname,user,pwd);
            }else if (input === '预览') {
                if (/\.md$/.test(realUrl)) {
                    return $.renderText(realUrl,'md');
                } else if (/\.html$|\.json$|\.js$|\.css$|\.py$|\.php$|\.go$/.test(realUrl)) {
                    return $.renderText(realUrl,'code');
                } else if (/\.txt$/.test(realUrl)) {
                    return $.renderText(realUrl,'txt');
                } else if (/\.pdf$/.test(realUrl)) {
                    return "x5://https://alist-org.github.io/pdf.js/web/viewer.html?file=" + realUrl
                } else if ($.isOffice(realUrl)) {
                    return "x5://https://view.officeapps.live.com/op/view.aspx?src=" + realUrl
                } else {
                    let sub_urls = $.get_sub_urls();
                    let password = sub_urls.find(x => x.url.includes(baseurl)).password || {};
                    let res = JSON.parse(post(baseurl + "/api/public/preview", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            path: npath,
                            password: password[npath] || "",
                        }),
                        timeout: $.getTimeOut(),
                    }));
                    if (res.data) {
                        return res.data.preview_url + '&access_token=' + res.data.access_token;
                    } else {
                        return 'toast://' + res.message;
                    }
                }
            } else {
                return 'toast://无效操作'
            }
        },baseurl, path,npath,ext,dav.user,dav.pwd);

    }
}

$.exports.clickLazy = clickLazy;