import { FocusLock } from '@chakra-ui/focus-lock';
import { Popover, FormControl, FormLabel, PopoverContent, PopoverFooter, PopoverBody,
  useDisclosure, ButtonGroup, Button, Box, Input, Stack, PopoverArrow, PopoverCloseButton,
  PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { useRef, forwardRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const TextInput = forwardRef((props, ref) => (
  <FormControl isRequired>
    <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
    <Input ref={ref} id={props.id} {...props} />
  </FormControl>
));

const Form = ({ firstFieldRef, onCancel }) => {
  const [snapshot] = useCollection(collection(db, 'chats'));
  const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const [user] = useAuthState(auth);
  const isChatExists = (email) => chats
    ?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)));

  const addChatRoom = async (input) => {
    const suffix = '@gmail.com';
    const emailId = `${input}${suffix}`;
    if (!isChatExists(emailId)) {
      await addDoc(collection(db, 'chats'), { users: [user.email, emailId] });
    }
  };

  // this works but I need to find better way !
  function tmpFunc() {
    let googleId = null;
    onCancel(); // close the form
    setTimeout(() => {
      // console.log(firstFieldRef?.current?.value);
      googleId = firstFieldRef?.current?.value;
    }, '700');
    setTimeout(() => {
      addChatRoom(googleId);
    }, '1200');
  }

  return (
    <Stack spacing={4}>
      <TextInput
        label="Google ID"
        id="google-id"
        ref={firstFieldRef}
        defaultValue="sss"
      />
      <TextInput label="Domain" id="domain" defaultValue="@gmail.com" isDisabled />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => tmpFunc()}
        >
          追加
        </Button>
        {/* {console.log(firstFieldRef.current?.value)} */}
      </ButtonGroup>
    </Stack>
  );
};

function PopoverForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      initialFocusRef={firstFieldRef}
      placement="auto"
    >
      <PopoverTrigger>
        <Box
          display="inline-block"
          textAlign="center"
          m={[2, 3, 6]}
          p={[2, 2, 3]}
          bgGradient="linear(to-br, teal.300, purple.200)"
          fontSize={['12px', '14px', '18px']}
          fontWeight={[500, 600, 600]}
          borderRadius="full"
          color="gray.700"
          _hover={{ cursor: 'pointer' }}
        >
          チャットルーム追加
        </Box>
      </PopoverTrigger>

      <PopoverContent p={5} ml={2}>
        <PopoverHeader pt={2} pb={6} fontWeight={500} border="0" textAlign="center" color="gray.800">
          相手のGoogle IDは何ですか？
        </PopoverHeader>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverForm;
