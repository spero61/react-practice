import { Flex, Text, Stack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { collection, doc, query, orderBy, limit, where, getDocs, deleteDoc, documentId, queryEqual } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef } from 'react';
import { auth, db } from '../firebaseConfig';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import PopoverToConfirm from './PopoverToConfirm';

const Chat = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const bottomOfChat = useRef();

  const collectionRef = collection(db, `chats/${id}/messages`);
  // const q = query(collectionRef, orderBy('timestamp'), limit(10)); // for debugging
  const q = query(collectionRef, orderBy('timestamp'));
  const [messages] = useCollectionData(q);

  // get an email address of the recipient
  const getOpponentEmail = (users, currentUser) => users
    ?.filter(userEmail => userEmail !== currentUser)[0];

  const [chatInfo] = useDocumentData(doc(db, 'chats', id));
  let timestampFormatted = '12/31 12:34:56'; // initialize the value for debugging

  async function deleteMessage(sec, nanoSec) {
    let selectedDocId = null;
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((messageDoc) => {
      // first, check if selected message is owned by this user
      if (user.email === messageDoc.data()?.sender) {
        // then find selected message matches according to timestamp
        if (sec === messageDoc.data()?.timestamp?.seconds
          && nanoSec === messageDoc.data()?.timestamp?.nanoseconds) {
          // this is the document ID a user is trying to delete
          selectedDocId = messageDoc.id;
        }
      }
    });
    if (selectedDocId) {
      await deleteDoc(doc(db, `chats/${id}/messages`, selectedDocId));
    }
  }

  const getMessages = () => messages
    ?.map(message => {
      const sender = message.sender === user.email;
      const senderId = message.sender.slice(0, -10); // substring without "@gmail.com"
      // console.log((message.timestamp?.seconds === 1655812378
      //   && message.timestamp?.nanoseconds === 479000000));

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#get_the_number_of_seconds_since_the_ecmascript_epoch
      if (message.timestamp?.seconds) {
        const timestamp = new Date(message.timestamp.seconds * 1000);
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
        timestampFormatted = timestamp.toLocaleString('ja-JP').slice(5); // to get rid of year
      }
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
            fontSize={['xs', 'xs', 'sm']}
            color="#EEEEEE"
          >
            {senderId || ''}
          </Text>
          {/* conditional rendering to reuse this component for different popover situations */}
          <PopoverToConfirm
            contentText={sender ? 'このメッセージを削除しますか?' : 'このメッセージは削除できません。'}
            confirmText={sender ? '削除' : ''}
            cancelText={sender ? 'キャンセル' : '確認'}
            // it is impossible to delete the message not owned by this user
            // double checked by the logic inside of the deleteMessage function
            funcArg={() => deleteMessage(
              message?.timestamp?.seconds,
              message?.timestamp?.nanoseconds,
            )}
          >
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
                boxSize={['15px', '20px', '25px']}
                borderRadius="full"
                objectFit="cover"
                src={message.picURL ? message.picURL : 'https://i.imgur.com/EuXdDLh.png'}
                alt="profile pic"
              />
              <Text
                fontSize={['11px', '13px', 'md']}
                fontWeight={[500, 400, 400]}
              >
                {message.text}
              </Text>
            </Flex>
          </PopoverToConfirm>
          <Text
            marginTop={0}
            textAlign={sender ? 'end' : 'start'}
            marginStart={3}
            fontSize={['xx-small', 'xs', 'sm']}
            color="#DDDDDD"
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

  const numberOfImages = 10;
  const chatImageIdx = ((id.charCodeAt(1) + id.charCodeAt(2)) * id.charCodeAt(3)) % numberOfImages;
  const chatImageFile = `chatarea0${chatImageIdx}.jpg`;

  return (

    <Flex
      id="chatContainer"
      mr={[0, 0, 0, 90, 120, 210]}
      ml={[0, 0, 0, 90, 120, 210]}
      h="100vh"
    >
      <Sidebar />
      <Flex
        bg="gray.50"
        direction="column"
        flex={1}
        sx={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/assets/${chatImageFile}`})` }}
        backgroundSize="cover"
      >
        <TopBar email={getOpponentEmail(chatInfo?.users, user.email)} />

        <Flex
          className="chatarea"
          flex={1}
          direction="column"
          pt={3}
          mx={3}
          sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
          overflowX="scroll"
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
