import { getLocale, setLocale } from '../localization';
import CheckUserAuth from './auth/check-user-auth';
import CrudStory from '../networks/crud-story';
import Utils from '../utils/utils';

const EditStory = {
  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const storedLocale = localStorage.getItem('selected-locale');
    if (storedLocale && storedLocale !== getLocale()) {
      setLocale(storedLocale);
    }

    const storyId = this._getStoryId();

    if (!storyId) {
      alert('Data tidak ditemukan');
      return;
    }

    try {
      const response = await CrudStory.getStoryById(storyId);
      const responseRecord = response.data.story;
      this._populateStoryForm(responseRecord);
    } catch (error) {
      console.log(error);
    }
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

  async _editStory() {
    const storyData = await this._getStoryData();
    if (this._validateStoryData({ ...storyData })) {
      let lat;
      let lon;
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          lat = position.coords.latitude;
          lon = position.coords.longitude;
        } catch (error) {
          console.log('User not allowed to share location');
        }
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
      console.log('storyData :', storyData);
      console.log('location :', lat, lon);
    }
  },

  _getStoryData() {
    const storyInput = document.querySelector('#validationCustomStory');
    const evidenceInput = document.querySelector('#validationCustomEvidence');

    return {
      author: Utils.getUserName(),
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
