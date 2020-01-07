# description
My function library without operation on dom

# use
```js
var darkFns = require('dark-fns')
console.log(darkFns)
// {
//   assert,
//   fns,
//   object,
//   array,
//   ...
// }
```

# API
## assert methods
```ts
function isFn(target: any): boolean;
function isArray(target: any): boolean;
function isString(target: any): boolean;
function isUnDef(target: any): boolean;
function isNull(target: any): boolean;
function isNumber(target: any): boolean;
function isObj(target: any): boolean;
function isStrictObj(target: any): boolean;
function isEmptyObj(target: any): boolean;
function isEmptyArray(target: any): boolean;
function isEmptyString(target: any): boolean;
function isEmpty(target: any): boolean;
function isZero(target: any): boolean;
function isTrue(target: any): boolean;
function isFalse(target: any): boolean;
function isFalsy(target: any): boolean;
function isInstanceOf(target: any, Class: any): boolean;
```

## object methods
```ts
/**
 * get strict object's value by path
 * @param { object } obj strict object (json-like)
 * @param { string } path the key path like `a.b.c`, if the path is an empty string, return obj itself
 * @param { * } defaultVal if the path exists and the value is undefined, will return defaultVal
 * @return { * } return value/defaultVal, but if the path is not exists, return null
 * 
 */
function getValByKeyPath(obj: any, path: string, defaultVal: any): any;
/**
 * set strict object's value by path
 * @param { object } obj strict object (json-like)
 * @param { string } path the key path like `a.b.c`
 * @param { * } defaultVal if the path exists and the value is undefined, will return defaultVal
 * @return { void | null } return null if the partial path (not whole path) is not found
 */
function setValByKeyPath(obj: any, val: any, path: string): boolean;
/**
 * mixin strict object
 * if isConcatFn is true, concat function
 * if isConcatArr is true, concat array
 * @param { object } target 
 * @param { object } source 
 * @param { object } opts { isConcatFn, isConcatArr }
 * @return return the target
 */
function mixin (target: object, source: object, opts: object = {}): object;
```

## fns methods
```ts
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
function concatFn (...fns: Function[]): Function
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
function curry (fn: Function): Function
```

[More Information](https://maoyonglong.github.io/dark-fns)
