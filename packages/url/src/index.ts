import { isNull } from '@buck-shared/is';

/**
 * 获取当前url参数
 * @param name
 * @returns value
 */
export const getQueryString = (name: string): string | null => {
  const reg = new RegExp(
    '(^|&)' + encodeURIComponent(name) + '=([^&]*)(&|$)',
    'i',
  );
  const result: RegExpMatchArray | null = window.location.search
    .substring(1)
    .match(reg);
  return isNull(result) ? null : decodeURIComponent(result[2]);
};

/**
 * URL 参数转换为一个对象
 * @param url
 * @returns
 */
export const parseUrlParamsToObj = (url: string): Record<string, string> => {
  const urlStr = url ? url : window.location.href;
  const searchParams = new URLSearchParams(urlStr.split('?')[1]);
  const paramsObj: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
};
