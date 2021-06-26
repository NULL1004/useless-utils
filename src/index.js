const toString = (data) => `${data}`

const toJson = (data) => JSON.stringify(data)

const parseJson = (json) => JSON.parse(json)

const toPrototypeStr = (data) => Object.prototype.toString.call(data)

const isEqual = (source, target) => source === target

const isOneOfEqual = (range = [], data) => range.includes(data)

const isTypeEqual = (source, target) =>
  isEqual(toPrototypeStr(source), toPrototypeStr(target))

const isFunction = (data) => data instanceof Function

const isArrayOrObject = (data) => data instanceof Object

const isArray = (data) => data instanceof Array

const isObject = (data) => isArrayOrObject(data) && !isArray(data)

const isString = (data) => isEqual(typeof data, 'string')

const isStrEqual = (source, target) =>
  isEqual(
    isString(source) ? source : toJson(source),
    isString(target) ? target : toJson(target),
  )

const isEffectString = (data) =>
  isString(data) &&
  !isEqual(data, 'undefined') &&
  !isEqual(data, 'null') &&
  !isEqual(data, 'NaN') &&
  !isEqual(data, '[object Object]')

const isNumber = (data) => isEqual(typeof data, 'number')

const isNaN = (data) => isNumber() && isEqual(toString(data), 'NaN')

const isNumStr = (data) => {
  const regPos = /^\d+(\.\d+)?$/ //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数

  if (regPos.test(data) || regNeg.test(data)) {
    return true
  }

  return false
}

const isNumLike = (data) => isNumber(data) || isNumStr(data)

const isBool = (data) => isEqual(typeof data, 'boolean')

const isNull = (data) => isEqual(data, null)

const isUndefined = (data) => isEqual(data, undefined)

const isNil = (data) => isNull(data) || isUndefined(data)

const isSymbol = (data) => isEqual(typeof data, 'symbol')

const isError = (data) => data instanceof Error

const instanceOf = (data) => {
  const typeStr = toPrototypeStr(data)

  switch (typeStr) {
    case '[object Object]': {
      return Object
    }
    case '[object Array]': {
      return Array
    }
    case '[object String]': {
      return String
    }
    case '[object Number]': {
      return Number
    }
    case '[object Boolean]': {
      return Boolean
    }
    case '[object Undefined]': {
      return undefined
    }
    case '[object Null]': {
      return null
    }
    case '[object JSON]': {
      return JSON
    }
    case '[object Math]': {
      return Math
    }
    case '[object RegExp]': {
      return RegExp
    }
    case '[object Symbol]': {
      return Symbol
    }
    case '[object Error]': {
      return Error
    }
    default:
      return undefined
  }
}

const typeOf = (data) => {
  const typeStr = toPrototypeStr(data)

  switch (typeStr) {
    case '[object Object]': {
      return 'object'
    }
    case '[object Array]': {
      return 'array'
    }
    case '[object String]': {
      return 'string'
    }
    case '[object Number]': {
      return 'number'
    }
    case '[object Boolean]': {
      return 'boolean'
    }
    case '[object Undefined]': {
      return 'undefined'
    }
    case '[object Null]': {
      return 'null'
    }
    case '[object JSON]': {
      return 'json'
    }
    case '[object Math]': {
      return 'math'
    }
    case '[object RegExp]': {
      return 'RegExp'
    }
    case '[object Symbol]': {
      return 'symbol'
    }
    case '[object Error]': {
      return 'Error'
    }
    default:
      return 'undefined'
  }
}

const emptyValueOfType = (data) => {
  const typeStr = toPrototypeStr(data)

  switch (typeStr) {
    case '[object Object]': {
      return new Object()
    }
    case '[object Array]': {
      return new Array()
    }
    case '[object String]': {
      return ''
    }
    case '[object Number]': {
      return 0
    }
    case '[object Boolean]': {
      return false
    }
    case '[object Undefined]': {
      return undefined
    }
    case '[object Null]': {
      return null
    }
    case '[object JSON]': {
      return JSON
    }
    case '[object Math]': {
      return Math
    }
    case '[object RegExp]': {
      return new RegExp()
    }
    case '[object Symbol]': {
      return Symbol()
    }
    case '[object Error]': {
      return new Error()
    }
    default:
      return undefined
  }
}

const keys = (data) => {
  switch (instanceOf(data)) {
    case Object: {
      return Object.keys(data)
    }
    case Array: {
      return Array.from(data.keys())
    }
    default: {
      return []
    }
  }
}

const values = (data) => {
  switch (instanceOf(data)) {
    case Object: {
      return Object.values(data)
    }
    case Array: {
      return Array.from(data.values())
    }
    default: {
      return []
    }
  }
}

const entries = (data) => {
  switch (instanceOf(data)) {
    case Object: {
      return Object.entries(data)
    }
    case Array: {
      return Array.from(data.entries())
    }
    default: {
      return []
    }
  }
}

const len = (data) => {
  if (isArrayOrObject(data)) {
    return keys(data).length
  }

  return toString(data).length
}

const isEmpty = (data) => {
  if (isArrayOrObject(data)) {
    return !len(data)
  }

  return !data
}

const dataOfPath = (data, path = [], defaultValue) => {
  let d = data

  for (let i = 0; i < path.length; i++) {
    // try {
    //   if (d === undefined) {
    //     d = defaultValue

    //     break
    //   } else {
    //     d = d[path[i]]
    //   }
    // } catch {
    //   d = undefined
    // }
    if (isArrayOrObject(d)) {
      d = d[path[i]]
    } else {
      d = defaultValue

      break
    }
  }

  return d
}

const toPathStr = (path = [], joinStr = '/', rootStr = '/') => {
  const pathStr = path.join(joinStr)

  return `${rootStr}${pathStr}`
}

const clone = (data) => {
  switch (instanceOf(data)) {
    case Object: {
      return { ...data }
    }
    case Array: {
      return [...data]
    }
    default: {
      const d = data

      return d
    }
  }
}

const deepClone = (data) => parseJson(toJson(data))

const compareStrSize = (string1 = '', string2 = '', reverse = false) => {
  const str1 = toString(string1)
  const str2 = toString(string2)

  if (!str1 && !str2) {
    return 0
  }

  const str1Len = str1.length
  const str2Len = str2.length

  if (str1Len > str2Len) {
    return reverse ? -1 : 1
  } else if (str1Len < str2Len) {
    return reverse ? 1 : -1
  }

  const arr1 = str1.split('')
  const arr2 = str2.split('')

  for (let i = 0; i < arr1.length; i++) {
    const v1 = arr1[i]
    const v2 = arr2[i]

    if (v1 > v2) {
      return reverse ? -1 : 1
    } else if (v1 < v2) {
      return reverse ? 1 : -1
    }
  }

  return 0
}

const decimalCarryConfig = {
  '0': '1',
  '1': '2',
  '2': '3',
  '3': '4',
  '4': '5',
  '5': '6',
  '6': '7',
  '7': '8',
  '8': '9',
  '9': '0',
}

const decimal = function(digits = 0, outStr = '') {
  let _ = outStr

  if (!_) {
    if (isString(this)) {
      _ = this.valueOf()
    } else if (isNumber(this)) {
      _ = this.toString().valueOf()
    } else {
      return _
    }
  }

  if (!Number.isInteger(digits)) {
    return _
  }

  let dotIndex = _.indexOf('.')

  if (dotIndex < 0) {
    dotIndex = _.length
    _ = `${_}.0`
  }

  const len = dotIndex + digits + 2
  const $ = _.padEnd(len, '0')
    .substr(0, len)
    .split('')
  let isCarry = $.pop() >= 5
  let numStr = $.reduceRight((o, n) => {
    if (n !== '.') {
      n = isCarry ? decimalCarryConfig[n] : n
      isCarry = isCarry && n === '0'
    }

    return `${n}${o}`
  }, '')

  if (isCarry) {
    numStr = `1${$}`
  }

  if (numStr.endsWith('.')) {
    numStr = numStr.substring(0, numStr.length - 1)
  }

  return numStr
}

const parseFloatDecimal = function(digits = 0, outStr = '') {
  let str = outStr

  if (!str) {
    if (isString(this)) {
      str = this.valueOf()
    } else if (isNumber(this)) {
      str = this.toString().valueOf()
    }
  }

  const _ = decimal(digits, str)

  return parseFloat(_)
}

export {
  toString,
  toJson,
  parseJson,
  isEqual,
  isOneOfEqual,
  isTypeEqual,
  isStrEqual,
  isFunction,
  isArrayOrObject,
  isArray,
  isObject,
  isString,
  isEffectString,
  isNumber,
  isNaN,
  isNumStr,
  isNumLike,
  isBool,
  isNull,
  isUndefined,
  isNil,
  isSymbol,
  isError,
  isEmpty,
  instanceOf,
  typeOf,
  emptyValueOfType,
  keys,
  values,
  entries,
  len,
  dataOfPath,
  toPathStr,
  clone,
  deepClone,
  compareStrSize,
  decimal,
  parseFloatDecimal,
}

export default {
  toString,
  toJson,
  parseJson,
  isEqual,
  isOneOfEqual,
  isTypeEqual,
  isFunction,
  isArrayOrObject,
  isArray,
  isObject,
  isString,
  isStrEqual,
  isEffectString,
  isNumber,
  isNaN,
  isNumStr,
  isNumLike,
  isBool,
  isNull,
  isUndefined,
  isNil,
  isSymbol,
  isError,
  isEmpty,
  instanceOf,
  typeOf,
  emptyValueOfType,
  keys,
  values,
  entries,
  len,
  dataOfPath,
  toPathStr,
  clone,
  deepClone,
  compareStrSize,
  decimal,
  parseFloatDecimal,
}
