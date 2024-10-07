js:
var d = [];
const {color, small} = $.require("hiker://page/utiliy?rule=道长仓库Pro");
let t1=(new Date()).getTime(); // 记录获取历史或者收藏的耗时
let mode = getItem('mode','历史');
let options = ['历史','收藏'].map(x=>x === mode ? color(x,'#12b668') : x);
options.forEach(it=>{
   d.push({
       title: it,
       col_type:'scroll_button',
       url:$('#noLoading#').lazyRule((it)=>{
           it = pdfh(it,'body&&Text').replace('““””','');
           setItem('mode',it);
           refreshPage(false);
           return 'hiker://empty'
       },it)
   })
});
let route = mode === '历史' ? 'hiker://history': 'hiker://collection';
let code = fetch(route);
let arr = JSON.parse(code)||'[]';
let his = [];
if(arr.length > 0){
    let show = `${mode} 共有至少以下属性:${Object.keys(arr[0]).join(',')}`
    log(show);
}
arr.forEach(it=>{
    let title = mode === '历史' ? it.title : it.mTitle;
    let desc = mode === '历史' ? it.url : it.cUrl;
    let tips = mode === '历史' ? it.type : it.mITitle;
    title += small(color('('+tips+')','#aaaaaa'));
    if(it.lastClick){
        title += '\n' + color('足迹:','#12b668') + small(color(it.lastClick,'#aaaaaa'));
    }
    his.push({
        title: title,
        url: $(`要删除这条${mode}记录吗?`).confirm(()=>{return 'toast://抱歉没接口'}),
        col_type: "text_1",
        desc: small(desc),
    });
});
let t2=(new Date()).getTime(); // 记录获取历史或者收藏的结束耗时
let cnt  = his.length;
his.unshift({
    title:`共计${color(cnt,'#d96715')}条记录,获取足迹耗时:${color(t2-t1,'#d96715')}毫秒`,
    url:'',
    col_type:'text_1'
});
// d.push.apply(his);
d = d.concat(his);
setResult(d);