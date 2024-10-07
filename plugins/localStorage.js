//自定义
//加密key
const KEYS = "daozhangyyds";
//储存路径
const PATH = (typeof(pathto)!=='undefined'&&pathto)?pathto:"hiker://files/localStorage/StorageDz.local";


//核心代码勿动
const symbolSet = Object.freeze({
    init: Symbol("init"),
    save: Symbol("save"),
    data: Symbol("data")
});

function LocalStorage(path) {
    this.path = path;
    this[symbolSet.data] = this[symbolSet.init]();
}
const LSPT = LocalStorage.prototype;
LSPT[symbolSet.save] = function(data) {
    data = data || this[symbolSet.data];
    if (data) {
        writeFile(this.path, aesEncode(KEYS, JSON.stringify(data)));
    } else {
        throw new Error("data exception");
    }
}
LSPT[symbolSet.init] = function() {
    let plaintext = request(this.path);
    try {
        return JSON.parse(aesDecode(KEYS, plaintext));
    } catch (e) {
        this[symbolSet.save]({});
        return {};
    }
}
Object.assign(LSPT, {
    constructor: LocalStorage,
    /**
     * 设置缓存
     * @param key
     * @param value
     * @param expiredTimeMS  过期时间，单位ms
     */
    setItem(key, value, expiredTimeMS) {
        if (typeof key !== "string" || typeof value !== "string") {
            throw new Error('"key" and "value" must be string type');
        }
        if ((expiredTimeMS == 0) || (expiredTimeMS == null)) {
            this[symbolSet.data][key] = {
                value: value
            }
        } else {
            if (typeof expiredTimeMS !== "number") {
                throw new Error('"expiredTime" must be number type');
            }
            this[symbolSet.data][key] = {
                value: value,
                est: new Date().getTime(),
                etm: expiredTimeMS
            }
        }
        this[symbolSet.save]();
    },
    /**
     * 获取键
     * @param key
     * @param value
     * @returns {*} key存在且不过期，返回value；
     *              key-value过期，返回null；
     *              key不存在，返回undefined；
     */
    getItem(key,value) {
        value = value||'';
        let item = this[symbolSet.data][key];
        if (item === void 0) {
            return value?value:undefined;
        }
        if (!item.est || !item.etm) {
            return item.value;
        }
        let curTime = new Date().getTime();
        let sum = item.est + item.etm;
        if (sum > curTime) {
            return item.value;
        } else {
            //this.removeItem(key);
            //this[symbolSet.save]();
            return null;
        }
    },
    /**
     * 移除键
     * @param key
     */
    removeItem(key) {
        this[symbolSet.data][key] = undefined;
        this[symbolSet.save]();
    },
    /**
     * 键是否存在
     * @param key
     * @returns {*} true/false
     */
    hasItem(key) {
        return this[symbolSet.data].hasOwnProperty(key);
    },
    /**
     * 键是否过期
     * @param key
     * @returns {*} true/false
     */
    isExpired(key) {
        let item = this[symbolSet.data][key];
        if (item === void 0) {
            return true;
        }
        if (!item.est || !item.etm) {
            return false;
        }
        let curTime = new Date().getTime();
        let sum = item.est + item.etm;
        if (sum > curTime) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 对键重置过期时间
     * @param key
     * @param expiredTimeMS  过期时间ms
     */
    expiredReset(key, expiredTimeMS) {
        if (typeof key !== "string") {
            throw new Error('"key" must be string type');
        }
        if (typeof expiredTimeMS !== "number") {
            throw new Error('"expiredTime" must be number type');
        }
        let item = this[symbolSet.data][key];
        if (item === void 0) {
            throw new Error(key + " does not exist");
        }
        if ((expiredTimeMS == 0) || (expiredTimeMS == null)) {
            this[symbolSet.data][key] = {
                value: item.value
            };
        } else {
            this[symbolSet.data][key] = {
                value: item.value,
                est: new Date().getTime(),
                etm: expiredTimeMS
            };
        }
        this[symbolSet.save]();
    },
    /**
     * 清除所有缓存
     */
    clear() {
        this[symbolSet.data] = {};
        this[symbolSet.save]();
    }
});
$.exports = new LocalStorage(PATH);
