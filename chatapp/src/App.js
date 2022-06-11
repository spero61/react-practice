import './App.css';
import { initializeApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';

const firebaseConfig = {
  apiKey: 'AIzaSyCeczlX1US-j8C0fAFumc38-VKRAxJt9tU',
  authDomain: 'portfolio-fd1d3.firebaseapp.com',
  projectId: 'portfolio-fd1d3',
  storageBucket: 'portfolio-fd1d3.appspot.com',
  messagingSenderId: '348342301612',
  appId: '1:348342301612:web:161ecfc29554efa6468009',
};

// init firebase app
initializeApp(firebaseConfig);

const App = () => (
  <Login />
);

export default App;
