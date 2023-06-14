const EditStory = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const storyId = this._getStoryId();

    if (!storyId) {
      alert('Data tidak ditemukan');
      return;
    }

    const fetchRecord = await fetch('/data/DATA.json');
    const responseRecord = await fetchRecord.json();
    const userStory = responseRecord.listStory;

    const storyRecord = userStory.find((story) => story.id === storyId);

    this._populateStoryForm(storyRecord);
  },

  _initialListener() {
    const editStoryForm = document.querySelector('#edit-story-form');
    editStoryForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        editStoryForm.classList.add('was-validated');
        this._editStory();
      },
      false,
    );
  },

  _editStory() {
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

  _populateStoryForm(storyRecord = null) {
    if (!(typeof storyRecord === 'object')) {
      throw new Error(`Parameter storyRecord should be an object. The value is ${storyRecord}`);
    }

    const storyInput = document.querySelector('#validationCustomStory');
    const evidenceInput = document.querySelector('#inputImagePreviewEdit');

    storyInput.value = storyRecord.description;
    evidenceInput.defaultImage = storyRecord.photoUrl;
  },

  _validateStoryData(storyData) {
    delete storyData.evidence;
    const storyDataFiltered = Object.entries(storyData).filter((item) => item === '');

    return storyDataFiltered.length === 0;
  },

  _getStoryId() {
    const searchParamsEdit = new URLSearchParams(window.location.search);
    return searchParamsEdit.has('id') ? searchParamsEdit.get('id') : null;
  },
};

export default EditStory;
