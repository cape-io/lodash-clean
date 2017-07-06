import test from 'tape'

import { cleanString } from '../src/clean'

test('cleanString', (t) => {
  t.equal(cleanString(' a '), 'a', 'simple trim')
  t.equal(cleanString(' '), undefined, 'empty string')
  t.end()
})
