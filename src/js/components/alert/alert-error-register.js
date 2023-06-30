import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class AlertErrorRegister extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="alert alert-danger" role="alert" id="alert-error-register">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p>${msg(`Gagal mendaftarkan akun!`)}</p>
            <small>${msg(`Masukan data dengan benar.`)} <span id="alert-interval"></span></small>
          </div>
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

customElements.define('alert-error-register', AlertErrorRegister);
