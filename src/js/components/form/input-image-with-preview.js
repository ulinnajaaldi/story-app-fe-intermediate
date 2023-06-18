import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class InputImageWithPreview extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },
    defaultImage: { type: String, reflect: true },
    defaultImageAlt: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this._checkAvailabilityProperty();
    this.type = 'text';
    this.defaultImage = '';
    this.defaultImageAlt = '';
    updateWhenLocaleChanges(this);
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('inputId')) {
      throw new Error(`Atribut "inputId" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <div style="width: 100%; height: 15rem" class="mb-3 ${!this.defaultImage ? 'd-none' : ''}">
        ${this._imagePreviewTemplate()}
      </div>
      <input
        type="file"
        class="form-control"
        id=${this.inputId || nothing}
        accept="image/*"
        ?required=${this.required}
        @change=${this._updatePhotoPreview}
      />

      ${this._validFeedbackTemplate()}
      <div class="invalid-feedback">${msg(`Gambar tidak boleh kosong`)}</div>
    `;
  }

  _updatePhotoPreview() {
    const evidenceImgChange = document.querySelector('#validationCustomEvidenceImgChange');
    const evidenceImgInput = document.querySelector('#validationCustomEvidence');

    let evidenceRecordImg = null;
    if (this.defaultImage) {
      evidenceRecordImg = document.querySelector('#validationCustomEvidenceImg');
    }

    const photo = evidenceImgInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (this.defaultImage) {
        evidenceRecordImg.classList.add('d-none');
      }
      evidenceImgChange.parentElement.classList.remove('d-none');
      evidenceImgChange.classList.remove('d-none');
      evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
    };

    reader.readAsDataURL(photo);
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
    }
    return html``;
  }

  _imagePreviewTemplate() {
    const imgChangeTemplate = html`
      <div
        class="w-100 h-100 ${this.defaultImage ? 'd-none' : ''}"
        style="
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        "
        id="${this.inputId || nothing}ImgChange"
      ></div>
    `;
    if (this.defaultImage) {
      return html`
        <img
          class="img-fluid h-100"
          src="${this.defaultImage}"
          alt="${this.defaultImageAlt}"
          id="${this.inputId || nothing}Img"
        />
        ${imgChangeTemplate}
      `;
    }

    return html` ${imgChangeTemplate} `;
  }
}

customElements.define('input-image-with-preview', InputImageWithPreview);
