import { Flex, Heading } from '@chakra-ui/layout';

const BottomBar = () => (
  <Flex
    bg="gray.100"
    h="80px"
    w="100%"
    align="center"
    p={5}
  >
    <Heading size="sm" color="#777777">Please type here...</Heading>
  </Flex>
);

export default BottomBar;
