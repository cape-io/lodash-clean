import { forEach, isDate, isEmpty, isObject, isUndefined, map, reject, trim } from 'lodash'

export function cleanObject(obj, clean) {
  // Assume at this point we have a fairly normal data object?
  // Build up a new so fresh, so clean object.
  const item = {}
  function addValue(key, val) {
    if (!isUndefined(val)) item[key] = val
  }
  forEach(obj, (value, key) => {
    const cleanValue = clean(value, clean)
    if (isObject(cleanValue)) {
      // Do we really want to compact to check if empty?
      if (isDate(cleanValue)) return addValue(key, cleanValue)
      if (isEmpty(cleanValue)) return undefined
    }
    return addValue(key, cleanValue)
  })
  return item
}
export function cleanString(string) {
  const result = trim(string)
  if (result === '') return undefined
  return result
}
export function cleanArray(items, clean) {
  const cleanItems = map(items, item => clean(item, clean))
  const remainingItems = reject(cleanItems, isUndefined)
  if (isEmpty(remainingItems)) return undefined
  return remainingItems
}
