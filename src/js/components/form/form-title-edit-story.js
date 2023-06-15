import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class FormTitleEditStory extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html` <h5 class="text-center">${msg(`Sunting Ceritamu`)}</h5> `;
  }
}

customElements.define('form-title-edit-story', FormTitleEditStory);
