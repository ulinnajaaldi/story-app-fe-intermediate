import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ButtonShareStory extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html` <div class="d-flex justify-content-center">
      <button
        type="submit"
        class="btn btn-primary d-flex justify-content-center align-items-center gap-2"
      >
        <div class="spinner-border d-none" role="status" id="spinner-share-story">
          <span class="visually-hidden">Loading...</span>
        </div>
        ${msg(`Bagikan cerita`)}
      </button>
    </div>`;
  }
}

customElements.define('button-share-story', ButtonShareStory);
