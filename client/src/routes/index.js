import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import OtherUserProfile from '../components/OtherUserProfile';
import Home from '../components/Home';
import NotFound from '../components/NotFound';

// Quotes:
import CreateQuote from '../components/quotes/Create';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
  },
  {
    name: 'OtherUserProfile',
    path: '/user/profile/:id',
    component: OtherUserProfile,
  },
  {
    name: 'NotFound',
    path: '*',
    component: NotFound,
  },
  {
    name: 'CreateQuote',
    path: '/create',
    component: CreateQuote,
  },
];
