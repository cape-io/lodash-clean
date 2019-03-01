import { cleanString } from '../src/clean'

/* globals describe test expect */

describe('cleanString', () => {
  test('trim whitespace around string', () => {
    expect(cleanString(' a ')).toBe('a')
    expect(cleanString('b ')).toBe('b')
    expect(cleanString('  c')).toBe('c')
  })
  test('return undefined when empty', () => {
    expect(cleanString(' ')).toBe(undefined)
    expect(cleanString('')).toBe(undefined)
  })
})
