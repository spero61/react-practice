import { Avatar } from '@chakra-ui/avatar';
import { Flex, Heading } from '@chakra-ui/layout';

const TopBar = ({ email }) => {
  const topbarPic = 'https://i.imgur.com/EuXdDLh.png';
  return (
    <Flex
      bgGradient="linear(white 0%, gray.100 25%, gray.200 80%)"
      h={['70px', '75px', '80px']}
      w="100%"
      align="center"
      p={5}
    >
      <Avatar src={topbarPic} marginEnd={3} />
      <Heading
        size={['md', 'lg', 'lg']}
        bgGradient="linear(to-bl, pink.400, teal.400)"
        bgClip="text"
        paddingBottom={2}
      >
        {email}
      </Heading>
    </Flex>
  );
};

export default TopBar;
