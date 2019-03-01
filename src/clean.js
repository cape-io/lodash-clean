import {
  isEmpty, isUndefined, map, reduce, reject, set, trim,
} from 'lodash/fp'

const transform = reduce.convert({ cap: false })

// Build up a new so fresh, so clean object.
export const reducer = clean => (result, value, key) => {
  const cleanValue = clean(value, clean)
  return isUndefined(cleanValue) ? result : set([key], cleanValue, result)
}

// Assume we have a fairly normal data object here?
export function cleanObject(obj, clean) {
  const item = transform(reducer(clean), undefined, obj)
  return isEmpty(item) ? undefined : item
}

export function cleanString(string) {
  return trim(string) || undefined
}
export function cleanArray(items, clean) {
  const cleanItems = map(item => clean(item, clean), items)
  const remainingItems = reject(isUndefined, cleanItems)
  return isEmpty(remainingItems) ? undefined : remainingItems
}

/**
 * [isWorthless description]
 * @param {any} value
 * @return {bool} Tells you if value is empty.
 * @example isWorthless({}) // => true
 * @example isWorthless([' ', null]) // => true
 * @example isWorthless(' ') // => true
 * @example isWorthless({ foo: null, bar: 0 }) // => true
 */
// export const isWorthless = overSome([
//   isNull, isFalse, isZero, isEmptyString, isEmptyArray, isEmptyObject,
// ])
// export const rejectWorthless = reject(isWorthless)


// export const cleanObject = omitBy(isWorthless)

// export const clean = condId(
//   [isArray, flow(compact, map(clean))], // eslint-disable-line no-use-before-define
//   [isPlainObject, cleanObject],
//   [isString, trim],
// )
