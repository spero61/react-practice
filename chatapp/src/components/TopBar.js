import { Avatar } from '@chakra-ui/avatar';
import { Flex, Text } from '@chakra-ui/layout';

const TopBar = ({ email }) => {
  const topbarPic = 'https://i.imgur.com/EuXdDLh.png';
  return (
    <Flex
      bgGradient="linear(white 0%, gray.100 25%, gray.200 80%)"
      h={['70px', '75px', '80px']}
      w="100%"
      align="center"
      p={[3, 4, 5]}
    >
      <Avatar
        src={topbarPic}
        marginEnd={[2, 2, 3]}
      />
      <Text
        fontSize={['20px', '23px', '25px', '28px', '30px', '35px']}
        fontWeight={900}
        bgGradient="linear(to-bl, pink.400, teal.400)"
        bgClip="text"
        paddingBottom={[0, 1, 2]}
      >
        {email}
      </Text>
    </Flex>
  );
};

export default TopBar;
