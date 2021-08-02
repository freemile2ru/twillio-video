import React, { useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import { Arrow } from './Arrow';
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

  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        Left
      </Arrow>
    );
  };

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        Right
      </Arrow>
    );
  };

  return (
    <div className="room">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        <Participant
          localParticipant={true}
          isActive={activeParticipant.identity === room.localParticipant.identity}
          participant={room.localParticipant}
          onDoubleClick={() => setActiveParticipant(room.localParticipant)}
        >
          <Icon onClick={leaveRoom} as={FiX} w={8} h={6} color={'white'} />
        </Participant>

        {remoteParticipants.map((participant, index) => (
          <Participant
            key={index}
            isActive={activeParticipant.identity === participant.identity}
            participant={participant}
            onDoubleClick={() => setActiveParticipant(participant)}
          />
        ))}
      </ScrollMenu>

      <Participant
        localParticipant={activeParticipant.identity === room.localParticipant.identity}
        activeWindow={true}
        participant={activeParticipant}
      >
        {activeParticipant.identity === room.localParticipant.identity && (
          <Icon onClick={leaveRoom} as={FiX} w={8} h={6} color={'white'} />
        )}
      </Participant>
    </div>
  );
}
