import { getLocale, setLocale } from '../localization';

const Dashboard = {
  async init() {
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
    const fetchRecord = await fetch('/data/DATA.json');
    const responseRecord = await fetchRecord.json();
    this.allListStory = responseRecord.listStory;
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
