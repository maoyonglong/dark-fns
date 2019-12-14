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


export default {
  concatFn,
  curry
}
