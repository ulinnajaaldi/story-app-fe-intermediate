import { getLocale, setLocale } from '../localization';
import CheckUserAuth from './auth/check-user-auth';
import Utils from '../utils/utils';
import CrudStory from '../networks/crud-story';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._showSpinner();
    await this._initialData();
    this._hideSpinner();
    this._deleteStory();
  },

  async _initialData() {
    const storedLocale = localStorage.getItem('selected-locale');
    if (storedLocale && storedLocale !== getLocale()) {
      setLocale(storedLocale);
    }
    try {
      const response = await CrudStory.getAllStory();
      const responseRecord = response.data.listStory;
      const filterStory = responseRecord.filter((story) => story.name === Utils.getUserName());
      this.allListStory = filterStory;
    } catch (error) {
      console.log(error);
    }
    this._displayStories();
  },

  _displayStories() {
    const section = document.querySelector('#profile-story-list');
    const storiesToDisplay = this.allListStory;
    storiesToDisplay.forEach((story) => {
      var date = new Date(story.createdAt);
      var formattedDate =
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getDate().toString().padStart(2, '0') +
        '/' +
        date.getFullYear();
      section.innerHTML += `
            <card-story-dashboard 
              id="${story.id}" 
              image="${story.photoUrl}" 
              name="${story.name}" 
              description="${story.description}" 
              date="${formattedDate}">
            </card-story-dashboard>
          `;
    });
    if (storiesToDisplay.length === 0) {
      section.innerHTML += `
            <card-no-story></card-no-story>
          `;
    }
  },

  _deleteStory() {
    const deleteButtons = document.querySelectorAll('#delete-story');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const story = event.target.closest('card-story-dashboard');
        story.remove();
      });
    });
  },

  _showSpinner() {
    const spinner = document.querySelector('#spinner');
    spinner.classList.add('d-flex');
    spinner.classList.remove('d-none');
  },

  _hideSpinner() {
    const spinner = document.querySelector('#spinner');
    spinner.classList.add('d-none');
    spinner.classList.remove('d-flex');
  },
};

export default Dashboard;
