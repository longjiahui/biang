import './biang.less';
import biangTemplate from './biang.html';
import buttonTemplate from './btn.html';
import utils from '../../utils.js';

//from node_modules
import extend from 'extend';
import uuidv1 from 'uuid/v1';

//modal的默认配置
function getArgs(args) {
    return extend(true, {
        style: {
            //        width: '65%',
            //        height: '45%'
        },
        title: null,
        content: null,
        btns: [],
        animation: 'anfo-biang-main',

        _footerHeight: 50,
        _headerHeight: 50
    }, args);
}

class Biang {
    constructor(args) {
        var _this = this;
        this._id = uuidv1();
        this._args = getArgs(args);
        this._dom = utils.stringToDom(biangTemplate);
        //便捷入口
        this._header = this._dom.getElementsByClassName('anfo-biang-header')[0];
        this._footer = this._dom.getElementsByClassName('anfo-biang-footer')[0];
        this._content = this._dom.getElementsByClassName('anfo-biang-content')[0];
        this._title = this._dom.getElementsByClassName('anfo-biang-title')[0];
        this._main = this._dom.getElementsByClassName('anfo-biang-main')[0];
        this._animationWrapper = this._dom.getElementsByClassName('anfo-biang-animation-wrapper')[0];
        this._mask = this._dom.getElementsByClassName('anfo-biang-mask')[0];
        this._headerShutdown = this._dom.getElementsByClassName('anfo-biang-header-shutdown')[0];

        //事件
        this._headerShutdown.onclick = function () {
            _this.hide();
        };
        this._mask.onclick = function () {
            _this.hide();
        };

        this._dom.id = utils.getId(this._id);

        //busy标志初始化，就是一个锁，在隐藏的时候会延迟调用删除元素这类的方法
        this._busy = false;

        //适应参数
        this.modify(args);

        console.debug('Biang构造完成');
    }

    _doStyle(node, style) {
        for (var key in style) {
            if (!style.hasOwnProperty(key)) {
                continue;
            }
            node.style[key] = style[key];
        }
    }

    _doEvents(node, events) {
        var _this = this;
        if (events && events.length > 0) {
            events.forEach(function (event, index) {
                node.addEventListener(event.type, event.callback.bind(_this));
            });
        }
    }

    _btnProducer(btn) {
        var _this = this;
        var dom = utils.stringToDom(buttonTemplate);
        if (btn.title !== null && btn.title !== undefined) {
            dom.getElementsByClassName('anfo-biang-btn-title')[0].innerHTML = btn.title;
        }
        if (btn.style !== null && btn.style !== undefined) {
            this._doStyle(dom, btn.style);
        }
        if (btn.className !== null && btn.className !== undefined) {
            utils.addClass(dom.getElementsByClassName('anfo-biang-btn-icon')[0], btn.className);
        }
        this._doEvents(dom, [{
            type: 'click',
            callback: btn.callback ? btn.callback : function () {
                _this.hide();
            }
        }]);
        return dom;
    }

    _doBtn(btn) {
        this._footer.appendChild(this._btnProducer(btn));
    }

    _doBtns(btns) {
        var _this = this;
        if (btns && btns.length > 0) {
            btns.forEach(function (btn, index) {
                _this._doBtn(btn);
            });
        }
    }

    //根据参数对模态框进行修改
    modify(args) {

        if (args !== null || args !== undefined) {
            extend(true, this._args, args);
        }

        //获取当前的dom
        //style
        this._doStyle(this._main, this._args.style);

        //title
        //title为null， 不显示header
        if (this._args.title !== null && this._args.title !== undefined) {
            this._title.innerHTML = this._args.title;
            this._header.style.display = 'block';
        } else {
            //如果是空，则隐藏header
            this._header.style.display = 'none';
            //若按钮组没有按钮，则添加删除按钮
            if (!this._args.btns || this._args.btns.length === 0) {
                //添加
                //添加到args是因为 下面会更具args判断是否需要更新
                this._args.btns = args.btns = [{
                    title: 'Ok',
                    className: 'iconfont icon-roundclosefill'
                }];
            }
        }

        //content
        if (args.content !== null && args.content !== undefined) {
            this._content.innerHTML = '';
            //如果是字符串则直接innerHTML，否则视为node
            if (typeof args.content === 'string') {
                this._content.innerHTML = args.content;
            } else {
                var tmp = args.content.cloneNode(true);
                tmp.style.display = 'block';
                this._content.appendChild(tmp);
            }
        }

        //footer
        //确认是否需要更新按钮，这里是为了减少每次modify都重新渲染的次数
        if (args.btns !== null && args.btns !== undefined) {
            //如果需要更新，则需要将btns先删掉
            this._footer.innerHTML = '';
            this._doBtns(this._args.btns);
        }

        //根据当前状态修改content的高度以及他们的定位
        var headerState = false,
            footerState = false;
        if (this._args.title !== null && this._args.title !== undefined) {
            //title不为空且不为undefined
            headerState = true;
            this._content.style.top = this._args._headerHeight + 'px';
        } else {
            this._content.style.top = 0;
        }
        if (this._args.btns && this._args.btns.length > 0) {
            footerState = true;
            this._footer.style.display = 'flex';
        } else {
            //隐藏footer
            this._footer.style.display = 'none';
        }
        this._content.style.height = 'calc(100% - ' + ((headerState ? 50 : 0) + (footerState ? 50 : 0)) + 'px)';

        return this;
    }

    show() {
        if (!this.busy) {
            var element = document.getElementById(utils.getId(this._id));
            if (element === null) {
                //添加
                document.body.appendChild(this._dom);
                //添加动画效果
                //mask
                utils.addClass(
                    this._mask, 'anfo-biang-mask-show'
                );
                //main
                utils.addClass(
                    //this._args.animation默认是 anfo-biang-normal
                    this._animationWrapper, this._args.animation + '-show'
                );
            }
        }
        return this;
    }

    _lock() {
        this.busy = true;
        //上锁还需要 使得dom不可响应点击事件
        utils.addClass(this._dom, 'anfo-no-event');
    }
    _unlock() {
        this.busy = false;
        //解锁要解开不可响应状态
        utils.removeClass(this._dom, 'anfo-no-event');
    }

    hide() {
        var _this = this;

        //上锁
        this._lock();

        //mask
        utils.removeClass(this._mask, 'anfo-biang-mask-show');
        utils.addClass(this._mask, 'anfo-biang-mask-hide');
        //main
        utils.removeClass(this._animationWrapper, this._args.animation + '-show');
        utils.addClass(this._animationWrapper, this._args.animation + '-hide');

        setTimeout(
            function () {
                //mask
                utils.removeClass(_this._mask, 'anfo-biang-mask-hide');
                //main
                utils.removeClass(_this._animationWrapper, _this._args.animation + '-hide');
                document.body.removeChild(_this._dom);
                //解锁
                _this._unlock();
            }, 300);
    }

    loading() {

    }
    done() {

    }
}

module.exports = Biang;
