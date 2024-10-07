js: var d = [];
let jkpath = "hiker://files//rules/Src/Juying/jiekou.json";
let jxpath = "hiker://files//rules/Src/Juying/myjiexi.json";
let jks = JSON.parse(fetch(jkpath) || "[]");
let jxs = JSON.parse(fetch(jxpath) || "[]");
let expand = ["xpath", "biubiu"];
let apijks = jks.filter((it) => !expand.includes(it.type));
d.push({
  title: "本地共计聚影资源接口数:" + apijks.length + "/" + jks.length,
  desc: "聚影私有解析数:" + jxs.length,
  col_type: "text_1",
  url: $("#noLoading#").lazyRule((jkpath) => {
    let status = fetch("hiker://home@JSON编辑器");
    let hasJsonEditor = status && status !== "null";
    if (!hasJsonEditor) {
      return "editFile://" + jkpath;
    } else {
      return (
        "hiker://page/interface#noHistory##noRecordHistory#?rule=JSON编辑器&Json=" +
        base64Encode(jkpath)
      );
    }
  }, jkpath),
});
const { color, small } = $.require("hiker://page/utiliy?rule=道长仓库Pro");
d.push({
  title: "一键去重",
  col_type: "icon_2",
  pic_url: "https://hikerfans.com/tubiao/messy/10.svg",
  url: $(
    "原理是根据接口里的url作为唯一id保留第一条记录,可去除资源接口和解析接口。此操作不可逆，是否继续?"
  ).confirm(
    (jks, jkpath, jxs, jxpath) => {
      let newJks = [];
      let newJxs = [];
      jks.forEach((it) => {
        if (
          newJks.findIndex((its) =>
            (its.url || "").trim().includes((it.url || "").trim())
          ) === -1
        ) {
          it.url = (it.url || "").trim();
          newJks.push(it);
        }
      });
      jxs.forEach((it) => {
        if (
          newJxs.findIndex((its) =>
            (its.parse || "").trim().includes((it.parse || "").trim())
          ) === -1
        ) {
          it.parse = (it.parse || "").trim();
          newJxs.push(it);
        }
      });
      let delcnt = jks.length - newJks.length;
      let delcnt2 = jxs.length - newJxs.length;
      if (delcnt > 0 || delcnt2 > 0) {
        writeFile(jkpath, JSON.stringify(newJks));
        writeFile(jxpath, JSON.stringify(newJxs));
        refreshPage(false);
        return `toast://去重成功,共计去重${delcnt}个资源接口,${delcnt2}个解析接口\n剩余${newJks.length}个资源接口,${newJxs.length}个解析接口`;
      } else {
        return "toast://很棒，没有重复的接口!";
      }
    },
    jks,
    jkpath,
    jxs,
    jxpath
  ),
});
d.push({
  title: "超时设置:" + getMyVar("timeout", "5000"),
  url: $(getMyVar("timeout", "5000"), "请输入超时毫秒整数").input(() => {
    if (!Number(input)) {
      return "toast://输入有误";
    }
    putMyVar("timeout", Number(input) + "");
    refreshPage(false);
    return "toast://已保存";
  }),
  pic_url: "https://hikerfans.com/tubiao/messy/12.svg",
  col_type: "icon_2",
});
let dx_test = "❤️接口多选测试";
d.push({
  title: dx_test,
  col_type: "text_center_1",
  url: $("hiker://empty#noRecordHistory##noHistory#").rule(
    (dx_test, jkpath, color) => {
      setPageTitle(dx_test);
      addListener(
        "onClose",
        $.toString(() => {
          refreshPage(false); //
        })
      );
      let d = [];
      let jks = JSON.parse(fetch(jkpath) || "[]");
      let expand = ["xpath", "biubiu"];
      let jxs = jks.filter((it) => !expand.includes(it.type));
      // let jxs = jks.filter(it=>!expand.includes(it.type)).map(it=>it.name);
      let data = storage0.getMyVar("jx_selected") || [];
      let dx_filter = getItem("dx_filter", "全部");
      if (dx_filter === "已选") {
        jxs = jxs.filter((it) => data.includes(it.url));
      } else if (dx_filter === "未选") {
        jxs = jxs.filter((it) => !data.includes(it.url));
      }
      d = jxs.map((it) => {
        return {
          title:
            Array.isArray(data) && data.includes(it.url)
              ? color(it.name, "#12b668")
              : it.name,
          // url:'toast://功能开发中',
          url: $("#noLoading#").lazyRule(
            (it, color) => {
              let data = storage0.getMyVar("jx_selected");
              if (Array.isArray(data)) {
                if (data.includes(it.url)) {
                  log("包含:" + it.url);
                  data.splice(data.indexOf(it.url), 1);
                } else {
                  data.push(it.url);
                }
                storage0.putMyVar("jx_selected", data);
              } else {
                storage0.putMyVar("jx_selected", [it.url]);
              }
              if (storage0.getMyVar("jx_selected").includes(it.url)) {
                updateItem(it.url, {
                  title: color(it.name, "#12b668"),
                });
              } else {
                updateItem(it.url, {
                  title: it.name,
                });
              }
              return "hiker://empty";
            },
            it,
            color
          ),
          col_type: "text_3",
          desc: JSON.stringify(it),
          extra: {
            id: it.url,
          },
        };
      });
      let op = [];
      op.push({
        title: "全选",
        url: $("#noLoading#").lazyRule(
          (jxs, color) => {
            storage0.putMyVar(
              "jx_selected",
              jxs.map((it) => it.url)
            );
            jxs.forEach((it) => {
              updateItem({
                title: color(it.name, "#12b668"),
                extra: { id: it.url },
              });
            });
            return "hiker://empty";
          },
          jxs,
          color
        ),
        col_type: "flex_button",
      });
      op.push({
        title: "全不选",
        url: $("#noLoading#").lazyRule((jxs) => {
          storage0.putMyVar("jx_selected", []);
          jxs.forEach((it) => {
            updateItem({ title: it.name, extra: { id: it.url } });
          });
          return "hiker://empty";
        }, jxs),
        col_type: "flex_button",
      });
      op.push({
        title: "反选",
        url: $("#noLoading#").lazyRule(
          (jxs, color) => {
            let oldSel = storage0.getMyVar("jx_selected", []);
            function getDifferentData(arrA, arrB) {
              return arrA.concat(arrB).filter(function (v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
              });
            }
            let jxSel = jxs.map((it) => it.url);
            let newSel = getDifferentData(jxSel, oldSel);
            // log(newSel);
            storage0.putMyVar("jx_selected", newSel);
            newSel.forEach((it) => {
              let t = jxs.filter((its) => its.url === it)[0];
              updateItem(it, { title: color(t.name, "#12b668") });
              // updateItem({title: color(jxs.filter(its=>its.url===it)[0].title,'#12b668'), extra: {id: it}});
            });
            oldSel.forEach((it) => {
              let t = jxs.filter((its) => its.url === it)[0];
              updateItem(it, { title: t.name });
              // updateItem({title: jxs.filter(its=>its.url===it)[0].title, extra: {id: it}});
            });
            return "hiker://empty";
          },
          jxs,
          color
        ),
        col_type: "flex_button",
      });
      op.push({
        title: "搜索词",
        url: $("#noLoading#").lazyRule(() => {
          return $(getMyVar("skey", "我的"), "当前搜索词").input(() => {
            if (input) {
              putMyVar("skey", input);
              return "hiker://empty";
            }
            return "hiker://empty";
          });
        }),
        col_type: "flex_button",
      });
      op.push({
        title: "测试",
        url: $("#noLoading#").lazyRule(() => {
          let sel = storage0.getMyVar("jx_selected", []);
          // log(sel);
          if (sel.length < 1) {
            return "toast://啥都没选，测试个鸡毛~";
          }
          return $(
            "确认测试已选择的:" + sel[0] + "等" + sel.length + "条接口?"
          ).confirm((sel) => {
            return $("hiker://empty").rule((sel) => {
              addListener(
                "onClose",
                $.toString(() => {
                  // clearMyVar('jx_selected');
                  refreshPage(false); //
                })
              );
              let jkpath = "hiker://files//rules/Src/Juying/jiekou.json";
              let jks = JSON.parse(fetch(jkpath) || "[]");
              let apijks = jks.filter((it) => sel.includes(it.url));
              let skey = getMyVar("skey", "我的");
              // log(apijks);
              let d = [];
              d.push({
                title: "删除坏的接口",
                col_type: "text_2",
                url: $().lazyRule(() => {
                  let arr = (findItemsByCls("failed") || []).map((it) => {
                    return {
                      id: it.extra.id,
                      name: it.extra.name,
                      url: it.extra.url,
                    };
                  });
                  if (arr.length < 1) {
                    return "toast://很棒,当前测试结果看起来没有坏掉的接口";
                  }
                  let tips = arr.map((it) => it.name).join(",");
                  // log(arr);
                  return $(
                    "当前测试结果共计" +
                      arr.length +
                      "个疑似失效的的资源接口,是否删除?\n" +
                      tips
                  ).confirm((arr) => {
                    let jkpath = "hiker://files//rules/Src/Juying/jiekou.json";
                    let apijks = JSON.parse(fetch(jkpath) || "[]");
                    let deled = [];
                    let delurls = [];
                    arr.forEach((it) => {
                      log("删除接口:" + it.name + ",id:" + it.id);
                      deled.push(it.name);
                      delurls.push(it.url);
                    });
                    apijks = apijks.filter((its) => !delurls.includes(its.url));
                    let sel = storage0.getMyVar("jx_selected", []);
                    sel = sel.filter((its) => !delurls.includes(its));
                    deleteItemByCls("failed");
                    storage0.putMyVar("jx_selected", sel);
                    writeFile(jkpath, JSON.stringify(apijks));
                    return "toast://已删除:" + deled.join(",");
                  }, arr);
                }),
              });
              d.push({
                title: "查看坏蛋",
                col_type: "text_2",
                url: $().lazyRule(() => {
                  let arr = (findItemsByCls("failed") || []).map((it) => {
                    return {
                      id: it.id,
                      name: it.extra.name,
                      url: it.extra.url,
                    };
                  });
                  if (arr.length < 1) {
                    return "toast://很棒,当前测试结果看起来没有坏掉的接口";
                  }
                  return $("hiker://empty#noHistory##noRecordHistory#").rule(
                    (arr) => {
                      setPageTitle("坏蛋列表");
                      let d = [];
                      d.push({
                        title: "共计" + arr.length + "个坏蛋",
                        url: "hiker://empty",
                        col_type: "text_1",
                      });
                      d.push({
                        title: JSON.stringify(arr),
                        col_type: "long_text",
                      });
                      setResult(d);
                    },
                    arr
                  );
                  // return 'toast://暂无功能'
                }),
              });
              d.push({
                title: `测试搜索““””<font color="red">${skey}</font> 结果如下:`,
                col_type: "text_1",
                url: "toast://看下面的!",
                extra: {
                  id: "result",
                },
              });
              setResult(d);

              function getKey() {
                //获取所需的key值，当前月日比如0330
                let time_str = $.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
                let tmp = time_str.split(" ")[0].split("-");
                return tmp[1] + tmp[2];
              }

              function isIptv(link) {
                //判断是否为Iptv
                if (/iptv|Chengcheng/.test(link)) {
                  return true;
                }
                let special = [
                  "tv.hfys8.vip/api.php/Sntv/vod", //黑锋
                  "dsxtv.tv.ci/api.php/dsx/vod", //大师兄
                ];
                for (let url of special) {
                  if (link.includes(url)) {
                    return true;
                  }
                }
                return false;
              }

              var count = apijks.length; //设置任务数量
              log("开启多任务测试,任务数量:" + count);
              var task = function (obj) {
                let surl = obj.surl;
                let ua = obj.ua;
                if (ua === "PC_UA") {
                  ua = PC_UA;
                } else if (ua === "MOBILE_UA") {
                  ua = MOBILE_UA;
                }
                var html =
                  fetch(surl, {
                    headers: { "User-Agent": ua },
                    timeout: Number(getMyVar("timeout", "5000")),
                  }) || "";
                let cls;
                var hm = html.slice(0, 200);
                var ret = {};
                var json = {};
                try {
                  ret = JSON.parse(html);
                  cls = "success";
                  // log(obj);
                  if (obj.v1) {
                    json = ret.data.list;
                  } else if (obj.v2 || obj.iptv) {
                    //v2和iptv都是data
                    json = ret.data;
                  } else {
                    // log('cms或者app');
                    json = ret.list; //cms和app都是html.list
                  }
                  if (Array.isArray(json)) {
                    //数据可能是个[{}]
                    json = json[0];
                  }
                  ret = json;
                  if (obj.name.includes("白云")) {
                    // log('白云取值为:');
                    // log(ret);
                  }
                } catch (e) {
                  log(obj.name + "解析错误:" + e.message);
                  cls = "failed";
                }
                return { ret: ret, surl: surl, hm: hm, cls: cls };
              };
              var parseRet = []; //解析结果列表
              let tasks = apijks.map((it, idex) => {
                let type = it.type;
                let link = it.url;
                let surl = link + "?wd=" + skey + "&pg=1&ac=list";
                if (type) {
                  v1 = type === "v1";
                  v2 = type === "v2";
                  app = type === "app" || v2;
                  iptv = type === "iptv";
                } else {
                  v1 = link.includes(".vod");
                  v2 = link.includes("app.php");
                  app = link.includes("/app") || v2;
                  iptv = isIptv(link);
                }
                if (v1) {
                  // log(`${obj.name} => v1`);
                  surl =
                    surl.replace("pg=", "limit=20&page=") + "&key=" + getKey();
                } else if (app) {
                  // log(`${obj.name} => app`);
                  surl = link + "/search?pg=1&text=" + skey + "&token=";
                } else if (iptv) {
                  // log(`${obj.name} => iptv`);
                  // surl = link+'/?ac=list&pg=1&zm='+skey;
                  surl = link + "/?ac=list&pg=1&wd=" + skey;
                }
                it.surl = surl;
                it.v1 = v1;
                it.v2 = v2;
                it.app = app;
                it.iptv = iptv;
                log(`${it.name} 搜索链接: ${surl},ua:${it.ua},类型:${type}`);
                return {
                  func: task,
                  param: it,
                  id: "task" + idex,
                };
              });
              function sortByKey(array, key, order) {
                //对象数组按某个键值排序
                return array.sort(function (a, b) {
                  var x = parseInt(a[key].match(/(\d+)/)[1]); //修复大于10出问题
                  var y = parseInt(b[key].match(/(\d+)/)[1]);
                  if (order) {
                    return x < y ? -1 : x > y ? 1 : 0;
                  } else {
                    return x < y ? (x > y ? 1 : 0) : -1;
                  }
                });
              }
              be(tasks, {
                func: function (obj, id, error, ret) {
                  // log("监听到任务" + id+'已结束,error:'+error+',ret:'+ret);
                  let hm = (ret.hm || "").trim();
                  let hm1 = hm.slice(0, 10);
                  error = error || "";
                  let it = tasks.filter((it) => it.id === id)[0].param;
                  let data = ret.ret || {};
                  parseRet.push({
                    task: id,
                    data: data,
                    surl: ret.surl,
                    error: error,
                    it: it,
                  });
                  count -= 1; //完成了任务，任务数量-1
                  //log(obj);
                  // if (count > 0) {
                  //     showLoading("加载中:" + count)
                  // } else {
                  //     hideLoading();
                  // }

                  addItemAfter("result", {
                    // title:it.name,
                    title:
                      data.vod_name ||
                      data.title +
                        "\n" +
                        `‘‘’’<small><font color=#f13b66a>${
                          data.vod_remarks || data.state
                        }</font></small>`,
                    pic_url: data.vod_pic || data.pic,
                    desc: `${hm1}\n‘‘’’<font color=#f13b66a>${it.name}</font> (${it.type})`,
                    // url:it.url,
                    // url:ret.surl,
                    url: $("#noLoading#").lazyRule(
                      (surl, name, type, id, url) => {
                        return $(
                          ["访问", "删除"],
                          2,
                          "请选择执行的操作"
                        ).select(
                          (surl, name, type, url, id) => {
                            if (input === "访问") {
                              return surl;
                            } else if (input === "删除") {
                              log(
                                "删除接口:" + name + "(" + type + "),id:" + id
                              );
                              deleteItem([id]);
                              let jkpath =
                                "hiker://files//rules/Src/Juying/jiekou.json";
                              let jks = JSON.parse(fetch(jkpath) || "[]");
                              let apijks = jks.filter(
                                (it) => !(it.url === url)
                              );
                              writeFile(jkpath, JSON.stringify(apijks));
                              // clearMyVar('jx_selected');
                              let sel = storage0.getMyVar("jx_selected", []);
                              let idex = sel.findIndex((it) => it === url);
                              if (idex > -1) {
                                sel.splice(idex, 1);
                                storage0.putMyVar("jx_selected", sel);
                              }
                              return "toast://已删除:" + name;
                            }
                          },
                          surl,
                          name,
                          type,
                          url,
                          id
                        );
                      },
                      ret.surl,
                      it.name,
                      it.type,
                      id,
                      it.url
                    ),
                    // desc:ret.html,
                    col_type: "movie_1_vertical_pic",
                    extra: {
                      id: id,
                      ua: it.ua,
                      hm: hm,
                      cls: ret.cls,
                      url: it.url,
                      name: it.name,
                    },
                  });
                },
                param: {
                  //传到监听函数的obj参数里
                  hi: "ccc",
                },
              }); //执行多任务
              //log("多任务执行结果数:"+parseRet.length);
              /*
                        parseRet=sortByKey(parseRet,'task',true);//升序排列

                        parseRet.forEach((it)=>{
                            addItemAfter('result',{
                                title:it.data.name,
                                url:it.data.url,
                                desc:it.task,
                                col_type:'move_3'
                            });
                        });

                         */
            }, sel);
          }, sel);
        }),
        col_type: "flex_button",
      });
      op.push({
        title: "修改",
        col_type: "flex_button",
        url: $("#noLoading#").lazyRule(() => {
          let sel = storage0.getMyVar("jx_selected", []);
          if (sel.length < 1) {
            return "toast://啥都没选，修改个鸡毛~";
          }
          if (sel.length !== 1) {
            return "toast://聚影官方未提供批量修改接口，目前只允许单个修改，尽情谅解~";
          }
          let data = JSON.parse(findItem(sel[0]).desc || "{}");
          return $("hiker://empty#noRecordHistory##noHistory#").rule((data) => {
            require(config.依赖.match(/https.*\//)[0] + "SrcJySet.js");
            jiekou("update", data);
          }, data);
        }),
      });
      op.push({
        title: "删除",
        url: $("#noLoading#").lazyRule(() => {
          let sel = storage0.getMyVar("jx_selected", []);
          if (sel.length < 1) {
            return "toast://啥都没选，删除个鸡毛~";
          }
          return $(
            "确认删除已选择的:" + sel[0] + "等" + sel.length + "条接口?"
          ).confirm((sel) => {
            let jkpath = "hiker://files//rules/Src/Juying/jiekou.json";
            let jks = JSON.parse(fetch(jkpath) || "[]");
            let expand = ["xpath", "biubiu"];
            // let apijks = jks.filter(it=>!expand.includes(it.type));
            let apijks = jks.filter((it) => !sel.includes(it.url));
            writeFile(jkpath, $.stringify(apijks));
            storage0.putMyVar("jx_selected", []); //删除完了清空选中项目
            refreshPage(false);
            return (
              "toast://已将〖" + sel[0] + "〗等" + sel.length + "条接口删除"
            );
          }, sel);
        }),
        col_type: "flex_button",
      });
      op.push({
        title: "操作|筛选 " + color(jxs.length, "#ff7000"),
        url: "toast://前面按钮是操作，后面按钮是筛选",
        col_type: "scroll_button",
      });
      op.push({
        title: dx_filter === "全部" ? color("全部", "#12b668") : "全部",
        url: $("#noLoading#").lazyRule(() => {
          setItem("dx_filter", "全部");
          refreshPage(false);
          return "hiker://empty";
        }),
        col_type: "scroll_button",
      });
      op.push({
        title: dx_filter === "已选" ? color("已选", "#12b668") : "已选",
        url: $("#noLoading#").lazyRule(() => {
          setItem("dx_filter", "已选");
          refreshPage(false);
          return "hiker://empty";
        }),
        col_type: "scroll_button",
      });
      op.push({
        title: dx_filter === "未选" ? color("未选", "#12b668") : "未选",
        url: $("#noLoading#").lazyRule(() => {
          setItem("dx_filter", "未选");
          refreshPage(false);
          return "hiker://empty";
        }),
        col_type: "scroll_button",
      });
      d = op.concat(d);
      setResult(d);
    },
    dx_test,
    jkpath,
    color
  ),
});
setResult(d);
