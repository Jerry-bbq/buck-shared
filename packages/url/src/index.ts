import { isNull } from '@buck-shared/is';
/**
 * 获取当前url参数
 * @param name
 * @returns value
 */
export function getQueryString(name: string): string | null {
  const reg = new RegExp(
    '(^|&)' + encodeURIComponent(name) + '=([^&]*)(&|$)',
    'i',
  );
  const result: RegExpMatchArray | null = window.location.search
    .substring(1)
    .match(reg);
  return isNull(result) ? null : decodeURIComponent(result[2]);
}
