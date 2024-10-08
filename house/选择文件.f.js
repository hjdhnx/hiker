({
  getIconPath() {
      return {
          TypeIconObject: {
              ".js": "hiker://files/icon/文件类型/js.svg",
              ".log": "hiker://files/icon/文件类型/log.svg",
              ".html": "hiker://files/icon/文件类型/html.svg",
              ".apk": "hiker://files/icon/文件类型/apk.svg",
              ".json": "hiker://files/icon/文件类型/json.svg",
              ".css": "hiker://files/icon/文件类型/css.svg",
              ".zip": "hiker://files/icon/文件类型/zip.svg",
              ".hiker": "hiker://files/icon/文件类型/hiker.svg",
              ".mp4": "hiker://files/icon/文件类型/mp4.svg",
              ".gif": "hiker://files/icon/文件类型/gif.svg",
              ".mp3": "hiker://files/icon/文件类型/mp3.svg"
          },
          typePic: [".svg", ".png", ".jpg"],
          defaultIcon: "hiker://files/icon/文件类型/文件.svg",
          dirIcon: "hiker://files/icon/文件类型/文件夹.svg"
      }
  },
  loadIcon() {
      let fileSelectRoot = "https://dr.playdreamer.cn/";
      let iconHttp = Object.entries({
          js: fileSelectRoot + "img/文件类型/js.svg",
          log: fileSelectRoot + "img/文件类型/log.svg",
          html: fileSelectRoot + "img/文件类型/html.svg",
          apk: fileSelectRoot + "img/文件类型/apk.svg",
          json: fileSelectRoot + "img/文件类型/json.svg",
          css: fileSelectRoot + "img/文件类型/css.svg",
          zip: fileSelectRoot + "img/文件类型/zip.svg",
          hiker: fileSelectRoot + "img/文件类型/hiker.svg",
          mp4: fileSelectRoot + "img/文件类型/mp4.svg",
          gif: fileSelectRoot + "img/文件类型/gif.svg",
          mp3: fileSelectRoot + "img/文件类型/mp3.svg",
          "文件": fileSelectRoot + "img/文件类型/文件.svg",
          "文件夹": fileSelectRoot + "img/文件类型/文件夹.svg"
      });
      for (let icon of iconHttp) {
          saveImage(icon[1], `hiker://files/icon/文件类型/${icon[0]}.svg`)
      }
      toast("图标加载完成")
  },
  fileSelectionUri(configs) {
      return $("hiker://empty#noRefresh##noRecordHistory##noHistory#").rule(configs => {
          let f = require(configs.requireUrl);
          f.fileSelection(configs)
      }, configs)
  },
  fileSelection(MYPARAMS) {
      const Paths = java.nio.file.Paths;
      const Files = java.nio.file.Files;
      const Thread = java.lang.Thread;
      const load = this.init().loadFile;

      function getId(length) {
          return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
      }
      let configs = Object.assign({
          callback: "",
          fileType: "",
          pattern: 0,
          onClickType: "lazyRule",
          cHomeTips: "确认选择[${name}]",
          cSearchTips: "确认选择[${path}]",
          requireUrl: "https://dr.playdreamer.cn/js/fileSelect.js",
          memory: "",
          initialPath: getPath("hiker://files/").slice(7),
          rootDirPath: getPath("hiker://files/").slice(7)
      }, MYPARAMS);
      if (!["lazyRule", "confirm"].includes(configs.onClickType)) throw new Error("错误的onClickType");
      configs.uid = getId(4);
      if (!fileExist("hiker://files/icon/文件类型")) {
          this.loadIcon()
      }(function() {
          let dirPath = Paths.get(configs.rootDirPath);
          let file = dirPath.toFile();
          if (!file.exists() || !file.isDirectory()) {
              back(false);
              toast("root:不存在该文件夹");
              return
          }
          let count = Number(dirPath.getNameCount());
          if (typeof configs.memory === "string" && configs.memory.length > 0) {
              configs.initialPath = getMyVar(configs.memory, configs.initialPath)
          }
          let dirPathInit = Paths.get(configs.initialPath);
          let fileInit = dirPathInit.toFile();
          if (!fileInit.exists() || !fileInit.isDirectory()) {
              back(false);
              toast("init:不存在该文件夹");
              return
          }
          let countInit = Number(dirPathInit.getNameCount());
          if (countInit < count) {
              back(false);
              toast("init:<root:");
              return
          }
          let data = [];
          data.push({
              title: "搜索",
              url: $.toString(configs => {
                  input = input.trim();
                  if (input) {
                      return $("hiker://empty#noRefresh##noRecordHistory##noHistory##fullTheme#").rule((configs, key) => {
                          let f = require(configs.requireUrl);
                          f.search(configs, key)
                      }, configs, input)
                  }
              }, configs),
              col_type: "input",
              extra: {
                  id: `${configs.uid}#搜索框1`,
                  onChange: $.toString(uid => {
                      if (getMyVar(`${uid}:back`, "") === "true") {
                          clearMyVar(`${uid}:back`);
                          back(false);
                          return
                      }
                  }, configs.uid),
                  configs: configs
              }
          });
          data.push({
              col_type: "blank_block",
              extra: {
                  id: `${configs.uid}#变量`,
                  count: countInit,
                  currentPath: configs.initialPath
              }
          }, {
              title: "根目录：",
              col_type: "flex_button",
              url: "hiker://empty"
          }, {
              title: "# ‘‘" + dirPath.getFileName() + "’’ #",
              col_type: "flex_button",
              url: $("#noLoading#").lazyRule(function labels(path, configs, count) {
                  let load = require(configs.requireUrl).init().loadFile;
                  let lastCount = findItem(`${configs.uid}#变量`).extra.count || count;
                  let del = [];
                  for (let i = count; i <= lastCount; i++) {
                      del.push(`${configs.uid}#路径${i}`)
                  }
                  if (del.length > 0) {
                      deleteItem(del)
                  }
                  load(path, configs);
                  return "hiker://empty"
              }, dirPath.toString(), configs, count)
          }, {
              col_type: "blank_block",
              extra: {
                  id: `${configs.uid}#路径${count-1}`
              }
          });
          if (configs.pattern === 1) {
              data.push({
                  title: "创建目录",
                  url: $("").input(configs => {
                      input = input.trim();
                      if (!input) return "toast://不支持空白文件名";
                      const Paths = java.nio.file.Paths;
                      const Files = java.nio.file.Files;
                      let path = findItem(`${configs.uid}#变量`).extra.currentPath;
                      let newPath = Paths.get(path, input);
                      if (Files.exists(newPath)) {
                          return "toast://创建失败:已存在"
                      } else {
                          try {
                              Files.createDirectory(newPath);
                              let load = require(configs.requireUrl).init().loadFile;
                              load(path, configs);
                              return "toast://创建成功"
                          } catch (e) {
                              return "toast://创建失败:" + e.toString()
                          }
                      }
                  }, configs),
                  col_type: "text_2"
              });
              data.push({
                  title: "‘‘选择此文件夹’’",
                  url: $("#noLoading#").lazyRule((callback, uid) => {
                      let path = findItem(`${uid}#变量`).extra.currentPath;
                      let callbackFunc = new Function("PATH", `return ${callback}`);
                      let callbackResult = callbackFunc(path);
                      if (callbackResult === true) {
                          back(false);
                          return "hiker://empty"
                      } else if (callbackResult === false) {
                          return "hiker://empty"
                      }
                      return callbackResult
                  }, configs.callback, configs.uid),
                  col_type: "text_2"
              })
          }
          data.push({
              col_type: "line_blank",
              extra: {
                  id: `${configs.uid}#文件夹`
              }
          }, {
              col_type: "line_blank",
              extra: {
                  id: `${configs.uid}#文件`
              }
          }, {
              col_type: "line_blank"
          });
          setResult(data);
          Thread.sleep(100);
          load(configs)
      })()
  },
  init() {
      const Paths = java.nio.file.Paths;
      const Files = java.nio.file.Files;
      const File = java.io.File;
      const Thread = java.lang.Thread;
      const {
          TypeIconObject,
          typePic,
          defaultIcon,
          dirIcon
      } = this.getIconPath();
      const TypeIcon = new Map(Object.entries(TypeIconObject));

      function getExtension(originalFilename) {
          originalFilename = String(originalFilename);
          let i = originalFilename.lastIndexOf(".");
          if (i === -1) {
              return ""
          }
          let suffix = originalFilename.substring(i);
          return suffix.toLowerCase()
      }

      function refreshDir(path, configs, isBack) {
          let load = require(configs.requireUrl).init().loadFile;
          load(path, configs);
          if (isBack) {
              back(false)
          }
          return "hiker://empty"
      }

      function choose(path, configs, type, isBack) {
          let callbackFunc = new Function("PATH", "TYPE", `return ${configs.callback}`);
          let callbackResult = callbackFunc(path, type);
          if (callbackResult === true) {
              if (isBack) {
                  putMyVar(`${configs.uid}:back`, "true");
                  let extra = findItem(`${configs.uid}#搜索框1`).extra;
                  updateItem({
                      extra: extra
                  })
              }
              back(false);
              return "hiker://empty"
          } else if (callbackResult === false) {
              return "hiker://empty"
          }
          return callbackResult
      }

      function findFile(baseDir, key, callback, depth) {
          depth = depth || 0;
          if (!baseDir.exists() || !baseDir.isDirectory() || depth > 5) {
              return
          }
          let files = baseDir.listFiles();
          if (files == null) {
              return
          }
          for (let file of files) {
              let isDirectory = file.isDirectory();
              if (String(file.getName()).includes(key)) {
                  callback(file, isDirectory)
              }
              if (isDirectory) {
                  findFile(file, key, callback, depth + 1)
              }
          }
      }

      function labels(path, configs, count) {
          let load = require(configs.requireUrl).init().loadFile;
          let lastCount = findItem(`${configs.uid}#变量`).extra.count || count;
          let del = [];
          for (let i = count + 1; i <= lastCount; i++) {
              del.push(`${configs.uid}#路径${i}`)
          }
          if (del.length > 0) {
              deleteItem(del)
          }
          load(path, configs);
          return "hiker://empty"
      }
      let exports = {};

      function loadTag(pathT, configs) {
          let targetPath, datumPath, id;
          if (configs === undefined) {
              configs = pathT;
              targetPath = configs.initialPath;
              datumPath = configs.rootDirPath
          } else {
              targetPath = pathT;
              datumPath = findItem(`${configs.uid}#变量`).extra.currentPath
          }
          targetPath = Paths.get(targetPath);
          datumPath = Paths.get(datumPath);
          let targetCount = targetPath.getNameCount();
          let datumCount = datumPath.getNameCount();
          let tempPath = datumPath;
          for (let i = datumCount; i > 0 && i < targetCount; i++) {
              tempPath = tempPath.resolve(targetPath.getName(i));
              addItemAfter(`${configs.uid}#路径${i-1}`, {
                  title: tempPath.getFileName() + " >",
                  col_type: "scroll_button",
                  url: $("#noLoading#").lazyRule(labels, tempPath.toString(), configs, i),
                  extra: {
                      id: `${configs.uid}#路径${i}`
                  }
              })
          }
          updateItem({
              extra: {
                  id: `${configs.uid}#变量`,
                  count: targetCount,
                  currentPath: targetPath.toString()
              }
          });
          return targetPath
      }
      exports.loadFile = function(path, configs) {
          let dirPath;
          if (configs === undefined) {
              configs = path;
              dirPath = loadTag(configs)
          } else {
              dirPath = loadTag(path, configs)
          }
          if (typeof configs.memory === "string" && configs.memory.length > 0) {
              putMyVar(configs.memory, dirPath.toString())
          }
          deleteItemByCls(`${configs.uid}.文件(夹)`);
          let wjj = [];
          let wj = [];
          let targetType = new RegExp(configs.fileType);
          let files;
          try {
              files = Files.list(dirPath)
          } catch (e) {
              if (e.message.includes("java.nio.file.AccessDeniedException")) {
                  toast("权限不足:" + e.lineNumber)
              } else {
                  toast("出错了")
              }
              return
          }
          if (files == null) {
              return
          }
          let tips = configs.onClickType === "confirm" ? configs.cHomeTips : "#noLoading#";
          files.forEach(dirPath => {
              let name = String(dirPath.getFileName());
              let path = String(dirPath.toString());
              if (Files.isDirectory(dirPath)) {
                  wjj.push({
                      title: name,
                      url: $("#noLoading#").lazyRule(refreshDir, path, configs),
                      pic_url: dirIcon,
                      col_type: "avatar",
                      extra: {
                          cls: `${configs.uid}.文件(夹)`
                      }
                  })
              } else if (configs.pattern === 0) {
                  let type = getExtension(name);
                  if (configs.fileType && !targetType.test(type)) {
                      return
                  }
                  let pic_url = (typePic.includes(type) ? path : TypeIcon.get(type)) || defaultIcon;
                  wj.push({
                      title: name,
                      url: $(tips.replace("${name}", name).replace("${path}", path))[configs.onClickType](choose, path, configs, type),
                      pic_url: pic_url,
                      col_type: "avatar",
                      extra: {
                          cls: `${configs.uid}.文件(夹)`
                      }
                  })
              }
          });
          Thread.sleep(50);
          if (wjj.length > 0) {
              addItemAfter(`${configs.uid}#文件夹`, wjj)
          }
          if (wj.length > 0) {
              addItemAfter(`${configs.uid}#文件`, wj)
          }
      };
      exports.loadSearch = function(key, configs) {
          deleteItemByCls(`${configs.uid}.搜索-文件夹`);
          deleteItemByCls(`${configs.uid}.搜索-文件`);
          if (key == "") return;
          let path = findItem(`${configs.uid}#变量`).extra.currentPath;
          let targetType = new RegExp(configs.fileType);
          let wjj = [];
          let wj = [];
          let tips = configs.onClickType === "confirm" ? configs.cSearchTips : "#noLoading#";
          findFile(new File(path), key, (file, isDirectory) => {
              let name = String(file.getName());
              let path = String(file.getPath());
              if (isDirectory) {
                  wjj.push({
                      title: name,
                      url: $("#noLoading#").lazyRule(refreshDir, path, configs, true),
                      pic_url: dirIcon,
                      col_type: "avatar",
                      extra: {
                          cls: `${configs.uid}.搜索-文件夹`
                      }
                  })
              } else if (configs.pattern === 0) {
                  let type = getExtension(name);
                  if (configs.fileType && !targetType.test(type)) {
                      return
                  }
                  let pic_url = (typePic.includes(type) ? path : TypeIcon.get(type)) || defaultIcon;
                  wj.push({
                      title: name,
                      url: $(tips.replace("${name}", name).replace("${path}", path))[configs.onClickType](choose, path, configs, type, true),
                      pic_url: pic_url,
                      col_type: "avatar",
                      extra: {
                          cls: `${configs.uid}.搜索-文件`
                      }
                  })
              }
          });
          Thread.sleep(50);
          if (wjj.length > 0) {
              addItemAfter(`${configs.uid}#搜索-文件夹`, wjj)
          }
          if (wj.length > 0) {
              addItemAfter(`${configs.uid}#搜索-文件`, wj)
          }
      };
      return exports
  },
  search(configs, key) {
      let data = [];
      data.push({
          title: "❌",
          desc: "搜索",
          url: "back(false);",
          col_type: "input",
          extra: {
              defaultValue: key,
              onChange: $.toString(configs => {
                  input = input.trim();
                  let value1 = findItem(`${configs.uid}#搜索-变量`) || {};
                  updateItem(`${configs.uid}#搜索-变量`, {
                      desc: input,
                      url: value1.url + 1
                  });
                  java.lang.Thread.sleep(600);
                  let value2 = findItem(`${configs.uid}#搜索-变量`) || {};
                  if (value2.desc === input && value2.desc !== value1.desc) {
                      updateItem(`${configs.uid}#搜索-状态`, {
                          title: "““搜索中 ҉””"
                      });
                      let load = require(configs.requireUrl).init().loadSearch;
                      load(input, configs);
                      let value3 = findItem(`${configs.uid}#搜索-变量`) || {};
                      if (value3.url !== undefined && value3.url === value2.url) {
                          updateItem(`${configs.uid}#搜索-状态`, {
                              title: "‘‘加载完成’’"
                          })
                      }
                  }
              }, configs)
          }
      });
      data.push({
          title: "““搜索中 ҉””",
          col_type: "scroll_button",
          url: "toast://搜索文件夹",
          extra: {
              id: `${configs.uid}#搜索-状态`
          }
      }, {
          title: findItem(`${configs.uid}#变量`).extra.currentPath,
          col_type: "scroll_button",
          url: "toast://搜索文件夹"
      }, {
          col_type: "blank_block"
      }, {
          col_type: "line_blank",
          extra: {
              id: `${configs.uid}#搜索-文件夹`
          }
      }, {
          col_type: "blank_block",
          url: 0,
          extra: {
              id: `${configs.uid}#搜索-变量`
          }
      }, {
          col_type: "line_blank",
          extra: {
              id: `${configs.uid}#搜索-文件`
          }
      }, {
          col_type: "blank_block"
      }, {
          col_type: "line_blank"
      });
      setResult(data)
  }
});
