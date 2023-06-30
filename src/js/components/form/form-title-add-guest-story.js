import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../../utils/utils';

class FormTitleAddGuestStory extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <h5 class="text-center">
        ${msg(`Peringatan!`)} <br />
        ${msg(`Saat ini kamu mengirimkan cerita sebagai tamu`)}<br />
      </h5>
      <p class="text-center">
        <a href="/user/add-story.html"> ${msg(`Tambah cerita sebagai`)} ${Utils.getUserName()}?</a>
      </p>
    `;
  }
}

customElements.define('form-title-add-guest-story', FormTitleAddGuestStory);
