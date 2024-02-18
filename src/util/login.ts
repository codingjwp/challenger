import {ReturnType} from 'GlobalCommonTypes';

export const setWebStorage = (userId: string, limitData: number) => {
  localStorage.setItem(
    'user_limit',
    JSON.stringify({
      userId,
      limitData,
    }),
  );
};

export const getWebStorage = () => {
  const userLimit = localStorage.getItem('user_limit');
  return userLimit ? (JSON.parse(userLimit) as ReturnType) : null;
};

export const removeWebStorage = () => {
  localStorage.removeItem('user_limit');
  return '/';
};

export const limitCheckLogin = (loaderPath?: string) => {
  const login = getWebStorage();
  if (!login) return loaderPath ? '/signin' : null;
  const now = new Date().getTime();
  const diffTime = login.limitData - now;
  if (diffTime <= 0) {
    removeWebStorage();
    return '/signin';
  }
  return loaderPath ? null : '/challenge';
};

export const validationNickCheck = (nick: string) => {
  const LOGIN_REG = /[\s\W]/;
  if (LOGIN_REG.test(nick)) {
    return {message: '빈 공간이나 특수문자를 제외해주세요.'};
  }
  if (nick.length < 3 || nick.length > 8) {
    return {message: '최소 3글자 최대 8글자 이내로 해주세요.'};
  }
  return;
};

export const validationPasswordCheck = (password: string) => {
  const PW_REG = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W]).+$/;
  if (PW_REG.test(password)) {
    return {message: '소문자, 대문자, 특수문자가 1개씩 포함되어야합니다.'};
  }
  if (password.length < 8 || password.length > 20) {
    return {message: '최소 8글자 최대 20글자 이내로 해주세요.'};
  }
  return;
};

export const validationConfirmCheck = (password: string, confirm: string) => {
  if (!confirm) return;
  if (password === confirm) {
    return {message: '비밀번호를 다시 한번 확인해주세요.'};
  }
  return;
};
