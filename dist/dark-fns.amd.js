define(function () { 'use strict';

  /**
   * concat functions
   * @param { ...function } ...fns variable length parameters
   * @return { function } return a new function formed by the combination of multiple functions
   * @example
   * function a () {
   *  console.log(1)
   * }
   * function b () {
   *  console.log(2)
   * }
   * var fn = concatFn(a, b)
   * fn() // => 1, 2
   */
  function concatFn() {
    var _fns = [].slice.call(arguments);

    return function () {
      var _this = this,
          _arguments = arguments;

      return _fns.map(function (fn) {
        return fn.apply(_this, _arguments);
      });
    };
  }
  /**
   * function currying
   * @example
   * function add (a, b) {
   *  return a + b
   * }
   * var fn = curry(1)
   * fn(2) // => 3
   * @param { function } fn the function to be fixed paramters
   * @param { ...* } ...args variable length parameters
   * @return { function } return a new function with fixed parameters
   */

  function curry(fn) {
    var _args = [].slice.call(arguments, 1);

    return function () {
      return fn.apply(this, _args.concat([].slice.call(arguments)));
    };
  }
  var fns = {
    concatFn: concatFn,
    curry: curry
  };

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function genTypeofFn(type) {
    return function (target) {
      return _typeof(target) === type;
    };
  }

  function genIsEqualFn(value) {
    return function (target) {
      return target === value;
    };
  }

  function genCbIsEqualFn(cb, value) {
    return function (target) {
      return cb(target) === value;
    };
  }
  /**
   * assert function type
   * @param { * } target
   * @return { boolean } return `typeof(target) === 'function'`
   * @example
   * isFn(function(){}) // => true
   * isFn([]) // => false
   */


  var isFn = genTypeofFn('function');
  /**
   * assert object type
   * @param { * } target
   * @return { boolean } return `typeof(target) === 'object'`
   * @example
   * isObj([]) // => true
   * isObj(null) // => true
   * isObj('') // => false
   */

  var isObj = genTypeofFn('object');
  /**
   * assert undefined type
   * @param { * } target
   * @return { boolean } return `typeof(target) === 'undefined'`
   * @example
   * var a = '1', b
   * isUndef(a) // => false
   * isUndef(b) // => true
   */

  var isUnDef = genTypeofFn('undefined');
  /**
   * assert number type
   * @param { * } target
   * @return { boolean } return `typeof(target) === 'number'`
   * @example
   * isNumber(1) // => true
   */

  var isNumber = genTypeofFn('number');
  /**
   * assert string type
   * @param { * } target
   * @return { boolean } return `typeof(target) === 'string'`
   * @example
   * isString('') // => true
   */

  var isString = genTypeofFn('string');
  /**
   * assert null
   * @param { * } target
   * @return { boolean } return `true` if the target is null
   * @example
   * isNull(null) // => true
   */

  var isNull = genIsEqualFn(null);
  /**
   * assert number zero
   * @param { * } target
   * @return { boolean } return `true` if the target is zero
   * @example
   * isZero(0) // => true
   */

  var isZero = genIsEqualFn(0);
  /**
   * assert false
   * @param { * } target
   * @return { boolean } return `true` if the target is false
   * @example
   * isFalse(false) // => true
   * isFalse(0) // => false
   */

  var isFalse = genIsEqualFn(false);
  /**
   * assert true
   * @param { * } target
   * @return { boolean } return `true` if the target is true
   * @example
   * isFalse(false) // => false
   * isFalse(true) // => true
   */

  var isTrue = genIsEqualFn(true);
  /**
   * assert is an empty string
   * @param { * } target
   * @return { boolean } return `true` if the target is an empty string
   * @example
   * isEmptyString('') // => true
   * isEmptyString('123') // => false
   * isEmptyString(0) // => false
   */

  var isEmptyString = genIsEqualFn('');
  /**
   * assert is an empty array
   * @param { * } target
   * @return { boolean } return `true` if the target is an empty array
   * @example
   * isEmptyArray([]) // => true
   * isEmptyArray([1, 2, 3]) // => false
   * isEmptyArray(0) // => false
   */

  var isEmptyArray = genCbIsEqualFn(JSON.stringify, '[]');
  /**
   * assert is an empty object
   * @param { * } target
   * @return { boolean } return `true` if the target is an empty object
   * @example
   * isEmptyArray({}}) // => true
   * isEmptyArray({a: 1}) // => false
   * isEmptyArray(0) // => false
   */

  var isEmptyObj = genCbIsEqualFn(JSON.stringify, '{}');
  /**
   * assert is array
   * @param { * } target
   * @return { boolean } return `true` if the target is an array
   * @example
   * isArray([]) // => true
   * isArray([1, 2, 3]) // => true
   * isArray(0) // => false
   */

  function isArray(target) {
    return isObj(target) && target instanceof Array;
  }
  /**
   * assert is an strict object (json-like)
   * @param { * } target
   * @return { boolean } return `true` if the target is an strict object
   * @example
   * isStrictObj([]) // => false
   * isStrictObj({}) // => true
   */

  function isStrictObj(target) {
    return isObj(target) && !isArray(target);
  }
  /**
   * assert is an empty string, empty array or empty object
   * @param { * } target
   * @return { boolean } return `true` if the target is an strict object
   * @example
   * isEmpty([]) // => true
   * isEmpty({}) // => true
   * isEmpty('') // => true
   */

  function isEmpty(target) {
    return isEmptyString(target) || isEmptyArray(target) || isEmptyObj(target);
  }
  /**
   * assert is falsy
   * @param { * } target
   * @return { boolean } return `true` if the target is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
   * @example
   * isEmpty([]) // => true
   * isEmpty({}) // => true
   * isEmpty('') // => true
   */

  function isFalsy(target) {
    return !!!target;
  }
  /**
   * assert is an instance of Class
   * @param { * } target 
   * @param { * } Class a class
   * @return { boolean } return `target instanceof Class`
   */

  function isInstanceOf(target, Class) {
    return target instanceof Class;
  }
  var assert = {
    isFn: isFn,
    isArray: isArray,
    isString: isString,
    isUnDef: isUnDef,
    isNull: isNull,
    isNumber: isNumber,
    isObj: isObj,
    isStrictObj: isStrictObj,
    isEmptyObj: isEmptyObj,
    isEmptyArray: isEmptyArray,
    isEmptyString: isEmptyString,
    isEmpty: isEmpty,
    isZero: isZero,
    isTrue: isTrue,
    isFalse: isFalse,
    isFalsy: isFalsy,
    isInstanceOf: isInstanceOf
  };

  /**
   * get strict object's value by path
   * @param { object } obj strict object (json-like)
   * @param { string } path the key path like `a.b.c`, if the path is an empty string, return obj itself
   * @param { * } defaultVal if the path exists and the value is undefined, will return defaultVal
   * @return { * } return value/defaultVal, but if the path is not exists, return null
   */

  function getValByKeyPath(obj, path, defaultVal) {
    if (isEmptyString(path)) return obj;
    var keys = path.split('.');

    for (var i = 0, len = keys.length; i < len; i++) {
      if (isUnDef(obj[keys[i]])) {
        if (i !== len - 1) return null;else if (!isUnDef(defaultVal)) {
          return defaultVal;
        }
      } else {
        obj = obj[keys[i]];
      }
    }

    return obj;
  }
  /**
   * set strict object's value by path
   * @param { object } obj strict object (json-like)
   * @param { string } path the key path like `a.b.c`
   * @param { * } defaultVal if the path exists and the value is undefined, will return defaultVal
   * @return { void | null } return null if the partial path (not whole path) is not found
   */

  function setValByKeyPath(obj, val, path) {
    var keys = path.split('.');

    for (var i = 0, len = keys.length; i < len - 1; i++) {
      if (isUnDef(obj[keys[i]])) return null;
      obj = obj[keys[i]];
    }

    obj[keys[i]] = val;
  }
  /**
   * mixin strict object
   * if isConcatFn is true, concat function
   * if isConcatArr is true, concat array
   * @param { object } target 
   * @param { object } source 
   * @param { object } opts { isConcatFn, isConcatArr }
   * @return { any } return the target
   */

  function mixin(target, source) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var key, val, targetVal;
    var isConcatFn = opts.isConcatFn,
        isConcatArr = opts.isConcatArr;

    for (key in source) {
      val = source[key];
      targetVal = target[key];

      if (isStrictObj(targetVal) && isStrictObj(val)) {
        val = mixin(targetVal, val, opts);
      }

      if (isTrue(isConcatFn) && isFn(targetVal) && isFn(val)) {
        val = concatFn(targetVal, val);
      }

      if (isTrue(isConcatArr) && isArray(targetVal)) {
        val = targetVal.concat(val);
      }

      target[key] = val;
    }

    return target;
  }
  var object = {
    getValByKeyPath: getValByKeyPath,
    setValByKeyPath: setValByKeyPath,
    mixin: mixin
  };

  var index = {
    assert: assert,
    fns: fns,
    object: object
  };

  return index;

});
