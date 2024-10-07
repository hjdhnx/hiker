
//----------------------------------6.6.6 new go库函数-----------------
/**
created by daozhang on 2018/1/9
使用说明:
普通指令用 ;隔开
打怪后一个指令必须加 | 隔开
当前go执行已经包含了打怪指令，下次还要接着用另外的go，需要加锁与解锁
#on;  加锁
#off;  解锁
.xxx;  日志打印xxx
!xxx; 或者o!xxx o代表1或者2或者其他   游戏内提示xxx,!前面带1为绿色，带2为红色，其他默认白色
?xxx;   按下某个xxx文字的按钮
xxx?ooo 对ooo名字的npc进行xxx操作
;       空白内容纯;表示执行一次空指令，每个;可起到延时一次的作用
@xxx;   摸下某个人尸体并且捡起来东西;核心:摸尸体前必然经历过战斗，|之后紧跟prev_combat;@xxx尸体;
~;      特殊封装符号，表示观察一下
^xxx;   特殊指令,xxx表示一个不带参数的函数名，比如 function test(){} 这里就是 go('^test');只能在最后一个go末尾使用,将这个函数传递给nextgo;
$;     特殊功能指令，表示立即执行nextgo.如果$前面带0将会执行完毕后重置nextgo函数为空
=xxx;   将全局间隔延时设置为xxx毫秒，比如go('=300;n;n;n;w;=150');表示把延时间隔改为300后走几步路，完了再改回150
+xxx;   点击某个xxx名字的传送链接，功能链接
其他独立功能：
clickbtn(xxx)  点击某个xxx名字的按钮
clickhref(xxx)  点击某个xxx名字的链接
delay(ms);  延时ms毫秒执行下次go
goes(code,num); 执行为code的代码num次
nexttask=function(){};然后调用checktask();来执行，保证非战斗状态且无其他指令在执行的情况下才执行此功能
go(xxx) xxx如果包含yell,会自动执行坐船触发，坐船完毕后才执行后续指令
执行普通任务不需要打怪时无需上锁与解锁
执行特殊任务时go开头就上锁，结束才解锁

详情见最后的 newgotest 和 newgotest1  功能
newgotest1实现自动签到并杀人摸尸体连环杀人回家
**/




triggers.newTrigger(/(终于靠岸了|艄公将船靠岸|你走下船来|终于到了!|到了，你们可以下船了)/, function(m) {//坐船完毕
        console.log('坐船完毕了!'+m[0]);
        triggers.disableByCls("yell");
        go(yelled_cmd);
    },"yell","");
triggers.newTrigger(/船还没有达到这儿，等等吧/, function(m) {//船还没到
        setTimeout(function(){clickButton('yell')},300);
    },"yell_go","");	
 triggers.disableByCls("yell");
 triggers.newTrigger(/四周白朦朦的，你隐约发现山道已到了尽头/, function(m) {//雾中
       setTimeout(function(){clickbtn('爬山')},150);
    },"pashan","");
 triggers.newTrigger(/你爬着山，山路实在难！你一不小心又摔了下来！/, function(m) {//摔了
       setTimeout(function(){clickbtn('爬山')},150);
    },"pashan","");	
 triggers.newTrigger(/在这里有一个小小的平台，你可以在这稍作休息。/, function(m) {//平台
       if(mspsed_cmd.split(';')[0]=='e'){
		go(mspsed_cmd);
	    triggers.disableByCls("pashan");
        triggers.disableByCls("pashan1");
	   }
	   else{
	   setTimeout(function(){clickbtn('爬山')},150);
	   }
    },"pashan","");	
 triggers.newTrigger(/山石上已没落脚之处，再往上爬是不可能的。/, function(m) {//洞口
       if(mspsed_cmd.split(';')[0]=='n'&&mspsed_cmd.split(';')[1]!='n'){
	   setTimeout(function(){clickButton('s')},150);
	   }
    },"pashan","");	
 triggers.newTrigger(/你抓住最粗的一根，下到山谷里去了……/, function(m) {//无名山峡谷
       setTimeout(function(){clickButton('w')},150);
    },"pashan1","");	
 triggers.newTrigger(/你抓住最粗的一根，下到山谷里去了……/, function(m) {//无名山峡谷
       triggers.disableByCls("pashan");
	   triggers.disableByCls("pashan2");
       go(mspsed_cmd);
    },"pashan2","");	
 triggers.newTrigger(/山石上已没落脚之处，再往上爬是不可能的。/, function(m) {//洞口
       triggers.disableByCls("pashan");
	   triggers.disableByCls("pashan1");
       go(mspsed_cmd);
    },"pashan1","");		
 triggers.disableByCls("pashan");
 triggers.disableByCls("pashan1");
 triggers.disableByCls("pashan2");
 
  triggers.newTrigger(/你心如止水，一跃而起稳稳的站于铁索之上，无惧江下波浪滔滔，有惊无险的走到了对岸/, function(m) {//过桥成功
       triggers.disableByCls("guoqiao1");
       go(mjgqed_cmd);
    },"guoqiao1","");
  triggers.newTrigger(/你心如止水，一跃而起稳稳的站于铁索之上，无惧江下波浪滔滔，有惊无险的走到了对岸/, function(m) {//过桥成功
      go('jh 40;s;s;s;s;e;s;se;sw;s;s;s;e;e;sw;se;sw;se;event_1_8004914');
    },"guoqiao2","");
  triggers.newTrigger(/你手脚笨拙，脚踏铁索上战战兢兢缓缓向前/, function(m) {//过桥摔死
      go('jh 40;s;s;s;s;e;s;se;sw;s;s;s;e;e;sw;se;sw;se;event_1_8004914');
    },"guoqiao1","");	
  triggers.newTrigger(/你手脚笨拙，脚踏铁索上战战兢兢缓缓向前/, function(m) {//过桥摔死
     triggers.disableByCls("guoqiao2"); 
      go(mjgqed_cmd);
    },"guoqiao2","");	
 triggers.disableByCls("guoqiao1");
 triggers.disableByCls("guoqiao2");
 
  triggers.newTrigger(/你身轻如燕，脚踏攀山绳，一跃而上，惊险的跳到了对岸/, function(m) {//过桥成功
       triggers.disableByCls("tianshan1");
       go(tsgqed_cmd);
    },"tianshan1","");
  triggers.newTrigger(/你手脚笨拙，妄图一跃而至，孰料被 一阵狂风吹倒，坠入山下。/, function(m) {//过桥摔死
      go('se;s;e;n;ne;nw;event_1_58460791');
    },"tianshan1","");
  triggers.newTrigger(/你身轻如燕，脚踏攀山绳，一跃而上，惊险的跳到了对岸/, function(m) {//过桥成功
     triggers.disableByCls("tianshan2"); 
      go(tsgqed_cmd);
   },"tianshan2","");		  
  triggers.newTrigger(/你手脚笨拙，妄图一跃而至，孰料被 一阵狂风吹倒，坠入山下。/, function(m) {//过桥摔死
      go('se;s;e;n;ne;nw;ne;nw;event_1_17801939');
    },"tianshan2","");	
 triggers.disableByCls("tianshan1");
 triggers.disableByCls("tianshan2");
 
 
function clickbtn(s) {
	var a = $('button');
		for (var i = 0; i < a.length; i++) {
			if (a[i].innerText.replace(/[\r\n]|\ +/g,"").indexOf(s) > -1) {
				a[i].click();
			}
		}
}
var href_code='';
	function clickhref(s){//点链接
	for(var i=$("a[href]").length-1;i>0;i--){
		var test=document.getElementsByTagName("a")[i].innerText;
		if(test.indexOf(s)!=-1){
		last=i;
		i=1;
		}
	}
	if(typeof last!= "undefined"&&document.getElementsByTagName("a")[last].innerText.indexOf(s)!=-1){
	console.log("正在点击传送链接："+s);
	href_code=document.getElementsByTagName("a")[last].getAttribute('href').split("'")[1];
	console.log(href_code);
	clickButton(href_code);
	}
	else{console.log("没有此传送链接")};
}


var targetName = "醉汉的尸体",yelled_cmd="",mspsed_cmd="",mjgqed_cmd="",tsgqed_cmd="";

function AutoGet() {
	$("button.cmd_click3").each(function() {
		if (isContains($(this).html(), targetName)) eval($(this).attr("onclick").replace("look_item corpse", "get corpse"))
	})
}
function isContains(a, b) {
	return a.indexOf(b) >= 0
}
var npc_id;

function getnpcid(n) {
	var b = document.getElementById('out').getElementsByTagName('button');
	for (var i = 0; i < b.length; i++) {
		if (b[i].innerText == n) {
			npc_id = b[i].getAttribute('onclick').split("'")[1].split(" ")[1];
			return
		}
	}
}
var isDelayCmd = 1,
	go_num = 0,
	str = "",
	cmdCache = [],
	timeCmd = null,
	cmdDelayTime = 150;

function go_start(a) {
	var b = a.split(";");
	if (isDelayCmd && cmdDelayTime) {
		cmdCache = cmdCache.concat(b);
		if (!timeCmd) delayCmd()
	} else {
		for (var go_num = 0; go_num < b.length; go_num++) go_single(b[go_num])
	}
}
function delayCmd() {
	var a = cmdCache.shift();
	var b = a.split(";");
	if (!sock) {
		return
	}
	go_single(b[0]);
	for (var i = b.length - 1; i > 0; i--) {
		cmdCache.unshift(b[i])
	}
	if (cmdCache.length > 0) {
		timeCmd = setTimeout(delayCmd, cmdDelayTime)
	} else {
		timeCmd = 1;
		setTimeout(function() {
			if (cmdCache.length == 0) timeCmd = 0;
			else delayCmd()
		}, cmdDelayTime)
	}
}
function stopDelayCmd() {
	clearTimeout(timeCmd);
	timeCmd = 0;
	cmdCache = []
}

var nexttask = function() {},
    nextdo = function() {},
    nextgo=function(){},//go所有执行完毕后才执行这个功能
	task_time,
	bs_time;
	
function checktask() {
	if(!is_fighting&&cmdCache.length==0){
		clearTimeout(task_time);
		nexttask();
	}
	else{
		clearTimeout(task_time);
		task_time = setTimeout(checktask, 2000);
	}
}
function checkbusy() {
	if (timeCmd == null) {
		clearTimeout(bs_time);
		console.log('检测得' + cmdCache.length + "没有战斗，进行后面操作");
		nextdo()
	} else if (is_fighting) {
		g_gmain.notify_fail(HIR + "正在激烈战斗中。。。" + NOR);
		bs_time = setTimeout(checkbusy, 1000)
	} else if (!timeCmd == false) {
		console.log("正在做任务，请等待本任务完成:" + cmdCache.length);
		bs_time = setTimeout(checkbusy, 1000)
	} else {
		clearTimeout(bs_time);
		nextdo()
	}
}
function words1(s){
	g_gmain.recvNetWork2(HIW + s+"\n" + NOR);//白
}
function words2(s){
	g_gmain.recvNetWork2(HIG + s+"\n" + NOR);//绿
}
function words3(s){
	g_gmain.recvNetWork2(HIR + s+"\n" + NOR);//红
}
var go_lock = 0,
go_locked = "",
go_lockednum = 0,
now_lockednum = 0,
go_lockedod = [];

function go_single(s) {
	if (s == '#on') {
		go_lock = 1
	} else if (s == '#off') {
		go_lock = 0;
		now_lockednum--
	}
    else if(s.indexOf('=') > -1){
		cmdDelayTime = parseInt(s.split('=')[1]);
	}
	else if (s.indexOf('.') > -1) {
		console.log(s.split('.')[1])
	} else if (s.indexOf('!') > -1) {
		if (s.split('!')[0] != '') {
			if(s.split('!')[0] == '1'){
				words2(s.split('!')[1]);
			}
			else if(s.split('!')[0] == '2'){
				words3(s.split('!')[1]);
			}
			else{
				words1(s.split('!')[1]);
			}
		} else {
			words1(s.split('!')[1]);
		}
	} else if (s.indexOf('?') > -1) {
		if (s.split('?')[0] != '') {
			getnpcid(s.split('?')[1]);
			clickButton(s.split('?')[0] + ' ' + npc_id)
		} else {
			clickbtn(s.split('?')[1])
		}
	} else if (s.indexOf('@') > -1) {
		targetName = s.split('@')[1];
		AutoGet();
		console.log('摸取' + targetName)
	} else if (s.indexOf('~') > -1) {
		clickButton('golook_room')
	}
    else if (s.indexOf('^') > -1) {
		nextgo=eval(s.split('^')[1]);
	}
	else if(s.indexOf('$') > -1){
		nextgo();
		if (s.split('$')[0] == '0'){
			nextgo=function(){};
		}
	}
	else if(s.indexOf('+') > -1){
		clickhref(s.split('+')[1]);
	}
	else {
		clickButton(s)
	}
}
function go_str() {
	if (go_num < str.length) {
		go_start(str[go_num]);
		go_num++;
		if (go_num < str.length) {
			nextdo = function() {
				go_str()
			};
			setTimeout(checkbusy, str[(go_num - 1)].split(';').length * cmdDelayTime + 3000)
		} else if (go_num == str.length) {
			go_num = 0
		}
	}
}
var nowlockod = [];

function tell_lockover() {
	if (nowlockod.length == 0) {
		nowlockod = go_lockedod
	}
	if (go_lock == 0 && nowlockod.length > 0) {
		console.log('执行' + nowlockod[0].substr(0,40)+'...');
		go(nowlockod[0]);
		nowlockod.shift();
		if (nowlockod.length == 0) {
			newgo_reset()
		}
	} else {
		setTimeout(tell_lockover, 1000)
	}
}
function newgo_reset() {
	console.log("清空锁存数组！");
	now_lockednum = 0;
	go_lock = 0;
	go_locked = "";
	go_lockednum = 0;
	now_lockednum = 1;
	go_lockedod = []
}
function go(s) {
	if (go_lock == 0) {
		str = s;
		if(str.indexOf('yell;') > -1&&str.split('yell;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('yell;')[1].split(';')[0])>-1){
			yelled_cmd=str.substring(str.indexOf('yell;')+5);//先将yell后面的指令储存为另一段str;
			//console.log('坐船完毕后指令：'+yelled_cmd);
			str = str.split(';yell;');
			str[0]=str[0]+';yell';//分隔后生成第一段坐船的函数
			//console.log('坐船完毕前指令:'+str[0]);
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("yell");},5000);
		}
		else if(str.indexOf('msps1;') > -1&&str.split('msps1;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('msps1;')[1].split(';')[0])>-1){
			mspsed_cmd=str.substring(str.indexOf('msps1;')+6);//先将msps1后面的指令储存为另一段str;
			str = str.split(';msps1;');
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("pashan");triggers.enableByCls("pashan1");},500);
		}
		else if(str.indexOf('msps2;') > -1&&str.split('msps2;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('msps2;')[1].split(';')[0])>-1){
			mspsed_cmd=str.substring(str.indexOf('msps2;')+6);//先将msps2后面的指令储存为另一段str;
			str = str.split(';msps2;');
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("pashan");triggers.enableByCls("pashan2");},500);
		}
		else if(str.indexOf('mjgq1;') > -1&&str.split('mjgq1;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('mjgq1;')[1].split(';')[0])>-1){
			mjgqed_cmd=str.substring(str.indexOf('mjgq1;')+6);//先将mjgq1后面的指令储存为另一段str;
			str = str.split(';mjgq1;');
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("guoqiao1");},500);
		}
		else if(str.indexOf('mjgq2;') > -1&&str.split('mjgq2;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('mjgq2;')[1].split(';')[0])>-1){
			mjgqed_cmd=str.substring(str.indexOf('mjgq2;')+6);//先将mjgq2后面的指令储存为另一段str;
			str = str.split(';mjgq2;');
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("guoqiao2");},500);
		}else if(str.indexOf('ts1;') > -1&&str.split('ts1;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('ts1;')[1].split(';')[0])>-1){
			tsgqed_cmd=str.substring(str.indexOf('ts1;')+4);//先将tsgq1后面的指令储存为另一段str;
			str = str.split(';ts1;');
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("tianshan1");},500);
		}
		else if(str.indexOf('ts2;') > -1&&str.split('ts2;')[1].split(';').length>0&&'nswenwneswse'.indexOf(str.split('ts2;')[1].split(';')[0])>-1){
			tsgqed_cmd=str.substring(str.indexOf('ts2;')+4);//先将tsgq2后面的指令储存为另一段str;
			str = str.split(';ts2;');
			if(str[0].indexOf('|') > -1){
			str = str[0].split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str();
			}
			else {
			go_start(str[0]);
			}
			setTimeout(function(){triggers.enableByCls("tianshan2");},500);
		}
		else if (str.indexOf('|') > -1) {
			yelled_cmd='';
			mspsed_cmd='';
			str = str.split('|');
			var go_num = 0;
			words3('进入了打怪指令模式');
			go_str()
		} 
		else {
			yelled_cmd='';
			mspsed_cmd='';
			go_start(str);
		}
	} else if (go_lock == 1) {
		if (go_locked == '') {
			go_locked = s;
			go_lockedod[0] = go_locked
		} else if (go_locked != '') {
			go_lockednum++;
			now_lockednum = go_lockednum;
			go_lockedod[go_lockednum] = s
		}
		setTimeout(tell_lockover, 2000)
	}
}
function delay(ms){
	var stopms=(ms/cmdDelayTime);
	var a='';
	console.log("延时中，等待"+stopms*cmdDelayTime+"毫秒");
	for(var k=0;k<ms/cmdDelayTime;k++){
		a+=';';
	}
	go(a);
}    
function goes(str,num){
	var a='';
	for(var i=0;i<num;i++){
		a+=str+';';
	}
	go(a);
}

function newgotest() {
	go('#on;jh 1;?逄义;?大暑礼包;e;n;n;kill?醉汉|~;@醉汉的尸体;jh 2;n;n;n;n;?地痞;?杀死|jh 3;fight huashancun_huashancun12|home;1!准备解锁;.本次执行完毕;#off');
    go('#on;jh 1;e;n;n;kill snow_drunk|jh 2;n;n;n;n;kill luoyang_luoyang26|jh 3;fight huashancun_huashancun12|home;!准备解锁;.本次执行完毕;#off');
	go('#on;jh 2;n;n;n;n;kill luoyang_luoyang26|;#off');
	go('jh 3;s;s;s');
	go('jh 4;n;n;n;n');
	go('tupo try,taxue-wuhen');
}
function msg(){
	alert('created by daozhang on 2018/09/12');
}

function test(){
	go('jh 1;e;n;n;n;n;n');
	go('^msg;$');
}