import { css, html, LitElement } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class LocationPermission extends LitElement {
  static get properties() {
    return {
      permissionState: { type: String },
    };
  }

  static styles = css`
    p {
      font-size: 14px;
      font-style: italic;
    }
    #active {
      color: green;
      font-weight: bold;
    }
    #notActive {
      color: red;
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.permissionState = 'prompt';
  }

  connectedCallback() {
    super.connectedCallback();
    this._updatePermissionState();
  }

  async _updatePermissionState() {
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
    this.permissionState = permissionStatus.state;
    permissionStatus.onchange = () => {
      this.permissionState = permissionStatus.state;
    };
  }

  render() {
    return html`
      <p>
        * Kamu bisa membagikan cerita dengan lokasimu saat ini, ketika submit cerita. <br />
        Status lokasimu saat ini
        ${this.permissionState === 'granted'
          ? html`<span id="active">aktif</span>`
          : html`<span id="notActive">tidak aktif</span>`}
      </p>
    `;
  }
}

customElements.define('location-permission', LocationPermission);
