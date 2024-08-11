import { checkEmail } from '../src/index';

test('checkEmail function works', () => {
  expect(checkEmail('123@qq.com')).toEqual(true);
});
