import { Flex } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Chatbox from './ChatBox';

const Chat = (props) => {
  const { id } = useParams();

  useEffect(() => {
    console.log(`/chat/${id}`);
  }, []);

  return (

    <Flex>
      <Sidebar />
      <Chatbox />
      <br />
      <h3>
        user ID:
        {' '}
        {id}
      </h3>
    </Flex>
  );
};

export default Chat;
