js:
var a=33;
//evalPrivateJS('e212J82fXV7pTsazk0ig9Q==');
//evalPrivateJS.call(null,'e212J82fXV7pTsazk0ig9Q==');
setResult([
    {
        title:'测',
        col_type:'text_1',
        url:$().lazyRule((a)=>{
            log(a);
            log(typeof(evalPrivateJS));
            eval.call(null,'var a='+a);
            evalPrivateJS('e212J82fXV7pTsazk0ig9Q==');
            return 'toast://看日志'
        },a),
    }
])
