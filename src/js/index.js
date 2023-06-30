// Import our custom CSS
import '../scss/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import * as bootstrap from 'bootstrap';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import AddStory from './pages/add-story';
import EditStory from './pages/edit-story';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AddGuestStory from './pages/add-guest-story';

const routes = {
  '/': Home,
  '/user/dashboard.html': Dashboard,
  '/user/add-story.html': AddStory,
  '/user/edit-story.html': EditStory,
  '/auth/login.html': Login,
  '/auth/register.html': Register,
  '/user/add-guest-story.html': AddGuestStory,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(80vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();
});
