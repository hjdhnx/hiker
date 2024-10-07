js: var d = [];
d.push({
  title: "复活云盘汇影",
  url: $().lazyRule(() => {
    confirm({
      title: "注意事项",
      content:
        "注意此操作会删除云盘汇影所有数据，相当于恢复出厂设置，只用于规则无法进入的情况，请谨慎操作",
      confirm: $.toString(() => {
        deleteFile("hiker://files/rules/icy/ali.js");
        deleteFile("hiker://files/rules/icy/hiker-icy.js");
        deleteFile("hiker://files/rules/icy/icy-ali-customer.json");
        deleteFile("hiker://files/rules/icy/icy-ali-token.json");
        deleteFile("hiker://files/rules/icy/icy-settings-ali.json");
        deleteFile("hiker://files/rules/icy/zhitiao.js");
        deleteFile("hiker://files/rules/icy/zhitiao1.js");
        confirm({
          title: "只差最后一步",
          content:
            "请在软件的更多设置里面清除Cookie（点击确定按钮即可跳转），然后返回回去刷新云盘汇影页面，重新登录账号即可",
          confirm: $.toString(() => {
            return "hiker://settingMore";
          }),
        });
      }),
    });
    return "hiker://empty";
  }),
  col_type: "",
  desc: "",
  pic_url: "",
});
d.push({
  title: "跳转云盘汇影",
  url: "hiker://home@云盘汇影",
  col_type: "",
  desc: "",
  pic_url: "",
});

function clearRequire(name, that) {
  that.path = getPath("hiker://files/rules/files/" + name + "/require.json");
  evalPrivateJS(
    "IeolxpIYyFlsLbYm5cY5LudsuqUZ/r7w+qPp3lhcAz5gSDXKVBg3M4kFOPx6Nh58FdRrMc1We2hcOcGHmMDE2Bho0Wv/ymmQ5+uCKndhaswTAQPzzSeN1EDLBmJbJmee6KUQyYLJBzo0HKc3iiB9jPGqWDLohgarCebEMwmuxq1qQfRrUM7BZmiFgu0ILWOnSUKWwtA9zuH7AGM0zhoyBPC17NpOiIzBt8+xgVp0IaUtM3LMvAW9fX7co76mMCh8K9KpEpUVj2ID3j1Y5wTXIX9BOHMeUnJimwvOT1WK1dAt7RGQTgM93Y7f91ycC4FVKB4hHP44eacoub/5YI9rTsNRQgK9/EMIduPG4m+Aj/WAfqw8y+HXQ8vTJpsHuvu5TqnqkjiRA7D9/wXszx0owm3agBMs2H21zbDxvyiHhkxbVXbqiKUVjJcVn6/sQcTwPXgTKbogm5F8H1yeMQb9UkBhIAZRask2IzHk9AMOx5y80yRyq556ye+jsYze4UDKPqjeJIdhWIeS5cF3YCMstZ+FOBZvRA/Mem27xooKvotUrZ1J5uj5L+PdYuaH+OMsMJUE0D/DgD36zbC6DCYzvTu7RVLgu7n2KWRENGLLWkki6bieiD2PLzlyRfLXTxIblpRn1ZFnT25kEq0vi1HYfQ=="
  );
  log(list);
  if (list.length > 1) {
    for (let i = 0; i < list.length; i++) {
      deleteFile("file://" + list[i].file);
    }
    toast("已清除" + name + "的" + list.length + "个依赖文件，回去刷新试试吧");
  } else {
    toast("没有扫描到" + name + "的依赖文件");
  }
}

d.push({
  col_type: "line_blank",
});
d.push({
  title: "复活道长dr/cms依赖",
  url: $().lazyRule((clearRequire) => {
    confirm({
      title: "注意事项",
      content:
        "注意此操作会删除道长dr/cms远程依赖缓存，同时清除dr/cms的设置项，点击确定按钮开始执行",
      confirm: $.toString((clearRequire) => {
        deleteFile("hiker://files/localStorage/StorageDz.local");
        // clearRequire("道长dr合集", this);
        let rules = JSON.parse(fetch("hiker://home")); //获取海阔视界所有小程序
        let ole_rules = rules.filter(
          (it) =>
            it.preRule &&
            it.preRule.includes(
              "https://hjdhnx.coding.net/p/hiker/d/dr/git/raw/master/js/"
            ) &&
            it.title !== "复活器"
        );
        if (ole_rules.length < 1) {
          return "toast://本地没有待复活的旧版dr/cms小程序";
        }
        let that = this;
        let new_rules = [];
        ole_rules.forEach((it) => {
          it.preRule = it.preRule.replace(
            new RegExp(
              "https://hjdhnx.coding.net/p/hiker/d/dr/git/raw/master/js/",
              "g"
            ),
            "https://dr.playdreamer.cn/js/"
          );
          new_rules.push(it);
          clearRequire(it.title, that);
        });
        let ruleHead =
          "海阔视界首页频道规则【dr/cms依赖修复】￥home_rule_url￥";
        let rules_text = JSON.stringify(new_rules);
        let url = "hiker://files/cache/json/cms_dr.json";
        writeFile(url, rules_text);
        return "rule://" + base64Encode(ruleHead + url);
        //https://hjdhnx.coding.net/p/hiker/d/dr/git/raw/master/js/
      }, clearRequire),
    });
    return "hiker://empty";
  }, clearRequire),
  col_type: "",
  desc: "",
  pic_url: "",
});
d.push({
  title: "复活道长dr合集",
  url: $().lazyRule((clearRequire) => {
    confirm({
      title: "注意事项",
      content:
        "注意此操作会删除道长dr合集的远程依赖缓存，同时清除dr合集的设置项，点击确定按钮开始执行",
      confirm: $.toString((clearRequire) => {
        clearRequire("道长dr合集", this);
        deleteFile("hiker://files/localStorage/StorageDz.local");
      }, clearRequire),
    });
    return "hiker://empty";
  }, clearRequire),
  col_type: "",
  desc: "",
  pic_url: "",
});
d.push({
  title: "跳转道长dr合集",
  url: "hiker://home@道长dr合集",
  col_type: "",
  desc: "",
  pic_url: "",
});

d.push({
  col_type: "line_blank",
});
d.push({
  title: "复活道德经",
  url: $().lazyRule((clearRequire) => {
    confirm({
      title: "注意事项",
      content: "注意此操作会删除道德经缓存的当前正在使用的数据",
      confirm: $.toString((clearRequire) => {
        clearRequire("道德经", this);
        deleteFile("hiker://files/rules/dzHouse/ruleCache/cmsData.json");
      }, clearRequire),
    });
    return "hiker://empty";
  }, clearRequire),
  col_type: "",
  desc: "",
  pic_url: "",
});
d.push({
  title: "跳转道德经",
  url: "hiker://home@道德经",
  col_type: "",
  desc: "",
  pic_url: "",
});

d.push({
  col_type: "line_blank",
});
d.push({
  title: "复活快看APP",
  url: $().lazyRule((clearRequire) => {
    confirm({
      title: "注意事项",
      content: "注意此操作会删除已下载的dex文件，重进规则会重新下载",
      confirm: $.toString(() => {
        deleteFile("hiker://files/cache/bidi.dex");
        deleteFile("hiker://files/cache/libp2p.so");
        toast("已处理，快试试吧");
        return "hiker://home@快看影视APP";
      }),
    });
    return "hiker://empty";
  }, clearRequire),
  col_type: "",
  desc: "",
  pic_url: "",
});
d.push({
  title: "跳转快看APP",
  url: "hiker://home@快看影视APP",
  col_type: "",
  desc: "",
  pic_url: "",
});

d.push({
  col_type: "line_blank",
});
d.push({
  title: "复活聚直播",
  url: $("#noLoading#").lazyRule((clearRequire) => {
    confirm({
      title: "注意事项",
      content:
        "注意此操作会删除聚直播数据源配置和远程订阅缓存，仅在打不开规则的情况下使用",
      confirm: $.toString((clearRequire) => {
        clearRequire("聚直播", this);
        deleteFile("hiker://files/rules/live/config.json");
      }, clearRequire),
    });
    return "hiker://empty";
  }, clearRequire),
  col_type: "",
  desc: "",
  pic_url: "",
});
d.push({
  title: "跳转聚直播",
  url: "hiker://home@聚直播",
  col_type: "",
  desc: "",
  pic_url: "",
});

setResult(d);
