/**
 * Created by hxghxg527 on 15/11/29.
 */
'use strict';

function Base() {
    this.constructor = 'Base';
    //create a array to save elements/nodes.
    this.allElements = [];
}

Base.prototype.getId = function (id) {
    this.allElements = [];
    this.allElements.push(document.getElementById(id));

    return this;
};

Base.prototype.getClassName = function (className) {
    var tags = document.getElementsByTagName('*'),
        className = className.trim();

    this.allElements = [];
    for (var i = 0; i < tags.length; i++) {
        var classNames = tags[i].className.trim().split(' ');
        if (classNames.length > 0) {
            for (var j = 0; j < classNames.length; j++) {
                var tempClassName = classNames[j].trim();
                if (className == tempClassName) {
                    this.allElements.push(tags[i]);
                }
            }
        }
    }

    return this;
};

Base.prototype.getTagName = function (tagName) {
    this.allElements = [];
    if (!tagName || tagName.trim() == '') {
        var tags = document.getElementsByTagName('*');
    } else {
        var tags = document.getElementsByTagName(tagName);
    }

    for (var i = 0; i < tags.length; i++) {
        this.allElements.push(tags[i]);
    }

    return this;
};

Base.prototype.getName = function (name) {
    this.allElements = [];
    if (!name || name.trim() == '') {
        var tags = document.getElementsByName('*');
    } else {
        var tags = document.getElementsByName(name);
    }

    for (var i = 0; i < tags.length; i++) {
        this.allElements.push(tags[i]);
    }

    return this;
};

Base.prototype.getElement = function (idx) {
    if (typeof idx == 'number' && idx > -1 && idx < this.allElements.length) {
        var element = this.allElements[idx];
        this.allElements = [];
        this.allElements.push(element);
    } else {
        throw new Error('arguments error.');
    }

    return this;
};

Base.prototype.css = function (attr, value) {
    var attr = attr,
        value = value;

    if (arguments.length == 0) {
        return this.allElements[0].style;
    } else if (arguments.length == 1) {
        if (typeof attr == 'string') {
            if (attr.trim() != '') {
                return this.getStyle(this.allElements[0], attr);
            } else {
                return this.allElements[0].style;
            }
        } else if (this.isJson(attr)) {
            for (var i = 0; i < this.allElements.length; i++) {
                for (var key in attr) {
                    this.allElements[i].style[key] = attr[key];
                }
            }
        } else {
            throw new Error('arguments error.');
        }
    } else if (arguments.length == 2) {
        if (typeof attr == 'string' && typeof value == 'string') {
            if (attr.trim() != '') {
                for (var i = 0; i < this.allElements.length; i++) {
                    this.allElements[i].style[attr] = value;
                }
            } else {
                throw new Error('arguments error.');
            }
        } else {
            throw new Error('arguments error.');
        }
    } else {
        throw new Error('arguments error.');
    }

    return this;
};

Base.prototype.html = function (innerHtml) {
    if (arguments.length == 0) return this.allElements[0].innerHTML;
    for (var i = 0; i < this.allElements.length; i++) {
        this.allElements[i].innerHTML = innerHtml;
    }

    return this;
};

Base.prototype.click = function (callbackFn) {
    var self = this;
    for (var i = 0; i < this.allElements.length; i++) {
        var idx = i;
        if (typeof window.addEventListener != 'undefined') {
            (function (idx) {
                self.allElements[idx].addEventListener('click', function (evt) {
                    callbackFn.call(self, evt || window.event, idx);
                }, false);
            })(idx);
        } else {
            (function (idx) {
                self.allElements[idx].attachEvent('click', function (evt) {
                    callbackFn.call(self, evt || window.event, idx);
                });
            })(idx);
        }
    }

    return this;
};

Base.prototype.getStyle = function (element, attr) {
    if (typeof window.getComputedStyle != 'undefined') { //W3C
        return window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undefined') { //IE
        return element.currentStyle[attr];
    }
};

Base.prototype.isJson = function (obj) {
    var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isJson;
};

Base.prototype.setAlias = function (alias) {
    window[alias] = window.base;

    return this;
};

window.base = function () {
    if (arguments.length == 0) return new Base();
    if (typeof arguments[0] == 'object') {

    }
};
if (!window.$) window.$ = window.base;

