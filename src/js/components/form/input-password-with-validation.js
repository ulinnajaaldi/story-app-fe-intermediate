import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class InputPasswordWithValidation extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    this.type = 'password';
    this.required = true;
    updateWhenLocaleChanges(this);
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('inputId')) {
      throw new Error(`Atribut "inputId" harus diterapkan pada elemen  ${this.localName}`);
    }
  }

  render() {
    return html`
      <div class="position-relative">
        <input
          id=${this.inputId || nothing}
          class="form-control"
          type=${this.type}
          value=${this.value || nothing}
          ?required=${this.required}
          @input=${(e) => (this.value = e.target.value)}
        />

        <button
          class="rounded-5 position-absolute top-50 start-100 translate-middle"
          style="width: 30px; height: 30px; margin-left: -20px; border: 1px solid black; background-color: #d3b0ff;"
          type="button"
          @click=${() => (this.type = this.type === 'password' ? 'text' : 'password')}
        >
          <i
            class=${this.type === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye'}
            style="font-size: 0.8rem;"
          ></i>
        </button>
        ${this._validFeedbackTemplate()}
        <div class="invalid-feedback">${msg(`Wajib diisi`)}</div>
      </div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
    }

    return html``;
  }
}

customElements.define('input-password-with-validation', InputPasswordWithValidation);
