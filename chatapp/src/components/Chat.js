import { Flex } from '@chakra-ui/layout';
import Sidebar from './Sidebar';
import Chatbox from './ChatBox';

const Chat = () => (
  <Flex>
    <Sidebar />
    <Chatbox />
  </Flex>
);

export default Chat;
