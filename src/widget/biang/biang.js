import './biang.less';
import template from './biang.html';

//from node_modules
import extend from 'extend';
import uuidv1 from 'uuid/v1';

//modal的默认配置
const defaultArgs = {
    style: {
        //        width: '65%',
        //        height: '45%'
    },
    title: ' ',
    content: null,
    btns: [],
    animation: null
};

function stringToDom(text) {
    var dom = document.createElement('div');
    dom.innerHTML = text;
    return dom.childNodes ? dom.childNodes[0] : null;
}

function getId(id) {
    return 'anfo' + id;
}

function hasClass(elements, cName) {
    //(\\s|^)这个正则表示开始或空格字符开头
    //(\\s|$)这个表示结尾或空格字符开头
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    };
};

class Biang {
    constructor(args) {
        var _this = this;
        this._id = uuidv1();
        this._args = extend(true, defaultArgs, args);
        console.log(this._args);

        this._dom = stringToDom(template);
        //便捷入口
        this._animationWrapper = this._dom.getElementsByClassName('anfo-biang-animation-wrapper')[0];
        this._header = this._dom.getElementsByClassName('anfo-biang-header')[0];
        this._content = this._dom.getElementsByClassName('anfo-biang-content')[0];
        this._title = this._dom.getElementsByClassName('anfo-biang-title')[0];
        this._main = this._dom.getElementsByClassName('anfo-biang-main')[0];
        this._mask = this._dom.getElementsByClassName('anfo-biang-mask')[0];
        this._headerShutdown = this._dom.getElementsByClassName('anfo-biang-header-shutdown')[0];

        //事件
        this._headerShutdown.onclick = function () {
            _this.hide();
        };
        this._mask.onclick = function () {
            _this.hide();
        };

        this._dom.id = getId(this._id);

        //busy标志初始化，就是一个锁，在隐藏的时候会延迟调用删除元素这类的方法
        this._busy = false;

        //适应参数
        this.modify(args);
        console.debug('Biang构造完成');
    }

    //根据参数对模态框进行修改
    modify(args) {
        if (args !== null) {
            extend(this._args, args);
        }

        //获取当前的dom
        //style
        for (var style in this._args.style) {
            if (!this._args.style.hasOwnProperty(style)) {
                continue;
            }
            this._main.style[style] = this._args.style[style];
        }

        //title
        this._title.innerHTML = this._args.title;

        //content
        if (args.content !== null && args.content !== undefined) {
            this._content.innerHTML = '';
            this._content.appendChild(args.content);
        }
    }

    show() {
        if (!this.busy) {
            var element = document.getElementById(getId(this._id));
            if (element === null) {
                //添加
                document.body.insertBefore(this._dom, document.body.firstChild);
                //添加动画效果
                addClass(
                    this._animationWrapper, 'anfo-biang-normal-show'
                );
            }
        }
        return this;
    }

    hide() {
        var _this = this;

        //上锁
        this.busy = true;

        removeClass(this._animationWrapper, 'anfo-biang-normal-show');
        addClass(this._animationWrapper, 'anfo-biang-normal-hide');

        setTimeout(
            function () {
                removeClass(_this._animationWrapper, 'anfo-biang-normal-hide');
                document.body.removeChild(_this._dom);
                //解锁
                _this.busy = false;
            }, 300);
    }

    loading() {

    }
    done() {

    }
}

module.exports = Biang;
