type LoginData = {
  id: string;
  nick: string;
  limitData: number;
};

const LOGIN_REG = /[\s\W]/;

export const requiredLoginCheck = (nick: string) => {
  if (LOGIN_REG.test(nick)) {
    return false;
  }
  return true;
};

export const getLogin = () => {
  const data = localStorage.getItem('user_info');
  if (!data) {
    return;
  }
  const login: LoginData = JSON.parse(data);
  return {...login};
};

export const setLogin = (nick: string) => {
  if (!requiredLoginCheck(nick)) {
    return {
      error: true,
      message: '빈 공간과 "_"를 제외한 특수문자는 입력을 못합니다.',
    };
  }
  const limit = new Date().getTime() + 1000 * 60 * 60;

  const login = {
    id: '1',
    nick: nick,
    limitData: limit,
  };
  localStorage.setItem('user_info', JSON.stringify(login));
  return {
    error: false,
    message: '',
  };
};

export const autoLogout = () => {
  const login = getLogin();
  if (login) {
    const {limitData} = login;
    const diffData = limitData - new Date().getTime();
    if (diffData < 0) {
      localStorage.removeItem('user_info');
      return null;
    }
    return true;
  }
  return false;
};
