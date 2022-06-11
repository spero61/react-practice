import { Avatar } from '@chakra-ui/avatar';
import { Flex, Text } from '@chakra-ui/layout';

const UserChat = () => (
  <Flex align="center" p={3} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
    <Avatar src="" marginEnd={3} />
    <Text>account@gmail.com</Text>
  </Flex>
);

export default UserChat;
