import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class LoginHeaderElement extends LitElement {
  static properties = {
    to: { type: String, reflect: true },
  };

  static styles = css`
    * {
      margin: 0;
    }
    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    img {
      width: 288px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
  `;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <section>
        <img src="assets/images/cats.png" alt="gambar kucing imut" />
        <h3>${msg(`Ayo masuk untuk mulai bercerita!`)}</h3>
        <h3>${msg(`Belum punya akun? ayo `)}<a href=${this.to}>${msg(`Daftar`)}</a></h3>
      </section>
    `;
  }
}

customElements.define('login-header-element', LoginHeaderElement);
