let product = this.data.list;
console.log(product);
let cartlist = Storage.getStorageSync('cartlist')||[];

if(Array.isArray(cartlist) && cartlist.length > 0){
    let idx = cartlist.findIndex(it=>it.id===product.id);
    if(idx > -1){
        cartlist[idx].num+=product.num;
    }else{
        cartlist.push(product);
    }
}else{
    cartlist = [];
    cartlist.push(product);
}

cartlist.find()