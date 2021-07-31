import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Heading, Center, Flex, Button } from '@chakra-ui/react';
import { createLocalTracks, connect } from 'twilio-video';

import { useTwilio } from '../context/twilio';
import { Room } from '../components/Room';
import { useAuth } from '../context/auth';

function VideoPage() {
  const [room, setRoom] = useState(null);
  const { token } = useTwilio();
  const { user } = useAuth();

  const joinRoom = async () => {
    try {
      const room = await connect(token, {
        audio: true,
        video: true,
      });

      setRoom(room);
    } catch (err) {
      console.log(err);
    }
  };

  const returnToLobby = () => {
    setRoom(null);
  };

  return (
    <>
      <Head>
        <title>VideoPage</title>
      </Head>

      <Heading size="lg">I am video page</Heading>
      <div style={styles.app}>
        {!room ? (
          <div style={styles.lobby}>
            Hello {`${user && user.email} `}
            <Button onClick={joinRoom} disabled={!token}>
              Join Room
            </Button>
          </div>
        ) : (
          <Room returnToLobby={returnToLobby} room={room} />
        )}
      </div>
    </>
  );
}

const styles = {
  app: {
    padding: '.75vw',
    width: '100%',
    boxSizing: 'border-box',
  },
  lobby: {
    marginTop: '100px',
    textAlign: 'center',
    fontSize: '1.25em',
  },
};

export default VideoPage;
