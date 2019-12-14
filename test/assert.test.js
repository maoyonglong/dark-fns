import {
  isTrue,
  isArray
} from '../src/lib/assert'

test('isTrue', () => {
  expect(isTrue(true)).toEqual(true)
})

test('isArray', () => {
  expect(isArray([])).toEqual(true)
  expect(isArray({})).toEqual(false)
})

