import test from 'tape'
import _ from 'lodash'
import clean, { buildCleaner } from '../src'

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
}

test('clean', (t) => {
  t.equal(clean(' a '), 'a', 'simple string trim.')
  t.deepEqual(clean(before), after, 'single object')
  t.deepEqual(clean([before, before]), [after, after], 'array of objects')
  t.equal(clean(' foo '), 'foo', 'string')
  t.end()
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
}

test('buildCleaner', (t) => {
  const cleaner = buildCleaner({ isNull: _.noop })
  t.equal(cleaner(' a '), 'a', 'simple string trim.')
  t.equal(cleaner(null), undefined, 'null gone')
  t.equal(cleaner({ foo: null }), undefined, 'null prop only returns undefined')
  t.deepEqual(cleaner({ foo: null, bar: 1 }), { bar: 1 }, 'small obj')
  const res = cleaner(before)
  t.deepEqual(res, after2, 'single object')
  t.deepEqual(cleaner([before, before]), [after2, after2], 'array of objects')
  t.end()
})
