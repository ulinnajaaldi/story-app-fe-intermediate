import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class CardStoryDashboard extends LitWithoutShadowDom {
  static properties = {
    image: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    date: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    updateWhenLocaleChanges(this);
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('image')) {
      throw new Error(`Atribut "image" harus diterapkan pada elemen ${this.localName}`);
    }
    if (!this.hasAttribute('name')) {
      throw new Error(`Atribut "name" harus diterapkan pada elemen ${this.localName}`);
    }
    if (!this.hasAttribute('description')) {
      throw new Error(`Atribut "description" harus diterapkan pada elemen ${this.localName}`);
    }
    if (!this.hasAttribute('date')) {
      throw new Error(`Atribut "date" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <div class="card position-relative">
        <img src="${this.image}" class="card-img-top" alt="${this.name}" />
        <div class="card-body">
          <h5 class="card-title">
            <span class="fs-6 text-opacity-50 text-black">${msg(`Dari`)} </span>${this.name}
          </h5>
          <p class="card-text">${this.description}</p>
          <p class="card-text">
            <small class="text-muted">${msg(`Dibuat pada`)}: ${this.date}</small>
          </p>
        </div>
        <div class="position-absolute translate-middle" id="functional-button">
          <div class="d-flex flex-column gap-2" id="card-crud">
            <a
              href="/user/edit-story.html?id=${this.id}"
              title="${msg(`Sunting Cerita`)}"
              class="btn btn-warning"
            >
              <i class="bi bi-pencil-square"></i>
            </a>
            <button title="${msg(`Hapus Cerita`)}" class="btn btn-danger" id="delete-story">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('card-story-dashboard', CardStoryDashboard);
