import {
  isNumber,
  isArray,
  isString,
  isBoolean,
  isFunction,
  isObject,
  isUndefined,
  isNull,
  isDate,
  isBigInt,
  isMap,
  isSet,
  isRegExp,
  isError,
  isPromise,
  isSymbol,
  is,
} from '../src/index';

// TODO
// jest环境为node， 暂不支持window，所以不支持isElement,isWindow

test('is function works', () => {
  expect(is(1, 'Number')).toEqual(true);
  expect(is('hello', 'String')).toEqual(true);
  expect(is(false, 'Boolean')).toEqual(true);
});

test('isNumber function works', () => {
  expect(isNumber(100)).toEqual(true);
});

test('isArray function works', () => {
  expect(isArray([])).toEqual(true);
});

test('isString function works', () => {
  expect(isString('hello world')).toEqual(true);
});

test('isBoolean function works', () => {
  expect(isBoolean(false)).toEqual(true);
});

test('isBigInt function works', () => {
  expect(isBigInt(BigInt(123))).toEqual(true);
});

test('isUndefined function works', () => {
  expect(isUndefined(undefined)).toEqual(true);
});

test('isNull function works', () => {
  expect(isNull(null)).toEqual(true);
});

test('isFunction function works', () => {
  expect(isFunction(Function)).toEqual(true);
});
test('isObject function works', () => {
  expect(isObject({})).toEqual(true);
});

test('isDate function works', () => {
  expect(isDate(new Date())).toEqual(true);
});

test('isMap function works', () => {
  const map = new Map();
  expect(isMap(map)).toEqual(true);
});

test('isSet function works', () => {
  const set = new Set();
  expect(isSet(set)).toEqual(true);
});

test('isRegExp function works', () => {
  const reg = /\d/;
  expect(isRegExp(reg)).toEqual(true);
});

test('isError function works', () => {
  const reg = new Error();
  expect(isError(reg)).toEqual(true);
});

test('isPromise function works', () => {
  const promise = new Promise((res) => res);
  expect(isPromise(promise)).toEqual(true);
});

test('isSymbol function works', () => {
  var sym = Symbol('test');
  expect(isSymbol(sym)).toEqual(true);
});
