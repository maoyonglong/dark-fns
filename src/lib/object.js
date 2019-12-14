import {
  isUnDef,
  isStrictObj,
  isArray,
  isFn,
  isTrue,
  isEmptyString
}  from './assert'
import { concatFn } from './function'

/**
 * get strict object's value by path
 * @param { object } obj strict object (json-like)
 * @param { string } path the key path like `a.b.c`, if the path is an empty string, return obj itself
 * @param { * } defaultVal if the path exists and the value is undefined, will return defaultVal
 * @return { * } return value/defaultVal, but if the path is not exists, return null
 */
export function getValByKeyPath (obj, path, defaultVal) {
  if (isEmptyString(path)) return obj
  var keys = path.split('.')
  for (var i = 0, len = keys.length; i < len; i++) { 
    if (isUnDef(obj[keys[i]])) {
      if (i !== len - 1) return null
      else if (!isUnDef(defaultVal)) {
        return defaultVal
      }
    } else {
      obj = obj[keys[i]]
    }
  }
  return obj
}

/**
 * set strict object's value by path
 * @param { object } obj strict object (json-like)
 * @param { string } path the key path like `a.b.c`
 * @param { * } defaultVal if the path exists and the value is undefined, will return defaultVal
 * @return { void | null } return null if the partial path (not whole path) is not found
 */
export function setValByKeyPath (obj, val, path) {
  var keys = path.split('.')
  for (var i = 0, len = keys.length; i < len-1; i++) {
    if (isUnDef(obj[keys[i]])) return null
    obj = obj[keys[i]]
  }
  obj[keys[i]] = val
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
export function mixin (target, source, opts = {}) {
  var key, val, targetVal
  var { isConcatFn, isConcatArr } = opts
  for (key in source) {
    val = source[key]
    targetVal = target[key]
    if (isStrictObj(targetVal) && isStrictObj(val)) {
      val = mixin(targetVal, val, opts)
    }
    if (isTrue(isConcatFn) && isFn(targetVal) && isFn(val)) {
      val = concatFn(targetVal, val)
    }
    if (isTrue(isConcatArr) && isArray(targetVal)) {
      val = targetVal.concat(val)
    }
    target[key] = val
  }
  return target
}

export default {
  getValByKeyPath,
  setValByKeyPath,
  mixin
}
