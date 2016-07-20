import test from 'tape'

import clean from '../src'

const before = {
  one: ' ',
  two: [ '', '', '', [ '' ] ],
  three: ' four ',
  descriptions: [ 'SAMPLE SET', '', '', { foo: '', bar: null } ],
  badNews: [ null, '', '', 'SAMPLE' ],
  five: [ 'f ', ' ', ' do' ],
  six: { thing: 'one', zap: null, un: undefined },
  func: foo => foo,
  width: '',
  height: 0,
  finish: false,
  start: true,
}
const after = {
  three: 'four',
  descriptions: [ 'SAMPLE SET', { bar: null } ],
  badNews: [ null, 'SAMPLE' ],
  five: [ 'f', 'do' ],
  six: { thing: 'one', zap: null },
  height: 0,
  finish: false,
  start: true,
}

test('clean', t => {
  t.deepEqual(clean(before), after, 'single object')
  t.deepEqual(clean([ before, before ]), [ after, after ], 'array of objects')
  t.equal(clean(' foo '), 'foo', 'string')
  t.end()
})
