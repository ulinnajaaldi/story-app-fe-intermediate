const Home = {
  itemsDisplayed: 0,
  itemsPerLoad: 3,

  async init() {
    await this._initialData();
    this._addLoadMoreButton();
  },

  async _initialData() {
    const fetchRecord = await fetch('/data/DATA.json');
    const responseRecord = await fetchRecord.json();
    this.allListStory = responseRecord.listStory;
    this._displayStories();
  },

  async _checkForNewData() {
    const fetchRecord = await fetch('/data/DATA.json');
    const responseRecord = await fetchRecord.json();
    this.allListStory = responseRecord.listStory;
  },

  _displayStories() {
    const section = document.querySelector('#story-list');
    const storiesToDisplay = this.allListStory.slice(
      this.itemsDisplayed,
      this.itemsDisplayed + this.itemsPerLoad,
    );
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
    this.itemsDisplayed += storiesToDisplay.length;
    if (this.itemsDisplayed >= this.allListStory.length) {
      document.querySelector('#load-more').style.display = 'none';
    }
  },

  _addLoadMoreButton() {
    document.querySelector('#load-more').addEventListener('click', async () => {
      await this._checkForNewData();
      this._displayStories();
    });
  },
};

export default Home;
