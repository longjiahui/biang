import './index.less';

import Biang from '../../widget/biang/biang.js';


function stringToDom(text) {
    var dom = document.createElement('div');
    dom.innerHTML = text;
    return dom.childNodes ? dom.childNodes[0] : null;
}

var biang = new Biang({
    title: 'lala',
    style: {

    },
    content: stringToDom('<iframe src="http://baidu.com" style="width:100%;height:100%" frameborder="0"></iframe>')
});

biang.show();
