import React, { useState } from 'react';
import { Heading, Center, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Participant } from './Participant';

/** Description of component */
export function Room({ room, returnToLobby }) {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );

  const message = 'Hola! Room Created!';

  useEffect(() => {
    room.on('participantConnected', (participant) => addParticipant(participant));
    room.on('participantDisconnected', (participant) => removeParticipant(participant));
    window.addEventListener('beforeunload', leaveRoom);

    return () => leaveRoom();
  }, []);

  const addParticipant = (participant) => {
    console.log(`${participant.identity} has joined the room.`);
    setRemoteParticipants([...remoteParticipants, participant]);
  };

  const removeParticipant = (participant) => {
    console.log(`${participant.identity} has left the room`);

    setRemoteParticipants(
      remoteParticipants.filter((p: any) => p.identity !== participant.identity)
    );
  };

  const leaveRoom = () => {
    room.disconnect();
    returnToLobby();
  };

  return (
    <div className="room">
      <div style={style.participants}>
        <Participant
          key={room.localParticipant.identity}
          localParticipant={true}
          participant={room.localParticipant}
        />
        {remoteParticipants.map((participant, index) => (
          <Participant key={index} participant={participant} />
        ))}
      </div>
      <Button id="leaveRoom" onClick={leaveRoom}>
        Leave Room
      </Button>
    </div>
  );
}

const style = {
  participants: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginLeft: '-.75vw',
  },
};
