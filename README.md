# lodash-clean v1.0.1

Remove object properties that are undefined, functions, empty arrays, or empty strings.
Sometimes the API response is filled with tons properties that are empty strings and you want them gone.
Think of this as a mild form of `_.compact` for objects. Returns a new object.

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
// }
```

### Options

You can pass an object or function as a second argument.

```javascript
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
```
Object property values can be cleaned up depending on type. If you want to remove null values simply send `{ isNull: _.noop }` and they will be removed. Or if you want to keep function properties `{ isFunction: _.identity }`. Take a look at /src/clean.js for our default handling of strings and arrays. Returning **undefined** will result in the property being **removed**. Returning anything else will set the new value.

If you need more control and pass a function it will be passed the default options and will need return a function that decides how to cleanup the object. See `mungeValue()` within /src/munge.js for reference. Not sure why you'd need it, but it's there for you as an option.
