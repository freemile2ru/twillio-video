import React from 'react';
import { Heading, Button, Container } from '@chakra-ui/react';

import { Participant } from './Participant';

/** Description of component */
export function Preview({
  participant,
  setAudioEnabled,
  setVideoEnabled,
  audioEnabled,
  videoEnabled,
  handleJoin,
}) {
  const message = 'Preview Your Camera and Audio';

  return (
    <Container bg="red.300" color="white" padding={{ base: 16, lg: 24 }}>
      <Heading>{message}</Heading>
      <Participant
        localParticipant={true}
        activeWindow={true}
        participant={participant}
        onDoubleClick={() => null}
        setAudioEnabled={setAudioEnabled}
        setVideoEnabled={setVideoEnabled}
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled}
      />
      <Button onClick={handleJoin} color={'black'}>
        Join Room
      </Button>
    </Container>
  );
}
