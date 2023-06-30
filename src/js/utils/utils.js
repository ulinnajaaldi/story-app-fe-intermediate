const USER_TOKEN_KEY = 'userToken';

const Utils = {
  setUserToken(value) {
    return localStorage.setItem(USER_TOKEN_KEY, value);
  },
  getUserToken() {
    return localStorage.getItem(USER_TOKEN_KEY);
  },
  destroyUserToken() {
    return localStorage.removeItem(USER_TOKEN_KEY);
  },
  setUserName(value) {
    return localStorage.setItem('userName', value);
  },
  getUserName() {
    return localStorage.getItem('userName');
  },
  destroyUserName() {
    return localStorage.removeItem('userName');
  },
};

export default Utils;
