import { Avatar } from '@chakra-ui/avatar';
import { Flex, Heading } from '@chakra-ui/layout';

const TopBar = ({ email }) => {
  const topbarPic = 'https://i.imgur.com/EuXdDLh.png';
  return (
    <Flex
      bg="gray.200"
      h="80px"
      w="100%"
      align="center"
      p={5}
    >
      <Avatar src={topbarPic} marginEnd={3} />
      <Heading size="lg" color="#444444" paddingBottom={2}>{email}</Heading>
    </Flex>
  );
};

export default TopBar;
