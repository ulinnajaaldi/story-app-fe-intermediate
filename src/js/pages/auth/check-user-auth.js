/* eslint-disable no-useless-return */
/* eslint-disable no-lonely-if */
import Utils from '../../utils/utils';

const CheckUserAuth = {
  excludeRedirectPages: ['login.html', 'register.html'],

  checkLoginState() {
    const userToken = Utils.getUserToken();
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPages);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      } else {
        this._showLoginMenuOrUserLogMenu(isUserSignedIn);
      }
    } else {
      if (!isUserOnAuthPage) {
        window.location.href = '/auth/login.html';
      }
    }
  },

  _showLoginMenuOrUserLogMenu(userLoginState) {
    const loginMenu = document.querySelector('#loginMenu');
    const userLogMenu = document.querySelector('#userLogMenu');

    if (!userLoginState) {
      loginMenu?.classList.add('d-block');
      userLogMenu?.classList.add('d-none');

      loginMenu?.classList.remove('d-none');
      userLogMenu?.classList.remove('d-block');

      return;
    }

    loginMenu?.classList.add('d-none');
    userLogMenu?.classList.add('d-block');

    loginMenu?.classList.remove('d-block');
    userLogMenu?.classList.remove('d-none');
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
