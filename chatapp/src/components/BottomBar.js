import { FormControl, Input, Button } from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';

const BottomBar = ({ id, email }) => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: email,
      timestamp: serverTimestamp(),
      picURL: user.photoURL,

    });
    setInput('');
  };

  return (
    <FormControl
      bg="gray.100"
      w="100%"
      align="center"
      p={4}
      onSubmit={sendMessage}
      as="form"
    >
      <Input
        placeholder="Type a message..."
        autoComplete="off"
        autoFocus
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden>
        Send

      </Button>
    </FormControl>
  );
};

export default BottomBar;
