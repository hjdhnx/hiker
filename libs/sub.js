var version = {
  author: "道长",
  ver: "1.2.6",
  appv: 2316,
  requireId: "https://dr.playdreamer.cn/js/subscribe.js",
  update: "2022/08/06 10:30",
  info: "轻主页融合怪模板，主要给主页增加订阅功能.4月18日上线。由道长专群测试无问题后发布",
  ua: ";get;utf-8;{User-Agent@Mozilla/5.0&&Cookie@}",
  jsRoot: "https://dr.playdreamer.cn/js/",
};

putVar("sub依赖", version.requireId);
putVar("file依赖", version.jsRoot + "File.js");
putVar("选择文件依赖", version.jsRoot + "fileSelect.js");
function color(text, color) {
  text += "";
  if (text.indexOf("““””") === 0) {
    text.replace("““””", "");
  }
  return "““””<font color='" + color + "'>" + text + "</font>";
}
function htmlTag(tag, text) {
  text += "";
  if (text.indexOf("““””") === 0) {
    text.replace("““””", "");
  }
  return "““””" + "<" + tag + ">" + text + "</" + tag + ">";
}
function small(text) {
  return htmlTag("small", text);
}

function unique2(array) {
  return Array.from(new Set(array));
}
function wordCircle() {
  //带圈文字
  let str =
    "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
  return str;
}
function ArrSet(Arr, id) {
  //对象数组去重
  var obj = {};
  const arrays = Arr.reduce((setArr, item) => {
    obj[item[id]] ? "" : (obj[item[id]] = true && setArr.push(item));
    return setArr;
  }, []);
  return arrays;
}
function strDeal(str) {
  //处理分组名称字符串
  str = str.split("");
  str = str.filter(
    (e) =>
      (e >= 0 && e <= 9) ||
      (e >= "a" && e <= "z") ||
      (e >= "A" && e <= "Z") ||
      (e >= "\u4e00" && e <= "\u9fa5")
  );
  str = str.join("");
  return str;
}

function 道长主页(is_small) {
  //道长主页引用
  is_small = is_small || false; // 是否字体缩小
  function small2(str) {
    //字体样式
    return is_small ? small(str) : str;
  }
  const path = "hiker://files/rules/dzHouse/ruleCache/sub.json";
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let subs = JSON.parse(fetch(path) || "[]");
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let nowData = cms_config.now || "";
  let nowSub = subs.filter((it) => it.title === nowData);
  nowSub = nowSub.length > 0 ? nowSub[0] : false;
  var el = []; //内部返回的元素列表
  var sub_buttons = subs.map((it) => {
    // let title = '['+idx+']'+it.title;
    let title = it.title;
    return {
      title:
        nowData === it.title ? small2(color(title, "#12b668")) : small2(title),
      col_type: "scroll_button",
      url: $("#noLoading#").lazyRule(
        (it, cfg, nowData) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          if (nowData === it.title) {
            切换订阅(it, cfg);
            let status = fetch("hiker://home@JSON编辑器");
            let hasJsonEditor = status && status !== "null";
            let cachePath =
              "hiker://files/rules/dzHouse/ruleCache/" + it.title + ".json";
            if (!hasJsonEditor) {
              return "editFile://" + cachePath;
            } else {
              return (
                "hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json=" +
                base64Encode(cachePath)
              );
            }
          } else {
            return 切换订阅(it, cfg);
          }
        },
        it,
        cfg,
        nowData
      ),
    };
  });
  let disTabModify = readFile("disTabModify");
  let disableHome = !!readFile("disableHome", 0);
  let defaultDisTabModify = true;
  if (disTabModify === "") {
    saveFile("disTabModify", defaultDisTabModify + "");
    disTabModify = defaultDisTabModify;
  } else if (/true|false/.test(disTabModify)) {
    disTabModify = JSON.parse(disTabModify);
  }
  if (subs.length < 1) {
    el.push({
      title: "本地暂无订阅,请先添加并更新订阅",
      desc: "点击下面的⚙选项⚙->订阅管理->导入,自动识别剪切板口令或手动填入订阅口令然后确定。导入成功后直接返回会自动刷新当前订阅,此时选项右边按钮进行订阅切换",
      url: "toast://点击下面对应订阅按钮可以获得一个订阅口令示例",
      // url:订阅导入(path),
      col_type: "text_1",
      extra: {
        lineVisible: false,
      },
    });
    let tip1 =
      "道长以前维护的dr合集，包含最全的小说规则，支持自定义分类。部分规则失效，不定期更新";
    let tip2 = "海阔T神的合集，包含精品直播小程序，例如虎牙斗鱼";
    let tip3 = "轻合集订阅合集，包含道长自用和TyrantG合集";
    let tip4 = "皇家猫塞德大佬维护的听书规则合集，包含海盗听书";
    let tip5 = "团子大佬维护的漫画合集";
    let tip6 = "列出来的4种了";
    el.push({
      title: small2("道长自用"),
      col_type: "text_3",
      desc: tip1,
      url: $("#noLoading#").lazyRule(
        (tip1, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅：道长自用\nhttps://pasteme.tyrantg.com/xxxxxx/ijjocp44k9zjmp3g"
          );
          // return 'toast://'+tip1
          return 订阅导入(path);
        },
        tip1,
        path
      ),
    });
    el.push({
      title: small2("TyrantG合集"),
      col_type: "text_3",
      desc: tip2,
      url: $("#noLoading#").lazyRule(
        (tip2, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅：TyrantG合集\nhttps://pasteme.tyrantg.com/xxxxxx/qvotdahiw4jgnqoe"
          );
          // return 'toast://'+tip2
          return 订阅导入(path);
        },
        tip2,
        path
      ),
    });
    el.push({
      title: small2(color("本地", "#d96715")),
      col_type: "text_3",
      desc: tip4,
      url: $("#noLoading#").lazyRule(
        (tip4, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅：本地\nhttps://pasteme.tyrantg.com/xxxxxx/6xvixjb0g1cpto7l"
          );
          // return 'toast://'+tip1
          return 订阅导入(path);
        },
        tip4,
        path
      ),
    });
    el.push({
      title: small2(color("聚影", "#d96715")),
      col_type: "text_4",
      desc: tip3,
      url: $("#noLoading#").lazyRule(
        (tip3, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅：聚影\nhttps://pasteme.tyrantg.com/xxxxxx/m2cxs5rwvocnvbcz"
          );
          // return 'toast://'+tip3
          return 订阅导入(path);
        },
        tip3,
        path
      ),
    });

    el.push({
      title: small2("聚漫"),
      col_type: "text_4",
      desc: tip5,
      url: $("#noLoading#").lazyRule(
        (tip5, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅：聚漫\nhttps://pasteme.tyrantg.com/xxxxxx/tvwhevnceijto7w9"
          );
          // return 'toast://'+tip2
          return 订阅导入(path);
        },
        tip5,
        path
      ),
    });
    el.push({
      title: small2("聚听"),
      col_type: "text_4",
      desc: tip5,
      url: $("#noLoading#").lazyRule(
        (tip5, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅：听合集\nhttps://pasteme.tyrantg.com/xxxxxx/vbbxvpyrxp6tlgox"
          );
          // return 'toast://'+tip2
          return 订阅导入(path);
        },
        tip5,
        path
      ),
    });
    el.push({
      title: small2(color("全部", "#d96715")),
      col_type: "text_4",
      desc: tip6,
      url: $("#noLoading#").lazyRule(
        (tip6, path) => {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          copy(
            "轻合集订阅合集：道长自用等6条\nhttps://pasteme.tyrantg.com/xxxxxx/o6ogybnt2ccl5fog"
          );
          // return 'toast://'+tip3
          return 订阅导入(path);
        },
        tip6,
        path
      ),
    });
  }
  let cmsSel = [
    "♻检测升级",
    "🏅订阅管理",
    "⚙轻合集设置⚙",
    "⚙主页设置⚙",
    "💠分类自定义:" + (disTabModify ? "否" : "是") + "💠",
    "💠主页:" + (disableHome ? "关" : "开") + "💠",
    "💠清除预处理💠",
    "💠依赖管理💠",
    "📥导入单规则",
    "🆙更新当前订阅",
    "💠关于💠",
  ];
  el.push({
    // title:'““””' + '⚙选项⚙'.small().bold().fontcolor('#757575'),
    title: small2(color("⚙选项⚙", "#757575")),
    url: $(cmsSel, 2, "道长防误触:你想做什么?").select(
      (QING_TITLE, nowSub, cfg, disTabModify, disableHome) => {
        if (/检测升级/.test(input)) {
          showLoading("升级检测中,请稍等...");
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          let requireId = version.requireId;
          let ver = version.ver;
          let update = version.update;
          let localDate = new Date(update);
          try {
            var webLib = fetch(requireId);
            var webVer = (function (webLib) {
              eval(webLib);
              return version;
            })(webLib);
          } catch (e) {
            hideLoading();
            return "toast://远程服务器通讯错误,本次检测升级失败\n" + e.message;
          }
          let webDate = new Date(webVer.update);
          // $.dateFormat(new Date(parseInt(localDate)),"yyyy-MM-dd HH:mm:ss");
          if (webDate > localDate || webVer.ver !== ver) {
            //网页更新时间大于本地库时间或者版本号不等
            hideLoading();
            let msg =
              "本地依赖更新时间:" +
              update +
              ",版本:" +
              ver +
              "\n云端依赖更新时间:" +
              webVer.update +
              ",版本:" +
              webVer.ver +
              "\n有升级:[" +
              ver +
              "]=>[" +
              webVer.ver +
              "],立即升级?";
            return $(msg).confirm(
              (requireId, webLib) => {
                let jsp = "hiker://files/libs/" + md5(requireId) + ".js";
                log("本地依赖模块路径=> " + jsp);
                deleteCache(requireId);
                // clearMyVar('是否进入规则');
                writeFile(jsp, webLib);
                refreshPage(false);
                return "toast://升级成功!模块依赖缓存已清除";
              },
              requireId,
              webLib
            );
          } else {
            hideLoading();
            return "toast://经检测已经是最新的[" + ver + "]了!";
          }
        } else if (/关于/.test(input)) {
          require(getVar(
            "sub依赖",
            "https://dr.playdreamer.cn/js/subscribe.js"
          ));
          return $("hiker://empty").rule((version) => {
            setPageTitle("关于道德经");
            setResult([
              {
                title: "吾有道德经首篇四大皆空,海阔世界任我游~",
                desc: "何为四大皆空:道空、天空、地空、人空\n故道大、天大、地大、人亦大。域中有四大，而人居其一焉。",
                url: "hiker://empty",
                col_type: "text_1",
              },
              {
                title: JSON.stringify(version),
                col_type: "rich_text",
              },
            ]);
          }, version);
        } else if (/分类自定义/.test(input)) {
          saveFile("disTabModify", disTabModify ? "false" : "true");
          putMyVar("typeShow", "");
          refreshPage(false);
          return "hiker://empty";
        } else if (/主页:/.test(input)) {
          saveFile("disableHome", disableHome ? "" : "1", 0);
          refreshPage(false);
          return "hiker://empty";
        } else if (/轻合集设置/.test(input)) {
          return (
            "hiker://page/Config?rule=" + QING_TITLE + "&#noRecordHistory#"
          );
        } else if (/主页设置/.test(input)) {
          return "hiker://empty#noHistory##noRecordHistory#@rule=js:eval(fetch('hiker://assets/home.js',{}));HikerHome.load('setuppage')";
        } else if (/更新当前订阅/.test(input)) {
          if (!nowSub) {
            return "toast://当前无正在使用的订阅，更新失败！";
          }
          return $("#noLoading#").lazyRule((nowSub) => {
            require(getVar(
              "sub依赖",
              "https://dr.playdreamer.cn/js/subscribe.js"
            ));
            try {
              ret = 更新单个订阅(nowSub);
              log(ret);
              return "toast://" + ret;
            } catch (e) {
              ret = "更新失败:" + e.message;
              log(ret);
              return "toast://" + ret;
            }
          }, nowSub);
        } else if (/清除预处理/.test(input)) {
          config = {};
          initConfig({});
          return "toast://已清除,无需重启视界";
        } else if (/导入单/.test(input)) {
          if (!nowSub) {
            return "toast://没有当前正在使用的订阅，导入个鸡毛！！！";
          }
          return $(
            "{{clipboard}}",
            "请输入群友分享的海阔单个小程序导入口令"
          ).input(
            (nowSub, cfg) => {
              input = input.trim();
              //log(nowSub.desc);
              if (!/^http/.test(input)) {
                return "toast://导入口令有误";
              }
              let url = input.split("\n")[0];
              let code = parsePaste(url);
              if (code.includes("base64://")) {
                let rule = code.split("@").slice(-1)[0];
                rule = base64Decode(rule);
                rule = JSON.parse(rule);
                let localRules = JSON.parse(fetch(nowSub.desc));
                let idex = (localRules || []).findIndex(
                  (it) => it.title === rule.title
                );
                if (idex > -1) {
                  //log('本地有。准备覆盖');
                  localRules[idex] = rule;
                  return $(
                    "检测到规则[" +
                      rule.title +
                      "]在你当前订阅列表[" +
                      nowSub.title +
                      "]中第" +
                      idex +
                      "位置，确认覆盖导入吗？"
                  ).confirm(
                    (nowSub, cfg, localRules) => {
                      writeFile(nowSub.desc, JSON.stringify(localRules));
                      require(getVar(
                        "sub依赖",
                        "https://dr.playdreamer.cn/js/subscribe.js"
                      ));
                      切换订阅(nowSub, cfg);
                      refreshPage(false);
                      return "toast://导入成功";
                    },
                    nowSub,
                    cfg,
                    localRules
                  );
                } else {
                  localRules.push(rule);
                  writeFile(nowSub.desc, JSON.stringify(localRules));
                  require(getVar(
                    "sub依赖",
                    "https://dr.playdreamer.cn/js/subscribe.js"
                  ));
                  切换订阅(nowSub, cfg);
                  refreshPage(false);
                  return "toast://导入成功";
                }
                //copy(rule);
                return "hiker://empty";
              } else {
                return (
                  "toast://只支持云剪切板分享的单个小程序，你输入的什么鬼？\n" +
                  input.substring(0, 30)
                );
              }
            },
            nowSub,
            cfg
          );
        } else if (/订阅/.test(input)) {
          return $("hiker://empty").rule(() => {
            addListener(
              "onClose",
              $.toString(() => {
                refreshPage(false); //刷新数据
              })
            );
            setPageTitle("订阅管理");
            require(getVar(
              "sub依赖",
              "https://dr.playdreamer.cn/js/subscribe.js"
            ));
            一级();
          });
        } else if (/依赖管理/.test(input)) {
          return $("hiker://empty").rule(() => {
            addListener(
              "onClose",
              $.toString(() => {
                refreshPage(false); //刷新数据
              })
            );
            setPageTitle("依赖管理");
            require(getVar(
              "sub依赖",
              "https://dr.playdreamer.cn/js/subscribe.js"
            ));
            一级依赖管理();
          });
        } else {
          return "toast://暂无功能";
        }
      },
      QING_TITLE,
      nowSub,
      cfg,
      disTabModify,
      disableHome
    ),
    col_type: "scroll_button",
  });

  el = el.concat(sub_buttons);

  return {
    el: el,
    subPath: path,
    subs: subs,
    sub_count: subs.length,
    nowData: nowData,
    nowSub: nowSub,
    cfg: cfg,
    cms_config: cms_config,
    iconApi: cms_config.iconApi || false,
  };
}

function 切换订阅(it, cfg) {
  //it必须传obj
  // let title = typeof(it)==='string'?it:it.title;
  let title = it.title;
  let pt = "hiker://files/rules/dzHouse/ruleCache/" + title + ".json";
  if (!fileExist(pt)) {
    writeFile(pt, "[]");
    // return 'toast://切换失败,本地没有此订阅对应的数据源，请尝试更新订阅'
  }
  try {
    JSON.parse(fetch(pt));
  } catch (e) {
    log("切换订阅失败:" + title + "\n" + e.message);
    return "toast://切换失败,本地此订阅数据源疑似损坏，请尝试更新订阅";
  }
  let code = fetch(pt);
  let appDataPath = "hiker://files/rules/dzHouse/ruleCache/cmsData.json";
  writeFile(appDataPath, code);
  let cms_config = JSON.parse(fetch(cfg) || "{}"); //读取配置
  if (cms_config.now !== title) {
    //切换到不同订阅写配置
    clearMyVar("typeShow"); //清理分类缓存
    cms_config.now = title;
    writeFile(cfg, JSON.stringify(cms_config));
    if (it.tabModify) {
      saveFile("disTabModify", "false");
    } else {
      //设置禁用自定义分类
      saveFile("disTabModify", "true");
    }
  }
  refreshPage(false);
  log("切换订阅成功:" + title);
  // return 'toast://轻合集数据源已切换，请返回轻合集主页查看';
  return "hiker://empty";
}

function 订阅导入(path) {
  return $("{{clipboard}}", "自动识别剪切板内容或手动输入口令").input(
    (path) => {
      if (!/轻合集订阅/.test(input)) {
        return "toast://无法识别的轻合集订阅导入口令.必须包含字符串 轻合集订阅";
      }
      try {
        input = input.split("\n")[1].trim();
        let text = parsePaste(input);
        let obj = JSON.parse(base64Decode(text));
        // log(obj);
        let subs = JSON.parse(fetch(path) || "[]"); //本地的订阅
        let subTitles = subs.map((it) => it.title); // 订阅标题

        if (Array.isArray(obj) && obj.length > 0) {
          //是订阅合集
          let newObj = obj.filter((it) => !subTitles.includes(it.title)); //全新的
          let oldObj = obj.filter((it) => subTitles.includes(it.title)); //覆盖的
          subs = subs.concat(newObj); // 先将全新的加入待导入数组
          let addCount = newObj.length; //新增的数量
          writeFile(path, JSON.stringify(subs)); //先写一次本地
          if (oldObj.length > 0) {
            return $("有" + oldObj.length + "条重名订阅,要更新覆盖吗?").confirm(
              (path, addCount, subs, oldObj) => {
                let oldTiltes = oldObj.map((it) => it.title);
                subs = subs.filter((it) => !oldTiltes.includes(it.title)); //删除旧的订阅
                subs = subs.concat(oldObj); // 先旧的加入待导入数组已除旧数组
                writeFile(path, JSON.stringify(subs));
                try {
                  require(getVar("sub依赖"));
                  更新单个订阅(subs[0]);
                } catch (e) {
                  log("导入后自动更新订阅失败:" + e.message);
                }
                refreshPage(false);
                return (
                  "toast://新增" +
                  addCount +
                  ",覆盖更新" +
                  oldObj.length +
                  "条记录。请手动更新订阅"
                );
              },
              path,
              addCount,
              subs,
              oldObj
            );
          } else {
            try {
              require(getVar("sub依赖"));
              更新单个订阅(subs[0]);
            } catch (e) {
              log("导入后自动更新订阅失败:" + e.message);
            }
            refreshPage(false);
            return "toast://导入成功" + addCount + "条记录。请手动更新订阅";
          }
        } else {
          //单条导入
          let idex = subTitles.indexOf(obj.title);
          if (idex < 0) {
            subs.push(obj);
            writeFile(path, JSON.stringify(subs));
            try {
              require(getVar("sub依赖"));
              更新单个订阅(obj);
            } catch (e) {
              log("导入后自动更新订阅失败:" + e.message);
            }
            refreshPage(false);
            return "toast://导入成功";
          } else {
            return $("检测到已有订阅:" + obj.title + ",是否覆盖?").confirm(
              (path, idex, obj) => {
                let subs = JSON.parse(fetch(path) || "[]");
                subs[idex] = obj;
                writeFile(path, JSON.stringify(subs));
                try {
                  require(getVar("sub依赖"));
                  更新单个订阅(obj);
                } catch (e) {
                  log("导入后自动更新订阅失败:" + e.message);
                }
                refreshPage(false);
                return "toast://覆盖并导入成功";
              },
              path,
              idex,
              obj
            );
          }
        }
      } catch (e) {
        return "toast://内容有误啊兄弟:" + input + "\n" + e.message;
      }
    },
    path
  );
}

function 一级依赖管理() {
  let d = [];
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let showMode = cms_config.showMode || "详细";
  let libMarks = cms_config.libMarks || [];
  let path = `hiker://files/rules/files/${MY_RULE.title}/require.json`;
  let backPath = "hiker://files/rules/dzHouse/ruleCache/libs/";
  let libspath = "hiker://files/libs/";
  let libs = JSON.parse(readFile("require.json", 0) || "[]");
  let libMode = getMyVar("libMode", "read");
  let option_col_type = "flex_button"; // scroll_button
  let lib_selected = storage0.getMyVar("lib_selected") || []; //获取已选择的依赖
  let options = {
    edit: "编辑",
    edit2: "外部编辑",
    read: "查看",
    mark: "标记",
    delete: "删除",
    check: "多选",
  };
  d.push({
    title: libMode === "edit" ? color("编辑", "#12b668") : "编辑",
    col_type: option_col_type,
    url: $("#noLoading#").lazyRule((path) => {
      if (getMyVar("libMode") === "edit") {
        return "editFile://" + path;
      } else {
        putMyVar("libMode", "edit");
        refreshPage(false);
        return "hiker://empty";
      }
    }, path),
  });
  Object.keys(options)
    .slice(1)
    .forEach((it) => {
      d.push({
        title: libMode === it ? color(options[it], "#12b668") : options[it],
        col_type: option_col_type,
        url: $("#noLoading#").lazyRule((libMode) => {
          if (getMyVar("libMode") === libMode) {
            return "hiker://empty";
          }
          putMyVar("libMode", libMode);
          refreshPage(false);
          return "hiker://empty";
        }, it),
      });
    });
  d.push({
    col_type: "blank_block",
    extra: {
      lineVisible: false,
    },
  });
  d.push({
    title: showMode === "详细" ? "🔛精简显示" : "🔛详细显示",
    col_type: "scroll_button",
    url: $("#noLoading##noHistory##noRecordHistory#").lazyRule(
      (cfg, showMode) => {
        let cms_config = JSON.parse(fetch(cfg) || "{}");
        if (showMode === "详细") {
          cms_config.showMode = "精简";
        } else {
          cms_config.showMode = "详细";
        }
        writeFile(cfg, JSON.stringify(cms_config));
        refreshPage(false);
        return "toast://已切换依赖列表显示为:" + cms_config.showMode;
      },
      cfg,
      showMode
    ),
  });
  d.push({
    title: "全选",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule((libs) => {
      storage0.putMyVar(
        "lib_selected",
        libs.map((it) => it.url)
      );
      refreshPage(false);
      return "hiker://empty";
    }, libs),
  });
  d.push({
    title: "反选",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule((libs) => {
      let lib_selected = storage0.getMyVar("lib_selected") || []; //获取已选择的依赖
      let lib_unselected = libs
        .filter((it) => !lib_selected.includes(it.url))
        .map((it) => it.url);
      storage0.putMyVar("lib_selected", lib_unselected);
      refreshPage(false);
      return "hiker://empty";
    }, libs),
  });
  d.push({
    title: "全不选",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      // storage0.putMyVar('lib_selected',[]);
      clearMyVar("lib_selected");
      refreshPage(false);
      return "hiker://empty";
    }),
  });
  d.push({
    title: "删除",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      let lib_selected = storage0.getMyVar("lib_selected") || []; //获取已选择的依赖
      if (lib_selected.length < 1) {
        return "toast://请选择至少一条记录后再试!";
      }
      return $(`确认删除已选择的${lib_selected.length}条依赖?`).confirm(
        (lib_selected) => {
          let libs = JSON.parse(readFile("require.json", 0) || "[]");
          let newlibs = libs.filter((it) => !lib_selected.includes(it.url));
          lib_selected.forEach((it) => {
            deleteCache(it);
          });
          saveFile("require.json", JSON.stringify(newlibs), 0);
          refreshPage(false);
          return "toast://已删除";
        },
        lib_selected
      );
    }),
  });
  d.push({
    title: "💼备份",
    col_type: "scroll_button",
    url: $("立即备份现有依赖文件?备份文件位置在:\n" + backPath).confirm(
      (libs, backPath) => {
        if (libs.length < 1) {
          return "toast://备份失败,暂无地依赖文件";
        }
        try {
          libs.forEach((it) => {
            let name = it.file.split("/").slice(-1)[0];
            let spath = backPath + name;
            let scode = fetch("file://" + it.file);
            log(spath + "=>" + scode.length);
            writeFile(spath, scode);
          });
          return "toast://备份成功";
        } catch (e) {
          return "toast://备份失败。备份过程中遇到错误:" + e.message;
        }
      },
      libs,
      backPath
    ),
  });
  d.push({
    title: "🔂恢复",
    col_type: "scroll_button",
    url: $(
      "立即恢复依赖文件?注意只会恢复本地依赖文件,不会恢复依赖列表。备份文件位置在:\n" +
        backPath
    ).confirm(
      (libspath, backPath) => {
        const File = require(getVar("file依赖"));
        let realpath = getPath(backPath).slice(7);
        let libs = File.getFilePath(realpath, null, ".js");
        log(libs);
        if (libs.length < 1) {
          return "toast://恢复失败,本地备份依赖文件不存在";
        }
        try {
          libs.forEach((it) => {
            let name = it.name;
            let rpath = libspath + name;
            let rcode = fetch("file://" + it.path);
            log(rpath + "=>" + rcode.length);
            let delCode = File.deleteFlies(getPath(rpath).slice(7));
            // log('删除结果:'+delCode);
            writeFile(rpath, rcode);
          });
          return "toast://恢复成功";
        } catch (e) {
          return "toast://恢复失败。恢复备份过程中遇到错误:" + e.message;
        }
      },
      libspath,
      backPath
    ),
  });
  d.push({
    title: "备份管理",
    url: $("#noLoading#").lazyRule((backPath) => {
      let f = require(getVar("选择文件依赖"));
      return f.fileSelectionUri({
        callback: $.toString(() => {
          // let target = findItem("filePath").extra;
          // updateItem("filePath", {
          //     extra: Object.assign(target, {
          //         defaultValue: PATH
          //     })
          // });
          // toast('选择了:'+PATH);
          // return true;
          return $("是否删除备份文件?\n" + PATH).confirm((PATH) => {
            const File = require(getVar("file依赖"));
            let delCode = File.deleteFlies(PATH);
            // log('文件'+PATH+'删除结果:'+delCode);
            if (delCode) {
              refreshPage(false);
              return "toast://删除成功!\n" + PATH;
            } else {
              return "toast://删除失败!\n" + PATH;
            }
          }, PATH);
        }),
        fileType: ".js|.json",
        requireUrl: getVar("选择文件依赖"),
        memory: false,
        pattern: 0,
        initialPath: getPath(backPath).slice(7),
        // rootDirPath:getPath("hiker://files/").slice(7),
        rootDirPath: getPath(backPath).slice(7),
      });
    }, backPath),
    col_type: "scroll_button",
  });
  d.push({
    title:
      "““”” " +
      ("【" + showMode + "】已有依赖列表:").bold().fontcolor("#757575") +
      libs.length +
      " " +
      color("点此编辑", "#5FB878"),
    col_type: "text_1",
    url: $("#noLoading##noHistory##noRecordHistory#").lazyRule((path) => {
      let status = fetch("hiker://home@JSON编辑器");
      let hasJsonEditor = status && status !== "null";
      if (!hasJsonEditor) {
        return "editFile://" + path;
      } else {
        return (
          "hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json=" +
          base64Encode(path)
        );
      }
    }, path),
    extra: {
      lineVisible: false,
    },
  });

  d.push({
    title: "搜索",
    desc: "输入依赖地址|标记进行搜索...",
    url: $.toString(() => {
      refreshPage(false);
    }),
    col_type: "input",
    extra: {
      onChange: "putMyVar('libsKey',input)",
      titleVisible: true,
      defaultValue: getMyVar("libsKey", ""),
    },
  });

  function getMark(url) {
    let idx = libMarks.findIndex((it) => it.url === url);
    return idx > -1 ? libMarks[idx].mark : "";
  }
  function getUrl(it, idx) {
    let mk = getMark(it.url);
    if (libMode === "delete") {
      return $("确认删除依赖:" + it.url + " " + mk).confirm(
        (it, path, mk) => {
          let libs = JSON.parse(readFile("require.json", 0) || "[]");
          let idex = libs.findIndex((its) => its.url === it.url);
          if (idex < 0) {
            return "toast://你在卡bug???";
          }
          deleteCache(libs[idex].url);
          libs.splice(idex, 1);
          saveFile("require.json", JSON.stringify(libs), 0);
          refreshPage(false);
          return "toast://已删除:" + path + "=>" + it.url + " " + mk;
        },
        it,
        path,
        mk
      );
    } else if (libMode === "edit") {
      return "editFile://file://" + it.file;
    } else if (libMode === "edit2") {
      return "openFile://file://" + it.file;
    } else if (libMode === "mark") {
      return $(
        mk,
        "给此依赖打个标记吧，说明此依赖是干嘛的!比如道德经订阅"
      ).input(
        (it, path, cfg, libMarks) => {
          let idx = libMarks.findIndex((its) => its.url === it.url);
          let cms_config = JSON.parse(fetch(cfg) || "{}");
          if (idx > -1) {
            libMarks[idx].mark = input;
          } else {
            libMarks.push({ url: it.url, mark: input });
          }
          cms_config.libMarks = libMarks;
          writeFile(cfg, JSON.stringify(cms_config));
          refreshPage(false);
          return "toast://已标记为:" + input;
        },
        it,
        path,
        cfg,
        libMarks
      );
    } else if (libMode === "read") {
      return $("hiker://empty#noLoading##noHistory##noRecordHistory#").rule(
        (it, mark) => {
          let d = [];
          let t = it.url.split("/").slice(-1)[0];
          if (t.includes("?id=")) {
            t = t.split("?id=")[1];
          }
          let tm = $.dateFormat(new Date(it.accessTime), "yyyy-MM-dd HH:mm:ss");
          mark = mark ? `插件标记:${mark}\n` : "";
          let title = `${mark}插件名称:${t}\n远程地址:${it.url}\n本地缓存:${it.file}\n更新时间:${tm}`;
          setPageTitle("插件详情");
          d.push({
            title: title,
            col_type: "long_text",
          });
          setResult(d);
        },
        it,
        mk
      );
    } else if (libMode === "check") {
      return $("#noLoading#").lazyRule(
        (url, idx, libMarks) => {
          require(getVar("sub依赖"));
          function getMark(url) {
            let idx = libMarks.findIndex((it) => it.url === url);
            return idx > -1 ? libMarks[idx].mark : "";
          }
          let head = "[" + idx + "]";
          let t = url.split("/").slice(-1)[0];
          if (t.includes("?id=")) {
            t = t.split("?id=")[1];
          }
          let title = head + t;
          let mk = getMark(url);
          mk = mk ? `(${mk})` : mk;
          title += mk;
          let data = storage0.getMyVar("lib_selected") || []; //获取已选择的依赖
          let idex = data.findIndex((its) => its === url);
          let sel;
          if (idex > -1) {
            data.splice(idex, 1);
            sel = false;
          } else {
            data.push(url);
            sel = true;
          }
          storage0.putMyVar("lib_selected", data);
          let newTitle = sel ? small(color(title, "#12b668")) : small(title);
          updateItem(url, {
            title: newTitle,
          });
          return "hiker://empty";
        },
        it.url,
        idx,
        libMarks
      );
    }
    return "toast://开发中:" + libMode;
  }
  let libsKey = getMyVar("libsKey", "");
  if (libsKey) {
    libs = libs.filter(
      (it) => it.url.includes(libsKey) || getMark(it.url).includes(libsKey)
    );
  }
  libs.forEach((it, idx) => {
    let head = "[" + idx + "]";
    let t = it.url.split("/").slice(-1)[0];
    if (t.includes("?id=")) {
      t = t.split("?id=")[1];
    }
    let title = head + t;
    let mk = getMark(it.url);
    mk = mk ? `(${mk})` : mk;
    title += mk;
    d.push({
      title:
        lib_selected.findIndex((its) => its === it.url) > -1
          ? small(color(title, "#12b668"))
          : small(title),
      desc: small(it.url + "\n" + it.file),
      url: getUrl(it, idx),
      col_type: showMode === "精简" ? "flex_button" : "text_1",
      extra: {
        id: it.url,
      },
    });
  });
  setResult(d);
}

function 一级() {
  addListener(
    "onRefresh",
    $.toString(() => {
      //监听刷新
      clearMyVar("checked"); //清除多选记录
    })
  );
  addListener(
    "onClose",
    $.toString(() => {
      clearMyVar("checked"); //清除多选记录
      refreshPage(false); //刷新数据
    })
  );
  let d = [];
  d.push({
    // title:'🆙升级',
    title: "⬆️升级",
    col_type: "scroll_button",
    url: $(
      "不同于外部的检测升级,此按钮将强行清空本程序所有依赖文件，是否继续?"
    ).confirm(() => {
      deleteCache();
      refreshPage(false);
      return "toast://已清除缓存,下次调用将自动更新";
    }),
  });

  const path = "hiker://files/rules/dzHouse/ruleCache/sub.json";
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";

  d.push({
    title: getMyVar("subMode", "edit") === "export" ? "✅导出" : "导出",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      putMyVar("subMode", "export");
      refreshPage(false);
      return "hiker://empty";
    }),
  });

  d.push({
    title: getMyVar("subMode", "edit") === "edit" ? "✅编辑" : "编辑",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule((path) => {
      if (getMyVar("subMode") === "edit") {
        return "editFile://" + path;
      } else {
        putMyVar("subMode", "edit");
        refreshPage(false);
        return "hiker://empty";
      }
    }, path),
  });
  d.push({
    title: getMyVar("subMode", "edit") === "delete" ? "✅删除" : "删除",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      putMyVar("subMode", "delete");
      refreshPage(false);
      return "hiker://empty";
    }),
  });
  d.push({
    title: getMyVar("subMode", "edit") === "change" ? "✅切换" : "切换",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      putMyVar("subMode", "change");
      refreshPage(false);
      return "hiker://empty";
    }),
  });
  d.push({
    title: getMyVar("subMode", "edit") === "update" ? "✅更新" : "更新",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      putMyVar("subMode", "update");
      refreshPage(false);
      return "hiker://empty";
    }),
  });
  d.push({
    title: getMyVar("subMode", "edit") === "check" ? "✅多选" : "多选",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      putMyVar("subMode", "check");
      refreshPage(false);
      return "hiker://empty";
    }),
  });
  d.push({
    col_type: "blank_block",
    extra: {
      lineVisible: false,
    },
  });
  d.push({
    title: "📥导入",
    col_type: "scroll_button",
    url: 订阅导入(path),
  });

  d.push({
    title: "🗒添加",
    col_type: "scroll_button",
    url: $("hiker://empty#noHistory##noRecordHistory#").rule(() => {
      require(getVar("sub依赖"));
      添加订阅();
    }),
  });
  d.push({
    title: "🔄更新订阅",
    col_type: "scroll_button",
    url: $("确认更新订阅,立即执行?将会多任务执行订阅列表里的记录").confirm(
      (path, cfg) => {
        let subs = JSON.parse(fetch(path) || "[]");
        require(getVar("sub依赖"));
        var task = 更新单个订阅;
        var active_subs = subs.filter((it) => it.active); //筛选开启更新的订阅
        var close_subs = subs.filter((it) => !it.active); //筛选关闭更新的订阅
        var count = active_subs.length; //设置任务数量
        if (count < 1) {
          return "toast://没有需要更新的订阅!";
        }
        let tasks = active_subs.map((it, idex) => {
          return {
            func: task,
            param: {
              title: it.title,
              // rule:it.rule,
              url: it.url,
              code: it.code,
            },
            id: "task" + idex,
          };
        });
        var subRet = [];
        showLoading("并发更新订阅中，剩余订阅数:" + count);
        be(tasks, {
          func: function (obj, id, error, ret) {
            log("监听到任务" + id + "已结束,error:" + error + ",ret:" + ret);
            subRet.push({
              task: id,
              ret: ret,
              title: tasks.filter((it) => it.id === id)[0].param.title,
            });
            count -= 1; //完成了任务，任务数量-1
            // log(subRet);
            //log(obj);
            if (count > 0) {
              showLoading("并发更新订阅中，剩余订阅数:" + count);
            } else {
              hideLoading();
            }
          },
          param: {
            //传到监听函数的obj参数里
            hi: "ccc",
          },
        }); //执行多任务
        log("多任务执行结果数:" + subRet.length);
        let success_ret = subRet.filter((it) => /成功/.test(it.ret));
        log("多任务成功结果:" + JSON.stringify(success_ret));

        let cms_config = JSON.parse(fetch(cfg) || "{}");

        if (
          success_ret.filter((it) => it.title === cms_config.now).length > 0
        ) {
          //更新了，自动把已切换的写入本地
          require(getVar("sub依赖"));
          log(
            "检测到更新的订阅列表里有正在使用的记录,切换该订阅的本地数据:" +
              cms_config.now
          );
          let obj = success_ret.filter((it) => it.title === cms_config.now)[0];
          切换订阅(obj, cfg);
        }
        return (
          "toast://本次成功更新订阅" +
          success_ret.length +
          "/" +
          tasks.length +
          "个，另外" +
          close_subs.length +
          "个未设置并发更新.详情看日志"
        );
      },
      path,
      cfg
    ),
  });
  let backPath = "hiker://files/rules/dzHouse/ruleCache/订阅备份/sub.json";
  d.push({
    title: "💼备份",
    col_type: "scroll_button",
    url: $("立即备份订阅文件?备份文件位置在:\n" + backPath).confirm(
      (path, backPath) => {
        if (!fileExist(path)) {
          return "toast://备份失败,本地订阅文件不存在";
        }
        let subCode = fetch(path);
        try {
          let html = JSON.parse(subCode);
          if (Array.isArray(html)) {
            writeFile(backPath, subCode);
            return "toast://备份成功";
          } else {
            return "toast://本地订阅文件不正确。备份失败";
          }
        } catch (e) {
          return "toast://备份失败。备份过程中遇到错误:" + e.message;
        }
      },
      path,
      backPath
    ),
  });
  d.push({
    title: "🔂恢复",
    col_type: "scroll_button",
    url: $("立即恢复订阅文件?备份文件位置在:\n" + backPath).confirm(
      (path, backPath) => {
        if (!fileExist(backPath)) {
          return "toast://恢复失败,本地备份文件不存在";
        }
        let subCode = fetch(backPath);
        try {
          let html = JSON.parse(subCode);
          if (Array.isArray(html)) {
            writeFile(path, subCode);
            refreshPage(true); //刷新true
            return "toast://恢复成功";
          } else {
            return "toast://本地订阅备份文件不正确。恢复失败";
          }
        } catch (e) {
          return "toast://恢复失败。恢复备份过程中遇到错误:" + e.message;
        }
      },
      path,
      backPath
    ),
  });
  d.push({
    col_type: "blank_block",
  });
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let nowData = cms_config.now || "";
  let showMode = cms_config.showMode || "详细";
  let iconApi =
    cms_config.iconApi || "http://1.117.152.239:39000/tupian.php?text=";
  let withDelete = cms_config.withDelete || false;
  d.push({
    title: showMode === "详细" ? "🔛精简显示" : "🔛详细显示",
    col_type: "scroll_button",
    url: $("#noLoading##noHistory##noRecordHistory#").lazyRule(
      (cfg, showMode) => {
        let cms_config = JSON.parse(fetch(cfg) || "{}");
        if (showMode === "详细") {
          cms_config.showMode = "精简";
        } else {
          cms_config.showMode = "详细";
        }
        writeFile(cfg, JSON.stringify(cms_config));
        refreshPage(false);
        return "toast://已切换订阅列表显示为:" + cms_config.showMode;
      },
      cfg,
      showMode
    ),
  });
  d.push({
    title: "☯️道长内置",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule((path) => {
      let subs = JSON.parse(fetch(path) || "[]");
      let idex = subs.map((it) => it.title).indexOf("道长资源");
      let url = "http://hiker.nokia.press/hikerule/zyw_data/27";
      // let desc = 'hiker://files/rules/dzHouse/ruleCache/'+md5(url)+'.json';
      let desc = "hiker://files/rules/dzHouse/ruleCache/道长资源.json";
      require(getVar("sub依赖"));
      let func_tmp = function (url, title, ua) {
        require(getVar("sub依赖"));
        return 道长cms(url, title, ua);
      };
      let obj = {
        title: "道长资源",
        url: url,
        desc: desc,
        // code:道长cms.toString().replace('道长cms','').trim()
        code: func_tmp.toString().trim(),
        // code:$.toString(道长cms).replace('道长cms','').trim()
      };
      if (idex > -1) {
        subs[idex] = obj;
      } else {
        subs.push(obj);
      }
      writeFile(path, JSON.stringify(subs));
      refreshPage(false);
      return "toast://已给出道长内置订阅方案";
    }, path),
  });
  d.push({
    title: "™️文字图标",
    col_type: "scroll_button",
    url: $(iconApi, "请输入文字图标的接口").input((cfg) => {
      let iconApi = input.trim();
      if (!/^http/.test(iconApi)) {
        return "toast://接口地址有误，必须是http开头";
      }
      let cms_config = JSON.parse(fetch(cfg) || "{}");
      cms_config.iconApi = iconApi;
      writeFile(cfg, JSON.stringify(cms_config));
      refreshPage(false);
      return "toast://已修改文字图标接口为:" + cms_config.iconApi;
    }, cfg),
  });

  d.push({
    title: withDelete ? color("⏏️同删", "#900a0a") : color("⏏️同删", "#15ab21"),
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(
      (cfg, cms_config, withDelete) => {
        if (withDelete) {
          cms_config.withDelete = false;
          writeFile(cfg, JSON.stringify(cms_config));
          clearMyVar("checked"); //清除多选记录
          refreshPage(false);
          return "hiker://empty";
        } else {
          return $(
            "修仙法力无边",
            "危险操作!你正在尝试开启删除订阅自动删本地该数据功能,请输入验证码"
          ).input(
            (cfg, cms_config) => {
              if (/道长修仙法力无边/.test(input)) {
                cms_config.withDelete = true;
                writeFile(cfg, JSON.stringify(cms_config));
                clearMyVar("checked"); //清除多选记录
                refreshPage(false);
                return "toast://删除订阅 同时删除订阅数据功能已开启，以后删订阅时要谨慎操作了!";
              } else {
                return "toast://验证码错误,操作取消";
              }
            },
            cfg,
            cms_config
          );
        }
      },
      cfg,
      cms_config,
      withDelete
    ),
  });

  let subs = JSON.parse(fetch(path) || "[]");

  d.push({
    title:
      "““”” " +
      ("【" + showMode + "】已有订阅列表:").bold().fontcolor("#757575") +
      subs.length +
      " " +
      color("点此编辑", "#5FB878"),
    col_type: "text_1",
    url: $("#noLoading##noHistory##noRecordHistory#").lazyRule((path) => {
      let status = fetch("hiker://home@JSON编辑器");
      let hasJsonEditor = status && status !== "null";
      if (!hasJsonEditor) {
        return "editFile://" + path;
      } else {
        return (
          "hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json=" +
          base64Encode(path)
        );
      }
    }, path),
    extra: {
      lineVisible: false,
    },
  });
  d.push({
    title: "搜索",
    desc: "输入订阅标题|地址进行搜索...",
    url: $.toString(() => {
      refreshPage(false);
    }),
    col_type: "input",
    extra: {
      onChange: "putMyVar('subKey',input)",
      titleVisible: true,
      defaultValue: getMyVar("subKey", ""),
    },
  });
  let otips = getMyVar("subMode") === "order" ? "🔀" : "";
  d.push({
    title:
      getMyVar("subFilter", "all") === "all"
        ? color(otips + "全部", "#12b668")
        : "全部",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      clearMyVar("checked"); //清除多选记录
      if (getMyVar("subFilter", "all") === "all") {
        if (getMyVar("subMode") === "order") {
          // putMyVar('subMode','change');
          putMyVar("subMode", "edit");
        } else {
          putMyVar("subMode", "order");
        }
        refreshPage(false);
        return "hiker://empty";
      } else {
        putMyVar("subFilter", "all");
        refreshPage(false);
        return "hiker://empty";
      }
    }),
  });
  d.push({
    title:
      getMyVar("subFilter", "all") === "default"
        ? color("默认", "#12b668")
        : "默认",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      if (getMyVar("subFilter") !== "default") {
        putMyVar("subFilter", "default");
        clearMyVar("checked"); //清除多选记录
        refreshPage(false);
      }
      return "hiker://empty";
    }),
  });
  d.push({
    title:
      getMyVar("subFilter", "all") === "diy"
        ? color("自定义", "#12b668")
        : "自定义",
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(() => {
      if (getMyVar("subFilter") !== "diy") {
        putMyVar("subFilter", "diy");
        clearMyVar("checked"); //清除多选记录
        refreshPage(false);
      }
      return "hiker://empty";
    }),
  });
  d.push({
    title: color("全选", "#DA70D6"),
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(
      (path, color) => {
        putMyVar("subMode", "check"); //切换为多选
        // refreshPage(false);//刷新界面->别刷新,会影响动态更新元素
        let checked = JSON.parse(getMyVar("checked", "[]")); //获取 已经选择的
        let subs = JSON.parse(fetch(path) || "[]");
        if (getMyVar("subKey", "")) {
          //搜索
          subs = subs.filter(
            (it) =>
              it.title.includes(getMyVar("subKey")) ||
              it.url.includes(getMyVar("subKey"))
          );
        }
        if (getMyVar("subFilter", "all") === "default") {
          subs = subs.filter((it) => !it.tabModify);
        } else if (getMyVar("subFilter", "all") === "diy") {
          subs = subs.filter((it) => it.tabModify);
        }
        checked = subs.map((it) => it.title);
        checked.forEach((it) => {
          updateItem({ title: color(it, "#12b668"), extra: { id: it } });
        });
        putMyVar("checked", JSON.stringify(checked));
        return "hiker://empty";
      },
      path,
      color
    ),
  });
  d.push({
    title: color("操作", "#1379CB"),
    col_type: "scroll_button",
    url: $("#noLoading#").lazyRule(
      (path, color) => {
        let checked = JSON.parse(getMyVar("checked", "[]")); //获取 已经选择的
        if (!Array.isArray(checked)) {
          return "toast://未知错误,选中的项目数据不是数组???";
        }
        if (checked.length < 1) {
          return "toast://至少选中一项才能进行操作";
        }
        let c1 = "#15ab21";
        let c2 = "#900a0a";
        let sel_title = [
          "导出",
          "删除",
          color("并发更新:开", c1),
          color("并发更新:关", c2),
          color("自定义分类:开", c1),
          color("自定义分类:关", c2),
        ];
        return $(sel_title, 2, "选" + checked.length + "个项目做什么?").select(
          (path, checked) => {
            input = /font/.test(input)
              ? input.split(">")[1].split("<")[0]
              : input;
            let subs = JSON.parse(fetch(path) || "[]");
            switch (input) {
              case "导出":
                subs = subs.filter((it) => checked.includes(it.title)); //筛选要导出的
                let shareText = base64Encode(JSON.stringify(subs));
                var pastes = getPastes();
                var url = sharePaste(shareText, pastes.slice(-1)[0]);
                let import_rule =
                  "轻合集订阅合集：" +
                  subs[0].title +
                  "等" +
                  subs.length +
                  "条" +
                  "\n" +
                  url;
                copy(import_rule);
                return "toast://已导出并复制到剪切板，快去分享吧";
              case "删除":
                let toDelete = subs.filter((it) => checked.includes(it.title)); //筛选选中的
                let toDeleteNames = toDelete.map((it) => it.desc); // 获取缓存目录
                subs = subs.filter((it) => !checked.includes(it.title)); //利用过滤器删除被选择的
                const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
                let cms_config = JSON.parse(fetch(cfg) || "{}");
                let withDelete = cms_config.withDelete || false;
                let extips = withDelete
                  ? "\n注意:本次操作将同时删除本地的订阅数据!!!"
                  : "";
                return $(
                  "确认删除?删除后还剩余" + subs.length + "条订阅记录" + extips
                ).confirm(
                  (path, subs, cnt, toDeleteNames, withDelete) => {
                    writeFile(path, JSON.stringify(subs));
                    if (withDelete) {
                      //同步删除本地的数据文件
                      try {
                        const File = require(getVar("file依赖"));
                        toDeleteNames.forEach((it) => {
                          let realpath = getPath(it).replace("file://", "");
                          if (File.deleteFlies(realpath)) {
                            log("已删除:" + it);
                          } else {
                            log("未删除:" + realpath);
                          }
                        });
                      } catch (e) {
                        log("发生错误:" + e.message);
                      }
                    }
                    clearMyVar("checked"); //清除多选记录
                    refreshPage(false);
                    return (
                      "toast://已删除" +
                      cnt +
                      "条记录。本地剩余:" +
                      subs.length +
                      "条订阅"
                    );
                  },
                  path,
                  subs,
                  toDelete.length,
                  toDeleteNames,
                  withDelete
                );
              case "并发更新:开":
                return $(
                  "确认将选中的" +
                    checked.length +
                    "条订阅记录设置并发更新属性为开启?"
                ).confirm(
                  (path, subs, checked) => {
                    var newSubs = [];
                    subs.forEach((it) => {
                      if (checked.includes(it.title)) {
                        //选中项目在里面
                        it.active = true;
                      }
                      newSubs.push(it);
                    });
                    writeFile(path, JSON.stringify(newSubs));
                    clearMyVar("checked"); //清除多选记录
                    refreshPage(false);
                    return "toast://已设置" + checked.length + "并发更新:开";
                  },
                  path,
                  subs,
                  checked
                );
              case "并发更新:关":
                return $(
                  "确认将选中的" +
                    checked.length +
                    "条订阅记录设置并发更新属性为关闭?"
                ).confirm(
                  (path, subs, checked) => {
                    var newSubs = [];
                    subs.forEach((it) => {
                      if (checked.includes(it.title)) {
                        //选中项目在里面
                        it.active = false;
                      }
                      newSubs.push(it);
                    });
                    writeFile(path, JSON.stringify(newSubs));
                    clearMyVar("checked"); //清除多选记录
                    refreshPage(false);
                    return (
                      "toast://已设置" + checked.length + "条记录并发更新:关"
                    );
                  },
                  path,
                  subs,
                  checked
                );
              case "自定义分类:开":
                return $(
                  "确认将选中的" +
                    checked.length +
                    "条订阅记录设置自定义分类属性为开启"
                ).confirm(
                  (path, subs, checked) => {
                    var newSubs = [];
                    subs.forEach((it) => {
                      if (checked.includes(it.title)) {
                        //选中项目在里面
                        it.tabModify = true;
                      }
                      newSubs.push(it);
                    });
                    writeFile(path, JSON.stringify(newSubs));
                    clearMyVar("checked"); //清除多选记录
                    refreshPage(false);
                    return (
                      "toast://已设置" + checked.length + "条记录自定义分类:开"
                    );
                  },
                  path,
                  subs,
                  checked
                );
              case "自定义分类:关":
                return $(
                  "确认将选中的" +
                    checked.length +
                    "条订阅记录设置自定义分类属性为关闭?"
                ).confirm(
                  (path, subs, checked) => {
                    var newSubs = [];
                    subs.forEach((it) => {
                      if (checked.includes(it.title)) {
                        //选中项目在里面
                        it.tabModify = false;
                      }
                      newSubs.push(it);
                    });
                    writeFile(path, JSON.stringify(newSubs));
                    clearMyVar("checked"); //清除多选记录
                    refreshPage(false);
                    return (
                      "toast://已设置" + checked.length + "条记录自定义分类:关"
                    );
                  },
                  path,
                  subs,
                  checked
                );
            }
            return "toast://" + input;
          },
          path,
          checked
        );
      },
      path,
      color
    ),
  });
  let sub_length = subs.length;
  if (getMyVar("subKey", "")) {
    //搜索
    subs = subs.filter(
      (it) =>
        it.title.includes(getMyVar("subKey")) ||
        it.url.includes(getMyVar("subKey"))
    );
  }

  if (getMyVar("subFilter", "all") === "default") {
    subs = subs.filter((it) => !it.tabModify);
  } else if (getMyVar("subFilter", "all") === "diy") {
    subs = subs.filter((it) => it.tabModify);
  }

  function getUrl(it) {
    let mode = getMyVar("subMode", "edit");
    if (mode === "delete") {
      let extips = withDelete
        ? "\n注意:本次操作将同时删除本地的订阅数据!!!"
        : "";
      return $("确认删除订阅:" + it.title + extips).confirm(
        (it, path, withDelete) => {
          let subs = JSON.parse(fetch(path) || "[]");
          let idex = subs.map((it) => it.title).indexOf(it.title);
          if (idex < 0) {
            return "toast://你在卡bug???";
          }
          subs.splice(idex, 1);
          writeFile(path, JSON.stringify(subs));
          if (withDelete) {
            //同步删除本地的数据文件
            try {
              const File = require(getVar("file依赖"));
              let realpath = getPath(it.desc).replace("file://", "");
              if (File.deleteFlies(realpath)) {
                log("已删除:" + it.desc);
              } else {
                log("未删除:" + realpath);
              }
            } catch (e) {
              log("发生错误:" + e.message);
            }
          }
          refreshPage(false);
          return "toast://已删除:" + path + "=>" + it.url;
        },
        it,
        path,
        withDelete
      );
    } else if (mode === "export") {
      return $("#noLoading#").lazyRule((it) => {
        let shareText = base64Encode(JSON.stringify(it));
        var pastes = getPastes();
        var url = sharePaste(shareText, pastes.slice(-1)[0]);
        let import_rule = "轻合集订阅：" + it.title + "\n" + url;
        copy(import_rule);
        return "toast://已导出并复制到剪切板，快去分享吧";
      }, it);
    } else if (mode === "change") {
      return $("#noLoading#").lazyRule(
        (it, cfg, nowData) => {
          require(getVar("sub依赖"));
          if (nowData === it.title) {
            切换订阅(it, cfg);
            return (
              "editFile://hiker://files/rules/dzHouse/ruleCache/" +
              it.title +
              ".json"
            );
          } else {
            return 切换订阅(it, cfg);
          }
        },
        it,
        cfg,
        nowData
      );
    } else if (mode === "update") {
      return $("#noLoading#").lazyRule((it) => {
        require(getVar("sub依赖"));
        try {
          ret = 更新单个订阅(it);
          log(ret);
          return "toast://" + ret;
        } catch (e) {
          ret = "更新失败:" + e.message;
          log(ret);
          return "toast://" + ret;
        }
      }, it);
    } else if (mode === "check") {
      return $("#noLoading#").lazyRule(
        (it, color) => {
          let checked = JSON.parse(getMyVar("checked", "[]")); //获取 已经选择的
          if (checked.includes(it.title)) {
            checked.splice(checked.indexOf(it.title), 1); //删除
            updateItem({ title: it.title, extra: { id: it.title } });
          } else {
            updateItem({
              title: color(it.title, "#12b668"),
              extra: { id: it.title },
            });
            checked.push(it.title);
          }
          putMyVar("checked", JSON.stringify(checked));
          return "hiker://empty";
        },
        it,
        color
      );
    } else if (mode === "order") {
      return $("#noLoading#").lazyRule(
        (it, path, sub_length) => {
          if (!getMyVar("to_move")) {
            if (!getMyVar("subKey", "")) {
              updateItem({ title: "🔃" + it.title, extra: { id: it.title } });
              putMyVar("to_move", JSON.stringify(it));
              return "toast://请选择要移动的位置";
            } else {
              let subs = JSON.parse(fetch(path) || "[]");
              let subTitles = subs.map((it) => it.title);
              let start = subTitles.indexOf(it.title) + ""; //转为字符串,默认值传数字0会视为hiker://empty
              return $(
                start,
                "请输入要移动到的位置，不能超过" + (sub_length - 1)
              ).input(
                (sub_length, start, path, subs) => {
                  if (!Number(input)) {
                    return "toast://请输入0到" + (sub_length - 1) + "的数字";
                  }
                  if (Number(input) > sub_length - 1) {
                    return "toast://再乱输我要收拾你!";
                  }
                  if (Number(input) !== start) {
                    let sitem = subs.splice(start, 1)[0]; //删除指定位置的元素并取出来
                    subs.splice(Number(input), 0, sitem); // 添加到上个位置
                    writeFile(path, JSON.stringify(subs));
                  }
                  clearMyVar("to_move");
                  refreshPage(false);
                  // return 'toast://已移动'
                  return "hiker://empty";
                },
                sub_length,
                start,
                path,
                subs
              );
            }
          } else {
            let to_move = JSON.parse(getMyVar("to_move"));
            let subs = JSON.parse(fetch(path) || "[]");
            let subTitles = subs.map((it) => it.title);

            let start = subTitles.indexOf(to_move.title);
            let end = subTitles.indexOf(it.title);
            // log('从'+start+'移动到:'+end);
            if (start !== end) {
              //两个位置不同，进行移动
              let sitem = subs.splice(start, 1)[0]; //删除指定位置的元素并取出来
              subs.splice(end, 0, sitem); // 添加到上个位置
              writeFile(path, JSON.stringify(subs));
            }
            clearMyVar("to_move");
            refreshPage(false);
            // return 'toast://已移动'
            return "hiker://empty";
          }
        },
        it,
        path,
        sub_length
      );
    } else {
      return $("hiker://empty#noHistory##noRecordHistory#").rule((it) => {
        require(getVar("sub依赖"));
        编辑订阅(it);
      }, it);
    }
  }
  subs.forEach((it, idx) => {
    let head = "[" + idx + "]";
    head = it.active ? color(head, "#15ab21") : color(head, "#900a0a");
    let title = nowData === it.title ? color(it.title, "#ff7000") : it.title;
    title = head + title;
    if (showMode === "详细" && it.tabModify) {
      title += "♾️"; //diy
    }
    d.push({
      title: title,
      desc: it.url + "\n" + it.desc,
      url: getUrl(it),
      col_type: showMode === "精简" ? "text_3" : "text_1",
      extra: {
        id: it.title,
      },
    });
  });
  setResult(d);
}

function 保存修改订阅(it) {
  if (
    !getMyVar("new_subUrl", "") ||
    !/^http|^hiker|^file|^\/storage\/|^\/sdcard\//.test(
      getMyVar("new_subUrl", "")
    )
  ) {
    return "toast://订阅地址不正确!\n" + getMyVar("new_subUrl", "");
  }
  if (!getMyVar("new_subName", "")) {
    return "toast://请填写订阅名称";
  }
  let path = "hiker://files/rules/dzHouse/ruleCache/sub.json";
  let subs = JSON.parse(fetch(path) || "[]");
  let idex = subs.map((it) => it.title).indexOf(it.title);
  if (idex < 0) {
    return "toast://你在卡bug???";
  }
  // log('当前订阅位置:'+idex);
  // let pt = 'hiker://files/rules/dzHouse/ruleCache/'+md5(getMyVar('new_subUrl'))+'.json';
  let title = getMyVar("new_subName").trim();
  let pt = "hiker://files/rules/dzHouse/ruleCache/" + title + ".json";
  let def_tabModify = it.tabModify ? "是" : "否";
  let def_active = it.active ? "是" : "否";
  let tabModify = getMyVar("new_tabModify", def_tabModify) === "是";
  let active = getMyVar("new_active", def_active) === "是";
  let obj = {
    title: title,
    url: getMyVar("new_subUrl").trim(),
    desc: pt,
    tabModify: tabModify,
    active: active,
    code: getMyVar("new_subCode", "").trim(),
  };
  subs[idex] = obj;
  writeFile(path, JSON.stringify(subs));
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  if (cms_config.now === it.title) {
    //当前正在使用的被修改,同步更新自定义分类
    log("当前使用源被修改,检测同步自定义分类属性:" + tabModify);
    if (it.tabModify !== tabModify) {
      //换了分类自定义属性清空已选分类
      clearMyVar("typeShow"); //清理分类缓存
    }
    if (tabModify) {
      saveFile("disTabModify", "false");
    } else {
      //设置禁用自定义分类
      saveFile("disTabModify", "true");
    }
  }
  back(true);
  return "toast://已保存";
}

function 编辑订阅(it) {
  addListener(
    "onClose",
    $.toString(() => {
      clearMyVar("new_tabModify");
      clearMyVar("new_active");
      refreshPage(); //刷新数据
    })
  );
  let d = [];
  d.push({
    title: "名称",
    desc: "订阅名称,比如道长资源",
    col_type: "input",
    extra: {
      defaultValue: it.title,
      onChange: "putMyVar('new_subName',input)",
    },
  });
  d.push({
    title: "地址",
    desc: "订阅地址,可以是base64数据",
    col_type: "input",
    extra: {
      defaultValue: it.url,
      onChange: "putMyVar('new_subUrl',input)",
    },
  });
  let tabModify_tips = "自定义分类: ";
  let def_tabModify = it.tabModify ? "是" : "否";
  d.push({
    title: tabModify_tips + getMyVar("new_tabModify", def_tabModify),
    col_type: "text_2",
    url: $("#noLoading#").lazyRule(
      (tabModify_tips, def_tabModify) => {
        if (getMyVar("new_tabModify", def_tabModify) === "否") {
          putMyVar("new_tabModify", "是");
        } else {
          putMyVar("new_tabModify", "否");
        }
        updateItem({
          title: tabModify_tips + getMyVar("new_tabModify"),
          extra: { id: "item_tabModify" },
        });
        return "hiker://empty";
      },
      tabModify_tips,
      def_tabModify
    ),
    extra: { id: "item_tabModify" },
  });
  let active_tips = "并发更新: ";
  let def_active = it.active ? "是" : "否";
  d.push({
    title: active_tips + getMyVar("new_active", def_active),
    col_type: "text_2",
    url: $("#noLoading#").lazyRule(
      (active_tips, def_active) => {
        if (getMyVar("new_active", def_active) === "否") {
          putMyVar("new_active", "是");
        } else {
          putMyVar("new_active", "否");
        }
        updateItem({
          title: active_tips + getMyVar("new_active"),
          extra: { id: "item_active" },
        });
        return "hiker://empty";
      },
      active_tips,
      def_active
    ),
    extra: { id: "item_active" },
  });
  d.push({
    title: "代码",
    desc: "请输入订阅代码,可空或者函数返回数组列表字符串function(url,title,ua,noIcon){return JSON.stringify(obj)}",
    col_type: "input",
    extra: {
      defaultValue: it.code,
      // titleVisible: false,
      type: "textarea",
      // height:-1,
      textSize: 13,
      height: 10,
      onChange: "putMyVar('new_subCode',input)",
    },
  });
  d.push({
    title: "保存",
    col_type: "text_3",
    url: $("#noLoading#").lazyRule((it) => {
      require(getVar("sub依赖"));
      return 保存修改订阅(it);
    }, it),
  });
  d.push({
    title: "保存并更新",
    col_type: "text_3",
    url: $("#noLoading##noHistory##noRecordHistory#").lazyRule((it) => {
      require(getVar("sub依赖"));
      let ret = 保存修改订阅(it);
      if (!/已保存/.test(ret)) {
        return ret;
      }
      let pt =
        "hiker://files/rules/dzHouse/ruleCache/" +
        getMyVar("new_subName") +
        ".json";
      let def_tabModify = it.tabModify ? "是" : "否";
      let def_active = it.active ? "是" : "否";
      let obj = {
        title: getMyVar("new_subName"),
        url: getMyVar("new_subUrl"),
        desc: pt,
        tabModify: getMyVar("new_tabModify", def_tabModify) === "是",
        active: getMyVar("new_active", def_active) === "是",
        code: getMyVar("new_subCode", "").trim(),
      };
      try {
        ret = 更新单个订阅(obj);
      } catch (e) {
        log("保存成功但更新失败:" + e.message);
      }
      log("保存并更新成功:" + obj.title);
      return "toast://" + ret;
    }, it),
  });
  d.push({
    title: "仅更新",
    col_type: "text_3",
    url: $("#noLoading#").lazyRule((it) => {
      require(getVar("sub依赖"));
      let pt =
        "hiker://files/rules/dzHouse/ruleCache/" +
        getMyVar("new_subName") +
        ".json";
      let def_tabModify = it.tabModify ? "是" : "否";
      let def_active = it.active ? "是" : "否";
      let obj = {
        title: getMyVar("new_subName"),
        url: getMyVar("new_subUrl"),
        desc: pt,
        tabModify: getMyVar("new_tabModify", def_tabModify) === "是",
        active: getMyVar("new_active", def_active) === "是",
        code: getMyVar("new_subCode", "").trim(),
      };
      let ret = 更新单个订阅(obj);
      return "toast://" + ret;
    }, it),
  });
  setResult(d);
}
function get_rule() {
  //获取cms模板的规则
  return {
    last_chapter_rule: "",
    title: "奇飞",
    author: "道长",
    url: "hiker://empty##http://mkk.gotka.top/api.php/v1.vod#pg=fypage",
    version: 1,
    col_type: "movie_3_marquee",
    class_name: "",
    type: "video",
    class_url: "",
    area_name: "",
    area_url: "",
    sort_name: "",
    year_name: "",
    sort_url: "影视",
    year_url: "",
    find_rule: "js:\nrequire(config.模板);\n一级();",
    search_url: "hiker://empty##?wd=**&pg=fypage&ac=videolist",
    group: "#️⃣道长资源",
    searchFind: "js:\nrequire(config.模板);\n搜索一级();",
    detail_col_type: "text_5",
    detail_find_rule: "js:\nrequire(config.模板);\n二级();",
    sdetail_col_type: "text_5",
    sdetail_find_rule: "*",
    ua: "mobile",
    preRule:
      "var ua='$ua';\nrequire('https://dr.playdreamer.cn/js/资源网预处理.js');",
    pages: "[]",
    icon: "https://hikerfans.com/tubiao/ke/4.png",
  };
}

function 道长cms(url, title, ua, noIcon) {
  //链接，订阅名称，ua,无图标
  ua = ua || "";
  noIcon = noIcon || false; //无图标
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let iconApi =
    cms_config.iconApi || "http://1.117.152.239:39000/tupian.php?text=";

  let code = fetch(url);
  if (!code) {
    return "toast://文件有误,请查看此链接是否数据有效:" + url;
  }
  let arr = /http/.test(code)
    ? code.match(/#[\s\S]*?#/g)
    : base64Decode(code).match(/#[\s\S]*?#/g);
  let genData = [];

  arr.forEach((it) => {
    let tabs = it
      .match(/#.*?[\s]/g)[0]
      .split("#")[1]
      .replace(/\n/, "")
      .trim();
    let list = it.match(/[\S]*?,.*?[\s]/g);
    list.forEach((it) => {
      let t = it.split(",");
      let title = t[0].trim();
      let url =
        t[1]
          .trim()
          .split("?")[0]
          .replace(/index_video|vodPhbAll/g, "") + "/";
      genData.push({
        title: title,
        url: url,
        pic: t.length > 2 ? t[2].trim() : noIcon ? "" : iconApi + title,
        type: tabs,
      });
    });
  });
  // log(genData);
  function clone(myObj) {
    //拷贝对象
    if (typeof myObj != "object") return myObj;
    if (myObj == null) return myObj;
    var myNewObj = new Object();
    for (var i in myObj) myNewObj[i] = clone(myObj[i]);
    return myNewObj;
  }
  // const {rule}=$.require('hiker://page/ruleGen?rule=CMS模板');
  const rule = get_rule();
  let link = rule.url.match(/##(.*?)#/)[1]; //获取源地址

  var d = [];
  genData.forEach((it) => {
    let tmp = clone(rule);
    tmp.title = it.title;
    tmp.url = tmp.url.replace(link, it.url);
    tmp.sort_url = it.type;
    tmp.preRule = tmp.preRule.replace("$ua", ua);
    if (it.pic) {
      tmp.icon = it.pic;
    }
    d.push(tmp);
  });
  // let path='hiker://files/rules/dzHouse/ruleCache/'+md5(url)+'.json';
  // let path='hiker://files/rules/dzHouse/ruleCache/'+title+'.json';
  // writeFile(path,JSON.stringify(d));
  // return path
  return JSON.stringify(d);
}

function 聚影(url, title) {
  //链接，订阅名称
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let iconApi =
    cms_config.iconApi || "http://1.117.152.239:39000/tupian.php?text=";
  let code = fetch(url);
  let expand = ["xpath", "biubiu"];
  if (!code) {
    return "toast://文件有误,请查看此链接是否数据有效:" + url;
  }
  let arr = /http/.test(code)
    ? JSON.parse(code)
    : JSON.parse(base64Decode(code));
  let genData = [];
  arr
    .filter((it) => !expand.includes(it.type))
    .forEach((it) => {
      genData.push({
        title: it.name,
        url: it.url.split("?")[0].replace(/index_video|vodPhbAll/g, "") + "/",
        pic: iconApi + it.name,
        // tabs: title,
        tabs: it.group || it.type,
        ua: it.ua,
        type: it.type,
      });
    });
  // log(genData);
  function clone(myObj) {
    //拷贝对象
    if (typeof myObj != "object") return myObj;
    if (myObj == null) return myObj;
    var myNewObj = new Object();
    for (var i in myObj) myNewObj[i] = clone(myObj[i]);
    return myNewObj;
  }
  // const {rule}=$.require('hiker://page/ruleGen?rule=CMS模板');
  const rule = {
    last_chapter_rule: "",
    title: "",
    author: "道长",
    url: "hiker://empty##$api#pg=fypage",
    version: 1,
    col_type: "movie_3_marquee",
    class_name: "",
    type: "video",
    class_url: "",
    area_name: "",
    area_url: "",
    sort_name: "",
    year_name: "",
    sort_url: "",
    year_url: "",
    find_rule: "js:\nrequire(config.模板);\n一级();",
    search_url: "hiker://empty##?wd=**&pg=fypage&ac=videolist",
    group: "#️⃣道长资源",
    searchFind: "js:\nrequire(config.模板);\n搜索一级()",
    detail_col_type: "text_5",
    detail_find_rule: "js:\nrequire(config.模板);\n二级();",
    sdetail_col_type: "text_5",
    sdetail_find_rule: "*",
    ua: "mobile",
    preRule:
      "js:\nvar ua='$ua';\nvar type='$type';\nrequire('https://dr.playdreamer.cn/js/资源网预处理.js');",
    pages: "[]",
    icon: "",
    proxy: "",
  };

  var d = [];
  genData.forEach((it) => {
    let tmp = clone(rule);
    tmp.title = it.title;
    tmp.url = tmp.url.replace("$api", it.url);
    tmp.sort_url = it.tabs;
    tmp.preRule = tmp.preRule.replace("$type", it.type);
    if (/PC_UA|MOBILE_UA/.test(it.ua)) {
      tmp.preRule = tmp.preRule.replace("'$ua'", it.ua);
    } else {
      tmp.preRule = tmp.preRule.replace("$ua", it.ua);
    }
    if (it.pic) {
      tmp.icon = it.pic;
    }
    d.push(tmp);
  });
  return JSON.stringify(d);
}

function 点佬app(url, title, ua, noIcon) {
  ua = ua || "";
  noIcon = noIcon || false; //无图标
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let iconApi =
    cms_config.iconApi || "http://1.117.152.239:39000/tupian.php?text=";
  let code = fetch(url);
  if (!code) {
    return "toast://文件有误,请查看此链接是否数据有效:" + url;
  }
  code = code.trim();
  let arr = /http/.test(code)
    ? code.split("\n")
    : base64Decode(code).split("\n");
  let genData = [];
  arr.forEach((it) => {
    let [_, tab, title, url, icon] = it.match(/(.*)@(.*)=(http.*)#(.*)/);
    if (!icon) {
      icon = noIcon
        ? "https://gitcode.net/m0_72395205/iptv/-/raw/master/AppFile/AppIcon/通用图标.png"
        : iconApi + title;
    }
    if (!/^http|^hiker|^file/.test(icon)) {
      icon =
        "https://gitcode.net/m0_72395205/iptv/-/raw/master/AppFile/AppIcon/" +
        icon +
        ".png";
    }
    //icon='';
    genData.push({ title: title, url: url, pic: icon, type: tab });
  });
  function clone(myObj) {
    if (typeof myObj != "object") {
      return myObj;
    }
    if (myObj == null) {
      return myObj;
    }
    var myNewObj = new Object();
    for (var i in myObj) {
      myNewObj[i] = clone(myObj[i]);
    }
    return myNewObj;
  }
  const rule = get_rule();
  let link = rule.url.match(/##(.*?)#/)[1];
  var d = [];
  genData.forEach((it) => {
    let tmp = clone(rule);
    tmp.title = it.title;
    tmp.url = tmp.url.replace(link, it.url);
    tmp.sort_url = it.type;
    tmp.preRule = tmp.preRule.replace("$ua", ua);
    if (it.pic) {
      tmp.icon = it.pic;
    }
    d.push(tmp);
  });
  return JSON.stringify(d);
}

function 保存新增订阅() {
  if (
    !getMyVar("subUrl", "") ||
    !/^http|^hiker|^file|^\/storage\/|^\/sdcard\//.test(getMyVar("subUrl", ""))
  ) {
    return "toast://订阅地址不正确!\n" + getMyVar("subUrl", "");
  }
  if (!getMyVar("subName", "")) {
    return "toast://请填写订阅名称";
  }
  let path = "hiker://files/rules/dzHouse/ruleCache/sub.json";
  let subs = JSON.parse(fetch(path) || "[]");
  if (subs.length > 0) {
    if (subs.filter((it) => it.title === getMyVar("subName")).length > 0) {
      return "toast://此订阅已经存在,换个名称添加订阅或者返回编辑此订阅";
    }
  }
  // let pt = 'hiker://files/rules/dzHouse/ruleCache/'+md5(getMyVar('subUrl'))+'.json';
  let title = getMyVar("subName").trim();
  let pt = "hiker://files/rules/dzHouse/ruleCache/" + title + ".json";
  subs.push({
    title: title,
    url: getMyVar("subUrl").trim(),
    desc: pt,
    tabModify: getMyVar("tabModify", "否") === "是",
    active: getMyVar("active", "是") === "是",
    code: getMyVar("subCode", "").trim(),
  });
  writeFile(path, JSON.stringify(subs));
  refreshPage(false);
  return "toast://已保存";
}
function 检测切换更新当前订阅(obj) {
  const path = "hiker://files/rules/dzHouse/ruleCache/sub.json";
  const cfg = "hiker://files/rules/dzHouse/ruleCache/config.json";
  let subs = JSON.parse(fetch(path) || "[]");
  let cms_config = JSON.parse(fetch(cfg) || "{}");
  let nowData = cms_config.now || "";
  let nowSub = subs.filter((it) => it.title === nowData);
  nowSub = nowSub.length > 0 ? nowSub[0] : false;
  if (subs.length > 0 && !nowSub) {
    //有订阅但找不到当前订阅
    nowSub = subs[0]; //当前订阅取订阅列表的第一个
    cms_config.now = nowSub.title; //设置当前订阅配置
    writeFile(cfg, JSON.stringify(cms_config)); //写配置
    nowData = false;
  }
  // const cfg = 'hiker://files/rules/dzHouse/ruleCache/config.json';
  // let cms_config = JSON.parse(fetch(cfg)||'{}');
  if (nowData === obj.title || !nowData) {
    //更新了，自动把已切换的写入本地
    // require(getVar('sub依赖'));
    log(
      "检测到更新的订阅列表里有正在使用的记录,切换该订阅的本地数据:" +
        cms_config.now
    );
    切换订阅(obj, cfg);
  }
}

function 更新单个订阅(obj) {
  let title = obj.title;
  let url = obj.url;
  if (/^\/storage\/|^\/sdcard\//.test(url)) {
    url = "file://" + url;
  }
  let code = obj.code;
  let pt = "hiker://files/rules/dzHouse/ruleCache/" + title + ".json";
  if (!code || !/^function/.test(code)) {
    try {
      let html = fetch(url, { timeout: 5000 });
      html = JSON.parse(html);
      if (Array.isArray(html)) {
        html = JSON.stringify(html);
        writeFile(pt, html);
        检测切换更新当前订阅(obj);
        return "订阅项目直链:" + title + " 数据更新成功。";
      } else {
        return "订阅项目直链:" + title + " 数据更新失败。返回数据非json数据。";
      }
    } catch (e) {
      return "订阅项目直链:" + title + " 获取数据更新失败。" + e.message;
    }
  } else if (/^function/.test(code)) {
    try {
      var cms = eval(code);
      var html = cms(url, title);
      html = JSON.parse(html);
      if (Array.isArray(html)) {
        html = JSON.stringify(html);
        writeFile(pt, html);
        检测切换更新当前订阅(obj);
        return "订阅项目函数:" + title + " 数据更新成功。";
      } else {
        return "订阅项目直链:" + title + " 数据更新失败。返回数据非json数据。";
      }
    } catch (e) {
      return "订阅项目函数:" + title + " 获取数据更新失败。" + e.message;
    }
  } else {
    return "订阅项目:" + title + " 获取数据更新失败。未知错误";
  }
}

function 添加订阅() {
  addListener(
    "onClose",
    $.toString(() => {
      clearMyVar("subName");
      clearMyVar("subUrl");
      clearMyVar("subCode");
      clearMyVar("tabModify");
      clearMyVar("active");
      refreshPage(); //刷新数据
    })
  );
  let d = [];
  d.push({
    title: "名称",
    desc: "订阅名称,比如道长资源",
    col_type: "input",
    extra: {
      defaultValue: getMyVar("subName", ""),
      onChange: "putMyVar('subName',input)",
    },
  });
  d.push({
    title: "地址",
    desc: "订阅地址,可以是base64数据",
    col_type: "input",
    extra: {
      defaultValue: getMyVar("subUrl", ""),
      onChange: "putMyVar('subUrl',input)",
    },
  });
  let tabModify_tips = "自定义分类: ";
  d.push({
    title: tabModify_tips + getMyVar("tabModify", "否"),
    col_type: "text_2",
    url: $("#noLoading#").lazyRule((tabModify_tips) => {
      if (getMyVar("tabModify", "否") === "否") {
        putMyVar("tabModify", "是");
      } else {
        putMyVar("tabModify", "否");
      }
      updateItem({
        title: tabModify_tips + getMyVar("tabModify"),
        extra: { id: "item_tabModify" },
      });
      return "hiker://empty";
    }, tabModify_tips),
    extra: { id: "item_tabModify" },
  });
  let active_tips = "并发更新: ";
  let def_active = "是";
  d.push({
    title: active_tips + getMyVar("active", def_active),
    col_type: "text_2",
    url: $("#noLoading#").lazyRule(
      (active_tips, def_active) => {
        if (getMyVar("active", def_active) === "否") {
          putMyVar("active", "是");
        } else {
          putMyVar("active", "否");
        }
        updateItem({
          title: active_tips + getMyVar("active"),
          extra: { id: "item_active" },
        });
        return "hiker://empty";
      },
      active_tips,
      def_active
    ),
    extra: { id: "item_active" },
  });

  d.push({
    title: "代码",
    desc: "请输入订阅代码,可空或者函数返回数组列表字符串function(url,title,ua,noIcon){return JSON.stringify(obj)}",
    col_type: "input",
    extra: {
      defaultValue: getMyVar("subCode", ""),
      // titleVisible: false,
      type: "textarea",
      // height:-1,
      textSize: 13,
      height: 10,
      onChange: "putMyVar('subCode',input)",
    },
  });

  d.push({
    title: "保存",
    col_type: "text_2",
    url: $("#noLoading#").lazyRule(() => {
      require(getVar("sub依赖"));
      return 保存新增订阅();
    }),
  });
  d.push({
    title: "保存并更新",
    col_type: "text_2",
    url: $("#noLoading#").lazyRule(() => {
      require(getVar("sub依赖"));
      let ret = 保存新增订阅();
      if (!/已保存/.test(ret)) {
        return ret;
      }
      let pt =
        "hiker://files/rules/dzHouse/ruleCache/" +
        getMyVar("subName") +
        ".json";
      let obj = {
        title: getMyVar("subName"),
        url: getMyVar("subUrl"),
        desc: pt,
        tabModify: getMyVar("tabModify", "否") === "是",
        active: getMyVar("active", "是") === "是",
        code: getMyVar("subCode", "").trim(),
      };
      ret = 更新单个订阅(obj);
      return "toast://" + ret;
    }),
  });
  setResult(d);
}
