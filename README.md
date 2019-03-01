# lodash-clean

Remove object properties that are undefined, functions, empty arrays, or empty strings.
Sometimes the API response is filled with tons properties that are empty strings and you want them gone.
Think of this as a mild form of `_.compact` for objects. Returns a new object or `undefined`.

## Install

```bash
$ npm i --save lodash-clean
```

## Usage

### Cleaning up an object

```javascript
import clean from 'lodash-clean'

const before = {
  one: ' ',
  two: [ '', '', '', [ '' ] ],
  three: ' four ',
  descriptions: [ 'SAMPLE SET', '', '', { foo: '', bar: null } ],
  badNews: [ null, '', '', 'SAMPLE' ],
  five: [ 'f ', ' ', ' do' ],
  six: { thing: 'one', zap: null, un: undefined },
  func: foo => foo,
  width: '',
  height: 0,
  finish: false,
  start: true,
  'nathan.drake@example.com': 'Issue #1',
}
const after = clean(before)
// {
//   three: 'four',
//   descriptions: [ 'SAMPLE SET', { bar: null } ],
//   badNews: [ null, 'SAMPLE' ],
//   five: [ 'f', 'do' ],
//   six: { thing: 'one', zap: null },
//   height: 0,
//   finish: false,
//   start: true,
//   'nathan.drake@example.com': 'Issue #1',
// }
```

### Options

You can customize the processing.

```javascript
import { buildCleaner } from 'lodash-clean'

const options = {
  isArray: cleanArray,
  isBoolean: _.identity,
  isDate: _.identity,
  isFunction: _.noop,
  isNull: _.identity,
  isPlainObject: cleanObject,
  isString: cleanString,
  isUndefined: _.noop,
}
const clean = buildCleaner(options)

// ...

const after = clean(before)
```

Object property values can be cleaned up depending on type. If you want to remove null values simply send `{ isNull: _.noop }` and they will be removed. Or if you want to keep function properties `{ isFunction: _.identity }`. Take a look at /src/clean.js for our default handling of strings and arrays. Returning **undefined** will result in the property being **removed**. Returning anything else will set the new value.

If you need more control or want to process additional types pass a function. Tt will be passed the default options object and will need return a function that decides how to cleanup the object. See `buildGetValue()` within /src/munge.js for reference.

## Changes

* **2.0** Will now remove empty objects. Internal rewrite and code cleanup.
