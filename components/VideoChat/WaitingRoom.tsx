import React from 'react';
import { Heading, Center } from '@chakra-ui/react';

/** Description of component */
export function WaitingRoom() {
  const message = 'Waiting For Other Participant To Join the meeting';

  return (
    <Center bg="red.300" color="white" padding={{ base: 16, lg: 24 }}>
      <Heading>{message}</Heading>
    </Center>
  );
}
