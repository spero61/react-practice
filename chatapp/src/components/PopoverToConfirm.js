import { Popover, PopoverContent, PopoverFooter, PopoverBody, useDisclosure, ButtonGroup, Button, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { useRef } from 'react';

function PopoverToConfirm({ children, funcArg, contentText, confirmText, cancelText }) {
  const initialFocusRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // note: using useState hook on "isValid" instead causes infinite rendering
  // might be triggered by some code inside of Chakra UI (need to check later)
  let isValid = true;
  if (confirmText === '') {
    isValid = false;
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      {/* <PopoverContent zIndex={4}> */}
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800" mt={[1, 1, 2]} ml={[2, 2, 3]}>
        {/* <PopoverHeader fontWeight="semibold">確認してください</PopoverHeader> */}
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {contentText}
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={onClose}>{cancelText}</Button>
            {isValid ? <Button colorScheme="red" onClick={funcArg}>{confirmText}</Button> : null}
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverToConfirm;
