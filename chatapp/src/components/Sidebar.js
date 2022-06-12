import { Link, useParams, useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Flex, Text } from '@chakra-ui/layout';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../firebaseConfig';

// get email addresses of users other then currently signed-in user
const getEmails = (users, currentUser) => users?.filter(user => user !== currentUser.email)[0];

const Sidebar = (props) => {
  const [user] = useAuthState(auth);
  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore
  const [snapshot, loading, error] = useCollection(collection(db, 'chats'));
  const { id } = useParams();
  const navigate = useNavigate();

  const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // user.email: an email of the current user
  const isChatExists = (email) => chats
    ?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)));

  const newChat = async () => {
    const email = prompt('Enter email of chat recipient');
    if (!isChatExists(email)) {
      await addDoc(collection(db, 'chats'), { users: [user.email, email] });
    }
  };

  const chatList = () => (
    chats?.filter(chat => chat.users.includes(user.email))
      .map(
        chat => (
          <Flex
            key={uuidv4()}
            align="center"
            p={3}
            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <Avatar src="" marginEnd={3} />
            <Text>{getEmails(chat.users, user)}</Text>
          </Flex>
        ),
      )
  );

  return (
    <Flex
      bg="cyan.100"
      w="30vw"
      minWidth="250px"
      borderEnd="1px solid"
      borderColor="gray.100"
      direction="column"
    >
      <Flex
        bg="teal.200"
        w="100%"
        h="81px"
        align="center"
        justifyContent="space-between"
        p={3}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        {/* default profile avatar */}
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text fontSize="lg" color="#333333" fontWeight={700}>{user.displayName}</Text>
        </Flex>

        <Link to="/">
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" color="#555555" onClick={() => signOut(auth)} />
        </Link>
      </Flex>

      <Button m={5} p={5} onClick={() => newChat()}>New Chat</Button>

      {/* sx prop: https://chakra-ui.com/docs/styled-system/features/the-sx-prop */}
      <Flex
        overflowX="scroll"
        direction="column"
        flex={1}
        sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
      >
        {chatList()}
      </Flex>

    </Flex>
  );
};

export default Sidebar;
