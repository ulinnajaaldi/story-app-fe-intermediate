import { getLocale, setLocale } from '../../localization';
import Auth from '../../networks/auth';
import Utils from '../../utils/utils';
import CheckUserAuth from './check-user-auth';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const storedLocale = localStorage.getItem('selected-locale');
    if (storedLocale && storedLocale !== getLocale()) {
      setLocale(storedLocale);
    }

    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        this._showSpinner();
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserName(response.data.loginResult.name);
        Utils.setUserToken(response.data.loginResult.token);
        this._goToDashboardPage();
      } catch (error) {
        this._hideSpinner();
        this._showErrorAlert();
        console.error(error);
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _hideSpinner() {
    const textButton = document.querySelector('#btn-text-login');
    textButton.classList.remove('d-none');

    const spinner = document.querySelector('#spinner');
    spinner.classList.add('d-none');
  },

  _showSpinner() {
    const alertError = document.querySelector('#alert-error-login');
    alertError?.classList.add('d-none');

    const textButton = document.querySelector('#btn-text-login');
    textButton.classList.add('d-none');

    const spinner = document.querySelector('#spinner');
    spinner.classList.remove('d-none');
  },

  _showErrorAlert() {
    const alertError = document.querySelector('#alert-error-login');
    alertError?.classList.remove('d-none');

    const alertWrapper = document.querySelector('#alert-wrapper');
    alertWrapper.innerHTML = `<alert-error-login></alert-error-login>`;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;
