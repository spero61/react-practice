import './App.css';
import { Spinner, Center } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import Login from './components/Login';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';

function App() {
  const [user, loading, error] = useAuthState(auth);
  if (error) {
    return (
      <div>
        <p>
          Error:
          {' '}
          {error.message}
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (!user) {
    return (
      <Login />
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Sidebar />} />
      <Route path="/chat" element={<Sidebar />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}

export default App;
