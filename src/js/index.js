/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAGTFiSNYGy4ADAUXhPZUm_wKigybjvSCU',
  authDomain: 'ceritain-app.firebaseapp.com',
  projectId: 'ceritain-app',
  storageBucket: 'ceritain-app.appspot.com',
  messagingSenderId: '535803200057',
  appId: '1:535803200057:web:c26801c6539de8b746c3e8',
  measurementId: 'G-Z1M8DBKG2W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
