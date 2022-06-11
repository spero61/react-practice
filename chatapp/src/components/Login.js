import { ChatIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Login = () => (
  <Center h="80vh">
    <Stack align="center" bgColor="gray.200" p={16} rounded="2xl" spacing={10} boxShadow="lg">
      <Box bgColor="green.300" w="fit-content" p={5} rounded="3xl" boxShadow="md">
        <ChatIcon boxSize={100} color="gray.100" />
      </Box>

      <Link to="/chat">
        <Button boxShadow="md">Start the chat</Button>
      </Link>
    </Stack>
  </Center>
);

export default Login;
