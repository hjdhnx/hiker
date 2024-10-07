js:
    let d=[];
d.push({
    title:'Alist订阅转换器by道长',
    url: 'hiker://empty',
    col_type: "text_1",
    desc: "可以把Pro版订阅转为普通版",
});

d.push({
    title:'Pro版订阅',
    desc:'输入Pro版订阅文本',
    col_type:'input',
    extra:{
        height:4,
        type: "textarea",
        highlight:getMyVar('switch','开')==='开',
        defaultValue:getMyVar('input',''),
        onChange:'putMyVar("input",input)'
    }
});
d.push({
    title: '高亮开关:'+getMyVar('switch','开'),
    url: $('#noLoading#').lazyRule(()=>{
        putMyVar('switch',getMyVar('switch','开')==='开'?'关':'开');
        refreshPage(false);
        return 'hiker://empty'
    }),
    col_type: "text_3",
});

d.push({
    title: '清空输入',
    url: $('#noLoading#').lazyRule(()=>{
        clearMyVar('input');
        refreshPage(false);
        return 'hiker://empty'
    }),
    col_type: "text_3",
});
d.push({
    title: '清空输出',
    url: $('#noLoading#').lazyRule(()=>{
        clearMyVar('output');
        refreshPage(false);
        return 'hiker://empty'
    }),
    col_type: "text_3",
});

d.push({
    title:'开始转化',
    col_type:'text_center_1',
    url:$('#noLoading#').lazyRule(()=>{
        input=getMyVar("input",'');
        if(!input){
            return 'toast://啥也没有转换个鸡鸡？'
        }
        try{
            let ret=eval(input);
            ret = ret.map((it)=>{
                return {
                    name:it.name,
                    url:it.host
                }
            });
            putMyVar("output",JSON.stringify(ret));
            refreshPage(false);
            return 'toast://转换成功'
        }catch(e){
            return 'toast://出错了！'+e.message
        }
    })
});
d.push({
    title:'普通版订阅',
    desc:'输出普通版订阅文本',
    col_type:'input',
    extra:{
        defaultValue:getMyVar('output',''),
        height:4,
        highlight:getMyVar('switch','开')==='开',
        type: "textarea",
        onChange:'putMyVar("output",input)'
    }
});
d.push({
    title:'复制转换结果',
    col_type:'text_center_1',
    url:$('#noLoading#').lazyRule(()=>{
        let output=getMyVar('output','');
        if(!output){
            return 'toast://啥也没有复制个鸡鸡？'
        }
        try{
            let ret=JSON.stringify(eval(output));
            return 'copy://'+ret
        }catch(e){
            return 'toast://出错了！'+e.message
        }

    })
});
setResult(d)