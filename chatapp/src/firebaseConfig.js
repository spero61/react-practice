import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyCeczlX1US-j8C0fAFumc38-VKRAxJt9tU',
  authDomain: 'portfolio-fd1d3.firebaseapp.com',
  projectId: 'portfolio-fd1d3',
  storageBucket: 'portfolio-fd1d3.appspot.com',
  messagingSenderId: '348342301612',
  appId: '1:348342301612:web:161ecfc29554efa6468009',
};

// Initialize Firebase
const app = initializeApp(config);
const auth = getAuth();

export { auth };
