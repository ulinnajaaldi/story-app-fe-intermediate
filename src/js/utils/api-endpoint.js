const ApiEndpoint = (() => {
  const BASE_URL = 'https://story-api.dicoding.dev/v1';

  return {
    BASE_URL,

    REGISTER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,

    GET_ALL_STORIES: `${BASE_URL}/stories`,
    GET_DETAIL_STORY: (id) => `${BASE_URL}/stories/${id}`,

    POST_STORY: `${BASE_URL}/stories`,
    POST_STORY_GUEST: `${BASE_URL}/stories/guest`,
  };
})();

export default ApiEndpoint;
