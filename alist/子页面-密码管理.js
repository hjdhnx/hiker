js:
let d = [];
setPageTitle('Alist密码管理');
const {color,small} = $.require('hiker://page/utils');
let idex = getParam('idex', MY_PARAMS.idex||"");
if(!idex){
    d.push({
        title:'索引获取失败,无法管理密码',
        col_type:'text_1',
        url:'hiker://empty'
    });
}else{
    idex = Number(idex);
    let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
    let nowSub = sub_urls[idex];
    let name = color(nowSub.name,'#d96715');
    let password = nowSub.password;
    let webdav = nowSub.webdav||{};
    if(!password){
        d.push({
            title:'订阅'+name+'暂无密码',
            col_type:'text_1',
            url:'hiker://empty'
        });
    }else{
        d.push({
            title:'订阅'+name+'密码如下',
            col_type:'text_1',
            url:'hiker://empty'
        });
        d.push({
            title:JSON.stringify(password),
            col_type:'long_text',
        });
    }
    d.push({
       title:'<big><strong>webdav配置<big><strong>',
       col_type:'rich_text',
    });
    let webdav_path = $.rstrip(nowSub.url,'/')+'/dav';
    d.push({
        title:'webdav地址',
        desc:webdav_path,
        col_type:'text_1',
        url:'copy://'+webdav_path
    });
    d.push({
        title: '账号',
        url: $.toString((user)=>{
            copy(user||getMyVar('webdav_user',''));
            return 'hiker://empty'
        },webdav.user),
        col_type: "input",
        desc: "webdav登录账号",
        pic_url: "",
        extra:{
            defaultValue:webdav.user||getMyVar('webdav_user',''),
            onChange:"putMyVar('webdav_user',input)",
        }
    });
    d.push({
        title: '密码',
        url: $.toString((pwd)=>{
            copy(pwd||getMyVar('webdav_pwd',''));
            return 'hiker://empty'
        },webdav.pwd),
        col_type: "input",
        desc: "webdav登录密码",
        pic_url: "",
        extra:{
            type:'password',
            defaultValue:webdav.pwd||getMyVar('webdav_pwd',''),
            onChange:"putMyVar('webdav_pwd',input)",
        }
    });
    d.push({
        title:'验证并保存',
        col_type:'text_center_1',
        url:$('#noLoading#').lazyRule((webdav_path,idex)=>{
            showLoading('登录验证中,请稍等...');
            let url = webdav_path;
            let user = getMyVar("webdav_user");
            let pwd = getMyVar("webdav_pwd");
            if (!user|| !pwd) {
                return "toast://请输入webdav登录账号和密码";
            }
            let webdav = buildWebDav(url, user, pwd);
            try {
                let list = JSON.parse(webdav.list());
                if(list.length < 1){
                    hideLoading();
                    return 'toast://保存失败!登录检测到文件列表为空,请确保账号密码正确且webdav路径下至少有1个文件/文件夹'
                }
            }catch (e) {
                log(e.message);
                hideLoading();
                return 'toast://保存失败!登录检测到文件列表为空,请确保账号密码正确且webdav路径下至少有1个文件/文件夹'
            }
            let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
            let nowSub = sub_urls[idex];
            nowSub.webdav = {user:user,pwd:pwd};
            saveFile('sub_urls.json', JSON.stringify(sub_urls),0);
            // log(list);
            hideLoading();
            return 'toast://登录验证成功,已保存凭证'
        },webdav_path,idex),
    });
}
setResult(d);