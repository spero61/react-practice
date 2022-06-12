import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Flex, Text } from '@chakra-ui/layout';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import UserChat from './UserChat';

const Sidebar = () => {
  const [user] = useAuthState(auth);

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
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            onClick={() => signOut(auth)}
            size="lg"
            color="#555555"
          />
        </Link>
      </Flex>

      <Button m={5} p={5}>New Chat</Button>

      {/* sx prop: https://chakra-ui.com/docs/styled-system/features/the-sx-prop */}
      <Flex
        overflowX="scroll"
        direction="column"
        flex={1}
        sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
      >
        <UserChat />
        <UserChat />
      </Flex>

    </Flex>
  );
};

export default Sidebar;
