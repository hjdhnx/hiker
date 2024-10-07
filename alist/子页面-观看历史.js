js:
var d = [];
setPageTitle('Alist|观影历史');
const {color,small} = $.require('hiker://page/utils');
d.push({
    title: "清空",
    url: $('确认清空历史记录?').confirm(() => {
        // deleteFile('view_history.json');
        saveFile('view_history.json','[]',0);
        refreshPage(false);
        return "toast://观影历史已清空!"
    }),
    col_type: "text_3"
});
let hisPath = `hiker://files/rules/files/${MY_RULE.title}/view_history.json`;
d.push({
    title: "编辑",
    url: $('#noLoading#').lazyRule((hisPath)=>{
        if(!fileExist(hisPath)){
            saveFile('view_history.json','[]',0);
        }
        return 'editFile://'+hisPath
    },hisPath),
    col_type: "text_3"
});
let option = getItem('his_click','播放');
d.push({
    title: option==='播放'?option:color(option,'#ab2415'),
    url: $('#noLoading#').lazyRule((color)=>{
        let option = getItem('his_click','播放');
        let nextOption = option === '播放'?'删除':'播放';
        setItem('his_click',nextOption);
        updateItem("his_click", {
            title:nextOption==='播放'?nextOption:color(nextOption,'#ab2415')
        });
        refreshPage(false);
        return 'hiker://empty'
    },color),
    col_type: "text_3",
    extra:{
        id:'his_click'
    }
});
let view_history = JSON.parse(readFile('view_history.json', 0) || '[]');
if(view_history.length > 0){
    view_history.forEach((it)=>{
        it.col_type = 'text_1';
        if(option==='删除'){
            it.url = $('#noLoading#').lazyRule((id)=>{
                let view_history = JSON.parse(readFile('view_history.json', 0) || '[]');
                let idex = view_history.findIndex(x=>x.extra.id === id);
                view_history.splice(idex,1);
                saveFile('view_history.json', JSON.stringify(view_history),0);
                refreshPage(false);
                return 'hiker://empty'
            },it.extra.id);
        }
        d.push(it);
    });
}else{
  d.push({
      title:'暂无观影记录,先去观看一个视频吧!',
      col_type:'text_center_1',
      url:'hiker://empty'
  });
}
setResult(d);