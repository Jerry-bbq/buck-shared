const toString = Object.prototype.toString;

export const is = (value: unknown, type: string) => {
  return toString.call(value) === `[object ${type}]`;
};

/* 基本类型 */

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isSymbol = (value: unknown): value is symbol => {
  return is(value, 'Symbol');
};

export const isBigInt = (value: unknown): value is bigint => {
  return is(value, 'BigInt');
};

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

/** 对象类型 */

export const isObject = (value: unknown): value is Record<any, any> => {
  return value !== null && typeof value === 'object';
};

export const isPlainObject = (value: unknown): value is object => {
  return is(value, 'Object');
};

export const isArray = (value: unknown): value is Array<any> => {
  return Array.isArray(value);
};

export const isFunction = <T>(value: T): value is T => {
  return typeof value === 'function';
};

export const isRegExp = (value: unknown): value is RegExp => {
  return is(value, 'RegExp');
};

export const isMap = (value: unknown): value is Map<any, any> => {
  return is(value, 'Map');
};

export const isSet = (value: unknown): value is Set<any> => {
  return is(value, 'Set');
};

export const isDate = (value: unknown): value is Date => {
  return is(value, 'Date');
};

export const isPromise = <T = any>(value: unknown): value is Promise<T> => {
  return (
    (isObject(value) || isFunction(value)) &&
    isFunction((value as any).then) &&
    isFunction((value as any).catch)
  );
};

export const isError = (value: unknown): value is Error => {
  return is(value, 'Error');
};

/** 其他 */

export const isEmpty = <T = unknown>(value: T): value is T => {
  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
};

export const isWindow = (value: any): value is Window => {
  return value !== null && value === value.window;
};

export const isElement = (value: unknown): value is Element => {
  return (
    value !== undefined &&
    typeof HTMLElement !== 'undefined' &&
    value instanceof HTMLElement &&
    value.nodeType === 1
  );
};
