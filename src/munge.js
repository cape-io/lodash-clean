import {
  defaults, identity,
  isArray, isBoolean, isDate, isFunction, isNull, isObject, isString, isUndefined,
  noop,
} from 'lodash'

import { cleanArray, cleanObject, cleanString } from './clean'

export const mungeWithDefaults = {
  isArray: cleanArray,
  isBoolean: identity,
  isDate: identity,
  isFunction: noop,
  isNull: identity,
  isPlainObject: cleanObject,
  isString: cleanString,
  isUndefined: noop,
}

export default function mungeValue(mungeWithOptions = {}) {
  const mungeWith = defaults(mungeWithOptions, mungeWithDefaults)
  function getValue(node, clean) {
    if (isUndefined(node)) return mungeWith.isUndefined(node)
    if (isFunction(node)) return mungeWith.isFunction(node)
    if (isBoolean(node)) return mungeWith.isBoolean(node)
    if (isNull(node)) return mungeWith.isNull(node)
    if (isString(node)) return mungeWith.isString(node)
    if (isDate(node)) return mungeWith.isDate(node)
    if (isArray(node)) return mungeWith.isArray(node, clean)
    if (!isObject(node)) return node
    return mungeWith.isPlainObject(node, clean)
  }
  return getValue
}
