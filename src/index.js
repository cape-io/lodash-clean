import { isFunction } from 'lodash'

import mungeValue, { mungeWithDefaults } from './munge'

function getMungeFunc(mungeOption) {
  if (isFunction(mungeOption)) return mungeOption(mungeWithDefaults)
  return mungeValue(mungeOption)
}
export default function clean(node, mungeOption) {
  const mungeWith = getMungeFunc(mungeOption)
  return mungeWith(node, mungeWith)
}
