function genTypeofFn (type) {
  return function (target) {
    return typeof target === type
  }
}
function genIsEqualFn (value) {
  return function (target) {
    return target === value
  }
}
function genCbIsEqualFn (cb, value) {
  return function (target) {
    return cb(target) === value
  }
}
/**
 * assert function type
 * @param { * } target
 * @return { boolean } return `typeof(target) === 'function'`
 * @example
 * isFn(function(){}) // => true
 * isFn([]) // => false
 */
export var isFn = genTypeofFn('function')
/**
 * assert object type
 * @param { * } target
 * @return { boolean } return `typeof(target) === 'object'`
 * @example
 * isObj([]) // => true
 * isObj(null) // => true
 * isObj('') // => false
 */
export var isObj = genTypeofFn('object')
/**
 * assert undefined type
 * @param { * } target
 * @return { boolean } return `typeof(target) === 'undefined'`
 * @example
 * var a = '1', b
 * isUndef(a) // => false
 * isUndef(b) // => true
 */
export var isUnDef = genTypeofFn('undefined')
/**
 * assert number type
 * @param { * } target
 * @return { boolean } return `typeof(target) === 'number'`
 * @example
 * isNumber(1) // => true
 */
export var isNumber = genTypeofFn('number')
/**
 * assert string type
 * @param { * } target
 * @return { boolean } return `typeof(target) === 'string'`
 * @example
 * isString('') // => true
 */
export var isString = genTypeofFn('string')
/**
 * assert null
 * @param { * } target
 * @return { boolean } return `true` if the target is null
 * @example
 * isNull(null) // => true
 */
export var isNull = genIsEqualFn(null)
/**
 * assert number zero
 * @param { * } target
 * @return { boolean } return `true` if the target is zero
 * @example
 * isZero(0) // => true
 */
export var isZero = genIsEqualFn(0)
/**
 * assert false
 * @param { * } target
 * @return { boolean } return `true` if the target is false
 * @example
 * isFalse(false) // => true
 * isFalse(0) // => false
 */
export var isFalse = genIsEqualFn(false)
/**
 * assert true
 * @param { * } target
 * @return { boolean } return `true` if the target is true
 * @example
 * isFalse(false) // => false
 * isFalse(true) // => true
 */
export var isTrue = genIsEqualFn(true)
/**
 * assert is an empty string
 * @param { * } target
 * @return { boolean } return `true` if the target is an empty string
 * @example
 * isEmptyString('') // => true
 * isEmptyString('123') // => false
 * isEmptyString(0) // => false
 */
export var isEmptyString = genIsEqualFn('')
/**
 * assert is an empty array
 * @param { * } target
 * @return { boolean } return `true` if the target is an empty array
 * @example
 * isEmptyArray([]) // => true
 * isEmptyArray([1, 2, 3]) // => false
 * isEmptyArray(0) // => false
 */
export var isEmptyArray = genCbIsEqualFn(JSON.stringify, '[]')
/**
 * assert is an empty object
 * @param { * } target
 * @return { boolean } return `true` if the target is an empty object
 * @example
 * isEmptyArray({}}) // => true
 * isEmptyArray({a: 1}) // => false
 * isEmptyArray(0) // => false
 */
export var isEmptyObj = genCbIsEqualFn(JSON.stringify, '{}')
/**
 * assert is array
 * @param { * } target
 * @return { boolean } return `true` if the target is an array
 * @example
 * isArray([]) // => true
 * isArray([1, 2, 3]) // => true
 * isArray(0) // => false
 */
export function isArray (target) {
  return isObj(target) && target instanceof Array
}
/**
 * assert is an strict object (json-like)
 * @param { * } target
 * @return { boolean } return `true` if the target is an strict object
 * @example
 * isStrictObj([]) // => false
 * isStrictObj({}) // => true
 */
export function isStrictObj (target) {
  return isObj(target) && !isArray(target)
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
export function isEmpty (target) {
  return isEmptyString(target) || isEmptyArray(target) || isEmptyObj(target)
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
export function isFalsy (target) {
  return !!!target
}
/**
 * assert is an instance of Class
 * @param { * } target 
 * @param { * } Class a class
 * @return { boolean } return `target instanceof Class`
 */
export function isInstanceOf (target, Class) {
  return target instanceof Class
}

export default {
  isFn,
  isArray,
  isString,
  isUnDef,
  isNull,
  isNumber,
  isObj,
  isStrictObj,
  isEmptyObj,
  isEmptyArray,
  isEmptyString,
  isEmpty,
  isZero,
  isTrue,
  isFalse,
  isFalsy,
  isInstanceOf
}
