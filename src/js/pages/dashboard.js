const Dashboard = {
  async init() {
    this._showSpinner();
    await this._initialData();
    this._hideSpinner();
  },

  async _initialData() {
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
            <div class="card">
              <img src="${story.photoUrl}" class="card-img-top" alt="${story.name}">
              <div class="card-body">
                  <h5 class="card-title">${story.name}</h5>
                  <p class="card-text">${story.description}</p>
                  <p class="card-text"><small class="text-muted">Dibuat pada: ${formattedDate}</small></p>
              </div>
            </div>
            `;
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
