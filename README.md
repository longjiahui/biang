# Biang

Biang就是个简单的modal框，用了一个X的图标，只用了原生的js，使用webpack打的包。

Demo可查看[这里](http://47.52.234.226:8080/)

# Features

- 可以配置标题、内容、以及按钮组
- 可以自定义动画
- 可以直接调用error、info、confirm来快捷创建提示信息modal框

# Usage

- 在页面直接引用js文件

```
<script src="biang.min.js"></script>
```

- npm引入

```
# npm install biang
```

然后可以在webpack\browserify中引入

```
const biang = require('biang');
//or
import biang from 'biang';
```

### 报告错误，输出信息

```
biang.error(content, args);
biang.info(content, args);
```

```
<script src="biang.min.js"></script>

<script>
    biang.error('发生了一个错误').show();
    biang.info('公共厕所已经建好了!').show();
</script>

```

### 确认用户行为

```

/*
callback参数为boolean
true表示用户按了Yes，false表示用户按了No
callback内this表示该biang实例
能通过this.hide()调用隐藏该实例。
*/

biang.confirm(content, callback, args);
```

```
<script src="biang.min.js"></script>

<script>
    biang.confirm('👉 你会使用3DsMax建模吗', function(yes){
        if(yes){
            biang.info('拜托教教我吧').show();
        }else{
            biang.info('╮(╯-╰)╭ Fine').show();
        }
    }).show();
</script>
```

### 打开一个自定义弹窗

下面创建一个打开百度iframe页的弹窗

```
/*
上面的args与此处的args是一致的，都能配置一个modal框
*/
biang.biang(args);
```

```
biang.biang({
    title: '一个baidu的Iframe页面',
    style: {
        width: '80%',
        height: '80%'
    },
    content: '<iframe src="http://baidu.com" style="width:100%;height:100%" frameborder="0"></iframe>'
}).show();
```

#### 参数列表

- title：标题，如果为null/undefined则modal框没有header栏，若没配置btns属性则会在footer处增加一个X图标用来供用户主动关闭modal框。
- style：样式，设置modal框的样式，最主要用来调整modal框大小，分别是width和height，也可以调整边框和radius等等，直接操作node的style属性。
- content：modal框内容，接受string和HTML Dom类型的变量，string会填入innerHTML中。
- btns：按钮组，数组。
    - 单个btn结构说明
        - title：文字描述
        - className：类名，用来填入图标的类，例如fontawesome、iconfont的类名
        - callback：点击后的回调函数，绑定了this指针为该biang实例
- animation：自定义动画
    - 默认为anfo-biang-normal，使用时biang会自动使用css中```.anfo-biang-normal-show```和```.anfo-biang-normal-hide```两个动画类
    
### 自定义动画

动画设置的是modal框的动画，背后的mask层会自动变成灰色。biang会根据设定的animation值使用animation+'-show'和animation+'-hide'动画类来添加动画。下面自定义一个'custom'的动画，类似于bootstrap的modal框的动画。

```
<!--index.html-->
<script src="biang.min.js"></script>

<script>
    biang.info('公共厕所已经建好了!', {
        animation:'custom'
    }).show();
</script>
<style>
    @keyframes custom-show{
    from{
        opacity:0;
        padding-top:200px;
    }to{
        opacity:1;
        padding-top:0;
    }
    }
    @keyframes custom-hide{
        to{
            opacity:0;
            padding-top:200px;
        }from{
            opacity:1;
            padding-top:0;
        }
    }
    .custom-show{
        animation: custom-show ease-out 0.3s;
        animation-fill-mode: forwards;
    }
    .custom-hide{
        animation: custom-hide ease-out 0.3s;
        animation-fill-mode: forwards;
    }
</style>
```
