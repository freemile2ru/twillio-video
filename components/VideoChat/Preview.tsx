import React from 'react';
import { Heading, Button, Container } from '@chakra-ui/react';

import { Participant } from './Participant';

/** Description of component */
export function Preview({ participant, setAudioEnabled, setVideoEnabled, handleJoin }) {
  const message = 'Preview Your Camera and Audio';

  return (
    <Container bg="red.300" color="white" padding={{ base: 16, lg: 24 }}>
      <Heading>{message}</Heading>
      <Participant
        localParticipant={true}
        participant={participant}
        previewWindow={true}
        onDoubleClick={() => null}
        setAudioEnabled={setAudioEnabled}
        setVideoEnabled={setVideoEnabled}
      />
      <Button onClick={handleJoin} color={'black'}>
        Join Room
      </Button>
    </Container>
  );
}
