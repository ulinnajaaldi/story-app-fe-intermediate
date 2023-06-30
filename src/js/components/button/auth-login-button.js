import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class AuthLoginButton extends LitWithoutShadowDom {
  static properties = {
    customStyle: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <button
        class="btn ${this.customStyle} w-100 d-flex justify-content-center align-items-center gap-2"
        type="submit"
      >
        <div class="spinner-border d-none" role="status" id="spinner">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="" id="btn-text-login">${msg(`Masuk`)}</p>
      </button>
    `;
  }
}

customElements.define('auth-login-button', AuthLoginButton);
