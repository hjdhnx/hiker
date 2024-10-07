js:
setPageTitle('Alist|访客上传文件');
const {color,small} = $.require('hiker://page/utils');
let html = `
<!doctype html>
<html> 
    <head> 
    <!--<author>顺承天意&&@LoyDgIk&&道长</author>-->
        <meta charset="UTF-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"> <!-- <meta name="color-scheme" content="light dark"> --> 
        <title>上传文件</title> 
        <style>
        button {
            display: block;
            width: 100%;
            margin: 6px;
            outline: none;
            height: 40px;
            line-height: 40px;
            color: #fff;
            background-color: #26a2ff;
            text-align: center;
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }

        #upload-input {
            opacity: 0;
            filter: alpha(opacity=0);
            display: inline-block;
            width: 100%;
            height: 100%;
        }

        #upload-text {
            position: relative;
            bottom: 40px;
            user-select: none;
        }
    </style>
    </head>
    <body><button onclick="easyUpload()"> <span id="upload-input">选择文件</span><span id="upload-text">选择文件</span> </button>
        
    </body>
</html>
`;
let sub_urls = $.get_sub_urls();
let baseurl = $.rstrip(getMyVar("baseurl", sub_urls[0].url), '/');
let path = getMyVar("path", "");
let password = sub_urls.find(x => x.url.includes(baseurl)).password || {};
password = password[path] || '';
let obj = {
    base_url:baseurl,
    path:path,
    password:password,
    html:html,
};
function x5js(obj) {
    document.write(obj.html);
    function easyUpload() {
        var input = document.createElement("input");
        input.type = "file";
        input.click();
        input.onchange = function() {
            fba.showLoading("正在上传");
            var files = input.files;
            const form = new FormData();
            for (let i = 0; i < files.length; i++) {
                form.append("files", files[i], files[i].name);
            }
            form.append("path", obj.path);
            form.append("password", obj.password);
            var xhr = new XMLHttpRequest();
            //xhr.setRequestHeader('Content-Type', 'application/json');
            var action = obj.base_url + "/api/public/upload"; //上传接口
            // fba.log("正在上传");
            xhr.onload = function() {
                fba.hideLoading();
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var resultObj = JSON.parse(xhr.responseText);
                    fba.log(xhr.responseText);
                    alert("上传成功\n" + resultObj.message);
                    fba.back(true);
                }else{
                    alert("上传失败");
                }
            }
            xhr.open("POST", action);
            xhr.send(form); //发送表单数据
        }
    }
    window.easyUpload = function() {
        try {
            easyUpload();
        } catch (e) {
            fba.log(e.toString());
        }
    }
}
var d = [];
d.push({
    title:'当前主页:'+small(color(obj.base_url,'#aaaaaa')),
    desc:'当前相对路径:'+small(color(obj.path,'#aaaaaa')),
    col_type: 'text_1',
    url:obj.base_url + obj.path,
    extra: {
        password:obj.password
    }
});
d.push({
    col_type: "x5_webview_single",
    desc: "60&&list",
    url:"about:blank",
    extra: {
        js: $.toString(x5js, obj),
        //jsLoadingInject: true
    }
});
setResult(d);