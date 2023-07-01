/* eslint-disable no-return-await */
import axios from 'axios';
import ApiEndpoint from '../utils/api-endpoint';
import Utils from '../utils/utils';

const api = axios.create({
  baseURL: ApiEndpoint.BASE_URL,
  timeout: 1000,
});

const CrudStory = {
  async getAllStory() {
    return await api.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken()}`,
      },
    });
  },

  async getStoryById(id) {
    return await api.get(ApiEndpoint.GET_DETAIL_STORY(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken()}`,
      },
    });
  },

  async createStory({ description, photo, lat, lon }) {
    const data = { description, photo, lat, lon };
    return await api.post(ApiEndpoint.POST_STORY, data, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async createGuestStory({ description, photo, lat, lon }) {
    const data = { description, photo, lat, lon };
    return await api.post(ApiEndpoint.POST_STORY_GUEST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default CrudStory;
