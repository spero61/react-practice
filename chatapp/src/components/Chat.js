import { Flex, Text } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const Chat = (props) => {
  const { id } = useParams();

  return (

    <Flex h="100vh">
      <Sidebar />
      <Flex
        bg="gray.50"
        direction="column"
        flex={1}
      >
        <TopBar />

        <Flex
          className="chatarea"
          flex={1}
          direction="column"
          pt={4}
          mx={3}
          overflowX="scroll"
          sx={{ scrollbarWidth: 'none', overflowX: 'hidden' }}
        >
          {/* text message dummy start */}
          <Text bg="green.100" w="fit-content" minWidth="100px" borderRadius="lg" p={3} alignSelf="flex-end">
            Hello, there!
          </Text>
          <Text bg="blue.100" w="fit-content" minWidth="100px" borderRadius="lg" p={3}>
            Hi~ How have you been lately?
          </Text>
          <Text bg="green.100" w="fit-content" minWidth="100px" borderRadius="lg" p={3} alignSelf="flex-end">
            I am doing well, thanks!
          </Text>
          {/* text message dummy end */}
        </Flex>

        <BottomBar />

      </Flex>
    </Flex>
  );
};

export default Chat;
