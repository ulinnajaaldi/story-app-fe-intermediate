import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class AlertErrorLogin extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="alert alert-danger" role="alert" id="alert-error-login">
        <div class="d-flex justify-content-between align-items-center">
          <p>${msg(`Akun tidak ditemukan`)}!</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            id="alert-close"
          ></button>
        </div>
      </div>
    `;
  }
}

customElements.define('alert-error-login', AlertErrorLogin);
