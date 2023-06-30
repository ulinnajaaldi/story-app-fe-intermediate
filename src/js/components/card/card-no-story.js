import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../../utils/utils';

class CardNoStory extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div
        class="d-flex flex-column justify-content-center align-items-center text-black-50 card py-3"
      >
        <h2>
          <i class="bi bi-dash-circle-dotted "></i>
        </h2>
        <h5 class="text-center">${msg(`Tidak ada cerita terbaru dari`)} ${Utils.getUserName()}</h5>
      </div>
    `;
  }
}

customElements.define('card-no-story', CardNoStory);
