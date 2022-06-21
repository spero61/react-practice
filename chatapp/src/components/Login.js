import { ChatIcon } from '@chakra-ui/icons';
import { Box, Center, Stack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebaseConfig';

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/README.md
const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Center
      h="100vh"
      sx={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/assets/login-background.jpg`})` }}
      backgroundSize="cover"
    >
      <Stack align="center" mb={20}>
        <Text
          color="#345678"
          fontWeight="bold"
          fontFamily={"'Pacifico', cursive"}
          fontSize={['32px', '35px', '40px']}
          mb={[1, 2, 3]}
        >
          Luomu ChatApp
        </Text>
        <Stack align="center" bgColor="#FFFFFF55" p={10} rounded="xl" spacing={5} boxShadow="lg">
          <Box
            bgGradient="linear(to-bl, pink.400, teal.400)"
            w="fit-content"
            p={5}
            rounded="2xl"
            boxShadow="md"
          >
            {/* <FontAwesomeIcon icon="fa-regular fa-comment-dots" /> */}
            <FontAwesomeIcon
              icon={faCommentDots}
              color="#FFFFFF"
              size="5x"
            />
          </Box>

          <Link to="/chat">
            {/* https://developers.google.com/identity/protocols/oauth2/openid-connect */}
            <Image
              height="46px"
            // https://developers.google.com/identity/branding-guidelines
              src="../assets/btn_google_signin_light_normal_web@2x.png"
              alt="Sign in with Google"
              onClick={() => signInWithGoogle('', { prompt: 'select_account' })}
            />
          </Link>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Login;
