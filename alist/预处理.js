$.require('hiker://page/libs?rule=道长仓库Pro');
if (!(getAppVersion() < 3204)) {
    const {getU}=$.require('hiker://page/api');
    const {isOffice}=$.require('hiker://page/fileType');
    const {similar,removeExt,saveHistory,renderText}=$.require('hiker://page/utils');
    $.extend({
        get_sub_urls() {
            let sub_urls = JSON.parse(readFile('sub_urls.json', 0) || '[]');
            if (sub_urls.length < 1) {
                sub_urls = this.sub_urls;
            }
            return sub_urls
        },
        getU:getU,
        isOffice:isOffice,
        similar:similar,
        removeExt:removeExt,
        saveHistory:saveHistory,
        renderText:renderText,
        lstrip(string,char){//去除左边指定字符
            return string.replace(new RegExp('^\\'+char+'+', 'g'), '');
        },
        rstrip(string,char){//去除右边指定字符
            return string.replace(new RegExp('\\'+char+'+$', 'g'), '');
        },
        strip(string,char){//去除两边指定字符
            return string.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
        },
        getTimeOut(){
            return Number(getItem('timeout',this.timeout+''))
        },
        timeout:3500,
        sub_urls: [{
            name: '小棉袄仓库',
            url: 'http://pan.haikuoshijie.cn/',
        }, {
            name: '嗨翻',
            url: 'https://pan.hikerfans.com/',
        }, {
            name: '非盘',
            url: 'http://www.feifwp.top/',
        }, {
            name: '姬路白雪',
            url: 'https://pan.jlbx.xyz/',
        }, {
            name: '听闻',
            url: 'https://wangpan.sangxuesheng.com/',
        }, {
            name: 'Joe自用',
            url: 'http://joegu.tk/',
        }],
    });
}