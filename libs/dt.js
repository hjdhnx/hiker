/**
 * 本地网页插件链接 hiker://files/rules/js/categories-header.js
 * 子页面链接 hiker://page/categories-header
 * 道长仓库链接 http://hiker.nokia.press/hikerule/rulelist.json?id=2705
 * 码云 Gitee 链接 https://gitee.com/reborn0/HikerRules/raw/master/plugins/categories-header.js
 * codeberg  链接 https://codeberg.org/hjdhnx/hiker/raw/branch/main/js/categories-header.js
 */
/**
 * Object.assign 用法参考链接
 *
 * 1.https://www.daimajiaoliu.com/daima/47139a9e7100407
 * 2.https://segmentfault.com/a/1190000011778875
 * 3.https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
// 利用 Symbol 实现私有变量和私有方法，外界不可访问（参考链接2）
var symbolMap = {
    // checkParams: Symbol('checkParams'),
    mLayout: Symbol('mLayout'),
    true_url: Symbol('true_url'),
    mPage: Symbol('mPage'),
    src: Symbol('src'),
    ruleObjList: Symbol('ruleObjList'),
    mFold: Symbol('mFold'),
    mFoldInnerEnable: Symbol('mFoldInnerEnable'),
    mFoldIndex: Symbol('mFoldIndex'),
    mFoldLayout: Symbol('mFoldLayout'),
    mColor: Symbol('mColor'),
    mTag: Symbol('mTag'),
}

function CategoriesHeader(color) {
    // 'use strict';
    // ...
    // this[symbolMap.listRule] = []
    // this[symbolMap.subListRule] = []
    this[symbolMap.mColor] = color || "#FA7298";
    this[symbolMap.ruleObjList] = []
    this.VARMAP = {
        CATEGORY: "header.category",
        URL: "header.url",
        FOLD: "header.fold",
    }
    this[symbolMap.mFoldLayout] = {
        injectIndex: 1
    }
    this[symbolMap.mFoldIndex] = 1
}

Object.assign(CategoriesHeader.prototype, {
    // Override 构造方法，相当于 function.prototype.constructor = (...) => {...}，new function() 的时候会自动执行
    constructor: CategoriesHeader,
    // 定义私有方法
    checkParams() {
        if (!this[symbolMap.mLayout]) {
            throw new Error("请调用 layout(d) 传入当前界面")
        }
        if (!this[symbolMap.true_url]) {
            throw new Error("请调用 trueUrl(url) 传入当前分类的链接")
        }
        if (!this[symbolMap.mPage]) {
            throw new Error("请调用 page(mPage) 传入当前页数")
        }
        if (this[symbolMap.ruleObjList].length < 1) {
            throw new Error("请调用相关方法传入定位规则")
        }
        if (!this[symbolMap.mFold]) {
            this[symbolMap.mFold] = '0'
        }
    },
    layout(mLayout) {
        this[symbolMap.mLayout] = mLayout
        return this
    },
    trueUrl(url) {
        this[symbolMap.true_url] = url
        return this
    },
    page(mPage) {
        if (typeof (mPage) === 'string') {
            mPage = parseInt(mPage)
        }
        this[symbolMap.mPage] = mPage
        return this
    },
    html(mSrc) {
        this[symbolMap.src] = mSrc
        return this
    },
    list(rule) {
        if (this[symbolMap.ruleObjList].length > 0) {
            throw new Error("list(rule) add(ruleObj) 只能二选一！")
        }
        this[symbolMap.ruleObjList] = [{}]
        this[symbolMap.ruleObjList][0].listRule = rule
        this[symbolMap.ruleObjList][0]['一级分类'] = rule
        return this
    },
    subList(rule) {
        if (this[symbolMap.ruleObjList].length > 1) {
            throw new Error("subList(rule) add(ruleObj) 只能二选一！")
        }
        if (!this[symbolMap.ruleObjList][0] || (!this[symbolMap.ruleObjList][0].listRule && !this[symbolMap.ruleObjList][0]['一级分类'])) {
            throw new Error("请先调用 list(rule) 或 一级分类(rule) 定位一级分类")
        }
        this[symbolMap.ruleObjList][0].subListRule = rule
        this[symbolMap.ruleObjList][0]['子分类'] = rule
        return this
    },
    title(rule) {
        if (this[symbolMap.ruleObjList].length > 1) {
            throw new Error("title(rule) add(ruleObj) 只能二选一！")
        }
        if (!this[symbolMap.ruleObjList][0] || (!this[symbolMap.ruleObjList][0].listRule && !this[symbolMap.ruleObjList][0]['一级分类'])) {
            throw new Error("请先调用 list(rule) 或 一级分类(rule) 定位一级分类")
        }
        this[symbolMap.ruleObjList][0].titleRule = rule
        this[symbolMap.ruleObjList][0]['分类标题'] = this[symbolMap.ruleObjList][0].titleRule
        return this
    },
    url(rule) {
        if (this[symbolMap.ruleObjList].length > 1) {
            throw new Error("url(rule) add(ruleObj) 只能二选一！")
        }
        if (!this[symbolMap.ruleObjList][0] || (!this[symbolMap.ruleObjList][0].listRule && !this[symbolMap.ruleObjList][0]['一级分类'])) {
            throw new Error("请先调用 list(rule) 或 一级分类(rule) 定位一级分类")
        }
        this[symbolMap.ruleObjList][0].urlRule = rule
        this[symbolMap.ruleObjList][0]['分类链接'] = this[symbolMap.ruleObjList][0].urlRule
        return this
    },
    /**
     * 是否开启折叠功能
     *
     * @param enabled true 表示开启，false 表示禁用
     * @returns {CategoriesHeader}
     */
    foldInner(enabled) {
        if (!(typeof (enabled) === 'boolean')) {
            throw new Error("请传入 true 或 false 表示开启或关闭折叠功能！")
        }
        this[symbolMap.mFoldInnerEnable] = enabled
        return this
    },
    /**
     * 从第 index 行开始折叠
     *
     * @param index 开始折叠的行数
     * @returns {CategoriesHeader}
     */
    foldIndex(index) {
        if (!(typeof (index) === 'number')) {
            throw new Error("开始折叠行请传入数字！")
        }
        if (index < 1) {
            throw new Error("开始折叠行请传入大于 0 的整数！")
        }
        this[symbolMap.mFoldIndex] = index || 1;
        return this
    },
    /**
     * 折叠按钮的界面
     *
     * @param layout 与 d.push 结构一致，
     *        例：{ title:"标题1", url:"xxx", col_type:"scroll_button" };
     *        参数采用可选覆盖模式，不写的参数则使用默认;
     *        比如传入 { col_type:"text_1" }，那最终结果就是 { title:"标题1", url:"xxx", col_type:"text_1" }
     * @returns {CategoriesHeader}
     */
    foldLayout(layout) {
        if (typeof layout === 'object') {
            let keys = Object.keys(layout)
            let injectIndex = layout.injectIndex || layout['折叠按钮插入行']
            if (layout.title || layout.url || layout.col_type || injectIndex) {
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i]
                    this[symbolMap.mFoldLayout][key] = layout[key];
                }
            } else {
                throw new Error("请传入正确的折叠界面元素！")
            }
            // injectIndex 折叠按钮插入第 injectIndex 行
            if (injectIndex) {
                if (!(typeof (injectIndex) === 'number')) {
                    throw new Error("折叠按钮插入行请传入数字！")
                }
                if (injectIndex < 1) {
                    throw new Error("折叠按钮插入行请传入大于 0 的整数！")
                }
                if (injectIndex > this[symbolMap.mFoldIndex]) {
                    throw new Error("折叠按钮插入行不得大于显示折叠行数！请调用 .foldIndex(index) 或 .第几行开始折叠(index) 传入正确的显示折叠行数")
                }
                this[symbolMap.mFoldLayout].injectIndex = injectIndex || 1;
            }
        } else {
            throw new Error("请传入正确的折叠界面元素！")
        }
        return this;
    },
    // 当前是否折叠
    fold(isFold) {
        if (typeof (isFold) === 'string') {
            isFold = isFold === '1'
        }
        if (isFold) {
            this[symbolMap.mFold] = '1';
        } else {
            this[symbolMap.mFold] = '0';
        }
        return this
    },
    color(mColor) {
        this[symbolMap.mColor] = mColor
        return this
    },
    tag(mTag) {
        this[symbolMap.mTag] = mTag
        return this
    },
    add(ruleObj) {
        // log($.stringify(ruleObj))
        this[symbolMap.ruleObjList].push(ruleObj)
        return this
    },
    evalJSRule(item, jsRule) {
        let rule = jsRule.replace("@js:", "")
        rule = rule.trim()
        // log($.stringify(rule))
        let input = item
        if (rule.startsWith("(")) {
            eval('result = ' + rule)
        } else {
            /**
             * 还原成 $.toString(...) 的最终结果，达到最终处理方式跟上面的 if 一致的目的
             */
            eval('result = ' + '(() => {' + rule + '})()')
        }
        return (result || '')
    },
    getTitle(src, category) {
        let title = ''
        let titleRule = category.titleRule || 'a&&Text';
        let urlRule = category.urlRule || 'a&&href';
        if (titleRule.startsWith("@js:")) {
            title = this.evalJSRule(src, titleRule)
        } else {
            title = parseDomForHtml(src, titleRule)
        }
        if (urlRule['二次处理名称']) {
            title = urlRule['二次处理名称'](title)
        }
        // if (titleRule['二次处理']) {
        //     title = titleRule['二次处理'](title)
        // }
        return title || "";
    },
    getUrl(src, category) {
        let url = ''
        let urlRule = category.urlRule || 'a&&href'
        if (typeof urlRule === 'object') {
            let mUrlRule = urlRule.rule || urlRule['解析规则'] || 'a&&href';
            if (mUrlRule.startsWith("@js:")) {
                url = this.evalJSRule(src, mUrlRule);
            } else {
                let parse = parseDom;
                if (urlRule.parseOption) {
                    switch (urlRule.parseOption) {
                        case "parseDom":
                        case "pd":
                            parse = parseDom;
                            break;
                        case "parseDomForHtml":
                        case "pdfh":
                            parse = parseDomForHtml;
                            break;
                        default:
                            parse = parseDom;
                    }
                } else if (urlRule["解析方法"]) {
                    switch (urlRule["解析方法"]) {
                        case "parseDom":
                        case "pd":
                            parse = parseDom;
                            break;
                        case "parseDomForHtml":
                        case "pdfh":
                            parse = parseDomForHtml;
                            break;
                        default:
                            parse = parseDom;
                    }
                }
                url = parse(src, mUrlRule);
            }
            if (urlRule.dealUrl) {
                url = urlRule.dealUrl(url)
            } else if (urlRule['二次处理']) {
                url = urlRule['二次处理'](url)
            }
        } else {
            if (urlRule.startsWith("@js:")) {
                url = this.evalJSRule(src, urlRule);
            } else {
                url = parseDom(src, urlRule);
            }
        }
        return url || "";
    },
    build() {
        // 检测是否传入需要的参数
        this.checkParams()
        // 每一个分类的唯一标识
        let mTag = this[symbolMap.mTag] || ""
        //翻页 需要根据实际替换
        let html = this[symbolMap.src] || request(this[symbolMap.true_url])
        let empty = "hiker://empty"
        //获取列表
        let categories = []
        this[symbolMap.ruleObjList].map(ruleObj => {
            let list = []
            let listRule = ruleObj.listRule || ruleObj["一级分类"]
            if (listRule.startsWith("@js:")) {
                // log($.stringify(listRule))
                list = this.evalJSRule(html, listRule)
            } else {
                list = parseDomForArray(html, listRule)
            }
            // log(list)
            list.map(category => {
                categories.push({
                    list: category,
                    subListRule: ruleObj.subListRule || ruleObj["子分类"],
                    titleRule: ruleObj.titleRule || ruleObj["分类标题"],
                    urlRule: ruleObj.urlRule || ruleObj["分类链接"],
                });
            })
        })

        // log($.stringify(categories))

        let init_cate = []
        for (let i = 0; i < 20; i++) {
            init_cate.push("0")
        }

        let cate_temp_json = getMyVar(mTag + this.VARMAP.CATEGORY, JSON.stringify(init_cate))
        let cate_temp = JSON.parse(cate_temp_json)

        if (this[symbolMap.mPage] === 1) {

            categories.forEach((category, index) => {

                // 折叠 UI
                if (this[symbolMap.mFoldInnerEnable] && this[symbolMap.mFoldLayout].injectIndex === (index+1)) {
                    let foldLayout = {
                        title: this[symbolMap.mFoldLayout].title || (this[symbolMap.mFold] === '1' ? '““””<b><span style="color: #FF0000">∨</span></b>' : '““””<b><span style="color: #1aad19">∧</span></b>'),
                        url: this[symbolMap.mFoldLayout].url || $("hiker://empty#noHistory#"+'#noLoading#').lazyRule((params) => {
                            putMyVar(params.mTag + params.VARMAP.FOLD, getMyVar(params.mTag + params.VARMAP.FOLD, params.isFold) === '1' ? '0' : '1')
                            refreshPage(false);
                            return "hiker://empty"
                        }, {
                            mTag: mTag,
                            isFold: this[symbolMap.mFold],
                            VARMAP: this.VARMAP
                        }),
                        col_type: this[symbolMap.mFoldLayout].col_type || "scroll_button",
                    }
                    this[symbolMap.mLayout].push(foldLayout)
                }

                //具体列表下的分类
                let sub_categories = [];
                if (category.subListRule.startsWith("@js:")) {
                    sub_categories = this.evalJSRule(category.list, category.subListRule)
                } else {
                    sub_categories = parseDomForArray(category.list, category.subListRule);
                }
                if (index < (this[symbolMap.mFoldIndex] || 1)) {
                    sub_categories.forEach((item, key) => {
                        let title = this.getTitle(item, category)
                        let url = this.getUrl(item, category)

                        this[symbolMap.mLayout].push({
                            title: key.toString() === cate_temp[index] ? '““””<b><font color=' + this[symbolMap.mColor] + '>' + title + ' </font></b>' : title,
                            url: $(url+'#noLoading#').lazyRule((params) => {
                                let new_cate = []
                                if (params.index === 0) {
                                    params.cate_temp.forEach((cate, index) => {
                                        new_cate.push(index === 0 ? params.key.toString() : "0")
                                    });
                                } else {
                                    params.cate_temp[params.index] = params.key.toString()
                                }
                                putMyVar(params.tag + params.VARMAP.CATEGORY, JSON.stringify(params.index === 0 ? new_cate : params.cate_temp))
                                putMyVar(params.tag + params.VARMAP.URL, input)
                                refreshPage(true)
                                return "hiker://empty"
                            }, {
                                cate_temp: cate_temp,
                                index: index,
                                VARMAP: this.VARMAP,
                                tag: mTag,
                                key: key,
                                page: this[symbolMap.mPage],
                            }),
                            col_type: 'scroll_button',
                        })
                    })
                    this[symbolMap.mLayout].push({
                        col_type: "blank_block"
                    });
                } else if (this[symbolMap.mFold] === '0') {
                    sub_categories.forEach((item, key) => {
                        let title = this.getTitle(item, category)
                        let url = this.getUrl(item, category)

                        this[symbolMap.mLayout].push({
                            title: key.toString() === cate_temp[index] ? '““””<b><font color=' + this[symbolMap.mColor] + '>' + title + ' </font></b>' : title,
                            url: $(url+'#noLoading#').lazyRule((params) => {
                                params.cate_temp[params.index] = params.key.toString()

                                putMyVar(params.tag + params.VARMAP.CATEGORY, JSON.stringify(params.cate_temp))
                                putMyVar(params.tag + params.VARMAP.URL, input)
                                refreshPage(true)
                                return "hiker://empty"
                            }, {
                                cate_temp: cate_temp,
                                index: index,
                                VARMAP: this.VARMAP,
                                tag: mTag,
                                key: key,
                                page: this[symbolMap.mPage],
                            }),
                            col_type: 'scroll_button',
                        })
                    })
                    this[symbolMap.mLayout].push({
                        col_type: "blank_block"
                    });
                }
            });
        }
    },

    界面(layout) {
        return this.layout(layout)
    },
    分类链接(trueUrl) {
        return this.trueUrl(trueUrl);
    },
    页码(page) {
        return this.page(page);
    },
    源码(html) {
        return this.html(html);
    },
    定位一级分类(list) {
        return this.list(list);
    },
    定位子分类(subList) {
        return this.subList(subList);
    },
    定位分类标题(title) {
        return this.title(title);
    },
    定位分类链接(url) {
        return this.url(url);
    },
    开启内置折叠功能() {
        return this.foldInner(true);
    },
    关闭内置折叠功能() {
        return this.foldInner(false);
    },
    第几行开始折叠(index) {
        return this.foldIndex(index);
    },
    折叠按钮样式(layout) {
        return this.foldLayout(layout)
    },
    折叠(fold) {
        return this.fold(fold);
    },
    选中的分类颜色(color) {
        return this.color(color);
    },
    唯一标识(mTag) {
        return this.tag(mTag)
    },
    添加分类定位(ruleObj) {
        if(ruleObj.constructor === Object){
            return this.add(ruleObj);
        }else if(ruleObj.constructor===Array){
            for(let obj of ruleObj){
                this.add(obj)
            }
            return this
        }else{
            return this
        }
    },
    开始打造分类() {
        return this.build();
    },

})
$.exports = new CategoriesHeader();
$.exports
