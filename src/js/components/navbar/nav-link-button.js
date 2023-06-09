import { html } from 'lit';
import LitWithOutShadowDOM from '../base/lit-without-shadow-dom.js';

class NavLinkButton extends LitWithOutShadowDOM {
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
        <a aria-current="page" href=${this.to}>
          <button type="button" class="btn btn-primary">${this.content}</button>
        </a>
      </li>
    `;
  }
}

customElements.define('nav-link-button', NavLinkButton);
