/**
 * @function isEmptyObject
 * @Description: 判断{}是否为空
 * @params: obj
 */
export const isEmptyObject = function (obj) {
    for (let k in obj) {
        return false;
    }
    return true;
};

/*
* 判断数据类型
* */
export const checkTools = {
    _typeOf(obj) {
        let toString = Object.prototype.toString;
        let map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        if (obj instanceof Element) {
            return 'element';
        }
        return map[toString.call(obj)];
    },
    isFunction(obj) {
        return this._typeOf(obj) === 'function';
    },
    isBoolean(obj) {
        return this._typeOf(obj) === 'boolean';
    },
    isNumber(obj) {
        return this._typeOf(obj) === 'number';
    },
    isString(obj) {
        return this._typeOf(obj) === 'string';
    },
    isDate(obj) {
        return this._typeOf(obj) === 'date';
    },
    isRegExp(obj) {
        return this._typeOf(obj) === 'regExp';
    },
    isArray(obj) {
        return this._typeOf(obj) === 'array';
    },
    isUndefined(obj) {
        return this._typeOf(obj) === 'undefined';
    },
    isNull(obj) {
        return this._typeOf(obj) === 'Null';
    },
    isObject(obj) {
        return this._typeOf(obj) === 'object';
    }
};
/**
 * @function deepClone
 * @Description: 用于数据的深拷贝
 * @params target：需要拷贝的对象
 */
export const deepClone = (target) => {
    let obj = null;
    if (checkTools.isArray(target)) {
        obj = [];
        target.forEach((item) => {
            obj.push(deepClone(item));
        });
    } else if (checkTools.isObject(target)) {
        obj = {};
        for (let k in target) {
            obj[k] = deepClone(target[k]);
        }
    } else {
        return target;
    }
    return obj;
};
