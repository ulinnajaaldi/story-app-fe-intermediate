import { getLocale, setLocale } from '../../localization';
import Auth from '../../networks/auth';
import CheckUserAuth from './check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const storedLocale = localStorage.getItem('selected-locale');
    if (storedLocale && storedLocale !== getLocale()) {
      setLocale(storedLocale);
    }

    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();
    if (this._validateFormData(formData)) {
      try {
        this._showSpinner();
        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        this._hideSpinner();
        this._showSuccessAlert();
        this._clearForm();
      } catch (error) {
        this._hideSpinner();
        this._showErrorAlert();
        console.log(error);
      }
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');
    return formDataFiltered.length === 0;
  },

  _clearForm() {
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    name.value = '';
    email.value = '';
    password.value = '';

    const registerForm = document.querySelector('#registerForm');
    registerForm.classList.remove('was-validated');
  },

  _hideSpinner() {
    const spinner = document.querySelector('#spinner');
    spinner.classList.add('d-none');
  },

  _showSpinner() {
    const alertError = document.querySelector('#alert-error-register');
    alertError?.classList.add('d-none');

    const spinner = document.querySelector('#spinner');
    spinner.classList.remove('d-none');
  },

  _showSuccessAlert() {
    const alertWrapper = document.querySelector('#alert-wrapper');
    alertWrapper.innerHTML = `<alert-success-register></alert-success-register>`;

    setTimeout(() => {
      const alertInterval = document.querySelector('#alert-interval');

      let timeLeft = 4;
      const intervalId = setInterval(() => {
        if (timeLeft > 0) {
          alertInterval.innerHTML = `${timeLeft}`;
          timeLeft--;
        } else {
          clearInterval(intervalId);
          window.location.href = '/auth/login.html';
        }
      }, 1000);
    }, 0);
  },

  _showErrorAlert() {
    const alertError = document.querySelector('#alert-error-register');
    alertError?.classList.remove('d-none');

    const alertWrapper = document.querySelector('#alert-wrapper');
    alertWrapper.innerHTML = `<alert-error-register></alert-error-register>`;
  },
};

export default Register;
