import { ChatIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/README.md
const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Center h="80vh">
      <Stack align="center" bgColor="gray.200" p={16} rounded="2xl" spacing={10} boxShadow="lg">
        <Box bgColor="green.300" w="fit-content" p={5} rounded="3xl" boxShadow="md">
          <ChatIcon boxSize={100} color="gray.100" />
        </Box>

        <Link to="/chat">
          {/* https://developers.google.com/identity/protocols/oauth2/openid-connect */}
          <Button boxShadow="md" onClick={() => signInWithGoogle('', { prompt: 'select_account' })}>Sign In with Google</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default Login;
