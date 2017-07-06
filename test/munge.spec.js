import test from 'tape'
import _ from 'lodash'
import { buildGetValue, getValue } from '../src/munge'

test('getValue', (t) => {
  t.equal(getValue(' a '), 'a', 'simple string trim.')
  t.equal(getValue(' '), undefined, 'empty string')
  t.equal(getValue(null), null, 'null')
  t.end()
})
test('buildGetValue', (t) => {
  const clean = buildGetValue({ isNull: _.noop })
  t.equal(clean(null), undefined, 'null noop')
  t.deepEqual(clean({ kai: null }, clean), undefined, 'obj with null')
  t.deepEqual(clean({ kai: null, foo: true }, clean), { foo: true }, 'still have obj')
  t.end()
})
