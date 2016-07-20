import {
  compact, defaults, forEach, identity,
  isArray, isBool, isDate, isEmpty, isNull, isObject, isString, isUndefined,
  map, trim,
} from 'lodash'

export default function clean(node, mungeWithOptions = {}) {
  if (isUndefined(node)) return undefined
  const mungeWithDefaults = {
    array: compact,
    bool: identity,
    date: identity,
    null: identity,
    object: clean,
    string: trim,
  }
  const mungeWith = defaults(mungeWithOptions, mungeWithDefaults)
  if (isArray(node)) return map(node, item => clean(item, mungeWithOptions))
  if (isBool(node)) return mungeWith.bool(node)
  if (isNull(node)) return mungeWith.null(node)
  if (isString(node)) return mungeWith.string(node)
  if (!isObject(node)) return node
  if (isDate(node)) return mungeWith.date(node)
  // Assume at this point we have a fairly normal data object?
  // Build up a new so fresh, so clean object.
  const item = {}
  function addValue(key, val) {
    if (!isUndefined(val)) item[key] = val
  }
  forEach(item, (value, key) => {
    const cleanValue = clean(value, mungeWithOptions)
    if (isObject) {
      // Do we really want to compact to check if empty?
      if (isArray(cleanValue) && isEmpty(compact(cleanValue))) return undefined
      if (isDate(cleanValue)) return addValue(key, cleanValue)
      if (isEmpty(cleanValue)) return undefined
    }
    return addValue(key, cleanValue)
  })
  return item
}
