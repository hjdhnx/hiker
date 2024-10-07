js:
    var items = [];
var json = [{
    title: '爱奇艺',
    url: 'http://www.iqiyi.com/v_2ga8zts86ys.html',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/09/8/110_901f2ef37af2fea25e5d9648f551ce31_con_130x130.png',
}, {
    title: '优酷',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/16/9/110_8ff06e0c237760cd57d2508fd98c8414_con_130x130.png',
    url: 'https://v.youku.com/v_show/id_XNDc0MDE1NTk1Mg==.html'
}, {
    title: '腾讯视频',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/15/3/106_3a0d212e17cb95e232ffe155460385cb_con_130x130.png',
    url: 'https://v.qq.com/x/cover/mzc00200rmpaf40/n0036l4tntc.html'
}, {
    title: 'PPTV视频',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/28/5/110_a455b2951227040ee62955edcfb89d72_con_130x130.png',
    url: 'https://v.pptv.com/show/zVn3dJXt1xV49l4.html'
}, {
    title: '芒果TV',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/15/6/110_1834d296aa5b5666a7d94b1e3479ae64_con_130x130.png',
    url: 'http://www.mgtv.com/b/349253/10424300.html'
},{
    title: '咪咕',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/13/1/110_0e6bdee42b08304d158d280b49452bc3_con_130x130.png',
    url: 'https://m.miguvideo.com/mgs/msite/prd/detail.html?cid=655838044&mgdbid=&channelId=CAAAB000902015500000000'
},{
    title: '哔哩哔哩',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/27/4/110_8e2e3d88c45025b380e69817d6fb53b1_con_130x130.png',
    url: 'https://m.bilibili.com/bangumi/play/ep428993'
},{
    title: '搜狐视频',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/15/9/110_532a51f8431efc377808c1ffff2da36f_con_130x130.png',
    url: 'https://m.tv.sohu.com/v7329441.shtml'
},{
    title: '乐视',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/15/8/2_35b5d4373f4bcba28f39486e4f1164d9_con_130x130.png',
    url: 'https://m.le.com/vplay_76954333.html?from=ajax'
},{
    title: '1905电影网',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/18/4/110_5f24b1052fed4f7fc73593a8ef27276d_con_130x130.png',
    url: 'https://vip.1905.com/m/play/1429725.shtml'
},{
    title: '风行视频',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/16/4/110_6f6af9f99b2629e51f0b0a33cdff1d9e_con_130x130.png',
    url: 'http://m.fun.tv/mplay/?mid=95719'
},{
    title: '西瓜视频',
    pic_url: 'https://android-artworks.25pp.com/fs08/2021/09/27/5/110_a86265882ed18c6190566e9ea25f9698_con_130x130.png',
    url: 'https://www.ixigua.com/6699356792905794055'
}];
var qps = [
    {title:'龙腾', url:'LT-1ec3f6754f68586ed7f92c3e995cfca6',pic_url: 'https://hikerfans.com/tubiao/ke/4.png'},
    {title: '人人迷', url:'renrenmi-ab924e11d2d69397',pic_url:'https://hikerfans.com/tubiao/ke/6.png'},
    {title: '五毒', url:'wuduyun-1649431307021',pic_url: 'https://hikerfans.com/tubiao/ke/30.png'},
    {title: '多多', url:'https://m3u8.cache.suoyo.cc/m3u8/202203/8/aaabd92da26774c68850a023153c80f1ae6fa9be.m3u8',pic_url: 'https://hikerfans.com/tubiao/ke/49.png'},
    {title: '融兴', url: 'RongXingVR-4215645581932',pic_url:'https://hikerfans.com/tubiao/ke/80.png'},
    {title: '雪人', url: 'xueren-1646823072',pic_url:'https://hikerfans.com/tubiao/q/133.png'},
    {title: '旋风云', url:'xfy-529e6457953d545f',pic_url: 'https://hikerfans.com/tubiao/ke/54.png'},
    {title: '瑞丰资源',url: 'https://1.ruifenglb.com/play/1644914595.m3u8',pic_url: 'https://hikerfans.com/tubiao/ke/72.png'}
];
const {color, small} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");
var timeout = parseInt(lsg.getItem('timeout','5000'));//超时
var nowParse = getItem('Parse','');//getItem的操作千万不要加入循环,当前选择的解析
var dx_mode = getItem('点选','单测');//点选模式
var qp_test = getItem('切片','0');//显示切片
if(qp_test==='1'){
    json = qps;
}else if(qp_test==='2'){
    json = json.concat(qps);
}
items.push({
    title: color('魔断解析测试','#0C0000'),
    desc:'单接口多类正版|单正版多接口 测试 '+'🕒'+timeout,
    url: $(timeout,'请输入解析超时毫秒').input(()=>{
        if(!parseInt(input)){
            return 'toast://超时设置错误，拒绝保存'
        }
        const lsg=$.require("hiker://page/localStorage?rule=道长仓库Pro");
        lsg.setItem('timeout',input||'5000');
        refreshPage(false);
        return 'toast://已设置解析超时毫秒:'+input||'5000';
    }),
    col_type: 'text_center_1',
    extra:{
        lineVisible:false
    }
});
items.push({
    title:'使用说明',
    col_type:'text_center_1',
    url:$('hiker://empty#noRecordHistory##noHistory#').rule((color)=>{
        let d=[];
        d.push({
            title:color('相信自己，你不需要说明','grey'),
            col_type:'text_1',
            url:'hiker://empty',
            extra:{
                lineVisible:false
            }
        });
        let note='想我写教程？没门！';
        d.push({
            title:note,
            col_type:'rich_text'
        });
        setResult(d);
    },color),
    extra:{
        lineVisible:true
    }
});
items.push({
    col_type:"blank_block",
});
items.push({
    title:color('🏠️主程序','#ff0000'),
    url: "hiker://home@MyFieldᴰⁿ",
    col_type: 'scroll_button'
});
items.push({
    title:color('🎨线路配置','#fa8c35'),
    url: "hiker://page/Route?rule=MyFieldᴰⁿ&type=设置#noHistory#",
    col_type: 'scroll_button'
});
items.push({
    title:color('🎯解析管理','#3eede7'),
    url: "hiker://page/Route?rule=MyFieldᴰⁿ&type=编辑#noHistory#",
    col_type: 'scroll_button'
});
items.push({
    title:color('☢️批量删除','#801dae'),
    url: getPath('hiker://files/cache/plscParse.html'),
    col_type: 'scroll_button'
});
items.push({
    title:color('🔠备胎管理','#0eb83a'),
    url: "hiker://page/Route?rule=MyFieldᴰⁿ&type=解析#noRecordHistory#",
    col_type: 'scroll_button'
});
let qp_title = '💿切片测试';
if(qp_test==='1'){
    qp_title =  color(qp_title,'#6bc8d0')
}else if(qp_test==='2'){
    qp_title =  color(qp_title,'#6ba6d0')
}
items.push({
    title:qp_title,
    url: $('#noLoading#').lazyRule((color)=>{
        let modes = ['0','1','2'];
        let qp_test = getItem('切片','0');
        let idex = modes.indexOf(qp_test);
        let nextIdex = idex < modes.length -1?idex+1:0;
        qp_test=modes[nextIdex];
        setItem('切片',qp_test);
        // updateItem('qp_test',{
        //     title:qp_test==='1'?color('💿切片测试','#6bc8d0'):'💿切片测试'
        // });
        refreshPage(false);
        return 'hiker://empty'
    },color),
    col_type: 'scroll_button',
    extra:{
        id:'qp_test'
    }
});
items.push({
    title:'⚙点选模式:'+dx_mode,
    col_type:'text_2',
    url:$('#noLoading#').lazyRule(()=>{
        let dx_mode = getItem('点选','单测');
        dx_mode=(dx_mode==='单测'?'多测':'单测');
        setItem('点选',dx_mode);
        updateItem('dx_mode',{
            title:'⚙点选模式:'+dx_mode
        });
        return 'hiker://empty'
    }),
    extra:{
        id:'dx_mode'
    }
});
let dx_test = '❤️解析多选测试';
items.push({
    title:dx_test,
    col_type:'text_2',
    url:$('hiker://empty#noRecordHistory##noHistory#').rule((dx_test,color)=>{
        setPageTitle(dx_test);
        addListener('onClose', $.toString(() => {
            refreshPage(false);//刷新魔断主页面
        }));
        d=[];
        $.require("hiker://page/jxItem?rule=MyFieldᴰⁿ").jxList();
        jxs=d.filter(it=>it.col_type==='text_2').map(it=>pdfh(it.title,'font,-1&&Text'));
        let data = storage0.getMyVar('jx_selected')||[];
        let dx_filter = getItem('dx_filter','全部');
        if(dx_filter === '已选'){
            jxs = jxs.filter(it=>data.includes(it));
        }else if(dx_filter=== '未选'){
            jxs = jxs.filter(it=>!data.includes(it));
        }
        d=jxs.map((it)=>{
            return {
                title:(Array.isArray(data)&&data.includes(it))?color(it,'#12b668'):it,
                // url:'toast://功能开发中',
                url:$('#noLoading#').lazyRule((it,color)=>{
                    let data = storage0.getMyVar('jx_selected');
                    if(Array.isArray(data)){
                        if(data.includes(it)){
                            log('包含:'+it);
                            data.splice(data.indexOf(it),1);
                        }else{
                            data.push(it)
                        }
                        storage0.putMyVar('jx_selected', data)
                    }else{
                        storage0.putMyVar('jx_selected', [it])
                    }
                    if(storage0.getMyVar('jx_selected').includes(it)){
                        updateItem(it,{
                            title:color(it,'#12b668')
                        })
                    }else{
                        updateItem(it,{
                            title:it
                        })
                    }
                    return 'hiker://empty'
                },it,color),
                col_type:'text_3',
                extra:{
                    id:it
                }
            }
        });
        let op=[];
        op.push({
            title:'全选',
            url:$('#noLoading#').lazyRule((jxs,color)=>{
                storage0.putMyVar('jx_selected', jxs);
                jxs.forEach(it=>{
                    updateItem({title: color(it,'#12b668'), extra: {id: it}});
                });
                return 'hiker://empty'
            },jxs,color),
            col_type:'scroll_button'
        });
        op.push({
            title:'全不选',
            url:$('#noLoading#').lazyRule((jxs)=>{
                storage0.putMyVar('jx_selected', []);
                jxs.forEach(it=>{
                    updateItem({title: it, extra: {id: it}});
                });
                return 'hiker://empty'
            },jxs),
            col_type:'scroll_button'
        });
        op.push({
            title:'反选',
            url:$('#noLoading#').lazyRule((jxs,color)=>{
                let oldSel = storage0.getMyVar('jx_selected', []);
                function getDifferentData(arrA, arrB) {
                    return arrA.concat(arrB).filter(function (v, i, arr) {
                        return arr.indexOf(v) === arr.lastIndexOf(v);
                    });
                }
                let newSel = getDifferentData(jxs,oldSel);
                storage0.putMyVar('jx_selected', newSel);
                oldSel.forEach(it=>{
                    updateItem({title: it, extra: {id: it}});
                });
                newSel.forEach(it=>{
                    updateItem({title: color(it,'#12b668'), extra: {id: it}});
                });
                return 'hiker://empty'
            },jxs,color),
            col_type:'scroll_button'
        });
        op.push({
            title:'删除',
            url:$('#noLoading#').lazyRule(()=>{
                let sel = storage0.getMyVar('jx_selected', []);
                if(sel.length < 1){
                    return 'toast://啥都没选，删除个鸡毛~'
                }
                return $('确认删除已选择的:'+sel[0]+'等'+sel.length+'条解析?').confirm((sel)=>{
                    var parseRoute = getVar('parseRoute');
                    eval('var json =' + fetch(parseRoute));
                    for(let name in sel){
                        if (json.codes.hasOwnProperty(name)) {
                            delete json.codes[name];
                        }
                    }
                    json.title = json.title.filter(it=>!sel.includes(it)); // 筛选没有被删除的标题
                    writeFile(parseRoute, $.stringify(json));
                    storage0.putMyVar('jx_selected', []);//删除完了清空选中项目
                    refreshPage(false);
                    return "toast://已将〖" + sel[0] + "〗等"+sel.length+"条解析删除";
                },sel)
            }),
            col_type:'scroll_button'
        });
        op.push({
            title:'操作|筛选 '+color(jxs.length,'#ff7000'),
            url:'toast://前面按钮是操作，后面按钮是筛选',
            col_type:'scroll_button'
        });
        op.push({
            title:dx_filter==='全部'?color('全部','#12b668'):'全部',
            url:$('#noLoading#').lazyRule(()=>{
                setItem('dx_filter','全部');
                refreshPage(false);
                return 'hiker://empty'
            }),
            col_type:'scroll_button'
        });
        op.push({
            title:dx_filter==='已选'?color('已选','#12b668'):'已选',
            url:$('#noLoading#').lazyRule(()=>{
                setItem('dx_filter','已选');
                refreshPage(false);
                return 'hiker://empty'
            }),
            col_type:'scroll_button'
        });
        op.push({
            title:dx_filter==='未选'?color('未选','#12b668'):'未选',
            url:$('#noLoading#').lazyRule(()=>{
                setItem('dx_filter','未选');
                refreshPage(false);
                return 'hiker://empty'
            }),
            col_type:'scroll_button'
        });
        d=op.concat(d);
        setResult(d);
    },dx_test,color)
});
function sortByKey(array, key, order) {//对象数组按某个键值排序
    return array.sort(function(a, b) {
        var x = parseInt(a[key].match(/(\d+)/)[1]);//修复大于10出问题
        var y = parseInt(b[key].match(/(\d+)/)[1]);
        if (order) {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        } else {
            return ((x < y) ? ((x > y) ? 1 : 0) : -1)
        }
    })
}
items.push({
    title: '🛠一键测试已选接口：'+nowParse,
    //url: 'toast://这是接口',
    url:$().lazyRule((json,nowParse,timeout,sortByKey)=>{
        if(!getItem('Parse','')){
            return 'toast://避免资源浪费，请先在下方选一个接口再进行测试'
        }
        var count = json.length; //设置任务数量
        log('魔断开启多任务解析,任务数量:'+count);
        var task = function(obj) {
            eval('var config_dp =' + fetch(getVar('oldConfig')));
            eval(fetch(config_dp.cj));
            return aytmParse(obj.vipUrl,obj.name,obj.timeout);
        };
        var parseRet = []; //解析结果列表
        let tasks = json.map((it,idex)=>{
            return {
                func: task,
                param: {
                    //name:it.title,
                    name:nowParse,
                    type:it.title,
                    // rule:it.rule,
                    vipUrl: it.url,
                    timeout: timeout
                },
                id: "task"+idex
            }
        });
        showLoading("魔断并发解析中，剩余待测:"+count);
        be(tasks,{
            func: function(obj, id, error,ret) {
                log("监听到任务" + id+'已结束,error:'+error+',ret:'+ret);
                ret = ret||'';
                error=error||'';
                parseRet.push({
                    task:id,
                    ret:ret,
                    error:error,
                    name:tasks.filter(it=>it.id===id)[0].param.type
                });
                count -= 1; //完成了任务，任务数量-1
                //log(obj);
                if (count > 0) {
                    showLoading("魔断并发解析中，剩余待测:" + count)
                } else {
                    hideLoading();
                }
            },
            param: {//传到监听函数的obj参数里
                hi: "ccc",
            }
        });//执行多任务
        //log("多任务执行结果数:"+parseRet.length);
        parseRet=sortByKey(parseRet,'task',true);//升序排列
        // log(parseRet.map(it=>it.task));
        return $('hiker://empty#noRecordHistory##noHistory#').rule((parseRet)=>{
            setPageTitle(getItem('Parse')+'解析报告');
            const {isVideo} = $.require('hiker://page/globalParse?rule=道长仓库Pro');
            const {color, small} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
            let d=[];
            let show_mode = getItem('show_mode','详细');
            let col_type = show_mode==='详细'?'text_1':'text_3';
            d.push({
                title:'显示模式:'+color(show_mode,'#fa8c35'),
                col_type:'scroll_button',
                url:$('#noLoading#').lazyRule((color,cnt)=>{
                    let show_mode = getItem('show_mode','详细');
                    show_mode = show_mode==='详细'?'精简':'详细';
                    setItem('show_mode',show_mode);
                    updateItem('show_mode',{
                        title:'显示模式:'+color(show_mode,'#fa8c35')
                    });
                    let col_type = show_mode==='详细'?'text_1':'text_3';
                    for(let i=0;i<cnt;i++){
                        updateItem('show_ret_'+i,{
                            col_type:col_type
                        });
                    }
                    return 'hiker://empty'
                },color,parseRet.length),
                extra:{
                    id:'show_mode'
                }
            });
            parseRet.forEach((it,idx)=>{
                let title=it.name;
                if(it.ret&&!it.ret.includes('undefined')&&(/#isVideo=true#/.test(it.ret)||isVideo(it.ret))){
                    title=color(title,'#12b668')
                }
                let desc=(it.ret||it.error).substr(0,60);
                d.push({
                    title:title,
                    desc:small(desc),
                    col_type:col_type,
                    url:it.ret,
                    extra:{
                        ret:it.ret||it.error,
                        id:'show_ret_'+idx
                    }
                });
            });
            setResult(d);
        },parseRet)
    },json,nowParse,timeout,sortByKey),
    col_type: 'text_center_1',
    extra:{
        lineVisible:false
    }
});
/*
var parseRoute = 'hiker://files/rules/DuanNian/MyParse.json';
var MyParseS = {};
eval('var parseFile =' + fetch(parseRoute));
MyParseS = Object.keys(parseFile.codes);
MyParseS.reverse();
*/
var d=[];
$.require("hiker://page/jxItem?rule=MyFieldᴰⁿ").jxList();
d=d.filter(it=>it.col_type==='text_2').map(it=>pdfh(it.title,'font,-1&&Text'));
MyParseS=d;

for (let i in MyParseS) {
    if (!/defaultParse/.test(MyParseS[i])) {
        let title =MyParseS[i];
        items.push({
            title: nowParse === title?color(title,'#12b668'):title,
            url:$('#noLoading#').lazyRule((ipt)=>{
                setItem('Parse',ipt);
                refreshPage();
                return 'toast://已选接口'+ipt;
            },title) ,
            col_type: 'scroll_button'
        });
    }
}
let tag='';
for (let i in json) {
    let title = json[i].title;
    let zurl=json[i].url;
    let zpic = json[i].pic_url;
    if(getMyVar('zdy') === zurl){
        tag=title;
        title='⛳'+title;
    }
    items.push({
        title:title,
        url: $('#noLoading#').lazyRule((zurl,nowParse,timeout,vipObj) => {
            if(getMyVar('zdy')!==zurl){
                putMyVar('zdy', zurl);
                refreshPage(false);
            }
            var dx_mode = getItem('点选','单测');//点选模式
            if(dx_mode==='单测'){
                showLoading('魔断动态解析中,请稍等...');
                eval('var config_dp =' + fetch(getVar('oldConfig')));
                eval(fetch(config_dp.cj));
                return aytmParse(zurl,nowParse,timeout);
            }else{
                let data = storage0.getMyVar('jx_selected')||[];
                if(data.length>32){
                    return $('你所选择待测试的解析数共计:'+data.length+'个，超出了推荐最大数32,性能可能极差,是否继续?').confirm((data,vipObj,timeout)=>{
                        const {test_report} = $.require('hiker://page/test_report');
                        return test_report(data,vipObj,timeout)
                    },data,vipObj,timeout)
                }else{
                    const {test_report} = $.require('hiker://page/test_report');
                    return test_report(data,vipObj,timeout)
                }
            }
        },zurl,nowParse,timeout,json[i]),
        pic_url:zpic,
        col_type: 'icon_4'
    });
}
addListener('onClose', $.toString(() => {
    clearVar("zdy");
}));
items.push({
    title:'测试'+tag,
    col_type: 'input',
    url:$.toString((nowParse,timeout)=>{
        eval("var config =" + fetch("hiker://files/cache/MyParseSet.json"));
        eval(fetch(config.cj));
        // eval(fetch('hiker://files/cache/Parse_Dn.js', {}));
        return aytmParse(getMyVar('zdy'), nowParse,timeout);
    },nowParse,timeout),
    desc: '请输解析地址',
    extra: {
        titleVisible: true,
        defaultValue: getMyVar('zdy', json[0].url) || "",
        onChange: 'putMyVar("zdy",input)',
        textSize: 13,
        type: "textarea",
        height: 2
    }
});
setResult(items);
