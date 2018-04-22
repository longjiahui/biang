# biang
biangbiangbiang

# 一个 modal

```
const $ = require('jquery');
var biang = require('../../biang.js');

/*config {
url:''//iframe
content://div content(dom element)
title://title of the modal
button://[{'yes', {text:'no', type:'shutdown'}, 'button1']array
callback://[function(){console.log('yes')}, function(){console.log('no')}, function(){console.log('button1')}]array
}*/

$(function(){
    console.log('hello 2');
    $('#btn-demo').click(function(){
            biang.biang({
                title:'haha',
                url:'http://baidu.com'
            });
    });
});
```