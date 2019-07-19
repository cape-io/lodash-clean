import { isFunction } from 'lodash/fp'
import { fieldTypeCleaners, buildGetValue, getValue } from './munge'

export * from './clean'

function getMungeFunc(mungeOption) {
  if (isFunction(mungeOption)) return mungeOption(fieldTypeCleaners)
  return buildGetValue(mungeOption)
}

export {
  fieldTypeCleaners, buildGetValue, getValue,
}
export function buildCleaner(mungeOption) {
  const cleaner = getMungeFunc(mungeOption)
  return node => cleaner(node, cleaner)
}
export const cleaner = obj => getValue(obj, getValue)

export default cleaner
