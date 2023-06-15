import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ProfileCardElement extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    updateWhenLocaleChanges(this);
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('name')) {
      throw new Error(`Atribut "name" harus diterapkan pada elemen ${this.localName}`);
    }
    if (!this.hasAttribute('description')) {
      throw new Error(`Atribut "description" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <section>
        <div
          class="d-flex flex-column justify-content-center align-items-center mt-5 gap-3"
          id="profile-card-wrapper"
        >
          <div class="card" id="profile-card">
            <div class="card-body d-flex flex-row justify-content-start align-items-center gap-4">
              <img
                src="https://github.com/ulinnajaaldi.png"
                class="img-fluid rounded-circle object-fit-cover"
                alt="${this.name}"
                id="profile-picture"
              />
              <div>
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="user-post-element">
          <h5>${msg(`Postingan dari`)} ${this.name}</h5>
        </div>
      </section>
    `;
  }
}

customElements.define('profile-card-element', ProfileCardElement);
