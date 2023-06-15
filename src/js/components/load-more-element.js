import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class LoadMoreElement extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <button class="btn btn-light" id="load-more">${msg(`Muat lebih banyak`)}</button>
    `;
  }
}

customElements.define('load-more-element', LoadMoreElement);
