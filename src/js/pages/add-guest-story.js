import { getLocale, setLocale } from '../localization';
import CheckUserAuth from './auth/check-user-auth';
import CrudStory from '../networks/crud-story';

const AddGuestStory = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const storedLocale = localStorage.getItem('selected-locale');
    if (storedLocale && storedLocale !== getLocale()) {
      setLocale(storedLocale);
    }
    const addStoryForm = document.querySelector('#add-story-form');
    addStoryForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addStoryForm.classList.add('was-validated');
        this._createStory();
      },
      false,
    );
  },

  async _createStory() {
    const storyData = this._getStoryData();
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
      try {
        await CrudStory.createGuestStory({
          description: storyData.story,
          photo: storyData.evidence,
          lat,
          lon,
        });
        const spinner = document.querySelector('#spinner-share-story');
        spinner.classList.remove('d-none');
        this._goToDashboardPage();
      } catch (error) {
        console.log(error);
      }
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

  _validateStoryData(storyData) {
    const storyDataFiltered = Object.values(storyData).filter((item) => item === '');

    return storyDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default AddGuestStory;
