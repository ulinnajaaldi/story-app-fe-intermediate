import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class AlertSuccessRegister extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="alert alert-info" role="alert" id="alert-success-register">
        <p>${msg(`Berhasil mendaftarkan akun`)}</p>
        <small>${msg(`Akan dialihkan ke laman Masuk`)} <span id="alert-interval"></span></small>
      </div>
    `;
  }
}

customElements.define('alert-success-register', AlertSuccessRegister);
