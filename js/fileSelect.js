//By LoyDgIk
//Time 2022/08/02
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
        };
    },
    loadIcon() {
        let fileSelectRoot = 'https://gitcode.net/qq_32394351/dr/-/raw/master/';
        let iconHttp = Object.entries({
            "js": fileSelectRoot + "img/文件类型/js.svg",
            "log": fileSelectRoot + "img/文件类型/log.svg",
            "html": fileSelectRoot + "img/文件类型/html.svg",
            "apk": fileSelectRoot + "img/文件类型/apk.svg",
            "json": fileSelectRoot + "img/文件类型/json.svg",
            "css": fileSelectRoot + "img/文件类型/css.svg",
            "zip": fileSelectRoot + "img/文件类型/zip.svg",
            "hiker": fileSelectRoot + "img/文件类型/hiker.svg",
            "mp4": fileSelectRoot + "img/文件类型/mp4.svg",
            "gif": fileSelectRoot + "img/文件类型/gif.svg",
            "mp3": fileSelectRoot + "img/文件类型/mp3.svg",
            "文件": fileSelectRoot + "img/文件类型/文件.svg",
            "文件夹": fileSelectRoot + "img/文件类型/文件夹.svg"
        });
        for (let icon of iconHttp) {
            saveImage(icon[1], `hiker://files/icon/文件类型/${icon[0]}.svg`);
        }
        toast("图标加载完成");
    },
    fileSelectionUri(configs) {
        return $("hiker://empty#noRefresh##noRecordHistory##noHistory#").rule((configs) => {
            let f = require(configs.requireUrl);
            f.fileSelection(configs);
        }, configs);
    },
    getId(length) {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    },
    fileSelection(MYPARAMS) {
        const Paths = java.nio.file.Paths;
        const Files = java.nio.file.Files;
        const Thread = java.lang.Thread;
        const load = this.init().loadFile;

        let configs = Object.assign({
            callback: "",   //*必填 回调函数
            fileType: "",   //pattern:0时过滤目标文件的扩展名
            pattern: 0,   //0选择文件 1选择文件夹
            onClickType: "lazyRule",    //点击弹窗方式
            cHomeTips: "确认选择[${name}]",   //onClickType:confirm时主页点击提示词
            cSearchTips: "确认选择[${path}]",   //onClickType:confirm时搜索点击提示词
            requireUrl:"",     //*必填 该模块引用地址
            memory: "",    //是否开启记录功能(分配MyVar变量名)
            //exitSearchRefresh: false,   //退出搜索刷新列表
            initialPath: getPath("hiker://files/").slice(7),    //初始目录
            rootDirPath: getPath("hiker://files/").slice(7)    //根目录
        }, MYPARAMS);
        if(!["lazyRule","confirm"].includes(configs.onClickType)) throw new Error("错误的onClickType");
        configs.uid = this.getId(6);
        if (!fileExist("hiker://files/icon/文件类型")) {
            this.loadIcon();
        }
        const colTypes = ["avatar", "icon_2", "icon_2_round", "icon_4", "icon_4_card", "icon_small_4", "icon_round_4", "icon_round_small_4", "icon_5"];
        //(function() {
        let dirPath = Paths.get(configs.rootDirPath);
        let file = dirPath.toFile();
        if (!file.exists() || !file.isDirectory()) {
            back(false);
            toast("root:不存在该文件夹");
            return;
        }
        let count = Number(dirPath.getNameCount());
        if(typeof configs.memory === "string" && configs.memory.length>0){
            configs.initialPath = getMyVar(configs.memory, configs.initialPath);
        }
        let dirPathInit = Paths.get(configs.initialPath);
        let fileInit = dirPathInit.toFile();
        if (!fileInit.exists() || !fileInit.isDirectory()) {
            back(false);
            toast("init:不存在该文件夹");
            return;
        }
        let countInit = Number(dirPathInit.getNameCount());
        if(countInit < count){
            back(false);
            toast("init:<root:");
            return;
        }
        let data = [];
        //new
        data.push({
            title: "搜索",
            url: $.toString((configs) => {
                input = input.trim();
                if (input) {
                    return $("hiker://empty#noRefresh##noRecordHistory##noHistory##fullTheme#").rule((configs, key) => {
                        let f = require(configs.requireUrl);
                        let isRegular = findItem(`${configs.uid}#正则`).extra.isRegular||false;
                        configs.isRegular = isRegular;
                        f.search(configs, key);
                    }, configs, input);
                }
            }, configs),
            col_type: "input",
            extra: {
                id: `${configs.uid}#搜索框1`,
                onChange: $.toString((uid) => {
                    if (getMyVar(`${uid}:back`, "") === "true") {
                        clearMyVar(`${uid}:back`);
                        back(false);
                        return;
                    }
                }, configs.uid),
                configs: configs
            }
        });
        //new end
        data.push({
            col_type: "blank_block",
            extra: {
                id: `${configs.uid}#变量`,
                count: countInit,
                currentPath: configs.initialPath
            }
        }, {
            title: "🔍正则◎",
            col_type: "flex_button",
            url: $("#noLoading#").lazyRule((uid)=>{
                let v = findItem(`${uid}#正则`).extra.isRegular;
                if(v){
                    updateItem({
                        title: "🔍正则◎",
                        extra:{
                            id:`${uid}#正则`,
                            isRegular: false
                        }
                    });
                }else{
                    updateItem({
                        title: "🔍正则●",
                        extra:{
                            id: `${uid}#正则`,
                            isRegular: true
                        }
                    });
                }
                return "hiker://empty";
            }, configs.uid),
            extra: {
                id: `${configs.uid}#正则`,
                isRegular: false
            }
        }, {
            title: "🧩" + colTypes[0],
            col_type: "flex_button",
            url: $(colTypes, 2, "选择-显示样式").select((configs)=>{
                updateItem({
                    title: "🧩"+input,
                    extra:{
                        id: `${configs.uid}#样式`,
                        colType: input
                    }
                });
                let load = require(configs.requireUrl).init().loadFile;
                let path = findItem(`${configs.uid}#变量`).extra.currentPath;
                load(path, configs, true);
            }, configs),
            extra: {
                id: `${configs.uid}#样式`,
                colType: colTypes[0]
            }
        }, {
            title:"🏠#‘‘" + dirPath.getFileName() + "’’#",
            col_type: "flex_button",
            url: $("#noLoading#").lazyRule(function labels(path, configs, count){
                let load = require(configs.requireUrl).init().loadFile;
                let lastCount = findItem(`${configs.uid}#变量`).extra.count || count;
                let del = [];

                for (let i = count; i <= lastCount; i++) {
                    del.push(`${configs.uid}#路径${i}`);
                }
                if (del.length > 0) {
                    deleteItem(del);
                }
                load(path, configs, true);
                return "hiker://empty";
            }, dirPath.toString(), configs, count),
        },{
            col_type:"blank_block",
            extra: {
                id: `${configs.uid}#路径${count-1}`
            }
        });

        if (configs.pattern === 1) {
            data.push({
                title: "创建目录",
                url: $("").input((configs) => {
                    //input = input.trim();
                    if (!input) return "toast://不支持空文件名";
                    const Paths = java.nio.file.Paths;
                    const Files = java.nio.file.Files;
                    let path = findItem(`${configs.uid}#变量`).extra.currentPath;
                    let newPath = Paths.get(path, input);
                    if (Files.exists(newPath)) {
                        return "toast://创建失败:已存在";
                    } else {
                        try {
                            Files.createDirectory(newPath);
                            let load = require(configs.requireUrl).init().loadFile;
                            load(path, configs);
                            return "toast://创建成功";
                        } catch (e) {
                            return "toast://创建失败:" + e.toString();
                        }
                    }
                }, configs),
                col_type: "text_2"
            });
            data.push({
                title: "‘‘选择此文件夹’’",
                url: $("#noLoading#").lazyRule((callback, uid) => {
                    let v = findItem(`${uid}#变量`).extra;
                    let path = v.currentPath;
                    let cls = v.itemCls;
                    let callbackFunc = new Function("PATH", "CLS", `return ${callback}`);
                    let callbackResult = callbackFunc(path, cls);
                    if (callbackResult === true) {
                        back(false);
                        return "hiker://empty";
                    } else if (callbackResult === false) {
                        return "hiker://empty";
                    }
                    return callbackResult;
                }, configs.callback, configs.uid),
                col_type: "text_2"
            });
        }
        data.push({
            col_type: "line_blank",
            extra: {
                id: `${configs.uid}#文件夹`
            }
        }, {
            col_type: "blank_block"
        }, {
            col_type: "blank_block"
        }, {
            col_type: "line_blank",
            extra: {
                id: `${configs.uid}#文件`
            }
        }, {
            col_type: "blank_block"
        }, {
            col_type: "line_blank"
        });
        setResult(data);
        Thread.sleep(100);
        load(configs);
        //})()
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
        let $this = this;
        const TypeIcon = new Map(Object.entries(TypeIconObject));
        function getExtension(originalFilename) {
            originalFilename = String(originalFilename);
            let i = originalFilename.lastIndexOf(".");
            if (i === -1) {
                return "";
            }
            let suffix = originalFilename.substring(i);
            return suffix.toLowerCase();
        }
        function refreshDir(path, configs, isBack) {
            let load = require(configs.requireUrl).init().loadFile;
            load(path, configs);
            if (isBack) {
                back(false);
            }
            return "hiker://empty";
        }
        function choose(configs, isBack, id) {
            let callbackFunc = new Function("PATH", "TYPE", "ID", `return ${configs.callback}`);
            let v = findItem(id).extra;
            let path = v.path, type = v.type;
            let callbackResult = callbackFunc(path, type, id);
            if (callbackResult === true) {
                if (isBack) {
                    putMyVar(`${configs.uid}:back`, "true");
                    let extra = findItem(`${configs.uid}#搜索框1`).extra;
                    updateItem({
                        extra: extra
                    });
                }
                back(false);
                return "hiker://empty";
            } else if (callbackResult === false) {
                return "hiker://empty";
            }
            return callbackResult;
        }
        function findFile(baseDir, findFunc, callback, depth) {
            depth = depth || 0;
            if (!baseDir.exists() || !baseDir.isDirectory() || depth > 5) {
                return;
            }
            let files = baseDir.listFiles();
            if(files == null){
                return;
            }
            for (let file of files) {
                let isDirectory = file.isDirectory();
                if (findFunc(String(file.getName()))) {
                    callback(file, isDirectory);
                }
                if (isDirectory) {
                    findFile(file, findFunc, callback, depth + 1);
                }
            }
        }
        function labels(path, configs, count){
            let load = require(configs.requireUrl).init().loadFile;
            let lastCount = findItem(`${configs.uid}#变量`).extra.count || count;
            let del = [];

            for (let i = count + 1; i <= lastCount; i++) {
                del.push(`${configs.uid}#路径${i}`);
            }
            if (del.length > 0) {
                deleteItem(del);
            }
            load(path, configs, true);
            return "hiker://empty";
        }
        let exports = {};
        function loadTag(pathT, configs){
            let targetPath, datumPath,id;
            if(configs===undefined){
                configs = pathT;
                targetPath = configs.initialPath;
                datumPath = configs.rootDirPath;

            } else {
                targetPath = pathT;
                datumPath = findItem(`${configs.uid}#变量`).extra.currentPath;
            }
            targetPath = Paths.get(targetPath);
            datumPath = Paths.get(datumPath);
            let targetCount = targetPath.getNameCount();
            let datumCount = datumPath.getNameCount();
            let tempPath = datumPath;
            for (let i = datumCount; i>0&&i <targetCount; i++) {
                tempPath = tempPath.resolve(targetPath.getName(i));
                addItemAfter(`${configs.uid}#路径${i-1}`, {
                    title: tempPath.getFileName() + " >",
                    col_type: "scroll_button",
                    url: $("#noLoading#").lazyRule(labels, tempPath.toString(), configs, i),
                    extra: {
                        id: `${configs.uid}#路径${i}`
                    }
                });
            }
            return targetPath;
        };
        exports.loadFile = function(path, configs, noTag) {
            let dirPath;
            if(noTag){
                dirPath = Paths.get(path);
            }else if(configs===undefined){
                configs = path;
                dirPath = loadTag(configs);
            }else{
                dirPath = loadTag(path, configs);
            }
            if(typeof configs.memory==="string"&&configs.memory.length>0){
                putMyVar(configs.memory, dirPath.toString());
            }
            deleteItemByCls(`${configs.uid}.文件(夹)`);
            let files;
            try{
                files = Files.list(dirPath);
            }catch(e){
                if(e.message.includes("java.nio.file.AccessDeniedException")){
                    toast("权限不足:"+e.lineNumber);
                }else{
                    toast("出错了");
                }
                return;
            }
            if(files == null){
                return;
            }
            let wjj = [], wj = [];
            let itemCls = $this.getId(4), itemId = $this.getId(5);
            let targetType = new RegExp("("+configs.fileType+")$");
            let tips = configs.onClickType === "confirm"?configs.cHomeTips:"#noLoading#";
            let iki = 0;
            let colType = findItem(`${configs.uid}#样式`).extra.colType;
            updateItem({
                extra: {
                    id: `${configs.uid}#变量`,
                    count: dirPath.getNameCount(),
                    currentPath: dirPath.toString(),
                    itemCls: itemCls
                }
            });
            files.forEach(dirPath => {
                let name = String(dirPath.getFileName());
                let path = String(dirPath.toString());
                if (Files.isDirectory(dirPath)) {
                    wjj.push({
                        title: name,
                        url: $("#noLoading#").lazyRule(refreshDir, path, configs),
                        pic_url: dirIcon,
                        col_type: colType,
                        extra: {
                            cls: `${configs.uid}.文件(夹) ${itemCls}`
                        }
                    });
                } else if (configs.pattern === 0) {
                    let type = getExtension(name);
                    if (configs.fileType && !targetType.test(type)) {
                        return;
                    }
                    let id = itemId+iki++;
                    let pic_url = (typePic.includes(type) ? path : TypeIcon.get(type)) || defaultIcon;
                    wj.push({
                        title: name,
                        url: $(tips.replace("${name}",name).replace("${path}",path))[configs.onClickType](choose, configs, false, id),
                        pic_url: pic_url,
                        col_type: colType,
                        extra: {
                            cls: `${configs.uid}.文件(夹) ${itemCls}`,
                            id: id,
                            path: path,
                            type: type
                        }
                    });
                }
            });
            Thread.sleep(50);
            if (wjj.length > 0) {
                addItemAfter(`${configs.uid}#文件夹`, wjj);
                //Thread.sleep(50);
            }
            if (wj.length > 0) {
                addItemAfter(`${configs.uid}#文件`, wj);
            }
        };
        exports.loadSearch = function(key, configs) {
            deleteItemByCls(`${configs.uid}.搜索-文件夹`);
            deleteItemByCls(`${configs.uid}.搜索-文件`);
            if (key == "") return;
            let path = findItem(`${configs.uid}#变量`).extra.currentPath;
            let targetType = new RegExp("("+configs.fileType+")$");
            let wjj = [], wj = [];
            let tips = configs.onClickType === "confirm"?configs.cSearchTips:"#noLoading#";
            let itemId = $this.getId(7);
            let iki = 0;
            let colType = findItem(`${configs.uid}#样式`).extra.colType;
            if(configs.isRegular){
                var keyReg = new RegExp(key);
                var findFunc = (name)=>keyReg.test(name);
            }else{
                var findFunc = (name)=>name.includes(key);
            }
            findFile(new File(path), findFunc, (file, isDirectory) => {
                let name = String(file.getName());
                let path = String(file.getPath());
                if (isDirectory) {
                    wjj.push({
                        title: name,
                        url: $("#noLoading#").lazyRule(refreshDir, path, configs, true),
                        pic_url: dirIcon,
                        col_type: colType,
                        extra: {
                            cls: `${configs.uid}.搜索-文件夹`
                        }
                    });
                } else if (configs.pattern === 0) {
                    let type = getExtension(name);
                    if (configs.fileType && !targetType.test(type)) {
                        return;
                    }
                    let id = itemId+iki++;
                    let pic_url = (typePic.includes(type) ? path : TypeIcon.get(type)) || defaultIcon;
                    wj.push({
                        title: name,
                        url: $(tips.replace("${name}",name).replace("${path}",path))[configs.onClickType](choose, configs, true, id),
                        pic_url: pic_url,
                        col_type: colType,
                        extra: {
                            cls: `${configs.uid}.搜索-文件`,
                            id: id,
                            path: path,
                            type: type
                        }
                    });
                }
            });
            Thread.sleep(50);
            if (wjj.length > 0) {
                addItemAfter(`${configs.uid}#搜索-文件夹`, wjj);
                //Thread.sleep(50);
            }
            if (wj.length > 0) {
                addItemAfter(`${configs.uid}#搜索-文件`, wj);
            }
        };
        return exports;
    },
    search(configs, key) {
        let data = [];
        let basePath = findItem(`${configs.uid}#变量`).extra.currentPath;
        //new
        addListener("onClose", $.toString((path, configs)=>{
            try{
                if(configs.exitSearchRefresh){
                    let load = require(configs.requireUrl).init().loadFile;
                    load(path, configs, true);
                }
            }catch(e){}
        }, basePath, configs));
        data.push({
            title: "❌",
            desc: "搜索",
            url: "back(false);",
            col_type: "input",
            extra: {
                defaultValue: key,
                onChange: $.toString((configs) => {
                    //input = input.trim();
                    try{
                        let value1 = findItem(`${configs.uid}#搜索-变量`)||{};
                        updateItem(`${configs.uid}#搜索-变量`, {
                            desc: input,
                            url: value1.url + 1
                        });
                        java.lang.Thread.sleep(650);
                        let value2 = findItem(`${configs.uid}#搜索-变量`)||{};
                        if (value2.desc === input&&value2.desc!== value1.desc) {
                            updateItem(`${configs.uid}#搜索-状态`, {
                                title: " ⏳““搜索中 ҉””  "
                            });
                            let load = require(configs.requireUrl).init().loadSearch;
                            load(input, configs);
                            let value3 = findItem(`${configs.uid}#搜索-变量`)||{};
                            if(value3.url!==undefined&&value3.url===value2.url){
                                updateItem(`${configs.uid}#搜索-状态`, {
                                    title: " ⌛‘‘加载完成’’"
                                });
                            }
                        }
                    }catch(e){}
                }, configs)
            }
        });
        //new end
        data.push({
            title: " ⏳““搜索中 ҉””  ",
            col_type: "text_2",
            url: "toast://搜索指示",
            extra:{
                id: `${configs.uid}#搜索-状态`
            }
        },{
            title: "📂" + basePath.substring(basePath.lastIndexOf("/") + 1),
            col_type: "text_2",
            url: "toast://目标文件夹:" + basePath
        },{
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
        setResult(data);
    }
})