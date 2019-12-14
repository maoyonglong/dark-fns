import {
  mixin,
  setValByKeyPath,
  getValByKeyPath
} from '../src/lib/object'

function genObjs () {
  return [
    {
      a: {
        c: 1,
        d: [1]
      },
      b: function () {
        return 1
      }
    },
    {
      a: {
        c: 2,
        d: [2]
      },
      b: function () {
        return 2
      }
    }
  ]
}

test('mixin:noConcat', () => {
  let [ obj1, obj2 ] = genObjs()
  let mixinWithoutConcat = mixin(obj1, obj2)
  expect(mixinWithoutConcat.a).toStrictEqual(obj2.a)
  expect(mixinWithoutConcat.b).toEqual(obj2.b)
})

test('mixin:concat', () => {
  let [ obj1, obj2 ] = genObjs()
  let mixinWithConcat = mixin(obj1, obj2, { isConcatFn: true, isConcatArr: true })
  expect(mixinWithConcat.a.c).toEqual(2)
  expect(mixinWithConcat.a.d).toEqual([1, 2])
  expect(mixinWithConcat.b()).toEqual([1, 2])
})

test('setKeyByPath', () => {
  let obj1 = genObjs()[0]
  setValByKeyPath(obj1, 2, 'a.c')
  expect(obj1.a.c).toEqual(2)
  setValByKeyPath(obj1, 3, 'd')
  expect(obj1.d).toEqual(3)
  let result = setValByKeyPath(obj1, 3, 'd.c.a')
  expect(result).toEqual(null)
})

test('getKeyByPath', () => {
  let obj1 = genObjs()[0]
  let val = getValByKeyPath(obj1, 'a.c')
  expect(val).toEqual(1)
  val = getValByKeyPath(obj1, 'e', 'defaultE')
  expect(val).toEqual('defaultE')
  val = getValByKeyPath(obj1, '')
  expect(val).toEqual(obj1)
})