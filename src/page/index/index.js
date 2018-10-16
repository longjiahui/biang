import './index.less';

import biang from '../../widget/biang/interface.js';

function stringToDom(text) {
    var dom = document.createElement('div');
    dom.innerHTML = text;
    return dom.childNodes ? dom.childNodes[0] : null;
}
var demo1 = stringToDom('<iframe src="http://baidu.com" style="width:100%;height:100%" frameborder="0"></iframe>');
var demo2 = stringToDom('<div><p>jdjdjdj</p></div>');

var b = biang.biang({
    title: 'lala',
    style: {
        width: '80%',
        height: '80%'
    },
    onHide:function(e){
      console.log(this,e);  
    },
    content: demo1
});

b.show();

biang.info('lala', {
    btns: [{
        title: '确定',
        style:{
            border:'thin solid lightgray',
            borderRadius:'5px',
            background:'dimgray',
            color:'white'
        }
    }]
}).show();

setTimeout(function () {
    biang.error('错误啦啦啦', {
        animation: 'modal-custom'
    }).show();
}, 2000);
setTimeout(function () {
    biang.confirm('你喜欢吃豆腐吗?', function (yes) {
        if (yes) {
            biang.info('你喜欢', {
                animation: 'modal-custom'
            }).show();
        } else {
            biang.info('你不喜欢', {
                animation: 'modal-custom'
            }).show();
        }
    }, {
        animation: 'modal-custom'
    }).show();
}, 3000);
