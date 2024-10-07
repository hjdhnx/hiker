function 搜索建议(d, show_pic,cnt) {
  show_pic = show_pic || false; //显示海报
  cnt = cnt||10; // 保存搜索记录数
  let rule_name = MY_RULE.title;
  let img = getItem("建议海报", "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-80953a7e-7873-4802-9cc1-ea559e692799/feaf84ad-6267-4dc1-b743-a67389eddf75.jpg");
  let name = getItem("建议片名", "");
  let hisSearch_path = "hiker://files/cache/搜索记录.json"; // 历史搜索记录文件路径
  $.extend({
    hisSearch_path:hisSearch_path,
    hisSearch_cnt:cnt,
    save_search_history(seachKey,cnt){//保存搜索记录
      if(!seachKey){
        return false
      }
      cnt = cnt||this.hisSearch_cnt||5;//仅保留几条记录
      let localData = request(this.hisSearch_path) || "[]";
      let lishi = JSON.parse(localData);
      let idex = lishi.indexOf(seachKey);
      if (idex > -1) {
        lishi.splice(idex, 1);
      }
      lishi.push(seachKey);
      lishi = lishi.slice(-cnt);
      writeFile(this.hisSearch_path, JSON.stringify(lishi));
    },
    get_search_data(){//获取本地保存的搜索记录obj对象
      let localData = request(this.hisSearch_path) || "[]";
      return JSON.parse(localData);
    },
    clear_search_data(){//清除搜索记录
      writeFile(this.hisSearch_path, "");
    },
  });
  if (show_pic) {
    d.push({
      pic_url: img,
      col_type: "card_pic_1",
      extra: {
        id: "img",
      },
      desc: "0",
      url: "hiker://search?s=" + name + "&rule=" + rule_name,
    });
  }
  d.push({
    // url: '"hiker://search?s=" + input + "&rule="+MY_RULE.title ',
    title: "🔍搜索",
    url: $.toString((rule_name) => {
      $.save_search_history(input);
      return "hiker://search?s=" + input + "&rule=" + rule_name;
    }, rule_name),
    desc: "输入关键字获取搜索建议…",
    col_type: "input",
    extra: {
      defaultValue:getMyVar('searchKey',''),
      onChange: $.toString((rule_name) => {
          putMyVar('searchKey',input);
          let sug = config.sug || [];
          for (let i in sug) {
            deleteItem(sug[i]);
          }
          if (input) {
            initConfig({
              sug: [input],
            });
            http.fetch("https://s.video.qq.com/smartbox?callback=fn&plat=2&ver=0&num=5&otype=json&query=" + input, {}).success((data) => {
                let gg = JSON.parse(data.split("fn(")[1].replace("})", "}")).item;
                putVar("建议数据", gg);
                let dd = gg.find((e) => e.dc);
                if (dd) {
                  setItem("建议海报", dd.dc);
                  setItem("建议片名", dd.word);
                  //log(dd.word)
                  updateItem("img", {
                    img: dd.dc,
                    url: "hiker://search?s=" + dd.word + "&rule=" + rule_name,
                    extra: {
                      id: "img",
                    },
                  });
                }
              }).error((msg) => log(msg.toString())).start(log("开始获取搜索建议:" + input));
            let gg = JSON.parse(getVar("建议数据"));
            deleteItemByCls("#s");
            for (let i in gg) {
              let skey = gg[i].word;
              addItemAfter("history_search", {
                title: skey,
                url: $("#noLoading#").lazyRule((skey,rule_name) => {
                    $.save_search_history(skey);
                    return "hiker://search?s=" + skey + "&rule=" + rule_name;
                  }, skey,rule_name),
                col_type: "text_1",
                extra: {
                  id: input,
                  cls: "#s",
                },
              });
            }
          } else {
            deleteItemByCls("#s");
            //默认
            config.sug = $.get_search_data().slice(-3);
            initConfig({
              sug: config.sug,
            });
          }
        }, rule_name),
      titleVisible: true,
      id: "search",
    },
  });
  d.push({
    title: "清除搜索记录",
    col_type: "text_2",
    url: $("确认清空搜索记录?").confirm(() => {
      $.clear_search_data();
      return "toast://已清除";
    }),
  });
  d.push({
    title: "历史搜索",
    col_type: "text_2",
    url: $().lazyRule((rule_name) => {
      let search_history_data = $.get_search_data();
      if (search_history_data.length < 1) {
        return "toast://暂无历史搜索";
      }
      return $(search_history_data, 2, "选择1条搜索记录").select((rule_name) => {
        putMyVar('searchKey',input);
        let new_extra = Object.assign(findItem('search').extra,{
          defaultValue:input
        });
        updateItem('search',{extra:new_extra});
        return "hiker://search?s=" + input + "&rule=" + rule_name;
      },rule_name);
    },rule_name),
    extra: {
      id: "history_search",
    },
  });
  d.push({
    col_type: "blank_block",
  });
  //setResult(d)
}
//搜索建议(d, true)