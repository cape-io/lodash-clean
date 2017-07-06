import { isFunction } from 'lodash'

import { fieldTypeCleaners, buildGetValue, getValue } from './munge'

function getMungeFunc(mungeOption) {
  if (isFunction(mungeOption)) return mungeOption(fieldTypeCleaners)
  return buildGetValue(mungeOption)
}

export {
  fieldTypeCleaners, buildGetValue, getValue,
}
export function getCleaner(mungeOption) {
  const cleaner = getMungeFunc(mungeOption)
  return node => cleaner(node, cleaner)
}

export default getCleaner()
