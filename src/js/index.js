// Import our custom CSS
import '../scss/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import * as bootstrap from 'bootstrap';
import Home from './pages/home';

const routes = {
  '/': Home,
  //   '/user/tambah-cerita': 'About',
  //   '/user/dashboard': 'Contact',
};

const detectRoute = () => routes[window.location.pathname];

window.addEventListener('DOMContentLoaded', async () => {
  const route = detectRoute();
  route.init();
});
