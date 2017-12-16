/**
 * 1.运动封装  startMove(obj,json,fnEnd)
 * 2.获取元素的样式  getStyle(obj,name)
 * 
 * 
 * 
 * **/






/* 
- obj 指的是DOM对象 
- json 指的是 CSS样式 
- 例 startMove(oDiv,{width:100,height:100},function(){}) 
*/  
  
function startMove(obj,json,fnEnd){  
    clearInterval(obj.timer);   //先清除之前的定时器  
    obj.timer = setInterval(function(){  
        var bStop = true;   // 假设所有的值都到了  
        for( var attr in json ){    //遍历json属性  
            var cur = (attr == 'opacity') ? Math.round(parseFloat(getStyle(obj,attr))*100) : parseInt(getStyle(obj,attr)); //对opacity 特殊处理  
            var speed = (json[attr] - cur)/6;  
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);    //speed 数字转化，防止不能到达目标的bug  
            if( cur != json[attr]) bStop = false;   //如果没有达到目标值，则bStop设为false;  
            if(attr == 'opacity'){  
                obj.style.filter = 'alpha(opacity='+ (cur + speed) +')';  
                obj.style.opacity = (cur + speed)/100;  
            }else{  
                obj.style[attr] = cur + speed + 'px';     
            }     
        }  
        if(bStop){  
            clearInterval(obj.timer);  
            if(fnEnd) fnEnd();   //执行回调函数  
        }  
    },30);  
}  
  
function getStyle(obj,name){  
    return obj.currentStyle ? obj.currentStyle[name] : window.getComputedStyle(obj,null)[name]; //浏览器兼容性处理，注意getComputedStyle为只读属性  
}  
  
// function getByClass(oParent,sClass){  
//     var aEle = oParent.getElementsByTagName('*');  
//     var aResult =[];  
//     var re = new RegExp('\\b' + sClass + '\\b','i');  
//     for(var i=0; i<aEle.length;i++ ){  
//         if(re.test(aEle[i].className)) aResult.push(aEle[i]);  
//     }  
//     return aResult;  
// }  