export const check = (value: string, reg: RegExp): boolean => {
  return reg.test(value);
};

// check 数字字母组合
export const checkNumber = (value: string): boolean => {
  const reg = /^[A-Za-z0-9]+$/;
  return check(value, reg);
};

// 中文、英文、数字包括下划线
export const checkUserName1 = (value: string): boolean => {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
  return check(value, reg);
};

// 用户名正则，4到16位,字母，数字，下划线，减号
export const checkUserName2 = (value: string): boolean => {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/;
  return check(value, reg);
};

// 密码强度正则,最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export const checkPwd = (value: string): boolean => {
  const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
  return check(value, reg);
};

// check ID
export const checkID = (value: string): boolean => {
  const reg = /\d{17}[\d|x]|\d{15}/;
  return check(value, reg);
};

// check email
export const checkEmail = (value: string): boolean => {
  const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  return check(value, reg);
};

// check URL
export const checkURL = (value: string): boolean => {
  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  return check(value, reg);
};
