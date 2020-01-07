/**
 * @module darkFns/function
 */

import {
  defAssign
} from './array'

import {
  isUnDef, isFn
} from './assert'

/**
 * concat functions
 * @method
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
export function concatFn () {
  var _fns = [].slice.call(arguments)
  return function () {
    return _fns.map(fn => {
      return fn.apply(this, arguments)
    })
  }
}

/**
 * function currying
 * @method
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
export function curry (fn) {
  var _args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(this, _args.concat([].slice.call(arguments)))
  }
}

/**
 * generating a function to assign indefinite arguments
 * @method
 * @example
 * const fn = indefiniteArgs({
 *  base: [0, 1] // default arguments
 *  args: [
 *    // if recieves zero parameter
 *    // the undefined is the same as `args => args`
 *    undefined,
 *    // if recieves one parameter
 *    // args is an array copy from arguments, 
 *    // the result of this function is the result of defAssign(base, [undefined].concat(args))
 *    args => [undefined].concat(args),
 *    // if recieves two parameter,
 *    // the result of this function is the result of defAssign(base, [0, 1])
 *    [0, 1]
 *  ]
 * })
 * let [arg0, arg1] = fn() // arg0: 0, arg1: 1
 * let [arg0, arg1] = fn(1) // arg0: 0, arg1: 1
 * let [arg0, arg1, arg2] = fn(0, 0, 0) // arg0: 0, arg1: 1, arg2: undefined
 * let [arg0, arg1, arg2, arg3] = fn(1, 2, 3, 4) // arg0: 0, arg1: 1, arg2: 2, arg3: 3, arg4: 4
 * 
 * // is equal to:
 * const { defAssign } = require('dark-fns').array
 * 
 * function fn () {
 *  let base = [0, 1]
 *  if (len === 1) {
 *    return defAssign(base, [undefined].concat(args))
 *  } else if (len === 2) {
 *    return defAssign(base, [0, 1])
 *  } 
 *  // the `args.undefined` of conf
 *  else {
 *    return defAssign(base, [0, 1])
 *  }
 * }
 * 
 * @param { object } conf
 * @return { function }
 */
export function indefiniteArgs (conf) {
  let _baseArgs = conf.base
  let _argsConf = conf.args
  return function () {
    let len = arguments.length
    let conf = _argsConf[len]
    let arr = isUnDef(conf) ?
      [].slice.call(arguments) :
      (
        isFn(conf) ?
        conf([].slice.call(arguments)) :
        conf
      )
    return defAssign(_baseArgs, arr)
  }
}


export default {
  concatFn,
  curry,
  indefiniteArgs
}
