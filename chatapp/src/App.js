import './App.css';
import { initializeApp } from 'firebase/app';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
