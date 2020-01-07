/**
 * @module darkFns/array
 */

import {
  isArray,
  isUnDef,
  isFn
} from './assert'

// indefiniteArgs require defAssign
/**
 * mixin two array and ignore undefined
 * @method
 * @example
 * defAssign([], [1, 2]) // [1, 2]
 * defAssign([undefined, 3], [1, undefined]]) // [1, 3]
 * @param { Array } target 
 * @param { Array } source 
 */
export function defAssign (target, source) {
  source.forEach((item, idx) => {
    target[idx] = isUnDef(item) ? target[idx] : item
  })
  return target
}

import {
  indefiniteArgs
} from './function'

/**
 * new a array using function
 * @method
 * @example
 * series(5, idx => idx) // [0, 1, 2, 3, 4]
 * @param { number } [start=0] the start element
 * @param { number } end the index of end but exclude and also is the length of array
 * @param { function } cb the callback with arguments `(idx, array, accumulator)`
 * idx is the index of each element
 * array is the array
 * accumulator is the sum of the previous elements
 * 
 * the number of parameters is indefinite:
 * series(start, end, function)
 * series(end, function)
 */
export function series () {
  let arr = [], accumulator = 0, idx = 1
  let [start, end, cb] = indefiniteArgs({
    base: [0],
    args: [
      undefined,
      args => {
        accumulator = args[0].call(0, 0, arr, 0)
        return [undefined, accumulator, args[0]]
      },
      args => [undefined].concat(args)
    ]
  }).apply(null, arguments)
  arr.push(start)
  while (idx < end) {
    let item = cb.call(arr, idx, arr, accumulator) 
    accumulator += item
    arr.push(item)
    idx++
  }
  return arr
}

/**
 * generating the sequence of equal difference
 * @method
 * @example
 * ariSeries(5) // [0, 1, 2, 3, 4]
 * ariSeries(1, 3) // [1, 2, 3]
 * ariSeries(1, 3, 2) // [1, 3, 5]
 * @param { number } [start=0] the start element
 * @param { number } end the index of end but exclude and also is the length of array
 * @param { number } step the difference
 */
export function ariSeries () {
  let [ start, end, step ] = indefiniteArgs({
    base: [0, undefined, 1],
    args: [
      undefined,
      args => [undefined, args[0]]
    ]
  }).apply(null, arguments)
  return series(start, end, function (idx, arr) {
    return arr[idx-1] + step
  })
}

/**
 * like the function `range` of [python](https://docs.python.org/3/library/stdtypes.html?highlight=range#range)
 * generating an array in the range `[start, end)` with the equal difference `step`
 * @method
 * @example
 * range(5) // [0, 1, 2]
 * range(1, 5) // [1, 2, 3, 4, 5]
 * range(1, 9, 3) // [1, 4, 7]
 * @param { number } [start=0]
 * @param { number } end
 * @param { number } [step=1]
 */
export function range () {
  let [ start, end, step ] = indefiniteArgs({
    base: [0, undefined, 1],
    args: [
      undefined,
      args => [undefined, args[0]]
    ]
  }).apply(null, arguments)
  let arr = []
  while (start < end) {
    arr.push(start)
    start += step
  }
  return arr
}

/**
 * defAssign deeply, refer to defAssign
 */
export function deepDefAssign (target, source) {
  source.forEach((item, idx) => {
    if (isArray(item) && isArray(target[idx])) {
      target[idx] = deepDefAssign(target[idx], item)
    } else {
      target[idx] = isUnDef(item) ? target[idx] : item
    }
  })
  return target
}

/**
 * fill array by value, refer to Array.prototype.fill
 * @param { array } arr 
 * @param { * } value if value is function, it will fill by the result of value.call(arr, start, arr)
 * @param { number } start the index of start
 * @param { number } end  the index of end
 */
export function fill (arr, value, start = 0, end = arr.length) {
  if (isFn(value)) {
    while (start < end) {
      arr[start] = value.call(arr, start, arr)
      start++
    }
    return arr
  }
  return [].fill.apply(arr, [].slice.call(arguments, 1))
}

export default {
  series,
  ariSeries,
  range,
  defAssign,
  deepDefAssign,
  fill
}
