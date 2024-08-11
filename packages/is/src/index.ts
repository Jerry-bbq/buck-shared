const toString = Object.prototype.toString;

export const is = (value: unknown, type: string): boolean => {
  return toString.call(value) === `[object ${type}]`;
};

/* 基本类型 */
export const isBoolean = (value: any): boolean => {
  return typeof value === 'boolean';
};

export const isNumber = (value: any): boolean => {
  return typeof value === 'number';
};

export const isString = (value: any): boolean => {
  return typeof value === 'string';
};

export const isUndefined = (value: any): boolean => {
  return typeof value === 'undefined';
};

export const isNull = (value: any): boolean => {
  return value === null;
};

export const isSymbol = (value: any): boolean => {
  return is(value, 'Symbol');
};

export const isBigInt = (value: any): boolean => {
  return is(value, 'BigInt');
};

/** 对象类型 */
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};

export const isObject = (value: any): boolean => {
  return value !== null && is(value, 'Object');
};

export const isFunction = (value: any): boolean => {
  return typeof value === 'function';
};

export const isRegExp = (value: any): boolean => {
  return is(value, 'RegExp');
};

export const isMap = (value: any): boolean => {
  return is(value, 'Map');
};

export const isSet = (value: any): boolean => {
  return is(value, 'Set');
};

export const isDate = (value: any): boolean => {
  return is(value, 'Date');
};

export const isPromise = (value: any): boolean => {
  return is(value, 'Promise') && isFunction(value.then) && isFunction(value.catch);
};

export const isError = (value: any): boolean => {
  return is(value, 'Error');
};

/** 其他 */

export const isWindow = (value: any): boolean => {
  return typeof window !== 'undefined' && is(value, 'Window');
};

export const isElement = (value: any): boolean => {
  return value !== undefined && typeof HTMLElement !== 'undefined' && value instanceof HTMLElement && value.nodeType === 1;
};
