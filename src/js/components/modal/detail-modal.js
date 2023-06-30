import { html } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';

class DetailModal extends LitWithoutShadowDom {
  render() {
    return html`
      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel"></h4>
              <p class="modal-date"></p>
            </div>
            <div class="modal-body" id="myModalBody"></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('detail-modal', DetailModal);
