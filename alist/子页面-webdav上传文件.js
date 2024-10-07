js:
let d=[];
setPageTitle('Alist|webdav上传');
addListener('onClose', $.toString(() => {
    refreshPage(false); //刷新
}));
d.push({
    title: '上传☁️',
    url: $.toString(()=>{
        let input = getMyVar('webdav_path','');
        if(!/^(hiker|file|\/storage\/|\/sdcard\/)/.test(input)){
            return 'toast://文件路径有误!'
        }
        showLoading("上传中，请稍候");
        let sub_urls = $.get_sub_urls();
        let rstrip = $.rstrip;
        var base_path = rstrip(getMyVar("baseurl", sub_urls[0].url), '/');
        var path = getMyVar("path", "");
        let nowSub = sub_urls.find(x=>rstrip(x.url,'/')===base_path);
        let url = base_path +'/dav'+path;
        let name = input.split("/").slice(-1)[0];
        log(`开始将${name}上传至${url}`);
        let webdav = buildWebDav(url, nowSub.webdav.user, nowSub.webdav.pwd);
        webdav.upload(name, input);
        hideLoading();
        refreshPage(false);
        return "toast://上传完毕,可以在此继续选择文件上传或者返回上级查看成功的文件"
    }),
    col_type: "input",
    desc: "待上传的文件路径,支持hiker://,file://,/storage/开头",
    pic_url: "",
    extra:{
        height:3,
        type:'textarea',
        id:'webdav_path',
        defaultValue:getMyVar('webdav_path',''),
        onChange:"putMyVar('webdav_path',input)",
    }
});
d.push({
    title: "选择文件路径",
    url:$('#noLoading#').lazyRule(()=>{
        let fp=config.lib.fileSelect;
        let f=$.rc(fp);
        return f.fileSelectionUri({
            callback: $.toString(() => {
                let target = findItem("webdav_path").extra;
                updateItem("webdav_path", {
                    extra: Object.assign(target, {
                        defaultValue: PATH
                    })
                });
                putMyVar('webdav_path',PATH);
                return true;
            }),
            onClickType:'confirm',
            fileType: "",
            pattern: 0,
            requireUrl:fp,
            initialPath:getPath('hiker://files/').slice(7),
            memory:'true',
        });
    }),
    col_type: "text_center_1",
});

setResult(d)