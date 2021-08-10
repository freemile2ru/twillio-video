import React, { useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import { Arrow } from './Arrow';
import { Participant } from './Participant';
import { WaitingRoom } from './WaitingRoom';

/** Description of component */
export function Room({ room, returnToLobby }) {
  const [remoteParticipants, setRemoteParticipants] = useState<any>(
    Array.from(room.participants.values())
  );

  const [activeParticipant, setActiveParticipant] = useState(room.localParticipant);
  const [localParticipant, setLocalParticipant] = useState(room.localParticipant);
  useEffect(() => {
    room.on('participantConnected', (participant) => addParticipant(participant));
    room.on('participantDisconnected', (participant) => removeParticipant(participant));
    window.addEventListener('beforeunload', leaveRoom);

    return () => leaveRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isActiveLocalParticipant: boolean =
    activeParticipant.identity === localParticipant.identity;

  return (
    <div className="room">
      {!remoteParticipants.length ? (
        <WaitingRoom />
      ) : (
        <>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            <Participant
              localParticipant={true}
              isActive={isActiveLocalParticipant}
              participant={localParticipant}
              onDoubleClick={() => setActiveParticipant(room.localParticipant)}
              setLocalParticipant={setLocalParticipant}
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
            localParticipant={isActiveLocalParticipant}
            activeWindow={true}
            key={activeParticipant.identity}
            participant={isActiveLocalParticipant ? localParticipant : activeParticipant}
            setLocalParticipant={setLocalParticipant}
          >
            {isActiveLocalParticipant && (
              <Icon onClick={leaveRoom} as={FiX} w={8} h={6} color={'white'} />
            )}
          </Participant>
        </>
      )}
    </div>
  );
}
