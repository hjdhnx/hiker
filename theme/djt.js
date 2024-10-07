function getDjt() {
    var api_list = request('hiker://files/rules/home/apiSet_word.txt').split('\n').filter(it => !it.trim().startsWith('//'));
//log(JSON.stringify(api_list));
    if (api_list && api_list.length > 0) {
        api_list = api_list.map((it) => {
            let li = it.split(',');
            li.splice(0, 1);
            return li.join(',')
        }).filter(it => it.trim());
    } else {
        api_list = ["https://api.ixiaowai.cn/api/ylapi.php", "https://v1.hitokoto.cn/?encode=text",
            "@js:JSON.parse(request('https://v2.jinrishici.com/one.json')).data.content"];
    }
    // log(api_list);
    var colors = ['grey', '#ff7512', '#cb54ff', '#ff5358', '#ff9044', '#7678ff', '#34b1ff'];

    function getOne(items) {
        return items[Math.floor(Math.random() * items.length)]
    }

    let word = "此情若是长久时,网络不好可不行";
    var tips = '““””<small><font color="' + getOne(colors) + '">' + word + '</font></small>';
    var api = getOne(api_list).trim();
    // log(api);
    try {
        let word = !/^@js:/.test(api) ? request(api, {
            timeout: Gtimeout
        }) : eval(api.split('@js:')[1]);
        if (word.length < 2) {
            putMyVar(This_Group.name, tips);
            return tips
        } else {
            putMyVar(This_Group.name, word);
            return '““””<small><font color="' + getOne(colors) + '">' + word + '</font></small>'
        }
    } catch (e) {
        log('发生了错误:'+e.message);
        return  tips
    }
}
getDjt();