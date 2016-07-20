import { isArray, isFunction, map } from 'lodash'

import mungeValue from './munge'
import { cleanObject } from './clean'

function getMungeFunc(mungeOption) {
  if (isFunction(mungeOption)) return mungeOption(cleanObject)
  return mungeValue(mungeOption)
}
export default function cleanInit(node, mungeOption) {
  const mungeWith = getMungeFunc(mungeOption)
  if (isArray(node)) return map(node, item => mungeWith(item, mungeWith))
  return mungeWith(node, mungeWith)
}
