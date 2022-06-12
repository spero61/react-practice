import { Flex, Heading } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

// <br />
// <h3>
//   user ID:
//   {' '}
//   {id}
// </h3>

const Chat = (props) => {
  const { id } = useParams();

  useEffect(() => {
    console.log(`/chat/${id}`);
  }, []);

  return (

    <Flex>
      <Sidebar />
      <Flex
        bg="gray.50"
        direction="column"
        flex={1}
      >
        <TopBar />

        <Flex className="chatarea" flex={1} />

        <BottomBar />

      </Flex>
    </Flex>
  );
};

export default Chat;
