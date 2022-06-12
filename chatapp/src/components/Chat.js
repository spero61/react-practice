import { Flex, Text } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const Chat = (props) => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  console.log(id);

  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore#usecollectiondata
  // const q = query(collection(db, 'chats', id, 'messages'), orderBy('timestamp'));
  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
  const [messages] = useCollectionData(q);

  // get an email address of the recipient
  const getOpponentEmail = (users, currentUser) => users
    ?.filter(userEmail => userEmail !== currentUser)[0];

  const [chatInfo] = useDocumentData(doc(db, 'chats', id));
  console.log(chatInfo?.users[1]);
  // console.log(chatInfo?.users);
  console.log(user.email);

  const getMessages = () => messages
    ?.map(msg => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={uuidv4()}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          my={2}
          bg={sender ? 'blue.100' : 'green.100'}
          alignSelf={sender ? 'flex-start' : 'flex-end'}
        >
          <Text>
            {msg.text}
          </Text>
        </Flex>
      );
    });

  return (

    <Flex h="100vh">
      <Sidebar />
      <Flex
        bg="gray.50"
        direction="column"
        flex={1}
      >
        <TopBar email={getOpponentEmail(chatInfo?.users, user.email)} />
        {/* <TopBar email="hi" /> */}

        <Flex
          className="chatarea"
          flex={1}
          direction="column"
          pt={4}
          mx={3}
          overflowX="scroll"
          sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
        >

          {getMessages()}

        </Flex>

        <BottomBar />

      </Flex>
    </Flex>
  );
};

export default Chat;
