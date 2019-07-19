import {
  curry, flow, isEmpty, isUndefined, map, reduce, reject, set, trim,
} from 'lodash/fp'

const transform = reduce.convert({ cap: false })

// Return undefined if result is empty.
export const branch = curry((boolCheck, transformer, item) => {
  const res = transformer(item)
  return boolCheck(res) ? undefined : res
})
export const rmEmpty = branch(isEmpty)
export const rmTrue = curry(
  (transformer, item) => (transformer(item) ? undefined : item),
)

// Build up a new so fresh, so clean object.
export const reducer = clean => (result, value, key) => {
  const cleanValue = clean(value, clean)
  return isUndefined(cleanValue) ? result : set([key], cleanValue, result)
}

// Assume we have a fairly normal data object here?
export function cleanObject(obj, clean) {
  return transform(reducer(clean), undefined, obj)
}

export const cleanString = rmEmpty(trim)

export function cleanArray(items, clean) {
  const cleanItems = flow(
    map(x => clean(x, clean)),
    reject(isUndefined),
  )
  return rmEmpty(cleanItems, items)
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
//   [isString, cleanString],
// )
