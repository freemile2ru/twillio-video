import React, { useState } from 'react';
import { Heading, Center, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Participant } from './Participant';

/** Description of component */
export function Room({ room, returnToLobby }) {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );

  const [activeParticipant, setActiveParticipant] = useState(room.localParticipant);
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
        >
          <Button onClick={leaveRoom}>Leave</Button>
        </Participant>
        {remoteParticipants.map((participant, index) => (
          <Participant key={index} participant={participant} />
        ))}
      </div>

      <Participant
        localParticipant={activeParticipant.identity === room.localParticipant.identity}
        active={true}
        participant={activeParticipant}
      >
        {activeParticipant.identity === room.localParticipant.identity && (
          <Button onClick={leaveRoom}>Leave</Button>
        )}
      </Participant>
    </div>
  );
}

const style = {
  participants: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginLeft: '-.75vw',
  },
};
