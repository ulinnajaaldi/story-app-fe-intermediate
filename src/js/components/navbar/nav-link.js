import { html } from 'lit';
import LitWithOutShadowDOM from '../base/lit-without-shadow-dom.js';

class NavLink extends LitWithOutShadowDOM {
  static properties = {
    to: { type: String, reflect: true },
    content: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`Atribut "to" harus diterapkan pada elemen ${this.localName}`);
    }
  }
  render() {
    return html`
      <li class="nav-item">
        <a class="nav-link" aria-current="page" href=${this.to}>${this.content}</a>
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);
