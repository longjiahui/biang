var utils = {
    stringToDom(text) {
        var dom = document.createElement('div');
        dom.innerHTML = text;
        return dom.childNodes ? dom.childNodes[0] : null;
    },

    getId(id) {
        return 'anfo' + id;
    },

    hasClass(elements, cName) {
        //(\\s|^)这个正则表示开始或空格字符开头
        //(\\s|$)这个表示结尾或空格字符开头
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    },

    addClass(elements, cName) {
        if (!this.hasClass(elements, cName)) {
            elements.className += " " + cName;
        };
    },

    removeClass(elements, cName) {
        if (this.hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        };
    }
};

export default utils;
