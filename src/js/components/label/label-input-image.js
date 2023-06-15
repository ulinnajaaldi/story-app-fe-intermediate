import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class LabelInputImage extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html` <label for="photo" class="form-label">${msg(`Unggah foto`)}</label> `;
  }
}

customElements.define('label-input-image', LabelInputImage);
