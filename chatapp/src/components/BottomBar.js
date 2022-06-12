import { FormControl, Input, Button } from '@chakra-ui/react';

const BottomBar = () => (
  <FormControl
    bg="gray.100"
    w="100%"
    align="center"
    p={4}
  >
    <Input placeholder="Type a message..." autoComplete="off" autoFocus />
    <Button type="submit" hidden>Send</Button>
  </FormControl>
);

export default BottomBar;
