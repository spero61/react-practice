import { Flex, Text, Stack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef } from 'react';
import { auth, db } from '../firebaseConfig';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const Chat = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const bottomOfChat = useRef();

  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore#usecollectiondata
  // const q = query(collection(db, 'chats', id, 'messages'), orderBy('timestamp'));
  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
  const [messages] = useCollectionData(q);

  // get an email address of the recipient
  const getOpponentEmail = (users, currentUser) => users
    ?.filter(userEmail => userEmail !== currentUser)[0];

  const [chatInfo] = useDocumentData(doc(db, 'chats', id));

  const getMessages = () => messages
    ?.map(msg => {
      const sender = msg.sender === user.email;
      const senderId = msg.sender.slice(0, -10); // substring without "@gmail.com"
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#get_the_number_of_seconds_since_the_ecmascript_epoch
      const timestamp = new Date(msg.timestamp.seconds * 1000);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
      const timestampFormatted = timestamp.toLocaleString('ja-JP').slice(5); // to get rid of year
      return (
        <Stack
          key={uuidv4()}
          spacing={0}
          paddingBottom={3}
        >
          <Text
            marginTop={0}
            alignSelf={sender ? 'flex-end' : 'flex-start'}
            marginStart={1}
            marginEnd={2}
            fontSize="sm"
            color="#888888"
          >
            {senderId || ''}
          </Text>

          <Flex
            w="fit-content"
            minWidth="100px"
            borderRadius="lg"
            p={2}
            my={2}
            bg={sender ? 'blue.100' : 'green.100'}
            alignSelf={sender ? 'flex-end' : 'flex-start'}
          >
            <Image
              marginEnd={2}
              boxSize="25px"
              borderRadius="full"
              objectFit="cover"
              src={msg.picURL ? msg.picURL : 'https://i.imgur.com/EuXdDLh.png'}
              alt="profile pic"
            />
            <Text>{msg.text}</Text>
          </Flex>
          <Text
            marginTop={0}
            // alignSelf={sender ? 'flex-end' : 'flex-start'}
            textAlign={sender ? 'end' : 'start'}
            marginStart={3}
            // marginEnd={2}
            fontSize="xs"
            color="#888888"
          >
            {timestampFormatted || ''}
          </Text>

        </Stack>
      );
    });

  useEffect(
    () => {
      setTimeout(bottomOfChat.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      }), 100);
    },
    [messages],
  );

  return (

    <Flex h="100vh">
      <Sidebar />
      <Flex
        bg="gray.50"
        direction="column"
        flex={1}
      >
        <TopBar email={getOpponentEmail(chatInfo?.users, user.email)} />

        <Flex
          className="chatarea"
          flex={1}
          direction="column"
          pt={3}
          mx={3}
          overflowX="scroll"
          sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
        >
          {getMessages()}
          <div ref={bottomOfChat} />
        </Flex>

        <BottomBar id={id} email={user.email} />

      </Flex>
    </Flex>
  );
};

export default Chat;
