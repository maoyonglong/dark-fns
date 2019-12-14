import {
  curry,
  concatFn
} from '../src/lib/function'

function sum (a, b, c) {
  return a + b + c
}

test('curry', () => {
  let curryOneArgsFn = curry(sum, 1)
  let curryTwoArgsFn = curry(sum, 1, 2)
  let curryThreeArgsFn = curry(sum, 1, 2, 3)
  expect(curryOneArgsFn(2, 3)).toBe(6)
  expect(curryTwoArgsFn(3)).toBe(6)
  expect(curryThreeArgsFn()).toBe(6)
})

function sayHello (name) {
  return 'hello ' + name
}

function sayHi (name) {
  return 'hi ' + name
}

test('concatFn', () => {
  let concatSayFn = concatFn(sayHello, sayHi)
  expect(concatSayFn('John')).toStrictEqual([ 'hello John', 'hi John'])
})
