import { render } from 'lit';

const AddStory = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    evidenceInput.addEventListener('change', () => {
      this._updatePhotoPreview();
    });

    const addStoryForm = document.querySelector('#add-story-form');
    addStoryForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addStoryForm.classList.add('was-validated');
        this._addStory();
      },
      false,
    );
  },

  _addStory() {
    const storyData = this._getStoryData();
    if (this._validateStoryData({ ...storyData })) {
      console.log('storyData');
      console.log(storyData);
    }
  },

  _getStoryData() {
    const storyInput = document.querySelector('#validationCustomStory');
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    return {
      story: storyInput.value,
      evidence: evidenceInput.files[0],
      date: new Date().toLocaleDateString(),
    };
  },

  _updatePhotoPreview() {
    const evidenceImg = document.querySelector('#validationCustomEvidenceImg');
    const evidenceImgInput = document.querySelector('#validationCustomEvidence');

    const photo = evidenceImgInput.files[0];
    if (!photo) return;
    const reader = new FileReader();

    reader.onload = (event) => {
      evidenceImg.parentElement.classList.remove('d-none');
      evidenceImg.src = event.target.result;
    };

    reader.readAsDataURL(photo);
  },

  _validateStoryData(storyData) {
    const storyDataFiltered = Object.values(storyData).filter((item) => item === '');

    return storyDataFiltered.length === 0;
  },
};

export default AddStory;
