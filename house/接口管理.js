js:
    $().rule(()=> {
        const {color, small} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
        var path_djt = 'hiker://files/rules/home/apiSet_word.txt';
        var path_imgs = 'hiker://files/rules/home/apiSet_image.txt';
        let d = [];
        setPageTitle('主页-接口管理');
        d.push({
            title: '接口说明',
            extra: {lineVisible: false},
            desc: '用于管理全局的随机图片接口及随机文字\n点此可更新插件',
            url: $("确认要更新插件?点错的话请取消").confirm(() => {
                let code = fetch('http://hiker.nokia.press/hikerule/rulelist.json?id=1756');
                if(/接口管理/.test(code)) {
                    writeFile('hiker://files/rules/dzHouse/js/主页接口设置.js',code);
                    back(true);
                    return 'toast://更新成功'
                }else{
                    return 'toast://仓库或网络不通畅,更新失败'
                }
            }),
            col_type: 'text_center_1'
        });
        d.push({
            title: '接口文件管理(支持图片,一言接口,一行一个)',
            desc: '点击可以重置接口文件',
            url: $('确定要重置图片接口与一言接口配置?').confirm((path_djt,path_imgs)=>{
                let djts = fetch('http://hiker.nokia.press/hikerule/zyw_data/29');
                let imgs = fetch('http://hiker.nokia.press/hikerule/rulelist.json?id=1759');
                let text = '';
                if(djts&&/http/.test(djts)){
                    writeFile(path_djt,djts);
                    text+='毒鸡汤接口;'
                }
                if(imgs&&/http/.test(imgs)){
                    writeFile(path_imgs,imgs);
                    text+='随机图接口'
                }
                return 'toast://已重置:'+text
            },path_djt,path_imgs),
            col_type: 'text_center_1'
        });
        d.push({
            title: '编辑图片接口',
            url: $().lazyRule((path_imgs) => {
                if(!fetch(path_imgs)){
                    let apis = fetch('http://hiker.nokia.press/hikerule/rulelist.json?id=1759');
                    writeFile(path_imgs,apis);
                }
                return 'editFile://'+path_imgs;
            },path_imgs),
            col_type: 'text_2'
        });
        d.push({
            title: '编辑一言接口',
            url: $().lazyRule((path_djt) => {
                if(!fetch(path_djt)){
                    let apis = fetch('http://hiker.nokia.press/hikerule/zyw_data/29');
                    writeFile(path_djt,apis);
                }
                return 'editFile://'+path_djt;
            },path_djt),
            col_type: 'text_2'
        });
        setResult(d);
    })