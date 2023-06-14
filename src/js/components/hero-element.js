import { LitElement, html, css } from 'lit';

class HeroElement extends LitElement {
  static styles = css`
    * {
      margin: 0;
    }
    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 6rem;
    }
    img {
      width: 340px;
    }
    h5 {
      font-size: 2rem;
      font-weight: 500;
    }
    p {
      font-size: 1.5rem;
      font-weight: 400;
    }
  `;

  render() {
    return html`
      <section>
        <img src="assets/images/cats.png" alt="gambar kucing imut" />
        <h5>Ceritain</h5>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </section>
    `;
  }
}

customElements.define('hero-element', HeroElement);