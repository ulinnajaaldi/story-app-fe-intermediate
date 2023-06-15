import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class LabelTextarea extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html` <label for="story" class="form-label d-none">${msg(`Ceritamu`)}</label> `;
  }
}

customElements.define('label-textarea', LabelTextarea);
