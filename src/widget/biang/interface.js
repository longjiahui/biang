import Biang from './biang.js';
import utils from '../../utils.js';

import tipTemplate from './content/tip.html';

//from lib
import extend from 'extend';

function _getTipDom() {
    var dom = utils.stringToDom(tipTemplate);
    dom._title = dom.getElementsByClassName('anfo-biang-tip-title')[0];
    return dom;
}

function getTipArgs(args) {
    return extend(true, {
        style: {
            width: '300px',
            height: '160px'
        }
        //    ,content: dom;
    }, args);
}

function error(text, args) {
    args = getTipArgs(args);
    if (typeof text === 'string') {
        var dom = _getTipDom();
        dom._title.innerHTML = text;
        args.content = dom;
    } else {
        args.content = text;
    }
    return new Biang(args);
}

function info(text, args) {
    args = getTipArgs(args);
    if (!args.btns || args.btns.length <= 0) {
        args.btns = [{
            className: 'anfo-biang-btn-info',
            // icon: 'iconfont icon-radiobutton',
            title: 'OK'
        }];
    }

    if (typeof text === 'string') {
        var dom = _getTipDom();
        dom._title.innerHTML = text;
        args.content = dom;
    } else {
        args.content = text;
    }
    return new Biang(args);
}

var confirmArgs = {
    style: {
        width: '300px',
        height: '160px'
    }
};

//callback(boolean)
function confirm(text, callback, args) {

    confirmArgs.btns = [{
            title: 'NO',
            className: 'anfo-biang-btn-error',
            // icon: 'iconfont icon-roundclosefill',
            callback: function () {
                this.hide();
                if (typeof callback === 'function') {
                    callback.call(this, false);
                }
            }
    }, {
            title: 'YES',
            className: 'anfo-biang-btn-info',
            // icon: 'iconfont icon-radiobutton',
            callback: function () {
                //  this-> biang 
                this.hide();
                if (typeof callback === 'function') {
                    callback.call(this, true);
                }
            }
    }
    ];

    if (args === null || args === undefined) {
        args = {};
    }
    extend(true, args, confirmArgs);

    if (typeof text === 'string') {
        var dom = _getTipDom();
        dom._title.innerHTML = text;
        args.content = dom;
    } else {
        args.content = text;
    }
    return new Biang(args);
}

module.exports = {
    error,
    info,
    confirm,
    biang: function () {
        return new Biang(...arguments);
    }
};
