const type_dict = {
 0: 'zip|exe|apk|crx',
 1: '文件夹',
 2: 'pdf|xls|doc',
 3: 'mp4|mkv|mp3|flv',
 4: '?',
 5: 'md|txt|json|js',
 6: 'gif|jpg|hiec',
}

function get_icon_dict() {
 let root = 'https://gitcode.net/qq_32394351/dr/-/raw/master/img/文件类型/';
 return {
  0: root + 'zip.svg',
  1: root + '文件夹.svg',
  2: root + '文件.svg',
  3: root + 'mp4.svg',
  4: root + '文件.svg',
  5: root + '文件.svg',
  6: root + 'gif.svg',
 }
}
let iconStyles = [{
 name:'默认',
 url:'https://gitcode.net/qq_32394351/dr/-/raw/master/img/文件类型/'
},{
 name:'蓝莓',
 url:'https://gitcode.net/qq_32394351/dr/-/raw/master/img/文件类型2/'
}];
let iconStyle = getItem('iconStyle','默认');
let nowStyle = iconStyles.find(x=>x.name===iconStyle);
let iconRoot = nowStyle?nowStyle.url:iconStyles[0].url;

function get_icons() {
 // let root = 'https://gitcode.net/qq_32394351/dr/-/raw/master/img/文件类型/';
 let root = iconRoot;
 let files = 'ai|apk|avi|css|dmg|exe|flv|gif|hiker|html|iso|jpg|js|json|log|mov|mp3|mp4|otf|php|png|ppt|psd|table|txt|wav|xls|zip|文件|文件夹'.split('|');
 let obj = {};
 files.forEach((it) => {
  obj[it] = root + it + '.svg';
 });
 return obj
}

function isOffice(url){
 let str='doc|docx|docm|dotm|dotx|xlsx|xlsb|xls|xlsm|pptx|ppsx|ppt|pps|pptm|potm|ppam|potx|ppsm'.split('|').map(it=>'\\.'+it+'$').join('|');
 let mc=new RegExp(str);
 return mc.test(url);
}

$.exports.type_dict = type_dict;
$.exports.get_icon_dict = get_icon_dict;
$.exports.get_icons = get_icons;
$.exports.isOffice = isOffice;
$.exports.iconStyles = iconStyles;