import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    this._required = true;
    updateWhenLocaleChanges(this);
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('inputId')) {
      throw new Error(`Atribut "inputId" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <textarea
        id=${this.inputId || nothing}
        class="form-control"
        rows="4"
        value=${this.value || nothing}
        placeholder="${msg(`Tulis ceritamu`)}"
        ?required=${this.required}
        @input=${(e) => (this.value = e.target.value)}
      ></textarea>

      ${this._validFeedbackTemplate()}
      <div class="invalid-feedback">${msg(`Cerita tidak boleh kosong`)}</div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
    }

    return html``;
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);
