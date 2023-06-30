import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../utils/utils';

class ProfileCardElement extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    const userName = Utils.getUserName();

    return html`
      <section>
        <div
          class="d-flex flex-column justify-content-center align-items-center mt-5 gap-3"
          id="profile-card-wrapper"
        >
          <div class="card" id="profile-card">
            <div class="card-body d-flex flex-row justify-content-start align-items-center gap-4">
              <img
                src="https://api.dicebear.com/6.x/pixel-art/svg?seed=${userName}"
                class="img-fluid rounded-circle object-fit-cover"
                alt="${userName}"
                id="profile-picture"
              />
              <div>
                <h5 class="card-title">${userName}</h5>
                <p class="card-text">
                  ${msg(`Hai`)}, ${userName}!
                  ${msg(`Selamat datang di halaman dashboard pribadimu. Di sini, kamu
                  dapat dengan mudah memposting, mengedit, atau menghapus cerita-ceritamu sesuka
                  hati.`)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="user-post-element">
          <h5>${msg(`Postingan dari`)} ${userName}</h5>
        </div>
      </section>
    `;
  }
}

customElements.define('profile-card-element', ProfileCardElement);
