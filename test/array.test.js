import {
  series,
  ariSeries,
  range,
  defAssign,
  deepDefAssign
} from '../src/lib/array'

test('series', () => {
  expect(series(5, idx => idx)).toEqual([0, 1, 2, 3, 4])
  expect(series(1, 5, idx => idx)).toEqual([1, 1, 2, 3, 4])
  expect(series(5, (idx, arr, accumulator) => accumulator + 1)).toEqual([0, 1, 2, 4, 8])
})

test('ariSeries', () => {
  expect(ariSeries(5)).toEqual([0, 1, 2, 3, 4])
  expect(ariSeries(4, 7)).toEqual([4, 5, 6, 7, 8, 9, 10])
  expect(ariSeries(1, 5, 2)).toEqual([1, 3, 5, 7, 9])
})

test('range', () => {
  expect(range(5)).toEqual([0, 1, 2, 3, 4])
  expect(range(5, 10)).toEqual([5, 6, 7, 8, 9])
  expect(range(2, 10, 3)).toEqual([2, 5, 8])
})

test('defAssign', () => {
  expect(defAssign([], [1, 2])).toEqual([1, 2])
  expect(defAssign([1, 2], [])).toEqual([1, 2])
  expect(defAssign([undefined, 2], [0, 1])).toEqual([0, 1])
  expect(defAssign([0, 1], [undefined, 2])).toEqual([0, 2])
})

test('deefDefAssign', () => {
  expect(deepDefAssign([0, [1, 2]], [0, [3]])).toStrictEqual([0, [3, 2]])
  expect(deepDefAssign([0, [1, 2]], [0, [undefined, 3]])).toStrictEqual([0, [1, 3]])
  expect(deepDefAssign([0, [1, 2]], [0, 1])).toEqual([0, 1])
})