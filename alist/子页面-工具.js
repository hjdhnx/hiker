function bytesToSize(size) {
    if (size < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        size = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        size = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else {
        // 其他转化成GB
        size = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    // 转成字符串
    let sizeStr = size + "",
        // 获取小数点处的索引
        index = sizeStr.indexOf("."),
        // 获取小数点后两位的值
        dou = sizeStr.substr(index + 1, 2);
    // 判断后两位是否为00，如果是则删除00
    if (dou === "00") return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    return size;
}
$.exports.bytesToSize = bytesToSize;
$.exports.color = function(text, color) {
    text += "";
    if (text.indexOf("““””") === 0) {
        text.replace("““””", "");
    }
    return "““””<font color='" + color + "'>" + text + "</font>";
}

$.exports.sleep = function(timeout) {
    java.lang.Thread.sleep(timeout);
}

function htmlTag(tag, text) {
    text += "";
    if (text.indexOf("““””") === 0) {
        text.replace("““””", "");
    }
    return "““””" + "<" + tag + ">" + text + "</" + tag + ">";

}
$.exports.htmlTag = htmlTag;
$.exports.small = function(text) {
    return htmlTag("small", text);
}

function getTime(file,isStandard) {
    isStandard = isStandard||false;
    let tTime = file.updated_at || file.time_str || "";
    tTime = tTime.split("T");
    let date = tTime[0];
    if(isStandard){
        date = date.replace(/-/g,"/");
    }
    tTime = tTime[1].split(/Z|\./);
    date += " " + tTime[0];
    return date;
}
function getTimeInt(timeStr){
    return (new Date(timeStr)).getTime()
}
$.exports.getTime = getTime;

let chnNumChar = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9
};

let chnNameValue = {
    十: {
        value: 10,
        secUnit: false
    },
    百: {
        value: 100,
        secUnit: false
    },
    千: {
        value: 1000,
        secUnit: false
    },
    万: {
        value: 10000,
        secUnit: true
    },
    亿: {
        value: 100000000,
        secUnit: true
    }
}

function ChineseToNumber(chnStr) {
    let rtn = 0;
    let section = 0;
    let number = 0;
    let secUnit = false;
    let str = chnStr.split('');

    for (let i = 0; i < str.length; i++) {
        let num = chnNumChar[str[i]];
        if (typeof num !== 'undefined') {
            number = num;
            if (i === str.length - 1) {
                section += number;
            }
        } else {
            let unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if (secUnit) {
                section = (section + number) * unit;
                rtn += section;
                section = 0;
            } else {
                section += (number * unit);
            }
            number = 0;
        }
    }
    return rtn + section;
}

function nameCompare(a, b) {
    if (a == null || b == null)
        return a == null ? b == null ? 0 : -1 : 1;

    a = a.replace(/([零一二三四五六七八九十百千万亿])/g, function(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return ChineseToNumber(p1);
    })
    b = b.replace(/([零一二三四五六七八九十百千万亿])/g, function(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return ChineseToNumber(p1);
    })

    let NUMBERS = java.util.regex.Pattern.compile("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)")
    let split1 = NUMBERS.split(new java.lang.String(a));
    let split2 = NUMBERS.split(new java.lang.String(b));

    for (let i = 0; i < Math.min(split1.length, split2.length); i++) {
        let c1 = split1[i].charCodeAt(0);
        let c2 = split2[i].charCodeAt(0);
        let cmp = 0;
        let zeroCharCode = '0'.charCodeAt(0);
        let nineCharCode = '9'.charCodeAt(0);

        if (c1 >= zeroCharCode && c1 <= nineCharCode && c2 >= zeroCharCode && c2 <= nineCharCode) {
            cmp = new java.math.BigInteger(split1[i]).compareTo(new java.math.BigInteger(split2[i]));
        }

        if (cmp === 0) {
            let regex = /[a-zA-Z0-9]/
            let s1 = String(split1[i])
            let s2 = String(split2[i])
            if (regex.test(s1) || regex.test(s2)) {
                cmp = new java.lang.String(split1[i]).compareTo(new java.lang.String(split2[i]));
                // cmp = s1.localeCompare(s2, 'en')
            } else {
                cmp = s1.localeCompare(s2, 'zh')
            }
        }

        if (cmp !== 0) {
            return cmp;
        }
    }
    let lengthCmp = split1.length - split2.length;
    // if (lengthCmp !== 0) lengthCmp = lengthCmp > 0 ? -1 : 1;
    return lengthCmp;
}

$.exports.sorts = function(list, sort) {
    if (sort === "类型") {
        // log("类型排序");
        list.sort(function(a, b) {
            return a.type - b.type
        });
    } else if (sort === "名称") {
        // log("名称排序");
        // list.sort(function(a, b) {
        //     return a.name.localeCompare(b.name, "zh")
        // });
        list.sort(function(a, b) {
            return nameCompare(a.name||a.title, b.name||b.title);
        });
    } else if (sort === "大小") {
        // log("大小排序");
        list.sort(function(a, b) {
            return (a.size || Number(a.size_str) || 0) - (b.size || Number(b.size_str) || 0);
        });
    }else if (sort === "时间") {
        // log("时间排序");
        list.sort(function(a, b) {
            return getTimeInt(getTime(a,true)) - getTimeInt(getTime(b,true))
        });
    }
    return list
}

function similar(s, t, f) {//判断两个字符串之间的相似度
    if (!s || !t) {
        return 0
    }
    if(s === t){
        return 100;
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d = []
    f = f || 2
    var min = function (a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = (1 - d[n][m] / l) *100
    return res.toFixed(f)
}

$.exports.similar = similar;
$.exports.removeExt = function (file){
    return file.split('.').slice(0,-1).join('.')
};

$.exports.saveHistory = function (id,data){
    let view_history = JSON.parse(readFile('view_history.json', 0) || '[]');
    let idex = view_history.findIndex(x=>x.extra&&x.extra.id===id);
    if(idex > -1){
        view_history.splice(idex,1);
    }
    view_history.unshift(data);
    saveFile('view_history.json',JSON.stringify(view_history),0);
    return true
}

$.exports.renderText = function (realUrl,type){
    type = type || 'code';
    return $('hiker://empty#noHistory##noRecordHistory#').rule((realUrl,type) => {
        let d = [];
        let html;
        try {
            html = request(realUrl, {
                timeout: $.getTimeOut()
            }) || '';
        } catch (e) {
            html = '预览失败:' + e.message
        }
        if(/md|code/.test(type)){
            require('http://hiker.nokia.press/hikerule/rulelist.json?id=3187');
            html = type==='md'?marked.parse(html):marked.parse("```\n" + html + "\n```");
        }else if (type==='txt'&& html.length > 6000) {
            html = html.slice(0, 6000) + "...\nerror:文件过大不支持预览";
        }
        let col = /md|code/.test(type) ? 'rich_text' : 'long_text';
        d.push({
            title: html,
            col_type: col,
            url: 'hiker://empty'
        });
        setResult(d);
    }, realUrl,type)
}