# Biang

Biang就是个简单的modal框而已，用了一个X的图标，只用了原生的js，使用webpack打的包。

# Usage

##### 直接在页面引入js文件

```
<script src="biang.min.js"></script>

<script>
    new Biang({
        title:'biang!!!'
    }).show();
</script>
```

##### 使用webpack、browserify时能通过import/require引入

```npm install biang```

```
/*
index.js
当前content只能使用dom类型的变量
*/

const Biang = require('biang');

var biang = new Biang({
    style:{
        width:'30%',
        height:'400px',
        borderRadius:'5px'
        //...原生style都可以适用
    },
    title:'biang',
    content:document.getElementById('demo')
}).show();
//show方法会链式返回，所以可以用变量接收
//biang.hide(); //hide方法隐藏，并从body中清楚，再次调用show可以重新插入body下

//modify可以更新配置
setTimeout(function(){
    biang.modify({
    style:{
        width:'50%',
        height:'80%',
        borderRadius:'3px'
    },
    content:document.getElementById('demo2')
});}, 1000);

```