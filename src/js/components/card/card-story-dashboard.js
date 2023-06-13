import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';

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
      <div class="d-flex flex-row justify-content-center align-items-start gap-1 py-2">
        <div class="card">
          <img src="${this.image}}" class="card-img-top" alt="${this.name}" />
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
            <p class="card-text">
              <small class="text-muted">Dibuat pada: ${this.date}</small>
            </p>
          </div>
        </div>
        <div class="d-flex flex-column gap-2 mt-2" id="card-crud">
          <button title="Edit Story" class="btn btn-warning">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button title="Delete Story" class="btn btn-danger" id="delete-story">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('card-story-dashboard', CardStoryDashboard);
