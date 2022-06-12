import { Avatar } from '@chakra-ui/avatar';
import { Flex, Heading } from '@chakra-ui/layout';

const TopBar = () => (
  <Flex
    bg="gray.200"
    h="80px"
    w="100%"
    align="center"
    p={5}
  >
    <Avatar src="" marginEnd={3} />
    <Heading size="lg" color="#444444" paddingBottom={2}>account@gmail.com</Heading>
  </Flex>
);

export default TopBar;
