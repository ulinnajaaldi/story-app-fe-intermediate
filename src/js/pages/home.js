import { getLocale, setLocale } from '../localization';
import CrudStory from '../networks/crud-story';
import CheckUserAuth from './auth/check-user-auth';
import * as bootstrap from 'bootstrap';

const Home = {
  itemsDisplayed: 0,
  itemsPerLoad: 3,

  async init() {
    CheckUserAuth.checkLoginState();
    this._showSpinner();
    await this._initialData();
    this._hideSpinner();
    this._addLoadMoreButton();
  },

  async _initialData() {
    try {
      const response = await CrudStory.getAllStory();
      const responseRecord = response.data.listStory;
      this.allListStory = responseRecord;
    } catch (error) {
      console.log(error);
    }

    const storedLocale = localStorage.getItem('selected-locale');
    if (storedLocale && storedLocale !== getLocale()) {
      setLocale(storedLocale);
    }
    this._displayStories();
  },

  async _getStoryById(id) {
    try {
      const response = await CrudStory.getStoryById(id);
      const responseRecord = response.data.story;
      return responseRecord;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  _getStoriesToDisplay() {
    return this.allListStory.slice(this.itemsDisplayed, this.itemsDisplayed + this.itemsPerLoad);
  },

  _displayStories() {
    const section = document.querySelector('#story-list');
    const storiesToDisplay = this._getStoriesToDisplay();
    storiesToDisplay.forEach((story) => {
      var date = new Date(story.createdAt);
      var formattedDate =
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getDate().toString().padStart(2, '0') +
        '/' +
        date.getFullYear();

      var splitName = story.name.split(' ');
      var initials = splitName.map((n) => n[0]).join('');

      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.id = story.id;
      cardElement.innerHTML = `
          <img src="${story.photoUrl}" class="card-img-top" alt="${story.name}">
          <div class="card-body" role="button">
              <h5 class="card-title d-flex align-items-center gap-2"><span class="initial-avatar">${initials}</span>
              ${story.name}
              </h5>
              <p class="card-text">${story.description}</p>
              <p class="card-text"><small class="text-muted"><i class="bi bi-calendar-check"></i> ${formattedDate}</small></p>
          </div>
      `;
      cardElement.addEventListener('click', async () => {
        const storyDetails = await this._getStoryById(story.id);
        const myModalLabel = document.querySelector('#myModalLabel');
        myModalLabel.innerHTML = `<span class="initial-avatar">${initials}</span> ${storyDetails.name}`;
        const myModalDate = document.querySelector('.modal-date');
        myModalDate.innerHTML = `<i class="bi bi-calendar-check"></i> ${formattedDate}`;
        const myModalBody = document.querySelector('#myModalBody');
        myModalBody.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-start gap-md-3 gap-2 py-2">
              <img src="${storyDetails.photoUrl}" class="
              image-modal
              " alt="${storyDetails.name}" />
              <p class="card-text">${storyDetails.description}</p>
            </div>
            `;

        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.toggle();
      });
      section.appendChild(cardElement);
    });
    this.itemsDisplayed += storiesToDisplay.length;
    if (this.itemsDisplayed >= this.allListStory.length) {
      document.querySelector('#load-more').style.display = 'none';
    }
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

  _addLoadMoreButton() {
    document.querySelector('#load-more').addEventListener('click', async () => {
      this._displayStories();
    });
  },
};

export default Home;
