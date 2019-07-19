import _ from 'lodash/fp'
import clean, { buildCleaner } from '../src'

/* globals describe test expect */

const before = {
  one: ' ',
  two: ['', '', '', ['']],
  three: ' four ',
  descriptions: ['SAMPLE SET', '', '', { foo: '', bar: null }],
  badNews: [null, '', '', 'SAMPLE'],
  five: ['f ', ' ', ' do'],
  funk: null,
  six: { thing: 'one', zap: null, un: undefined },
  func: foo => foo,
  width: '',
  height: 0,
  finish: false,
  start: true,
  'nathan.drake@example.com': 'Issue #1',
  'foo.bar': '',
}
const after = {
  three: 'four',
  descriptions: ['SAMPLE SET', { bar: null }],
  badNews: [null, 'SAMPLE'],
  five: ['f', 'do'],
  funk: null,
  six: { thing: 'one', zap: null },
  height: 0,
  finish: false,
  start: true,
  'nathan.drake@example.com': 'Issue #1',
}

describe('clean', () => {
  test('trim whitespace around string', () => {
    expect(clean(' a ')).toBe('a')
  })
  test('compact array', () => {
    expect(clean(['', '', ''])).toEqual(undefined)
  })
  test('clean up single object', () => {
    expect(clean(before)).toEqual(after)
  })
  test('clean up array of objects', () => {
    expect(clean([before, before])).toEqual([after, after])
  })
})

const after2 = {
  three: 'four',
  descriptions: ['SAMPLE SET'],
  badNews: ['SAMPLE'],
  five: ['f', 'do'],
  six: { thing: 'one' },
  height: 0,
  finish: false,
  start: true,
  'nathan.drake@example.com': 'Issue #1',
}

describe('buildCleaner', () => {
  const cleaner = buildCleaner({ isNull: _.noop })
  test('trim whitespace around string', () => {
    expect(cleaner(' a ')).toBe('a')
  })
  test('custom null handler removes null values', () => {
    expect(cleaner(null)).toBe(undefined)
    expect(cleaner({ kai: null })).toBe(undefined)
    expect(cleaner({ foo: null, bar: 1 })).toEqual({ bar: 1 })
    expect(cleaner(before)).toEqual(after2)
    expect(cleaner([before, before])).toEqual([after2, after2])
  })
})
