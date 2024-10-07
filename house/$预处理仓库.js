$.exports.initPre = function () {
  rc("hiker://files/rules/js/$hiker.js", -1);
  //$.setRoot('https://hjdhnx.coding.net/public/hiker/hiker/git/files/master/js/');
  $.setRoot();
  $.setLib({
    lsg: "localStorage.js", //本地储存
    file: "File.js", //文件os
    fileSelect: "fileSelect.js", //文件选择器
    dt: "categories-header.js", //动态分类
    dr: "dr.js", //dr模板依赖
    drpre: "预处理.js", //dr模板预处理
    drup: "更新.js", //dr模板自动更新
    drmatch: "自动模板匹配.js", //dr模板自动模板匹配
    drm: "dr模板.js", //dr模板小程序
    cms: "zyw.js", //cms模板依赖
    cmspre: "资源网预处理.js", //cms预处理
    cmsm: "cms.js", //cms模板小程序
    libcheck: "依赖检测.js", //dr检测依赖
    ruleEditor: "ruleEditor.js", //写页源神器小程序
    houseLazy: "houseLazy.js", //仓库通免
    lazy: "lazy.js", //香免
    sub: "subscribe.js", //道德经订阅
    hikerUi: "hikerUi.js", //海阔组件依赖
  });
};
