#### 引言 《关于扩充dr模板不为人知的事儿》- Taoist
1.tabs-定位线路列表  
模板会自动取线路列表里定位出来元素的的body&&Text就是内置文本作为线路名称。  
但是有的线路内部文本很奇怪，有广告和数字之类的。比如:多多 在线观看。  
实际定位出来的线路列表源码长这样:
```html
<p>多多<span>在线观看</p>
```
只想取多多怎么办？请看第2点  
2.tab_text-定位线路名称  
默认不填就是第1点上面说的body&&Text。  
如果要应付第1点提到的例子不想取span里的文字怎么办？
```json
{"tab_text":"body--span&&Text"}
```
这样就行了  
3.lists-定位选集列表  
这里不得不说一下，里面涉及一个#id变量，#id的意思是进行线路替换，会自动替换定位出来的线路列表。    
举个香蕉:  
```json
{"lists":".paly_list_btn,#id&&li"}
```
这个什么意思呢？假如网站的选集定位是body&&.paly_list_btn  
他这对应的很多条线路的所有选集数据，实际过程中会根据线路切换去取  
```scss
.paly_list_btn,0&&li  
.paly_list_btn,1&&li  
.paly_list_btn,2&&li
```
这个过程里的0,1,2就是#id变量自动替换的值  
4.tab_id-定位线路-选集关联特征  
这个属性用的比较少了，主要是接着上一步的#id用的。  
默认不填tab_id，#id会按线路顺序0,1,2,n这样去替换选集定位。  
如果填了这个，那么#id的替换词就是tab_id定位出来的结果  
5."需要魔断":false  
这个作用只有一个，如果是true，会自动把二级图片的点击链接变成魔断的配置x5界面。  
基本是都是false，也可以不填。  
当然。你非要弄成true，那么也要自定义二级的lazy才能真正实现魔断的调用  
6."动态最新章节":true  
这个的作用就是二级收藏过后从收藏界面能智能获取最新章节。推荐模块都用上true  
7."二级处理":{}  
```json
{"二级处理":"(()=>{return{重定向:function(url,html){url=pd(html,'.playbtn&&a&&href');log('重定向到:'+url);html=获取源码(url);return html}}})()"}
```
这个就比较厉害了，我敢说基本没多少人会。  
这个的应用场景有，比如二级详情页只有图片，更新，简介等东西，没有线路和选集。  
然后二级详情页又有个立即播放之类的按钮点击了才跳到选集和线路页。  
这种情况叫做二级重定向，详情与线路选集分离，就可以用到二级处理的写法，里面进行重定向。  
肯定很多人不知道里面的东西怎么实现来的？  
其实就是普通的dr规则里有的二级界面有这种写法。  
```js
var 二级处理={
重定向:function(u){
    return u
}
}
```
我们只需要把变量定义二级处理=后面的内容
```js
{
重定向:function(u){
    return u
}
}
```
复制到dr模板小程序->一二级处理  
在第一个框里输入刚才复制的内容并点击生成，在第二个框里看生成的结果点击复制，然后点最下面的在线压缩进去把代码压缩成一行就能放模板里了。  
这里操作有些复杂，为啥要这么做？  
因为dr模板保存格式是json的，要保证涉及到对象及函数功能完整型，需要合理的转化为一个单行的字符串再给模板解析。同理一级处理也是这样写的。  
一级处理估计用的人少，但是不排除有这种场景。比如把一级定位到的链接进行js拼接，图片加referer之类的
8.关于二级模板自带的免嗅模式。大家见到的一般是  
```js
require(config.自动匹配);
自动二级();
```
这种写法是内置的仓库通免，需要用户确保仓库是最新版。当然，纯dr程序一级会有自动检测仓库版本的逻辑，但是缝合怪程序是没有的。  
也可以换种二级通免，比如换成自定义的免嗅或者香佬的通免。  
这里说一下怎么写香佬通免，很简单的代码:  
```js
require(config.自动匹配);
香免();
自动二级(lazy);
```
其实也不用我这个小菜鸡在这儿指指点点，毕竟模板一键生成的代码里其实都有了，只不过官方默认注释了而已。  
对了，发现模板最近增加了混合一级模式，就是一级页面支持规则自动匹配以及网页书签，可以在设置按钮里切换。
这样做的好处是小程序存活久一点，以及如果网站一级无广告的话，用书签模式还更清爽舒服，比如独播库网站，毕竟网页书签版进去还能看到热播推荐，适用于不知道看什么的朋友。  
9.其实dr模板一级写动态分类真的很简单，只是很多人搞不懂true_url怎么获取？  
模板内置的一个
```js
true_url=获取正确链接()
```
可以应付部分情况，其他时候需要自己拼接page当前页数进去。
一级打造动态分类里，有个
```js
分类链接:{
二次处理(u){
return u.replace(/type/,'show')
}
}
```
这种东西是看情况替换的，不能乱用。  
剩下的就是定位大小分类了，里面可能会用到:  
```text
:not(:matches(留言|下载))
:matches(电影|电视剧|综艺|动漫)
has(a[href]):not(:matches(^$))
```

#### 道长有话说
##### 我啥也不会，就在这里列举三种常见的一级模板写法吧
1.  一级动态分类模板-小程序上无需填分类  
```js
js:
require(config.自动匹配);
var page = MY_PAGE;
var true_url = getMyVar('header.url', MY_URL);
//true_url = 获取正确链接();
if(page>1){
    true_url=true_url.replace(/(.*)---(.*)\.html/,'$1'+page+'---$2.html')
}
//log('true_url:'+true_url);
let cates=打造动态分类([{
    一级分类: '.fed-casc-list&&dl',
    子分类: 'dl&&dd:has(a[href]):not(:matches(^$))',
}]);
设置(cates);
自动一级(null,cates,html);
```
2. 一级静态分类模板-小程序上用视界的自带分类  
```js
js:
require(config.自动匹配);
自动一级();
```
3. 一级书签模板  
```js
js:
require(config.模板);
依赖检测();
一级书签('/vod/|detail/','gbook');
```
4. 一级混合UI模板，支持规则与网页切换  
```js
js:
require(config.自动匹配);
let ui = ()=>{
    //page = MY_PAGE;
    //true_url = getMyVar('header.url', MY_URL);
    true_url = 获取正确链接();
    //log(true_url);
    let cates = 打造动态分类([{
        一级分类:'body&&.stui-header__menu',
        子分类:'body&&li:has(a[href]):matches(电影|电视剧|综艺|动漫)',
        分类链接:{
            二次处理(u){
                return u.replace(/list\/(\d+)\.html/,'show/$1-----------.html')
            }
        }
    },{
        一级分类:'body&&.nav-tabs',
        子分类:'body&&li'
    },{
        一级分类:'body&&.stui-screen__list',
        子分类:'body&&li:has(a[href])'
    }]);
    设置(cates);
    自动一级(null,cates,html);
}
混合(ui,"/vod/","gbook");
```
###### 关于dr模板应用于小说/漫画/图片/小姐姐等小程序场景  
1. 这些东西不好教，自己参考dr合集里的 小程序手写部分代码吧，贼好使
###### 关于动态分类  
框架是reborn吐佬的，我直接甩锅，教不会。不服找作者去  
###### 言尽于此，学得好的人早就写了几十个自己的dr/DR/Dr小程序了

###### 道长自封装的UI库
[访问插件链接](https://dr.playdreamer.cn/js/hikerUi.js)  
二级选集动态翻页用法:  
讲解:  
下方的list是完整选集列表  
选集翻页参数1为一个数组,就是即将进行setResult的变量    
选集翻页参数2为一个对象
```js
obj = {
list:[],//可以对象传递,不传的话默认取storage0.gettMyVar('showList')
size:Number(lsg.getItem('每页数量',40)),//每页数量
over:Number(lsg.getItem('翻页阀值',40)),//翻页阀值，超过多少才显示翻页组件
col_type:lsg.getItem('按钮样式','')||MY_RULE.col_type||'text_5',//二级选集样式
}
```
选集翻页参数3为一个bool值,是否在选集按钮下方也显示5大翻页按钮  
用法1.
```js
storage0.putMyVar('showList',list);//将要进行分页的数据设置缓存变量,也可以通过选集翻页函数第2个参数传递
require('https://dr.playdreamer.cn/js/hikerUi.js');
//选集翻页(d); // 翻页5大按钮在选集按钮上方
选集翻页(d,null,true);//翻页5大按钮在选集按钮上下部分都有
```  
用法2.
```js
require('https://dr.playdreamer.cn/js/hikerUi.js');
选集翻页(d,{
    list:list,
}); // 翻页5大按钮在选集按钮上方
```
