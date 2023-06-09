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
  `;
  render() {
    return html` <p>Made with <span>❤</span> from Ulinnaja Aldi - Dicoding FE Intermediate</p> `;
  }
}

customElements.define('footer-element', FooterElement);
