import { FormControl, Input, Button, Flex } from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../firebaseConfig';

const BottomBar = ({ id, email }) => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.length > 0) {
    // https://firebase.google.com/docs/firestore/manage-data/add-data
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: input,
        sender: email,
        timestamp: serverTimestamp(),
        picURL: user.photoURL,

      });
      setInput('');
    }
  };

  return (
    <FormControl
      bg="gray.100"
      w="100%"
      align="center"
      p={[2, 3, 4]}
      onSubmit={sendMessage}
      as="form"
    >
      <Flex>
        <Input
          placeholder="Type a message..."
          autoComplete="off"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button
          p={[3, 4, 5]}
          type="submit"
          _hover={{ bg: 'white' }}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            color="#6667AB"
            size="1x"
            onClick={() => signOut(auth)}
          />
        </Button>
      </Flex>
    </FormControl>
  );
};

export default BottomBar;
