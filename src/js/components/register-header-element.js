import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class RegisterHeaderElement extends LitElement {
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
        <h3>${msg(`Ayo buat akun sekarang!`)}</h3>
        <h3>${msg(`Sudah punya akun? ayo `)}<a href=${this.to}>${msg(`Masuk`)}</a></h3>
      </section>
    `;
  }
}

customElements.define('register-header-element', RegisterHeaderElement);
