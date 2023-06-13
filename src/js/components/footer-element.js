import { LitElement, html, css } from 'lit';

class FooterElement extends LitElement {
  static styles = css`
    p {
      text-align: center;
      font-size: 1.2rem;
      max-width: 20rem;
      margin: 0 auto;
    }
    span {
      color: #dc2626;
    }
    a {
      color: #dc2626;
      text-decoration: none;
    }
  `;
  render() {
    return html`
      <p>
        Made with <span>❤</span> from
        <a href="https://github.com/ulinnajaaldi" target="_blank" rel="noopener noreferrer"
          >Ulinnaja Aldi</a
        >
        - Dicoding FE Intermediate
      </p>
    `;
  }
}

customElements.define('footer-element', FooterElement);
