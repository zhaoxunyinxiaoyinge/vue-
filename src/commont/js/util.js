// * 解析url参数
/* @example ?id=12345&a=b
    * @return Object {id:12345,a:b}
*/
export function urlParse() {
    //这里获取的是url下面的？后面的参数；
    let url = window.location.href;
    //这里是自定义一个对象；
    let obj = {};
    //这里是一个正则表达;
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    //这里判段数组是否承承载；
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            //这里用于将两个值组合成一个对象；
            obj[key] = val;
        });
    }
    return obj;
};
export function format(date,fmat) {
    if(/(y+)/.test(fmat)){
        fmat=fmat.replace(RegExp.$1,date.getFullYear()+"".substring(4-RegExp.$1.length));
    }
    let o={
        "M+":date.getFullYear()+1,
        "d+":date.getDate(),
        "h+":date.getHours(),
        "m+":date.getMinutes(),
        "s+":date.getSeconds()
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmat)){
            let str2=o[k]+"";
            fmat=fmat.replace(RegExp.$1,(RegExp.$1.length===1)? str2:mart(str2))

        }
    }
    return fmat
}
function mart(str) {
    return("00"+str).substring(str.length);
}
//设置localstroge的值
export function setLocalStorage(id,key,value){
    //第一步检测是否陈在seller值；
    let seller=localStorage.__getSeller__;
    if(!seller){
        seller={};
        seller[id]={}
    }else{
         seller=JSON.parse(seller)[id];
         //这一步是实际上正对的是不同的id值，并不是没有值；
         if(!seller){
             seller[id]={}
         }
    }
    seller[id][key]=value;
    localStorage.__getSeller__=JSON.stringify(seller);
}
export function loadStaroage(id,key,def) {
    let seller=window.localStorage.__seller__;
    if(!seller){
        return def
    }
    seller=seller.parse(seller)[id];
    if(!seller){
        return def
    }
    let df=seller[key];
    return df||def

}