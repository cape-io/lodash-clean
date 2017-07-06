import { isEmpty, isUndefined, map, reject, set, transform, trim } from 'lodash'

// Assume we have a fairly normal data object here?
export function cleanObject(obj, clean) {
  // Build up a new so fresh, so clean object.
  function reducer(result, value, key) {
    const cleanValue = clean(value, clean)
    return isUndefined(cleanValue) ? result : set(result, key, cleanValue)
  }
  const item = transform(obj, reducer)
  return isEmpty(item) ? undefined : item
}

export function cleanString(string) {
  return trim(string) || undefined
}
export function cleanArray(items, clean) {
  const cleanItems = map(items, item => clean(item, clean))
  const remainingItems = reject(cleanItems, isUndefined)
  return isEmpty(remainingItems) ? undefined : remainingItems
}
