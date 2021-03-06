import { useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../firebaseConfig';
import PopoverToConfirm from './PopoverToConfirm';
import PopoverForm from './PopoverForm';

// get email addresses of users other then currently signed-in user
const getEmails = (users, currentUser) => users?.filter(user => user !== currentUser.email)[0];

const ChatListText = ({ children }) => (
  <Text
    fontSize={['11px', '14px', '16px']}
    fontWeight={[500, 600, 600]}
    color="#456789"
  >
    {children}
  </Text>
);

const Sidebar = () => {
  const [user] = useAuthState(auth);
  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore
  const [snapshot, loading, error] = useCollection(collection(db, 'chats'));
  const navigate = useNavigate();

  const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const chatList = () => {
    // const numberOfImages = 10;
    // ((id.charCodeAt(1) + id.charCodeAt(2)) * id.charCodeAt(3)) % numberOfImages;
    // const chatImageFile = `chatarea0${chatImageIdx}.jpg`;
    const randomAvatarImage = 'https://source.unsplash.com/random/200×200?ocean';

    return (
      chats?.filter(chat => chat.users.includes(user.email))
        .map(
          chat => (
            <Flex
              key={uuidv4()}
              align="center"
              p={3}
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onClick={() => { navigate(`/chat/${chat.id}`); }}
            >
              <Avatar
                w={['25px', '40px', '50px']}
                h={['25px', '40px', '50px']}
                marginEnd={['2', '2', '3']}
                src={randomAvatarImage}
              />
              <ChatListText>
                {/* slice the user's email to get rid of @gmail.com */}
                {}
                {getEmails(chat.users, user).slice(0, -10)}
              </ChatListText>
            </Flex>
          ),
        )
    );
  };

  return (
    <Flex
      bgGradient={[
        'linear(to-t, #e1cbf7, teal.200)',
      ]}
      w={['120px', '130px', '210px', '210px', '300px', '350px']}
      h="100vh"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        bgGradient="linear(to-b, orange.100, teal.200)"
        w="100%"
        h="81px"
        align="center"
        justifyContent="space-between"
        pl={[1, 2, 3]}
        borderBottom="1px solid"
        borderColor="teal.200"
      >
        <Flex align="center">
          <Avatar
            w={['30px', '35px', '55px']}
            h={['30px', '35px', '55px']}
            marginEnd={['2', '2', '3']}
            src={user.photoURL}
          />
          <Text
            fontSize={['10px', '', 'lg']}
            color="#345678"
            fontWeight={700}
          >
            {user.displayName}

          </Text>
        </Flex>
        <PopoverToConfirm
          funcArg={() => signOut(auth)}
          contentText="ログアウトします。よろしいですか?"
          confirmText="はい"
          cancelText="いいえ"
        >
          <Box _hover={{ cursor: 'pointer', filter: 'contrast(200%)' }}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              color="#565656"
              size="1x"
              style={{ padding: '10px' }}

            />
          </Box>
        </PopoverToConfirm>
      </Flex>

      {/* <Button
        bgGradient="linear(to-br, teal.300, purple.200)"
        fontSize={['12px', '14px', '16px']}
        fontWeight={[500, 600, 600]}
        borderRadius="full"
        color="gray.700"
        m={[4, 3, 5]}
        p={[1, 4, 5]}
        onClick={() => newChat()}
      >
        New Chat
      </Button> */}

      <PopoverForm />

      {/* sx prop: https://chakra-ui.com/docs/styled-system/features/the-sx-prop */}
      <Flex
        className="sidebar"
        key={uuidv4()}
        overflowX="scroll"
        direction="column"
        flex={1}
        sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
      >
        {/* groupchat */}
        <Flex
          align="center"
          p={3}
          _hover={{ bg: 'gray.100', cursor: 'pointer' }}
          onClick={() => navigate('/chat/groupchat')}
        >

          <Avatar
            w={['25px', '40px', '50px']}
            h={['25px', '40px', '50px']}
            marginEnd={['2', '2', '3']}
            src="https://i.imgur.com/EuXdDLh.png"
          />
          <ChatListText>tutorial</ChatListText>
        </Flex>
        {/* luomuchat */}
        <Flex
          align="center"
          p={3}
          _hover={{ bg: 'gray.100', cursor: 'pointer' }}
          onClick={() => navigate('/chat/luomu')}
        >

          <Avatar
            w={['25px', '40px', '50px']}
            h={['25px', '40px', '50px']}
            marginEnd={['2', '2', '3']}
            src="https://i.imgur.com/6m61BZB.png"
          />
          <ChatListText>Team Luomu</ChatListText>
        </Flex>
        {chatList()}
      </Flex>

    </Flex>
  );
};

export default Sidebar;
