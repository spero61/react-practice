import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Flex, Text } from '@chakra-ui/layout';
import UserChat from './UserChat';

const Sidebar = () => (
  <Flex
    bg="cyan.100"
    w="300px"
    h="100vh"
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
        <Avatar src="" marginEnd={3} />
        <Text>Son Heung-min</Text>
      </Flex>

      <Link to="/">
        <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" color="#555555" />
      </Link>
    </Flex>

    <Button m={5} p={5}>New Chat</Button>

    {/* sx prop: https://chakra-ui.com/docs/styled-system/features/the-sx-prop */}
    <Flex overflowX="scroll" direction="column" sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}>
      <UserChat />
      <UserChat />
    </Flex>

  </Flex>
);

export default Sidebar;
