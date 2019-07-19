import {
  compact, defaults, flow, isArray, isBoolean, isDate, identity, isEmpty, isFunction,
  isNull, isNumber, isPlainObject, isString, isUndefined, noop, overEvery, overSome,
  pickBy, reject, trim,
} from 'lodash/fp'

import { cleanArray, cleanObject, cleanString } from './clean'

export const isEmptyString = overEvery([isString, flow(trim, isEmpty)])
export const isEmptyObject = overEvery([isPlainObject, flow(pickBy(identity), isEmpty)])
export const isEmptyArr = overEvery([isArray, flow(compact, isEmpty)])
export const rejectEmpty = reject(overSome([isEmptyString, isEmptyObject, isEmptyArr]))
// Only does one level of recursion. :-(
export const isEmptyArray = overEvery([
  isArray, flow(compact, rejectEmpty, isEmpty),
])

export const fieldTypeCleaners = {
  isArray: cleanArray,
  isBoolean: identity,
  isDate: identity,
  isFunction: noop,
  isNull: identity,
  isNumber: identity,
  isPlainObject: cleanObject,
  isString: cleanString,
  isUndefined: noop,
}

export function buildGetValue(mungeWithOptions = {}) {
  const mungeWith = defaults(fieldTypeCleaners, mungeWithOptions)
  return function getVal(node, clean) {
    if (isArray(node)) return mungeWith.isArray(node, clean)
    if (isPlainObject(node)) return mungeWith.isPlainObject(node, clean)
    if (isUndefined(node)) return mungeWith.isUndefined(node)
    if (isFunction(node)) return mungeWith.isFunction(node)
    if (isBoolean(node)) return mungeWith.isBoolean(node)
    if (isNull(node)) return mungeWith.isNull(node)
    if (isNumber(node)) return mungeWith.isNumber(node)
    if (isString(node)) return mungeWith.isString(node)
    if (isDate(node)) return mungeWith.isDate(node)
    return node
  }
}
export const getValue = buildGetValue()
