import _ from 'lodash'
import { buildGetValue, getValue } from '../src/munge'

/* globals describe test expect */

describe('getValue', () => {
  test('trim whitespace around string or undefined', () => {
    expect(getValue(' a ')).toBe('a')
    expect(getValue(' ')).toBe(undefined)
  })
  test('keep null value', () => {
    expect(getValue(null)).toBe(null)
  })
})

describe('buildGetValue', () => {
  const clean = buildGetValue({ isNull: _.noop })
  test('custom null handler', () => {
    expect(clean(null)).toBe(undefined)
    expect(clean({ kai: null }, clean)).toBe(undefined)
    expect(clean({ kai: null, foo: true }, clean)).toEqual({ foo: true })
  })
})

//
// describe('rejectWorthless', () => {
//   test('remove junk from array', () => {
//     expect(rejectWorthless([])).toEqual([])
//     expect(rejectWorthless(['', null])).toEqual([])
//     expect(rejectWorthless([false, true, {}, [null]])).toEqual([true])
//   })
// })
// describe('isEmptyString', () => {
//   test('empty string after trim true', () => {
//     expect(isEmptyString('')).toBe(true)
//     expect(isEmptyString(' ')).toBe(true)
//   })
// })
// describe('isEmptyArray', () => {
//   test('empty strings, null, bools', () => {
//     expect(isEmptyArray([])).toBe(true)
//     expect(isEmptyArray([' ', null, false, ''])).toBe(true)
//     expect(isEmptyArray([false, 0, null, ' '])).toBe(true)
//     expect(isEmptyArray([true])).toBe(false)
//   })
// })
// describe('isWorthless', () => {
//   test('bools', () => {
//     expect(isWorthless(false)).toBe(true)
//     expect(isWorthless(true)).toBe(false)
//   })
//   test('numbers have value', () => {
//     expect(isWorthless(0)).toBe(true)
//     expect(isWorthless(0.1)).toBe(false)
//   })
//   test('objs', () => {
//     expect(isWorthless({})).toBe(true)
//     expect(isWorthless({ foo: null, bar: 0 })).toBe(true)
//   })
//   test('arrays', () => {
//     expect(isWorthless([{}, null, []])).toBe(true)
//     expect(isWorthless([{ foo: null, bar: 0 }])).toBe(true)
//   })
// })
